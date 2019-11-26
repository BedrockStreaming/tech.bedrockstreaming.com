---
layout: post
title: "ScalaIO LYon 2019"
description: "Nos retours sur la ScalaIO à Paris, les 30 et 31 octobre 2019"
author:
  name: Fabien de Saint pern, Adrien Chaussende, 
  avatar:
  email:
  twitter:
  facebook:
  github:
category:
tags: [scalio, scala, lyon, 2019]
image:
  feature: posts/scalio2019/header.jpg
  credit: Fabien de Saint pern
  creditlink: 
comments: true
language: fr
---

Nous étions à la [ScalaIO 2019](https://schedule.scala.io/#/day/2) organisée à Lyon ! 
Nous avons assisté à de très bonnes conférences. Voici quelques mots sur les interventions qui nous ont le plus marquées cette année.


### A live-coding introduction to Mill: finally a build tool we can all understand!

Mill est outil de build qui permet de coder en scala les différentes étapes de notre build. La puissance de cet outil vient principalement du fait qu’on écrit du code. On peut donc effectuer des opérations très complexes lors du build. Les fonctionnalités principales sont :
 * La possibilité de builder avec différentes versions de scala une même appli
 * La possibilité de ne builder que le code qui a été modifié (grâce à l’utilisation de zinc)
 * La possibilité de lancer le build automatiquement à la modification d’un fichier (option watch)
 
### Context Buddy: the tool that knows your code better than you

Context Buddy est un plugin pour votre IDE (Intellij) qui permet de mieux parcourir l’historique des modifications de votre code. ContextBuddy vous permet de savoir grâce à la coloration syntaxique exactement quel élément de la ligne a été modifié. De plus, comme il se base sur les données du compilateur, il est capable de voir si une même classe utilise une nouvelle version de la lib voire même une nouvelle lib.

### Railway Oriented Programming - Une approche fonctionnelle pour la gestion d'erreurs

Cette conférence basée sur celle de Scott Wlaschin explique très bien la composition de fonction et l’intérêt dans le cas de la gestion des erreurs. En effet, le code devient plus lisible et plus facilement maintenable.

### Metals - your next IDE?

Metals est un Language Server Protocole pour Scala, ce qui permet de l’utiliser en tâche de fond pour “n’importe quel” éditeur de texte ou IDE. 
Concrètement, Metals n’apporte pas aujourd’hui 100% des fonctionnalités d’Idea, mais les manques sont vraiment minimes. En revanche, tout ce qui est implémenté semble être plus efficace que sur Idea.
Les principaux avantages que j’ai retenu :
 * Presque tout comme Idea mais beaucoup plus léger et rapide (pour certaines tâches)
 * Fonctionne avec Maven, SBT, Fury, Gradle, Mill
 * Gloop permet le GoToDefinition et plein de choses sympas, plus rapides que l’indexation intelliJ
 * Fonctionne partiellement pour Java (juste le nécessaire)
 * Compilation incrémentale avec Zinc
 * En plein développement, de super features dans les mois à venir
 * Tout ce que j’oublie ;-)

### Running Amok: Igniting a Documentation Revolution

L’idée de Jon Pretty (@propensive) est de décorréler la documentation du code (différent repo git) et de pouvoir rétro-documenter (mettre à jour la doc des version antérieures).
Amok permet de relier chaque fichier de documentation à un commit, à partir duquel cette documentation est valide, permettant ainsi de sortir une release du document même si la documentation n’est pas entièrement terminée (problème récurrent en open-source).

### Refined, des Types sur mesure

Permet de mettre des conditions sur un type. On peut ajouter des prédicats au type (notamment des regex sur les Strings, des range de valeurs pour les Int, etc) et ainsi réduire les valeurs possibles. Validation au compile-time quand possible, et pour le runtime des erreurs très explicites sont jetées.
Pour les avantages, voir T(ype)DD, principalement la sécurité apportée et plus besoin de tester ce qui est inclu dans les prédicats, Refined le fait pour nous.

### Apache Spark et le machine learning : rêves et réalités

A travers des exemples basés sur une population de citrouille (c’était Halloween ;-)), Nastasia Saby (@saby_nastasia) nous a fait une présentation de Spark ML en prenant en exemple KMeans, un des algorithmes de clustering disponibles. Elle en a montré les limites et présenté KMedoids, n’existant pas dans Spark ML et plus complexe mais convergeant mieux. Elle a terminé sur la nécessité de mettre en balance l’utilisation d’outils communautaires testés et reconnus mais parfois limités, versus développer ses propres librairies parfaitement adaptées à ses besoins, au risque de se confronter à des problèmes que d'autres ont déjà réglés.

Les slides : https://slides.com/nastasiasaby/spark-ml-scala-io
