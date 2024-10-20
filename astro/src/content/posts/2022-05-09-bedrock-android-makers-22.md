---
layout: ../../layouts/post.astro
title: Retour sur l'Android Makers 2022
description: Notre équipe de développeurs Android était à l'Android Makers 2022 !
author: r_panoyan
tags: [android, mobile, conference, makers]
color: rgb(251,87,66)
thumbnail: "../../../../images/posts/2022-05-09-bedrock-android-makers-2022/am2022.jpg"
---

## Que c'est bon de se retrouver !

Après deux ans sans conférence en présentiel, l'Android Makers a fait son grand retour les 25 et 26 avril 2022, pour le plus grand bonheur de la communauté Android. 
L'équipe de développeurs Android de Bedrock (dont je fais partie) a partagé ce bonheur en assistant à ce rendez-vous incontournable. Jetpack Compose, accessibilité, optimisation de build et autres sont autant de sujets en maturation constante : essayons d'en faire le tour ensemble.

!["Android Makers 2022"](/images/posts/2022-05-09-bedrock-android-makers-2022/am2022.jpg)

* TOC
{:toc}

### Penser <a name="Penser"></a>

#### Design System et Jetpack Compose <a name="DesignSystem"></a>

Plusieurs conférences ont évoqué le sujet du Design et plus particulièrement l'implémentation d'un Design System (DS) avec Jetpack Compose. [François Blavoet](https://twitter.com/francoisblavoet) nous a partagé l'expérience d'Instacart à ce sujet, en dévoilant quelques détails d'implémentations de leurs API mises à disposition des *features engineers*, afin de leur faciliter l'intégration des éléments du DS.  
Parallèlement, il nous a aussi invité à réflechir sur la nécessité d'intégrer Material Design dans notre implémentation du DS. En effet, si le cadre Material peut parfois s'avérer utile, il est quelques fois trop contraignant et pas toujours adapté aux besoins spécifiques de nos applications.

#### Accessibilité <a name="Accessibilité"></a>

Voilà un sujet qu'il est important d'évoquer, tant il est facile d'oublier d'adresser une application à tous. Cette édition de l'Android Makers a eu la chance d'accueillir une très belle conférence de [Fanny Demey](https://twitter.com/FannyDemey) et [Gerard Paligot](https://twitter.com/GerardPaligot) sur le sujet de l'accessibilité. Dans une séance de Live Coding teintée d'un jeu de rôle sur le thème de l'émission **C'est pas sorcier !**, nous avons pu faire le tour de plusieurs points d'attention afin d'inclure au mieux nos utilisateurs porteurs de handicaps :
- ne pas donner d'informations inutiles via TalkBack, comme les *contentDescription* des icônes décoratives
- penser à la manière dont TalkBack va assembler les informations provenant de plusieurs vues distinctes
- donner un retour d'action sur les clics de boutons et mieux placer ces actions lorsque le mode accessibilité est activé
- et bien d'autres !  

Le Live Coding a pu également démontrer à quel point *Jetpack Compose* considère l'accessibilité comme une fonctionnalité cruciale grâce à des APIs très complètes (je pense ici à [`Modifier.sementics`](https://developer.android.com/jetpack/compose/semantics) par exemple).

#### Modularisation <a name="Modularisation"></a>

[Jean-Baptiste Vincey](https://twitter.com/JBVincey), développeur chez Deezer, a partagé l'expérience de son équipe concernant la modularisation de leur code pour gérer le nombre grandissant d'applications dans leur catalogue. Basé sur la création de bibliothèques internes, plusieurs stratégies ont été explorées avec leurs bons et mauvais côtés. Lancé dans un chantier similaire, il est important pour Bedrock de voir comment d'autres acteurs du milieu ont répondu à ces questions, sans oublier que chaque entreprise a sa propre réponse qui doit s'adapter à ses process, son organisation et son produit.

#### Support de Chrome OS <a name="ChromeOS"></a>

[Frédéric Torcheux](https://twitter.com/bowser_f) et Pierre Issartel, lors de leur conférence sur l'adaptation Chrome OS des applications Android, ont fait un constat intéressant : le nombre de Chromebook vendu a explosé récemment pour [dépasser le nombre de Mac vendu](https://9to5google.com/2021/02/16/chrome-os-2020-sales/). Sachant qu'un nombre grandissant de Chromebook a accès au Play Store, il est de plus en plus important d'adapter ses applications pour cet usage.  
En vrac : exploiter le potentiel du curseur de la souris, naviguer dans l'application sans jamais quitter le clavier, supporter l'environnement multi-fenêtré et le redimensionnement de celles-ci, autant de points d'améliorations comportant pièges à éviter et bonnes pratiques.

### Développer <a name="Développer"></a>

#### Splashscreen Android 12 <a name="Splashscreen"></a>

Deux développeurs de chez Google nous ont plongé dans les entrailles du `WindowManager` d'Android, ce composant qui est chargé d'orchestrer les applications que nous utilisons tous les jours : charger une application, la placer à l'écran puis la dessiner, la déplacer et gérer son cycle de vie, autant de responsabilités pour un `WindowManager` complexe à maitriser.  
À travers cette conférence pointue, [Vadim Caen](https://twitter.com/vadimcaen) et [Pablo Gamito](https://twitter.com/Pablo_Gamito) ont rebondi sur le nouveau système de SplashScreen d'Android 12 pour nous expliquer quel problème il doit résoudre (essentiellement le ressenti de lenteur au lancement d'une application) et comment en tirer parti. À ce titre, la documentation de Google sur la [migration vers le SplashScreen d'Android 12](https://developer.android.com/guide/topics/ui/splash-screen/migrate) est incontournable.

Le nouveau Splashscreen pour Android 12 comporte son lot de challenges, notamment pour tenir compte des animations. Chez Bedrock, les reflexions à ce sujet ont démarré, et nous comptons partager un retour d'expérience sur notre propre migration !

#### Tester les coroutines <a name="Coroutines"></a>

[Márton Braun](https://twitter.com/zsmb13), aussi développeur chez Google, a présenté les nouveautés de la bibliothèque *kotlinx-coroutines-test* en version 1.6+. Exit `runBlockingTest`, place au `runTest` qui permet, grâce à son `TestCoroutineScheduler`, de gérer les délais et l'ordre d'execution de toutes les coroutines lancées dans un test.  
L'ancienne version des API de test étant maintenant dépréciée, cette nouvelle version est encore experimentale mais vouée à passer en état stable, tant elle parait plus mature que la précédente.  
Les `Flow` et `StateFlow` n'ont pas été oubliés puisqu'ils ont aussi leurs spécifités en matière de tests.

### Optimiser <a name="Optimiser"></a>

#### Toujours plus de CI <a name="CI"></a>

Chez Bedrock, la CI tient une place particulière dans nos process de release, et il est toujours intéressant de voir comment d'autres entreprises se saisissent de cet outil et améliorent leur process.  
Après les rappels toujours pertinent sur l'importance de déléguer le maximum de tâches répétitives à nos environnement de CI, [Xavier F. Gouchet](https://twitter.com/xgouchet), développeur chez Datadog, a présenté divers outils pour y parvenir.  

[Detekt](https://github.com/detekt/detekt), un plugin Gradle permet d'aller encore plus loin qu'Android Lint en offrant l'analyse statique de n'importe quel code Kotlin. Son extensibilité nous est exposée *via* une API sur le pattern visiteur, redoutablement efficace pour parcourir le PSI (*Program Structure Interface*) de Kotlin. D'autres outils peuvent également être efficaces pour parcourir cette interface.  

Xavier Gouchet présente également [KSP (*Kotlin Symbol Processor*)](https://github.com/google/ksp), le projet sponsorisé par Google voué à remplacer KAPT, son ancêtre basé sur Java. Combiné avec [Kotlin Poet](https://square.github.io/kotlinpoet/), cet outil permet d'automatiser la génération de code Kotlin à partir d'un code source annoté dans le projet.  

Pour aider au développement autour du PSI Kotlin, Xavier Gouchet recommande l'excellent plugin [PSIViewer](https://plugins.jetbrains.com/plugin/227-psiviewer) pour IDE Jetbrains.

#### Optimisation du temps de build <a name="BuildOptim"></a>

[Zac Sweers](https://twitter.com/ZacSweers) est venu nous présenter la manière dont Slack, entreprise pour laquelle il travaille, optimise les builds Gradle. Les projets se complexifiant avec toujours plus de code et de modules, les temps de build ont tendance a augmenter.  

Cette conférence a mis en lumière diverses optimisations pour tirer pleinement parti de Gradle et de ses nouvelles fonctionnalités : 
- désactiver les fonctionnalités non utilisées du plugin Android
- profiter du cache, y compris sur serveur
- éviter d'utiliser `buildSrc` pour factoriser du code
- écrire son propre plugin de convention gradle
- avoir un compte Gradle Entreprises pour profiter des Gradle Build Scans afin de déterminer quels sont les points de friction du projet, que ce soit pour l'utilisation du cache, la parallélisation, l'invalidation des builds, l'optimisation des arguments de la JVM...
- parfois même, acheter du nouveau matériel ! (Apple Silicon)

Réduire le temps de build est un enjeu constant, et participe au confort du développeur au quotidien.

### Extras <a name="Extras"></a>

#### Création d'un UI Toolkit avec Romain Guy et Chet Haase <a name="UIToolkit"></a>

Une conférence très intéressante a vu [Romain Guy](https://twitter.com/romainguy) et [Chet Haase](https://twitter.com/chethaase) nous présenter un projet experimental d'UI Toolkit maison, [Apex](https://github.com/romainguy/experiment-apex), très proche de *Jetpack Compose* dans son API. 
Cet exercice original a été un moyen de faire valoir le concept d'[Entity component system](https://en.wikipedia.org/wiki/Entity_component_system), un pattern se basant sur la composition pour enrichir les comportements des entités d'un système.  

Leur présentation a mis en lumière la philosophie d'un UI Toolkit mais a aussi et surtout souligné la quantité de travail à accomplir pour passer d'un projet experimental à un toolkit utilisable en production. Enrichir sa boite à outils avec le maximum de widgets différents, permettre une personnalisation maximale aux développeurs, rendre le moteur de rendu multi-plateforme, autant de tâches nécessaires pour rendre votre Toolkit vraiment utile pour la communauté aujourd'hui.

### En conclusion <a name="Conclusion"></a>

!["Conclusion"](/images/posts/2022-05-09-bedrock-android-makers-2022/end.jpg)

Cette édition de l'Android Makers 2022 s'est conclue sur une conférence humoristique inédite de la part de Chet Haase et Romain Guy. Il a été question de tourner en dérision la communauté des développeurs sur le nombre de nouveaux patterns de développement qui sortent régulièrement et les discussions acharnées (et parfois virulentes) autour de ces derniers.  
Cela a été une très bonne manière de prendre du recul sur notre communauté Android, et de se féliciter, tout de même, de la recherche constante d'amélioration des pratiques de développement au service de la qualité de nos produits et de leur accessibilité.