---
layout: post
title: "Retour sur la velocity Barcelone - seconde journée"
description: ""
author:
  name:           Baptiste, François Verron et Olivier Mansour
  avatar:
  email:
  twitter:  techM6Web
  facebook:
  github:
category:
tags: [conference,velocity,webperf]
image:
  feature:
  credit:
  creditlink:
comments: true
permalink: velocity-europe-2014-day-2.html
---

# Velocity Barcelone, seconde journée

Deuxième jour de conférence avec un programme encore plus chargé et quelques conférences alléchantes repérées au préalable

## Morning Keynotes

### Upgrading the Web: Polyfills, Components and the Future of Web Development at Scale - Andrew Betts (FT Labs)
 
 L'orateur fait remarquer que de nombreux systèmes existent pour packager et gérer les dépendances des applications backend, mais rien n'est disponible pour les composants webs. Il nous présenté le projet [Origami](http://origami.ft.com/) qui permet de réutiliser massivement des composants html. 
 
 <iframe width="560" height="315" src="//www.youtube.com/embed/oHB74_vQPrU" frameborder="0" allowfullscreen></iframe>
 
 Slides : [the Future of Web Development at Scale](http://cdn.oreillystatic.com/en/assets/1/event/121/Upgrading%20the%20Web_%20Polyfills,%20Components%20and%20the%20Future%20of%20Web%20Development%20at%20Scale%20Presentation.pdf)
  
 
 ## Troubleshooting Using HTTP Headers - Steve Miller-Jones (Limelight Networks)
 
 Slides : [Troubleshooting Using HTTP Headers](http://cdn.oreillystatic.com/en/assets/1/event/121/Troubleshooting%20Using%20HTTP%20Headers%20Presentation.pptx)
  
  Un employé de Limelight nous a présenté comment l'ajout de header dans une requête pouvait renvoyer des headers supplémentaires dans la réponse HTTP. Cela peut être utile pour débugguer et analyser un incident.  
  Cette présentation nous rappelée, qu'en interne, [nos gentils ops](https://s3-eu-west-1.amazonaws.com/uploads-eu.hipchat.com/40462/467784/bB5W31POypiBcuF/LSpC0ZX.gif) nous permettent déjà de faire ce genre chose sur nos proxy cache.
   
 ## Monitoring without Alerts - and Why it Makes Way More Sense than You Might Think - Alois Reitbauer (ruxit.com) 
  
 Alois a évoqué la solution Ruxit développé depuis plus de trois ans. Cette solution consiste a installer un agent sur vos serveurs qui va automatique détecter des anomalies statistiques et corréler cette information avec d'autres déviations dans le but de trouver la *root cause* d'un indident 
 
 Beaucoup d'autres solutions de ce genre existe (et la plupart étaient dans le salon des sponsors). Nous n'avons pas été totalement convaincu de leurs capacité à détecter des *root cause* mais elles sont toutes assez intéressantes et matures.
 
 <iframe width="560" height="315" src="//www.youtube.com/embed/j0kh5u_NewA" frameborder="0" allowfullscreen></iframe>
 
 ## Lowering the Barrier to Programming - Pamela Fox (Khan Academy) 
 
 Pamela Fox nous a présenté l'initive [code.org](http://code.org/promote) dont le but est de promouvoir l'enseignement de l'informatique (bon, apparement seulement aux US).
  
  Elle a également donné quelques conseils si on veut s'investir dans l'enseignement de l'informatique à destination des plus jeunes. Par exemple créer un *{code club}*.
 
 <iframe width="560" height="315" src="//www.youtube.com/embed/CZTywncF_EQ" frameborder="0" allowfullscreen></iframe>
 
 Slides : [Lowering the Barrier to Programming](http://cdn.oreillystatic.com/en/assets/1/event/121/Lowering%20the%20Barrier%20to%20Programming%20Presentation.pdf)

## Velocity at GitHub - Brian Doll (GitHub)
 
 Brian a fait une présentation très ... minimaliste. Il est revenu sur 7 ans de développement à GitHub ... TODO 
 
 Il a enfin évoqué le lancement de GitHub Enterprise 2.0 qui fonctionne maintenant sur AWS.
 
 <iframe width="560" height="315" src="//www.youtube.com/embed/AYlfEtP0rmc" frameborder="0" allowfullscreen></iframe>
 
 J'ai profité d'un instant avec lui pour lui présenté [GitHubTeamReviewer](http://tech.m6web.fr/github-team-reviewer-pull-requests.html) (un outil interne open-sourcé) et il été enchanté de découvrir ce qui avait été fait avec l'API de Github. Il a indiqué que l'entreprise travaillait actuellement sur des vues permettant de pallier aux problèmes résolus par GitHubTeamReviewer.
 
 ## HTTP Archive and Google Cloud Dataflow - Ilya Grigorik (Google)
 
 Ilya Grigorik a présenté [http://bigqueri.es/](http://bigqueri.es/), un outil permettant de requêter [HTTP archive](http://httparchive.org/). La nouveauté est que mainteant le *body* des requêtes est maintenant conservé et on peut réquêter dedans. Un engine Javascript a été intégré au SQL de bigqueries permettant de faire des requêtes très puissantes. 
 
 <iframe width="560" height="315" src="//www.youtube.com/embed/_CMcaYnBt-g" frameborder="0" allowfullscreen></iframe>
 
 Pour ceux qui ne voudraient pas se plonger dedans, beaucoup de recherches faites par d'autres utilisateurs sont disponibles et abondamment discutées ([exemple](http://bigqueri.es/t/are-popular-websites-faster/162). 
 
 ## Webpagetest-automation 2.0 - Nils Kuhn (iteratec GmbH), Uwe Beßle (iteratec GmbH)
  
 Webpagetest est un outil formidable mais il est difficile à automatiser. Les orateurs ont présentés un outil pour le faire, permettant donc de réaliser une mesure continuelle de la webperf avec un parcourt utilisateur complet - démonstration à l'appuie.
 
 Leur travail est disponible sur GitHub sous licence Apache : [https://github.com/IteraSpeed/OpenSpeedMonitor](https://github.com/IteraSpeed/OpenSpeedMonitor). Un grand merci <3 !
 
 <iframe width="560" height="315" src="//www.youtube.com/embed/_CMcaYnBt-g#t=627" frameborder="0" allowfullscreen></iframe>

## Etsy’s Journey to Building a Continuous Integration Infrastructure for Mobile Apps - Nassim Kammah (Etsy)

TODO 

## Recycling: Why the Web is Slowing Your Mobile App - Colin Bendell (Akamai) 
 
*Mobile app monitoring is where browser RUM where 7 years ago*. 
 
Slides : [Why the Web is Slowing Your Mobile App](http://cdn.oreillystatic.com/en/assets/1/event/121/Recycling_%20Why%20the%20Web%20is%20Slowing%20Your%20Mobile%20App%20Presentation.pdf)



## Mega quiz Velocity

Perry Dyball, Stephen Thair avaient préparé un quiz interactif avec les participants à la conférence. Des questions diverses et variées défilaient sur le grand écran et une application web permettaient à chacun d'y répondre. Un moment fun animé par deux animateurs survoltés.
 Malheuresement il semble que l'application n'aient pas tenu la charge et personne n'a pu voté après la seconde question (la prochaine ils devraient nous confier le projet :) ), mais un système de fallback a été prévu, basé sur des feuilles de papier de couleur à brandir bien haut pour répondre aux questions. 
 
 > merci le papier !
 
 ## Conclusion
 
 Fin des conférences et direction les soirées offertes par Facebook (où nous avons pu discuter avec Santosh Janardhan, responsable des infrastructures de Facebook !) et Dyn.