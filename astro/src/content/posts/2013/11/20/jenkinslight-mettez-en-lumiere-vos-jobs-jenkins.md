---
layout: ../../../../../layouts/post.astro
title: "JenkinsLight, mettez en lumière vos jobs Jenkins"
description: ""
author: team_cytron
category:
tags: [outil, jenkins, ci, cytron, open-source]
thumbnail: "../../../../../../../images/posts/cytron/jenkinslight.png"
feature-img: "../../../../../../../images/posts/cytron/jenkinslight.png"
comments: true
permalink: jenkinslight-mettez-en-lumiere-vos-jobs-jenkins
---

L’idée de [JenkinsLight](https://github.com/BedrockStreaming/JenkinsLight) a germé lorsque nous nous sommes fait taper sur les doigts pour la troisième fois (à juste titre) parce que l’on avait désactivé la publicité sur nos sites de chaîne lors d’une mise en production. Or la publicité est un point critique car directement reliée au chiffre d’affaires. Le pire est que nous testions déjà le bon fonctionnement de la publicité en intégration continue sur nos serveurs de preprod, avant la mise en production. Mais une configuration légèrement différente sur les serveurs de prod rendait le nouveau code instable. Cette situation rend donc impossible la détection de certaines anomalies avant la mise en production…

D’où notre besoin d’avoir un tableau de bord nous permettant de vérifier chaque instant la disponibilité des fonctionnalités névralgiques de nos sites en production afin de réagir au plus vite en cas de problèmes. Et ce, avant même que l’anomalie ne nous soit remontée par les autres secteurs. Nous avions déjà nos tests dans [Jenkins](https://jenkins-ci.org/) que nous avons alors fait pointer vers la prod. Il nous manquait donc juste une sorte de “Panic Board” sur un écran placé au sein de nos bureaux nous remontant rapidement le moindre problème sur nos sites en production.

Nous avons créé [JenkinsLight](https://github.com/BedrockStreaming/JenkinsLight) qui permet d’afficher distinctement le statut des jobs d’une vue Jenkins en quasi temps réel. Le projet utilise [AngularJS](https://angularjs.org/) et l’API de Jenkins pour récupérer les informations nécessaires. L’installation se fait sur n’importe quel serveur web et requiert uniquement [Bower](https://bower.io/) pour installer les composants. Afin de permettre à l’API d’être appelée en crossdomain (CORS), il est également nécessaire d’installer un [plugin spécifique](https://github.com/jhinrichsen/cors-plugin) sur votre serveur Jenkins.

L’application propose quelques variables de configuration éditables dans le fichier "app/scripts/config.js" permettant de spécifier :

- l’url du serveur Jenkins,
- l’identification au serveur (si nécessaire),
- la vue Jenkins par défault,
- les types de jobs affichés,
- une regexp pour exclure certains jobs,
- le nombre maximum de jobs par ligne sur l’écran,
- l’intervalle de rafraîchissement (en millisecondes),
- une image de fond quand il n'y a aucun job à afficher.

[JenkinsLight](https://github.com/BedrockStreaming/JenkinsLight) est disponible en [open-source](https://tom.preston-werner.com/2011/11/22/open-source-everything.html) sur [le compte GitHub de M6Web](https://github.com/BedrockStreaming).

Enjoy !
