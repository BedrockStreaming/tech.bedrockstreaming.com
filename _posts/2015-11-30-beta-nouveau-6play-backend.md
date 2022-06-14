---
layout: post
title: "L'envers du décor du nouveau 6play"
description: "Présentation du backend derrière les nouvelles applications 6play"
author: bedrock   
category:
tags: [6play, REST, Symfony, Elasticsearch, Cassandra]
feature-img: "images/posts/6play/logo.jpg"
thumbnail: "images/posts/6play/logo.jpg"
comments: true
---

Il y a quelques semaines, nous vous parlions ici même de la [stack technique mise en place pour le nouveau front web de 6play](/beta-nouveau-6play-react-isomorphic/).

Aujourd'hui, nous vous proposons un retour sur ce qui a été mis en place côté backend pour assurer la mise à disposition des données aux différents frontaux 6play.

Tout d'abord, il faut commencer par expliquer que l'univers 6play ne se résume pas que à son application web. Il existe aussi une version iOS et Android, mais également une version par Box IPTV (disons une version par FAI).

# Pas mal de REST ...

C'est donc tout naturellement que nous sommes partis sur la mise à disposition d'une API [REST](https://fr.wikipedia.org/wiki/Representational_State_Transfer) permettant à ces différents fronts de consommer simplement les données.

Notre stack technique habituelle côté backend étant Symfony2, nous sommes donc partis sur ce framework, ainsi que les habituels bundles :

* [FOSRestBundle](https://github.com/FriendsOfSymfony/FOSRestBundle) pour la gestion simple des controlleurs REST (validation des paramètres, routing adapté, view au format JSON, gestion des retours d'erreur)
* [BazingaHateoasBundle](https://github.com/willdurand/BazingaHateoasBundle) pour intégrer les liens entres les différents endpoints directement dans les différentes réponses. 
* [NelmioApiDocBundle](https://github.com/nelmio/NelmioApiDocBundle) pour proposer une documentation complète et auto-générée depuis le code

Pour sécuriser tout ça, nous utilisons toujours notre bundle [DomainUserBundle](https://github.com/BedrockStreaming/DomainUserBundle) permettant de sécuriser et contextualiser les données par sous-domaine (voir notre [article dédié](/api-a-consommer-avec-moderation/) à ce bundle).

# ... mais pas que

Une fois mise en place la théorie brute, nous nous sommes heurtés à la réalité des choses : face à un modèle de données complexe, si on reste très strict face à la philosophie RESTful, cela peux demander aux clients de réaliser un nombre conséquent de requêtes afin d'afficher une simple page.

Ainsi, nous avons un second applicatif, que nous nommons "middleware" qui est un hybride entre une API REST et un catalogue de données préformaté. Dans cet applicatif, nous réalisons les agrégations qui permettent de récupérer de manière unifiée les données liées, permettant aux frontaux de réduire leurs appels.

Dans ce middleware, nous essayons tout de même de respecter au maximum les verbes HTTP et le format de retour pour que les utilisateurs de ces API obtiennent des réponses cohérentes d'un service sur l'autre.

# Des données élastiques

Pour que ce middleware puisse retourner des données qui sont stockées dans plusieurs tables, de manière rapide, tout en gérant les contraintes de données non publiées (notre SI contient les anciennes émissions diffusées, mais également celles à diffuser), nous avons fait le choix d'utiliser [Elasticsearch](https://www.elastic.co/fr/) en le remplissant avec les données "publiables".

Non seulement nous disposons d'un système de recherche de données très performant, permettant des requêtes très puissantes et très rapides, dans lequel les données sont stockées de manière optimisée pour l'utilisation (pas de forme normale à respecter), mais nous nous permettons de n'y stocker que les données disponibles publiquement, simplifiant donc grandement les requêtes sur ces données.

# Workerize all the things

Pour maintenir les données à jour dans cet index Elasticsearch, nous avons mutualisé sur l'expérience et le travail que nous avions réalisé pour RisingStar, qui nous a apporté l'expérience que des daemons sont beaucoup plus efficaces que des crons. Cette technique nous apporte plusieurs avantages :

* **Scalabilité** : il est facilement possible de multiplier les process qui traitent les données, et donc d'augmenter la capacité de traitement 
* **Rapidité** : le fait d'avoir des daemons qui tournent en continue permet de traiter les demandes dès leur arrivée, et pas lors de la minute suivante. Cela permet aussi de lisser au maximum les traitements sans créer de piles d'attente inutiles.

Nous nous sommes donc appuyés sur notre [DaemonBundle](https://github.com/BedrockStreaming/DaemonBundle) pour mettre en place un double système d'indexation : 

* une fois par jour, l'index est complétement reconstruit
* un daemon tourne en continue pour détecter les modifications en base de données, et envoyer des messages dans une file [RabbitMQ](https://www.rabbitmq.com/)
* un dernier daemon est dédié au traitement des messages de cette file pour mettre à jour de manière ciblée les données dans Elasticsearch

Ainsi, nous assurons une fraicheur des données quasi-immédiate et optimale.

Au cours de ce travail, nous avons construit 2 nouveaux bundle : [ElasticsearchBundle](https://github.com/BedrockStreaming/ElasticsearchBundle) et [AmqpBundle](https://github.com/BedrockStreaming/AmqpBundle). L'un comme l'autre sont des bundles permettant de faciliter la configuration et l'utilisation des clients natifs dans Symfony2, en tant que service.

# Et la grosse donnée ?

Si vous avez essayé la nouvelle version web de 6play, vous avez certainement remarqué que la personnalisation de votre compte est fortement mise en avant. Pour stocker ce fort volume de données, nous avons fait le choix d'utiliser [Cassandra](https://cassandra.apache.org/), pour son approche distribuée permettant une forte scalabilité, et un ratio rapidité/redondance optimal.

Comme pour le reste, nous avons là aussi créé un bundle Symfony2 permettant de configurer et manipuler simplement des clients Cassandra en tant que service : [CassandraBundle](https://github.com/BedrockStreaming/CassandraBundle)

# Tout le reste

Côté monitoring, pour respecter nos bonnes habitudes, [nous utilisons toujours Statsd à outrance](/2014/01/28/how-we-use-statsd), surtout via notre bundle [StatsdBundle](https://github.com/BedrockStreaming/StatsdBundle).

Côté tests, tous les tests unitaires ont été écrits avec [atoum](https://github.com/atoum/atoum).

# Conclusion

Au cours de ce projet, nous avons eu l'occasion de transformer l'essai de beaucoup de choses que nous avions faites pour RisingStar, de découvrir de nouvelles technos et de mettre en place une architecture moderne et adaptée aux nouveaux challenges des fronts.
