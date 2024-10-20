---
layout: ../../../../../layouts/post.astro
title: "On était au PHPTour ! "
description: "et c'était bien."
author: Baptiste, Mikael Randy et Olivier Mansour


  
  
  
category:
tags: [conference,afup,phptour]
feature-img: "../../../../../../../images/posts/phptourlux/inphinity.jpg"
thumbnail: "../../../../../../../images/posts/phptourlux/inphinity.jpg"
comments: true
permalink: 
---

# On était au PHP Tour et c'était bien !

(y avait un gros gâteau et des biscuits en forme d’elephpant)

Le voyage fut un peu épique, surtout les quelques kilomètres en plus quand le meilleur d'entre nous a oublié son sac à dos dans une station à 150 km de là :)

![m6web car](../../../../../../../images/posts/phptourlux/m6web_car.jpg)

Et on n'a pas pu battre la team [Blablacar](https://twitter.com/BlaBlaCarTech) et [Jolicode](https://jolicode.com/) au concours de levé de coudes - on est forfait les gars !

Plutôt qu'un retour exhaustif (et parce qu'avec les aqueducs de Mai on cherche un peu le temps), voici quelque chose de plus informel, sur notre ressenti des tendances communautaires (forcément subjectif).

# Radio moquette !


Il y a une bonne maturité autour des tests et du CI dans la communauté PHP. On commence aussi à voir de plus en plus des pratiques autour du partage de la responsabilité du provisionning entre ops et dev (avec [Ansible](https://www.ansible.com/home) et [Vagrant](https://www.vagrantup.com/) notamment) mais, comme chez M6Web, c’est très balbutiant - et chacun a sa façon de faire. On voit des infras de dev qui passent dans le cloud (variabilisation des coûts, flexibilité, possibilité d'expérimenter). Les services managés n’ont pas la cote, on reste sur du IAAS, principalement chez AWS.

Des solutions pour faire du PHP async se dessinent. Cela reste à expérimenter ([libevent](https://libevent.org/), [ReactPHP](https://reactphp.org/), le tradeoff vitesse, consommation CPU étant inconnu. C’est à creuser, car cela peut sortir à moindre coût de quelques situations difficiles. L'intégration avec certaines librairies comme Guzzle est très intéressante. 

MySQL 5.7 est annoncé par Oracle avec pleins de features + 2x plus rapide que 5.6 et 3x que 5.5 (query) et encore plus sur le connection time. Ils annoncent une meilleur intégration avec FusionIO et ils semblent pousser des solutions de cluster multi-master (via [Fabric](https://www.mysql.com/products/enterprise/fabric.html)) alors que c’était considéré expérimental avant, c’est maintenant annoncé stable.

PHP7 va être important pour le langage. Pour la performance (au moins x2 vitesse, x0.5 mémoire), les nouvelles fonctionnalités (classes anonymes, scalar type hints, stricts type hints, return type declaration, exceptions on fatals, …). Presque pas de BC break, on devrait surement chez M6Web faire des tests avec la RC dès que possible et migrer rapidement quelques services à la sortie d’une stable.
 
# Another (php) brick in the wall
 
M6Web était représenté par Olivier qui a fait une présentation sur l'architecture backend du second écran.
 
<iframe width="853" height="480" src="https://www.youtube.com/embed/VPYFnaX_5Tg" frameborder="0" allowfullscreen></iframe>

N'hésitez pas à [commenter la conférence](https://joind.in/talk/view/14286).
