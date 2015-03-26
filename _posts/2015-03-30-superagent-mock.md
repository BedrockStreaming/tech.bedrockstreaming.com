---
layout: post
title: "Comment a-t-on bouchonné les développeurs backend ?"
description: "Présentation de la librairie superagent-mock, un plugin superagent open-source à utiliser pour mocker le retour de vos requêtes HTTP."
author:
  name: Team Cytron
  avatar: cytron.png
  email:
  twitter: techM6Web
  facebook:
  github:
category:
tags: [javascript, superagent, mock, isomorphic, cytron, open-source]
image:
  feature: posts/cytron/superagent-mock.jpg
  credit: Jeff R. Clow
  creditlink: https://www.flickr.com/photos/jeffclow/3503587957/
comments: true
permalink: comment-a-t-on-bouchonne-les-developpeurs-backend.html
---


At M6Web we are curretly working on a new version of a website, with two separated teams: 
- backend team providing data access throught APIs,
- we, the frontend team, building an [isomorphic][isomorphic]SPA application using [React.JS][react-website] and the [flux pattern][flux-website]
  
# Develop frontend before the APIs
  
We started the projet at the same time than the other backend team. At that time, we didn't have the web services needeed for our application. We looked for the best way to develop the application without waiting thoses webservices availables.
  
# Interface
  
Out technical choice for the SPA has been guided by a deep thinking about isomorphic applications. This approach, React, FLux and all the environment around, was at the time, totally unknown. 
  
The time allowed the backend team to describe the output of the API. With those informations, we writted fixtures files. The idea was having datas on a non existent web service.
  
# Superagent and superagent-mock
  
To request the API we use the [superagent][superagent] library, a Javascript HTTP client extensible easily. He's isopmorhic, so ha can be used serverd site or client side.
  
We developed [superagent-mock][superagent-mock], a superagent plugin dedicated to simulate HTTP request returning fixtures datas.
  
# application
  
Like superagent, superagent-mock can be installed via npm, et be used by server or client side libraries. You need first to add the ___ in your `package.json`.
  
{% highlight bash %}
npm install superagent-mock --save-dev
{% endhighlight %}  

Then, we create the configuration file. It's here, you will decide wich data will be mocked. Let's take for exemple a non existant API, the authors list on our technical blog : `http://tech.m6web.fr/api/authors`.

Here the structure of the file we need : 

{% highlight javascript %}
// ./config.js file
module.exports = [
  {
    pattern: 'http://tech.m6web.fr/api/authors',
    fixtures: './authors.js',
    callback: function (match, data) {
      return { body : data };
    }
];
{% endhighlight %}

> The `pattern` attribute should be a regular expression, in the case of a route which contains variable parameters (ie: `https://tech.m6web.fr/api/authors/(\\d+)`.
> The `fixtures` attribute represents the link to file associated to the `pattern`
> The `callback`attribute is two function arguments. `match`is the result of the regular expression and `data` the fixtures. `match` allow to use some call parameters (ie: the author id) to return relevant datas (ie: the autor in the fixture file).

Next, you have to create the fixture file using this syntax: 

{% highlight javascript %}
// ./authors.js file
module.exports = function () {
  return [
    {
      id: 1,
      name: "John Doe",
      description: "unidentified person"
    },
    ...
  ];
};
{% endhighlight %}

> js file exposing a function returning the mocked datas.

# what's next 


# even more !



Chez M6Web, nous travaillons actuellement sur la nouvelle version d’un site web pour lequel sont dédiées deux teams :

* l’équipe backend fournit l’accès aux données via des API sous Symfony2,
* nous, l’équipe frontend, développons une application SPA [isomorphe][isomorphic] utilisant [React.JS][react-website] et le [pattern Flux][flux-website].

# Développer le front avant les API...

Nous avons démarré le projet au même moment que l’équipe backend, donc sans avoir accès aux API qui nous fournissent les données nécessaires au fonctionnement de l’application. Nous nous sommes alors interrogé sur la meilleur façon de développer notre front sans dépendre des API tout en impactant un minimum le code cible.

# Le contrat d'interface

Le choix technique pour notre SPA a été guidé par [une réflexion poussée sur les app isomorphique][kenny-isomorphic-post]. Cette approche, React, Flux et tout l’environnement qui tourne autour nous étaient alors totalement inconnu. Nous avons eu une phase importante en amont pour poser les bases de l’architecture du site, démontrer la faisabilité du projet et documenter l’ensemble.

Ce petit délai a permis à l’équipe backend d’établir des contrats d’interface pour les principales routes de l’API. À partir de ces informations, plus ou moins précises, nous avons établi des fichiers de fixtures. L’idée était donc de retourner les données bouchonnées pour chaque appel à une route d’API non existante.

# Superagent et superagent-mock

Pour réaliser les requêtes aux API, nous utilisons la librairie [superagent][superagent], un client HTTP javascript facilement extensible. Il est isomorphe, c’est-à-dire qu’il fonctionne aussi bien sur un serveur node.js via npm que côté browser dans une application packagée via un bundler ([webpack][webpack], [browserify][browserify]).

Nous avons développé [superagent-mock][superagent-mock], un plugin pour superagent, dont le rôle est de simuler les appels HTTP lancés par superagent en retournant des données de fixtures en fonction de l’URL appelée.

# En pratique

Comme superagent, superagent-mock s’installe via npm et peut être utilisé sur des applications serveurs ou clientes (via un bundler). Tout d’abord, il faut rajouter la dépendance à la librairie dans son  `package.json`.

{% highlight bash %}
npm install superagent-mock --save-dev
{% endhighlight %}

Il faut ensuite créer le fichier de configuration. C’est ici que vous allez décider des routes à bouchonner. Prenons l’exemple d’une route qui n’existe pas et qui devra nous retourner la liste des auteurs du blog technique de M6Web : `http://tech.m6web.fr/api/authors`.

Voici la structure du fichier de configuration à mettre en place :

{% highlight javascript %}
// ./config.js file
module.exports = [
  {
    pattern: 'http://tech.m6web.fr/api/authors',
    fixtures: './authors.js',
    callback: function (match, data) {
      return { body : data };
    }
];
{% endhighlight %}

* L’attribut `pattern` peut être une expression régulière, dans le cas d’une route qui contiendrait des paramètres variables (ex : `https://tech.m6web.fr/api/authors/(\\d+)`).
* L’attribut `fixtures` représente le lien vers le fichier de fixtures ou une callback.
* L’attribut `callback` est une fonction à deux arguments. `match` est le résultat de la résolution de l’expression régulière et `data` correspond aux données retournées par les fixtures. `match` permet d’utiliser certains paramètres de l’appel (ex : l’id de l’auteur) pour retourner des données ciblées (ex : l’auteur dans le fichier de fixtures correspondant à cette id).

Ensuite, il faut créer le fichier de fixtures. C'est un fichier JS qui exporte une fonction retournant les données bouchonnées.

{% highlight javascript %}
// ./authors.js file
module.exports = function () {
  return [
    {
      id: 1,
      name: "John Doe",
      description: "unidentified person"
    },
    ...
  ];
};
{% endhighlight %}

Pour finir, au début du fichier JS appelé par node, il suffit de patcher [superagent][superagent] avec le plugin [superagent-mock][superagent-mock] de cette manière :

{% highlight javascript %}
// ./server.js file
var request = require('superagent');
var config = require('./config.js');
require('superagent-mock')(request, config);
{% endhighlight %}

Ces quelques lignes permettent de surcharger certaines méthodes de [superagent][superagent] pour lui appliquer la configuration et simuler les requêtes bouchonnées. Pour comprendre plus en détail le fonctionnement, [c’est par ici][superagent-mock-source].

# Et après ?

Avec cette astuce, vous pouvez développer votre front sans qu’aucune API en face ne soit accessible. C’est très pratique pour travailler en local, sans accès au net, ou pour rendre les tests fonctionnels de son application complètement indépendants d’un service tiers externe.

La partie délicate de cette approche intervient lorsque l’on câble son application avec la vraie API… et que l’on s’aperçoit que le contrat d’interface n’a pas été respecté ! Nous avons souvent des corrections à réaliser dans notre code lors de cette étape, mais les changements sont généralement mineurs et le gain de temps apporté par l’utilisation du bouchon en amont n’est pas remis en cause. La partie fastidieuse reste de maintenir ses fichiers de fixtures avec l’évolution de l’API, particulièrement nécessaire si on s’en sert dans ses tests fonctionnels.

# Toujours plus

Notre application forge elle-même l'URL des images récupérées via l'API : elle nous fournit un id et nous reconstituons l'URL finale grâce à un paramètre de configuration. Ce n'est pas REST compliant mais nous avons de bonnes raisons de le faire. Cette génération d'URL utilise la librairie [sprintf-js][sprintf-js]. Pour avoir une application complètement indépendante de toute requête externe, nous avons dû également bouchonner ces appels sur des images locales. Dans cette optique, nous avons développé [sprintf-mock][sprintf-mock] dont le mode de fonctionnement est étrangement similaire à celui de superagent-mock.

Les projets [superagent-mock][superagent-mock] et [sprintf-mock][sprintf-mock] sont open source. Très simple d’utilisation, ils nous permettent de paralléliser nos développements avec l’équipe backend et de rendre autonomes nos tests fonctionnels. Alors n’attendez plus la finalisation de vos API pour commencer vos développements front !


[react-website]: http://facebook.github.io/react/
[flux-website]: https://facebook.github.io/flux/
[isomorphic]: http://isomorphic.net/javascript
[superagent]: http://visionmedia.github.io/superagent/
[webpack]: http://webpack.github.io/
[browserify]: http://browserify.org/
[superagent-mock]: https://github.com/M6Web/superagent-mock
[superagent-mock-source]: https://github.com/M6Web/superagent-mock/blob/master/superagent-mock.js
[sprintf-js]: https://github.com/alexei/sprintf.js
[sprintf-mock]: https://github.com/M6Web/sprintf-mock
[kenny-isomorphic-post]: http://tech.m6web.fr/isomorphic-single-page-app-parfaite-react-flux/
