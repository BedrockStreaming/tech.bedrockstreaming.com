---
layout: post
title: "CR React Europe Conférence 2015 - Day 1"
description: "Compte rendu de la React Europe - Jour 1"
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
  feature: posts/reacteurope/reacteurope1.png
  credit: Fred V.
  creditlink: 
comments: true
---

Après la première conférence officielle sur React, que nous avons déjà couvert en janvier ([Jour 1](http://tech.m6web.fr/cr-react-conf-2015-day-one) et [Jour 2](http://tech.m6web.fr/cr-react-conf-2015-day-two)), nous nous sommes rendus les 2 et 3 juillet à Paris sous une chaleur infernale pour cette première édition de la [React Europe](https://www.react-europe.org/) avec l’envie de voir et de mesurer les évolutions autour de ReactJS.

# Keynote


Au départ, React c’était simplement le V de MVC. Maintenant, on parle de “View First” ou “ User interface First”. 

Christopher Chedeaux [@vjeux](https://twitter.com/vjeux), l’un des core-dev de React, va faire un focus sur 4 axes principaux : 

* Data 
* Language
* Packager
* Targets

### 1) Data

Depuis l’annonce de Flux ont fleuries beaucoup d’autres implémentations du pattern, notamment :

* [Mcfly](https://github.com/kenwheeler/mcfly)
* [Barracks](https://github.com/yoshuawuyts/barracks)
* [Reflux](https://github.com/spoike/refluxjs)
* [Fluxy](https://github.com/jmreidy/fluxy)
* [Fluxxor](http://fluxxor.com/documentation/flux.html)
* [Redux](https://github.com/gaearon/redux)

D'après Christopher, certaines vont mourir dans les prochains mois laissant seulement la place aux implémentations les plus pertinentes (et Redux a fait un buzz sans pareil lors de ces 2 jours, voir plus bas).

L’immuabilité revient aussi énormément en regardant du coté de [ClojureScript](https://github.com/clojure/clojurescript) ou [ImmutableJS](https://facebook.github.io/immutable-js/).

Coté Data fetching, cela commence à bouger pas mal avec : 
* Relay et GraphQL
* Falcon & JSON Graph
* Flux over the wire
* Om Next

Il reste encore les cotés Persistence et Temps réel qui ne sont pas traités dans l’écosystème de React.

### 2) Languages

Le langage JS a énormement évolué avec CoffeeScript, [jsTransform](https://github.com/facebook/jstransform) (utilisé chez facebook pour la gestion du jsx, "internalization pipeline", ...)

> “think of js as a compile target”

Il y a eu [Traceur](https://github.com/google/traceur-compiler) et [Recast](https://github.com/benjamn/recast), et désormais [Babel](http://babeljs.io) qui a tout ecrasé sur son passage. Facebook convertit en ce moment tout son code Front JS à Babel.

On retrouve aussi [ESLint](http://eslint.org/), un “linter” de code, et du typage de données avec [TypeScript](http://www.typescriptlang.org/) et [Flow](http://flowtype.org/).

### 3) Packager

Nous retrouvons Node.js, CommonJS, npm. 
Dans le browser : [Browserify](http://browserify.org/) et [Webpack](http://webpack.github.io/).
Même s'il y a encore du travail à faire pour avoir de bonnes performances, et ne pas attendre une compilation via les mises à jour incrémentales, ou [React Hot Loader](https://github.com/gaearon/react-hot-loader) sur lequel nous reviendrons.

### 4) Targets : 

Les cibles de React sont désormais multiples grace au Virtual DOM : 

* DOM
* SVG
* Canvas
* Terminal

Un focus est ensuite fait sur [React Native](https://facebook.github.io/react-native/), permettant de développer des apps natives sur iOS et Android tout en faisant du React. 

> “UX of a native app / DX of a web app”

Christopher insiste sur le terme DX qu’on ne voit jamais dans des slides tech, signifiant “Developper Experience”. 
Il compare aussi le développement de l’appli Ads de Facebook, réalisé avec React Native sur iOS (7 ingénieurs pendant 5 mois), et celui qui a suivi avec React Native Android avec les mêmes 7 ingénieurs durant seulement 3 mois en réutilisant 87% du code !

React Native Android sera open-sourcé au mois d’Août.

> “Learn once : write anywhere”

Un appel est fait pour stopper le “bashing” sur les autres frameworks. C’est en travaillant main dans la main entre les communautés Ember, Angular et React notamment que le web avancera.

![Prise de note dessiné de @chantastic](https://pbs.twimg.com/media/CI6if-EUAAAvJts.jpg:large)

<iframe width="560" height="315" src="https://www.youtube.com/embed/PAA9O4E1IM4" frameborder="0" allowfullscreen></iframe>

# Inline Styles: themes, media queries, contexts, and when it's best to use CSS

## Style are not CSS

Michael Chan [@chantastic](https://twitter.com/chantastic) va nous soumettre une “terrible” idée lors de cette conf qui va en faire crier plus d’un ! “It’s time to learn CSS” est une phrase d’une autre époque, Michael n’hésite d’ailleurs pas à qualifier cette idée de bullshit !

Citant Jeremy Ashkenas [@jashkenas](https://twitter.com/jashkenas), créateur de CoffeeScript et de Backbone.js, il soumet une nouvelle vision : unifier les 3 syntaxes (CSS, HTML et JS) qui permettent de déclarer le style d’une application web car contrairement à ce qu’on pense “le style n’est pas le CSS”.

Michael défend 2 autres axes importants dans React :

* les changements de l’état de l’application (piloté en JS via les “states” des composants) sont des changements de l’UI,
* les composants doivent être réutilisés comme partie entière et indépendante et ne doivent pas être détournés de leur vocation initiale, “je préfère avoir 1000 composants qui font 1 choses que 100 composants qui font 2 choses”.

## Style over the time

Michael reprend ensuite l’histoire des CSS. A l’origine, on déclarait les styles dans l’attribut HTML “style”. Puis, on s’est rendu compte de cette façon que le code était dupliqué, d’où l’introduction et la déclaration des classes CSS. Le web est devenu sémantique avec l’utilisation des balises &lt;h1&gt;,&lt;p&gt;, &lt;b&gt;, etc. séparant la présentation dans le HTML et le CSS. L’arrivée du web 2.0 a donné au JS le moyen d’intérargir avec le HTML pour diriger le comportement de l’application complétant la couche présentation HTML + CSS.

## Not coupled state

Avec le web interactif actuel, l’état de l’application est noyé entre ces 3 parties constituantes. Heureusement, React permet d’organiser la structure en faisant du “state” la partie centrale de l’application et le “markup”, confondu avec le JS, devient l’interface. Néanmoins, l’état de l’application est toujours couplé avec la présentation et le CSS. Grâce à l’exemple d’une todolist basique, Michael explique comment extraire le “state” des CSS (représenté par la classe “is-complete”) pour l’intégrer en inline dans le render du composant React. Le CSS devient uniquement une couche gérant l’apparence de l’application et les composants (donc le JS) gère intégralement leur état.

## No more CSS

Michael nous montre enfin comment aller plus loin en gérant variables de style, pseudo-classes et pseudo-elements en inline dans le composant, et sans trop de difficultés. La gestion des hovers et des media queries est beaucoup plus ardue et n’est clairement pas recommandé. L’utilisation d’une librairie comme [Radium](http://projects.formidablelabs.com/radium/) (mais il en existe d’autres) permet de surmonter cet obstacle et d’écrire du style inline très clairement. On aborde quelques conseils pour gérer au mieux les couleurs et le layout. Pour voir un exemple illustrant tous les concepts abordés par Michael, vous pouvez explorer son projet [React Soundplayer](http://labs.voronianski.com/react-soundplayer/).

Pour conclure sa conf, Michael cite Sandi Metz [@sandimetz](https://twitter.com/sandimetz), designeuse Ruby, défendant l’idée que l’objectif du design est de permettre de (re-)designer plus tard son application et donc de réduire les coûts du changement. Le composant React est l’interface, il se suffit à lui-même.

[Les slides sur SpeakerDeck](https://speakerdeck.com/chantastic/inline-styles-react-europe)

<iframe width="560" height="315" src="https://www.youtube.com/embed/ERB1TJBn32c" frameborder="0" allowfullscreen></iframe>

# Flux over the Wire

Elie Rotenberg [@elierotenberg](https://twitter.com/elierotenberg) introduit [Flux](https://facebook.github.io/flux/), le pattern créé par Facebook massivement utilisé avec React pour gérer le cycle de vie des données à l’intérieur de son application. Le fondement de Flux est de pouvoir partager les états de l’application (les “states”) de façon simple et scalable entre l’ensemble de ses composants car tous n’ont pas que des répercussions locales. 

Elie nous montre qu’on peut voir Flux comme un modèle symétrique : les composants React sont le miroir des stores (là où sont stockés les states de l’application) et les actions déclenchées par les composants sont le pendant des évènements de mise à jour des stores. Le pattern tourne donc autour de 4 méthodes “symétriques” : onUpdate/dispatch côté composant et onDisptach/update côté store. La nouveauté mise en exergue par Elie est de considérer que le flux entre les composants et les stores peut être implémenté par n’importe quel canal de communication : callbacks/promises par exemple mais aussi streams/EventEmitter et, plus étonnant, websockets. Ce dernier canal permettrait de partager l’état de son application entre plusieurs composants existants sur de multiples clients grâce aux stores qui persisteraient sur un serveur node distant. Elie donne l’exemple d’un chat fonctionnant sur ce principe.

Il présente ensuite les librairies qu’il a élaboré autour de ses idées :

* [nexus-flux](https://github.com/elierotenberg/nexus-flux) implémentant le pattern Flux de manière “classique”, notamment autour de l’EventEmitter,
* [nexus-flux-socket.io](https://github.com/elierotenberg/nexus-flux-socket.io), l’implémentation de Flux autour des websockets,
* [react-nexus](https://github.com/elierotenberg/react-nexus) une surcouche aux précédentes librairies permettant d’écouter les stores depuis les composants React en utilisant les decorators ES7,
* [react-nexus-chat](https://github.com/elierotenberg/react-nexus-chat), l’implémentation du chat donné en exemple.

Une des forces de sa librairie est la facilité à mettre en oeuvre l’asynchronisme des actions Flux côté serveur.

Enfin, on découvre l’utilisation réel de ces concepts chez Webedia :

* Utilisation de PostgreSQL, Redis et Varnish pour la tenue en charge,
* React Nexus est utilisé pour la gestion des commentaires et le système utilisateur de millenium.org,
* Une refonte complète de jeuxvideo.com est en cours avec React Nexus,
* Des modules React sont déjà présents sur d’autres sites de Webedia.

[Les slides sur SpeakerDeck](https://speakerdeck.com/elierotenberg/flux-over-the-wire-at-reacteurope-2015)

# React Native: Building Fluid User Experiences

Spencer Ahrens [@sahrens2012](https://twitter.com/sahrens2012) de chez Facebook nous présente une librairie, qui devrait être open sourcé sous peu pour gérer les animations dans React Native iOS : Animated.

{% highlight javascript %} 
var { Animated } = require(‘react-native’) 
{% endhighlight %}

Cette librairie devrait marcher directement sur React Native Android et arriver ensuite sur le web.
L’implémentation est 100% JS.
Nous avons suivi un live coding démo sur iOS d’une application sans animation au départ, consistant à enrichir l’expérience utilisateur en rajoutant des animations fluides via la librairie Animated.

[Le code des exemples](https://gist.github.com/sahrens/7609a4e8ffd1bbace51a) et [les slides](https://gist.github.com/sahrens/2e9b6a0caf4a66f7f1d1)

# Exploring GraphQL + Relay: An Application Framework For React 

![](https://pbs.twimg.com/media/CI7FFISUsAAAvK1.jpg:large)

Lee Byron [@leeb](https://twitter.com/leeb) a introduit GraphQL, une solution permettant de résoudre les problématiques d’accès aux données.
L’idée est de résoudre les problèmes de l'approche RESTful (qui entraîne beaucoup d’aller-retours avec le serveur) et l’approche FQL (variante de SQL permettant de limiter les aller-retours, mais très compliquée à maintenir).

GraphQL permet au client de définir très précisément les données qu’il souhaite obtenir via leur relations.

Le principe de base est que la structure de la requête permet de définir le format de la réponse. Ex :

{% highlight json %}
Query
{
  user(id: 4) {
    id,
    name,
    smallPic: profilePic(size: 64),
    bigPic: profilePic(size: 1024)
  }
}

Response
{
  "user": {
    "id": 4,
    "name": "Mark",
    "smallPic": "https://cdn.site.io/pic-4-64.jpg",
    "bigPic": "https://cdn.site.io/pic-4-1024.jpg"
  }
}
{% endhighlight %}

Le tout donne un code très facile à lire et à raisonner. Le serveur expose un schéma des données disponibles, ce qui permet : 

* au client de construire sa requête et de la valider
* de générer du code côté client à partir du schéma
* une bonne intégration dans les IDE (autocompletion)
* génération d’une API Doc

GraphQL ne s’occupe pas du stockage, c’est uniquement la couche de requêtage qui peut être implémentée avec votre code actuel.

GraphQL est utilisé depuis plus de 3 ans chez Facebook et sert à l’heure actuelle environ 260 milliards de requêtes par jour.

Lee Byron a annoncé lors de sa conférence la diffusion d’un “working draft” d’une [RFC GraphQL](facebook.github.io/graphql), ainsi qu’une [implémentation de référence en Javascript](https://github.com/graphql/graphql-js).

Suite à cette présentation de GraphQL, Joseph Savona introduit Relay, un framework proposé par Facebook qui permet de gérer côté client le data-fetching via GraphQL dans les applications React.
Le principe de Relay est que chaque composant définit ses propres dépendances en utilisant le langage de requête de GraphQL. Les données sont mises à disposition dans le composant dans `this.props` par Relay.

Le développeur fait ses composants React naturellement, et Relay s’occupe de composer les requêtes, permettant ainsi de fournir à chaque composant les données précises dont il a besoin (et pas plus), de mettre à jour les composants quand les données changent et de maintenir un store côté client (cache) avec toutes les données.

<iframe width="560" height="315" src="https://www.youtube.com/embed/WQLzZf34FJ8" frameborder="0" allowfullscreen></iframe>

# Don't Rewrite, React! 

![If you ever feel bad about yourself](https://s-media-cache-ak0.pinimg.com/736x/ca/d8/e0/cad8e05c8879918e17fd4d575dfed06e.jpg)

Ryan Florence [@ryanflorence](https://twitter.com/ryanflorence) nous propose de profiter de la réécriture de code d’application historique pour introduire de nouvelles technologies et outils.

Le problème avec les réécritures est que l’on est généralement obligé de le faire pour des morceaux assez important de l’application (en partant du haut de l’arbre fonctionnel de l’application). Cela peut bloquer la correction de bug sur le code historique, empêcher de faire quelques évolutions, obliger à maintenir des branches “à longue durée de vie”,...

Au lieu d’utiliser cette approche, de haut en bas, Ryan nous propose d’utiliser React en partant du bas de l’arbre, c’est à dire par une fonctionnalité unitaire très limitée.

React se prête parfaitement à ce type de travail puisque son design permet de l’utiliser dans un contexte isolé très facilement. Petit à petit, on arrive à remonter de plus en plus, en réécrivant des fonctionnalités de plus en plus importante, jusqu’à avoir réécrit l’application complète.


# Live React: Hot Reloading with Time Travel

![](https://pbs.twimg.com/media/CI7aqQAWUAA-i2x.jpg:large)

Dan Abramov [@dan_abramov](https://twitter.com/dan_abramov) nous présente son workflow React.
Il est notamment le créateur de [React Hot Loader](https://github.com/gaearon/react-hot-loader), et de [Redux](https://github.com/gaearon/redux), l’une des dernières implémentations de Flux jouissant déjà d’une très grande popularité.

L’un des messages a retenir de sa présentation est l’importance de travailler sur ses outils de développement afin d’avoir plus de temps a passer sur ses applications.

Quelques outils pour accélérer le workflow de développement : 

* [amok](http://amokjs.com/)
* [figwheel](https://github.com/bhauman/lein-figwheel)
* [livereactload](https://github.com/milankinen/livereactload)
* [React Hot Loader](https://github.com/gaearon/react-hot-loader)
* [webpack](webpack.github.io)

Nous faisons ensuite un focus sur son workflow autour de ces principaux outils :

* Redux
* Redux Dev Tools
* React Hot Loader
* webpack

React Hot Loader permet de rafraichir son application instantanément à chaque modification de code, et ce, sans refresh de page, uniquement en rafraichissement les composants ayant changés !
C’est très impressionnant en Live démo !

Rajouter à ca le Redux Dev Tools qui permet de suivre en temps réels les actions étant lancées, ainsi que l’état des states, de pouvoir revenir en arrière dans les actions “à la git”, mais aussi d’avoir un error handler très quali en live (inspiré j’imagine de la gestion d’erreur de React Native).

L’idée derrière Redux (son implémentation du pattern Flux) est de faire un Store immuable. On peut résumer une action à une fonction prenant en entrée un état du store et donnant en sortie un nouvel état du Store (sans toucher au premier). En partant de ce principe, appliquer une série d’actions revient simplement à effectuer une réduction (un “reduce”). 
On applique ici les principes d’[Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html).
L’immutabilité permet de stocker les différents états intermédiaires du store et donc de naviguer extrèmement facilement dans les différentes versions pendant le développement.

Plus d’infos ici : [The evolution of flux](https://medium.com/@dan_abramov/the-evolution-of-flux-frameworks-6c16ad26bb31)

> Reducer + Flux = Redux

<iframe width="560" height="315" src="https://www.youtube.com/embed/xsSnOQynTHs" frameborder="0" allowfullscreen></iframe>

# Back to Text UI

Mikhail Davydov [@azproduction](https://twitter.com/azproduction) a eu l’idée folle de créer une interface texte pour le terminal avec les outils web : HTML, CSS, JS et donc React.
C’est complétement fou, assez impressionnant, mais on se demande quand même pourquoi ?

[Voir les slides](http://azproduction.ru/talk-back-to-text-ui/)

# Lightning Talk

Pour finir la journée, nous avons eu le droit à quelques Lightning Talk de qualité inégale, abordant l’intégration de D3 avec React, de l’outil [Cosmos](https://github.com/skidding/cosmos) permettant de tester dans un browser ses composants React un par un, de [React Native Playground ](https://rnplay.org/), un bel outil pour tester facilement online dans un simulateur des applis ou exemple de code de React Native, et [Turbine](https://github.com/chute/tubrine) une sorte de remplacant de Relay en l’attendant ([voir cet article](https://medium.com/chute-engineering/turbine-a1f55d4b7d91)).

# Conclusion 

Excellente organisation (et on ne dit pas ca seulement pour les bières à volonté), un line-up du tonnerre et de belles annonces (React Native Android en Août, GraphQL etc).
C’est déjà avec plein d’idées et de pistes d’améliorations pour nos projets React que nous sortons de ce premier jour très complet.
