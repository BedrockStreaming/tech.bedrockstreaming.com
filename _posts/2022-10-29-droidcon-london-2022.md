---
layout: post
title: "Ce que nous retenons de la DroidCon London 2022"
description: "Retour sur la virée de Bedrock à la DroidCon London 2022, et ce que nous en retenons"
author: [rpanoyan, d_yim, d_cuny]
category:
tags: [android, droidcon, conference]
color: rgb(251,87,66)
language: fr
comments: true
---

La communauté Android a apporté le soleil sur Londres les 27 et 28 octobre 2022. La droidcon London a réuni plus de 1400 développeurs autour de l'écosystème Android, de ses outils et enjeux actuels. Jetpack Compose, évidemment, mais aussi Gradle, modularisation, optimisation et autres sujets plus divers ont été abordés lors de ce rendez-vous incontournable pour la communauté.

![DroidCon London 2022 entrance](/images/posts/2022-10-29-droidcon-london/entrance.jpg)

* TOC
{:toc}

## Ça compile ? - Rafi Panoyan

Les sujets de compilation ont tenu une place très importante lors de cette édition de la DroidCon Londres 2022. 
Qu'il s'agisse d'optimiser ses temps de compilation, de repenser la création de modules et des dépendances entre eux, de factoriser les logiques des scripts de compilation, 
nous avons eu une emphase claire sur l'importance d'adresser ces sujets.

### Vous reprendrez bien un peu de Gradle Enterprise ?

[Nelson Osacky](https://twitter.com/nellyspageli), qui travaille chez Gradle, a présenté tous les outils que la formule [Gradle Entreprise](https://gradle.com/) met à disposition des développeurs pour analyser en détail les compilations. 

Vous voulez vérifier que la compilation incrémentale est bien appliquée partout où cela est possible ? Un script permet de comparer, dans des conditions reproductibles, 
les entrées et sorties de vos builds, et analyse les tâches empêchant ce mécanisme central dans la réduction des temps de compilation.  

Vous voulez vous assurer que Gradle est bien capable de retrouver le cache de vos tâches sur un même poste ou bien depuis le cloud ? 
Là aussi des outils vous permettent d'identifier précisemment les points qui ne tirent pas parti de ces mécanismes.

On regrettera que ces outils soient disponibles uniquement pour la formule payante de Gradle. Cependant, les [scans Gradle](https://scans.gradle.com/) sont, eux,
gratuits et illimités, et permettent tout de même de mesurer et comparer des compilations et ainsi suivre l'impact des différentes optimisations que vous pourriez apporter.

### *Dessine-moi un module*

La modularisation ayant un impact sur les temps de compilation, plusieurs conférences ont abordé ce sujet très en vogue dans la communauté Android.

Un point de vue intéressant de [Josef Raska](https://twitter.com/josef_raska) nous invite à nous poser la question de la pertinence de modulariser selon le contexte. 
Ne pas suivre une tendance mais se poser la question de l'utilité d'un nouveau module, et encore plus de ses dépendances avec les autres modules, 
voilà des propos qui invitent à mesurer concrètement l'impact de ce type de chantier dans nos applications. 

Ainsi, si on peut penser que modulariser permet de réduire les temps de compilation (en tirant parti de la parallélisation des tâches par exemple), 
un chemin de dépendance trop long entre le module initial et la dépendance la plus profonde va entraîner une augmentation du temps de compilation.

Vigilance, donc, sur les "hubs de dépendances" (ces dépendances dont beaucoup de modules ont besoin, et qui ont besoin de beaucoup de modules).

1- Hub de dépendances
![Dependency hub](/images/posts/2022-10-29-droidcon-london/dep-hub.png)

De la même manière, un chemin de dépendance de trop grande profondeur ne permettra pas de tirer parti de la parallélisation des tâches de compilation.
Sur le schéma ci-dessous, on peut voir qu'un chemin de profondeur 4 existe pour aller du module applicatif vers le module le plus bas dans la hiérarchie. 

Josef Raska propose le schéma suivant avec un découpage API/implémentation afin de réduire au maximum cette profondeur, et ainsi compiler plus rapidement. 

2- Profondeur de dépendances
![Dependency height](/images/posts/2022-10-29-droidcon-london/dep-height.png)
![Dependency height fix](/images/posts/2022-10-29-droidcon-london/dep-height-fix.png)

Android Studio et son analyse de dépendances peut être très utile pour vérifier et mesurer cela.
Josef Raska a d'ailleurs créé un plugin Gradle afin de spécifier ces règles à l'echelle d'un projet et de s'assurer qu'elles soient respectées : [modules-graph-assert](https://github.com/jraska/modules-graph-assert).

### Trucs et astuces

Après ces conseils très avisés mais structurellement chronophages à mettre en place (surtout sur de gros projets déjà créés), d'autres conférenciers se sont plutôt tournés vers les "quick-win". Des changements peu coûteux, aux gains plus modestes mais qui s'additionnent, il en existe quelques-uns.

Ainsi, si gradle nous permet d'activer des fonctionnalités de caching (`org.gradle.unsafe.configuration-cache=true` pour gagner du temps lors de la phase de configuration par exemple), il est aussi possible de désactiver des fonctionnalités du plugin Android si elles ne nous sont pas utiles. 

Voici une petite liste des propriétés qui sont activées par défaut, même lorsqu'elles ne sont pas utilisées dans les modules : 
- `android.defaults.buildFeatures.buildConfg`
- `android.defaults.buildFeatures.aidl`
- `android.defaults.buildFeatures.renderScript`
- `android.defaults.buildFeatures.resValues`
- `android.defaults.buildFeatures.shaders`

Si vous n'utilisez pas les valeurs liées à la configuration de votre compilation, ne générez pas de `BuildConfig`.
Si vous n'avez pas de resources dans votre module, désactivez la génération de `resValue` !

Retrouvez ici la liste de ces fonctionnalités, leur utilité et leur valeur par défaut : [BuildFeatures](https://developer.android.com/reference/tools/gradle-api/4.1/com/android/build/api/dsl/BuildFeatures).


## Design the world - Damien Cuny

Il y a un peu plus d'un an sortait la version 1.0 de [Jetpack Compose](https://developer.android.com/jetpack/compose), le nouveau toolkit déclaratif pour la création d'interface Android. D'autre part, le design system [Material Design 3](https://m3.material.io/) vient de sortir en version stable et son implémentation [Compose Material](https://developer.android.com/jetpack/androidx/releases/compose-material) sont également disponibles.  
Avec tout cela, le design a, cette année encore, tenu une place de choix dans l'agenda de cette droidcon 2022 à Londres.  
Mais comment utiliser tout cela correctement ? Comment s'en servir pour implémenter un design system personnalisé ? Jusqu'où peut-on aller ?
Autant de questions auxquelles ont tenté de répondre les nombreuses présentations sur le sujet.  

### To Compose

Compose facilite beaucoup de choses dans l'implémentation et le maintien d'interfaces sur Android. Cependant, cela nécessite de réapprendre à faire certaines choses que l'on maîtrise déjà avec le système de [`View`](https://developer.android.com/reference/android/view/View).  
Dessiner dans un canvas en est une, et [Himanshu Singh](https://twitter.com/hi_man_shoe) dans sa présentation *"Composing in your canvas"*, nous montre les pièges à éviter pour réaliser cela avec Compose.  

La recomposition peut également être source de problèmes et de latences si Compose est mal utilisé. Dans sa présentation *"Understanding recomposition performance pitfalls"*, [Jossi Wolf](https://twitter.com/jossiwolf) et [Andrei Shikov](https://twitter.com/shikasd_) nous donnent, à partir d'un exemple concret, les meilleures astuces pour l'utiliser à bon escient.  

### Design System

En faisant le parallèle avec la saga épique de JRR Tolkien, [Daniel Beleza](https://medium.com/@danielbbeleza), dans sa présentation *"One design system to rule them all"*, nous explique comment il a réussi, tout en se passant de [Material design](https://material.io), à unifier et automatiser son propre design system.  
Cela demande, évidemment, une collaboration totale de la part de l'équipe de design, mais une fois cette intégration faite, les bénéfices et l'autonomie se ressentent de part et d'autre.  
Des outils tel que [Figma](https://www.figma.com/), [Kotlin Poet](https://square.github.io/kotlinpoet/) ou des plugins Android Studio custom lui ont permis d'automatiser ensuite ce processus.  

Material Design est un design system. Il a l'avantage d'être bien documenté, uniforme et régulièrement enrichi. De plus, il est déjà implémenté dans l'ancien système de View Android et plus récemment dans Jetpack Compose avec [Compose Material](https://developer.android.com/jetpack/androidx/releases/compose-material).  

Une des différences majeures entre Compose et le système de View sur Android est son découpage. Dans Compose, Material n'est implémenté et n’apparaît que dans la partie la plus hautes alors que dans le système de View, son implémentation est répartie dans toutes les couches de la librairie.  
Il est donc assez complexe de se passer de Material avec le système de View mais cela est complétement envisageable, voire recommandé, dans certains cas avec Compose.  

![Views VS Compose](/images/posts/2022-10-29-droidcon-london/views-vs-compose.png)

Pour illustrer cela [Sebastiano Poggi](https://twitter.com/seebrock3r) (la moitié de [Coding with the italians](https://www.youtube.com/c/CodewiththeItalians)) est venue nous présenter, dans *"Compose beyond Material"*, les questions à se poser avant de se lancer dans son design system et comment le package [Foundation](https://developer.android.com/jetpack/androidx/releases/compose-foundation) de Compose peut nous aider.  

Pour terminer il nous donne de nombreux conseils concrets sur l'implementation de composants sans Material. Le principal, rejoint la présentation d'introduction de cette Droidcon, *"The Silver Bullet Syndrome Director's Cut - Complexity Strikes Back!"*, un bon design system est un design system qui correspond à nos besoin et qui y répond le plus simplement possible.  

### Vers l'infini et au dela

[Chris Bane](https://twitter.com/chrisbanes) et [Nacho Lopez](https://twitter.com/mrmans0n) dans leur présentation *"Branching out Jetpack Compose"*, nous ont raconté comment l'aventure du passage à Compose s'est déroulée chez Twitter, qui a été l'un des premier à l'adopter.  
Avec une code base aussi conséquente (plus de **1000 modules**, dont 300 pour le design, répartis sur plus de 30 équipes), ils ont dû progressivement convaincre les équipes, les former et les accompagner.  
La question de continuer à utiliser Material Design s'est également posée chez eux. Ils l'ont dans un premier temps conservé pour faciliter le passage sur Compose, pour finalement le retirer complètement en se basant, eux aussi, sur le package Foundation.  
Leur présentation résume bien l'ensemble des étapes et des questions par lesquelles ils sont passés pour accomplir cette transition.  

Afin de remettre les choses en perspective, [Ash Davies](https://twitter.com/askashdavies) nous rappelle que Compose est un simple pattern de développement multiplateforme. De ce fait, il peux être appliqué à autre chose qu'à de l'UI comme le propose Jetpack Compose. Il nous explique dans *"Demystifying Molecule: Running Your Own Compositions For Fun And Profit"*, comment l'appliquer à la couche domaine d'un projet pour le "Fun".  

## **La gestion des erreurs** - David Yim

La gestion des erreurs a été le sujet de plusieurs présentations à la Droidcon. Ces présentations avaient pour objectif de servir de piqûre de rappel sur l'importance de bien prendre en compte ce problème concernant tous les développeurs. Aujourd'hui, nous avons tous les outils pour gérer facilement nos erreurs. Cependant, par paresse et comme nous préférons penser de manière positive, nous ne pensons souvent qu'au cas de succès et les cas d'erreurs sont souvent brouillons voire ne sont même pas spécifiés.

Les speakers m'ont marqué avec un exemple de mauvaise gestion d'erreur qui a coûté plusieurs centaines de milliers de dollars. L'exemple parlait d'une faille chez 7 eleven, une chaîne de supérette dont le site au Japon a été victime. Dans la base de donnée de ce projet, les développeurs ont ajouté un champ "date de naissance" comme nullable. Plus tard, ce champ est devenu non nullable. Par paresse, le développeur qui a rendu ce champ non nullable a mis par défaut un 1er janvier 2019 sur cette date lorsqu'elle n'était pas renseignée, simplement pour satisfaire son compilateur. Le problème est que ce champ fut plus tard utilisé dans la fonctionnalité de mot de passe oublié du site. En utilisant la date par défaut du 1er janvier 2019, un hacker a pu récupérer des comptes utilisateurs et voler des informations bancaires. Cet exemple m'a marqué par l'habitude que nous avons en tant que développeur de nous soucier que de satisfaire notre compilateur plutôt que de vraiment discuter de solutions réfléchies à nos problèmes techniques.

Plusieurs méthodes de gestion des erreurs existent et les speakers en ont présentés quelques-unes.

#### Vérification des entrées

L'une des méthode pour être certain de ne pas avoir de problème est de vérifier les données que l'on reçoit. Prenons un exemple simple :

`data class User(val email: String)`

Rien n'empêche d'instancier cette classe de la manière suivante :

`val user = User(email = "")`

Cela peut créer des problèmes par le futur, alors qu'il y a un moyen d'éviter cela

```
class Email(value: String) {
    val value: String =
        if (value.isEmpty() || !Regex(EMAIL_FORMAT).matches(value)) {
            throw Exception("Email format is not correct")
        } else {
            value
        }
}

data class User(private val email: Email)
```

Cette méthode peut paraître un peu exagérée dans cet exemple. Mais dans un contexte où la classe `User` serait utilisée par un grand nombre d'équipes et que les règles métier de l'`Email` serait complexe, cette méthode prendrait tout son sens pour éviter d'avoir de mauvaises surprises !

#### Le type Either

Le type `Either` est un moyen de différencier les cas de succès des cas d'erreurs. Il est disponible dans la [librairie Arrow](https://arrow-kt.io/) ou facilement reproduisible :

```
sealed class Either<out A, out B> {
    class Left<A>(val value: A): Either<A, Nothing>()
    class Right<B>(val value: B): Either<Nothing, B>()
}
```

L'utilisation de ce type est qu'il est soit un type `A`, soit un type `B`. On peut ainsi définir par exemple que le `A` est un cas de succès et que le type `B` est un cas d'erreur.

```
data class User(val name: String)

var either: Either<User, Exception>

when (either) {
    is Either.Left -> {
        println("The user is called ${(either as Either.Left<User>).value.name}")
    }
    is Either.Right -> {
        (either as Either.Right<Exception>).value.printStackTrace()
    }
}
```

Grâce à ce type, on peut par exemple savoir si un appel à une API a réussi ou non, ce qui nous permet de gérer plus facilement nos cas d'erreurs.

#### Kotlin Result

La classe `Result` est similaire au type `Either` et a pour avantage d'être directement inclue dans Kotlin et que l'on n'a pas à se synchroniser pour savoir si le côté gauche est le cas de succès ou d'erreur.

```
data class User(val name: String)

var result: Result<User>

when {
    result.isSuccess -> {
        println("The user is called ${result.getOrNull()?.name}")
    }
    result.isFailure -> {
        result.exceptionOrNull()?.printStackTrace()
    }
}

OU

result.onSuccess { user ->
    println("The user is called ${user.name}")
}.onFailure { throwable ->
    throwable.printStackTrace()
}
```

### Conclusion

Plusieurs méthodes existent pour prendre en compte nos cas d'erreurs. Laquelle est la meilleure ? Eh bien vous vous y attendez sûrement, mais ça dépend ! On choisira une méthode ou une autre selon ce qui nous arrange par rapport à la situation, nos choix d'outils techniques ou nos effectifs. L'important étant de prendre en compte ces cas d'erreurs et de ne pas laisser leur résolution au hasard. Les cas d'erreurs ne sont en fait que d'autres usecases de l'utilisateur et souvent ne sont pas des edgecase. Ils méritent donc d'être tout autant réfléchis et spécifiés que les cas de succès !

## À la prochaine !

Il est toujours intéressant de mesurer l'engouement pour tel ou tel sujet dans la communauté Android en analysant les présentations lors des différentes conférences technologiques.

Sans aucun doute, cette droidcon était sous le signe de Jetpack Compose, qui bénéficie d'un suivi et d'un engagement fort de Google et de toute la communauté.  
Tout l'enjeu ici est de rester au contact des innovations et de l'évolution de la plateforme Android, et Jetpack Compose offre un défi que nous avons commencé à relever chez Bedrock.  

Nous attendons avec impatience de voir où va Android, et avons à coeur de participer à cette aventure qui nous lie tous !

![Hall DroidCon London 2022](/images/posts/2022-10-29-droidcon-london/hall.jpg)