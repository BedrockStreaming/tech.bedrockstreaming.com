---
layout: post
title: "CR React Conférence 2015 - Day 1"
description: "Compte rendu de la conférence React - Facebook HQ - Menlo Park - Day 1"
author:
  name: Kenny DITS
  avatar:
  email:
  twitter:  kenny_dee
  facebook:
  github:
category:
tags: [javascript, react, flux, isomorphic, conference]
image:
  feature: posts/reactconf/reactconf.png
  credit: irvine broque
  creditlink: https://twitter.com/irvinebroque/status/560503653966942208
comments: true
---

Les 28 et 29 janvier 2015, sur le campus de Facebook (à Menlo Park), avait lieu la première conférence officielle sur la librairie open-source React (créée par les équipes de Facebook).

2 jours de conférences riches en talks et en annonces dont voici un petit compte-rendu, pour ceux n’ayant pas eu la chance de pouvoir y assister ou de suivre les différents LT sur Twitter, en commençant par la première journée.

# L’ouverture de la conférence par Tom Occhino 

Tom Occhino, [@tomocchino](https://twitter.com/tomocchino), a permis de rétablir la vérité sur l’origine de React.
Ce sont les équipes de Facebook Ads qui sont à la genèse de ce projet.

A l’époque, sur des applis MVC côté client, plus les applications et le nombre de développeurs grandissaient, plus elles étaient difficiles à maintenir et devenaient lentes !
Le « Two Way Data Binding » rendait les mises à jour en cascade trop compliquées (tout l’écran devait être rafraîchi) et le code devenait vraiment non prévisible. Mais malgré tout, cela “marchait” ! L’appli de Chat Facebook fonctionnait aussi de la même manière.

C’est ainsi que React a été créé pour améliorer le rendu, l’organisation et les performances de ces applications.

Instagram a ensuite rejoint Facebook et les équipes ont voulu utiliser React pour refondre le site, mais React était à l’époque trop couplé à Facebook. 
Pete Hunt a donc re-factoré l’ensemble pour créer le React “open-source” que l’on connaît aujourd’hui.

Après cette introduction sur React, Tom a expliqué que l’un des problèmes de React est qu’il n’est utilisé que pour le Web.
Aujourd'hui, tout le monde tente de créer des composants web ressemblant aux composants natifs, mais à chaque fois, le résultat est mauvais, l'environnement natif étant plus performant que celui d'un browser. Un exemple donné d'application native plutôt sexy est celui de "Facebook Paper".

Il a ensuite révélé l’annonce certainement la plus importante de ces 2 jours, l’arrivée prochaine sur Github de « React Native », permettant de développer en Js via React des composants entièrement natifs, avec comme exemple, l’application Facebook Groups présente sur l’App Store iOs ! 
La conférence est lancée !

Avec React Native, ils ne veulent pas faire du "write once, run anywhere », mais du "learn once, write anywhere » de manière à optimiser les composants et usages suivant les devices.

Le code sera fourni sur un dépot privé à tous les participants de la conférence lors de la Keynote de clôture !

Pour finir sa keynote d’entrée, il a voulu lister les frameworks JS qui ont été influencés par React ces derniers mois : Tous ! 

<iframe width="720" height="405" src="https://www.youtube.com/embed/KVZ-P-ZI6W4" frameborder="0" allowfullscreen></iframe>

# Ebay : Tweak your page in real time, without leaving the comfort of your editor

Brenton Simpsons d’Ebay, [@appsforartists](https://twitter.com/appsforartists), nous a montré comment coder en live du React de son mac, avec le rendu affiché en temps réel sans reload sur un ipad.

L’avantage d’un iPad étant sa taille qui lui permet de représenter 3 écrans d’iPhone 5 sur sa largeur, soit 3 états de son application.
Il utilise « [WebPack](https://webpack.github.io/) » et l’extension pour WebPack « [react-hot-loader](https://gaearon.github.io/react-hot-loader/) » de [Dan Abramov](https://twitter.com/dan_abramov).

Ebay a aussi open-sourcé un framework assez experimental (6 mois d’ancienneté) du nom d’Ambidex pour gérer du server side rendering avec React et Flux : [https://github.com/appsforartists/ambidex](https://github.com/appsforartists/ambidex)

<iframe width="720" height="405" src="https://www.youtube.com/embed/yaymfLj5tjA" frameborder="0" allowfullscreen></iframe>

# Data fetching for React Applications at Facebook


Jing Chen, [@jingc](https://twitter.com/jingc), et Daniel Schafer, [@dlschafer](https://twitter.com/dlschafer), nous ont présenté Relay, une nouvelle approche au pattern Flux orienté Data Fetching, permettant grâce à GraphQL de définir au niveau de son composant les data nécessaires.
Relay se chargeant ensuite de générer les bons appels HTTP grâce à GraphQL.

Une approche intéressante, mais qui parait très couplée au fonctionnement de Facebook et soulève pas mal de questions : dois-je modifier toutes mes API pour supporter GraphQL ? Quid de l’optimisation du cache coté API ? ...

Relay sera open-sourcé prochainement (ainsi que GraphQL j’imagine ?).

Beaucoup plus d’infos sont disponibles ici : [https://gist.github.com/wincent/598fa75e22bdfa44cf47](https://gist.github.com/wincent/598fa75e22bdfa44cf47)

<iframe width="720" height="405" src="https://www.youtube.com/embed/9sc8Pyc51uU" frameborder="0" allowfullscreen></iframe>

# Communicating with channels

James Long, [@jlongster](https://twitter.com/jlongster), assez réputé via son blog [https://jlongster.com](https://jlongster.com/) et pour son travail chez Mozilla sur les Dev Tools de Firefox, a présenté une manière de communiquer entre composants via des « channels » en utilisant la librairie “ [js-scp](https://github.com/ubolonton/js-csp)”  permettant de coder à la manière des « goroutine » de Go ou des « [core.async](https://github.com/clojure/core.async) » de Clojurescript.

<iframe src="//www.slideshare.net/slideshow/embed_code/44054367" width="425" height="355" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

<iframe width="720" height="405" src="https://www.youtube.com/embed/W2DgDNQZOwo" frameborder="0" allowfullscreen></iframe>

# React-router increases your productivity

Michael Jackson, [@mjackson](https://twitter.com/mjackson), co-créateur du routeur le plus populaire de React “[react router](https://github.com/rackt/react-router)”, est venu avec Ryan Florence (l’autre co-créateur), nous expliquer les origines du routeur, l’inspiration très forte du router d’Ember.Js, ainsi que quelques techniques avancées d’utilisations (transitions, etc). Un excellent speaker et une introduction très drôle sur les origines de React-Router.

> "Url should be part of your design process"

<script async class="speakerdeck-embed" data-id="1e95aa158d6643788ecaceb07c2d23b8" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<iframe width="720" height="405" src="https://www.youtube.com/embed/XZfvW1a8Xac" frameborder="0" allowfullscreen></iframe>

# Full Stack Flux

Pete Hunt, [@floydophone](https://twitter.com/floydophone), l’une des personnes responsable des origines de React et de son « open-sourcage », ancien Lead-Dev d’Instagram chez Facebook, a présenté un talk un peu particulier expliquant comment on pouvait, coté architecture serveur, reproduire le pattern Flux. 

> "shared mutable state is the root of all evil."

<iframe width="720" height="405" src="https://www.youtube.com/embed/KtmjkCuV-EU" frameborder="0" allowfullscreen></iframe>

# Making your app fast with high-performance components

Jason Bonta, de l’équipe Facebook Ads, à l’origine de la création de React, a ciblé sa présentation sur les problèmes de performances que résout React.
Coté Ads Manager, l’équipe doit faire des interfaces ultra complexes, avec notamment le besoin de présenter un nombre d’éléments très important dans un tableau.

Un composant qui sera annoncé comme « open-sourcé » durant sa conférence : [FixedDataTable](https://facebook.github.io/fixed-data-table/)
Vous pouvez aussi retrouver une « review » du composant ici : [https://www.reactbook.org/blog/fixed-data-table-reactjs.html](https://www.reactbook.org/blog/fixed-data-table-reactjs.html)

Ont été abordé :

* le ReactAddons : [PureRenderMixin](https://facebook.github.io/react/docs/pure-render-mixin.html)
* l’utilisation du shallowEqual sur le shouldComponentUpdate
* Ainsi qu’une bonne pratique pour la réalisation des composants, qui est revenue plusieurs fois pendant la conf, consistant à englober le composant, dans un autre composant de type container ne contenant aucune « props ».

En résumé : 
![React Basic concepts for optimization](/images/posts/reactconf/react-basic-concept-optim.png)

<iframe width="720" height="405" src="https://www.youtube.com/embed/KYzlpRvWZ6c" frameborder="0" allowfullscreen></iframe>

# Format data and strings in any language with FormatJS and react-intl

Dernière conférence de la journée par Eric Ferraiuolo, [@ericf](https://twitter.com/ericf), sur l’internationalisation et la manière de la gérer dans React, grâce à [react-intl](https://github.com/yahoo/react-intl) (open-sourcé par Yahoo).

Pour ceux qui douteraient encore de la complexité de gérer plusieurs langues, ainsi que les chiffres et pluralisations, et qui ont cette problématique sur un projet React, cette vidéo est un must-see.
[Format.Js](https://formatjs.io/) a aussi été cité et s’apparente à une collection de module Js pour l’internationalisation.

<iframe width="720" height="405" src="https://www.youtube.com/embed/Sla-DkvmIHY" frameborder="0" allowfullscreen></iframe>

# Hype

Ryan Florence a fini la journée sur un showcase d’exemple très intéressant. 
Il nous a aussi raconté son histoire, et comment il est devenu développeur : principalement, parce qu’il voulait toujours répondre “oui” quand on lui demandait si il pouvait faire quelque chose.

Bref, une excellente manière de finir la journée de manière fun avec quelques exemples très intéressants, notamment autour des “portals”.

Vous pouvez retrouver toutes les démos ici : [https://github.com/ryanflorence/reactconf-2015-HYPE](https://github.com/ryanflorence/reactconf-2015-HYPE)

Pour ceux qui douteraient encore des performances de React, je vous invite à regarder les 5-6 premières minutes de la vidéo.

<iframe width="720" height="405" src="https://www.youtube.com/embed/z5e7kWSHWTg" frameborder="0" allowfullscreen></iframe>

# Conclusion du premier jour

Bonne grosse claque sur cette première journée, notamment avec l’annonce de React Native. Nous avons eu le droit à une organisation absolument parfaite (snack, boisson chaude et froide à volonté) et des speakers de très grand talent (ce qui n’est pas toujours le cas de certaines conférences, surtout aussi ciblée que celle-là).

p.s: Retrouvez les [retours sur la deuxième journée de la React conférence 2015](https://tech.m6web.fr/cr-react-conf-2015-day-two/).
