---
layout: post
title: "JenkinsLight, mettez en lumière vos jobs Jenkins"
description: ""
author:
  name:           M6Web
  avatar:         
  email:          
  twitter:  techM6Web      
  facebook:       
  github:    
category: 
tags: [tools,jenkins,ci,cytron]
image:
  feature: 
  credit: 
  creditlink: 
comments: true  
permalink: jenkinslight-mettez-en-lumiere-vos-jobs-jenkins.html
---

[![JenkinsLight, mettez en lumière vos jobs Jenkins](//img.over-blog-kiwi.com/600x600/0/00/30/83/201311/ob_34886d5053c98a6d3245dddcf1c10454_mz5c-png.png)](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_34886d5053c98a6d3245dddcf1c10454_mz5c-png.png)

L’idée de [JenkinsLight](https://github.com/M6Web/JenkinsLight) a germé lorsque nous nous sommes fait taper sur les doigts pour la troisième fois (juste titre) parce qu’on avait désactivé la publicité sur nos sites de chaîne lors d’une mise en production. Or la publicité est un point critique car reliée directement au chiffre d’affaires. Le pire est que nous testions le bon fonctionnement de la publicité en intégration continue sur nos serveurs de preprod, avant la mise en production. Mais une configuration légèrement différente sur les serveurs de prod rendait le nouveau code instable. Cette situation rend donc impossible la détection de certaines anomalies avant la mise en production…

D’où notre besoin d’avoir un tableau de bord nous permettant de vérifier chaque instant la disponibilité des fonctionnalités névralgiques de nos sites en production afin de réagir au plus vite en cas de problèmes. Et ce, avant même que l’anomalie ne nous soit remontée par les autres secteurs. Nous avions déjà nos tests dans [Jenkins](http://jenkins-ci.org/) que nous avons fait pointer vers la prod. Il nous manquait donc juste une sorte de “Panic Board” sur un écran placé au sein de nos bureaux nous remontant rapidement le moindre problème sur nos sites en production.

Nous avons créé [JenkinsLight](https://github.com/M6Web/JenkinsLight) dont le rôle n’est autre que d’afficher distinctement le statut des jobs d’une vue Jenkins en quasi temps réel. Le projet utilise [AngularJS](http://angularjs.org/) et l’API de Jenkins pour récupérer les informations nécessaires. L’installation se fait sur n’importe quel serveur web et requiert uniquement [Bower](http://bower.io/) pour installer les composants. Afin de permettre à l’API d’être appelée en crossdomain (CORS), il est également nécessaire d’installer un [plugin spécifique](https://github.com/jhinrichsen/cors-plugin) sur votre serveur Jenkins.

L’application propose quelques variables de configuration éditables dans le fichier "app/scripts/config.js" permettant de spécifier :

- l’url du serveur Jenkins,
- l’identification au serveur (si nécessaire),
- la vue Jenkins par défault,
- les types de jobs affichés,
- le nombre de jobs par ligne sur l’écran,
- l’intervalle de rafraîchissement (en millisecondes).

[JenkinsLight](https://github.com/M6Web/JenkinsLight) est un [side-project](http://zachholman.com/posts/why-github-hacks-on-side-projects/) de la Team Cytron. Il est disponible en [open-source](http://tom.preston-werner.com/2011/11/22/open-source-everything.html) sur [le compte GitHub de M6Web](https://github.com/M6Web).

Enjoy !



