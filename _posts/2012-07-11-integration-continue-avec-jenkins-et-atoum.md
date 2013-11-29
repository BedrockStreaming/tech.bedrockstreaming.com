---
layout: post
title: "Intégration continue avec Jenkins et Atoum"
description: ""
author:
  name:           Olivier Mansour
  avatar:         oliviermansour.jpg
  email:          
  twitter:  omansour      
  facebook:       
  github:    
category: 
tags: [php atoum jenkins ci]
image:
  feature: 
  credit: 
  creditlink: 
comments: true  
permalink: integration-continue-avec-jenkins-et-atoum
---

[![Intégration continue avec Jenkins et Atoum](//img.over-blog-kiwi.com/0/00/30/83/201207/ob_2c46e3fd07e3ef492ce44937b9a48330_atoum-logo.png)](http://img.over-blog-kiwi.com/0/00/30/83/201207/ob_2c46e3fd07e3ef492ce44937b9a48330_atoum-logo.png)Chez M6 Web nous tentons de créer une approche open-source intra entreprise. L'objectif est que certains composants génériques adaptés notre métier puissent être crées et diffusés largement parmis les dizaines de projets gérés chaque année. Un prochain post traitera de cette problématique.

Dans cette optique, il faut nous assurer de la qualité et la non régréssion de ces composants. Pour cela nous avons mis en place Jenkins afin d'assurer l'intégration continue de nos tests unitaires. Voici un exemple d'intégration avec Atoum (ce n'est pas forcement la meilleur méthode, n'hésitez pas la commenter).



Structure du composant :

- ./src contient les classes du composants au format PSR-0
- ./tests contient les TU Atoum
- ./build-tools/jenkins contient les fichiers de configuration pour Atoum et Ant
- ./vendor contient les dépendances externes du projet (gérées avec Composer)

Voici le composer.json utilisé.



<script src="https://gist.github.com/3089529.js"></script>
Voici le fichier de configuration de Atoum : build-tools/jenkins/atoum.ci.php et celui de jenkins build-tools/jenkins/build.xml



<script src="https://gist.github.com/3090911.js"></script>
(cette configuration inclut l'ensemble des outils d'analyse statique que l'on utilise)

Enfin, voici la configuration faire sur Jenkins (en image).



[![Intégration continue avec Jenkins et Atoum](http://img.over-blog-kiwi.com/0/00/30/83/201207/ob_e86021_component-redis-config-jenkins.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201207/ob_e86021_component-redis-config-jenkins.jpg)

[![Intégration continue avec Jenkins et Atoum](http://img.over-blog-kiwi.com/0/00/30/83/201207/ob_570c50_component-redis-config-jenkins-1.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201207/ob_570c50_component-redis-config-jenkins-1.jpg)

[![Intégration continue avec Jenkins et Atoum](http://img.over-blog-kiwi.com/0/00/30/83/201207/ob_2ef3ad_component-redis-config-jenkins-2.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201207/ob_2ef3ad_component-redis-config-jenkins-2.jpg)

Via cette conf on obtient le résultat des tests (naturellement) ainsi que la couverture de code des tests avec la coloration des lignes couvertes ou non couvertes dans les classes testées.



[![Intégration continue avec Jenkins et Atoum](http://img.over-blog-kiwi.com/0/00/30/83/201207/ob_93fa0866765de86cb5e0f2daff7108b5_component-redis)](http://img.over-blog-kiwi.com/0/00/30/83/201207/ob_93fa0866765de86cb5e0f2daff7108b5_component-redis)

[![Intégration continue avec Jenkins et Atoum](http://img.over-blog-kiwi.com/0/00/30/83/201207/ob_733b75_jenkins-m6web-fr-view-dev-job-component-redis-las.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201207/ob_733b75_jenkins-m6web-fr-view-dev-job-component-redis-las.jpg)

