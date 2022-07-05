---
layout: post
title: "Encrypt AWS AMIs: one way to do it badly"
description: "You will have in this blog post multiple tips that may help you handle your AMIs encryption, but also why you shouldn’t handle it our way."
author: t_falconnet
tags: [cloud, aws]
color: rgb(251,87,66)
thumbnail: "images/posts/2022-07-08-encrypt-aws-amis/encrypt-aws-amis.png"
language: en
comments: true
---

At Bedrock, we build our own privately shared AMIs ([Amazon Machine Images](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)) for different  parts of our stack : kubernetes platform, vod platform, etc. We build them to do kernel optimizations, embed some tools, and more. To do that, we have been using Packer for a couple of years, and everything has been working just fine. 

Concerned about following AWS best-practices, we recently added [encryption by default to all new EBS volumes](https://aws.amazon.com/fr/premiumsupport/knowledge-center/ebs-automatic-encryption/) in all our accounts.

We didn't expect it, but this decision impacted our AMI creation process. We thus began to update our packer workflow to integrate this new constraint. We were telling ourselves that more security was for the best and we didn’t take enough steps back to analyze drawbacks.

You will have in this blog post multiple tips that may help you handle your AMIs encryption, but also why you shouldn’t handle it our way.

## Build an encrypted AMI

To build our AMI, Packer launches an EC2 in a "builder" account, then a snapshot is created and copied in needed regions. To use this AMI, "user" accounts are listed in the [AMI allowed users](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html).

With account EBS encryption enabled, snapshots are now encrypted. The default behavior is to use the account’s default KMS Key. Our first “easy” drawback while trying to build new AMI with Packer was the following error message:r :

```
Error Copying AMI (ami-xxxxxx) to region (xx-xxx-x): InvalidRequest: Snapshot snap-xxxxxxx is encrypted. Creating an unencrypted copy from an encrypted snapshot is not supported.
```

To avoid that, we enabled AMI encryption with Packer, but It resulted in another error :

```
Error modify AMI attributes: InvalidParameter: Snapshots encrypted with the AWS Managed CMK can't be shared.
```

As our AMI has to be shared to other accounts, it was impossible to encrypt our AMI with the account default KMS Key. So we created a dedicated KMS Key for Packer encryption.

And it worked ! We had our beautiful encrypted AMI, ready to use in all our accounts.

![How we build our encrypted AMIs](/images/posts/2022-07-08-encrypt-aws-amis/build_encrypted_amis.png)

<center><ins>How we build our encrypted AMIs</ins></center>


## Run an encrypted AMI

This is where it gets complex.

When we tried to launch an EC2 instance with our newly encrypted AMI, it failed with this error code :

```
Client.InternalError: Client error on launch
```

[It means that AWS can't use this AMI because it is encrypted.](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/troubleshooting-launch.html)

First step was to authorize the KMS Key to be used for encryption in user (external) accounts.

There are two methods to do that, for two different needs.

---

### Policy method

To authorize an external customer managed role (ours), we had to authorize our role in KMS Key dedicated policy to use it, then authorize KMS Key in our role policy to be used.  It is some kind of symmetric reference hard to correctly maintain with IaC (Terraform). And we had to do the same for KMS Key replicas in other regions, because they have a dedicated policy.

![Policy method](/images/posts/2022-07-08-encrypt-aws-amis/policy_method.png)

<center><ins>Policy method</ins></center>

One important thing to know here: some KMS Key permissions aren't available for external account sharing. It means that when we try to add the permission `kms:*` to our role policy (for debug purposes only, we follow least privileges principles), it failed. You can find which permission is accessible in cross account use and which is not [here](https://docs.aws.amazon.com/kms/latest/developerguide/kms-api-permissions-reference.html). 

### Grant method

To authorize an AWS managed role, like `AWSServiceRoleForAutoScaling` (to launch our EC2), we also needed to allow it to use our key. It is impossible to add a new policy on an AWS Managed role. So instead of using a policy method like before, we had to create a grant on that role to use our key. We tried to create that grant from the source account (where the key is created), but it didn't work. We had to create that grant from the destination account (where `AWSServiceRoleForAutoScaling` is), using a role in the destination account that is allowed to create a grant... So we had to allow a role from the destination account to create a grant with Policy method, then use the previous role to allow an AWS Managed Role to use our KMS Key with Grant method. Pretty fun, right ?


![Grant method](/images/posts/2022-07-08-encrypt-aws-amis/grant_method.png)

<center><ins>Grant method</ins></center>

---

Once all needed roles were allowed, we tried to launch an EC2 with the allowed role attached as an instance role. It failed again, because we needed to also use the AMI KMS Key on root volume of our instance. By default, it was the account KMS Key that was used.

[We attached that key on our root volume](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html), and it worked. We also could launch our EC2 with ASG. It was all good.

But there was a big security vulnerability: instead of using one KMS key per account to encrypt our EBS volume, we were now using the same KMS key on all our accounts because of our encrypted AMI.

## KMS Key rotation

A short word about [Key rotation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#kms-key-rotation): it can easily be enabled to automatically rotate key materials each year. All new AMIs will be encrypted with new key material and nothing has to be changed to run encrypted AMIs.
But in case of a manual rotation: if a key is leaked for example, you will need to recreate a new KMS Key, its replicas, and all permissions and grants seen before.

## Conclusion

Using privately shared encrypted AMI caused us multiple problems:
- higher complexity to maintain.
- lower security in cross-account configuration.

Furthermore, we checked all our AMIs to see if it contained sensitive data. It wasn’t the case : all sensitive data is uploaded at startup by [Launch Template](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-asg-launch-template.html). We had no interest in continuing to use encrypted AMI, and we would have spared so much time if we had seen that sooner.

This is why we decided to disable encryption for all new EBS volume on our builder account and stop building encrypted AMI.

Doing all the previous configuration took us several weeks. We are now more conscious that doing security just for the beauty of it can be really counterproductive.

If your AMIs contain sensitive data, a better way to handle encrypted AMI may be to stop creating privately shared AMIs. Instead, copy and encrypt a private AMI in each of your “user” accounts with a dedicated KMS Key per account. In result, there will be a larger amount of AMI to handle (one AMI per account per region), KMS Key permissions will still be complex, but security should be way better.
