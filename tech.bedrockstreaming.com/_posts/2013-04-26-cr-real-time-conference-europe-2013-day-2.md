---
layout: post
title: "CR Real Time Conférence Europe 2013 - Day 2"
description: ""
author: o_noel
category: 
tags: [conference,nodejs,realtime]
comments: true  
permalink: cr-real-time-conference-europe-2013-day-2
---

![Crédit : https://www.flickr.com/photos/andyet-photos/8679275805/in/set-72157633306379029](/images/posts/imgob/0-00-30-83-201304-ob_9cf041_8679275805-4983128ec8-c-jpg.jpeg)

Crédit : https://www.flickr.com/photos/andyet-photos/8679275805/in/set-72157633306379029


[Après la première journée](/cr-real-time-conference-europe-2013-day-1), on continue avec la deuxième journée de conférence. Toujours sur le format de 20 minutes pour présenter le sujet.



### WOOT, Arial Balkan



![Crédit : https://twitter.com/OriPekelman/status/326600103475425281/photo/1](/images/posts/imgob/0-00-30-83-201304-ob_12f478_bihree-cmaezm5x-jpg-large.jpeg)

Crédit : https://twitter.com/OriPekelman/status/326600103475425281/photo/1


[@aral](https://twitter.com/vgholkar/status/326602313823318016) a travaillé sur une solution d'édition partagée de contenu, une solution sans transformation opérationnelle ([OT sur Wikipedia](https://en.wikipedia.org/wiki/Operational_transformation)) : WOOT qui signifie Without Operational Transformation.

Le concept exposé est de ne pas faire de suppression des caractères d'une chaîne, mais plutôt de travailler sur la notion de visible / invisible et de position du caractère au sein de la chaîne. L'objectif étant de garder la convergence et de préserver les intentions des utilisateurs.

Il nous indique différentes ressources pour approfondir le sujet :

- une vidéo de Google Tech Talk :[Issues and Experiences in Designing Real-time Collaborative Editing Systems](https://www.youtube.com/watch?v=84zqbXUQIHc)
- une librairie JS : [ShareJS](https://sharejs.org/)
- pour aller plus loin dans la gestion du travail collaboratif, l'[Inria rend disponible différents travaux de recherches](https://hal.inria.fr/inria-00432368/en/) sur le sujet



### Convention-Driven JSON, Steve Klabnik



![Crédit : https://twitter.com/OriPekelman/status/326607298556489728/photo/1](/images/posts/imgob/0-00-30-83-201304-ob_e5031c_bihxm4vccaep4av-jpg-large.jpeg)

Crédit : https://twitter.com/OriPekelman/status/326607298556489728/photo/1


[@steveklabnik](https://twitter.com/steveklabnik) avait déjà parlé la veille sur un autre sujet. Aujourd'hui, il nous expose la problématique de passer des objets (quelque soit le langage) JSON. Bien souvent, on utilise JSON pour la communication entre différents services (l'un en PHP et l'autre en Python par ex, ou deux services en PHP).

Pour un site web, on arrive souvent au résultat suivant :

*Objet -> Template -> HTML*

Pour éviter certains problèmes lors des échanges de données, il propose par exemple en ruby d'utiliser [active_model_serializers](https://github.com/rails-api/active_model_serializers) ce qui permet d'obtenir le résultat suivant :

*Objects -> Serializer -> HTML*

En résumé, il recommande de passer par un outil de serialisation des données afin de ne pas perdre la structure de l'objet et donc d'avoir une plus grande réactivité entre le client et le serveur.



### Realtime vs Real world, Tyler Mac Mullen

[@tbmcmullen](https://twitter.com/tbmcmullen) travaille pour [Fastly](https://www.fastly.com/). Sa société propose des solutions d'optimisation au sein des infrastructures de type CDN.



![Crédit : https://twitter.com/OriPekelman/status/326613272969228288/photo/1](/images/posts/imgob/0-00-30-83-201304-ob_bf8753_bihdcplcmaabdq-jpg-large.jpeg)

Crédit : https://twitter.com/OriPekelman/status/326613272969228288/photo/1


Il commence sa présentation en définissant les deux termes :

- Realtime = réduire la latence
- Realworld = notion d'infrastructure

Il indique également l'impossibilité de construire des infrastructures en temps-réel. Seul les CDNs ont la possibilité de s'approcher du temps-réel. La notion de purge est également essentielle.

Tyler présente ensuite 3 possibilités de purge :

1. Utilisation de Rsyslog : soit via TCP (problème : lenteur), soit via UDP (problème : pas de retour d'erreur). Un noeud notifie tous les autres.
2. Love triangle : pas de serveur central mais notion de peer-to-peer. Chaque noeud interagit avec 2/3 autres noeuds. Problème : il n'y a pas d'état global ni de possibilité de scalabilité avec ce type d'infrastructure
3. Hybride : on met en place des *switchs* au niveau des noeuds. Les switchs interagissent entre eux, puis redistribuent l'information au niveau de ces serveurs.

La société a déjà fait d'autres sessions lors d'autres conférences tel que Velocity qui pourrait fortement intéressé les adminsys ;-)



### DiscoRank : optimizing discoverability on SoundCloud, par Amélie Anglade



![Crédit : https://www.flickr.com/photos/andyet-photos/8680450402/in/set-72157633306379029](/images/posts/imgob/0-00-30-83-201304-ob_637fb3_8680450402-4048e3b2df-jpg.jpeg)

Crédit : https://www.flickr.com/photos/andyet-photos/8680450402/in/set-72157633306379029


<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" mozallowfullscreen="" scrolling="no" src="https://fr.slideshare.net/slideshow/embed_code/19960673" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" webkitallowfullscreen="" width="427"></iframe>

[@utstikkar](https://twitter.com/utstikkar) est une française qui travaille pour Soundcloud en tant que MIR Software Engineer.

Elle nous a expliqué l'évolution effectuée au sein de leur moteur de recherche : Discorank. Ce système peut être assimilé au PageRank de Google.

Ils utilisent pour cela : MySQL puis HDFS et enfin tout est re-manipulé dans [ElasticSearch](https://www.elasticsearch.org/)



### BuddyCloud - Rethinking Social, par Simon Tennant



![Crédit : https://twitter.com/OriPekelman/status/326635400175161344/photo/1](/images/posts/imgob/0-00-30-83-201304-ob_e1ca08_bihxknbceae7ckp-jpg-large.jpeg)

Crédit : https://twitter.com/OriPekelman/status/326635400175161344/photo/1


Simon Tennant est CEO de la société BuddyCloud. Il a tenté de faire passer les informations suivantes :

- fédérer ou mourir
- travailler sur les protocoles non sur les APIs
- pour construire du social dans un produit, il recommande de se baser sur l'open source, les standards et protocoles ouverts

L'objectif de sa société est de permettre aux personnes de construire un réseau social fédéré et bien entendu temps-réel.

N'hésitez pas à fouiller dans leur source sur [Github](https://github.com/buddycloud)) qui fourmille de fonctionnalités.



### Realtime at Microsoft, Pierre Couzy

Pierre Couzy travaille depuis plus de 10 ans chez Microsoft. Il nous présente un projet réalisé par des développeurs US : [SerialR](https://signalr.net/) ([Github](https://github.com/SignalR)). Le projet utilise les Websockets.



![Crédit : https://www.flickr.com/photos/andyet-photos/8679336549/in/set-72157633306379029](/images/posts/imgob/0-00-30-83-201304-ob_045020_8679336549-cc73704704-jpg.jpeg)

Crédit : https://www.flickr.com/photos/andyet-photos/8679336549/in/set-72157633306379029


Le projet possède deux dépendances principales :

- [Json.net](https://james.newtonking.com/projects/json-net.aspx) côté serveur
- [Jquery](https://jquery.com/) côté client

Il est noter que la négociation exacte entre le client et le serveur dépend du navigateur utilisé.

A noter que cette présentation est l'une des rares qui n'a pas été réalisée avec un MacBook ;-)



### Learning from Past Mistakes, a new node http layer, par Tim Caswell

[@creationix](https://twitter.com/creationix) était un des anciens core dev de NodeJS. Il nous expose les différents points cause desquels il a quitté le projet.



![Crédit : https://twitter.com/OriPekelman/status/326670519371980800/photo/1](/images/posts/imgob/0-00-30-83-201304-ob_0617d7_biirg0ocyaacsmb-jpg-large.jpeg)

Crédit : https://twitter.com/OriPekelman/status/326670519371980800/photo/1


Un des autres problèmes avec NodeJS est que le changement est difficile :

- utilisé en production par différentes sociétés
- difficulté à modifier les APIs

Il a donc développé [Luvit](https://github.com/luvit/luvit) basé sur la technologie Lua (légère, rapide et permettant les co-routines).  
 Cette nouvelle couche HTTP donne la possibilité :

- de suspendre et de reprendre la fibre actuelle
- lorsque l'on a des fibres on peut faire d'autres choses
- écrire sur les objets stream avec .write(item)
- lire sur les objets stream avec .read()
- de terminer un stream avec false item

Vous pouvez retrouver l'ensemble des slides sur [Github](https://github.com/creationix/moonslice-node)



### HTTP Proxy, par Nuno Job



![Crédit : https://www.flickr.com/photos/andyet-photos/8680421388/in/set-72157633306379029](/images/posts/imgob/0-00-30-83-201304-ob_05a059_8680421388-75c8b026cc-jpg.jpeg)

Crédit : https://www.flickr.com/photos/andyet-photos/8680421388/in/set-72157633306379029


[@dscape](https://twitter.com/dscape) nous propose un bon article sur [le load balancing avec nodejs](https://blog.3rd-eden.com/post/47477879421/finding-balance).  
 Pour le speaker nodejs c'est : **net protocols && libuv && v8 && npm**

Vous pourrez retrouver l'ensemble des slides sur [Github](https://github.com/dscape/realtimeeu)



### Learning How To Let Go, par Kyle Drake

[@kyledrake](https://twitter.com/kyledrake) introduit d'autres solutions en remplacement de JSON : basés sur des données en binaire.



![Crédit : https://twitter.com/OriPekelman/status/326684373090963456/photo/1](/images/posts/imgob/0-00-30-83-201304-ob_dbdd43_biidtnxceaasggc-jpg-large.jpeg)

Crédit : https://twitter.com/OriPekelman/status/326684373090963456/photo/1


Cependant, tout le monde n'utilise pas correctement les échanges binaires. Le speaker nous fait un très bon résumé de la situation pour effectuer des pushs sur la plateforme d'Apple ([Apple Push Notification Service](https://developer.apple.com/library/mac/#documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/CommunicatingWIthAPS.html#//apple_ref/doc/uid/TP40008194-CH101-SW1)) et des types de retours effectués par Apple. Ceci résume assez bien la situation.



![Crédit : https://twitter.com/noel_olivier/status/326686457257406464](/images/posts/imgob/0-00-30-83-201304-ob_5c9f0a_biifmh4cmaagumx-jpg-large.jpeg)

Crédit : https://twitter.com/noel_olivier/status/326686457257406464


JS ne propose pas d'API "native" mais un projet permet de traiter du binaire : [binaryjs](https://binaryjs.com/) (du binaire via websockets).

Kyle effectue différents benchs sur la taille des contenus envoyés : l'un en JSON, l'autre en Binary JSON et le dernier via MessagePack. Bien entendu, ce sont les contenus en binaire qui sont les plus légers, mais il reste voir l'impact du téléchargement du JS associé et du traitement côté client.

Un sujet donc à étudier qui rappelle [AMF](https://en.wikipedia.org/wiki/AmfPHP) pour échanger des informations au format binaire entre PHP et Flash.



### Securing socket applications, par James Coglan

Dans un premier temps, [@jcoglan](https://twitter.com/jcoglan) nous indique que la sécurité c'est difficile et que cela concerne :

- l'authentification
- la vie privée
- les XSS
- les CSRF



Pour répondre aux différentes problématiques, il nous présente [Faye](https://faye.jcoglan.com/) un système simple de message pub/sub pour le web. [Ses slides sont disponibles](https://slides.jcoglan.com/security-realtime#1).



### Real-time design, par Jan-Christoph Borchardt



![Crédit : https://twitter.com/OriPekelman/status/326711206209527809/photo/1](/images/posts/imgob/0-00-30-83-201304-ob_f74ac1_bii2hg7ciaag4bk-jpg-large.jpeg)

Crédit : https://twitter.com/OriPekelman/status/326711206209527809/photo/1


[@jancborchardt](https://twitter.com/jancborchardt) n'est pas un développeur, mais il nous rappelle quelques concepts importants :

- Plus l'utilisateur s'ennuie, plus la confusion augmente
- Sous 0,1 ms, l'utilisateur considère cela comme du temps réel
- Attention aux transitions
- Ne pas tuer la fluidité
- "Interruptification" (exemple flagrant sur l'image ci-dessous)
- Pas de notifications pendant l'utilisation (ex batterie faible 20% sur un mobile)



![CR Real Time Conférence Europe 2013 - Day 2](/images/posts/imgob/0-00-30-83-201304-ob_b2ee1c90b3554e2214b30ef5e4587667_imag0378.jpg)

En résumé, l'interface et le design sont importants également pour s'approcher d'une expérience utilisateur temps-réel.



### Fin de la seconde journée

Pour les plus courageux, le livestream est également disponible.


<iframe allowfullscreen="" frameborder="0" height="480" src="https://www.youtube.com/embed/iq9bSo-lEGs?wmode=transparent&feature=oembed" width="854"></iframe>

Cet événement était très intéressant :

- par son avance de phase, la majorité des présentations correspondaient des résultats de R&D, voire d'innovation.
- par l'ambiance
- par le networking que l'on pouvait y faire

On peut en revanche peut être un peu regretter le nombre de français (la fois côté speaker et également côté public).

Pour terminer, un grand merci Julien Genestoux qui a organisé l'événement.

Rendez-vous pour la prochaine édition.
