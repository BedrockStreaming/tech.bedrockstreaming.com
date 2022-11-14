---
layout: post
title: "DroidCon London 2022"
description: "Ce que nous retenons de la DroidCon London 2022"
author: [rpanoyan, d_yim, d_cuny]
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


## COMPOSING THE WORLD - Damien Cuny

Il y a un peu plus d'un an sortait de la version 1.0 de Jectpack Compose, le nouveau toolkit déclaratif pour la création d'interface Android. Il a, cette année encore, tenue une place de choix dans l'agendas de cette Droidcon Londre 2022.
Comment l'utiliser correctement? Comment s'en servir pour implémenter un design systéme personnalisé? Jusqu'ou peut-on aller?
Autant de questions auxquelles ont tenté de répondre les nombreuses présentations sur le sujet.

### COMPOSE

Compose facilite beaucoup de choses dans l'implémentation et le maintiens de design sur Android. Cependant, cela nécessite de réapprendre à faire certaine chose que l'on maitrise déjà avec le système de view. Déssiner dans un canvas en est une et [Himanshu Singh](https://twitter.com/hi_man_shoe) dans sa présentation : "composing in your canvas" nous montre les pièges à éviter pour réaliser cela avec Compose. La recomposition, peut également etre source de problème et de latence si elle est mal utilisé avec Compose. Dans sa présentation "understanding recomposition performance pitfall" [Jossi Wolf](https://twitter.com/jossiwolf) et [Andrei Shikov](https://twitter.com/shikasd_) nous donne à partir d'un exemple concret les meilleures astuces pour l'utiliser à bon escient.

### DESIGN SYSTEME

En faisant le parallele avec la saga épique de JRR Tolkien, [Daniel Beleza](https://medium.com/@danielbbeleza), dans sa présentation: "One design system to rule them all", nous explique comment il a réussi, tout en se passant de Material, à unifier et automatiser son propre design système. Cela demande, évidemment, une collaboration totale de la part de l'équipe de design, mais une fois cette intégration faites, les bénéfices et l'autonomie se ressentes de part et d'autre. Des outils tel que [Figma](https://www.figma.com/), [kotlin Poet](https://square.github.io/kotlinpoet/) ou des plugins Android Studio custom lui ont permis d'automatiser ensuite ce processus.
Material Design est un design system. Il a l'avantage d'étre très bien documenté, uniforme et régulièrement enrichis. De plus, il est déjà implementé dans l'ancien systeme de view android et plus récemment dans Jetpack Compose avec [Compose Material](https://developer.android.com/jetpack/androidx/releases/compose-material). Une des différence majeur entre Compose et le systeme de View sur Android est sont découpage. Dans compose, Material, n'est implémenté et n'apparait que dans la partie la plus hautes alors que dans le systeme de view, son implémentation est répartie dans toutes les couches. Il est donc assez complexe de se passer de Material avec le systeme de view mais cela est complétement envisageable, voir recommandé, dans certain cas avec Compose. Pour illustrer cela [Sebastiano Poggi](https://twitter.com/seebrock3r) (la moitié de [Coding with the italians](https://www.youtube.com/c/CodewiththeItalians)) est venue nous présenter dans "Compose beyond Material" les questions à se poser avant de se lancer dans son design systeme et comment le package Foundation de Compose peux nous aider.
Tout comme la présentation d'introduction de cette droidcon "The Silver Bullet Syndrome Director's Cut - Complexity Strikes Back!" il nous suggére également de bien faire attention au niveau de complexité que l'on souhaite en fonction du besoin que l'on a.

### Aller encore plus loin

[Chris Bane](https://twitter.com/chrisbanes) et [Nacho Lopez](https://twitter.com/mrmans0n) dans leur présentation : "Branching out jetpack compose", nous on raconté comment l'aventure du passage à Compose s'est déroulé chez Twitter qui a été l'un des premier à l'adopter. Avec une code base aussi conséquente (plus de 1000 modules, dont 300 pour le design, répartis sur plus de 30 équipes), ils ont du progressivement convaincre les équipes, les former et les accompagner à passer à Compose. La question de continuer à utiliser Material design s'est également poser chez eux. Ils l'ont dans un premier temps conserver pour faciliter le passage sur Compose, pour finalement le retirer complement en se basant, eux aussi, sur le package foundation. Leur présentation résume bien l'ensemble des étapes et des questions par lesquelles ils sont passé pour accomplir cette transition.
Afin de remettre les choses en perspective, [Ash Davies](https://twitter.com/askashdavies) nous rappel que Compose n'est qu'un pattern de developpement multiplateforme. De ce fait, il peux donc étre appliquer à autre chose qu'à l'UI comme le propose Jetpack Compose. Il nous explique dans "Demystifying Molecule: Running Your Own Compositions For Fun And Profit", comment l'appliquer à la couche domain d'un projet.

## **La gestion des erreurs** - David Yim

La gestion des erreurs a été le sujet de plusieurs présentations à la Droidcon. Ces présentations avaient pour objectif de servir de piqûre de rappel sur l'importance de bien prendre en compte ce problème concernant tous les développeurs. Aujourd'hui, nous avons tous les outils pour gérer facilement nos erreurs. Cependant, par paresse et comme nous préférons penser de manière positive, nous ne pensons souvent qu'au cas de succès et les cas d'erreurs sont souvent brouillons voir ne sont même pas spécifiés.

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



