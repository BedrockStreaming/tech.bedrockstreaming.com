---
layout: ../../../../../layouts/post.astro
title: "PHP Tour Montpellier 2018"
description: "Nos retours du PHP Tour à Montpellier, les 17 et 18 mai 2018"
author: Guillaume Bouyge, Valentin Claras, Fabien De Saint Pern, Francois-Xavier Gaberan, Héléna Hiraux, Pascal Martin


  
  
  
category:
tags: [phptour, php, afup, 2018]
feature-img: "./team.jpg"
comments: true
language: fr
---

Cette année encore, M6Web a sponsorisé le [PHP Tour, organisé cette année par l'AFUP à Montpellier](https://event.afup.org/en/phptourmontpellier2018/).
Nous étions donc nombreux pour assister à l’ensemble des conférences. Comme d’habitude avec l’AFUP, les conférences étaient de bonne qualité, et il y en avait pour tous : débutants comme utilisateurs avancés.

Pour la première fois, les conférences étaient données dans un cinéma Gaumont. Un très bon choix en termes de configuration : visibilité, confort, son et lumière !

En attendant la mise en ligne des vidéos, nous remercions les conférencières et les conférenciers pour leurs présentations. Vous trouverez ci-dessous quelques mots sur les conférences que nous avons particulièrement appréciées.


### “Tirer le maximum du moteur PHP7”

Conférence donnée par [Nicolas Grekas](https://twitter.com/nicolasgrekas).

L’approche de Nicolas était très intéressante et nous à permis de mieux comprendre le fonctionnement interne de Symfony, en lien avec les optimisations apportées par le nouveau moteur de PHP7.

Les exemples cités nous ont permis de voir qu’avec quelques “tips”, il est possible de “bypasser” des étapes coûteuses lors de l'exécution de notre code.


### “100% asynchrone - 0% callback en PHP”

Une présentation de [Joel Wurtz](https://twitter.com/joelwurtz).

Cette conférence nous a permis d'aborder un sujet assez peu connu dans l'univers PHP : l'asynchrone.

Dès qu'un projet commence à être complexe, il est souvent possible de réaliser des tâches en parallèle, non bloquantes, permettant d'optimiser les temps de réponse.

Pour répondre à ce besoin, Joel nous a présenté le concept de l'asynchrone : `l'event loop`.
Via cette boucle, Joel nous a expliqué comment les évènements sont "dispatchés" au travers de [générateurs](https://php.net/manual/en/language.generators.overview.php).

Pour aller plus loin, Joel nous a aussi parlé des outils existants qui implémentent cette logique d'event loop : [AMP](https://github.com/amphp/amp).

Enfin pour terminer, pour être 0% callback, Joel nous a présenté [Fiber](https://github.com/fiberphp/fiber-ext). Cette extension implémente [la RFC Fiber](https://wiki.php.net/rfc/fiber) actuellement en cours d'homologation.

Nous vous recommandons de creuser ce sujet, qui selons nous, ouvre de belles perspectives dans l'univers PHP !


### “Bienvenue dans la matrice !”

Cette conférence était animée par [Benoit Jacquemont](https://twitter.com/@bjacquemont).

Aujourd'hui encore, les développeurs ont trop peu de connaissance sur ce qu’il se passe à bas niveau sur nos serveurs.

Cette conférence, qui présentait notamment `strace` (pour suivre les appels système) et `ltrace` (pour suivre les appels aux fonctions de bibliothèques), était donc particulièrement rafraîchissante. La démo “comment voir les requêtes et réponse en HTTPS, en clair”, était complètement bluffante !


### "Sans documentation, la fonctionnalité n'existe pas !"

Ce talk était proposé par [Sarah Haïm-Lubczanski](https://twitter.com/sarahhaim).

Tout le monde, dans sa vie de développeur, a été confronté au problème suivant : écrire la documentation des fonctionnalités développées. 
C'est un challenge auquel nous nous sommes nous-même confrontés lorsque nous avons travaillé, l'année dernière, sur [l'internationalisation de notre plate-forme](/6play/6play-goes-international/), puisque nous avons dû documenter nos API, désormais appelées par des collègues basés dans d'autres pays.

Sarah nous a montré comment faire face à cette barrière souvent perçue comme insurmontable par bon nombre d’entre nous.
Elle nous a pour cela donné les clés et les bonnes pratiques pour créer, maintenir et rédiger une documentation cohérente.

On retiendra aussi la présentation des différents [outils open source de gestion de documentation](https://www.staticgen.com/).


### "A la découverte du Workflow”

Conférence animée par [Gregoire Pineau](https://twitter.com/lyrixx).

Cette conférence a retenu notre attention. Particulièrement bien faite, elle résume les fonctionnalités de ce nouveau composant de Symfony, en partant d'un workflow simple jusqu’au réseau de Pétri. Grégoire donnait des exemples d’utilisations concrètes.

Difficile à résumer, je vous invite à consulter la [documentation Symfony sur ce composant](https://symfony.com/doc/current/components/workflow.html).


### Mais encore ?

De plus, trois conférences ont attiré notre attention de par leur valeur pédagogique. Elles étaient à nos yeux particulièrement  intéressantes pour des débutants ou des personnes ne connaissant pas encore le fonctionnement de certains processus suivis par notre communauté.

Dans l’ordre, vous trouverez :

 * *IT figures* par [Sara Golemon](https://twitter.com/SaraMG), qui revient sur ce qu’est le FIG, organisme important qui régit aujourd’hui une partie de l'organisation de la communauté PHP, et sur ce que sont les PSRs.
 * *Nommer les choses ? Oui : avec le DNS* par [Julien Pauli](https://twitter.com/julienPauli). Cette conférence revient sur les bases du fonctionnement du DNS et son utilité.
 * Et, pour finir : *Caching with PSRs* par [Hannes Van De Vreken](https://twitter.com/hannesvdvreken). Dernière des conférences “à voir une fois”, celle-ci revient sur ce qu’est le cache en général, pourquoi on en utilise. Puis s’intéresse au cache applicatif via les PSRs.


### Le dernier PHP Tour

Ce PHP Tour était le dernier, puisque l’AFUP proposera à partir de 2019 un nouveau format pour les événements en région : l’AFUP Day. Nous aurons grand plaisir à vous y rencontrer à nouveau, à Lyon cette fois-ci !

Encore un grand merci à l'[AFUP](https://twitter.com/afup) !

Enfin, retrouvez toute l'actualité de l'événement sur [#phptour](https://twitter.com/hashtag/phptour?src=hash).
