---
layout: post
title: "CR Velocity Conférence Europe 2012 : Day 2"
description: ""
author:
  name:           Kenny Dits
  avatar:         kenny.jpg
  email:          
  twitter:  kenny_dee      
  facebook:       
  github:    
category: 
tags: [velocity,conference,webperf,devops]
image:
  feature: 
  credit: 
  creditlink: 
comments: true  
permalink: cr-velocity-conference-europe-2012-day-2
---

![CR Velocity Conférence Europe 2012 : Day 2](/images/posts/imgob/0-00-30-83-201210-ob_a7328c1e5880a56085c6e7bdb8fbf23a_velocity-top-jpg.jpg)

Deuxième journée, avec le début "officiel" de cette conférence, où l'on nous donne rendez vous dans l'immense King's Room.

Pour bien démarrer, on commence avec en quelque sorte l'hymne de la Vélocity : Speed & Velocity !



<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/DRb5PSxJerM?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



### [DevOps] Move Fast and Ship Things, par Girish Patangay (Facebook)

Première présentation de la journée par l'un des Manager chez Facebook, (maintenant dans les bureaux londoniens), sur la capacité de Facebook, et leur volonté, d' évoluer et de déployer rapidement.

Il nous raconte les débuts de Facebook, avec peu de serveurs, des changements inférieurs 5Mb, Rsync pour pusher en prod etc ... puis la migration vers [HipHop](https://github.com/facebook/hiphop-php).

Désormais chaque changement nécessite de recompiler un gros binaire de 1.2Go, et d'y envoyer sur plus de 10 000 serveurs, et ce plusieurs fois par jour !

Avec Bittorent, ils envoient 500Mb en moins d'une minute sur les 10 000 serveurs.

On a eu le droit une présentation de GateKeeper, outil interne, permettant de faire du feature flipping géolocalisé. La timeline a par exemple plus d'une centaine de GateKepper.

Aujourd'hui, Facebook cherche trouver le moyen de scaler de plus de 1000 développeurs à 10000, et d'évoluer sur ce système de "Move Fast" dans le mobile natif.

Pour ceux que ça intéresse, en plus de la vidéo çi dessous, Quora est une mine d'or d'infos sur FB : [https://www.quora.com/Girish-Patangay](https://www.quora.com/Girish-Patangay)



![(Source https://royal.pingdom.com/2012/10/03/report-from-velocity-europe-day-2/ )](/images/posts/imgob/0-00-30-83-201210-ob_8bcd544ab91083c4cc3c838a8fef5cff_facebook-jpg.jpg)

(Source https://royal.pingdom.com/2012/10/03/report-from-velocity-europe-day-2/ )


<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/rSlLB_kI1mw?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



### [WebPerf] Keynote KITE and MITE, par Robert Castley (Keynote)

Vient ensuite la conférence de Keynote (Sponsorisée), qui nous présente deux outils intéressant :

- KITE pour Keynote Internet Testing Environnement : [https://kite.keynote.com/](https://kite.keynote.com/)
- MITE pour Mobile Internet Testing Environnement : [https://mite.keynote.com/](https://mite.keynote.com/)

MITE est d'ailleurs utilisé par le site de Google [Howtogomo.com](https://Howtogomo.com)

Bref, si vous êtes sur Windows (...), jetez y un oeil. Plus d'infos en vidéo :



<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/amFQKjk1eao?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



### [WebPerf] Lightning Démos

**Démo 1 : Chrome Dev Tools :**

Première démo de Iliya Grigorik ( [@igrigorik](https://twitter.com/igrigorik)) sur les capacités avancées de la chrome Dev Toolbar.

On peut par exemple faire un clic droit sur l'onglet Network pour récupérer le har (voir le format [HTTP Archive](https://www.softwareishard.com/blog/har-12-spec/)) en json, et utiliser d'autres outils avec ce har, notamment Yslow dont je parlais [dans le compte rendu suivant](https://tech.m6web.fr/cr-velocity-conference-2012-day-3-devops-webperf), qui permet d'ajouter les régressions possible WebPerf dans votre CI Jenkins.

On parle aussi du chrome://tracing , du débugger mobile, que la devtools est une WebApp avec une url propre et scriptable, du Chrome Benchmarking (extension) ...

Voir la présentation suivante pour plus d'infos, bien plus compléte : [https://www.igvita.com/slides/2012/devtools-tips-and-tricks/](https://www.igvita.com/slides/2012/devtools-tips-and-tricks/)



<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/h3UPtKwQbZc?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>

**Démo 2 : Box Anemometer :**

Gavin Towey ( [@gtowey](https://twitter.com/gtowey)), DBA MySql chez Box.com nous présente une interface pour visualiser et traiter correctement le slow log de Mysql. Basé sur Php 5.3, les outils Percona et Bootstrap pour l'interface, l'outil est un vrai bonheur pour tous ceux qui font un peu d'optimisation MySql au quotidien, développeur, sysadmin ou dba. Nous l'avions déjà découvert aux DevOpsDays Mountain View cet été, et l'utilisons massivement depuis.

Le projet est sur Github : [https://github.com/box/Anemometer](https://github.com/box/Anemometer)

Voir aussi le projet Rain Gauge dans la lignée de Anemometer, toujours par Gavin Towey : [https://github.com/box/RainGauge](https://github.com/box/RainGauge)

Voici la démo en vidéo :



<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/YZEA00bQsq8?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



### [WebPerf] Emerging Markets / Growth Markets, par Jeff Kim (CDnetworks)

Jeff Kim, Chief Operating Officer chez CDnetworks nous a partagé quelques données et chiffres intéressants sur les marchés émergeants comme l'Inde, Indonésie, les Philippines, le Brésil etc

On apprend que Chrome a une part de marché de 62% au Brésil, 51% en Inde, et Opéra de 26% en Russie. Que l'e-commerce au final n'a pas vraiment encore démarré en Inde, Brésil et Russie...

Après des études d'Eye Tracking View, on remarque aussi entre la population chinoise et américaine, que sur une page de résultats de recherche, les américains ne regardent que le coin haut gauche de la page pour se contenter des premiers résultats, alors que les chinois consultent vraiment toute la hauteur de la page, pour regarder tous les résultats.



<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/nccRoCZ7ooA?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



### [WebPerf] Why page speed isn't enough, par Tim Morrow (Betfair)

Son twitter : [@timmorrow](https://twitter.com/timmorrow)

Ancien de ShopZilla, et déja présent Berlin l'année dernière, Tim a partagé son retour d'expérience sur la refonte de BetFair (très gros site de pari en ligne). Les gens se plaignaient d'une mauvaise expérience (alors que les pages refondues étaient plus rapides), mais nécessitaient à priori beaucoup plus de temps pour parvenir au pari final que dans l'ancienne version. En gros, le temps de chargement de vos pages n'est pas suffisant, il faut aussi regarder les scénarios fonctionnels de vos sites. Ils sont passés sur une navigation typée Ajax pour ne pas rafraîchir dans certains cas l'intégralité de la page.

Voir les slides et la vidéo : [https://fr.slideshare.net/timmorrow/why-page-speed-isnt-enough-tim-morrow-velocity-europe-2012](https://fr.slideshare.net/timmorrow/why-page-speed-isnt-enough-tim-morrow-velocity-europe-2012)



<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://fr.slideshare.net/slideshow/embed_code/14570266" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>
<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/PcNlJ9eXTDo?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



### [WebPerf] W3C Status on Web Performance, par Alois Reitbauer (Compuware, Dynatrace)

Beau récapitulatif du status du "W3C performance working group" sur la performance Web, avec des rappels sur la NavTiming et les différents standards, quelques échanges autour de la NavTimingV2, d'une Resource time Measurement etc ...

Son twitter : @compuware et [@AloisReitbauer](https://twitter.com/AloisReitbauer)

Plus d'infos dans la vidéo ci dessous :



<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/crrz5uw4yoM?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>



### [WebPerf] 3.5s Dash for attention and other stuff we found about RUM, par Philipp Tellis (Log Normal)

Son twitter : [@bluesmoon](https://twitter.com/bluesmoon)

Le transcript et détail complet de la présentation est présent sur un blogPost très complet de Philip Tellis, créateur de Log Normal (racheté par SOASTA) :

[https://www.lognormal.com/blog/2012/10/03/the-3.5s-dash-for-attention/](https://www.lognormal.com/blog/2012/10/03/the-3.5s-dash-for-attention/)

Beaucoup de chiffres et d'infos intéressantes autour de la WebPerf, avec notamment cette métrique basée sur un Bounce Rate >= 50%

Les slides sont disponibles : [https://fr.slideshare.net/bluesmoon/the-35s-dash-for-user-attention-and-other-things-we-found-in-rum](https://fr.slideshare.net/bluesmoon/the-35s-dash-for-user-attention-and-other-things-we-found-in-rum)



<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://fr.slideshare.net/slideshow/embed_code/14580792" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### [Mobile] Escaping the uncanny valley, par Andrew Betts (FT Labs)

Son twitter : [@triblondon](https://twitter.com/triblondon)

Conférence très intéressante par Andrew, le directeur d'FT Labs (Financial Times), qui a parcouru l'ensemble des travaux que ces équipes ont effectués autour des capacités mobile pour faire une webapp HTML5 intégrée dans une appli native avec la meilleure experience possible.

Au menu, rappel sur la lourdeur de parcours du DOM en JS, les incohérences du SetTimeout (notamment sur IOs), les problématiques de l'AppCache ou localStorage. Le fait d'utiliser au maximum l'accélération matérielle sur les CSS, l'optimisation des paint, les spinners et loading bar, le progressive rendering ...

Rappel de la latence sur les "clics" tactiles avec le projet Fastclick, qui enlève les 300ms de délai sur le clic mobile : [https://github.com/ftlabs/fastclick/](https://github.com/ftlabs/fastclick/)





### [Mobile] Make your mobile web apps fly, par Sam Dutton (Google)

Son twitter : [@sw12](https://twitter.com/sw12)

Sam Dutton, Developers Advocate (?) chez Google, nous fait un parcours assez complet des bases d'optimisations WebPerf pour le mobile. Un peu de redondance versus d'autres confs vues plus tôt, mais le sujet est bien maîtrisé et bien couvert.

Quelques petits outils intéressants, notamment le Multires pour la gestion des images Retina : [https://fhtr.org/multires/](https://fhtr.org/multires/ )

A noter aussi une phrase que j'ai beaucoup aimé sur l'ergnonomie mobile, et la position des boutons de contrôle :

> "Controls should be beneath content: think calculator"

Les slides : [https://www.samdutton.com/velocity2012/ ](https://www.samdutton.com/velocity2012/)





### [DevOps] Scaling Instagram, par Mike Krieger (Instagram)

Son twitter : [@mikeyk](https://twitter.com/mikeyk)

Petit debrief orienté Ops de la success story d'Instragram. Le rythme de la présentation était vraiment pushy, donc plutôt dur suivre pour nous autre francophones ...

En plus d'avoir l'impression de voir un demi milliard bouger sur scène, nous avons quand même appris certaines choses sur la Stack Instagram : EC2, Python Django, Postgres, Gearman, RabbitMQ ...

La présentation n'étant pas nouvelle, est disponible ici : [https://fr.slideshare.net/iammutex/scaling-instagram](https://fr.slideshare.net/iammutex/scaling-instagram)



![Mike Krieger (Source : https://royal.pingdom.com/2012/10/03/report-from-velocity-europe-day-2/ )](/images/posts/imgob/0-00-30-83-201210-ob_f78dbded1ddadf9aa2dfa65ce69cf5b4_instagram-jpg.jpg)

Mike Krieger (Source : https://royal.pingdom.com/2012/10/03/report-from-velocity-europe-day-2/ )


<iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="https://fr.slideshare.net/slideshow/embed_code/12522335" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" width="427"></iframe>


### [WebPerf] Bringing HTML5 into Nativelandia: A Tale of Caution, par Jackson Gabbard (Facebook)

L'une de conférences que j'attendais beaucoup, de Jackson Gabbard, Mobile Engineer chez Facebook, qui nous explique le passage du HTML5 au native pour les applications mobile (IOs pour le moment?).

Passé les stats toujours aussi hallucinantes, il explique tout ce qui n'était pas convainquant sur l'ancienne webApp HTML5, et que ce qui a vraiment échoué, est le marriage entre la WebView et le natif. Que l'expérience "native" est bien plus concluante pour l'utilisateur par rapport ce qu'ils souhaitent obtenir niveau fluidité, performances, efficacité, utilisation réseau etc ...

Ils ont du coup redeveloppé pas mal de leurs outils pour s'adapter a ce mode de fonctionnement (un GateKeeper plus light) etc ...

Conférence vraiment passionnante, avec un gars plutôt très transparent sur Facebook et les raisons qui ont poussées ce changement.





### Conclusion :

Du lourd encore une fois, avec énormement de sujets très intéressants, même si l'on commence à tourner un peu en rond autour de la WebPerf Mobile.

A noter aussi qu'un grand nombre de livre Oreilly ont été donné et dédicacé par Steve Souders et John Allspaw ;-)

Les salles sont déjà bien plus sympa, et l'organisation toujours au top ! Vivement demain.

Pour finir, voici quelques vidéos diffusées pendant les breaks la Vélocity :



<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/c6PQ49B5Gpw?wmode=transparent&fs=1&feature=oembed" width="640"></iframe>
Hot Wheels World Record: Double Loop Dare at the 2012 X Games Los Angeles


<iframe allowfullscreen="" frameborder="0" height="360" src="https://www.youtube.com/embed/TWfph3iNC-k?wmode=transparent&fs=1&feature=oembed&start=38" width="640"></iframe>
Jeb Corliss " Grinding The Crack"


Rappel : les CR des autres jours sont disponible :

- Day 3 : [https://tech.m6web.fr/cr-velocity-conference-europe-2012-day-3](https://tech.m6web.fr/cr-velocity-conference-europe-2012-day-3)
- Day 1 : [https://tech.m6web.fr/cr-velocity-conference-europe-2012-day-1](https://tech.m6web.fr/cr-velocity-conference-europe-2012-day-1)



