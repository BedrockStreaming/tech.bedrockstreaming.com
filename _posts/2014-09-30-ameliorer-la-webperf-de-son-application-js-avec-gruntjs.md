---
layout: post
title: "Améliorer la webperf de son application JS avec GruntJs"
description: "Comment automatiser les optimisations WebPerf sur son application AngularJS avec Grunt.Js"
author: kenny
category:
tags: [webperf, angular, grunt, performance]
thumbnail: "images/posts/webperf.jpg"
feature-img: "images/posts/webperf.jpg"
comments: true
---

L’un des principaux problèmes que nous rencontrons sur nos développement chez M6Web est la tenue en charge.
Quand elles sont liées à des sites à fort trafic ou à une émission télé ([#effetcapital](https://twitter.com/search?q=effetcapital&src=typd)), nos applications doivent être conçues pour supporter des pics de charge plus ou moins importants.

C’est une problématique qu’on croit souvent liée uniquement aux backends (scripts serveurs, bases de données etc), en oubliant souvent que le front-end est aussi, voir tout autant concerné.

C’est notamment le cas pour une "[Single Page Application](https://fr.wikipedia.org/wiki/Application_web_monopage)" [Angular.Js](https://angularjs.org/) que nous développons en ce moment.

L’objectif ici est d’avoir une application qui exécutera le moins de requêtes possible pour s’afficher, et qui ensuite sera quasiment autonome en ne faisant que le minimum de requêtes HTTP. Ceci afin de garantir, que lorsque quelqu’un charge l’application, l’expérience est quasi parfaite, même si entre temps, le CDN ou l'hébergement connaît une surcharge temporaire.

L’autre avantage de diminuer le nombre d’appels HTTP, c’est aussi de limiter l’impact de la latence réseau, encore plus imposante dans notre cas, car notre cible est majoritairement mobile.

Pour les applications "Client-Side", nous utilisons [Grunt.Js](https://gruntjs.com/) pour automatiser toutes les tâches de développement, build, déploiement … (Nul doute que la même chose existe avec [Gulp](https://gulpjs.com/) pour les plus Hipsters d’entre vous). Grunt regorge de plugins en tout genre pour automatiser énormément de choses coté WebPerf, commençons par le plus évident et le plus simple.

P.S : Je passe volontairement l’[installation/initialisation de Grunt](https://gruntjs.com/getting-started) ainsi que de ses plugins. Le web regorgeant de ressources là dessus.

### Minification HTML

Afin de gagner quelques octets, nous allons minifier (suppression des espaces, retours charriot, et commentaires HTML) notre code HTML généré.
Pour ceci, nous utilisons le plugin [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin).

{% highlight js %}
options: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeCommentsFromCDATA: true,
        removeOptionalTags: true,
        removeComments: true
      }
{% endhighlight %}

### Minification CSS

Même chose au niveau des feuilles de styles avec [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin).

### Compression des images

Afin d’éviter d’avoir des images « brutes » de taille trop importante, on utilise [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) pour compresser au build nos différentes images, afin de gagner quelques ko toujours précieux.

### Inlining des images d’interface

Dans notre cas, où nous souhaitons réduire le nombre de requêtes HTTP superflues, nous avons opté pour l’inlining des images dites d’interface (boutons d’actions, picto etc).

Nous utilisons aussi le pré-compilateur CSS [Less](https://lesscss.org/), par simplicité et pour éviter le [DRY](https://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas) CSS.
Nous avons donc un premier fichier `.less` qui va contenir toutes les images d’interface sous cette forme :
`@facelessImg: url('images/faceless.jpg’);`

Le plugin Grunt [grunt-css-url-embed](https://github.com/mihhail-lapushkin/grunt-css-url-embed) sera configuré pour remplacer les urls présentes dans ce fichier par la version data-uri (=source de l’image encodée en base64).
Il est important de se concentrer uniquement sur les images « d’interface », car le poids des images sera ici augmenté d’environ 30% (à cause du base64).

Dans notre CSS principale, on pourra ensuite mettre cette image en background d’une classe CSS :

{% highlight css %}
.faceless {
  background-image: @facelessImg;
}
{% endhighlight %}
 
Et dans notre code HTML, on pourra placer l’image de la manière suivante :
`<span class="faceless"></span>`

Grâce à cet ajout, nous économiserons une requête HTTP pour chacune des images.

### Versionning des assets

Une autre bonne pratique est de versionner les assets en production. Cela signifie, donner un nom unique à chaque fichier statique (JS, CSS, image), ne changeant pas, tant que le fichier en question n’aura pas subi de modification, dans le but de pouvoir mettre un cache navigateur (Expire) et un cache CDN/Proxy Cache le plus long possible (Cache-control).
Nous passerons de `/images/info.jpg` à `/images/a21992d7.info.jpg` par exemple.

Nous utilisons ici le plugin [grunt-rev](https://github.com/cbas/grunt-rev) (en combinaison avec [grunt-usemin](https://github.com/yeoman/grunt-usemin)), qui va d’abord versionner les assets ayant changés, et ensuite, mettre à jour les références vers les fichiers en question dans tous vos fichiers HTML, CSS, JS.

### Concaténation des fichiers JS

Directement dans le code HTML, toujours avec le plugin [grunt-usemin](https://github.com/yeoman/grunt-usemin), vous allez pouvoir mettre des commentaires HTML pour définir quels ensembles de fichiers devront être concaténés.
La bonne pratique est d’avoir un fichier app.js avec son code maison, un fichier vendor.js avec les librairies tierces, et potentiellement un fichier de config.js
Etant donné que dans notre cas, 99% du poids Js est concentré dans "Vendor", nous avons décidé de concaténer l’ensemble dans un seul fichier.

{% highlight html %}
<!-- build:js(.tmp) scripts/risingstar.js -->
  <script src="bower_components/jquery/dist/jquery.js"></script>
  <script src="bower_components/angular/angular.js"></script>
  <script src="config.js"></script>
  <script src="app.js"></script> 
….
<!-- endbuild —>
{% endhighlight %}


### Inlining des templates

Pour finir, vous aurez peut-être remarqué, si vous développez des SPA avec Angular, ou un autre framework moderne, un changement de route (ou d’état) de votre application (ou l’affichage d’une directive) va impliquer des appels XHR pour charger les nouveaux templates à afficher. La bonne pratique ici étant de découper au maximum tous les templates dans des fichiers distincts.
Cela ne pose pas de problème en temps normal, mais dans notre cas, cela ne respecte pas nos ambitions de départ.

Angular a la particularité de permettre d’utiliser la balise script pour charger des templates :
{% highlight html %}
<script type="text/ng-template" id="views/info.html">Code HTML du template</script>
{% endhighlight %}

Si votre routeur ou une directive demande un template, avant de vérifier si le fichier existe, Angular vérifiera si une balise `<script type=’text/ng-template’>` a été déclarée avec l’identifiant correspondant au chemin demandé.

Grunt via le plugin [grunt-angular-inline-templates](https://github.com/wmluke/grunt-inline-angular-templates), nous permet d’automatiser cette tâche au build, afin de regrouper dans le index.html du build, tous les templates dans un script avec l’id correspondant au chemin du fichier html original. De cette manière, nous n’avons plus aucun appel HTTP à faire pendant toute l’utilisation de l’application.
Attention toutefois, cela signifie que le poids du fichier HTML original va forcément augmenter.


### Conclusion

Comme vous avez pu le voir, nous avons grandement optimisé notre application, en utilisant simplement des plugins Grunt à notre disposition. Nous travaillons donc sur un espace de développement respectant toutes les bonnes pratiques (découpages des fichiers JS, CSS, HTML au maximum, code commenté …) et toutes les opérations d’optimisation sont automatiquement effectuées au build, fait avant chaque déploiement.

Attention, cela signifie aussi que votre projet en production devient relativement différent de celui que vous testé en développement. Il devient donc important de mettre en place des tests fonctionnels sur le build de production (avec [Protractor](https://tech.bedrockstreaming.com/tests-e2e-application-angularjs-protractor) par exemple, ou même [Behat](https://docs.behat.org/en/latest/)), et de tester régulièrement la bonne génération et le bon fonctionnement du build de prod.
