---
layout: post
title: "Forum PHP Paris 2019"
description: "Nos retours du Forum PHP à Paris, les 24 et 25 octobre 2019"
author:
  name: Pascal Martin, Benoit Viguier
  avatar:
  email:
  twitter:
  facebook:
  github:
category:
tags: [forumphp, php, afup, 2019]
image:
  feature: posts/forumphp2019/header.jpg
  credit: Olivier Mansour
  creditlink: 
comments: true
language: fr
---

Comme tous les ans, nous étions au [Forum PHP 2019](https://event.afup.org/forumphp2019/) organisé par l’AFUP ! Nous avons assisté à de très bonnes conférences et échangé avec beaucoup d’entre vous. Voici quelques mots sur les interventions qui nous ont le plus marquées cette année.

### “PHP Pragmatic Development” et “L'architecture progressive”

Nous sommes plusieurs à avoir trouvé cette édition du Forum très *pragmatique*. Les deux conférences de [Frederic BOUCHERY](https://twitter.com/fredbouchery) et de [Matthieu NAPOLI](https://twitter.com/matthieunapoli) y sont sans doute pour quelque chose !

Comme Matthieu l’a rappelé, pas besoin d’une architecture *parfaite* pour créer un produit *qui marche*. Au contraire, à nous développeurs de savoir choisir les bonnes solutions pour répondre à un besoin. Et faire *simple* peut apporter infiniment plus de valeur que mettre en place une architecture parfois trop *complexe* !

Frederic a souligné qu’être *pragmatique* c’était savoir écouter son expérience. Peut-être même savoir dialoguer entre développeurs seniors et débutants, pour que l’expérience des uns limite les erreurs des autres ?

### PHP 8 et Just In Time Compilation

Le passage de PHP 5 à PHP 7 a apporté des gains énormes en terme de performances, et nous sommes tous impatients de voir si PHP 8 nous réservera les mêmes surprises.

Le JIT est une bonne piste, en permettant de compiler le Php directement en langage machine, pour se passer de l’exécution sur la machine virtuelle de Php. [Benoit JACQUEMONT](https://twitter.com/bjacquemont) a très bien détaillé l’histoire du JIT dans l’écosystème PHP, son objectif et son fonctionnement. Même si les tests qu’il a effectué ne montrent pas de gains perceptibles, le sujet était très intéressant.

À retenir : l’optimisation du CPU pour PHP n’a pas beaucoup d’intérêt si votre application passe son temps à attendre des I/O.

### Aggressive PHP quality assurance in 2019

[Marco PIVETTA](https://twitter.com/ocramius) est très actif dans la communauté Php, notamment pour l’ORM Doctrine. Il nous a présenté les outils qu’il considère comme indispensables pour assurer la qualité et la robustesse d’un projet, mais aussi l’ordre d’importance pour les mettre en place selon lui.

Si nous étions déjà convaincu par l’importance de l’analyse statique, nous avons été intrigués par la place qu’il accordait à tous ces outils basés sur les annotations Php. Par exemple, il n’hésite pas à laisser publiques les propriétés de ses classes immutables, sans méthode `get` ni `set`, et déléguer à la CI la responsabilitéde vérifier que toutes les instances des classes avec l’annotation `@psalm-immutable` ne soient jamais modifiées… déroutant, mais à méditer.

### Mercure, et PHP s'enamoure enfin du temps réel

Pouvoir pousser, en temps réel, des informations depuis du code PHP server-side vers des centaines de milliers de clients, sans allumer des dizaines de serveurs ? C’est la promesse du projet [Mercure](https://mercure.rocks/), que [Kévin DUNGLAS](https://twitter.com/dunglas) est venu nous présenter !

Nous avions entendu parler de ce projet sans jamais encore prendre le temps de le tester ni d’y penser plus en profondeur… Après cette conférence, un POC s’impose ;-)

### Tout pour se préparer à PHP 7.4

La prochaine version de PHP, la 7.4, devrait être publiée en fin d’année. Comme tous les ans, elle apportera un petit lot de nouveautés que [Damien SEGUY](https://twitter.com/faguo) nous a présentées.

Nous avons hâte de pouvoir exploiter certaines d’entre elles. En particulier, le pre-loading, qui pourrait améliorer encore notre tenue à la charge lors de nos pics de trafic quotidiens !

### “En vrac”

La dernière conférence du premier jour de ce Forum, par [Marie-Cécile GODWIN](https://twitter.com/mcpaccard) et [Thomas DI LUCCIO](https://twitter.com/zenhysteria), visait à nous ouvrir les yeux : en tant que designer, concepteurs ou développeurs d’applications et d’outils numériques, nous devons penser au futur ; les ressources de notre planète ne sont pas infinies.

Celle du second jour était plus légère : Roland LEHOUCQ nous a parlé de physique, en tirant ses exemples et anecdotes de Star Wars. Qu’est-ce que la Force ? Quelle puissance est capable d’exploiter Palpatine ? Ou combien de gigawatts extrait un sabre-laser ? Une très bonne clôture pour ce Forum !

![Quelle est la puissance d'un sabre laser ?](/images/posts/forumphp2019/puissance-sabre-laser.jpg)

Nous avons aussi présenté deux conférences, autour de sujets que nous pratiquons au quotidien chez M6 Distribution :

 * [Pascal MARTIN](https://twitter.com/pascal_martin) a donné quelques pistes pour améliorer la résilience d’applications, en insistant sur le fait que nos plateformes, de plus en plus complexes, ne sont jamais opérationnelles : elle se trouvent en permanence dans un état de service partiellement dégradé.
 * [Benoit VIGUIER](https://twitter.com/b_viguier) a continué dans la lancée de sa conférence de l’année dernière, en présentant cette fois-ci un retour d’expérience après un an d’utilisation de PHP asynchrone en production. Spoiler alert : PHP répond très bien au besoin et les générateurs sont *le bien* ! À noter aussi son intervention aux traditionnels Lightning Talks, ou il nous a présenté une idée un peu folle: faire des [interfaces graphiques avec Php](https://github.com/b-viguier/ForumPhp2019-LT).

L’[AFUP Day 2020 Lyon](https://event.afup.org/afup-day-2020/afup-day-2020-lyon/) est déjà en train de s’organiser ! Nous y serons sans doute en nombre et espérons vous y rencontrer à nouveau !

![They did not know it was impossible, so they did it… in PHP!](/images/posts/forumphp2019/impossible-did-it-in-php.jpg)
