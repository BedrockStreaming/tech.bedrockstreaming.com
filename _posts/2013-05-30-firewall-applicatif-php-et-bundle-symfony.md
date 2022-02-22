---
layout: post
title: "Firewall applicatif PHP et bundle Symfony"
description: ""
author: cytron
category:
tags: [outil, php, symfony, open-source]
image:
  feature: posts/cytron/football.png
  credit: https://www.flickr.com/photos/23959858@N03
  creditlink:
comments: true
permalink: firewall-applicatif-php-et-bundle-symfony
---

Nous publions aujourd'hui notre firewall applicatif sur notre [compte GitHub](https://github.com/BedrockStreaming). Il se compose :

- d'un [composant PHP](https://github.com/BedrockStreaming/Firewall) (5.4+) gérant les IPs (V4 et V6), plages, wildcards, white/black lists, etc.
- d'un [bundle Symfony](https://github.com/BedrockStreaming/FirewallBundle) permettant d'utiliser le composant [Firewall](https://github.com/BedrockStreaming/Firewall) dans les controllers à l'aide des annotations et de retourner une réponse HTTP personnalisée.

Ils utilisent tous les deux [Composer](https://getcomposer.org/) et sont [disponibles sur Packagist](https://packagist.org/packages/m6web/).

#### Qu’est ce qu’un Firewall applicatif ?

Un Firewall applicatif permet de restreindre l’accès de certaines IPs à certaines parties d'une application. Vous pouvez par exemple définir la liste des IPs autorisées dans la section d’administration ou au contraire celles que vous souhaitez bloquer dans un forum.

#### Pourquoi cette implémentation ?

Nous souhaitions éviter de redéfinir l’ensemble des IPs chaque point de restriction. Nous avons donc cherché centraliser la configuration. Le [FirewallBundle](https://github.com/BedrockStreaming/FirewallBundle) permet de mettre en place des listes hiérarchisées ainsi que des configurations prédéfinies que nous pouvons réutiliser et adapter chaque besoin.

#### Comment contribuer ?

Si notre firewall applicatif répond certaines de vos problématiques, mais que vous souhaitez le voir évoluer, n'hésitez pas participer son développement :

- forkez les projets sur [GitHub](https://github.com/m6web),
- faites une branche par fonctionnalité,
- proposez-nous vos évolutions et optimisations via les [Pull Requests](https://github.com/blog/712-pull-requests-2-0).

Vous pouvez également nous remonter les problèmes rencontrés lors de son utilisation dans les [issues du composant](https://github.com/BedrockStreaming/Firewall/issues) ou les [issues du bundle](https://github.com/BedrockStreaming/FirewallBundle/issues).

Enfin, n'hésitez pas utiliser les commentaires de cet article pour nous faire part de vos réactions.