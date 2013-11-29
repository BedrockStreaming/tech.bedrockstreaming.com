---
layout: post
title: "CR Velocity Conference 2012 : Day 3 (DevOps/WebPerf)"
description: ""
author:
  name:           Kenny Dits
  avatar:         kenny.jpg
  email:          
  twitter:  kenny_dee      
  facebook:       
  github:    
category: 
tags: [velocity,conference,webperf,devops,mobile]
image:
  feature: 
  credit: 
  creditlink: 
comments: true  
permalink: cr-velocity-conference-2012-day-3-devops-webperf
---

Dernière journée de cette monstrueuse conférence qu'est la Vélocity Conférence.

On commence dans la joie et la bonne humeur avec la "Seven Databases Song" :D



<iframe allowfullscreen="" frameborder="0" height="360" src="http://www.youtube.com/embed/bSAc56YCOaE?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>

[![CR Velocity Conference 2012 : Day 3 (DevOps/WebPerf)](//img.over-blog-kiwi.com/100x100/0/00/30/83/201206/ob_c87fe8a6ac7c49187cc9f12cc2d87fbd_7463481656-864d3ef3b6.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201206/ob_c87fe8a6ac7c49187cc9f12cc2d87fbd_7463481656-864d3ef3b6.jpg)

#### [Mobile WebPerf] The Performance of Web vs. Apps, par Ben Galbraith (Walmart.com) & Dion Almaer (Walmart.com)

Petit sujet assez trollesque sur les WebApps vs Apps. Conférence hyper énérgétique et très drôle ! Notamment le passage 12mn dans la vidéo, où l'on compare le mode de distribution des apps natives ce que cela donnerait si les show tv devraient être distribués de la même manière en prenant l'exemple de la série Friends : Hilarant !

L'idée intéressante sur la fin du talk, concerne le rendu de l'application, qui grce [Node.js](http://nodejs.org/) (dispo désormais en v0.8.0 enfin) peut être aussi bien fait coté client que serveur suivant le client qui demande. A creuser.



<iframe allowfullscreen="" frameborder="0" height="360" src="http://www.youtube.com/embed/MksKaRpWD-o?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>

[![CR Velocity Conference 2012 : Day 3 (DevOps/WebPerf)](//img.over-blog-kiwi.com/100x100/0/00/30/83/201206/ob_218a75d9294e1b59a42b8de40cf0fe97_7463496562-a9b43ceda7.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201206/ob_218a75d9294e1b59a42b8de40cf0fe97_7463496562-a9b43ceda7.jpg)

#### [WebPerf] Akamai Internet Insights, Stephen Ludin (Akamai)

Petit talk de Stephen Ludin "Chief Architect for Akamai’s Site Acceleration and Security group".

Après une présentation assez hallucinante en quelques chiffres du traffic et des données qui passent chez Akamai :

Toutes les 60 secondes => 1 milliard 3 de logs, + de 6200 heures de vidéos streamés ...

Il a aussi partagé une initiative louable et très intéressante sur un projet de partage des données récoltées chez Akamai : [http://www.akamai.com/io](http://www.akamai.com/io)

On y observe quelques statistiques (relativement peu date) sur les browsers notamment. On voit d'ailleurs quelque chose d'assez fun sur les IE8 : chaque weekend, on apercoit une baisse de présence sur IE8 (qui se retrouve sur d'autres navigateurs plus récent) ... Bref, on voit encore que c'est le monde de l'entreprise qui ralenti la propagation des navigateurs récents !

Source :   
[http://www.akamai.com/html/io/io_dataset.html#stat=browser_ver&top=5&type=line&start=20120601&end=20120626&net=n](http://www.akamai.com/html/io/io_dataset.html#stat=browser_ver&top=5&type=line&start=20120601&end=20120626&net=n)

Et slides ici :   
[http://assets.en.oreilly.com/1/event/79/Akamai%20Internet%20Insights%20%20Presentation.pptx](http://assets.en.oreilly.com/1/event/79/Akamai%20Internet%20Insights%20%20Presentation.pptx)



[![CR Velocity Conference 2012 : Day 3 (DevOps/WebPerf)](//img.over-blog-kiwi.com/100x100/0/00/30/83/201206/ob_70c14c4d44bb2f6a9fdbbe0844236002_7463517286-4535890433.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201206/ob_70c14c4d44bb2f6a9fdbbe0844236002_7463517286-4535890433.jpg)

#### Lightning Demos, par Marcel Duran (Twitter Inc.), Nat Duca (Google), Lindsey Simon (Twist)

Ensuite, viennent trois sessions de Lightning Talk : 5 minutes pour présenter un sujet.

On commence par Marcel Duran, créateur de [Yslow](http://yslow.org/), célèbre extension WebPerf de Firebug l'origine, qui fait son petit bonhomme de chemin depuis :

- Disponible dans quasiment tous les browsers
- Ruleset personnalisable (cf C3PO voir plus bas)
- Une version en ligne de commande (en Node.Js) pour extraire les données YSlow partir d'un [HAR](http://www.softwareishard.com/blog/har-12-spec/) : [https://github.com/marcelduran/yslow/wiki/Command-Line-%28HAR%29](https://github.com/marcelduran/yslow/wiki/Command-Line-%28HAR%29)
- Un serveur Node.js que vous pouvez tester ici nécessitant aussi un HAR : [http://yslow.nodester.com/](http://yslow.nodester.com/)
- et le meilleur pour la fin, une version pour [Phantom.Js](http://phantomjs.org/) (Projet très impressionnant d'Headless Browser) qui vous permet de simplement mentionner l'url et d'avoir le résultât en sortie ! Avec en plus la possibilité via le format TAP (Test Any Protocol), d'intégrer les résultats dans votre Intégration Continue pour éviter les régressions. Juste ultime, tout est expliqué sur ce Github : [https://github.com/marcelduran/yslow/wiki/PhantomJS](https://github.com/marcelduran/yslow/wiki/PhantomJS)

J'ai hâte d'implémenter tout ca chez M6Web :) Une vidéo voir donc absolument :



<iframe allowfullscreen="" frameborder="0" height="360" src="http://www.youtube.com/embed/XocIVwbfc1k?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>

[![CR Velocity Conference 2012 : Day 3 (DevOps/WebPerf)](//img.over-blog-kiwi.com/100x100/0/00/30/83/201206/ob_d1bfe38f11917cc31b0d4fd0f08cac7b_7463519022-0409c109a6.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201206/ob_d1bfe38f11917cc31b0d4fd0f08cac7b_7463519022-0409c109a6.jpg)On continue dans le lourd, avec Nat Duca qui travaille sur le développement du navigateur Chrome et qui nous démontrer une feature très bas niveau mais au combien intéressante : le [chrome://tracing/](chrome://tracing/)

Cette fonctionnalité va vous permettre de profiler les actions du navigateur au plus bas niveau possible. Encore un excellent nouvel ajout au niveau du panel d'outillage du browser Chrome destination des développeurs. Voir vidéo ci dessous :



<iframe allowfullscreen="" frameborder="0" height="360" src="http://www.youtube.com/embed/g19aMgHCfWU?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>

[![CR Velocity Conference 2012 : Day 3 (DevOps/WebPerf)](//img.over-blog-kiwi.com/100x100/0/00/30/83/201206/ob_aec323c5a0120e6b37d13474f27fd92c_7463521554-208853eee0.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201206/ob_aec323c5a0120e6b37d13474f27fd92c_7463521554-208853eee0.jpg)Et pour finir cette jolie session de Lightning Talk, Lindsey Simon, nous présenté Browserscope : [http://www.browserscope.org/](http://www.browserscope.org/)

Outil dont la puissance et l'interêt pour tout développeurs Front-end Desktop ou Mobile n'est plus démontrer.

Si vous ne connaissez pas, passez 5 minutes de votre temps sur cette vidéo :



<iframe allowfullscreen="" frameborder="0" height="360" src="http://www.youtube.com/embed/RwvcjPE2Rm0?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



#### [WebPerf] Browsers, par Luz Caballero (Opera Software), Tony Gentilcore (Google), Taras Glek (Mozilla Corporation)

Petite déception sur cette classique des Vélocity, où les talks ce sont plutôt concentré sur les nouveautés des browsers mobile de Google et Opéra Mini, et où le gars de Mozilla n'a pas jouer le jeu et préféré parler de la lenteur du SetTimeout Javascript ainsi que de l'api LocalStorage ...

Slide Mozilla :   
[http://people.mozilla.com/~tglek/velocity2012/#/step-1](http://people.mozilla.com/~tglek/velocity2012/#/step-1)

Slide Opéra mini avec notes :   
[http://www.slideshare.net/gerbille/speed-in-the-opera-mobile-browsers-13476236](http://www.slideshare.net/gerbille/speed-in-the-opera-mobile-browsers-13476236)

Concernant Google, la conférence par Tony Gentilcore (créateur de FasterFox pour ceux qui ce souviennent) était plus intéressante, déja par l'annonce suivante :



> Chrome for Android will be the default browser starting with Jelly Bean

 Tony Gentilcore


Il a aussi parlé du fonctionnement de WebKit, du Compositor Thread, ainsi que du [Chrome Remote Debugging](http://wesbos.com/remote-debugging-mobile-chrome-android/)

Pour info, Google a peu de temps après annoncé [la présence de Chrome sur iOs !](https://twitter.com/googlechrome/status/218394457257684993)



[![CR Velocity Conference 2012 : Day 3 (DevOps/WebPerf)](//img.over-blog-kiwi.com/100x100/0/00/30/83/201206/ob_446bc270405c9fecc24fbb896f3d2c2b_7463404328-9e07929318.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201206/ob_446bc270405c9fecc24fbb896f3d2c2b_7463404328-9e07929318.jpg)

#### [DevOps] Simple log analysis and trending, par Mike Brittain (Etsy)

On retrouve Mike sur un sujet un peu différent : Comment analyser des logs Apache pour en sortir des graphites. Quelques astuces sur la fonction PHP [apache_note()](http://us.php.net/apache_note) sont mentionnées, sur le traitement des logs avec les commandes linux "awk" et "sed", et l'utilisation assez étonnante de Gnuplot pour grapher : [http://www.gnuplot.info/](http://www.gnuplot.info/) !

Les slides sont dispos ici : [http://www.mikebrittain.com/blog/2012/06/22/velocity-2012/](http://www.mikebrittain.com/blog/2012/06/22/velocity-2012/) , et les codes d'exemples sur Github : [https://github.com/mikebrittain/presents](https://github.com/mikebrittain/presents)

Encore pas mal d'idées piocher ! (Ca commence faire beaucoup d'idées ...)



[![CR Velocity Conference 2012 : Day 3 (DevOps/WebPerf)](//img.over-blog-kiwi.com/100x100/0/00/30/83/201206/ob_fa36924d27b6c6ab21f88ffb9d4131e8_awbr9nzceaait8y.jpg)](http://img.over-blog-kiwi.com/0/00/30/83/201206/ob_fa36924d27b6c6ab21f88ffb9d4131e8_awbr9nzceaait8y.jpg)

#### [WebPerf] Social Button BFFs, par Stoyan Stefanov (Facebook)

Stoyan n'est plus présenter dans l'industrie des performances web. Il est désormais chez Facebook, travailler sur les performances des plugins, dont le "Like" ! Suivez le sur Twitter, c'est bourré de superbes infos [@stoyanstefanov](https://twitter.com/stoyanstefanov) ainsi que son blog : [http://www.phpied.com/](http://www.phpied.com/) !

L'idée du talk est de faire en sorte que les boutons sociaux (et widgets tiers) en général, deviennent vos BFF ! (Best Friend Forever :D) : [http://www.phpied.com/social-button-bffs/](http://www.phpied.com/social-button-bffs/)

Il explique de quel manière doit-on intégrer ces widgets sur nos sites, et vous permet de le vérifier par l'extension Chrome qu'il a développé [3PO#Fail](http://http://www.phpied.com/3po-fail/) (3PO = 3rd Party Optimization) ou via une [extension de RuleSet pour YSlow](http://www.phpied.com/3po/).

Les slides ici : [http://www.slideshare.net/stoyan/social-button-bffs](http://www.slideshare.net/stoyan/social-button-bffs)



> Friends don't let friends do document.write

 Stoyan Stefanov




#### [WebPerf] 5 Essential Tools for UI Performance, par Nicole Sullivan (Stubbornella)

Encore un excellent talk pour ce dernier jour avec Nicolas Sullivan, Experte et consultante dans l'optimisation CSS, sur le fonctionnement très précis de la gestion des CSS par vos navigateurs et toutes les optimisations récentes qu'ils y ont apportées, ainsi qu'une démo (qui fait toujours son petit effet dans une salle Geek) de Tilt sur Firefox

Les slides ne sont malheuresement pas encore en ligne, mais cela ne devrait tarder sur [son Slideshare](http://www.slideshare.net/stubbornella/).

Vous pouvez retrouvez l'idée du talk sur l'interview ci dessous réalisée elle aussi lors de la Vélocity.



<iframe allowfullscreen="" frameborder="0" height="360" src="http://www.youtube.com/embed/TqoHng448TQ?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



#### Conclusion

Voil, c'est terminé pour ce compte rendu en 3 actes de ce que j'ai vécu et retenu cette Vélocity Conférence 2012. François prendra le relais pour présenter sa vision d'autres talks, mais orientés Ops (Sysadmin).

J'espère que ces comptes rendu auront servi partager quelques outils, liens ou best practices qui vous donnerons des tonnes d'idées de nouvelles choses faire coté Web dans votre société. De mon coté, comme la Vélocity Berlin l'année dernière, j'ai appris beaucoup et apprécié une grande partie des conférences. Cette conf reste pour moi (et nous chez M6Web) la plus importante au monde sur les aspects de Performance.

Pour finir, je vous remercie pour vos retours (et je vous invite continuer m'en faire un maximum) et lectures. Vous pouvez en connaitre d'avantage sur les autres talks avec quelques vidéos gratuite disponible sur   
[http://www.youtube.com/playlist?list=PL80D9129677893FD8](http://www.youtube.com/playlist?list=PL80D9129677893FD8), Ainsi que les slides qui continuent d'arriver sur  
[http://velocityconf.com/velocity2012/public/schedule/proceedings](http://velocityconf.com/velocity2012/public/schedule/proceedings)

Et pour ceux que ca intéresse, sachez que Oreilly mettra disposition un pack complet des vidéos pour généralement un tarif autour des 400$, et qu'une Vélocity Europe aura lieu Londres les 3 et 4 octobre 2012.

Merci tous !

- CR Vélocity Day 1 : [http://tech.m6web.fr/cr-velocity-conference-day-1-dev-webperf](http://tech.m6web.fr/cr-velocity-conference-day-1-dev-webperf)
- CR Vélocity Day 2 : [http://tech.m6web.fr/cr-velocity-conference-2012-day-2-devops-webperf](http://http://tech.m6web.fr/cr-velocity-conference-2012-day-2-devops-webperf)

*(Crédit photo : [http://www.flickr.com/photos/oreillyconf/sets/72157630300659948/](http://http://www.flickr.com/photos/oreillyconf/sets/72157630300659948/))*



[![Le Job Board assez hallucinant !](http://img.over-blog-kiwi.com/0/00/30/83/201206/ob_d6f865d423c79df6f3582055b10f7372_img-0751.JPG)](http://img.over-blog-kiwi.com/0/00/30/83/201206/ob_d6f865d423c79df6f3582055b10f7372_img-0751.JPG)
Le Job Board assez hallucinant !


