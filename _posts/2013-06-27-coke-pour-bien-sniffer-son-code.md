---
layout: post
title: "Coke, pour bien sniffer son code"
description: ""
author:
  name:           M6Web
  avatar:         
  email:          
  twitter:  techM6Web      
  facebook:       
  github:    
category: 
tags: [qualite,php]
image:
  feature: 
  credit: 
  creditlink: 
comments: true  
permalink: coke-pour-bien-sniffer-son-code
---

[![Coke, pour bien sniffer son code](http://img.over-blog-kiwi.com/0/00/30/83/201306/ob_5f21c98ab4f4ea8c4ff2da5374be9e18_sniff-sniff.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201306/ob_5f21c98ab4f4ea8c4ff2da5374be9e18_sniff-sniff.jpg)

Afin d’uniformiser nos développements, nous avons décidé de suivre des conventions de code. Les projets deviennent ainsi plus homogènes et la revue de code, comme la maintenance, s’en trouvent simplifiées. Comme la majorité de nos services sont en PHP, nous utilisons [PHP CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer).



#### Le manque

Cependant, l'éventail des frameworks utilisés en interne (Symfony, ZF, homemade) ne nous permet pas d’employer une seule et même convention. De plus, l’organisation des projets est assez hétérogène (ex: les répertoires de test ne se nomment pas tous de la même manière). Nous avions donc besoin de pouvoir configurer spécifiquement PHP CodeSniffer pour chacun de nos projets.



#### Le deal

A la manière de [Travis](https://travis-ci.org/), nous avons opté pour la méthode dite “*du fichier .truc posé à la racine de chaque projet*” (tm). Nous avons donc développé [Coke](https://github.com/M6Web/Coke), un script de sniff, qui lance PHP CodeSniffer avec la configuration contenu dans le fichier “.coke” la racine du projet :



<script src="https://gist.github.com/KuiKui/5867277.js"></script>

Ainsi, lorsque le fichier est paramétré et que le [script coke](https://raw.github.com/M6Web/Coke/master/coke) est correctement installé sur le système, il suffit d'exécuter la commande "coke" depuis la racine du projet sniffer.



#### Le fix

Dans l’optique d’[automatiser le plus possible](http://zachholman.com/talk/how-to-build-a-github/) nos processus, nous avons inséré la vérification des coding styles à l’aide de [Coke](https://github.com/M6Web/Coke), dans un [hook git de pre-commit](https://gist.github.com/JJK801/5867810).

[Coke](https://github.com/M6Web/Coke) est un [side-project](http://zachholman.com/posts/why-github-hacks-on-side-projects/) de la Team Cytron. Il est disponible en [open-source](http://tom.preston-werner.com/2011/11/22/open-source-everything.html) sur [le compte GitHub de M6Web](https://github.com/M6Web).

Enjoy !

*Crédit photo : @2013 iPad Wallpapers free*



