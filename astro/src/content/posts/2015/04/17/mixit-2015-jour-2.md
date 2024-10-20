---
layout: ../../../../../layouts/post.astro
title: "Mix-IT 2015 - Jour 2"
description: "Retour des conférences vues lors du jour 2 du Mix-IT 2015"
author: m_randy
category:
tags: [mixit, conference, agile, technique]
feature-img: "../../../../../../../images/posts/mixit2015/logo-mixit.png"
thumbnail: "../../../../../../../images/posts/mixit2015/logo-mixit.png"
comments: true
---

Cet article est le retour du second jour du Mix-IT 2015, le vendredi 17 avril 2015.
Vous pouvez également consulter [le retour du jour 1](/mixit-2015-jour-1/).

# Aller sur Mars ... ou presque
--- [Florence Porcel](https://twitter.com/florenceporcel)

Florence est venue nous présenter son rêve : devenir une marsonaute, à savoir une personne qui va aller physiquement sur Mars.

Après avoir pris le temps de faire le point sur tout ce qui a été fait pour permettre un jour à l'homme de faire le voyage pour mettre le pied sur Mars, Florence nous a expliqué les différentes actions qu'elle avait entrepris pour agir sur ce cheminement :

- Participation à un projet de simulation de vie sur Mars : elle a fait partie d'un groupe de personnes qui se sont isolées pendant 15 jours dans des conditions de vie semblables à celles sur Mars (au milieu du désert de l'Utah, scaphandre pour sortir, nourriture lyophilisée, rationnement);
- Participation à un programme de volontaire pour le premier départ habité vers Mars;
- ...

Le but de tout ça ? Suivre son rêve.

Florence a fini sa conférence en nous rappelant que ce n'est pas notre éducation, notre formation ou notre passé qui dicte ce que nous pouvons faire de notre vie, mais ce sont nos rêves.
Elle nous a rappelé que, malgré sa formation littéraire, et son métier de comédienne, que son rêve d'aller sur Mars un jour l'a conduite à faire ses actions très concrètes, et que c'est grâce à l'action un peu utopique de beaucoup de gens qu'on peux changer le monde.  

En 2 mots, poursuivons nos rêves !


# ReactJS pour les néophytes
-- [Nicolas Cuillery](https://github.com/ncuillery), [Matthieu Lux](https://twitter.com/swiip) et [Florent Lepretre](https://twitter.com/superflaw)

Cet atelier était un peu corporate puisque que Nicolas et Florent sont actuellement en mission chez M6Web.

Lors de cet atelier, qui se décomposait en plusieurs TP permettant de découvrir une à une les différentes spécificités de [React](https://facebook.github.io/react/) et du pattern [Flux](https://facebook.github.io/flux/) : React et sa notion de composant, le pattern Flux et une de ses variantes, [ReFlux](https://github.com/spoike/refluxjs), le système de routing et les tests avec [Jest](https://facebook.github.io/jest/).

Bien qu'il leur ait manqué du temps pour finir l'atelier, ils étaient très présents pour nous aider à franchir les premiers pas qui permettent d'entrer dans ce nouveau monde.

En tout cas, félicitations à tous les 3 pour leur implication pour ce difficile exercice qu'ils ont plutôt bien surmonté.

# Startups d'états
--- [Pierre Pezziardi](https://twitter.com/ppezziardi)

Pierre, qui dirige un incubateur d'état, soit un incubateur qui sélectionne et héberge des petites équipes dont le but est de faire évoluer le système informatique public, mais à la sauce d'une startup : budget réduit, équipe réduite, mode "survie".

Il a eu l'idée de ce système lorsqu'il s'est posé la question sur les outils qui "marchent" et leurs raisons. Pourquoi utilisons nous les outils de Google ou Dropbox ? Parce qu'ils sont simples et efficace ! Ils vont au but, et correspondent à ce que l'utilisateur désire.
En poussant cette réflexion, il en est arrivé à la conclusion que tout système informatique est le reflet de l'organisation qui le pilote : plus l'organisation est tournée sur sa propre organisation, plus le produit final correspondra à ce qu'un grand manager a demandé, et pourra être décalé de ce que les utilisateurs attendent.

À l'inverse, quand une organisation n'a pas de marge, elle va à l'essentiel pour que son produit convienne aux utilisateurs.

Voici quelques exemples de projets qui sortent de cet incubateur d'état :

* [data.gouv.fr](https://www.data.gouv.fr/fr/)
* [Marchés Publics Simplifiés](https://mps.apientreprise.fr/)
* [mes-aides.gouv.fr](https://mes-aides.gouv.fr/)

# Coding Dojo et Mob Programming dans les tranchées
--- [Bernard Notarianni](https://twitter.com/notarianni)

Cette conférence était un retour d'expérience expliquant comment une équipe de développement habituée a travailler avec des releases fixes à dates régulières a tenté de mettre en place un découpage en sprint pour améliorer sa productivité.

Je dis volontairement "en sprint" sans parler de Scrum parce qu'en fait, cette équipe s'auto-organisait de la sorte, mais sur un cahier des charges fixe, un périmètre fixe pour chaque release, et pas de feedback avec le produit.

Au final, la conclusion de Bernard a été sans appel : ils ont essayés, l'équipe a fait son travail, a essayé l'amélioration continue, mais comme le client ne jouait pas le jeu, ça c'est mal passé.  

# Fabriquez votre devbox portable avec Docker
--- [Jean-Marc Meessen](https://twitter.com/jm_meessen) et [Damien Duportal](https://twitter.com/damienduportal)

Lors de cette conférence, Jean-Marc et Damien nous ont expliqués comment ils avaient réussi à utiliser Docker pour réaliser une "devbox" portable.
Avant cette conférence, je pensais qu'ils allaient nous expliquer comment ils avaient organisé leurs conteneurs pour que ça soit le plus efficace, mais en fait, une "devbox" est plus un poste de développement complet (bureau et IDE compris)

Le résultat est assez impressionnant dans le fait qu'ils ont réussi à virtualiser une Debian avec son UI via Docker, et qu'ils peuvent le faire tourner sur n'importe quel poste.

Toutefois, je ne suis pas convaincu par cette approche. À mon sens, Docker permet à tous de développer dans l'environnement qui lui convient, tout en exécutant son code dans un environnement qui est le plus proche possible de la production.

Il n'en reste pas moins que je les félicite pour le résultat qu'ils ont obtenu, et je suis encore plus convaincu de la puissance de Docker suite à cette présentation.

# Reading code good
--- [Saron Yitbarek](https://twitter.com/saronyitbarek)

Saron est venue nous partager sa vision sur le moyen qu'elle trouve le plus efficace pour apprendre un langage, un framework, une librairie : lire du code. 
De la même manière, pour progresser, lire le code des autres permet d'aller au delà de ce que nous pensons faire. En se confrontant au code des autres, nous apprenons sur les autres manières de résoudre un même problème, sur d'autres approches de code, et nous élargissons notre connaissance.

Suivre un tutorial, c'est bien, mais le soucis, c'est que le code est basique, sur un usage basique.
Lire un code réel, c'est voir un cas d'utilisation réel, c'est voir comment le développeur l'a résolu, voir les techniques qu'il utilise, ... et le moyen le plus sûr de toujours découvrir et apprendre.

Pour aller encore plus loin, il ne faut pas hésiter à discuter avec l'auteur du code que l'on vient de lire.

L'énergie de Saron et la conviction qu'elle met dans sa présentation ont fait de cette conférence un vrai coup de coeur de ma part !


# Come to the dark side
--- [Stéphane Bortzmeyer](https://twitter.com/bortzmeyer) - [[Présentation sur InfoQ](https://www.infoq.com/fr/presentations/come-to-dark-side)]

Lors de cette Keynote, Stéphane nous a fait part de son ressenti quand à l'impact de l'informatique dans notre vie.

Il n'y a encore que 20 ans, l'informatique était au service de l'homme. Elle servait à améliorer son quotidien à faciliter son travail.
Aujourd'hui, c'est l'informatique qui dirige nos vies. Si vous êtes anti Facebook, vous perdez contact avec pas mal de gens. Si vous ne voulez pas d'ordinateur, il y a de plus en plus de démarches que vous ne pouvez faire.

Encore plus important, nous avons délégués de plus en plus de décisions à l'informatique, sur des aspects qui impactent de plus en plus notre quotidien. Par exemple, lorsque vous faites un paiement, c'est un algorithme qui va décider si la transaction est autorisée ou non, de manière froide et automatique, sans chercher à comprendre si sa décision peux vous laisser dans une situation compliquée.

À partir de là, nous, développeurs, avons une grande responsabilité. Le code que nous produisons, les algorithmes que nous acceptons d'implémenter sont ceux qui se retrouvent dans les systèmes qui régissent nos vies.
Il est donc primordial que nous prenions conscience de cette responsabilité et que nous nous posions des questions sur ce que nous faisons, quitte à refuser de le faire si cela va à l'encontre de notre éthique.

J'ai été fortement touché par cette claque, enfin, cette conférence, car elle nous place devant nos responsabilités, et devant notre devoir de prendre du recul sur ce que nous faisons pour ne pas être un simple robot.

# Conclusion

Comme à leur habitude, les organisateurs de ce Mix-IT 2015 ont réalisés un superbe travail.
Un grand bravo à eux !

Rappel : cet article est découpé en 2 parties. N'oubliez pas de consulter le [retour des conférences suivies lors du premier jour](/mixit-2015-jour-1/).
