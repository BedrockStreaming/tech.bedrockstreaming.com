---
layout: post
title: "Use the sensiolabs security advisories to check potential vulnerabilities"
description: ""
author:
  name:     TechM6Web
  avatar:   
  email:
  twitter:  techM6Web      
  facebook:       
  github:    
category:
tags: [6tech, lyon, symfony, security]
image:
  feature:
  credit: 
  creditlink: 
comments: true
---

Numerous vulnerabilities are detected every day. That's a good thing and a key benefit of using open source products. At m6web we dont want to be exposed to know vulnerabilities, so we use a service provided by sensiolabs in our continuous integration tool (Jenkins) to check it.
 
 
 
Just add those lines in your ant build file (and adapt basedir) :  
 
 {% highlight xml %}
    <!-- =================================================================== -->
    <!-- Security checker                                                    -->
    <!-- =================================================================== -->
    <target name="sf2-security-checker">
     <exec executable="bash" dir="${basedir}/sources/bin" failonerror="true">
         <arg value="-c"/>
         <arg value="curl -Os http://get.sensiolabs.org/security-checker.phar" />
     </exec>
     <exec executable="php" dir="${basedir}/sources" failonerror="true">
         <arg line="${basedir}/sources/bin/security-checker.phar security:check composer.lock" />
     </exec>
    </target>
{% endhighlight %}

And automatically check your `composer.lock` againts vulnerabilities. Your build will fail if something wrong is detected. 

For example, with the recent guzzle one : 

![guzzle](/images/posts/sf2-checker/checker.jpg)

You can contribute to the [vulnerabilities database](https://github.com/FriendsOfPHP/security-advisories) and the [ckecker](https://github.com/sensiolabs/security-checker) via github.
