---
layout: post
title: Deux jours à Android Makers by Droidcon 2023
description: "Les équipes Android de Bedrock étaient à Android Makers 2023 − on vous résume tout."
author: [b_candellier, a_pitel, d_larue, n_galais]
tags: [android, mobile, conference, makers]
color: rgb(251,87,66)
language: fr
thumbnail: /images/posts/2023-05-26-android-makers-23/cover.jpg
---

Il y a quelques semaines déjà, nous avons pu nous rendre à LA conférence annuelle Android en France : Android Makers. Conférence qui s'associe tout juste avec une initiative un peu plus internationale qui est DroidCon (cf. [notre précédent article](https://tech.bedrockstreaming.com/2022/11/22/droidcon-london-2022.html), par exemple).
L'occasion d'assister à des conférences de speakers du monde entier mais également de networker et revoir avec plaisir beaucoup de têtes connues !

Voici pêle-mêle nos retours et les apprentissages que nous avons pu collecter durant ces 2 jours intenses !

### Par @Antoine Pitel

Si on devait retenir une chose de la conférence "The Rise and Fall of Feature Teams" de Danny Preussler, on pourrait dire en résumé que "Les développeurs ont besoin d'autres développeurs de la même technologie pour s'épanouir". Le format en Feature Team peut facilement tomber dans le piège de l'isolement du développeur sur sa technologie. Il est fondamentale de s'assurer soit de multiplier les profils de même technos dans une team, soit d'organiser un partage de connaissance et du pair programming très récurrent.

La conférence "Practical ADB usage to enhance your life!" de Benjamin Kadel était, pour moi, définitivement la plus passionnante (au sens propre du terme passionné). L'usage d'ADB pour optimiser le travail quotidien en développement comme en test me parait ultra efficace. On a pu y découvrir notamment une astuce particulièrement utile : il est possible via ADB de nettoyer, refuser ou accepter les permissions demandées au framework par l'app. Un gros gain de temps quand on doit développer sur une feature qui nécessite une permission spécifique (et le statut de celle-ci) .

Je ne me suis jamais vraiment penché sur Android Auto, shame on me :wink: Mais la conférence "Going on a road trip with Android Auto" de Carlos Mota nous a ouvert un tout nouvel univers de jeu que j'ai hâte d'explorer chez Bedrock ! En effet grâce aux dernières évolutions d'Android Auto il est désormais possible de publier, comme avant, des services audio (radio, podcast, ...), mais désormais aussi des services vidéo ! L'accès vidéo n'étant disponible qu'à l'arrêt du véhicule, information que le framework Android Automotive fourni à travers la classe `CarUxRestrictions` du package `android.car.drivingstate` et sa méthode `isRequiresDistractionOptimization()`.

Il est tellement plaisant, mais rare, d'assister à des conférences qui parlent de CD et de publication ! En cela la conférence "How to ship apps better, faster, stronger' de Fabien Devos était passionnante et pleine d'apprentissage à diffuser au plus grand nombre ! J'en retiendrai 2 de mon côté :
- La notion de "release Train" et cette métaphore du train qui part à heure fixe de manière régulière. Avec de plus l'info que la périodicité hebdomadaire semble être adaptée aux projets qui collaborent avec des stores comme App Store et Google Play Store ;
- L'absolue nécessiter de disposer d'un système de feature flipping robuste et couvrant le maximum du fonctionnel du service. Un vaste chantier !