---
layout: post
title: "Utilisation du StatsdBundle avec le composant Console"
description: "Adaptation du StatsdBundle pour le composant Console de Symfony"
author:
  name: Team Cytron
  avatar: cytron.png
  email:
  twitter: techM6Web
  facebook:
  github:
category:
tags: [statsd, php, symfony, console, monitoring, cytron]
image:
  feature: posts/cytron/console.png
  credit: tjahardie
  creditlink: https://www.flickr.com/photos/16762451@N04/
comments: true
---
## Le StatsdBundle

Chez M6Web, nous [utilisons StatsD]({% post_url 2014-01-28-how-we-use-statsd %}) et nous avons créé un [bundle](https://github.com/M6Web/StatsdBundle) pour cela.
Ce bundle permet d'ajouter facilement des incréments et des timings dans StatsD sur des événements Symfony2.

## De la Request à la console

Or pour des raisons de performances, lors des événements Symfony, les incréments et timings sont seulement stockés dans une variable et ne sont envoyés réellement à StatsD que pendant le `kernel.terminate` qui se déroule après l'envoi de la réponse HTTP au client.
Ceci pose un problème pour les événements lancés depuis une commande Symfony puisque en console, il n'y pas de `Request` et donc pas de `kernel.terminate`.
Nous avons envisagé d'utiliser l'événement `console.terminate` pour palier à cela, mais cela pose deux problèmes :

* pour une commande qui est censée tourner indéfiniment (par exemple un *consumer*), on ne veut pas attendre la fin de la commande pour envoyer les données,
* dans le cas d'une exception pendant la commande, l'événement `console.terminate` est lancé avant `console.exception`.

La première solution était donc d'appeler manuellement `$container->get('m6_statsd')->send()` dans la commande ou dans un `ConsoleExceptionListener` mais cela nous fait perdre le principal intérêt du StatsdBundle à savoir le découplage entre la commande et le client StatsD.

La seconde solution a donc été de modifier le StatsdBundle et d'ajouter une configuration au niveau de l'événement pour forcer l'envoi instantané des données.

Ainsi, avec la configuration suivante :

{% highlight yaml %}
clients:
    event:
        console.exception:
            increment:      mysite.command.<command.name>.exception
            immediate_send: true
        m6kernel.exception:
            increment: mysite.errors.<status_code>
{% endhighlight %}

L'incrément `mysite.command.<command.name>.exception` sera envoyé en temps réel, alors que les autres comme `mysite.errors.<status_code>` continueront à être envoyés pendant `kernel.terminate`.
