---
layout: post
title: "DroidCon London 2022"
description: "Ce que nous retenons de la DroidCon London 2022"
author: rpanoyan
category:
tags: [android, droidcon, conference]
color: rgb(251,87,66)
thumbnail: "images/posts/2022-10-29-droidcon-london/hall.jpg"
language: fr
comments: true
---

La communauté Android a apporté le soleil sur Londres les 27 et 28 octobre 2022. La DroidCon London a réuni plus de 1400 développeurs autour de l'écosystème Android, de ses outils et enjeux actuels. Jetpack Compose, évidemment, mais aussi Gradle, modularisation, optimisation et autres sujets plus divers ont été abordé lors de ce rendez-vous incontournable pour la communauté.

![Hall DroidCon London 2022](/images/posts/2022-10-29-droidcon-london/hall.jpg)

* TOC
{:toc}

## **It's build time !** - Rafi Panoyan

L'optimisation des temps de compilation a tenu une place très importante lors de cette édition de la DroidCon Londres 2022. 
Qu'il s'agisse d'optimiser ses temps de compilation, de repenser la création de modules et des dépendances entre eux, de factoriser les logiques des scripts, 
nous avons eu une emphase claire sur l'importance d'adresser ces sujets.

### Vous reprendriez bien un peu de Gradle Enterprise ?

[Nelson Osacky](https://twitter.com/nellyspageli) travaillant chez Gradle a présenté tous les outils que la formule [Gradle Entreprise](https://gradle.com/) met à disposition des développeurs permettant d'analyser en détail les compilations. 

Vous voulez vérifier que la compilation incrémentale est bien appliquée partout où cela est possible ? Un script permet de comparer, dans des conditions reproductibles, 
les entrées et sorties de vos builds, et analyse les tâches empêchant ce mécanisme centrale dans la réduction des temps de compilation.  

Vous voulez vous assurer que Gradle est bien capable de retrouver le cache de vos tâches sur un même poste ou bien depuis le cloud ? 
Là aussi des outils vous permettent d'identifier précisemment les points qui ne tirent pas parti de ces mécanismes.

On regrettera que ces outils soient disponible uniquement pour la formule payante de Gradle. Cependant, les [scans Gradle](https://scans.gradle.com/) sont, eux,
gratuits et illimités, et permettent tout de même de mesurer et comparer des compilations et ainsi suivre l'impact des différentes optimisations que vous pourriez apporter.

### "Déssine moi un module"

La modularisation ayant un impact sur les temps de compilation, plusieurs conférences ont abordé ce sujet très en vogue dans la communauté Android.

Un point de vue intéressant de [Josef Raska](https://twitter.com/josef_raska) nous invite à nous poser la question de la pertinence de modulariser selon le contexte. 
Ne pas suivre une tendance mais se poser la question de l'utilité d'un nouveau module, et encore plus de ses dépendances avec les autres modules, 
voilà des propos qui invitent à mesurer concrètement l'impact de ce type de chantier dans nos applications. 

Ainsi, si on peut penser que modulariser permet de réduire les temps de compilation (en tirant parti de la parallélisation des tâches par exemple), 
un chemin de dépendance trop longs entre le module initiale et la dépendance la plus profonde va entrainer une augmentation du temps de compilation.

Vigilence, donc, sur les "Hub de dépendances" (ces dépendances dont beaucoup de modules ont besoin, et qui ont besoin de beaucoup de modules).

1- Hub de dépendances
![Dependency hub](/images/posts/2022-10-29-droidcon-london/dep-hub.png)

De la même manière, un chemin de dépendance de trop grande profondeur ne permettra pas de tirer parti de la parallelisation des tâches de compilation.
Sur le schéma ci-dessous, on peut voir qu'un chemin de profondeur 4 existe pour aller du module applicatif vers le module le plus bas dans la hierarchie. 

josef Raska propose le schéma suivant avec un découpage API/Implémentation afin de réduire au maximum cette profondeur, et ainsi compiler plus rapidement. 

2- Profondeur de dépendances
![Dependency height](/images/posts/2022-10-29-droidcon-london/dep-height.png)
![Dependency height fix](/images/posts/2022-10-29-droidcon-london/dep-height-fix.png)

Android Studio et son analyse de dépendances peut être très utile pour vérifier et mesurer cela.
Josef Raska a d'ailleurs créé un plugin Gradle afin de spécifier ces règles à l'echelle d'un projet et de s'assurer qu'elles soient respectées : [modules-graph-assert](https://github.com/jraska/modules-graph-assert).

### Quick win

Après ces conseils très avisés mais structurellement chronophage à mettre en place (surtout sur de gros projets déjà créés), d'autres conférenciers se sont plutôt tournés vers les "quick-win". Des changements peu couteux, aux gains plus modestes mais qui s'additionnent, il en existe quelques uns.

Ainsi si gradle nous donne permet d'activer des fonctionnalités de caching (`org.gradle.unsafe.configuration-cache=true` pour gagner du temps lors de la phase de configuration par exemple), il est aussi possible de désactiver des fonctionnalités du plugin Android si elles ne nous sont pas utiles. 

Voici une petite liste des propriétés qui sont activés par défaut, même lorsqu'elles ne sont pas utilisées dans les modules : 
- android.defaults.buildfeatures.buildconfg
- android.defaults.buildfeatures.buildconfg.aidl
- android.defaults.buildfeatures.buildconfg.renderscript
- android.defaults.buildfeatures.buildconfg.resvalues
- android.defaults.buildfeatures.buildconfg.shaders

Si vous n'utilisez pas les valeurs liés à la configuration de votre compilation, ne générez pas de `BuildConfig`.
Si vous n'avez pas de resources dans votre module, désactiver la génération de resvalue !

Retrouvez ici la liste de ces fonctionnalités, leur utilité et leur valeur par défaut : [BuildFeatures](https://developer.android.com/reference/tools/gradle-api/4.1/com/android/build/api/dsl/BuildFeatures).

## Compose

## Divers

## Ce que nous retenons



