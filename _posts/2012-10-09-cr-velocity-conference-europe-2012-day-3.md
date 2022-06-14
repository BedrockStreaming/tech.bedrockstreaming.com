---
layout: post
title: "CR Velocity Conférence Europe 2012 : Day 3"
description: ""
author: kenny 
category: 
tags: [conference,velocity,webperf,mobile,devops]
comments: true  
permalink: cr-velocity-conference-europe-2012-day-3
---

![CR Velocity Conférence Europe 2012 : Day 3](/images/posts/imgob/0-00-30-83-201210-ob_df8e6a600183b00e13ed9ae49d68e1e1_allspaw-souders-jpg.jpg)

Troisième et dernière journée la Vélocity Europe.

On arrive déjà fatigué et gavé d'informations et idées en tout genre, mais on a hâte de démarrer cette journée ! :-)





### [Mobile] The Performance of Web Vs Apps, par Ben Galbraith et Dion Almaer (Walmart.com)

Ben ([@bgalbs](https://twitter.com/bgalbs)) et Dion ([@dalmaer](https://twitter.com/dalmaer)) nous reprennent dans les grandes lignes, la conférence faite la Vélocity Us (voir le CR + la vidéo de ce talk : [https://tech.bedrockstreaming.com/cr-velocity-conference-2012-day-3-devops-webperf](/cr-velocity-conference-2012-day-3-devops-webperf) )

L'idée est de comparer les experiences possibles sur WebApp et Apps Native, avec toujours cette comparaison très drôle entre le mode de distribution des apps natives ce que cela donnerait si les show tv devraient être distribués de la même manière en prenant l'exemple de la série Friends : Hilarant !

Voir la vidéo ci-dessous vers 17min 30 :



![Ben Galbraith et Dion Almaer (Source : https://royal.pingdom.com/2012/10/05/report-from-velocity-europe-day-3/ )](/images/posts/imgob/0-00-30-83-201210-ob_217722ac6f1101dfc98f3303ee4ee09b_walmart-jpg.jpg)

Ben Galbraith et Dion Almaer (Source : https://royal.pingdom.com/2012/10/05/report-from-velocity-europe-day-3/ )


<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/WrhNGlxzm_4?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



### [WebPerf] Lightning Démos, par Steve Souders et Patrick Meenan (Google)

Patrick nous a montré les derniers ajouts intéressants de [WebPageTest.org](https://WebPageTest.org), avec notamment le "Block Ads Feature", l'onglet "SPOF" dans les paramètres avancés pour tester si nos scripts tiers sont des SPOF sur nos sites (j'y reviendrai) ... L'outil s'enrichit progressivement et reste toujours LA référence ultime du domaine !



<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/X0npWAJ7xfM?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>

Steve Souders de son côté, est revenu sur un cas étudié la veille, à savoir l'implémentation d'un LazyLoader sur un caroussel, afin de déterminé via Browserscope.js si cela repoussait le OnLoad event, et c'est le cas !

Petite parenthèse sur les caroussels, je vous invite lire cet article : [Don’t Use Automatic Image Sliders or Carousels, Ignore the Fad](https://conversionxl.com/dont-use-automatic-image-sliders-or-carousels-ignore-the-fad/)



<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/jQEnc5OUu6o?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



### [WebPerf] Do All Users Benefit Equally from Web Performance Optimizations? , par Arnaud Becart (ip-label)

Talk sponsorisé assez intéressant, qui étudie les données récoltées par Ip-label afin de voir si tout le monde profite de la WebPerf de la même manière. La réponse est évidente, mais c'est intéressant de rappeler qu'il faut toujours comparer tests synthétiques au réel, et qu'en fonction du navigateur, du terminal, de la puissance de votre machine, ..., des optimisations WebPerf auront un impact différent, du négatif au très positif.



<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/-Ff5qhVG9Q4?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



### [DevOps] From DevOps to Operation Science, par Christopher Brown (Opscode)

Son twitter : [@skeptomai](https://twitter.com/skeptomai)

Talk orienté "Culture" intéressant par l'un des créateurs de EC2. Mon moment d'absence de la journée :)



<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/veumR8l07uc?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



### [WebPerf] Performance and Metrics on lonelyplanet.com, par Mark Jennings et Dave Nolan (Lonely Planet)

Retour d'experience des gars de Lonelyplanet (sorte de Routard) très enrichissant. Notamment sur la façon de communiquer à des équipes non techniques, les différentes expérimentations réalisées, et le changement de culture opéré, l'utilisation de Graphite avec notamment les Holt-Winters ...

> "Being Right isn't Always Enough" !

> "Give your metrics a public presence"

Les slides : [https://fr.slideshare.net/mbjenn/performance-and-metrics-at-lonely-planet-14589911](https://fr.slideshare.net/mbjenn/performance-and-metrics-at-lonely-planet-14589911)



![Mark Jennings et Dave Nolan (Source : https://twitter.com/smcinnes/status/253805752312033280/photo/1 )](/images/posts/imgob/0-00-30-83-201210-ob_08cafe_a4wy-kzccaamulr-jpg-large.jpg)

Mark Jennings et Dave Nolan (Source : https://twitter.com/smcinnes/status/253805752312033280/photo/1 )


<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://fr.slideshare.net/slideshow/embed_code/14589911" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### [WebPerf] Third-Party Scripts and You, par Patrick Meenan (Google)

Patrick Meenan nous parle ici de SPOF (Single Point Of Failure ou Point Individuel De Defaillance en français ...) et des 3rd party scripts.

L'idée est de montrer comment suivant l'intégration Javascript de scripts tiers, vous pouvez rendre l'affichage de votre site dépendant du bon fonctionnement des serveurs du script tiers.

Les navigateurs mettent en général 20 secondes (45 sous mac et linux) avant de rejeter une connexion sur un script tiers en rade. Vous pouvez voir des vidéos de l'effet que ça peut avoir sur vos pages dans les slides.

Afin de les détecter, il existe l'extension SPOF-O-Matic :

[https://chrome.google.com/webstore/detail/spof-o-matic/plikhggfbplemddobondkeogomgoodeg](https://chrome.google.com/webstore/detail/spof-o-matic/plikhggfbplemddobondkeogomgoodeg)

En surfant, vous saurez rapidement si un SPOF est présent sur votre site ou non et combien de contenu il bloque, et pourrez générer un WebPageTest comparatif en simulant le plantage du script en question (Redirection sur domaine blackhole.webpagetest.org)

Pour régler ces problèmes, plusieurs solutions : Script à charger dynamiquement via Js de manière asynchrone, script avec async et defer, ou au pire, script avant le /body.

Les slides : [https://www.slideshare.net/patrickmeenan/velocity-eu-2012-third-party-scripts-and-you](https://www.slideshare.net/patrickmeenan/velocity-eu-2012-third-party-scripts-and-you)



<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://fr.slideshare.net/slideshow/embed_code/14589629" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### [Ops] How Draw Something Absorbed 50 Million New Users, in 50 Days, with Zero Downtime, par J Chris Anderson (Couchbase)

Nous arrivons à l'entrée de la salle où a lieu cette présentation, barré par des commerciaux CouchBase, nous empéchant de rentrer sans prendre le prospectus CouchBase et sans se faire scanner son QRcode présent sur nos badges ... ça commence mal ...

Au bout de 2 minutes de talk par J Chris Anderson ( [@jchris](https://twitter.com/jchris) ) , co-fondateur de Couchbase, le malaise est confirmé : on ne parlera pas ici de Draw Something, mais de Couchbase 2.0 uniquement, le nom Draw Something n'étant là que pour appâter du client potentiel, et ça marche, la salle est comble ...

Difficile du coup d'être concentré dans cette approche plus que douteuse ... les questions au final seront aussi assez violentes sur le sujet : "pourquoi appâter les gens avec Draw Something, si ça n'est que pour parler de CouchBase ?" La réponse est évasive ... Nous n'avons pas eu le droit d'en parler ...

Bref, le produit Couchbase a tout de meme l'air très intéressant, et plutôt costaud, avec de très chouettes Dashboard de monitoring temps réels built-in.

J'en sors quand même avec l'impression très désagréable de m'être fait piéger ...

Les slides (non dispo) ressemblait fortement à cette autre présentation de J Chris : [https://speakerdeck.com/u/jchris/p/nosql-landscape-speed-scale-and-json](https://speakerdeck.com/u/jchris/p/nosql-landscape-speed-scale-and-json)



<script async="" class="speakerdeck-embed" data-id="50700e16240f51000207a107" data-ratio="1.299492385786802" src="//speakerdeck.com/assets/embed.js"></script>


### [WebPerf] WebPagetest - Beyond the Basics, par Aaron Peters (Turbobytes), Andy Davies (Asteno)

Pas mal de conférences parlaient de WebPageTest, mais celle-ci promettait d'aller en profondeur. Le créateur n'a jamais caché son manque de talent pour les interfaces, et WPT regorge de richesses en tout genre cachées dans les méandres de ses pages :-)

Enormement d'informations et tips sont donc présents dans les slides de cette conférence.

Pour rappel : instruction d'Andy pour monter une instance privée de WPT : [https://andydavies.me/blog/2012/09/18/how-to-create-an-all-in-one-webpagetest-private-instance/](https://andydavies.me/blog/2012/09/18/how-to-create-an-all-in-one-webpagetest-private-instance/)

Les slides : [https://www.slideshare.net/AndyDavies/web-page-test-beyond-the-basics](https://www.slideshare.net/AndyDavies/web-page-test-beyond-the-basics)



![Andy Davies et Aaron Peters (Source : https://royal.pingdom.com/2012/10/05/report-from-velocity-europe-day-3/ )](/images/posts/imgob/0-00-30-83-201210-ob_771b7ad15a983bd9a3c761e9fe264d64_webpagetest-jpg.jpg)

Andy Davies et Aaron Peters (Source : https://royal.pingdom.com/2012/10/05/report-from-velocity-europe-day-3/ )


<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://fr.slideshare.net/slideshow/embed_code/14589892?rel=0" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### [DevOps] What HTTP/2.0 Will* Do For You, par Mark Nottingham (Akamai)

L'une des conférences les plus intéressantes de la Vélocity pour ma part avec notamment l'annonce que HTTP/2.0 sera basé sur SPDY déj...

Mark Nottingham ( [@mnot](https://twitter.com/mnot) ), Chair of the [IETF HTTPbis Working Group](https://trac.tools.ietf.org/wg/httpbis/trac/wiki), excellent conférencier, nous explique donc ce que sera HTTP/2.0 :

- Aucun changement la sémantique HTTP
- Basé sur Speedy
- Multiplexing (voir slide 22)
- Header Compression, technique très intéressante, pour éviter de ré-envoyer les memes headers pour chaque requête HTTP

Pas mal de ressources sont disponibles sur son site : [https://www.mnot.net/](https://www.mnot.net/)

Les slides sont un modèle du genre, simples et efficaces : [https://www.slideshare.net/mnot/what-http20-will-do-for-you](https://www.slideshare.net/mnot/what-http20-will-do-for-you)



<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://fr.slideshare.net/slideshow/embed_code/14590411" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### [DevOps] Web & Native Cross-Platform Multiplayer, par Ashraf Samy Hegab (Orange)

Comment développer une expérience de Gaming multi-plateforme : Web, Android, Iphone ? C'est la question à laquelle Ashraf a essayé de répondre, sur cette dernière conférence avec un humour et une énergie très communicative.

Pas mal de bonnes ideés applicables au web traditionnel, sur une stack NodeJs/Mongo/Socket.io, pour faire la majorité du travail et communiquer avec les parties natives d'app Android et Ios.

Nous avons aussi fait une démo live sur le jeu Phone Wars (Disponible sur Appstore et Google Play) d'une éxperience Gaming Multi-plateforme.

Très rafraîchissant pour finir ces 3 journées marathons !




### Conclusion :

Ça y'est, la Vélocity Europe est finie pour cette année. Les bouchées doubles ont été mises par rapport à la Vélocity Berlin de l'année dernière, et cette conférence reste vraiment la conf incontournable pour tous ceux que la Webperf, les Devops, et les sites fort traffic intéressent !

On regrette simplement que seule la grande salle ait été filmée, que la chasse aux slides soit toujours aussi tordue (trop peu renseigné sur le site de la Vélocity). Le reste est juste parfait !

A la prochaine, et merci pour vos retours.

P.s: Merci aussi aux équipes de Pingdom pour leurs Twitt Live et les chouettes photos prises ( [https://royal.pingdom.com/]( https://royal.pingdom.com/) )



Rappel : les CR des autres jours sont disponible :

- Day 2 : [https://tech.bedrockstreaming.com/cr-velocity-conference-europe-2012-day-2](/cr-velocity-conference-europe-2012-day-2)
- Day 1 : [https://tech.bedrockstreaming.com/cr-velocity-conference-europe-2012-day-1](/cr-velocity-conference-europe-2012-day-1)
