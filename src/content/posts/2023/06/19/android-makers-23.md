---
layout: ../../../../../layouts/post.astro
title: Deux jours à Android Makers by Droidcon 2023
description: "Les équipes Android de Bedrock étaient à Android Makers 2023 − on vous résume tout."
author: [b_candellier, a_pitel]
tags: [android, mobile, conference, makers]
color: rgb(254,91,73)
language: fr
thumbnail: "./cover.jpg"
---

Il y a quelques semaines déjà, nous avons pu nous rendre à LA conférence annuelle Android en France : Android Makers. Conférence qui s'associe tout juste avec une initiative un peu plus internationale qui est DroidCon (cf. [notre précédent article](https://tech.bedrockstreaming.com/2022/11/22/droidcon-london-2022.html), par exemple).
L'occasion d'assister à des conférences de speakers du monde entier mais également de networker et revoir avec plaisir beaucoup de têtes connues !

Voici pêle-mêle nos retours et les apprentissages que nous avons pu collecter durant ces 2 jours intenses !

### Par @Antoine Pitel

Si on devait retenir une chose de la conférence **The Rise and Fall of Feature Teams** de Danny Preussler, on pourrait dire en résumé que "Les développeurs ont besoin d'autres développeurs de la même technologie pour s'épanouir". Le format en Feature Team peut facilement tomber dans le piège de l'isolement du développeur sur sa technologie. Il est fondamentale de s'assurer soit de multiplier les profils de même technos dans une team, soit d'organiser un partage de connaissance et du pair programming très récurrent.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/a40q41ghSks" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

La conférence **Practical ADB usage to enhance your life!** de Benjamin Kadel était, pour moi, définitivement la plus passionnante (au sens propre du terme passionné). L'usage d'ADB pour optimiser le travail quotidien en développement comme en test me parait ultra efficace. On a pu y découvrir notamment une astuce particulièrement utile : il est possible via ADB de nettoyer, refuser ou accepter les permissions demandées au framework par l'app. Un gros gain de temps quand on doit développer sur une feature qui nécessite une permission spécifique (et le statut de celle-ci) .

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/DcU1czPxQ10" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Je ne me suis jamais vraiment penché sur Android Auto, shame on me 😉 Mais la conférence "Going on a road trip with Android Auto" de Carlos Mota nous a ouvert un tout nouvel univers de jeu que j'ai hâte d'explorer chez Bedrock ! En effet grâce aux dernières évolutions d'Android Auto il est désormais possible de publier, comme avant, des services audio (radio, podcast,..), mais désormais aussi des services vidéo ! L'accès vidéo n'étant disponible qu'à l'arrêt du véhicule, information que le framework Android Automotive fourni à travers la classe `CarUxRestrictions` du package `android.car.drivingstate` et sa méthode `isRequiresDistractionOptimization()`.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/wguYRGmVeiw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

Il est tellement plaisant, mais rare, d'assister à des conférences qui parlent de CD et de publication ! En cela la conférence **How to ship apps better, faster, stronger** de Fabien Devos était passionnante et pleine d'apprentissage à diffuser au plus grand nombre ! J'en retiendrai 2 de mon côté :
- La notion de "release Train" et cette métaphore du train qui part à heure fixe de manière régulière. Avec de plus l'info que la périodicité hebdomadaire semble être adaptée aux projets qui collaborent avec des stores comme App Store et Google Play Store ;
- L'absolue nécessité de disposer d'un système de feature flipping robuste et couvrant le maximum du fonctionnel du service. Un vaste chantier !

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dyRuhfs2nsE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Par @Baptiste Candellier

Comme tous les ans, Android Makers nous propose des talks variés, des dernières nouveautés de Jetpack Compose au management d'équipe, en passant par l'habituelle keynote humoristique de Romain Guy et Chet Haase. J'ai sélectionné pour vous mes talks préférés.

Le talk **90s Website … in 2023 on mobile in Compose … for science** de [Maia Grotepass](https://androiddev.social/@maiatoday) a été pour moi le plus original, intriguant et intéressant de la conférence. Maia nous a guidé à travers son projet de cœur : reproduire, grâce à Jetpack Compose, le *look-and-feel* d'un site web des années 90. Un mélange de technologique moderne, qui est écrit pour tourner à la fois sur Android mais également sur desktop, grâce [aux efforts de Jetbrains sur le multi-plateforme](https://github.com/JetBrains/compose-jb/). Un projet qui pourrait sembler futile au premier abord, mais Maia nous plonge dans son parcours nostalgique tout en nous expliquant de manière pédagogique les APIs d'animation et de dessin de Compose, que nous avons assez peu souvent l'occasion d'utiliser dans des projets professionnels, qui se reposent souvent sur des composants pré-conçus. À voir, que vous soyez amateur·ice de web old-school ou de `Canvas`.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/yF8Z0tK3CFE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

**Forging the path from monolith to multi-module app**, par [Marco Gomiero](https://androiddev.social/@marcogom), séduira les adeptes d'architecture. Ce talk vante non seulement les avantages d'un projet Gradle multi-modules, mais nous détaille tous les choix architecturaux qui en découlent, de façon subjective. Un retour d'expérience sur ce sujet, qui est une trend relativement récente dans l'écosystème Android, est très intéressant et permet non seulement de guider nos décisions d'avenir, mais aussi de regarder d'un nouvel œil nos propres décisions architecturales. Marco nous propose un apercu de sujets tels que les types de modules, la gestion de la navigation, les version catalogs, les convention plugins --- autant de sujets qui sont à l'état de l'art des projets Gradle, et qui mérient bien un partage d'expérience !

Marco apporte un bon équilibre en nous montrant le travail de son équipe sur l'app Tier, tout en nuançant sur le fait que l'architecture n'est pas une science exacte. On retiendra cette citation frappante :

> Sometimes the "best decision™" is not the best one

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/VsU7hsnSN5A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

On termine pour ma part avec un talk qui parle encore d'architecture, mais cette fois en ce qui concerne la migration vers Compose. **Un Design System, ça se Compose !**, avec Jean-Baptiste Vincey et Julie Gléonnec, nous présente la direction prise par les équipes de Deezer en ce qui concerne la migration de leur design system vers Jetpack Compose. C'est un sujet d'actualité et qui aura très certainement des ramifications sur les années à venir --- Bedrock a entamé cette année, j'étais donc curieux de connaître les approches prises par d'autres équipes travaillant sur de grosses applications avec des design systems basés sur des vues XML.

Les équipes de Deezer ont choisi de réécrire entièrement leur implémentation du design system en Compose, et de migrer leur app écran par écran. Un choix qui a des avantages - la facilité de migration des nouveaux écrans, l'absence de legacy dans les nouveaux composants, mais aussi des inconvénients comme la nécessité de garder à jour deux versions des composants jusqu'à la migration complète de l'app. Deezer nous expose dans cette présentation passionnante leurs choix et leur chemin vers Compose.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/eEcYpImy_XY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
