---
layout: post
title: "CR React Europe Conférence 2015 - Day 2"
description: "Compte rendu de la React Europe - Jour 2"
author:
  name: Frédéric Vieudrin, Matthieu Guillermin, Florent Dubost, Kenny Dits
  avatar: 
  email:
  twitter: techM6Web
  facebook:
  github:
category:
tags: [javascript, react, reactnative, video, graphql]
image:
  feature: posts/reacteurope/reacteurope2.png
  credit: Fred V.
  creditlink: 
comments: true
---

# Jour 2

# Improving Your Workflow With Code Transformation (Kenny)

![Sebastian](https://scontent-fra3-1.xx.fbcdn.net/hphotos-xtp1/t31.0-8/11708021_1634479723478356_6327923852808196299_o.jpg)
(crédits : [Fabien Champigny - React Europe](https://www.facebook.com/media/set/?set=a.1634468596812802.1073741829.1541044122821917&type=3))

Nous commencons la journée avec le créateur du fameux Babel: Sebastian McKenzie.
Babel est un transpiler JS permettant de transformer le code ES6/7 en code ES5.
Après un petit historique sur le nom, car cet outil s’appelait 6to5 avant l’arrivée d’ES7 , pour finalement ce renommer Babel :)
L’Adoption par la communauté a ensuite été assez massive !

Sébastian nous explique le fonctionnement interne de Babel avec le découpage en 3 sections : Parser / Transformer / Generator
Ils utilisent l’AST (abstract syntax tree) pour avoir une "data structure" du code et pouvoir faire des traitements sur cette structure.
On rentre très (trop ?) en profondeur dans les bas-fond de Babel, afin de partager les différentes difficultés et trucs et astuces pour les transformations que Babel réalisent.

Le talk ce finit sur le futur de Babel, qui sera à chercher du coté de : 

* Dead code elimination/minification
* constant folding/static evaluation
* static analysis / linting

Steven Lusher, l’un des dev Facebook travaillant sur Relay vient de mettre un blog post sur le site Babel concernant [l’utilisation ES6 de React](http://babeljs.io/blog/2015/06/07/react-on-es6-plus/)

# The State of Animation in React (Fred)

![Cheng Lou](https://scontent-fra3-1.xx.fbcdn.net/hphotos-xtp1/t31.0-8/11708006_1634480313478297_332588232232742214_o.jpg)
(crédits : [Fabien Champigny - React Europe](https://www.facebook.com/media/set/?set=a.1634468596812802.1073741829.1541044122821917&type=3))

![Cheng Lou Notes](https://pbs.twimg.com/media/CI_C8rIVEAA34Sa.jpg:large)

Cheng Lou fait le point sur les animations en React et nous présente sa nouvelle approche [react-motion](https://github.com/chenglou/react-motion)

Il est convaincu qu'il faut abandonner les [ReactCssTransitionGroup](https://facebook.github.io/react/docs/animation.html) au profit des animations basées sur des interpolations “à-la-flash".

## CSS Transitions

Les Transitions CSS présentent plusieurs défaut, elles sont difficiles à controler et elles sont étroitement liées au DOM. En revanche, elles sont plutôt performantes, non bloquantes et répondent à la plupart des usages.

## Declarative Tweens

Les Declarative Tweens sont une solution alternative interessante qui permettent de composer une animation selon des critères précis (début, durée, direction, …). Cette solution présente aussi l’avantage de pouvoir créer des animations composées de plusieurs sous-animations et d'interrompre leur execution sur demande.

## Springs
[voir la démo](https://github.com/chenglou/react-motion/tree/master/demo2)

## Transition Springs
[voir la démo](https://github.com/chenglou/react-motion/tree/master/demo3)
[voir la démo](https://github.com/chenglou/react-motion/tree/master/demo4)

# Simplifying the data layer

![Kevin Robinson](https://scontent-fra3-1.xx.fbcdn.net/hphotos-xat1/t31.0-8/10922738_1634481140144881_1240354023550287523_o.jpg)
(crédits : [Fabien Champigny - React Europe](https://www.facebook.com/media/set/?set=a.1634468596812802.1073741829.1541044122821917&type=3))

Kevin Robinson nous présente comment Twitter utilise React. L’approche présentée fait la part belle au “fonctionnel”, à l’image de leur infrastructure backend.

Il nous détaille les mécanismes mis en place pour l’accès aux données, notamment la possibilité de gérer de manière déclarative les dépendances aux données au niveau des composants.
Au niveau des stores, il prone l’utilisation de structures immuables en stockant un “log” d’événement et en utilisant des “reducers” pour en extraire l’état des données réel.

On retrouve dans leur approche beaucoup de concepts de la programmation fonctionnel (de la même manière que Redux), mais malheureusement, aucun code n’est ouvert par Twitter à ce sujet.

On reste un peu sur notre faim en ne pouvant pas aller jouer “concrêtement” avec leurs outils.

# Going Mobile with React (Fred)

![Jed Watson](https://scontent-fra3-1.xx.fbcdn.net/hphotos-xtp1/t31.0-8/11696380_1634481350144860_1142691694641390511_o.jpg)
(crédits : [Fabien Champigny - React Europe](https://www.facebook.com/media/set/?set=a.1634468596812802.1073741829.1541044122821917&type=3))

Jed Watson créateur du framework [TouchStone JS](http://touchstonejs.io/), un framework JS (basé sur React) permettant de faire des applications mobiles hybride (à base de Webview via Apache Cordova), nous explique comment réaliser des applis hybride grâce à React.

Le débat ici est plutôt de démontrer qu’on peut malgrès les dires de certains et en connaissant quelques astuces, faire une appli mobile hybride qui ressemblera à une appli native. Pour nous prouver cela, Jed annonce que l’appli de la React Europe, dispo sur iOS et Android, et que nous avons tous utilisé a été faite avec TouchStone JS !

> If you have great developer experience, you are much more likely to get to a great UX

Jed conseille de ne pas faire de l’hybride lorsqu’on :

* est Facebook ou Twitter
* a beaucoup de données
* a une utilisation processeur intensive
* a des animations complexes sur l’UI
* a des interactions complexes
* a de la gestion mémoire avancée

Les points les plus importants pour qu’une application hybride fonctionne sont :  

* React
* la gestion du Touch
* le Layout
* la gestion de la Nav

> You should not do everything in a webview, but you can

Le code de l’application React Europe sera rendu open-source à la fin de la démo : [Sketch & Code de l’app React Europe](http://thinkmill.com.au/react-europe)

![Notes de @chantastic](https://pbs.twimg.com/media/CI_hYErUcAAan_P.jpg:large)

# React Router (Florent)

![Michael Jackson](https://scontent-fra3-1.xx.fbcdn.net/hphotos-xtp1/t31.0-8/11238219_1634482576811404_3585441542448837466_o.jpg)
(crédits : [Fabien Champigny - React Europe](https://www.facebook.com/media/set/?set=a.1634468596812802.1073741829.1541044122821917&type=3))

Belle présentation de Michael Jackson [@mjackson](https://twitter.com/mjackson), pas aussi spectaculaire qu’un concert de l’artiste homonyme, mais assez surprenante et délirante quand même ! Il introduit la librairie qu’il porte avec Ryan Florence [@ryanflorence](https://twitter.com/ryanflorence) depuis plus d’un an et qui est majoritairement utilisée par les utilisateurs de React pour mettre du routing dans leur application : [React Router](https://github.com/rackt/react-router), “The” Router.

Michael commence par nous présenter les bases de la librairie : la définition des routes dans un composant React et le composant Link permettant de générer les liens. Il explique que ce sont des concepts simples et qu’ils permettent à de nouveaux développeurs peu expérimentés de rentrer facilement dans un projet.

Il fait ensuite l’analogie entre les vues et les URLs, affirmant que de bonnes URLs, bien formées, augmentent la confiance de l’utilisateur envers l’application. Une notion importante dans React Router est celle des transitions permettant de changer de vues (et donc d’URLs) et de gérer le “browser history”.

Michael nous annonce une nouveauté dans la prochaine version : l’attribut onEnter sur la définition de route, permettant d’executer une callback avant d’afficher la page (utile par exemple pour protéger une page par authentification).

Il nous expose sa vision du composant comme une fonction prenant en entrée props et state et renvoyant en sortie une UI. Le router n’est finalement qu’un composant comme un autre qui reçoit en entrée l’URL. L’idée que ce qui est explicite est bien meilleur que ce qui est “magique” dans une implémentation lui permet de présenter les changements de l’API dans les dernières versions du React Router avec la récupération des paramètres de l’URL via les props du composant (et plus via une mixin) ou la disparition du composant RouteHandler qui peut simplement être remplacé par `props.children` pour utiliser les “nested routes” dans ses composants.

Dans les travaux en cours, on retiendra les transitions animées qui permettent à Michael de faire une démo “wahou”. L’animation est, bien entendu, répétée en sens inverse sur l’utilisation du back du navigateur. Cette fonctionnalité a d’autant plus d’importance que changement d’URLs et animations ne sont traditionnellement pas de bons amis et posent souvent problème.

Le “dynamic routing” est la deuxième démo montrant la possibilité de contextualiser l’ouverture d’une URL : sur une page, un contenu peut être ouvert dans une popup, mais en copiant et ouvrant l’URL obtenue dans un autre onglet, on a une page avec le même contenu mais une présentation différente (plus de popup).

Enfin, le clou du spectacle sera la dernière démo qui échouera (un dernier commit sur le repo qui aurait provoquer une erreur) qui nous aura valu une fabuleuse danse de Ryan Florence sur la scène (venu en renfort de Michael) ! L’idée initiale était de présenter une fonctionnalité assez énorme permettant de lazy loader les JS de sa SPA en fonction des besoins de chaque route (le “gradual loading”) évitant de charger dès le départ les 3Mo de son bundle webpack alors qu’on en utilise qu’une petite partie. Il faudra attendre pour voir cette fonctionnalité en action...

# Creating a GraphQL Server (Matthieu)

Après la conférence de la veille sur GraphQL, Nick Schrock et Dan Schafer nous montre comment réaliser un serveur GraphQL.

GraphQL est une spécification d’échange et ne présuppose aucune technologie backend. Comme on l’a déjà vu dans la conférence précédente, l’idée est de faire de GraphQL une couche entre le client et le code backend déjà existant.

Facebook, en ouvrant cette spécification et l’implémentation de référence, espère fédérer une communauté autour de cette solution. Si d’autres personnes réalisent des implémentations dans différents langages, cela permettrait à tout le monde de capitaliser sur ces techniques et de faciliter la réutilisation de code que ce soit côté client ou serveur.

La “stack” imaginée pour GraphQL est présentée en partant du serveur jusqu’au client : 

* GraphQL App Servers
* Libs (Parse, SQL)
* Core
* Spec
* Common tools (ex: graphicQL, IDE-like tool)
* Client SDKs (Relay)
* GraphQL Clients 

Au delà de la présentation théorique, on se pose quand même la question de la mise en oeuvre concrête au dessus de code existant.
Facebook utilise maintenant intensivement GraphQL. Par contre, ils n’utilisent pas l’implémentation de référence mais sans doute une implémentation très imbriquée à leur backend (et donc difficile à rendre open-source).
On manque malheureusement de retour sur des questions de mise en oeuvre comme le cache ou la gestion des droits par exemple.
Espérons que des “early-adopters” puissent nous faire des retours là-dessus dans les semaines/mois à venir.

Pour en savoir plus, un bon article sur le sujet : [GraphQL overview : Getting start with GraphQL and Node.JS](http://blog.risingstack.com/graphql-overview-getting-started-with-graphql-and-nodejs/)

# Isomorphic Flux (Florent)

![Michael Ridgway](https://scontent-fra3-1.xx.fbcdn.net/hphotos-xat1/t31.0-8/11157524_1634483346811327_5314578204448681932_o.jpg)
(crédits : [Fabien Champigny - React Europe](https://www.facebook.com/media/set/?set=a.1634468596812802.1073741829.1541044122821917&type=3))

Michael Ridgway [@theridgway](https://twitter.com/theridgway) aborde une notion souvent abordée ces 2 jours et sur laquelle nous avions fait un [article en décembre dernier]( http://tech.m6web.fr/isomorphic-single-page-app-parfaite-react-flux/).

Selon Michael, les avantages du “server rendering” sont multiples :

* le SEO
* le support des anciens navigateurs
* le gain de performance perçu par l’utilisateur

Un des objectifs de cette démarche est de partager le maximum de code entre le serveur et le client.

La stack proposée par Michael est la suivante : 

* pour la gestion des vues, React évidemment qui expose une API client et serveur
* pour le routing, React Router (https://github.com/rackt/react-router)
* pour le data fetching, superagent (https://github.com/visionmedia/superagent)
* pour la logique applicative, un pattern léger et célèbre : Flux

Pour la mise en oeuvre de Flux côté serveur, nous avons déjà vu au cours de ces 2 journées : [Redux](https://github.com/gaearon/redux) et [React Nexus](https://github.com/elierotenberg/react-nexus). Il en existe d’autres comme [marty.js](http://martyjs.org/), [flummox](http://acdlite.github.io/flummox) ou [alt](http://alt.js.org/). Michael nous propose [Fluxible](http://fluxible.io/), la librairie développée par Yahoo.

[Fluxible](http://fluxible.io) crée un contexte pour chaque requête côté serveur avec un dispatcher custom optimisé pour cette opération. L’état de l’application est transmis du serveur vers le client grâce à un mécanisme de déshydratation/réhydratation des stores.

Michael précise que Fluxible force les développeurs à utiliser Flux de manière conforme sans transgresser les pratiques définies par le modèle. La librairie fournit des composants de haut niveau permettant une parfaite intégration avec React. Enfin, la particularité de Fluxible est son système de plugins permettant de facilité l’ajout de nouvelles fonctionnalités.

Michael nous montre un exemple de chat isomorphique et la différence observée au chargement avec une SPA classique. Il précise ensuite les outils de développement qu’il utilise :

* Babel
* ESLint
* webpack
* babel-loader
* Grunt / Gulp
* Yeoman Generators

Michael termine sa conf en indiquant que plusieurs applications en prod chez Yahoo utilisent la stack présentée et Fluxible mais qu’il reste encore quelques améliorations à apporter pour les raisons suivantes :
Les dépendences des composants envers les données ne sont pas facilement connues (rendant le data fetching en amont du rendering côté serveur délicat). Relay pourrait être une solution.
Le rendu côté serveur de React est relativement lent (mais pourrait être amélioré dans les futures version de React).
Le Hot Reloading (avec React Hot Loader) ne fonctionne pas avec les stores Fluxible.

# Conclusion

Que dire après ces deux jours de conférence ? 
Déjà que la communauté et l’engouement autour de React ne cesse de grandir, mais aussi que ca ne chome pas coté Facebook avec Relay, GraphQL, Animated, React Native Android qui ne devraient pas tarder à pointer le bout de leur nez, avec aussi la mise en place d’une personne full time sur Jest ! C’est rassurant sur l’avenir court/moyen terme de React.

L’organisation était vraiment impeccable (mise à part les soucis de climatisation) avec beaucoup de très bonnes idées, notamment, les bureaux au fond et sur les cotés de la salle de conférence pour que les personnes avec LapTop puisse suivre confortablement.

C’est aussi plutôt étonnant, pour une conférence en france, d’avoir vu aussi peu de personnes francophone. Le public étant très majoritairement anglophone. On se dit que React n’a pas encore complétement pris en France.

Coté tendance, on voit qu’au niveau des librairies Flux, Redux parait clairement être celle qui attire tous les buzz. A voir dans le temps si cela suit, mais le talent indéniable de son créateur, combiné aux bonnes idées (reducers, hot reload) donne vraiment envie de s’y pencher. On regrette aussi toujours le manque de sujets autour des tests.

Nous attendons aussi impatiemment React Native Android, pour voir si le buzz et les superbes promesses sont toujours présente avec deux environnements cibles, et on espère voir sur nos stores de plus en plus d’applis React Native.

GraphQL + Relay parait vraiment être la solution idéale pour réaliser simplement du data fetching coté client (React Web ou React Native), mais l’absence de Relay (toujours pas open-sourcé), combiné au manque de retour sur GraphQL pose encore de nombreuses questions.

On a donc hâte d’être à la prochaine React Conférence ou React Europe pour voir la suite de l’évolution de React.
