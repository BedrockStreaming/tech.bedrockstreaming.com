---
layout: post
title: "Surcharger un provider angular"
description: "Surcharger un provider angular"
author:
  name: Team Cytron
  avatar: cytron.png
  email:
  twitter: techM6Web
  facebook:
  github:
category:
tags: [angular, cytron]
image:
  feature:
  credit:
  creditlink:
comments: true
---
## Surcharger un provider angular

Nous avons eu besoin de surcharger un provider angular – [AnalyticsProvider](https://github.com/revolunet/angular-google-analytics) – pour le rendre configurable dynamiquement – à partir de `$route` qui n'est pas disponible dans la phase de configuration d'angular.

Le but est donc de changer la méthode `$get` de ce provider afin de lui ajouter notre dépendance et ainsi finir notre configuration.

Il existe bien une méthode [`decorator()`](https://docs.angularjs.org/api/auto/service/$provide#decorator) dans le service d'injection de dependance d'angular, mais celle-ci ne permet que de décorer des service et non pas leurs providers.

Nous allons donc mettre les mains dans l'`$injector` pour récupérer et modifier à la volée le provider :

{% highlight js %}
angular.module('myModule')
  .config(function ($injector) {
    var AnalyticsProvider = $injector.get('AnalyticsProvider');
    var $get              = AnalyticsProvider.$get;
    // ...
  });
{% endhighlight %}

Maintenant que nous avons le `$get`, il faut le modifier pour ajouter notre dépendance. Et c'est assez simple vu qu'il utilise l'annotation sous forme de tableau :

{% highlight js %}
// https://github.com/revolunet/angular-google-analytics/blob/e821407fe0436677cb42eafd5b338d767990b723/src/angular-google-analytics.js#L99
this.$get = ['$document', '$rootScope', '$location', '$window', function($document, $rootScope, $location, $window) {
{% endhighlight %}

Il faut donc modifier ce tableau en ajoutant nos dépendances et en remplaçant la fonction :

{% highlight js %}
// la fonction d'origine est le dernier élément du tableau
var origFn = $get[$get.length - 1];
// on la remplace par notre dépendance
$get[$get.length - 1] = '$route';
// on ajoute notre nouvelle fonction à la fin du tableau
$get[$get.length] = function () {
    // $route est le dernier argument
    var $route = arguments[arguments.length - 1];
    // on fait notre traitement
    AnalyticsProvider.setAccount($route.current.params.partner ? 'partner-account' : 'own-account');
    // et qui rappelle la fonction originale
    return origFn.apply(AnalyticsProvider, arguments);
};
{% endhighlight %}

On peut noter l'utilisation de [`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) qui permet de rester générique et de garder la compatibilité en cas de changement des dépendances du module surchargé.

