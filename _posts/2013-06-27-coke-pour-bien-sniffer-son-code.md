---
layout: post
title: "Coke, pour bien sniffer son code"
description: ""
author:
  name: Team Cytron
  avatar: cytron.png
  email:
  twitter: techM6Web
  facebook:
  github:
category:
tags: [outil, qualite, php, open-source]
image:
  feature: posts/cytron/sniff.jpg
  credit: iPad Wallpapers free
  creditlink:
comments: true
permalink: coke-pour-bien-sniffer-son-code
---

Afin d’uniformiser nos développements, nous avons décidé de suivre des conventions de code. Les projets deviennent ainsi plus homogènes et la revue de code, comme la maintenance, s’en trouvent simplifiées. Comme la majorité de nos services sont en PHP, nous utilisons [PHP CodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer).

#### Le manque

Cependant, l'éventail des frameworks utilisés en interne (Symfony, ZF, homemade) ne nous permet pas d’employer une seule et même convention. De plus, l’organisation des projets est assez hétérogène (ex: les répertoires de test ne se nomment pas tous de la même manière). Nous avions donc besoin de pouvoir configurer spécifiquement PHP CodeSniffer pour chacun de nos projets.

#### Le deal

A la manière de [Travis](https://travis-ci.org/), nous avons opté pour la méthode dite “*du fichier .truc posé à la racine de chaque projet*” (tm). Nous avons donc développé [Coke](https://github.com/M6Web/Coke), un script de sniff, qui lance PHP CodeSniffer avec la configuration contenu dans le fichier “.coke” la racine du projet :

<script src="https://gist.github.com/KuiKui/5867277.js"></script>

Ainsi, lorsque le fichier est paramétré et que le [script coke](https://raw.github.com/M6Web/Coke/master/coke) est correctement installé sur le système, il suffit d'exécuter la commande "coke" depuis la racine du projet sniffer.

#### Le fix

Dans l’optique d’[automatiser le plus possible](https://zachholman.com/talk/how-to-build-a-github/) nos processus, nous avons inséré la vérification des coding styles à l’aide de [Coke](https://github.com/M6Web/Coke), dans un [hook git de pre-commit](https://gist.github.com/JJK801/5867810).

[Coke](https://github.com/M6Web/Coke) est disponible en [open-source](https://tom.preston-werner.com/2011/11/22/open-source-everything.html) sur [le compte GitHub de M6Web](https://github.com/M6Web).

Enjoy !