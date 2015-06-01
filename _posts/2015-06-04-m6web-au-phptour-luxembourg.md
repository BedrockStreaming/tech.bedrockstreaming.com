---
layout: post
title: "On était au PHPTour ! "
description: "et c'était bien."
author:
  name:           Baptiste, Mikael Randy et Olivier Mansour
  avatar:
  email:
  twitter:  techM6Web
  facebook:
  github:
category:
tags: [conference,afup,phptour]
image:
  feature: post/phptourlux/inphpinity.jpg
  credit: Olivier
  creditlink: 
comments: true
permalink: velocity-europe-2014-day-1.html
---

# On était au PHP Tour et c'était bien !

(y avait un gros gâteau et des biscuits en forme d’elephant)

Le voyage fut un peu épique, surtout les quelques kilomètres en plus quand le meilleur d'entre nous à oublié son sac à dos dans une station à 150 km de là :)

![m6web car](/images/posts/phptourlux/m6web_car.jpg)

Et on n'a pas pu battre la team [Blablacar](https://twitter.com/BlaBlaCarTech) et [Jolicode](http://jolicode.com/) au concours de levé de coudes - on est forfait les gars !

Plutôt qu'un retour exhaustif (et parce qu'avec les aqueducs de Mai on cherche un peu le temps), voici quelque chose de plus informel, sur notre ressenti des tendances communautaires (forcément subjectif).

# Radio moquette !


Il y a une bonne maturité autour des tests et du CI ds la communauté PHP. On commence aussi à voir de plus en plus des pratiques autour du partage de la responsabilité du provisionning entre ops et dev (avec Ansible et Vagrant notamment) mais, comme chez M6Web, c’est très balbutiant - et chacun a sa façon de faire. On voit des infras de dev qui passent dans le cloud (variabilisation des couts, flexibilité, possibilité d'expérimenter). Les services managés n’ont pas la cote, on reste sur du IAAS, principalement chez AWS.

Des solutions pour faire du PHP async se dessinent (pas le même move que Java8, ce n’est pas dans le langage). Cela reste à expérimenter (libevent, ReactPHP) car le tradeoff vitesse, conso CPU est inconnu. Personnement, je croisque c’est à creuser, car cela peut sortir à moindre cout de quelques situations difficiles. L'intégration avec certaines librairies comme Guzzle est très intéressantes. 

MySQL 5.7 est annoncé par Oracle avec pleins de features + 2x plus rapide que 5.6 and x3 que 5.5 (query) et encore plus sur le connection time. Ils annoncent une meilleur intégration avec FusionIO. Ce qui m’a semblé intéressant c’est qu’ils semblent pousser des solutions de cluster multi-master (via Fabric) alors je croyais que c’était considéré expérimental avant, c’est maintenant annoncé stable.

PHP7 va être important pour le langage. Pour la perf (au moins x2 vitesse, x0.5 mémoire), les nouvelles fonctionnalités (classes anonymes, scalar type hints, stricts type hints, return type declaration, exceptions on fatals, …). Presque pas de BC break, on devrait surement chez M6Web faire des tests avec la RC dès que possible et migrer rapidement quelques services à la sortie d’une stable.
 
# Another (php) brick in the wall
 
M6Web était représenté par Olivier qui a fait une présentation sur l'architecture backend du second écran.
 
<iframe width="853" height="480" src="https://www.youtube.com/embed/VPYFnaX_5Tg" frameborder="0" allowfullscreen></iframe>