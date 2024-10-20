---
layout: ../../layouts/post.astro
title: "Github Team Reviewer pour gagner la course aux Pull Requests"
description: "Voir toutes les pull requests de ses équipes en un seul endroit"
author: team_cytron
category:
tags: [outil, github, pull-requests, cytron, open-source]
feature-img: "../../../../images/posts/cytron/gtr.png"
thumbnail: "../../../../images/posts/cytron/gtr.png"
comments: true
permalink: github-team-reviewer-pull-requests.html
---

#### Les PR, c'est le bien

Chez M6Web, nous utilisons [Github Enterprise](https://enterprise.github.com/) en interne pour nos projets privés et [Github](https://github.com/) pour nos projets open-source. Grâce à ces outils, nous avons adopté de manière systématique l'usage des Pull Requests pour faire relire et valider notre code par nos collaborateurs. La qualité de nos développements a ainsi été grandement améliorée au fil du temps.

#### Oui, mais...

Nous utilisons aussi [HipChat](https://www.hipchat.com/) pour communiquer au quotidien et rapidemment au sein de nos équipes. Chaque création de Pull Request émet une notification sur HipChat. Cependant, le nombre de pull requests initiées augmente avec le temps et chacun tend à ignorer peu à peu les notifications ou y fait moins attention. Les Pull Requests s'accumulent sur certains projets et nous n'avions, jusqu'à présent, pas vraiment de moyen pour lister par équipe toutes les PR en cours. Cela nous permettrait d'avoir une vue globale et d'être plus réactifs et rigoureux.

Il y a bien le nouveau [Pull Requests Dashboard](https://github.com/blog/1901-managing-issues-and-pull-requests-across-repositories) de Github avec ses filtres de recherche avancée qui permet de répertorier toutes ses PR ou celles d'une organisation. Cette mise à jour n'est pas encore entrée en application dans Github Enterprise. Mais surtout, nous avons plusieurs équipes au sein d'une même organisation et nous voulons pouvoir les gérer de manière indépendante : cette fonctionnalité ne résoud pas notre problématique.

#### GTR !

Nous avons donc développé [Github Team Reviewer](https://github.com/BedrockStreaming/GithubTeamReviewer), un outil ultra simple mais efficace qui permet en un coup d'œil de voir toutes les PR de ses équipes et leur statut, qu'elles soient sur un Github Entreprise interne ou sur Github. Le projet utilise [AngularJS](https://angularjs.org/) et l'[API fournit par Github](https://developer.github.com/v3/). L’installation se fait sur n’importe quel serveur web et requiert npm (via [Node.js](https://nodejs.org/)) pour *builder* l'application grâce à [Bower](https://bower.io/) et [Gulp.js](https://gulpjs.com/).

L'application propose volontairement un nombre limité de paramètres de configuration éditables dans le fichier `config/config.json`:

* l'intervalle de rafraichissement de la liste des PR,
* la liste des équipes en définissant pour chacune :
  * son nom,
  * les utilisateurs Github concernés,
  * les organisations Github concernées,
  * l'url de l'API à interroger (pour Github Enterprise, par défaut l'url de l'API public de Github est utilisée),
  * un [token utilisateur](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) (utile pour augmenter le *rate limit* de l'API public).

Une *select box* permet de basculer d'une équipe à une autre très facilement.

[Github Team Reviewer](https://github.com/BedrockStreaming/GithubTeamReviewer) est disponible en [open-source](https://tom.preston-werner.com/2011/11/22/open-source-everything.html) sur [le compte Github de M6Web](https://github.com/BedrockStreaming).

Enjoy !
