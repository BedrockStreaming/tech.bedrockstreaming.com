---
layout: post
title: "Qui a bouchonné mon Redis ?"
description:
author:
  name: Team Cytron
  avatar: cytron.png
  email:
  twitter: techM6Web
  facebook:
  github:
category:
tags: [qualité, outil, redis, cytron]
image:
  feature:
  credit:
  creditlink:
comments: true
permalink: redismock-qui-a-bouchonne-mon-redis.html
---

Les tests fonctionnels tiennent un rôle majeur dans la réussite et la pérennité d’un projet web, d’autant plus s’il est déployé continuellement. Nous nous étions donc déjà intéressés à cette problématique dans [le cas d’un service proposant une API REST et utilisant MySQL et Doctrine](http://tech.m6web.fr/2013/10/tester-fonctionnellement-une-api-rest-symfony-doctrine-atoum.html). Mais nous développons aussi des services du même type utilisant d’autres systèmes de stockage de données comme [Redis](http://redis.io/).

Afin de tester fonctionnellement ces services, nous avons d’abord eu l’idée d’installer une instance Redis sur nos serveurs de tests. Mais nous allions inéluctablement retomber sur les mêmes obstacles qu’avec MySQL :

- il n’est pas toujours possible de monter une instance Redis dédiée aux tests,
- mais surtout une telle architecture n’est pas viable dans un système de tests concurrentiels.

#### La librairie RedisMock

Nous nous sommes alors penchés sur la possibilité de bouchonner Redis, chose qui parait au premier abord plus aisée que de bouchonner Doctrine : Redis propose une API simple et bien documenté (même si abondante). Nous pensions trouver une librairie PHP déjà existante mais nos recherches sont restées vaines.

Nous avons donc créé la librairie RedisMock qui reprend simplement [les commandes de l’API de Redis](http://redis.io/commands) et simule leur comportement grâce aux fonctions natives de PHP. Évidemment, toutes les commandes Redis n’ont pas encore été implémentées, seules celles qui sont utilisées dans nos tests sont présentes. Vous pouvez nous proposer l’implémentation de nouvelles fonctions Redis, selon vos besoins, via des Pull Requests sur le projet [RedisMock](https://github.com/M6Web/RedisMock).

Toutes les commandes exposées par le mock sont testées unitairement via [atoum](http://www.atoum.org/) en reprenant pour chaque cas les spécifications énoncées dans la documentation Redis.

#### Utiliser RedisMock dans vos tests sur Symfony

L’utilisation du mock reste très simple dans un projet Symfony. Chez M6Web, nous utilisons [notre propre composant Redis](https://github.com/M6Web/Redis), lui même basé sur [Predis](https://github.com/nrk/predis). Il nous suffit alors de modifier la définition du service Redis dans l’environnement de test.

Tout d’abord, il faut rajouter la dépendance à la librairie dans le `composer.json` :

{% gist 7893309 %}

Puis après avoir mis à jour les vendors, il suffit de modifier le `config_test.yml` du projet pour ajouter :

{% gist 7893376 %}

Et voilà, le tour est joué ! Les tests utilisent maintenant le mock à la place du véritable Redis. Petit bémol cependant : si votre service Redis est passé en paramètre de fonctions avec une restriction sur le type (signature de type), ça ne marchera pas… Deux possibilités peuvent s’offrir à vous :

- vous supprimez le typage dans la signature, mais ce n’est pas vraiment une bonne pratique, votre code en sera affaibli,
- vous définissez une interface que vous utilisez dans votre signature de fonction, mais vous devrez définir pour vos services Symfony des classes filles héritant de Redis et RedisMock et implémentant cette interface.

[RedisMock ](https://github.com/M6Web/RedisMock) est disponible en [open-source](http://tom.preston-werner.com/2011/11/22/open-source-everything.html) sur [le compte GitHub de M6Web](https://github.com/M6Web).

Enjoy !
