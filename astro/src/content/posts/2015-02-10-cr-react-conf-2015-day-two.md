---
layout: ../../layouts/post.astro
title: "CR React Conférence 2015 - Day 2"
description: "Compte rendu de la conférence React - Facebook HQ - Menlo Park - Day 2"
author: k_dits
category:
tags: [javascript, react, flux, isomorphic, conference]
feature-img: "../../../../images/posts/reactconf/reactconf.png"
thumbnail: "../../../../images/posts/reactconf/reactconf.png"
comments: true
---

De retour à Menlo Park pour cette deuxième journée de la React conférence.

# Keynote React Native

Christopher Chedeau, [@vjeux](https://twitter.com/vjeux/), revient sur les origines de React Native et les raisons pour lesquelles ils ont décidé de le créer.

Les 3 piliers d’une appli natives qu’ils ont dûs traiter pour React Native sont :

 - Touch Handling : la vraie différence entre appli native et web
 - Native Components : tout le monde essaye de s’en rapprocher mais personne n’y arrive, et il y a déjà beaucoup de très bons composants natifs
 - Style & Layout : le layout impacte énormément la façon dont on code, que l’on soit sur le Web, iOS ou Android

Nous voyons que chaque composant natif a été recréé comme un composant React : `<View>`, `<Text>` …, et Christopher explique comment un composant React est transformé en composant natif iOS.

La transformation du JS en natif se fait via JSCore (le moteur JS dans iOS).

Une démonstration nous prouve qu’on peut utiliser la console Dev Tools de Chrome, pour débugger l’application et voir tout le code « DOM » React, comme si nous faisions du web classique.

La dernière partie explique l’approche des équipes de Facebook sur la manière de faire du CSS. Christopher avait déjà fait hurler pas mal de personnes lors de sa conférence "faire du CSS en JS" ([React CSS in JS](https://speakerdeck.com/vjeux/react-css-in-js)). Il déclare le style en javascript dans une variable `styles`, et utilise l’attribut style : `<Text style={styles.movieYear}>` qui inlinera le CSS.

C’est assez déstabilisant mais aussi ultra prometteur. Cela permet de résoudre quasiment tous les défauts de CSS (Global Namespace, Dependencies, Dead Code Elimination, Minification, Isolation …)

Nous parcourons ensuite les manières de gérer du layout nativement dans iOS, que Christophe décrit comme « ultra-compliqué » ! Alors que coté web, nous avons le Box Model et [Flexbox](https://www.w3.org/TR/css3-flexbox/) qui résolvent tous ces problèmes assez facilement.

Les équipes de Facebook ont donc décidé de re-coder Flexbox et le Box Model en JS avec une approche TDD, de manière à pouvoir utiliser la plupart des bases de Flexbox dans React Native pour faire du layout facilement sur iOS ! 

Vous pouvez retrouver le résultat « [Css-Layout](https://github.com/facebook/css-layout) » sur le Github de Facebook.

La démonstration continue sur un « live coding » montrant le « live reload » entre la modification du JS et le rafraîchissement instantané du Simulator iOS. 

Nous apprenons aussi que les modules ES6 ou Node comme [Underscore](https://underscorejs.org/), ou le SDK de [Parse](https://parse.com/) par exemple, fonctionneront sans problème du moment qu’ils n’ont pas de dépendance dans le browser ! 
C’est encore une fois très prometteur, et si React Native vous intéresse, la vidéo ci-dessous est une excellente introduction.

J’ai, de mon coté, pu jouer quelques heures avec et c’est effectivement très sympa, intuitif et très rapide.
La version que nous avons ne contient pas encore tout ce que l’on voit dans la vidéo (je n’ai par exemple pas trouvé le Live Reload ou le Remote Debugging pour l’instant), mais cela ne saurait tarder, les équipes de Facebook travaillant d’arrache-pied sur le projet.

<iframe width="720" height="405" src="https://www.youtube.com/embed/7rDsRXj9-cU" frameborder="0" allowfullscreen></iframe>

# The complementarity of React and Web Components

Andrew Rota, [@AndrewRota](https://twitter.com/andrewrota), est de Boston, travaille pour [Wayfair.com](https://www.wayfair.com/) et explique comment utiliser des Web Components avec React, ou du React dans des Web Components.
Il nous montre un exemple d’un player html5 vidéo avec un shadow dom qui contient tous les contrôles du player (de simple input HTML).

La communauté WebComponent a déjà partagé pas mal de WebComponents : 

 - [les x-](https://www.x-tags.org/)
 - [les core-](https://www.polymer-project.org/docs/elements/core-elements.html#core-a11y-keys)
 - [google-](https://github.com/GoogleWebComponents)
 - [paper-](https://www.polymer-project.org/docs/elements/paper-elements.html#paper-button)
 - et d’autres …

Pour conclure, Andrew partage les bonnes pratique pour créer un WebComponent : 

petit
très encapsulé
aussi stateless que possible
performant

Pour en savoir plus sur les Web Components : [Polymer-Project](https://www.polymer-project.org/)

<iframe width="720" height="405" src="https://www.youtube.com/embed/g0TD0efcwVg" frameborder="0" allowfullscreen></iframe>

# Immutable Data and React

Lee Byron, [@leeb](https://twitter.com/leeb), enchaîne sur l’immuabilité !
Concept passionnant que nous avons entendu dans presque l’intégralité des conférences.

> Un objet immuable, en programmation orientée objet et fonctionnelle, est un objet dont l'état ne peut pas être modifié après sa création. Ce concept est à contraster avec celui d'objet variable. Source : [Wikipédia](https://fr.wikipedia.org/wiki/Objet_immuable)

Lee Byron est donc le créateur de la librairie [Immutable-JS](https://facebook.github.io/immutable-js/) permettant de gérer facilement des collections immuable en JS.

> Immutable data cannot be changed once created, leading to much simpler application development, no defensive copying, and enabling advanced memoization and change detection techniques with simple logic. Persistent data presents a mutative API which does not update the data in-place, but instead always yields new updated data. Source : [immutable-js](https://facebook.github.io/immutable-js/)

> React is the V in MVC. We don't need an M. We already have arrays and objects.

D’ailleurs, on parle aussi d’objets immuables coté Angular 2 : [Change Detection in Angular 2](https://victorsavkin.com/post/110170125256/change-detection-in-angular-2)

<iframe width="720" height="405" src="https://www.youtube.com/embed/I7IdS-PbEgI" frameborder="0" allowfullscreen></iframe>

# Beyond the DOM: How Netflix plans to enhance your television experience

L’une des conférences que j’attendais le plus, par Jafar Husain, [@jhusain](https://twitter.com/jhusain), Technical Lead chez Netflix.
Pour plusieurs raisons, déjà parce que Netflix … qui en a profité pour annoncer la veille que « Netflix aimait React » mais aussi parce que Jafar est connu pour pas mal de choses (différents blog posts ou présentations), ainsi qu’un [cours interactif sur la programmation fonctionnelle en Javascript](https://jhusain.github.io/learnrx/) sur lequel j’ai passé pas mal de temps.

Il nous a donc expliqué les plans de Netflix pour améliorer l’expérience Télé sur leurs services, et comment React les a grandement aidés à le faire.

Pour connaître les raisons pour lesquels ils ont choisi React, je vous invite à lire l’article [Netflix like React](https://techblog.netflix.com/2015/01/netflix-likes-react.html) (Startup Speed et [Server Side Rendering](/2014/12/04/isomorphic-single-page-app-parfaite-react-flux) \o/, Runtime Performance, Modularity).

Aujourd’hui, Netflix développe majoritairement en Javascript et ont 3 UI en JS, une pour le mobile, une pour le web et une pour les télés.
Ils ont vu assez vite que le DOM était très loin, c’est pourquoi ils ont créé et introduit Gibbon (une sorte de Webkit maison plus rapide et adapté à leur besoin sur les téléviseurs).
Ils ont donc fait évoluer React (un fork au départ) pour permettre de sortir vers quelque chose d’autres que du DOM afin de correspondre à leur moteur Gibbon et vont donc continuer en 2015 le déploiement de leur nouvelle UI avec React sur tous les services y compris télés.

Vous pouvez retrouver le [Netflix Open Source Software Center](https://netflix.github.io/) pour découvrir le grand nombre d’outils Open source de qualité qu’ils délivrent.

<iframe width="720" height="405" src="https://www.youtube.com/embed/eNC0mRYGWgc" frameborder="0" allowfullscreen></iframe>

# Scalable Data Visualization

Zach Nation travaille chez [Dato](https://dato.com/products/create/open_source.html) (anciennement GraphLab) et doit traiter de très grandes quantités de données dans ses applications.

Il démontre l’intérêt de React couplée à [d3.js](https://d3js.org/) (une librairie de visualisation exceptionnelle) pour représenter à l’écran des transactions Bitcoin (en parsant un fichier de 21G ! en live).

<iframe width="720" height="405" src="https://www.youtube.com/embed/2ii1lEkIv1s" frameborder="0" allowfullscreen></iframe>

# Refracting React

Talk par David Nolen, [@swannodette](https://twitter.com/swannodette), personne très influente dans la communauté JS ([son blog](https://swannodette.github.io/)). Créateur de [Om](https://github.com/omcljs/om), [ClojureScript](https://github.com/clojure/clojurescript), il nous explique que React doit être vue comme une plateforme (plutôt que librairie ou framework). On apprend aussi les concepts à l’origine d’Om.

<iframe width="720" height="405" src="https://www.youtube.com/embed/5hGHdETNteE" frameborder="0" allowfullscreen></iframe>

# Flux Panel

Bill Fisher (Facebook) a rassemblé une partie des utilisateurs (voir des contributeurs) à React pour confronter les différentes approches sur l’utilisation de Flux, ainsi que sur la manière de gérer de l’isomorphisme.

On parle notamment, via Michael Ridgway, [@theridgway](https://twitter.com/theridgway), de [Fluxible](https://www.fluxible.io), la librairie open source proposée par Yahoo (que nous utilisons), qui a annoncé le jour même la création de sa [documentation en ligne isomorphique](https://www.fluxible.io), elle-même [open source](https://github.com/yahoo/fluxible.io) et utilisant Fluxible.

Spike Brehm est aussi intervenu pour AirBnb, qui fut la première société, je pense, à parler d’[isomorphisme](https://nerds.airbnb.com/isomorphic-javascript-future-web-apps/).

Andres Suarez a aussi présenté la manière de gérer l’isomorphisme chez Soundcloud. Vous pouvez avoir beaucoup plus d’infos de sa part dans cette [excellente vidéo](https://vimeo.com/108488724).

Si vous êtes intéressés par les différentes approches de Flux, vous pouvez comparez ici les implémentations : [Flux Comparison](https://github.com/voronianski/flux-comparison)

Quelques questions sont aussi posées à Jing Chen sur Relay.

L’approche était intéressante mais le résultat un peu décevant car les sujets et implémentations ne sont que trop peu effleurés.

<iframe width="720" height="405" src="https://www.youtube.com/embed/LTj4O7WJJ98" frameborder="0" allowfullscreen></iframe>

# Codecademy's approach to component communication

Bonnie Eisenman, [@brindelle](https://twitter.com/brindelle), travaille pour [CodeAcademy](https://www.codecademy.com/?locale_code=fr).
CodeAcademy est un service gratuit du secteur éducatif permettant d’apprendre à coder dans certains langages.

Bonnie a partagé la manière dont son équipe a appréhendé React, et notamment la communication entre composant. Ces réflexions ont eu lieu avant qu’ils n’aient connaissance du pattern Flux.

[Les slides](https://docs.google.com/presentation/d/1b7sZOqBuTnTTKP7Rk1xgbMspCsFZBR2mzsHUF7Zd62g/edit)

<iframe width="720" height="405" src="https://www.youtube.com/embed/ZM6wXoFTY3o" frameborder="0" allowfullscreen></iframe>

# Static typing with Flow and TypeScript

James Brantly, de chez [AssureSign](https://www.assuresign.com/), commence avec une citation vu le matin (merci le JetLag) sur twitter :

<blockquote class="twitter-tweet" lang="fr"><p>On the 1st day God created the web. On the 2nd day God wrote jQuery. Then God blacked out, 3 days later awoke &amp; invented React. <a href="https://twitter.com/hashtag/reactjsconf?src=hash">#reactjsconf</a></p>&mdash; Matt Huebert (@mhuebert) <a href="https://twitter.com/mhuebert/status/560823099055407105">29 Janvier 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Il présente ensuite [TypeScript](https://www.typescriptlang.org/) et [Flow](https://flowtype.org/), deux outils pour améliorer et sécuriser la production de code.

En partant d’une application React d’exemple, il nous montre comment on intégre TypeScript et comment il l’a “hacké” pour qu’il reconnaisse le JSX, puis comment il ajoute Flow.

Au final il recommande d’utiliser plutôt Flow, même si TypeScript est un peu plus mature, et fonctionne lui sous Windows.

<iframe width="720" height="405" src="https://www.youtube.com/embed/9PTa9-PPVAc" frameborder="0" allowfullscreen></iframe>

# QA with the team

Les deux journées se sont finies sur une session de Questions/Réponses avec les équipes de React chez Facebook : Tom Occhino, Ben Alpert, Lee Byron, Christopher Chedeau, Sebastian Markbåge, Jing Chen, et Dan Schafer.

<iframe width="720" height="405" src="https://www.youtube.com/embed/EPpkboSKvPI" frameborder="0" allowfullscreen></iframe>

# Conclusion

Pour une première conférence officielle sur React, ce fut une excellente surprise ! On retiendra clairement l’annonce et les démos de React Native, l’emballement général autour de React, ainsi que l’approbation global de beaucoup de gros acteurs du web (Yahoo, [Mozilla](https://blog.mozilla.org/standard8/2015/02/09/firefox-hello-desktop-behind-the-scenes-flux-and-react/), Netflix, Uber, …), le succès du pattern Flux (malgré le manque de clarté sur la manière de faire du Data Fetching), les promesses de Relay, les sujets récurrents autour de l’immuabilité …

Bref, une vraie belle réussite. Chapeau aux organisateurs (merci [@vjeux](https://twitter.com/vjeux) ;-) ) et équipes de Facebook, ainsi qu’aux speakers pour cette superbe conférence.

Il se passe réellement quelque chose de grand dans la communauté Front-End grâce à React. Il suffit de voir la vitesse à laquelle les tickets d’entrée sont partis (même chose au React Meetup parisien de Décembre 2014), de voir que tous les frameworks MVC tentent de s’en inspirer (pré-render, SSR, Virtual-Dom …).

Pour finir, je voulais aussi partager le travail d’une des personnes présentes lors de cette conférence, ayant une façon très particulière de prendre des notes sur chacun des talks : [https://chantastic.io/2015-reactjs-conf/](https://chantastic.io/2015-reactjs-conf/)

p.s: Retrouvez les [retours sur la première journée de la React conférence 2015](/2015/02/04/cr-react-conf-2015-day-one).

Enjoy !
