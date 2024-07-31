---
layout: post
title: "Benchmarking WebSockets avec NodeJs"
description: ""
author: bedrock 
category: 
tags: [nodejs,websockets,benchmark,open-source]
image:
  feature: 
  credit: 
  creditlink: 
comments: true  
permalink: benchmarking-websockets-avec-nodejs
---

Nous avons récemment eu à repenser une application [Node.js](https://nodejs.org) de timeline temps réel, basée sur les [WebSockets](https://fr.wikipedia.org/wiki/Websocket) afin de tenir une charge plus élevée.


L'application timeline
----------------------


Fonctionnellement, l'application timeline est relativement simple: elle consiste à afficher un flux de message publiés par des contributeurs en temps réel pour les internautes présent sur la page. Pour cela l'application se base sur [socket.io](https://socket.io/) pour la partie websocket, et supporte à peu près 15 000 connexions simultanées.


Afin d'augmenter la capacité de l'application, nous avons décidé de la rendre scalable horizontalement. C'est dire, répartir la charge sur un nombre X de serveurs communiquant entre eux, par exemple, par le biais de Redis.


![Benchmarking WebSockets avec NodeJs](/tech.bedrockstreaming.com/public/images/posts/imgob/0-00-30-83-201306-ob_f7b929d0a6fe57963aa5f28c2d48a291_test.png)

Pour cela socket.io propose un store redis qui permet aux différentes instances de communiquer entre elles. Malheureusement les performances de ce store sont plutôt désastreuses car le store que propose socket.io est beaucoup trop verbeux et écrit absolument tous les évènements que reçoit un serveur sur un seul channel redis. L'application devenait inutilisable autour de 8 000 connexions. Il était donc inenvisageable de l'utiliser en production.


Nous avons donc décidé rapidement de passer une autre solution que socket.io. Après pas mal de recherche nous avons fait notre choix sur [Faye](https://faye.jcoglan.com/), une implémentation du protocole de Bayeux, bien documenté et proposant aussi d'utiliser redis comme "store". Après test, cette solution s'est révélée bien plus performante que socket.io.



Tests de charge
---------------


Une des problématiques rapidement rencontrée sur ce projet a été de tester la charge de notre application: comment simuler 15 000 connexions simultanées ?

En faisant le tour des solutions de benchmark de websocket ([thor](https://github.com/observing/thor), ...) ,nous n'avons pas trouvé la solution qui nous permettait de faire les tests que nous souhaitions. [Siege](https://www.joedog.org/siege-home/), [ab](https://httpd.apache.org/docs/2.2/programs/ab.html) ne le propose pas encore,[Gatling](https://gatling-tool.org/), [Jmeter](https://jmeter.apache.org/), [Tsung](https://tsung.erlang-projects.org/) ont des plugins web-socket mais l'utilisation et le reporting ne sont pas des plus clair.

La solution ?


Websocket-bench
---------------


Nous avons donc décidé de développer notre propre outil de benchmark de websocket ([Socket.io](https://socket.io/) ou [Faye](https://faye.jcoglan.com/)), au nom très original : [websocket-bench](https://github.com/BedrockStreaming/websocket-bench).

Cet outil se base sur les clients Node que proposent [Faye](https://faye.jcoglan.com/) et [Socket.io](https://socket.io/). Il peut être facilement étendu à l'aide de "generator" (module Node), afin de rajouter la logique de votre application. Par exemple dans le cas de notre application, en se connectant, un client doit envoyer un message au serveur pour valider la connexion.


Ci dessous un exemple de générateur qu'on a pu utiliser lors de nos tests de charge.



<script src="https://gist.github.com/nchaulet/5875142.js"></script>

Cet outil, lancé sur des instances Amazon, nous a permis d’exécuter nos tests de charge.


Un exemple : la commande ci dessous va lancer 25 000 connexions, à raison de 1000 connexions par seconde en utilisant le generateur "generator.js" :


<script src="https://gist.github.com/nchaulet/5934254.js"></script>

![Nombre de clients connectés sur Graphite](/tech.bedrockstreaming.com/public/images/posts/imgob/0-00-30-83-201306-ob_d08f10f02fad26d77fa14e6d966584c2_testcharge.png)

Nombre de clients connectés sur Graphite


Au delà de 25 000 connexions, l'instance Amazon (large) qui lançait les tests ne tenait plus. Une solution pour tester un nombre plus élevés de connexions serait d'utiliser plusieurs machine de tests, peut être à l'aide de [bees with machin guns](https://github.com/newsapps/beeswithmachineguns) et ainsi d'utiliser plusieurs instances pour lancer les tirs de charge.



##### **Bonnes pratique de test de charge**

Lors de votre test de charge (et pour la prod), n'oubliez pas d'augmenter le nombre maximal de descripteurs de fichiers coté client ET coté injecteur (ulimit -n 256000 par exemple dans la conf de supervisor, et dans le terminal avant de lancer le benchmark).

Surveillez votre [conntrack](https://conntrack-tools.netfilter.org/) (si firewall iptables), augmentez votre plage locale de port, et si vous êtes amenés à tester plus de 25K connexions, utilisez plusieurs machines et/ou plusieurs IP sources différentes.



##### Comment contribuer au projet ?

N’hésitez pas à remonter d’éventuels bug via les issues ou à contribuer au projet l'aide de pull request github ([https://github.com/BedrockStreaming/websocket-bench](https://github.com/BedrockStreaming/websocket-bench))



