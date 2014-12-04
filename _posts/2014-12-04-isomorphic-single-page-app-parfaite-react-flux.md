---
layout: post
title: "App Isomorphic: la Single Page Application parfaite ?"
description: "Développer une SPA référencable et performante avec React.Js et Flux"
author:
  name: Kenny DITS
  avatar:
  email:
  twitter:  kenny_dee
  facebook:
  github:
category:
tags: [javascript, webperf, angular, react, flux, isomorphic]
image:
  feature: posts/reflection.jpg
  credit: Jianwei Yang
  creditlink: https://www.flickr.com/photos/jianweiyang/6091704355/
comments: true
---

Qu’est ce qu’une Single Page App (SPA) ?

> « As rich and responsive as a desktop app but built with HTML5, CSS and Javascript »

Les SPA se répandent de plus en plus, et deviennent un choix « commun » lorsque l’on veut développer un Front riche (souvent câblé sur des API REST) que l’on souhaite :

* testable (unitairement et fonctionnellement)
* fluide (pas de rechargement d’url etc)
* bien organisé
* maintenable et évolutif
* ...

Les Frameworks type [AngularJs](https://angularjs.org/) et [EmberJs](http://emberjs.com/) tiennent le haut du panier et ont largement fait leurs preuves, mais ils continuent à échouer sur deux sujets pourtant primordiaux dans beaucoup de cas :

* La performance (dont le rendu initial)
* Le référencement

# La Performance

Aujourd’hui, quand vous chargez une SPA, voici grossièrement ce qui se passe coté client :

* Chargement du fichier HTML
* Chargement des différents Assets (Css, image, scripts JS externe comme Angular et Jquery par exemple)
* Ainsi que de l'intégralité du code JS de votre application (sauf si vous [lazyloadez](https://github.com/ocombe/ocLazyLoad))
* Execution de tout ce petit monde, qui va devoir savoir où vous êtes dans l’application afin de générer le HTML correspondant à l’état demandé.

Avoir ces quelques secondes à attendre avant de se retrouver dans un état fonctionnel est peut être acceptable pour un backoffice. Mais ça l'est beaucoup moins pour un front riche.Et ce temps aura tendance à augmenter fortement, parallèlement à l’enrichissement de votre application.

Si l’on se soucie un minimum des aspects de performances Web, c’est forcément dérangeant.
Et d’un point de vue plus global, tout le monde sait aujourd’hui que la performance brute n’est pas le point fort de ces frameworks.

# Le référencement

Autre sujet, qui peut être très problématique, si le site en question s’y prête. Ces applications vont fournir comme « source HTML » quelque chose de ce style (pour du Angular) :

{% highlight html %}

<!doctype html>
<html class="no-js">
<head>
    ...
</head>
<body ng-app="myApp">
    <ng-view></ng-view>
    <script src="scripts/vendor.js"></script>
    <script src="scripts/main.js"></script>
</body>
</html>
{% endhighlight %}

Container qui servira à recevoir le HTML généré par votre appli JS une fois exécutée.
De base, Google (et autres moteurs/crawler) ne verra donc rien, tout votre contenu allant être injecté via JS dans votre balise ng-view. 
Excepté le fait **qu’il parait** que depuis des mois/années, [Google commence à réellement crawler du JS](http://googlewebmastercentral.blogspot.fr/2014/05/understanding-web-pages-better.html) ... Si le site est important, cette supposition ne devrait pas suffire à vous convaincre, et vous avez raison.

Rassurez vous, à ce stade, des solutions existent pour fournir spécifiquement à Google une version correspondante aux snapshots HTML générés par vos applications.
Ces solutions sont accessibles soit en mode SAAS (payante et hébérgé), soit en mode Open-Source à héberger vous même. Je pense notamment à [Prerender.io](https://prerender.io/) qui fait plutôt bien le job, et vous propose d’indiquer aux moteurs que vous faites une application de type « Ajax » en respectant les recommandations de Google.

Prerender est composée de plusieurs briques :
Un middleware applicatif (Rails, Node, Varnish, Nginx, etc selon votre infrastructure), qui va intercepter les moteurs et les renvoyer sur votre service de Prerender 
Un service de Prerender qui est une brique Node.js qui va lancer des HeadLess Browser ([PhantomJS](http://phantomjs.org/) ou [SlimerJs](http://slimerjs.org/ ...)) pour executer votre appli JS et renvoyer un snapshot HTML une fois le rendu JS terminée.

La solution permet à priori de faire le boulot, mais cela reste une gymnastique complexe, et beaucoup d'interrogations subsistent (pertinence, maintenance, stabilité, Page Rank, pondération vs sites classique ...)

# La lumière au fond du tunnel ?

Vous l’avez donc compris, dans certains cas, les SPA basées sur des frameworks Js posent deux problèmes très gênants et difficilement résolvables.
C’est là qu’entre en piste, une nouvelle façon de penser les SPA, grace à une librairie développée par Facebook : [React.JS](http://facebook.github.io/react/)

React fait parlé de lui car il commence à être utilisé massivement par des très gros acteurs Web, Facebook bien entendu pour ses composants Chat, ou son [éditeur vidéo](http://facebook.com/lookback/edit), [Instagram](http://facebook.github.io/react/blog/2013/11/05/thinking-in-react.html) pour l’intégralité du site, [Yahoo Mail](http://www.slideshare.net/rmsguhan/react-meetup-mailonreact), [Github avec l’IDE Atom](http://blog.atom.io/2014/07/02/moving-atom-to-react.html), [Khan Academy](http://joelburget.com/backbone-to-react/), [NyTimes](http://www.nytimes.com/interactive/2014/02/02/fashion/red-carpet-project.html?_r=0), [Feed.ly](https://twitter.com/feedly/status/517163824206458880) ...

Au premier abord, React n’est qu’une librairie qu’on pourrait comparer à la partie Vue d’un Framework MVC (voir aux Directives d’Angular), mais il a la particularité d’être basé sur un Virtual DOM.
Ce qui parait au départ simplement une bonne idée pour avoir des performances bien supérieures à celle d’un framework MVC basé sur le DOM, et éviter par exemple les Dirty checking du DOM (qui explique en partie le manque de perf d’Angular), permet aussi d’utiliser ces mêmes composants coté serveur !

C’est ce qu’on appelle l’approche **« Isomorphic »** .

Un composant React n’est finalement qu’un module CommonJs et peut donc aussi bien être utilisé coté browser sur le client, que coté server dans du [Node.Js](http://nodejs.org/) (ou [IO.js](https://github.com/iojs/io.js/issues/28) devrais-je dire maintenant ?).
L’idée de l’isomorphisme est aussi d’être capable de servir le premier rendu directement par le serveur.
Exemple:

* Vous accéder à votresite.com/votrepage.html
* Votre serveur Node, construit votre page et sert le rendu HTML généré par votre appli au client
* Il sert aussi votre application JS dans un Bundle (généré via du [Gulp](http://gulpjs.com/) ou [Grunt](http://gruntjs.com/) par [WebPack](http://webpack.github.io/) ou [Browserify](http://browserify.org/))
* Le client reçoit un fichier statique et l’affiche (sans attendre le moindre JS)
* Il reçoit aussi le bundle Js
* Une fois affiché, React sait reprendre la main sur votre appli afin de continuer en mode SPA pour la suite de l’application.

Et là, vous répondez de manière parfaite aux deux points problématiques.
Google n’y verra que du feu, et pourra crawler votre site entièrement comme si il n’était composé que de fichier statique. 
La performance du premier rendu sera quasi imbattable, car ne nécessitant aucun JS !

Sur le papier, c’est juste le rêve ultime de tout développeur Front-end : tous les avantages d’une SPA sans les inconvénients !

*Facebook propose aussi sur son Github, une solution pour ceux ayant déjà un applicatif dans un autre language (ici PHP) : [Server side rendering](https://github.com/facebook/react/blob/master/examples/server-rendering/README.md)*

# La solution parfaite ?

Presque.
React n’est au final que la partie **Vue** de votre application, il va falloir encore organiser tout ça. C’est ici qu’entre en compte [Flux](https://facebook.github.io/flux/), un pattern d’architecture unidirectionnel proposé aussi par Facebook, à priori plus scalable que ne l’est le pattern MVC.

Mais là encore, l’approche de Flux est plutôt prometteuse, alors quel est le problème ? 

* Finalement c’est encore peu mature (déjà React et Flux, mais encore plus l’approche Isomorphic)
* La montée en compétence n’est pas négligeable
* Il n’y a pas vraiment de Framework comparable à date, et vous allez surement devoir ré-inviter la roue à certains moments (à suivre l’arrivée imminente de React Nexus notamment)
* La documentation est très faiblarde encore
* Les ressources très difficiles à trouver et de qualité très différente
* Pas vraiment de starter-kit ou générateur digne de ce nom
* Le coté Isomorphic va aussi engendrer une certaine complexité :
    * Est-ce que mon client reçoit bien le même état que celui qu’avait mon serveur au moment du rendu initial
    * Obligation de n’utiliser que des composants Isomorphic, typiquement un router qui fonctionne aussi bien coté client que serveur ([React-Router](https://github.com/rackt/react-router) ou [Director](https://github.com/flatiron/director)), même chose pour les requêtes HTTP ([Superagent](https://github.com/visionmedia/superagent) par exemple) ...

Si malgré ces points, vous souhaitez tester cette approche, je vous conseille de regarder du coté de Yahoo, qui après avoir annoncé la migration de Yahoo Mail de PHP/YUI vers React/Flux Isomorphic a aussi publié quelques packages Open-Source très intéressant, pouvant constituer une bonne base de départ pour un projet isomorphic :

* [Fluxible-App](https://github.com/yahoo/fluxible-app)
* [Flux-examples](https://github.com/yahoo/flux-examples)
* ou cet exemple utilisant Fluxible-app : [Isomorphic-React](https://github.com/alexaivars/isomorphic-react)

Si vous souhaitez plus d’infos sur React et Flux, je vous conseille ces deux articles en anglais de [@andrewray](https://twitter.com/andrewray): 

* [React for stupid people](http://blog.andrewray.me/reactjs-for-stupid-people/)
* [Flux for stupid people](http://blog.andrewray.me/flux-for-stupid-people/)

Ou ce tuto chez nos amis de Jolicode, pour [faire un Gifomatic avec React et Flux](http://jolicode.com/blog/flux-react-vers-un-nouveau-paradigme)

D'autres solutions existent aussi conservant la même approche, mais sur base d'autres technos, notamment celle d'Airbnb: [RendR](http://nerds.airbnb.com/weve-open-sourced-rendr-run-your-backbonejs-a/), permettant d'utiliser du [Backbone coté client et server](http://nerds.airbnb.com/weve-launched-our-first-nodejs-app-to-product/).

Et pour finir, si ces sujets vous passionnent tout comme nous, restez à l’écoute ici, d’autres posts pourraient arriver à l’avenir ;-)

