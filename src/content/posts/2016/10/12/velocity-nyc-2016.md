---
layout: ../../../../../layouts/post.astro
title: "Retour sur la Velocity New York Conference 2016"
description: "Velocity New York 2016 - Performance, Scalabilité, Devops"
author: [k_dits, f_desaintpern]


  
  
  
category:
tags: [conference,velocity,webperf,devops]
image:
  feature: posts/velocity2016/velocity_banner.jpg
  credit: oreillyconf
  creditlink: https://www.flickr.com/photos/oreillyconf/sets/72157670842287154/
comments: true
---

Nous étions cette année à New York, à quelques blocs de Time Square, pour suivre l’édition New Yorkaise de la Velocity Conference 2016.
C’est une conférence que nous apprécions particulièrement et à laquelle nous nous rendons quasiment chaque année, soit dans son édition européenne (Berlin, Londres, Barcelone, et Amsterdam cette année en novembre), soit aux U.S. (précédemment Santa Clara, New York cette année, et San José l’année prochaine).
C’est l’occasion de suivre une conf de très haute qualité composée de 4 ou 5 tracks en parallèle, dédiée aux problématiques de performance et de scalabilité.
On remarque que d’année en année la conférence s’est réorientée autour du mouvement DevOps, alors qu’elle était précédemment beaucoup plus centrée sur la WebPerf (desktop et mobile).

La conférence commence par l’Ignite (sorte de mini conférence dans la conférence), basée sur un format court (type Lightning Talk) de 5 minutes pour une présentation de 5 slides défilant automatiquement. On retiendra de cette première partie des talks intéressants exposant les tristes chiffres de la diversité dans la tech aux US, mais aussi une conférence très drôle de [@beldhalpern](https://twitter.com/bendhalpern) de [@ThePracticalDev](https://twitter.com/ThePracticalDev) sur des parodies des livres OReilly (voir le [O RLY Cover Generator](https://dev.to/rly)) :

<blockquote class="twitter-tweet" data-lang="fr"><p lang="en" dir="ltr">Enjoying the heck out of <a href="https://twitter.com/ThePracticalDev">@ThePracticalDev</a> at Ignite <a href="https://twitter.com/hashtag/velocityconf?src=hash">#velocityconf</a>. Lololol! <a href="https://t.co/ZlJWoP4cjh">pic.twitter.com/ZlJWoP4cjh</a></p>&mdash; Bridget Kromhout (@bridgetkromhout) <a href="https://twitter.com/bridgetkromhout/status/778353731045908480">20 septembre 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

L’ignite s’est fini sur le célèbre Ignite Karaoké où 16 volontaires se sont prêtés au jeu de cet exercice hilarant mais tellement difficile, consistant à improviser une conférence sur le sujet de son choix sur 5 slides inconnues de l’orateur et qui défilent automatiquement au bout de quelques secondes 😃. Ce qu’on fait aussi chez M6Web de temps en temps nommé [Karaoké Slideshow](/organiser-des-conferences-technique-en-interne) et que Kenny avait animé lors d’un Forum PHP ([voir la vidéo](https://www.youtube.com/watch?v=Ln12meWM1pE)).

![O&#x27;Reilly Conferences sur Flickr](https://c8.staticflickr.com/9/8046/29856652295_153795f039_z.jpg)
[Crédit : Flickr](https://flic.kr/p/Muk9xa)

Nous avons ensuite suivi deux jours de conférences dont les thèmes majeurs étaient :

* Les Service Workers
* Les microservices
* Le monitoring
* HTTP2
* La sécurité des apps
* Les détections d'anomalie
* Les ChatOps
* Le WebMobile, AMP et les PWA

# ChatOps

Un des sujets assez récurrent, notamment dans la mouvance DevOps est l’utilisation des ChatOps, sujet popularisé par Github (via [Hubot](https://hubot.github.com/)).
Cela consiste généralement en un bot ou une IA posée sur un outil de Chat type Slack, Flowdock ou Hipchat, permettant de simplifier la communication entre différentes équipes et les différents outils (ticketing, alerting, monitoring, état d’une machine, etc). Une démo de l’IA de Dynatrace à reconnaissance vocale à été faite, montrant comment par la voix, on pouvait recevoir dans l’outil de Chat les infos sur les incidents de la veille, créer les tickets de support etc. [Voir ici](https://dynatrace.com/meet-davis). Un peu gadget, mais rigolo.

L’un des points à retenir, c’est que même si ces outils font partie de la « culture » DevOps, ce n’est pas l’ajout d’un de ces outils qui fera apparaître cette culture dans votre entreprise si vous ne l’avez pas.

> Tools will not fix a broken culture

![O&#x27;Reilly Conferences sur Flickr](https://c1.staticflickr.com/9/8053/29842348056_a46d176931_z.jpg)
[Crédit : Flickr](https://flic.kr/p/Mt4Qom)

# Le WebMobile, AMP, et les PWA

Plusieurs conférences avaient pour but de comparer ce que l’on pouvait obtenir de nos jours via du WebMobile versus ce que l’on a sur les apps natives. Le fossé s’est énormément rétréci et les WebApps ont désormais accès à la plupart des fonctionnalités présentes côté natif :

* Notifications
* Ajout sur le Home Screen de l'icone
* Full Screen
* Orientation
* Gestion hors ligne
* ...

Ce qui nous amène aux Progressive Web Apps : PWA

Pete Lepage [@petele](https://twitter.com/petele) de chez Google nous a notamment présenté des projets open-source de Google pour mettre en place différentes politiques de cache via les « serviceWorkers » (voir https://developers.google.com/web/tools/service-worker-libraries/), ainsi que les futures api : Web Payments, Credential Management ...

* Les [slides](goo.gl/0QcNQf).
* Exemple de la [PWA du Washington Post](https://wapo.com/pwa)

Toujours sur la partie mobile, Malte Ubl ([@cramforce](https://twitter.com/cramforce)), core développeur de AMP, nous a présenté le futur de ce protocole de Google pour offrir des pages plus rapides pour la consultation de site média sur mobile.

> AMP is a web component library, validator and caching layer for reliably fast web content at scale

En commençant par un bilan d’AMP, 3000 PR + 200 contributeurs (au bout d’un an seulement !), Malte nous a expliqué qu’un site mobile très optimisé pouvait logiquement être plus performant qu’AMP.

Arriveront prochainement sur AMP, le support des formulaires, des optimisations avancées d’images via le Google AMP Cache, des Service Workers pour AMP pour ne jamais télécharger AMP dans le « chemin critique » du chargement de la page.

Un petit focus a aussi été fait sur les PWA et AMP avec `amp-install-serviceworker` qui est un Service Worker permettant d’installer la PWA après chargement de AMP, pour faire une upgrade transparente de AMP vers une PWA (Voir une démo ici [choumx.github.io/amp-pwa](https://choumx.github.io/amp-pwa))

> AMP : « Start Fast, Stay Fast »

Nous avons aussi vu une conférence sur l’optimisation de la consommation des webApps en terme de CPU / temps de réponse, notamment via l’étude des capacités JS de chacun des devices/OS avec le benchmark JetStream Javascript.

On découvre notamment que l’iPhone 7 a des capacités assez impressionnantes, contrairement à l'iPhone 5C, que le mode « économie d’énergie » ou encore une bonne insolation rendent les devices beaucoup moins performants. D’excellentes slides à voir ici : [hearne.me/2hot](https://hearne.me/2hot)

# WebPerf

Côté WebPerf, peu de grosses nouveautés, on retiendra [@nparashuram](https://twitter.com/nparashuram) qui nous a montré comment automatiser le “profiling” des ChromeDevTools dans Node.js via ChromeDriver !

Plus d’infos ici : [https://blog.nparashuram.com/2016/09/rise-of-web-workers-nationjs.html](https://blog.nparashuram.com/2016/09/rise-of-web-workers-nationjs.html)

Tammy Everts ([@tameverts](https://twitter.com/tameverts) de Soasta) et Pat Meenan ([@patmeenan](https://twitter.com/patmeenan) de Google et créateur de WebPageTest) nous ont fait un gros retour basé sur toutes les métriques récoltées par Soasta mPulse (outils de Real User Monitoring en SAAS) afin de déterminer des corrélations entre les temps de chargement et d’autres métriques (taux de rebond, conversion, etc.) grâce à l’application de concept propre au Machine Learning sur une quantité énorme de data. Toujours intéressant.

Slides ici : [https://conferences.oreilly.com/velocity/devops-web-performance-ny/public/schedule/detail/51082](https://conferences.oreilly.com/velocity/devops-web-performance-ny/public/schedule/detail/51082)

![O&#x27;Reilly Conferences sur Flickr](https://c8.staticflickr.com/9/8322/29824346471_b189d1b8ab_z.jpg)
[Crédit : Flickr](https://flic.kr/p/Mrtz9c)

Côté Single Page App, le Server Side Rendering est revenu à plusieurs reprises afin d’avoir des SPA performantes dont le premier rendu est généré côté serveur, ce que permet nativement React, et désormais Ember et Angular 2. Voir [notre article sur l’isomorphisme](/2014/12/04/isomorphic-single-page-app-parfaite-react-flux).

Coté HTTP, on retiendra Hooman Beheshti qui nous a fait un retour d’expérience sur HTTP2. Après une explication des nouveautés du protocole (binary, single, long-lasting TCP connection, streams encapsulation, frames, bi-directional…), une comparaison avec HTTP 1 nous a été exposée. En conclusion, HTTP2 est complexe et la migration n'est pas une simple modification de paramètre. Bien que cette nouvelle version est légèrement plus rapide, en particulier sur un réseau lent (<1Mbps), le protocole supporte très mal les pertes de paquets ou les fortes congestions à cause de l’unique connexion (TCP slow start). La recommandation est de tester sur chaque site et d’optimiser ses pages selon la version d’HTTP utilisée. Une piste serait HTTP2 over UDP.

Les [slides](https://www.slideshare.net/Fastly/http2-what-no-one-is-telling-you)

# DevOps

De nombreuses conférences avaient pour objectif d’aborder les bienfaits du DevOps et plus largement les bonnes pratiques liées au mouvement afin de gagner en qualité et fiabilité.

On retiendra notamment la conférence de Cornelia Davis (DevOps: Who does what?) explicitant les différents rôles dans un SDLC (Software Development Life-Cycle) et leur répartition en équipe dans l’organisation.

## Les rôles dans le SDLC :

* **Architecte** : Ent Archi, Biz Analyst, Portfolio Mgmt
* **SCO** : Info sec
* **Infra** : Srv Build, Cap Plan, Network, Ops
* **Middleware/AppDev** : Middleware Eng, SW Arch, SW Dev, Client SW Dev, Svc Govern
* **Data** : Data Arch, DBA
* **Biz** : Prod Mgmt
* **Ent Apps** : DCTM (Documentum) Eng.

## La répartition en équipe proposée :

**Platform** (unique / transverse) :

* **Middleware/AppDev** : Middleware Eng, Svc Govern
* **Infra** : Srv Build, Cap Plan, Network, Ops
* **SCO** : Info sec
* **Data** : DBA

**Customer Facing App** (de 1 à n équipes)

* **Middleware/AppDev** : SW Arch, SW Dev, Client SW Dev
* **Data** : Data Arch
* **Infra** : Cap Plan, Ops
* **Biz** : Prod Mgmt
* **Architecte** : Biz Analyst

**Enablement** (unique / transverse) :

* **Architecte** : Ent Archi, Portfolio Mgmt

**DCTM** - Documentum (Enterprise Content Management Platform) (unique / transverse) :

* **Infra** : Ops, Cap Plan
* **Ent Apps** : DCTM (Documentum) Eng.

On notera notamment la présence d’Ops dans les équipes Customer Facing App et inversement de Middleware Eng dans l’équipe Platform.

De même, la présence d’architectes transverses (enablement) permet de garder une architecture cohérente. (Pas de slides disponibles pour cette conférence)

![O&#x27;Reilly Conferences sur Flickr](https://c8.staticflickr.com/9/8242/29281257423_6e74baae8e_z.jpg)
[Crédit : Flickr](https://flic.kr/p/LBu6FV)

# Microservices

La conférence de [@susanthesquark](https://twitter.com/susanthesquark), axée sur les microservices, rappelait quelques bonnes pratiques :

* Architecture sans SPOF
* Ne pas laisser la dette technique s’accumuler
* Déploiement continu
* Travail en équipe entre Dev / PM / SRE
* Monitoring
* Procédures standard de gestion des incidents
* Post-mortem pour apprendre de ses erreurs…

Les [slides](https://cdn.oreillystatic.com/en/assets/1/event/159/Mitigating%20sprawl%20with%20microservices%20and%20containerization%20Presentation.pdf)

Concernant le monitoring des microservices, la conférence de Reshmi Krishna [@reshmi9k](https://twitter.com/reshmi9k) s’intéressait à l’analyse de la latence, inhérente à ce type d’architecture. La principale technique proposée est celle du suivi d’une requête de bout en bout, grâce notamment à l’outil Zipkin. De même, une gestion des timeouts globale (pour chaque requête pour tous les microservices) et dynamique (selon le contexte) permet de maîtriser les problèmes en cas de ralentissement d’un service en particulier.

Les [slides](https://cdn.oreillystatic.com/en/assets/1/event/159/Distributed%20tracing_%20How%20to%20do%20latency%20analysis%20for%20microservices-based%20applications%20Presentation.ppt)

# Sécurité

Concernant la sécurité, la conférence de Kelly Lum [@aloria](https://twitter.com/aloria), passait en revue le minimun vital :

* La sécurité doit être pensée dès la conception
* Permettre aux utilisateurs de reporter facilement des problèmes de sécurité et être à l’écoute des réseaux sociaux
* Toujours remercier les utilisateurs signalant les failles
* Avoir une équipe testant régulièrement la sécurité (Crack Team).
* En cas de failles de sécurité, après correction, toujours analyser les causes et apprendre de ses erreurs.

Les [slides](https://cdn.oreillystatic.com/en/assets/1/event/159/Security%20at%20the%20speed%20of%20innovation_%20Defensive%20development%20for%20a%20fast-paced%20world%20Presentation.pdf)

# Conclusion

Vous pouvez retrouver la plupart des slides [ici](https://conferences.oreilly.com/velocity/devops-web-performance-ny/public/schedule/speakers).
et voir les vidéos de certaines conférences [ici](https://www.youtube.com/playlist?list=PL055Epbe6d5Zl1yShG26D2r2TzwDDoDfK).
ou [ici](https://www.oreilly.com/ideas/keynotes-from-velocity-new-york-2016).

Les photos officielles de la conf sont [ici](https://www.flickr.com/photos/oreillyconf/albums/72157670842287154).
