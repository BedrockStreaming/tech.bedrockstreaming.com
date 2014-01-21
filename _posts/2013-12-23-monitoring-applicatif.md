---
layout: post
title: "Monitoring applicatif : la boite à outils du développeur"
description: "TODO"
author:
  name: Kenny Dits
  avatar:
  email:
  twitter: kenny_dee
  facebook:
  github: M6Web
category:
tags: [monitoring, graphite, statsd]
image:
  feature: posts/sysadmin.jpg
  credit: 
  creditlink:
comments: true
---
Le monitoring applicatif est aujourd'hui l'un des éléments les plus important de tout notre DT. Plus un seul projet n'est mis en prod sans une multitude de métrique qui lui sont dédiés, où sans son dashboard associé.

	not monitored = not in production

# Les outils

Avant d'entrer dans le vif du sujet, revenons un peu sur les outils nous permettant de gérer notre système de monitoring applicatif :

* Graphite 
* StatsD

Et à des niveaux plus interne :

* M6WebBundleStatsD, pour monitorer plus facilement nos projets Symfony2
* Mayday, outil interne pour la gestion de l'alerting (basé sur des tresholds ou progression Graphite).

# Pourquoi monitorer :

Ne pas monitorer ses applicatifs, c'est un peu comme conduire votre voiture sans tableau de bord 

Comment savoir :

* que mon service ne fonctionne plus ?
* que certaines pages générent des erreurs applicatives ?
* que les temps de chargement de mon site s'empirent ?
* l'impact d'un retour antenne (suite à une pub télé par exemple), ou d'une actualité "hot" sur nos sites ?
* ce qui a fait tomber mes serveurs ?
* tout sur tout ...

Bref, comment ne plus être aveugle sur ce qui ce passe en production !


# Que monitorer :

La réponse évidente est tout :

![Monitoring applicatif](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_3722e8_62758f2adfd4ecfd07ea90a3f412afa536fd19620b885468.jpeg)

Mais avant de tout logguer, ce qui arrivera progressivement, commencer