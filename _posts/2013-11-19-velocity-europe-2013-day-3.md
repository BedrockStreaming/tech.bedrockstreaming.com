---
layout: post
title: "Velocity Europe 2013 - Day 3"
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
permalink: velocity-europe-2013-day-3.html
---

[![Velocity Europe 2013 - Day 3](//img.over-blog-kiwi.com/300x300/0/00/30/83/201311/ob_7a35dd_10859619405-c7d5058073-z-jpg.jpeg)](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_7a35dd_10859619405-c7d5058073-z-jpg.jpeg)Dernière journée de cette Velocity Europe, avec en plus du track Performance et Ops, l'ouverture d'un track Culture.

Pour rappel, si vous les avez ratés, les CR des journées précédentes sont retrouver ici :

- 
- [CR Velocity Europe 2013 - Day 1](http://tech.m6web.fr/velocity-europe-2013-day-1.html)
- [CR Velocity Europe 2013 - Day 2](http://tech.m6web.fr/velocity-europe-2013-day-2.html)

Pour ce "Day 3", nous nous retrouvons tous dans la grande salle avec la vidéo "Slow Motion Water Balloon Fight" en guise d'introduction :



<iframe allowfullscreen="" frameborder="0" height="480" src="http://www.youtube.com/embed/Xz5z1hBxejg?wmode=transparent&feature=oembed" width="854"></iframe>

[![Velocity Europe 2013 - Day 3](//img.over-blog-kiwi.com/300x300/0/00/30/83/201311/ob_83fbcc_10870287065-71abb508d2-z-jpg.jpeg)](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_83fbcc_10870287065-71abb508d2-z-jpg.jpeg)

### Extreme Image Optimisation: WebP & JPEG XR

Ido Safruti (Akamai) [@safruti](https://twitter.com/safruti)

A ce jour, d’après HTTP Archive, 62% du poids des pages Web correspond aux images sur desktop, 65% sur mobile.

Nous utilisons toujours des technos vieilles de plus de 15 ans ! Jpg, Png, Gif …



> Deploying new image formats on the web is HARD (but doable)

 Ilya Grigorik


La conférence traite de deux formats bien plus récents :

- WebP (2011)
- JXR : Jpeg eXtended Range (2009)

qui supportent le lossless et lossy, ainsi que la transparence (en lossless et lossy aussi)

On retrouve un tableau très intéressant sur une comparaison taille entre les différents formats sur un même niveau de qualité :



[![Velocity Europe 2013 - Day 3](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_49b545_velocity-europe-conference-2013-ido-safruti-extre.png)](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_49b545_velocity-europe-conference-2013-ido-safruti-extre.png)

Attention, certaines fois (quelques %), l’image peut être plus grosse qu’en jpg. Si vous partez du Jpg pour la compression, comparez les tailles et affichez le Jpg s'il est plus petit.

Le support de ces formats reste toutefois minime :

- WebP : Chrome >= 23, Opera >= 12, …
- Jpeg XR : IE => 10, …

JXR, gère notamment le progressive, ce que ne gère pas encore date WebP. [Plus d’infos sur les "progressives Jpeg" sur le blog de Patrick Meenan](http://blog.patrickmeenan.com/2013/06/progressive-jpegs-ftw.html) (Créateur de WebPageTest).

Une petite anecdote intéressante sur WebP aussi. [Facebook avait mis en place WebP mais est revenu en arrière car les utilisateurs râlaient !](http://news.cnet.com/8301-1023_3-57580664-93/facebook-tries-googles-webp-image-format-users-squawk/) Quand ils enregistraient ou partageait une photo de Chrome (donc en WebP), les utilisateurs IE notamment, ne pouvaient pas la consulter …

Ido fera un article sur l’incontournable calendrier de l’avant sur le sujet : [Performance Calendar](http://calendar.perfplanet.com/) en décembre 2013 !



<iframe allowfullscreen="" frameborder="0" height="480" src="http://www.youtube.com/embed/Y5ZOogjHpbk?wmode=transparent&feature=oembed" width="854"></iframe>

[![Velocity Europe 2013 - Day 3](//img.over-blog-kiwi.com/300x300/0/00/30/83/201311/ob_f3d7fc_10870619623-7206f4978b-z-jpg.jpeg)](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_f3d7fc_10870619623-7206f4978b-z-jpg.jpeg)

### SLOWING DOWN TO GO FASTER: Responsive Web Design And The Problem Of Agility vs Robustness

Tom Maslen (BBC News) [@tmaslen](https://twitter.com/tmaslen)

Gros retour d’expérience des équipes de BBC News sur leur approche du “Responsive Web Design”, et sur la manière dont cela a impacté leurs workflows, ainsi que leur culture.

Le RWD prend du temps, beaucoup plus de temps (3x), sur le Design, le développement, le test.

Tom parcourt les optimisations “classiques”, ainsi que la manière dont ils enrichissent l'expérience : Ils délivrent une “Core Experience” tous, et une “Enhanced Experience” aux navigateurs qui le supportent, utilisent Grunt pour certaines automatisations (pour fournir les bonnes images la bonne taille [https://github.com/BBC-News/Imager.js/](https://github.com/BBC-News/Imager.js/), versionner les assets [https://github.com/kswedberg/grunt-version](https://github.com/kswedberg/grunt-version) …).

Vous pouvez aussi découvrir [Wraith, leur outil de comparaison de screeshot Responsive](https://github.com/BBC-News/wraith).

Bref, une excellente conférence avec un très bon speaker (très drôle sur la fin).



> Don’t do whoopsies on other people things

 Tom Maslen


<iframe allowfullscreen="" frameborder="0" height="480" src="http://www.youtube.com/embed/2U3joc9NaY4?wmode=transparent&feature=oembed" width="854"></iframe>

[![Velocity Europe 2013 - Day 3](//img.over-blog-kiwi.com/300x300/0/00/30/83/201311/ob_e392e8_10870291155-f1cf4c71f0-z-jpg.jpeg)](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_e392e8_10870291155-f1cf4c71f0-z-jpg.jpeg)

### An Introduction to Code Club

John Wards (White October)

Code Club est un projet leadé par des bénévoles pour créer des clubs de coding dans les écoles, pour des enfants entre 9 et 11 ans. Plus de 1400 clubs ont déjété créés en Angleterre !

Les enfants utilisent le projet [Scratch](http://scratch.mit.edu/), et qui permet via un langage de programmation assez simple, de programmer des jeux.

Leurs vidéos de présentation sont de plus assez fun, notamment celle ci, qui nous été montrée, 6mn50 dans la vidéo ci dessous :



<iframe allowfullscreen="" frameborder="0" height="480" src="http://www.youtube.com/embed/NkowNBKEwIc?wmode=transparent&feature=oembed" width="854"></iframe>

[![Velocity Europe 2013 - Day 3](//img.over-blog-kiwi.com/300x300/0/00/30/83/201311/ob_25cc44_10870324686-efa10b2d4b-z-jpg.jpeg)](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_25cc44_10870324686-efa10b2d4b-z-jpg.jpeg)

### Lightning Demo: Automating WebPagetest with wpt-script

Jonathan Klein (Etsy) @jonathanklein

Afin d’automatiser la prise de mesure synthétique l’aide de WebPageTest (notamment si vous avez installé une instance privée), les gars d’Etsy ont développé un wrapper Php l’Api de Webpagetest. Le wrapper permet aussi de pousser les résultats dans un Graphite ou un Splunk.

L'outil est dispo sur Github : [Wpt-Script](https://github.com/etsy/wpt-script)



<iframe allowfullscreen="" frameborder="0" height="480" src="http://www.youtube.com/embed/RjHh6ULFHiM?wmode=transparent&feature=oembed" width="854"></iframe>

[![Velocity Europe 2013 - Day 3](//img.over-blog-kiwi.com/300x300/0/00/30/83/201311/ob_2962da_10870434124-fc7186bde4-z-jpg.jpeg)](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_2962da_10870434124-fc7186bde4-z-jpg.jpeg)

### Lightning Demo: Introducing a New RUM Resource From SOASTA

Buddy Brewer (SOASTA)

SOASTA, société connue notamment pour avoir racheté LogNormal (outil de R.U.M. l’année dernière), propose aujourd’hui un outil de R.U.M. nommé : mPulse.

Ils ont publié de nombreuses statistiques sur leur site, sur les performances, suivant le navigateur, la localité etc : [http://www.soasta.com/summary/](http://www.soasta.com/summary/)



<iframe allowfullscreen="" frameborder="0" height="480" src="http://www.youtube.com/embed/OnB_u8ups-M?wmode=transparent&feature=oembed" width="854"></iframe>

[![Velocity Europe 2013 - Day 3](//img.over-blog-kiwi.com/300x300/0/00/30/83/201311/ob_b7cfdc_10870320786-34a7898e71-z-jpg.jpeg)](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_b7cfdc_10870320786-34a7898e71-z-jpg.jpeg)

### Lightning Demo: Automating The Removal Of Unused CSS

Addy Osmani (Google Chrome) [@addyosmani](https://twitter.com/addyosmani)

L’un des petits problèmes récurrents du développement web est situé dans nos fichiers Css. A force d’ajout de fonctionnalités ou de framework (notamment les fameux frameworks Css, Bootstrap & co), on finit par obtenir des fichiers CSS gigantesques, dans lesquels il devient très compliqué de savoir ce qui est utilisé ou pas sur votre site.

Addy présente des solutions qu’on peut retrouver :

- pour un nettoyage mono page, dans la DevTools de Chrome (Onglet Audit puis Run puis “Remove Unused Css Rules”)
- pour un nettoyage d’un site complet, via des outils autour de Grunt, notamment Grunt Uncss [https://github.com/addyosmani/grunt-uncss](https://github.com/addyosmani/grunt-uncss) fait par Addy en personne, basé sur le module Uncss de Giakki



<iframe allowfullscreen="" frameborder="0" height="480" src="http://www.youtube.com/embed/833xr1MyE30?wmode=transparent&feature=oembed" width="854"></iframe>

[![Velocity Europe 2013 - Day 3](//img.over-blog-kiwi.com/300x300/0/00/30/83/201311/ob_1afdd2_10871075694-de275f1bd3-z-jpg.jpeg)](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_1afdd2_10871075694-de275f1bd3-z-jpg.jpeg)

### Learning from the Worst of WebPagetest

Rick Viscomi (Google)

Rick travaille pour YouTube chez Google, comme WebDéveloppeur Front-end orienté performance.

Sa passion, se moquer des mauvais résultats sur les historiques du WPT public :-)

C’est d’ailleurs pour lui, l’une des bonnes sources pour découvrir les “anti-patterns” de la perf, et les choses ne pas faire.

Il présente une Pull Request en cours sur WebPageTest avec le Multi Variate Testing, permettant de tester tout un site, sur plusieurs localités. Plus d’infos sur l’article de son blog sur le sujet : [http://jrvis.com/blog/wpt-mvt/](http://jrvis.com/blog/wpt-mvt/)



[![Velocity Europe 2013 - Day 3](//img.over-blog-kiwi.com/300x300/0/00/30/83/201311/ob_4a78f0_10845987613-5d3296cfbd-z-jpg.jpeg)](http://img.over-blog-kiwi.com/0/00/30/83/201311/ob_4a78f0_10845987613-5d3296cfbd-z-jpg.jpeg)

### Are today’s good practices … tomorrows performance anti-patterns

Andy Davies [@andydavies​](https://twitter.com/andydavies)

Avec l’arrivée d’HTTP 2.0, on se demande, si les optimisations WebPerf que nous réalisons aujourd’hui ne seront pas gênantes demain : Les dataURI, le JS inline, le domain sharding, les sprites ...

Les réponses ne sont pas aussi simples, et nous “développeurs” nous devons de nous poser les questions afin d’avoir les bonnes réponses avant l’arrivée d’HTTP 2.0. Andy le mérite de lancer le débat, via des protocoles de test pour chacun des cas. en comparant HTTP 1.0 et SPDY.



<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="http://www.slideshare.net/slideshow/embed_code/28286548" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### Provisioning the Future - Building and Managing High Performance Compute Clusters in the Cloud

Marc Cohen, Mandy Waite (Google)

Marc et Mandy nous ont présenté le Google Cloud, alternative AWS. Basé sur du KVM hautement modifié par les équipes de Google, on retrouve grossièrement des services identiques (stockage élastique persistent, SDN pour le réseau, load-balancing, des profils de machines highmem ou highcpu). Toutefois on notera l'absence d'un marketplace pour les images des VMs et seules Debian et Centos sont disponibles. Énorme avantage par rapport AWS: la facturation la minute au bout de 15min ! Mandy nous a fait la démo du lancement de 1000 Vms en 2min15. Google fournit une api complète et un outil en ligne de commande pour piloter absolument tout: [gcutil](https://developers.google.com/compute/docs/gcutil/).





### Security Monitoring (With Open Source Penetration Testing Tools)

Gareth Rushgrove (Government Digital Service)

Combien d'entre nous testent la sécurité de leur applicatif en continu ? Elle devrait pourtant faire partie de l'assurance qualité du développement d'un logiciel. Gareth propose donc d'ajouter des tests de sécurité via Jenkins et des tests unitaires dans notre pipeline de développement. Parmis la liste d'outils (rkhunter, naxsi, logstash, fail2ban, auditd, la distrib BackTrack, clamav, Arachni) certains sont aisément intégrables au workflow. A tester le très bon [OWASP ZAP](https://code.google.com/p/zaproxy/) (et [http://www.dvwa.co.uk/](http://www.dvwa.co.uk/) pour se faire la main !).

Les slides :



<script async="" class="speakerdeck-embed" data-id="fae58a5031fc01315fdd4eb0834efac2" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>


### Beyond Pretty Charts…. Analytics for the cloud infrastructure

Toufic Boubez (Metafor Software) [@tboubez](https://twitter.com/tboubez)

Toufic travaille depuis 20 ans dans la gestion des données des datacenters et la détection d'anomalies. Comme lors de la présentation de Twitter il explique qu'on ne peut pas appliquer ces données temporelles des méthodes statistiques classiques (holt winter forecast, régression linéaire, smooth splines), car elles sont non stationnaires (violant ainsi le principe d'homogénéité) et la plupart du temps elles ne sont pas distribués normalement (principal pré-requis). Il nous a donc présenté le test de Kolmogorov-Smirnov couplé aux techniques de bootstraping qui permet d'avoir des prédictions assez fiables. Comme les modèles ARIMA, il fait partie de la famille des méthodes statistiques non paramétriques, qui ne présupposent pas de la distribution des données)

Les slides :



<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="http://www.slideshare.net/slideshow/embed_code/28310872" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### Automated Multi-Platform Golden Image Creation, Unlocking New Potential

Mitchell Hashimoto (HashiCorp) [@mitchellh](https://twitter.com/mitchellh)

Avoir un environnement stable, clonable depuis la dev vers la prod est le rêve conjoint des développeurs et sysadmins. L'utilisation des images pour le déploiement de machines et de code peut être fastidieux, au moindre changement de version il faut instancier l'image, faire la modification, recréer l'image etc...Ce qui n'est pas forcement adapté au cloud computing et la virtualisation. A l'inverse n'utiliser que des logiciels de gestion de la configuration (Cfengine, Puppet, Chef) ne certifie pas qu'un serveur vierge aura le même comportement qu'un serveur sur lequel on aura passé 10.000 modifications. Il m’arrive régulièrement d'avoir des erreurs de run puppet cause d'une dépendance non satisfaite (packages) ou de problèmes réseau, (le plus souvent on souffre de la lenteur d'application d'un profil puppet).

De plus passé du [VMWare](http://www.vmware.com/fr/) du [AWS](http://aws.amazon.com/fr/) ou [Vagrant](http://www.vagrantup.com/) demande d'avoir autant d'images que de plateforme ! Ce saint graal du "serveur immuable" et agnostique de la plateforme est possible en utilisant une méthode intermédiaire : Packer permet de créer des images (Aws, Virtualbox, VMWare) partir d'une source et avec l'aide d'un chef/puppet/cfengine. Le workflow proposé est le suivant: commit dans le repository => build avec [Packer](http://www.packer.io/) => CI (Jenkins) => Image ready !

Cela permet de garder la flexibilité d'un Puppet avec l'idempotence des images et leur facilité, rapidité de déploiement.

L'orchestration peut être réalisée avec Serf, il implémente un protocole Gossip (tout le monde se parle, mais pas en même temps). C'est un agent installé sur le serveur qui gère des messages et des handlers (scripts personnalisés dans le langage de votre choix). Dans l'exemple de déploiement de multiples load balancer, l'image va permettre d'avoir un système fonctionnel rapidement, les utilisateurs, les logiciels et c'est Serf qui récupérera la configuration appliquer au load balancer.

On peut aller plus loin en déployant les code avec [Docker](https://www.docker.io/), ce qui ajoute une couche d'abstraction supplémentaire extrêmement puissante.





### DOM to Pixels: Accelerate Your Rendering Performance

Paul Lewis (Google - Team Chrome) [@aerotwist](https://twitter.com/aerotwist)

Paul Lewis explique quelques principes mis en oeuvre lors du rendu graphique dans Chrome tel que la gestion des calques qui permet d'utiliser plus intensément la puissance du GPU mais dont la multiplication peut s'avérer contre productive : la gestion de trop nombreux calques par le CPU contrebalance la performance du rendu par le GPU (évidemment, sinon cela serait trop simple).

Pour bien appréhender cette présentation, il m'a semblé nécessaire d'avoir un petit background dans la programmation graphique : savoir, par exemple, pourquoi une ombre ou un flou sont couteux pour le rendu (cause des calculs entre les différentes zones de mémoire contenant les informations graphiques superposer).

Paul présente ensuite en détail l'[outil de debug du rendu](http://www.youtube.com/watch?v=Vp524yo0p44) dans les WebTools : comment enregistrer en temps réel les différentes frames affichées par Chrome et visualiser les différents temps de calculs.

Cette présentation, bien que très intéressante par son contenu fut aussi mise en valeur par l'interprétation de Paul Lewis : toujours précise mais simple, sérieuse et fun la fois.  
 Ce fût pour moi, la meilleure présentation (show!) de la Vélocity.  
  
 Et n'oubliez pas :



> Tools, not rules

 Paul Lewis




### Conclusion :

Epuisé par trois jours de conférence d'une densité incroyable, La Velocity a encore aisément tenu toute ses promesses.

Nous espérons que ces comptes-rendus vous auront été utile, autant que les présentations nous l'ont été.

N'hésitez pas commenter l'un des CR pour donner votre avis, sur le CR, ou sur certains points couvert par les Talks.

Merci.

Vous pouvez retrouver :

- [quelques vidéos de la conférence sur Youtube](https://www.youtube.com/playlist?list=PL055Epbe6d5bfvFqHGHroAAbzHerXNQC4)
- [les slides sur le site d'Oreilly](http://velocityconf.com/velocityeu2013/public/schedule/proceedings)
- et les photos ici sur Flickr : http://www.flickr.com/photos/oreillyconf/sets/72157637657689424/



