---
layout: post
title: "Velocity Europe 2013 - Day 1"
description: ""
author:
  name:           Baptiste, Denis Roussel et Kenny Dits
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
permalink: velocity-europe-2013-day-1.html
---

### Introduction :

![Velocity Europe 2013 - Day 1](/tech.bedrockstreaming.com/public/images/posts/imgob/0-00-30-83-201311-ob_0fc84f_9083212144-c916b6f5e1-jpg.jpeg)

Nous voici de retour à Londres pour la troisième édition de la Vélocity Europe, qui se déroule, pour la deuxième fois à Londres (la précédente était à Berlin).

Pour rappel, la Vélocity est la conférence autour de la performance web. Qu'elle soit Front-End, Back-End, Dév ou Ops. C'est l'événement de l'année à ne pas manquer en Europe, ou aux US (ou Chine) pour les plus chanceux

  
 Cette première journée (ayant eu lieu le 13 novembre 2013) est axée sur le signe des “Tutorials”. De looongues conférences de 90 minutes dont voici le compte rendu écrit à 6 mains.  
  
 La conférence “classique” commence le 14 et se déroulera sur deux journées.



### Gone in 60 frames per second

Addy Osmani (Google Chrome) [@addyosmani](https://twitter.com/addyosmani)

![Velocity Europe 2013 - Day 1](/tech.bedrockstreaming.com/public/images/posts/imgob/0-00-30-83-201311-ob_69d331_10845977003-b429d75241-z-jpg.jpeg)

[Addy](https://addyosmani.com/blog/) est une figure incontournable du web. Créateur de [TodoMVC](https://todomvc.com/), Lead dév de [Yeoman](https://yeoman.io/) et travail dans la Google Chrome Team sur les outils à destination des développeurs autour du navigateur.

Après la génération du code html par les serveurs et le transfert de ce code par les réseaux, le rendu graphique de la page par le navigateur est le dernier évènement significatif du chargement de la page lors de la consultation d’un site par un client.

Voici donc un résumé des bonnes pratiques permettant d’obtenir un meilleur framerate (nombre de rafraîchissement de la page par seconde) et ainsi une meilleure fluidité lors de la navigation :

- disposer des images à la bonne taille pour éviter les redimenssionnements à la volée,
- limiter les handlers sur l’événement onScroll(),
- limiter tous les éléments ‘fixed’ car cela force le navigateur à recalculer constamment la zone affichée (ou utiliser l’astuce `translateZ(0)`),
- limiter les directives CSS qui nécessites un calcul supplémentaire (lorsque tout est déjà affiché) :

- les ombres,
- les flous,
- et les dégradés : ([Bootstrap](https://getbootstrap.com/) a supprimé tous les dégradés sur ses boutons : +100% de rapidité l’affichage).

Ensuite, il reste quelques conseils plus généraux :

- Il faut se souvenir que les performances des téléphones ne sont pas celles des PC,
- un framerate de 60 fps est parfait (c’est dû au matériel), mais un framerate de 30 fps peut aussi être suffisant pour peu qu’il soit constant,

Enfin, comme souvent, tous les outils pour comprendre et améliorer le rendu graphique de ses pages web sont disponible dans tous les navigateurs. Dans Chrome, il suffit d’aller dans la section “Frames” de l’onglet “Timeline” des DevTools.

Les slides sont disponible ici : [https://speakerdeck.com/addyosmani/velocityconf-rendering-performance-case-studies](https://speakerdeck.com/addyosmani/velocityconf-rendering-performance-case-studies)

  
 La présentation de la conférence par l’auteur lui-même : [https://addyosmani.com/blog/making-a-site-jank-free/](https://addyosmani.com/blog/making-a-site-jank-free/)



<script async="" class="speakerdeck-embed" data-id="76ff3a902e8b0131b9452adb14392f56" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<iframe allowfullscreen="" frameborder="0" height="720" mozallowfullscreen="" src="https://player.vimeo.com/video/75540354" title="Addy Osmani — Gone in 60 Frames Per Second (SmashingConf 2013)" webkitallowfullscreen="" width="1280"></iframe>

Vidéo de la même conférence (donnée à la Smashing Conf 2013)


### Bring the noise : Making effective use of a quarter million metrics

Jon Cowie (Etsy) [@jonlives](https://twitter.com/jonlives)

![Velocity Europe 2013 - Day 1](/tech.bedrockstreaming.com/public/images/posts/imgob/0-00-30-83-201311-ob_83eb3a_10845796864-8dbb9f704e-z-jpg.jpeg)

Jon est “Ops Engineer” chez [Etsy](https://etsy.com/) (Dont le VP, John Allspaw, co-organise avec Steve Souders, la Vélocity).

Quelques données sur Etsy :

- Ils font du déploiement continu
- 1.5 milliards de pages vues
- 250 contributeurs (tout le monde déploie du code, [même les chiens](https://fr.slideshare.net/chaddickerson/optimizing-for-developer-happiness))
- ils utilisent Deployinator pour déployer leur code avec un unique “bouton”, et schemanator pour les migrations SQL
- 60 déploiements par jour / 8 commit par deploiement
- ¼ millions de métriques !



> "We optimize for quick recovery by anticipating problems instead of fearing human error" John Cowie


> "Can’t Fix what you don’t measure" W. Edwards Deming


Leurs outils pour le monitoring :

- Not homemade :

- Ganglia
- Graphite
- Nagios
- Homemade :

- [StatsD](https://github.com/etsy/statsd) : Simple Daemon for easy stats integration
- [Supergrep](https://github.com/etsy/supergrep) : Real time log streamer
- [Skyline](https://github.com/etsy/skyline) : A real time anomaly detection system
- [Oculus](https://github.com/etsy/oculus) : A metric correlation component



> "Not All things that break throw errors" Oscar Wilde


> "If it moves, graph it ! If it doesn’t move, graph it anyway" Jon Cowie


La présentation s’axe ensuite plus particulièrement sur la stack “Kale”, qui englobe deux outils que l’on va détailler : Skyline et Oculus. Voir l’article sur le blog technique de Etsy [https://codeascraft.com/2013/06/11/introducing-kale/](https://codeascraft.com/2013/06/11/introducing-kale/)

L’objectif de Skyline, est de détecter les comportements anormaux (gros pics par exemple), avec pour principal challenge, la récupération des données (via le “relay agent” de Graphite, ils envoient en continue les données dans Redis via redis.append() ), le stockage de 250 000 métriques (dans Redis) au format MessagePack. Oculus quand lui permet de corréler les métriques, en utilisant les données brutes de l’api de Graphite, car il est bien plus efficace de comparer des chiffres, que des images …

Il n’y a pas un mais huit algorithmes de détections d’anomalies qui sont utilisés dans un vote à majorité, déterminant ainsi si l’anomalie est avérée (parmi ceux ci, OLS, Grubb’s test, l’histogramme bining etc…). La détection se fait sur une fenêtre d’une heure et une seconde de 24 heures. Skyline souffre encore de quelques faiblesses: l’absence de prise en compte de la saisonnalité, les pics qui peuvent en cacher d’autres plus faibles, le postulat pas toujours vrai que les données sont normalement distribuées et les corrélations négatives.

Ils comparent donc la distance euclidienne (slide 99), en gérant aussi le décalage temporel (dynamic time warping / DTW) (voir slide 100).

La partie la plus intéressante est la simplification d’une métrique temporelle, en la normalisant sur une courbe échelle réduite (de 0 à 25), et en la transformant en une chaine textuelle comportant cinq valeurs :

- sharpdecrement
- decrement
- flat
- increment
- sharpincrement

Et ceci en fonction de la valeur en cours par rapport à la valeur précedente.

Ils poussent toutes ces métriques normalisées dans [Elastic Search](https://www.elasticsearch.org/) dans un champ non tokenisé en réalisant des recherches de phrases afin de corréler les métriques ayant le même pattern et en scorant via un plugin codé par leurs soins (incluant une version “rapide” du DTW).

Une fois les métriques corrélées affichées, il est possible de sauvegarder un snapshot de ces dernières et d’inclure des commentaires dans une “collection”. Cela permet notamment de construire une base de données de connaissance sur les incidents ou les comportements anormaux mais explicables.

Skyline est visible par *tous* dans leur bureaux, sur l’un des 6 écrans de dashboards, devant lesquels on peut notamment lire le nombre de requêtes HTTP par seconde, le top 10 des pages, les temps de générations et d’affichage etc...

Les slides sont disponible ici : [https://www.slideshare.net/jonlives/bring-the-noise](https://www.slideshare.net/jonlives/bring-the-noise)



<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://www.slideshare.net/slideshow/embed_code/24058352" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### Responsive images Technique and Beyond

Yoav Weiss (WL Square) [@yoavweiss](https://twitter.com/yoavweiss)

![Velocity Europe 2013 - Day 1](/tech.bedrockstreaming.com/public/images/posts/imgob/0-00-30-83-201311-ob_f5459e_10845647355-e5150145e4-z-jpg.jpeg)

Yoav est un spécialiste de la WebPerf et travaille sur les problématiques des images liées au Responsive Web Design. Il est aussi Technical Lead au RICG (Responsive images community Group)

Le principal problème des images responsive, c’est de charger l’image correctement dimensionnée par rapport à une page, de manière efficace.

72% des sites RWD servent les mêmes ressources entre les résolutions petites et grandes …

On peut économiser 72% en taille d’image en compressant correctement (voir [https://timkadlec.com/2013/06/why-we-need-responsive-images/](https://timkadlec.com/2013/06/why-we-need-responsive-images/)).

Yoav a développé un outil utilisant PhantomJs, permettant de mesurer la différence entre les images chargées, et celle qui seraient correctement dimensionnées : [Sizer Soze](https://www.sizersoze.org)

On aborde ensuite les deux cas principaux gênant :

- Servir une dimension différentes de l’image à différents support. (et les Retina uniquement aux devices le supportant)
- et le “Art direction”, avoir une image qui correspond au layout

Ainsi que l’intérêt du Pre-loader, souvent peu connu. Beaucoup plus d’infos sur cet article d’Andy Davies ([https://andydavies.me/blog/2013/10/22/how-the-browser-pre-loader-makes-pages-load-faster/](https://andydavies.me/blog/2013/10/22/how-the-browser-pre-loader-makes-pages-load-faster/))

Yoav parcours ensuite toutes les techniques des images responsive avec avantages/inconvénients et exemple pour chacune, que vous pouvez retrouvez dès la slide 57 de la présentation ci après : [https://yoavweiss.github.io/velocity-eu-13-presentation/#/](https://yoavweiss.github.io/velocity-eu-13-presentation/#/)

L’étude et les retours sont extrêmement complet, et immanquable, si vous travaillez ou allez travaillez sur le sujet. Il aborde aussi une approche en cours d’étude, qui verra peut être le jour prochainement (Responsive Image Container).


### Performance Analysis of JVM components for non-specialists

Ben Evans (JClarity) [@kittylyst](https://twitter.com/kittylyst)

![Velocity Europe 2013 - Day 1](/tech.bedrockstreaming.com/public/images/posts/imgob/0-00-30-83-201311-ob_f988cd_10845641605-306fa359cc-z-jpg.jpeg)

La performance et la complexité des applications qui fonctionnent sur la JVM ont suivi l'évolution de la loi de Moore. Malgré que nous ayons gagné de la puissance et des transistors, notre code s'est complexifié d'année en année et d'autant plus avec le boom d'Internet.

Le tuning de la JVM est indispensable pour avoir une application performante et doit se faire de façon rigoureuse et scientifique, il faut comprendre, mesurer, tester, vérifier et répéter ce processus jusqu'ce que l'on considère la performance comme bonne.

Ben a ensuite détaillé l'anatomie de la JVM, les spécificités du langage Java, les "mid 90's decisions design" qui ont été faites, comment est géré l'allocation mémoire, la heap, et le fonctionnement du garbage collector (mark and sweep, stop the world). La durée du "stop the world" est ridicule comparé aux temps de latence réseau, ceux engendrés par l'hyperviseur etc...

Il a présenté quelques optimisations indispensables selon lui, et a insisté sur le fait que l'optimisation prématurée pouvait être la source de bien des soucis coté code.


### Tuning Network Performance to Eleven

Ilya Grigorik (Google) [@igrigorik](https://twitter.com/igrigorik)

![Velocity Europe 2013 - Day 1](/tech.bedrockstreaming.com/public/images/posts/imgob/0-00-30-83-201311-ob_0bd89e_10845984653-f790e99456-z-jpg.jpeg)

AKA comment condenser un livre dans un tutorial d’1H30. Exercice encore plus difficile lorsqu'il faut résumer le résumé d'un livre aussi dense et complet. Ilya en tant que spécialiste de la webperf a examiné les mécanismes de la latence et de la bande passante, le fonctionnement du protocole TCP, la gestion de congestion, les problèmes structurels de HTTP 1.0 et HTTP 1.1, l'impact de TLS (le chiffrement) sur les performances. Il a donné ses recommandations pour optimiser TCP et bien utilisé TLS.

"bandwidth + latence =~ performance"



> "Video streaming is bandwidth limited, web browsing is latency limited" Ilya Grigorik


Il a ensuite expliqué comment fonctionne le réseau radio 2G/3G/4G et les contraintes que ces architectures exercent sur les temps de chargement et la durée de vie des batteries pour les appareils mobiles.

Le tutorial s'est achevé sur les défauts de HTTP 1.1 et les nouveautés (nombreuses et sexys) d'HTTP 2.0. Ce fut extrêmement plaisant d'assister à cette présentation, tant Ilya est pointu techniquement, précis et didactique dans ses démonstrations. Le livre est un MUST-READ !

Il est d’ailleurs disponible gratuitement ici : [https://chimera.labs.oreilly.com/books/1230000000545](https://chimera.labs.oreilly.com/books/1230000000545)

  
[Les slides sont disponible ici](https://docs.google.com/presentation/d/1f2J_HrzMNvVHhsB3f7DKJFPl2N0Q_QR2ZEECWQu6oV8/present#slide=id.p19)



### Be Mean to your code with Gauntlt and the Rugged Way

James wickett (Mentor Graphics) [@wickett](https://twitter.com/wickett)

![Velocity Europe 2013 - Day 1](/tech.bedrockstreaming.com/public/images/posts/imgob/0-00-30-83-201311-ob_a85c76_10845714576-42269f839c-z-jpg.jpeg)

Cette présentation fut le seul et unique vrai “Workshop” du jour, dans le sens où une machine virtuelle (monter avec Vagrant) était fournie pour réaliser l’atelier au fur et mesure de la présentation sur sa machine.

Gauntlt est un framework autour de la sécurité, qui fournie des hooks pour de nombreux outils d’attaques (Xss, Sql injection etc …).

Après une introduction un peu longue autour de la place de la “sécurité” aux seins de nos services.

L’approche de Gauntlt est basée sur le “[Rugged Manifesto](https://www.ruggedsoftware.org/wp-content/uploads/2012/09/Rugged_Software_Development_20100205.pdf)”

Gauntlt permet donc d’automatiser au sein de son système d’intégration continue, des tests autour de la sécurité de son applicatif et de son infra, basés sur [Cucumber](https://cukes.info/), utilisant le langage Gherkin (que certains connaissent peut être mieux dans le monde php via [Behat](https://behat.org/)), et interfaçant des outils tels que :

- Garmr
- Nmap
- Arachni
- Sqlmap
- ...

Si vous voulez tester l’outil, qui à l’air très prometteur, vous pouvez suivre ce tutoriel : [https://bit.ly/gauntlt-demo-instructions](https://bit.ly/gauntlt-demo-instructions) qui vous fourni la Virtual Box, les consignes d’installations, et les exemples ayant été réalisés pendant la conférence, ainsi qu’une application de test en Ruby [Railsgoat](https://github.com/OWASP/railsgoat) pour servir de cible à vos tests.

[Les slides sont disponible ici](https://www.slideshare.net/wickett/gauntlt-velocity-eu2013)



<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://www.slideshare.net/slideshow/embed_code/28203152" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### Hands-on Web Performance Optimization Workshop

Andy Davies (Asteno) [@andydavies](https://twitter.com/andydavies) , Tobias Baldauf (Freelancer) [@tbaldauf](https://twitter.com/tbaldauf)

![Velocity Europe 2013 - Day 1](/tech.bedrockstreaming.com/public/images/posts/imgob/0-00-30-83-201311-ob_78440c_10845987613-5d3296cfbd-z-jpg.jpeg)

Dernière session de la journée, avec Andy et Tobias, sur un workshop axé Performance Web.

On commence par une présentation général d’un outil qu’on ne devrait plus présenter : [WebPageTest](https://www.webpagetest.org/), l’outil principal pour les problématiques de performances front-end.

Andy aborde ensuite quelques autres outils :

- [PhantomJs](https://phantomjs.org/) (un headless browser)
- [Simple Website Speed Test](https://github.com/technopagan/simple-website-speed-test)
- et surtout [Phantomas](https://github.com/macbre/phantomas), un module PhantomJs pour collecter les métriques de Webperf.
- le [wrapper Node.Js pour WebPageTest](https://github.com/marcelduran/webpagetest-api) de Marcel Duran
- [SiteSpeed.io](https://sitespeed.io/ ) pour monitorer toutes les pages de son site, basé notamment sur Yslow
- [HttpArchive](https://httparchive.org/), l’excellent service de Steve Souders qui tracke le web avec une multitude de stats intéressante, que vous pouvez d’ailleurs installer pour une instance privée afin de tracker vos sites : [https://bbinto.wordpress.com/2013/03/25/setup-your-own-http-archive-to-track-and-query-your-site-trends/](https://bbinto.wordpress.com/2013/03/25/setup-your-own-http-archive-to-track-and-query-your-site-trends/) \o/

La suite de la conférence consister a analyser en live certains sites dont quelques uns assez hilarant au niveau performance :

- Dailymail.co.uk avec ces +de 800 requêtes HTTP et 7 mo !
- Wildbit.com qui consomme un CPU énorme cause de l’animation sur le logo qu’on ne voit quasiment pas :)

Les slides :



<script async="" class="speakerdeck-embed" data-id="653d8b802f6c013193f73a251344e3e5" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>


### Conclusion :

Bonne première journée avec ce format "Tutorials" un peu trop touffu (90 minutes par conférence ...). Déjà des tonnes d'idées qui ressortent, on a hâte de voir la suite.

Retrouvez les autres CR :

- [Compte rendu du jour 2 ](/velocity-europe-2013-day-2)
- [Compte rendu du jour 3 ](/velocity-europe-2013-day-3)

© des photos : [Flickr officiel O'Reilly](https://www.flickr.com/photos/oreillyconf/with/10845987613/)

CR rédigé par Baptiste, Denis Roussel et Kenny Dits
