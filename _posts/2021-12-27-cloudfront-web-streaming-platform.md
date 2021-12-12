---
layout: post
title: "How AWS Cloudfront is helping us deliver our Web streaming platform ? "
description: "Feedback on the use of the AWS Cloudfront service for the deployment of high traffic web applications. Configuration example, best practices."
author:
    name: Antoine Caron
avatar:
email:
twitter: Slashgear_
github: Slashgear
category:
tags: [aws, cdn, node.js, react, javascript, frontend]
comments: true
image:
  feature: posts/2022-01-03-cloudfront-web-streaming-platform/hero.png
language: en
---

TODO article en construction 🏗️ en français, sera traduit quand il sera structuré.

## Context

Le web est une plateforme majeur pour la diffusion des contenus de nos clients à Bedrock.
Des millions d'utilusateurs s'y connectent chaque année afin d'y regarder leur live, leur replay ou bien directement les séries et films de leur choix.
La diffusion d'évenement sportifs tel que l'Euro de football 2020 représente un vrai challenge technique quand au maintient de la stabilité et de la performance d'une telle plateforme.

L'application web fonctionne aujourd'hui en mode SSR (Server Side Rendering).
Cela signifie qu'en prod aujourd'hui nous avons des server NodeJS Express qui tournent en prod afin de retourner des pages HTML prérendues coté server.
On a fait le choix du SSR il y a plusieurs années maintenant, pour deux besoins: la SEO et l'amélioration du temps de premier affichage sur des devices un peu lent.
En plus des pages HTML, la plateforme web c'est aussi une collection immense d'assets qui permettent au site web de fonctionner: des bundles Javascript, du CSS, des images, des manifests.

TODO => Afficher un graphe d'un pic de traffic important

Aujourd'hui nos clients ont des utilisateurs dans le monde entier, même si basés en Europe de l'ouest.
On peut principalement penser à nos utilisteurs français ultra marins qui ont accès à nos services.

**Pour répondre à ces problématiques, l'usage d'un CDN nous a semblé nécessaire.**

## What is a CDN then ?

CDN pour Content Delevery Network est un service permettant le déliverer du contenu à des utilisateurs à travers internet (ici nos pages HTML et nos assets).
Où que l'utilisateur soit dans le monde.
À tous les utilisateurs, même s'ils sont très nombreux.

Cloudfront est le service de CDN d'AWS. 
En mettant à disposition des très nombreux "Edges" dans le monde entier, il permet de fournir une réponse à un utilisateur au plus près de sa position.
Cela permet de réduire de manière très importante le time to first byte de nos réponses.

![Worldmap of AWS cloudfront edges](/images/posts/2022-01-03-cloudfront-web-streaming-platform/edges.png)

En étant à Lyon, il m'arrive d'avoir des réponses du Edge de Milan.
En effet, Milan est relativement bien plus près que Paris.

Noter qu'il est très facile de savoir quel edge cloudfront vous a répondu (configuration par défaut)
Chaque edge est identifiable par un code de trois lettres qui correspondent au code de l'aéroport international le plus proche (ici: CDG correspond à l'aéroport paris charles de gaulle)

```
x-amz-cf-pop: CDG50-C1
```

Délivrer du contenu au plus proche de l'utilisateur c'est top, ça permet théoriquement de réduire le temps d'attente.
Cela ne résoud par le souci de la charge.

La meilleure solution pour répondre à des problématiques de charge, c'est le cache.

> Tu mets 1 seconde de cache, c'est déjà gagné !
>
> [Y. Verry](https://twitter.com/yverry)


Le service Cloudfront permet de facilement mettre en cache des réponses au niveau des server edge.
Si on prend l'exemple de la diffusion d'evenement sportif, les utilisateurs arrivent très nombreux sur une temporalité très réduite.
Mettre du cache (dire à Cloudfront de mettre en cache page web) permet de soulager énormement nos servers node.

Mettre en cache des objets dans Cloudfront c'est également améliorer les temps de réponse.
Plus besoin d'attendre de nos servers, l'utilisateur reçoit directement l'objet mis en cache.
Cloudfront en profite même pour appliquer des algorithm de compression plus performant comme Brotli sur ces objets en cache.

Cloudfront permet en plus de faire du "Edge computing", exécuter du code directement dans les server edge au lieu de le faire dans nos applications.
Lambda at edge, Cloudfront function, Web Application Firewall, vous avez plusieurs feature très pratiques utiliser directement un service managé.

Enfin, par l'usage de regional Edge, les centaines de server edges finaux ne contactent pas votre origin (votre application) quand le cache est invalidé ou dépassé.

![regional edge usage with Cloudfront](/images/posts/2022-01-03-cloudfront-web-streaming-platform/regional.png)

Cette bonne gestion du cache par niveau nous a même permis de faire une invalidation totale du cache d'une distribution cloudfront quelques minutes avant le début d'un évenement sans pour autant générer un traffic monstre sur nos servers.

## Configuration used at Bedrock

Dire qu'on a mis en place quelques pattern d'usage de Cloudfront depuis la migration dans le cloud.
Dire qu'on en est content et que cela s'est montré très efficace lors d'events importants

### Static fallback

SSR to static si l'origin ne marche pas
Par URL
Cela donne une seconde chance à l'utilisateur
Facile à mettre en place

### Keeping previous assets

Certains utilisateurs rafraichissent peu leur session
On ne peut pas se permettre de faire des assets en 404 à chaque nouvelle version
Nécessité de garder ces vieux assets
Nettoyage automatique par lifecycle de bucket

### Major versions caching

Migration V4 => V5, expliquer qu'on voulait éviter le blink du passage d'une version à l'autre
Cache policy qui prend un cookie de featureFlipping
Paf ça marche super

### Cache hit rate tracking


Meilleur performance, 
plus grande stabilité, 
réduction des coûts très important
Le scaling se faire par les edge et plus par l'origin
Centaine de requetes par minutes même lors d'event majeurs


### Cloudfront log ingestion

Analyse SEO, suivi de metrics


## Conclusion

Très content de ce service qui fait le job.
Merci à Achraf Souk pour les bons conseils sur la mise en place de Cloudfront.
Ouvrir sur le fait qu'on utilise pas que Cloudfront mais également Fastly