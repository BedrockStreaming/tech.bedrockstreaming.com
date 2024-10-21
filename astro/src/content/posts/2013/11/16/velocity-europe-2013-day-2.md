---
layout: ../../../../../layouts/post.astro
title: "Velocity Europe 2013 - Day 2"
description: ""
author: Baptiste, Denis Roussel et Kenny Dits
category: 
tags: [conference,velocity,webperf]
image:
  feature: 
  credit: 
  creditlink: 
comments: true  
permalink: velocity-europe-2013-day-2
---

![Velocity Europe 2013 - Day 2](/0-00-30-83-201311-ob_9ce448_10859879244-aef165bef0-z-jpg.jpeg)

De retour à l'hôtel Hilton de Londres, afin de commencer cette deuxième journée qui s’annonce très chargée : jusqu’4 tracks en parallèle. Performance, Mobile, Ops, et Sponsors.



### Making Government digital services fast

Paul Downey [@psd](https://twitter.com/psd)

![Velocity Europe 2013 - Day 2](/0-00-30-83-201311-ob_56b889_10859955903-a209ea1ac8-z-jpg.jpeg)

Paul est un “Technical Architect” pour le gouvernement anglais. Il nous explique comment ils gèrent et priorisent les problématiques de performances pour offrir des services internet centrés sur les besoins des utilisateurs avant ceux du gouvernement.

Avec notamment une réduction drastique du nombre de pages, ce qui leur a permis d’obtenir plus de visites au final !

Le tout est entièrement documenté en ligne, en accès public, et regorge d’informations intéressante que vous pouvez retrouver sur le [Gov.Uk Service Manual.](https://www.gov.uk/service-manual)



<iframe allowfullscreen="" frameborder="0" height="480" src="https://www.youtube.com/embed/fo1VbYQB39E?wmode=transparent&feature=oembed" width="854"></iframe>

### Stand down your smartphone testing army

Mitun zavery (keynote)

![Velocity Europe 2013 - Day 2](/0-00-30-83-201311-ob_1fdf80_10859777974-7501eff881-z-jpg.jpeg)

Mitun travaille chez Keynote, et fait une démonstration de deux de leurs outils :

Keynote DA Free (DA = Device Anywhere)

L’outil très intéressant propose un grand nombre d’appareils mobiles qu’on peut acquérir pendant 10 minutes, afin de lancer des tests. Le gros intérêt est qu’on parle ici de vrais appareils, pas de simulateurs.

Le service est disponible sur : [https://dafree.keynote.com](https://dafree.keynote.com) après vous êtres inscrit gratuitement sur cette url [https://www.keynotedeviceanywhere.com/da-free-register.html](https://www.keynotedeviceanywhere.com/da-free-register.html)

(Le service ne fonctionne pas sur Chrome mac pour ma part)

C’est plutôt impressionnant techniquement, on lance les applications que l’on souhaite, rentre du texte, change l’orientation … ! A mémoriser.

MITE, le deuxième outil qui à l’air très complet permet d’aller beaucoup plus loin, mais avec des simulateurs cette fois : [https://mite.keynote.com/download.php](https://mite.keynote.com/download.php)

Dommage que l’on oublie les Macs dans l’histoire.



<iframe allowfullscreen="" frameborder="0" height="480" src="https://www.youtube.com/embed/SYVnYr83QJM?wmode=transparent&feature=oembed" width="854"></iframe>


### Testing all the way to production

Sam adams (lmax exchange) [@LMAX](https://twitter.com/LMAX)

![Velocity Europe 2013 - Day 2](/0-00-30-83-201311-ob_4d7e5f_10859672196-d79c68cb41-z-jpg.jpeg)

Pour ceux qui ne seraient pas encore convaincu de l'intérêt des tests automatisés, Lmax exchange (site sur l’univers boursier gèrant des sommes d’argent assez phénoménales) présente le workflow de développement basé sur les tests pour déployer du code le plus souvent possible en évitant au maximum les régressions.



<iframe allowfullscreen="" frameborder="0" height="480" src="https://www.youtube.com/embed/_cS9QPJ5pIE?wmode=transparent&feature=oembed" width="854"></iframe>


### Most of the time we measure the performance of others

klaus enzenhofer (compuware) [@kenzenhofer](https://twitter.com/kenzenhofer)

![Velocity Europe 2013 - Day 2](/0-00-30-83-201311-ob_80bd15_10859963953-9809187919-z-jpg.jpeg)

Courte présentation de Compuware qui édite des solutions de monitoring, et aussi [Dynatrace Ajax](https://www.compuware.com/en_us/application-performance-management/products/ajax-free-edition/overview.html) avec une étude de cas assez simple sur la détection d’anomalies sur un site (142 domaines de 3rd party chargés !).

[Le blog de Compuware](https://apmblog.compuware.com/) regorge d’article en tout genre sur la Webperf.



<iframe allowfullscreen="" frameborder="0" height="480" src="https://www.youtube.com/embed/LgDe16JXRCw?wmode=transparent&feature=oembed" width="854"></iframe>

### Making performance personal at Ft labs

Andrew Betts [@triblondon](https://twitter.com/triblondon)

![Velocity Europe 2013 - Day 2](/0-00-30-83-201311-ob_1c7575_10859780954-053107c07e-z-jpg.jpeg)

Les équipes du Financial Times sont très actifs dans le domaine de la webperf, avec notamment l’outil [FastClick](https://github.com/ftlabs/fastclick) qui permet d’enlever le delay du touch sur mobile (entre 100 et 300 ms!). Ils developpent aussi une webapp html5 très riche, et expliquent comment rendre la problématique de performance importante aux yeux du “produit”. On apprend pas mal d’astuces pour mesurer la performance, gérer le appcache, éviter les sprites etc …

Vous pouvez retrouvez les slides ici : [https://triblondon.github.io/talk-makingperfpersonal/#/](https://triblondon.github.io/talk-makingperfpersonal/#/)



<iframe allowfullscreen="" frameborder="0" height="480" src="https://www.youtube.com/embed/UrKA5j-yx8Y?wmode=transparent&feature=oembed" width="854"></iframe>

### Lightning demo : Global web page performance

James Smith (Devopsguys) [@thedevmgr](https://twitter.com/thedevmgr)

![Velocity Europe 2013 - Day 2](/0-00-30-83-201311-ob_b73fac_10859783724-8228a62e39-z-jpg.jpeg)

James est venu présenter lors d’une lightning démo : [worldwidepagetest.com](https://worldwidepagetest.com/)

Un outil permettant de tester partout dans le monde les performances de son site, basé sur [Webpagetest](https://www.webpagetest.org/), et les locations et browsers disponible.

  
 En plus de l’échec total de la démo (bug/plantage … “worst demo ever” d’après le speaker lui même), l’outil qui parait intéressant sur le papier me semble une fausse bonne idée et le risque de saturer les instances de WPT mondial à cause de ce type d’outil me parait bien plus gênant que les avantages qu’il apporte.



### Lightning demo: HTTP Archive, BigQuery, and you!

Ilya Grigorik [@igrigorik](https://twitter.com/igrigorik)

![Velocity Europe 2013 - Day 2](/0-00-30-83-201311-ob_13d430_10859782544-d28ccd39a8-z-jpg.jpeg)

L’impressionnante quantité de données agrégées par [HTTP Archive](https://httparchive.org ) est maintenant disponible dans [Google BigQuery](https://bigquery.cloud.google.com) : toutes les données statistiques sur les requêtes et réponses HTTP de plusieurs centaines de milliers de site différents sont donc simplement requêtables et disponibles la vitesse de la lumière (c’est une expression à la mode en ce moment par ici).

Un article d’Ilya explique la marche suivre pour utiliser les données de HTTP Archive stockées sur BigQueries : [https://www.igvita.com/2013/06/20/http-archive-bigquery-web-performance-answers/](https://www.igvita.com/2013/06/20/http-archive-bigquery-web-performance-answers/)

Nous pouvons ainsi aisément effectuer quelques comparaisons avec nos “concurrents” et néanmoins amis présents la conférence :-) : [https://denisroussel.fr/httparchive-bigquery-french-test.html](https://denisroussel.fr/httparchive-bigquery-french-test.html)

Ilya présente aussi le site communautaire [BigQueri.es](https://bigqueri.es/) (Powered by [Discourse](https://www.discourse.org/)), permettant de partager les réponses des questions statistiques sur les bases présentes dans BigQuery (notamment celle de HTTP Archive)



<iframe allowfullscreen="" frameborder="0" height="480" src="https://www.youtube.com/embed/TOFgDSqNRz4?wmode=transparent&feature=oembed" width="854"></iframe>



### Gimme More! Enabling User Growth in a Performant and Efficient Fashion

Arun Kejariwal (Twitter) [@arun_kejariwal](https://twitter.com/arun_kejariwal), Winston Lee (Twitter Inc.) [@winstl](https://twitter.com/winstl)

La planification de la capacité ("capacity planning") chez Twitter passe par l'utilisation de modèles statistiques et la prédiction sur des données temporelles. C'est absolument nécessaire pour le dimensionnement des plateformes techniques.

L'utilisation d'une simple régression linéaire capture la tendance globale, mais ne prends pas en compte la saisonnalité ni les pics de trafic (positifs ou négatifs). Un modèle "smooth splines" correctement paramétré, de part son design, ne le permet pas non plus. Idem pour le Holt Winters (que vous pouvez tester avec graphite). Ils utilisent donc le modèle ARIMA (Autoregressive integrated moving average), qui permet d'effectuer des prédictions partir de données temporelles non stationaires (c'est dire que la moyenne et la variance change = pics de trafic). Le nettoyage des données et la vérification du modèle représente la majorité du travail. Les données journalières permettent de prédire jusqu'90 jours, et les données la minute un trimestre. Les prédictions sur 1 mois des métriques systèmes (cpu, ram) sont considérées comme fiables alors que les métriques business (nombre d'utilisateurs, nombres de photos ou vidéos stockées) le sont pour 3 ou 4 mois. Pour les évènements exceptionnels (superbowl, nouvelle année) ces prédictions ne sont pas assez fiables, ils se basent donc simplement sur les années précédentes.





### When dynamic becomes static: the next step in web caching techniques

Wim Godden (Cu.Be Solutions)

Le monsieur effectue d’abord un récapitulatif des pratiques de cache dans le web depuis son commencement : sans cache, avec du cache applicatif, avec du reverse proxy cache et enfin avec beaucoup trop de systèmes de cache qui rende l’architecture très complexe (tiens tiens).

Puis apparaissent les ESI, c’est en gros du reverse proxy cache par bloc (en réalité, ils sont parmi nous depuis bien longtemps). Mais une limitation conceptuelle évidente borne leur utilisation : les sites sont très souvent personnalisés en fonction de l’utilisateur (affichage du nom de l’utilisateur connecté par exemple). Et du coup, les blocs personnalisés, même simples, ne peuvent bénéficier du reverse proxy cache. Ce qui défie un peu le concept.

Pour pallier à ce problème, Wim et son équipe ont développé un langage spécifique dans Nginx (qui est aussi un reverse proxy en plus d’être un serveur http) permettant au serveur web de gérer des variables directement dans le reverse proxy afin que celui-ci les stock dans son propre memcache et puisse y accéder pour retourner la page au client sans faire un appel supplémentaire au serveur web : SCL.

  
 Alors oui. C’est pas forcément l’idéal de commencer poser des variables dans le reverse proxy. Mais n’ayons crainte, ce n’est pas pour tout de suite : la release publique ne devrait pas arriver avant mi-2014 :-)

[Les slides](https://cdn.oreillystatic.com/en/assets/1/event/101/When%20dynamic%20becomes%20static_%20the%20next%20step%20in%20web%20caching%20techniques%20Presentation.odp)





### Developer-Friendly Web Performance Testing in Continuous Integration

Michael Klepikov (Google, Inc)

Intégrer les mesures/tests de régressions de performance dans nos outils d’intégrations continues et une tâche très compliqué. Michael présente une approche assez maligne consistant utiliser les tests fonctionnels déjen place, pour récolter les mesures des outils de R.U.M. déjà présent sur le site (soit parce que les mesures sont présentes dans l’url d’appel de l’outil de R.U.M.), soit en récupérant les valeurs dans les DevTools de Chrome.

L’outil [TSviewDB](https://github.com/google/tsviewdb) permet d’avoir une interface qui agrège plusieurs time-series sur une seule time-series (plus d’infos dans le Readme du projet).

Pas mal d’informations à creuser dans les slides, comme [l’envoi de donnée directe WebPageTest](https://gist.github.com/klepikov/5457750) pour utiliser l’UI sur le résultat, ou la façon de [récupérer les infos de la DevTools de Chrome en vidéo](https://www.youtube.com/watch?v=0_kAPWSZNY4&feature=youtu.be)

Les slides :



<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://www.slideshare.net/slideshow/embed_code/28200133" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### Integrating multiple CDN providers at Etsy

Marcus Barczak (Etsy), Laurie Denness (Etsy)

Pour des raisons de haute disponibilité, de résilience et de balance des coûts, Etsy a mis en place depuis 2012 un système qui leur permet d'utiliser de multiples CDN (parmi eux Akamai, Fastly, et EdgeCast). Leur critères d'évaluations sont le hit ratio et la décharge de trafic des serveurs origine, le reporting, le pilotage via des APIs, la personalisation et l'accès aux logs HTTP. Ils ont pour cela dû faire du ménage dans leur codes et dans leurs headers (cache-control, expires, etag, last-modified)

Ils ont commencé par les images (1% puis 100% du trafic), et se sont servis des CDNs pour effectuer leur tests A/B. L'equilibrage de charge entre les CDNs se fait manuellement via une interface web ou via un outil en ligne de commande qu'ils ont mis disposition de la communauté ([cdncontrol sur leur github](https://github.com/etsy/cdncontrol)). L'inconvénient de cette solution est la multiplication des requetes DNS (puisqu'ils utilisent des CNAME type img1.etsystatic.com => global-ssl.fastly.net par exemple), la non atomicité et le delais des modifications DNS qui engendrent une long tail importante et le debug plus complexe. Les requetes depuis les CDNs vers les origines sont trackés via un header HTTP et sont monitorés dans un graphite surveillé par un nagios selon un seuil déterminé.



> "If you can do it at the origin, do it !".


<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://www.slideshare.net/slideshow/embed_code/28247433" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### What is the Velocity of an Unladen Swallow? A quest for the Holy Grail.

Perry Dyball (Seatwave Ltd) [@perrydyball](https://twitter.com/perrydyball)

Retour d’XP très utile, plein d’honnêteté et d’humilité, de SeatWave (site permettant d’acheter des tickets concerts/spectacle etc), sur l’effet douloureux de la première pub télé qu’ils ont acheté pour promouvoir leur service. On découvre la façon dont ils ont su optimiser leur application pour supporter les publicités suivantes, grâce un système de queuing avec un décompte en cas de fortes charges, ainsi que les impacts sur une multitude de métriques et le coté financier.

Le phénomène est presque un running gag chez nous (ou même sur Twitter), quand votre (ou même l’un de nos …) site est présenté dans une pub ou Capital, et que votre application et/ou serveur ne supporte pas la charge.

Bref, encore un bel exemple de culture d’entreprise, qui démontre que la performance n’est pas un projet ou une feature “one shot”, mais une culture et une mentalité constante.



> "Performance it’s not just for today, it’s for every day" Peter Dyball


<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://www.slideshare.net/slideshow/embed_code/28249315" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### Getting 100B metrics to disk

Jonathan Thurman (New Relic)

[New relic](https://newrelic.com/) a présenté l'architecture MySQL qui stocke leur 196 milliards de métriques journalières. Elle est basée sur des shards MySQL, propulsée par de puissants serveurs (12 actuellement) équipés de SSD Intel et de shelf de disques Dell. Les shards sont fait (via leur API shardGuard) par numéro de client, et les tables MySQL sont construites sur le modèle numéroClient_year_julianDay_metricResolution. Il y a environ 200.000 tables par databases. Les métriques sont régulierement (toutes les heures), purgées et aggrégées, en utilisant le innodb_lazy_drop_table de percona 5.5 (et surtout par delete from ou drop table).

Le code initialement en Ruby est passé Java/Jetty. Les inserts se font séquentiellement en batch de 5000 et sont buffurisés en RAM (ils doivent se faire en moins d'une minute, résolution minimale du produit). Ils prévoient d'utilisé de multiples instances MySQL par serveurs et de gonfler leur capacité hardware (SSD 800G, 96G RAM)



<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://www.slideshare.net/slideshow/embed_code/28275612" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### High Velocity Migration

  
 Joshua Hoffman (SoundCloud) [@oshu](https://twitter.com/oshu)

Joshua nous a conté l'histoire d'une startup (fictive mais pas vraiment car c'est celle de Tumblr), qui a commencé en 2006 entre deux amis souhaitant partager des images de parties d'échecs et comment en 2012 elle a dû, en 6H de maintenance, basculer 1200 serveurs et les données de 50M d'utilisateurs. Il nous a détaillé l'évolution année par année de l'infrastructure et du nombre de devs/sysadmins. Les ingrédients pour gérer une croissance comme celle ci sont selon lui : le provisionning automatique (ipxe, kickstart), la gestion de la configuration (puppet/chef/ansible), le monitoring et l'alerting et les outils de déploiement de code. Il précisé qu'il faut accepter l'imperfection de ses outils, ne pas chercher réinventer la roue mais plutôt utiliser l'open source, ne pas hésiter tuer les projets Zombies (ceux qui durent depuis trop longtemps et qui n'ont pas les fonctionnalités attendues !) et surtout respecter le principe KISS (keep it simple and stupid).

La migration en 2012 de leur plateforme gérée par une société tierce vers leur propre infrastructure a commencé 120 jours plus tôt avec l'installation des serveurs, machines, systèmes de déploiements, l'acquisition de leur numéro d'AS, et l'utilisation en front d'un proxy pour plus tard pouvoir rediriger le trafic de façon transparente vers la nouvelle infrastructure. Le jour J la fenetre de maintenance du site de 6H été suffisante pour synchroniser les données utilisateurs entre les deux infras, tester et mettre en production.



<iframe allowfullscreen="" frameborder="0" height="720" mozallowfullscreen="" src="https://player.vimeo.com/video/79444171" title="High Velocity Migration" webkitallowfullscreen="" width="1280"></iframe>



### Code is Evil

Dan Rathbone (British Sky Broadcasting)

Face aux problèmes de performance du site [https://www.skybet.com/](https://www.skybet.com/), qui doit probablement attirer une quantité impressionnante de parieurs tout en devant afficher des données très fraîches (cela fait partie du business model), Dan a remis plat toute la logique de développement du site.

Lorsque la performance passe seule au premier plan, il est ainsi possible de renverser le paradigme du développement dans son ensemble : alors qu’en général, les données sont stockées structurées puis extraites pour peupler du code métier puis affichées par des templates élaborés, dans ce cas particulier, les données sont directement stockées de manières dénormalisées, directement prêtes être affichées par des templates simplistes. Le code métier est en amont et sert pré-calculé les données qui sont stockées en base.

Il est ainsi possible de minimiser drastiquement la quantité de code critique. Et cela ouvre beaucoup de portes : peu de code = peu de maintenance, aucun framework nécessaire, aucun cache nécessaire, etc.

C’était une présentation assez polémique mais particulièrement intéressante (ce qui n’était pas l’avis de l’audience, semblerait-il) et rafraîchissante car elle permet de sortir des cas standards du monde du web. Entre nous, tous ces principes étaient déjen vogue dans le développement des jeux vidéo dans les années 90 : nous devions constamment contourner la limitation du matériel (les optimisations étaient au cycle processeur près).


### Breaking 1000ms Mobile Barrier

Ilya Grigorik (Google)

![Velocity Europe 2013 - Day 2](/0-00-30-83-201311-ob_dd9097_10859873934-1ce54696bc-z-jpg.jpeg)

Comment arriver afficher sa page web sans dépasser la barrière de 1000 ms ! Un dur challenge dont les épreuves sont détaillés par Ilya.



![Velocity Europe 2013 - Day 2](/0-00-30-83-201311-ob_c53a35_breaking-the-1000-ms-mobile-barrier-velocity-goog.png)

Des problèmatiques de latence sur le “Touch” mobile, sur les communications 3G/4G, du fonctionnement TCP, du critical rendering path au niveau CSS et JS, mod_page_speed et ngx_page_speed, ainsi que des évolutions venir sur Page Speed Insights, c’est un panel ultra complet de la WebPerf qui été couvert sur cette heure ultra dense, mais oh combien indispensable. C’est donc, comment souvent avec Ilya Grigorik, un must read absolu pour ceux que la Performance Front-End et Mobile, ainsi que la latence, passionne.

Les slides sont ici [https://docs.google.com/presentation/d/1wAxB5DPN-rcelwbGO6lCOus_S1rP24LMqA8m1eXEDRo/present#slide=id.p19](https://docs.google.com/presentation/d/1wAxB5DPN-rcelwbGO6lCOus_S1rP24LMqA8m1eXEDRo/present#slide=id.p19)





### Live Sketching !

Avant de conclure, petit hommage [Natalia Talkowska](https://twitter.com/NatiTal ) [, qui, sur chaque conférence, réalisait un live sketching d’une qualité incroyable](https://twitter.com/NatiTal)

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/Natalka_Design">@Natalka_Design</a> <a href="https://twitter.com/search?q=%23livesketching&amp;src=hash">#livesketching</a> is back with <a href="https://twitter.com/allspaw">@allspaw</a> <a href="https://twitter.com/Souders">@souders</a> and <a href="https://twitter.com/courtneynash">@courtneynash</a> opening up <a href="https://twitter.com/search?q=%23velocityconf&amp;src=hash">#velocityconf</a>, let&#39;s go! <a href="https://t.co/FYBQIVk8tr">pic.twitter.com/FYBQIVk8tr</a></p>&mdash; Natalia Talkowska (@NatiTal) <a href="https://twitter.com/NatiTal/statuses/400913602104033281">November 14, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


<blockquote class="twitter-tweet"><p><a href="https://twitter.com/search?q=%23livesketching&amp;src=hash">#livesketching</a> <a href="https://twitter.com/psd">@psd</a> at <a href="https://twitter.com/search?q=%23velocityconf&amp;src=hash">#velocityconf</a> as first <a href="https://twitter.com/search?q=%23keynote&amp;src=hash">#keynote</a>! <a href="https://t.co/9zAMXJZNWW">pic.twitter.com/9zAMXJZNWW</a></p>&mdash; Natalia Talkowska (@NatiTal) <a href="https://twitter.com/NatiTal/statuses/400917831153631232">November 14, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/search?q=%23livesketching&amp;src=hash">#livesketching</a> <a href="https://twitter.com/keynotesystems">@keynotesystems</a> at <a href="https://twitter.com/search?q=%23velocityconf&amp;src=hash">#velocityconf</a> <a href="https://t.co/S8XYaNFKzU">pic.twitter.com/S8XYaNFKzU</a></p>&mdash; Natalia Talkowska (@NatiTal) <a href="https://twitter.com/NatiTal/statuses/400920690192556033">November 14, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/search?q=%23livesketching&amp;src=hash">#livesketching</a> <a href="https://twitter.com/LMAX">@LMAX</a> at <a href="https://twitter.com/search?q=%23velocityconf&amp;src=hash">#velocityconf</a> <a href="https://t.co/UYLYDTSuPO">pic.twitter.com/UYLYDTSuPO</a></p>&mdash; Natalia Talkowska (@NatiTal) <a href="https://twitter.com/NatiTal/statuses/400924927634984960">November 14, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/search?q=%23livesketching&amp;src=hash">#livesketching</a> <a href="https://twitter.com/kenzenhofer">@kenzenhofer</a> at <a href="https://twitter.com/search?q=%23velocityconf&amp;src=hash">#velocityconf</a> <a href="https://t.co/l2ndwj8V1G">pic.twitter.com/l2ndwj8V1G</a></p>&mdash; Natalia Talkowska (@NatiTal) <a href="https://twitter.com/NatiTal/statuses/400926594828873728">November 14, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p>Must follow: <a href="https://twitter.com/NatiTal">@NatiTal</a>: <a href="https://twitter.com/search?q=%23livesketching&amp;src=hash">#livesketching</a> <a href="https://twitter.com/psd">@psd</a> at <a href="https://twitter.com/search?q=%23velocityconf&amp;src=hash">#velocityconf</a> as first <a href="https://twitter.com/search?q=%23keynote&amp;src=hash">#keynote</a>! <a href="https://t.co/W8xTTjC581">pic.twitter.com/W8xTTjC581</a> <a href="https://twitter.com/search?q=%23Awesomeness&amp;src=hash">#Awesomeness</a></p>&mdash; Mike Hendrickson (@mikehatora) <a href="https://twitter.com/mikehatora/statuses/400919337613422592">November 14, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/search?q=%23livesketching&amp;src=hash">#livesketching</a> <a href="https://twitter.com/triblondon">@triblondon</a> at <a href="https://twitter.com/search?q=%23velocityconf&amp;src=hash">#velocityconf</a> <a href="https://t.co/VTF2gZFEsH">pic.twitter.com/VTF2gZFEsH</a></p>&mdash; Natalia Talkowska (@NatiTal) <a href="https://twitter.com/NatiTal/statuses/400929312649805824">November 14, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/search?q=%23livesketching&amp;src=hash">#livesketching</a> <a href="https://twitter.com/TheDevMgr">@thedevmgr</a> at <a href="https://twitter.com/search?q=%23velocityconf&amp;src=hash">#velocityconf</a> <a href="https://t.co/iaaZgRxVwN">pic.twitter.com/iaaZgRxVwN</a></p>&mdash; Natalia Talkowska (@NatiTal) <a href="https://twitter.com/NatiTal/statuses/400931580312449024">November 14, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p>Not a bad likeness! “<a href="https://twitter.com/NatiTal">@NatiTal</a>: <a href="https://twitter.com/search?q=%23livesketching&amp;src=hash">#livesketching</a> <a href="https://twitter.com/triblondon">@triblondon</a> at <a href="https://twitter.com/search?q=%23velocityconf&amp;src=hash">#velocityconf</a> <a href="https://t.co/Pq4NiAPEW7">pic.twitter.com/Pq4NiAPEW7</a>”</p>&mdash; Andrew Betts (@triblondon) <a href="https://twitter.com/triblondon/statuses/400930943130935296">November 14, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/search?q=%23livesketching&amp;src=hash">#livesketching</a> <a href="https://twitter.com/igrigorik">@igrigorik</a> at <a href="https://twitter.com/search?q=%23velocityconf&amp;src=hash">#velocityconf</a> <a href="https://t.co/5rBPelS9an">pic.twitter.com/5rBPelS9an</a></p>&mdash; Natalia Talkowska (@NatiTal) <a href="https://twitter.com/NatiTal/statuses/400934378685345792">November 14, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p><a href="https://twitter.com/search?q=%23livesketching&amp;src=hash">#livesketching</a> <a href="https://twitter.com/edgecast">@edgecast</a> at <a href="https://twitter.com/search?q=%23velocityconf&amp;src=hash">#velocityconf</a> last <a href="https://twitter.com/search?q=%23keynote&amp;src=hash">#keynote</a> <a href="https://t.co/rZ5Pa1MvhQ">pic.twitter.com/rZ5Pa1MvhQ</a></p>&mdash; Natalia Talkowska (@NatiTal) <a href="https://twitter.com/NatiTal/statuses/400937585436286976">November 14, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>



### Conclusion :

C'est complètement lessivé que nous sortons de cette journée, avec une quantité d'idées / projets tester incroyable.

Vous pouvez retrouver [le compte rendu de la première journée](/velocity-europe-2013-day-1) ainsi [que de la dernière](/velocity-europe-2013-day-3) sur notre Blog.

N'hésites pas donner vos retours (positifs ou négatifs en commentaire). Merci :-)

© des photos : [Flickr officiel O'Reilly](https://www.flickr.com/photos/oreillyconf/with/10845987613/)

CR rédigé par Baptiste, Denis Roussel et Kenny Dits
