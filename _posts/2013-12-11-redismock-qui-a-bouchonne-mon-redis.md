---
layout: post
title: "Qui a bouchonné mon Redis ?"
description: "Présentation de la librairie RedisMock, un mock PHP open-source de Redis à utiliser dans vos tests fonctionnels."
author: cytron
category:
tags: [qualite, outil, redis, cytron, open-source]
thumbnail: "images/posts/cytron/redismock.jpg"
feature-img: "images/posts/cytron/redismock.jpg"
comments: true
permalink: redismock-qui-a-bouchonne-mon-redis.html
---

Les tests fonctionnels tiennent un rôle majeur dans la réussite et la pérennité d’un projet web, d’autant plus s’il est déployé continuellement. Nous nous étions donc déjà intéressés à cette problématique dans [le cas d’un service proposant une API REST et utilisant MySQL et Doctrine](https://tech.bedrockstreaming.com/2013/10/tester-fonctionnellement-une-api-rest-symfony-doctrine-atoum.html). Mais nous développons aussi des services du même type utilisant d’autres systèmes de stockage de données comme [Redis](https://redis.io/).

Afin de tester fonctionnellement ces services, nous avons d’abord eu l’idée d’installer une instance Redis sur nos serveurs de tests. Mais nous allions inéluctablement retomber sur les mêmes obstacles qu’avec MySQL :

- il n’est pas toujours possible de monter une instance Redis dédiée aux tests,
- mais surtout une telle architecture n’est pas viable dans un système de tests concurrentiels.

#### La librairie RedisMock

Nous nous sommes alors penchés sur la possibilité de bouchonner Redis, chose qui parait au premier abord plus aisée que de bouchonner Doctrine : Redis propose une API simple et bien documenté (même si abondante). Nous pensions trouver une librairie PHP déjà existante mais nos recherches sont restées vaines.

Nous avons donc créé la librairie [RedisMock](https://github.com/BedrockStreaming/RedisMock) qui reprend simplement [les commandes de l’API de Redis](https://redis.io/commands) et simule leur comportement grâce aux fonctions natives de PHP. Évidemment, toutes les commandes Redis n’ont pas encore été implémentées, seules celles qui sont utilisées dans nos tests sont présentes. Vous pouvez nous proposer l’implémentation de nouvelles fonctions Redis, selon vos besoins, via des Pull Requests sur le projet.

Toutes les commandes exposées par le mock sont testées unitairement via [atoum](https://www.atoum.org/) en reprenant pour chaque cas les spécifications énoncées dans la documentation Redis.

#### Utiliser RedisMock dans vos tests sur Symfony

Tout d’abord, il faut rajouter la dépendance à la librairie dans le `composer.json` et mettre à jour les vendors :

<script src="https://gist.github.com/fdubost/7893309.js"></script>

L’utilisation du mock reste très simple dans un projet Symfony. Chez M6Web, nous utilisons [notre propre composant Redis](https://github.com/BedrockStreaming/Redis), lui même basé sur [Predis](https://github.com/nrk/predis). Afin que le mock puisse complètement se faire passer pour la librairie Redis lors de l'execution des tests, nous avons implémenté une factory qui crée à la volée un adapteur héritant de la classe à bouchonner. La méthode `getAdpaterClass` permet de récupérer le nom de la classe à instancier.

<script src="https://gist.github.com/fdubost/8025392.js"></script>

Pour simplifier la création de l'adapteur et son injection dans l'application via le fichier `config_test.yml`, on peut utiliser la méthode `getAdapter` qui instancie directement l'objet sans paramètre. Il nous suffit alors de modifier la définition du service Redis dans l’environnement de test.

<script src="https://gist.github.com/fdubost/8025640.js"></script>

Et voilà, le tour est joué ! Les tests utilisent maintenant le mock à la place du véritable Redis. Attention cependant, si votre librairie utilise des fonctionnalités non implémentées dans RedisMock, vous pourriez faire face à des comportements aléatoires indésirables.

[RedisMock ](https://github.com/BedrockStreaming/RedisMock) est disponible en [open-source](https://tom.preston-werner.com/2011/11/22/open-source-everything.html) sur [le compte GitHub de M6Web](https://github.com/BedrockStreaming).

Enjoy !
