---
layout: post
title: "How did we streamline the delivery of our internal conferences aka LFTs?"
description: "Some time ago, we shared with you an article explaining how we managed to capture and broadcast our conferences in the Bedrock auditorium. We must admit, it worked great but we wanted to make it simpler."
author: a_caron
lang: en
tags: [lft, talks, live, stream, obs, streamyard, conference]
color: rgb(251,87,66)
thumbnail: images/posts/lft-streamyard/head.png
---
{% include aligner.html images="images/posts/lft-streamyard/head.png" %}

Some time ago, we shared with you [an article explaining how we managed to capture and broadcast our conferences in the Bedrock auditorium](/2021/10/14/live-streaming-lft.html). 
We must admit, it worked great, but we wanted to make it simpler.

As a reminder, our internal conferences or meetups are called **LFT**. 
If you want to know more about our _Last Friday Talk_ and the motivations that push us to do it, we invite you to read the above-mentioned article.

Strong of the success of this broadcasting, the voluntary team of organization wished for the next one to succeed in making as well in simpler. 
_It was already a challenge in itself!_
If you read [this part of the article](/2021/10/14/live-streaming-lft.html#Some%20things%20to%20improve), you can see that we already had some ideas for improvements.

## Improvement areas

In the previous version, you could see that a very important quantity of material was necessary (meters of various cables, multi plugs, a camera, a computer under windows, etc...)
A large part of this material was kindly lent by Pascal Martin (and we thank him for that), but we could not decently borrow it for each LFT.

Moreover, this very specific equipment did not allow **each Bedrock employee to be able to take over the role of the control room** at a glance with his own machine.
Finally, as you can imagine, setting up and putting away such a large amount of equipment **takes a lot of time**. 
_There were no less than four of us setting up and tidying up._

In another topic, let's talk about video quality. We used to use _Google Live Stream_ before, but the 720p broadcast, with its very low bitrate and aggressive compression, sometimes made it difficult to follow.
_Text and images were often very pixelated._

We finally wanted to be able to more easily handle a _hybrid_ mode to our LFTs. $
Because of the pandemic, telecommuting and the fact that some of Bedrock's employees are located in Paris, we need to be able to broadcast and capture the LFT both in person and remotely.
By _hybrid_ mode we also meant that during the same event, we wanted to be able to host speakers from the location of their choice.

## What we did? 

After a few exchanges with other conference organizations, we decided to give [Streamyard](https://streamyard.com/) a chance.
With some quick tests, we took a license and started the new version of the LFT.

### What is Streamyard?

Streamyard is a live streaming platform directly in the browser.

It does not have all the customization and possibilities of OBS but the huge advantage of streamyard is its portability.
This solution allows Bedrock employees to manage the LFT from any computer.

Here are some sample images and overviews of the Streamyard UI:

{% include aligner.html images="images/posts/lft-streamyard/streamyard.png,images/posts/lft-streamyard/comment-from-chat.png" %}

The positive points of Streamyard:

- Allows us to have several people in the control room at the same time
- Stream 1080p
- Personalization: manage banners, chat questions, music on hold,...
- Manage multi-speaker
- Multi stream Youtube / Facebook / Twitter / Linkedin / Video recording
- There is a free mode that allows you to test it before taking out the credit card.

### New setup

As a reminder, here is the organization of our auditorium during the live broadcast of our LFT.
The room is large enough to accommodate all Bedrockers who wish to attend in person the presentations of their colleagues. 
The remote speakers have their conference broadcasted on the two screens of the room.

{% include aligner.html images="images/posts/lft-streamyard/plan.jpg,images/posts/lft-streamyard/control-desk.png,images/posts/lft-streamyard/amphi-bedrock.png" %}

What has changed since we switched to Streamyard in our setup is mainly related to the way we capture the image and sound of what is displayed on the screen.
Previously we were using an Elgato capture block, to intercept the HDMI cable from the speaker broadcast. 
However, we had to try several times to get it to work each time we switched speakers. Not fun at all.

Now with Streamyard, at every speaker change, we just need to:
- share the link of the "Streamyard broadcast"
- The speaker joins the stream by switching off his microphone and webcam
- Connect the HDMI cable of the speaker's computer
- The speaker shares his browser tab or his streamed screen on the room's screens
- The control room puts the RF microphone on the speaker(s)

For a remote speaker, it's even easier.
Just pass him/her the Streamyard link and he/she can use his/her webcam and his/her own microphone.

This is what our Stream setup now looks like with the cabling:

{% include aligner.html images="images/posts/lft-streamyard/setup.jpg,images/posts/lft-streamyard/setup-desk.png" %}

### What we achieved?

The LFT is also a group of volunteers who give their energy to offer the best event possible.
To propose to all the people of Bedrock a space of expression allowing them to share their passion, technical subjects and others.
From the proposal of the subject, to the rehearsals and until the broadcast, the team is there to accompany the speakers beginners as confirmed.

The switch to 720p and then to 1080p has been a real positive point for the quality of the live show, but also for the recording and the replay.
More than 200 participants during the last LFT on the day, the organizing team is delighted.

The simplification of the broadcasting setup since the switch to Streamyard has also made it easier to set up the room.
Switching from one speaker to another is less complex and can be done in just a few minutes.

The youtube lives allow participants to pause and rewind the broadcast.
This is really convenient for them.
Also, by going through the youtube chat, we can share questions directly on the screen and on the replay.

The LFT replays are also available on Bedrock's Youtube channel in a private way accessible to all employees.

{% include aligner.html images="images/posts/lft-streamyard/replay.png" %}

## Next steps

We don't want to stop there.
Every two months, we organize a LFT day at Bedrock: our Last Friday Talks.

For the next editions, we will try to do even better.
We are working on the subject of replaying our LFT in public on the Youtube channel in order to offer it to everyone.
In order to simplify the setup, we will try to put in place a more fixed table to avoid wiring and moving furniture.
We also wish to propose and train our employees to the use of this setup in order to allow us to host meetups and conferences in the best conditions.

Your company or association also proposes this kind of conferences, how do you manage broadcasting and recording?
