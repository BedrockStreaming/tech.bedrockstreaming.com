---
layout: post
title: "Lâche moi la branch !"
description: ""
author: cytron
category:
tags: [qualite, jenkins, github]
image:
  feature: posts/cytron/branche.png
  credit: dlna.be
  creditlink:
comments: true
permalink: lache-moi-la-branch
---

#### Test continu des Pull Requests

Maintenant que nous [utilisons GitHub Enterprise](https://twitter.com/kenny_dee/status/352003224506605569) chez M6Web, nous avons la joie de pouvoir utiliser les Pull Requests de façon abusive. Mais leur puissance n'est maximale que lorsqu'elles peuvent être [testées individuellement](https://github.com/blog/1227-commit-status-api) avant d'être mergées sur le *master*.

![Lâche moi la branch !](/images/posts/imgob/0-00-30-83-201307-ob_b6e0b1_capture-d-e-cran-2013-07-12-a-15-03-58.png)

Pour ce faire, nous avons utilisé le plugin [GitHub Pull Request Builder](https://wiki.jenkins-ci.org/display/JENKINS/GitHub+pull+request+builder+plugin) de [Jenkins](https://jenkins-ci.org/), qui après une [configuration assez simple](https://buddylindsey.com/jenkins-and-github-pull-requests/), nous a permis de créer un job qui lance automatiquement un build lorsqu'une Pull Request est modifiée. Ce build se positionne sur la branch pointée par la Pull Request et exécute les tests.


![Lâche moi la branch !](/images/posts/imgob/0-00-30-83-201307-ob_e753d81cd5875809e61c474bcc6b8609_liste-des-builds.png)

Il est donc nécessaire de créer un job dédié au test des Pull Requests pour chaque projet dont nous souhaitons voir les Pull Request automatiquement testées. Ça peut paraître évident, mais lorsqu'on a plus de 200 repositories, c'est tout de suite moins trivial.


#### Configuration du plugin

Le fonctionnement par défaut du plugin GitHub Pull Request Builder est assez restrictif. Il nécessite qu'un contributeur ajoute un commentaire sur la Pull Request en demandant un test puis qu'un admin (parmi une liste à configurer) réponde avec un deuxième commentaire acceptant de lancer les tests (le tout avec des phrases types configurables). C'est uniquement ensuite que Jenkins lancera un build.

Or dans notre contexte d'entreprise, nous souhaitons que l'automatisation soit totale, comme dans [Travis](https://travis-ci.org/) : chaque modification d'une Pull Request lance l'ensemble des tests. Pour arriver ce fonctionnement, il suffit de cocher "*Build every pull request automatically without asking (Dangerous!)*" dans la section "*Avancée*" des options de lancement de build par "*Github pull requests builder*".


#### Test continu du master

Nous essayons tant que possible de suivre le [workflow de déploiement de GitHub](https://github.com/blog/1557-github-flow-in-the-browser) : on développe une fonctionnalité par branch, on fait une Pull Request sur le *master* et on ne merge que lorsque tout le monde est d'accord et que les tests sont passés. Cela nous permet de garder le *master* toujours déployable.

Nous avons donc, pour chaque projet, un second job qui lance l'ensemble des tests lors de chaque modification du *master*. Cela n'arrive normalement que lors du merge des nouvelles fonctionnalités contenues dans les Pull Requests, qui ont déjà été individuellement testées. Nous sommes donc sereins sur l'intégration croisée de toutes les nouvelles fonctionnalités sur le *master*.


#### Déploiement

Avant de déployer à l'aide de [Capistrano](https://www.capistranorb.com/), nous vérifions que les tests passent (résultat de l'intégration continue + lancement manuel des tests). Le manque d'automatisation concernant ces mises en production fait apparaitre une faille assez large. Pour la résorber, nous pourrions par exemple accepter le déploiement d'un service, uniquement si ses tests sont passés et si aucun autre n'est en cours ou en attente. Même si cela ajoute une dépendance aux serveurs d'intégration continue, cela sécurise les déploiements.