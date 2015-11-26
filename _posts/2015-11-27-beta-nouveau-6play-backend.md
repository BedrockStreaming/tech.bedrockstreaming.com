---
layout: post
title: "L'envers du décors du nouveau 6play"
description: "Présentation du backend derrières les nouvelles applications 6play"
author:
  name:     TechM6Web
  avatar:   
  email:
  twitter:  techM6Web      
  facebook:       
  github:    
category:
tags: [6play, REST, Symfony, Elasticsearch, Workers]
image:
  feature: posts/6play/logo.jpg
  credit: 
  creditlink: 
comments: true
---

Il y a quelques semaines, nous vous publions ici même de la [stack technique mise en place pour le nouveau front web de 6play](/beta-nouveau-6play-react-isomorphic/).

Aujourd'hui, nous vous proposons un retour sur ce qui a été mis en place côté backend pour assurer la mise à disposition des données aux différents frontaux 6play.

Tout d'abord, il faut commencer par expliquer que l'univers 6play ne se résume pas que à son application web. Il existe aussi une version iOS et Android, mais également une version par Box IPTV (disons une version par FAI).

# Pas mal de REST ...
C'est donc tout naturellement que nous somme partis sur la mise à disposition d'une API [REST](https://fr.wikipedia.org/wiki/Representational_State_Transfer) permettant à ces différents fronts de consommer simplement les données.

Notre stack technique habituelle côté backend étant Symfony2, nous sommes donc parti sur ce framework, ainsi que les habituels [FOSRestBundle](https://github.com/FriendsOfSymfony/FOSRestBundle), [NelmioApiDocBundle](https://github.com/nelmio/NelmioApiDocBundle) et autre [BazingaHateoasBundle](https://github.com/willdurand/BazingaHateoasBundle).

Pour sécuriser tout ça, nous utilisons toujours notre bundle [DomainUserBundle](https://github.com/M6Web/DomainUserBundle) permettant de sécuriser et contextualiser les données par sous-domaine (voir notre [article dédié](/api-a-consommer-avec-moderation/) à ce bundle).

# ... mais pas que

Toutefois, une fois mise en place la théorie brute, nous nous sommes heurtés à la réalité des choses : face à un modèle de données complexe, si on reste très strict face à la philosophie RESTFull, nous passons notre temps à faire des requêtes à l'API.

Ainsi, nous avons un second applicatif, que nous nommons "middleware" qui est un hybride entre une API REST et un catalogue de données préformaté. Dans cet applicatif, nous réalisons les aggrégations qui permettent de récupérer de manière unifiée les données liées, permettant aux frontaux de réduire leurs appels.

Dans ce middleware, nous essayons tout de même de respecter au maximum les verbes HTTP et le format de retour pour que les utilisateurs de ces API obtiennent des réponses cohérentes d'un service sur l'autre.

# Des données élastiques
Pour que ce middleware puisse retourner des données qui sont stockées dans plusieurs tables, de manière rapide, tout en gérant les contraintes de données non publiées (notre SI contient les anciennes émissions diffusées, mais également celles à diffuser), nous avons fait le choix d'utiliser Elasticsearch en le remplissant avec les données "publiables".

Ainsi, non seulement nous disposons d'un système de recherche de données très performant, permettant des requêtes très puissantes et très rapides, dans lequel les données sont stockées de manière optimisée pour l'utilisation (pas de forme normale à respecter), mais nous nous permettons de n'y stocker que les données disponible publiquement, simplifiant donc grandement les requêtes sur ces données.

# Workerize all the things

Pour maintenir les données à jour dans cet index Elasticsearch, nous avons mutualisé sur l'expérience et le travail que nous avions réalisés pour RisingStar, qui nous a apporté l'expérience que des daemons sont beaucoup plus efficace que des crons.

Nous nous sommes donc appuyés sur notre [DaemonBundle](https://github.com/M6Web/DaemonBundle) pour mettre en place un double système d'indexation : 
* une fois par jour, l'index est complétement reconstruit
* un daemon tourne en continue pour détecter les modifications en base de données, et envoyer des messages dans une file [RabbitMQ](https://www.rabbitmq.com/)
* un dernier daemon est dédié au traitement des messages de cette file pour mettre à jour de manière ciblée les données dans Elasticsearch

Ainsi, nous assurons une fraicheur des données quasi-immédiate et optimale.

Au cours de ce travail, nous avons construit 2 nouveaux bundle : [ElasticsearchBundle](https://github.com/M6Web/ElasticsearchBundle) et [AmqpBundle](https://github.com/M6Web/AmqpBundle)

# Conclusion

Au cours de ce projet, nous avons eu l'occasion de transformer l'essai de beaucoup de choses que nous avions fait pour RisingStar, de découvrir de nouvelles technos et de mettre en place une architecture moderne et adaptée aux nouveaux challenges des fontend.

Et ce n'est pas fini ...
