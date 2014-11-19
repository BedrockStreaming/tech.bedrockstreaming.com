---
layout: post
title: "Retour sur la velocity Barcelone - day 1"
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
permalink: velocity-europe-2014-day-1.html
---

# Velocity Barcelone, day 1

Baptiste, François et Olivier ont eu la chance de participer à la Vélocity Conférence Europe 2014 qui avait lieu cette année à Barcelone. 

Voici le compte rendu des conférences et des moments qui les ont marqués.


## Morning Keynotes

Les keynotes du matin semblaient être scénarisées sur différents points que les organisateurs de la conférence voulaient mettre en avant.

### Life after human error - Steven Shorrock (EUROCONTROL)

Steven Shorrock n’est pas un homme de l’IT, mais travaille autour de la sécurité aérienne. Il se définit comme un ergonomiste des systèmes. Il a présenté comment, autour des erreurs humaines, “les mots créaient le monde” et entrainaient immédiatement un jugement social (“négligence" est évidement plus connoté que “erreur d’attention”). Il peut y avoir des erreurs dans la définition d’une erreur. Qualifier une erreur demandait une définition précise de standard et de contextes.   
Il a également conseillé d’étudier les cas de fonctionnement normaux ; ne pas faire seulement des *post-mortem* mais des *pre* et des *no* mortem.

![hal](/images/posts/velocity2014/hal.jpg)

Une présentation intéressante sur l’incident et l’erreur.

<iframe width="560" height="315" src="//www.youtube.com/embed/STU3Or6ZU60" frameborder="0" allowfullscreen></iframe>

### Maximize the Return of Your Digital Investments - Aaron Rudger (Keynote Systems)

Une présentation sponsorisée bien faite, montrant les difficultés de communication entre deux populations (IT et biz en l’occurence) et comment un outil performant et agréable peut aider à combler ce gap.  
Chez M6Web nous utilisons grafana, et il est vrai que cet outil pourrait largement sortir du périmètre de l’IT. 


### Always Keep an Eye on Your Website Performance - PerfBar Khalid Lafi (WireFilter)

Une rapide démonstration d’un outil en javascript à installer sur les postes de vos développeurs et permettant d'afficher des alertes si un site en production (ou ailleurs) dépasse un certain seuil. 

A découvrir : [PerfBar](http://lafikl.github.io/perfBar/) 

<iframe width="560" height="315" src="//www.youtube.com/embed/xJogXOzmcSk" frameborder="0" allowfullscreen></iframe>

### The Impatience Economy, Where Velocity Creates Value - Monica Pal (Aerospike Inc.)

Il y a une génération on attendait 10 jours un échange de courrier postal, aujourd’hui un adolescent vérifie son téléphone toutes les 10 secondes ! Nous sommes moins attentifs, plus impatients.  
De ce constat Monica Pal explique comment les backend web doivent s’adapter et servir de plus en plus d’informations contextualisées : *search, sort, recommand, personalize*.

Slides : [The Impatience Economy](http://cdn.oreillystatic.com/en/assets/1/event/121/The%20Impatience%20Economy,%20Where%20Velocity%20Creates%20Value%20Presentation.pptx)

<iframe width="560" height="315" src="//www.youtube.com/embed/mgnLVSSfols" frameborder="0" allowfullscreen></iframe>

### Recruiting for Diversity in Tech Laine Campbell (Pythian)

Un thème récurrent de la velocity de cette année. Laine explique comment l’ascenseur *méritocratique* est cassé et que seul une démarche volontaire permettra d’augementer la diversité dans les entreprises. 

### Better Performance Through Better Design - Mark Zeman (SpeedCurve)

La dernière keynote était vraiment excellente. Mark Zeman, venu de Nouvelle Zélande, a expliqué comment le processus créatif pouvait aider à améliorer la performance. Dans ce but il a proposé de *redesign the design process*. 
- se fixer certains principes/objectifs de performance dès le départ 
- d’ajouter les designers dans la *feature team* et d’itérer via des prototypes
- de partager le savoir sous forme d’informations visuelles (graphique mais aussi sous forme [d'un bookmaklet](https://github.com/zeman/perfmap) indiquant qu'elle partie d'un site met du temps à charger)


![better_perf_with_better_design1](/images/posts/velocity2014/better_perf_with_better_design1.jpg)

![better_perf_with_better_design2](/images/posts/velocity2014/better_perf_with_better_design2.jpg)

Je vous invite vivement à regarder sa vidéo : 

<iframe width="560" height="315" src="//www.youtube.com/embed/DFImM0r4EpE" frameborder="0" allowfullscreen></iframe>

---

## IT Janitor, How to Tidy Up - Mark Barnes (Financial Times)

Ce manager au Financial Times a expliqué comment le journal a été touché de plein fouet par la révolution du web mobile et a dû s’adapter très rapidement. 

![transfo_mobile_FT](/images/posts/velocity2014/transfo_mobile_FT.jpg)

Il a expliqué quelle stratégie il a adopté pour tuer ou refaire les vieux systèmes et comment, en premier lieu, il a vendu le projet à ses supérieurs.  
Il a tout d’abord présenté le TCO de ce qu’il a appelé la version *”classic”* de ft.com (la carotte) puis a appuyé sur la peur de l’incident et les problèmes de sécurité (le bâton ; le journal ayant été la cible des pirates syriens. 

Après une analyse fine du traffic il a ensuite appliqué ces stratégies : 
- tuer directement une application inutile (il y en avait), quitte à la rallumer si quelqu’un finalement en à l’usage :) (et couper un serveur Solaris avec 1833 jours d’uptime !)
- reécrire l’application et la redéployer sur le nouveau système
- tuer une application et écrire plusieurs autres (découpage en micro services)

Son crédo était *”try to make the right thing easier.”* Ainsi les projets basés sur la nouvelle stack disposait *out of the box* de fonctionnalités de monitoring et de log. Cela a beaucoup motivé les équipes de développements. 

Au final la purge du legacy a apporter : 
- un gain de 30% de performance 
- un meilleur TTM
- de substantiels retours sur investissement

Slides : [IT Janitor - How to Tidy Up](http://cdn.oreillystatic.com/en/assets/1/event/121/IT%20Janitor%20-%20How%20to%20Tidy%20Up%20Presentation.pptx)

---

## Mansplaining 101: Cisadmin Edition - Marni Cohen (Puppet Labs)

La conférence la plus geek de la journée. La conférencière a ouvert un terminal et à tapé 

```bash
brew install feminism
```

![marni1](/images/posts/velocity2014/marni1.jpg)




La conférence était très sincère et didactique sur comment mieux intégrer les femmes dans l’IT. 


Voici les scripts et les ressources qu’elle a présenté : [https://gitlab.com/marni/mansplaining](https://gitlab.com/marni/mansplaining)

---

## Building the FirefoxOS Homescreen - Kevin Grandon (Mozilla) 

![Firefox OS](http://zef.me/wp-content/uploads/2013/05/FirefoxOS-logo_610x385.png)

Conférence de présentation de l'OS pour smartphone de Firefox.

Lors de cette présentation, Kevin Grandon Ingénieur chez Mozilla nous a présenté le nouvel OS, et nous a initié la programmation sur ce dernier.
Ce nouvel OS est donc basé sur des languages simples : HTML / CSS / Javascript. 

Le développement est donc assez facile à prendre en main, le débugage aussi car on peux monitorer tout ce qu’il se passe sur le device de test via un firebug dédié.

http://slidedeck.io/KevinGrandon/slides-fxos-home-screen-velocity-2014 

https://github.com/KevinGrandon/slides-fxos-home-screen-velocity-2014

---

## Don’t Kill Yourself : Mobile Web Performance Tricks that Aren’t Worth it, and Somme that Are - Lyza Gardner (Cloud Four) 

Optimisations pour le web mobile.

Lyza Gardner nous a présenté sa vision de l’optimisation sur web mobile. Elle nous a tout d’abord fait un compte rendu sur son expérience personnelle. Liza a chercher via différentes analyses (speedIndex…) à trouver une relation entre temps de chargement , nombres d’assets etc… Et la conclusion qu’elle mettais en avant, c’est qu’il n’y avais pas de recette magique. 
Elle a ensuite fait la parallèle entre le web lors de ces débuts qui était limité par le débit de nos connexions de l’époque, et le web mobile tel qu’il est actuellement. Ainsi certaines optimisation de l’époque sont adaptable, et même toujours valables, à nos problématiques actuelles.
Selon elle, il ne faut pas optimiser un site pour le mobile, mais l’optimiser tout cours. Elle propose de se fixer des objectifs, par exemple se fixer une limite de nombre d’appel asset. Mais surtout d’optimiser / limiter les images puisque 62% du trafic d’un site correspond a ces dernières.

---

## What are the Third-party Components Doing to Your Site’s Performance? - Andy Davies, Simon Hearne (NCC Group) 

 Nous utilisons tous des « Third-Party » sur nos sites, mais est-ce une bonne idée ?

Un Third-Party est un script que nous chargeons depuis un autre site. Par exemple : Google Analitycs. Il existe différents type de Third-Party : la publicité, les analyseurs de trafic … La problématique est que nous ne pouvons pas controller ces outils. Nous n’avons pas la main sur le temps de chargement, la disponibilité de l’outils, et cela peux influer sur l’expérience utilisateur et la qualité de nos services.

Pour conclure, il faut trouver le bon compromis entre ce que nous apporte le Third-Party et ce qu’il peux nous couter ...

---

## Guide to Survive a World Wide Event - Almudena Vivanco, Mateus Bartz (Telefónica

Slides : [Survive a World Wide Event](http://cdn.oreillystatic.com/en/assets/1/event/121/Guide%20to%20Survive%20a%20World%20Wide%20Event%20%20Presentation.pdf)

Retour d’expérience de Movistar TV, une chaine payante multi-support qui a diffuser la coupe du monde en Espagne, au Brésil et en Argentine. 

Cette société c’est confronté à une problématique de traffic avec des pics de connexions important en peu de temps. La société devais diffuser la coupe du monde FIFA 2014 dans plusieurs pays et sur plusieurs devices différents. Après des tests en condition réels avant le début de la compétition, ils se sont aperçus qu’ils ne pouvais pas gérer le pic de connexion qui arrivais entre 5 minutes avant le coup d’envoie et 5 minutes après, ainsi qu’a la reprise du match et début de deuxième mit-temps.  
Il a donc fallu tout refaire à plusieurs niveaux : 
* Création d’un CDN en interne
* Refonte globale du système de connexion pour pouvoir supporté les pics. 
* Mise en place de monitoring via Graphite
* Mise en place de Tests

Mais en jouant avance beaucoup de problématiques : 
* Multi plateforme
* Déploiement sur plusieurs continent (Amérique du Sud, Europe)
* Rassembler 11 outils de monitoring en un seul.



---

## Is TLS Fast yet ?

Slides : [Is TLS Fast yet ?](https://docs.google.com/presentation/d/1BH9DI1XlmukCzU2i8OvxLIfgQf_aGlZgZyvWDSyYyzs/present?slide=id.p19)

TL;DR = Oui, il pourrait l'être !

Le talent d'Ilya pour les conférences techniques une fois de plus a fait ses preuves. 
Tout en détaillant l'utilité de TransportLayerSecurity (compression, vérification d'erreurs, authentification, chiffrement...) Ilya nous prouve que dans le meilleur des cas, un RTT supplémentaire est nécessaire et l'impact CPU très faible. 

Outre l'utilisation des dernières versions du Kernel, d'OpenSSL et de votre OS serveur, la performance de TLS passe aussi par la réutilisation d'éléments négociés lors de la première (et coûteuse) poignée de main. Cette optimisation se fait coté serveur en conservant les "sessions identifiers" coté serveur ou coté client avec un "cookie" chiffré, le "session ticket". Il faudra bien entendu ajuster la durée de cache et/ou les timeouts (~ 1 jour).

Une erreur fréquemment commise consite à ne pas intégrer le certificat intermediaire (peu de CA s'autorise à signer votre certificat avec leur CA Root) dans le certificat serveur ce qui a pour conséquence de stopper le render, ouvrir une nouvelle connexion tcp et https pour récuperer ce dernier chez l'autorité de certification. 

L'OSCP stappling permet lui d'inclure directement la réponse OCSP est ainsi eviter le même problème de blocage du rendu, connexion à un tiers etc... 

L'utilisation hasardeuse de redirection 301 peut considérablement augmenter le Time To First Byte de votre site, il est donc fortement conseilé de bien analyser ses chaines de redirections (ex: http://domain.com => http://www.domain.com => https://www.domain.com) et d'utiliser HSTS. Ce header émis par le serveur permettra au navigateur de mettre en cache la décision de redirection vers https.

Le talk s'est terminé par un tableau comparatif fort intéréssant des serveurs HTTP et des CDNs concernant tout ces aspects.

Quelques liens supplémentaires:

https://www.ssllabs.com/ssltest/

https://www.feistyduck.com/books/bulletproof-ssl-and-tls/

---

## Monitoring: the math behind bad behavior

Slides : [the math behind bad behavior](https://speakerdeck.com/postwait/the-math-behind-big-systems-analysis)

La détéction d'anomalies dans les flux continus de données de type Time Series n'est pas une chose aisée. 

Se baser sur un percentile, une moyenne ou une mediane uniquement ne permet pas de capturer les phénomènes de saisonalités et d'anomalies.  

Théo nous a proposé une méthode de détéction de ces dernières appelée "lurching windows". Sur des fenetres de temps glissantes, on applique la méthode CUSUM (Cumulative Sum), qui somme les données en affectant un poids relatif (en réalité la probabilité que cette valeur existe).

A voir: [http://en.wikipedia.org/wiki/CUSUM](http://en.wikipedia.org/wiki/CUSUM)

---

## What ops can learn from design

"Un designer est quelqu'un qui design". 

Derrière cette lapalissade se cache en réalité plusieurs concepts importants à intégrer pour toutes personnes produisant un code, un service utilisé par un tiers. 

Nous sommes tous des designers. Il est donc indispensable de mettre en oeuvre 3 mécanismes simples pour faciliter l'utilisation de votre code/service. 

Le "Feedback": le bon code de retour lors de l'échec d'un script, un message intelligible et contextualisé dans un log d'erreur applicatif, le "natural Mapping": -d dans une option en ligne de commande pour indique --database, et le "force functions": sous Unix, kill est par défaut non destructif, il faut forcer avec kill -9 pour tuer définitivement un processus, tout comme on vous force à fermer la porte de votre micro-onde pour le mettre en marche. 

Conférénce intéressante qui vous fera sentir moins coupable de ne pas savoir si il fallait pousser ou tirer une porte :)

---

## Statistical Learning-based Automatic Anomaly Detection @Twitter


Arun Kejariwal est maintenant un habitué de la Velocity, j'avais particulièremnt apprécié sa présentation l'année dernière à Londres sur la détéction d'anomalies chez twitter. 

L'ojectif est toujours le même: prédire la capacité pour ajouter du matériel en datacenter, détécter des événements particulier, distinguer le spam du trafic normal etc...

Leur méthode est relativement identique à ce qui avait été présenté l'année dernières: sur deux semaines de données on applique un traitement du signal pour décomposer et filtrer la saisonalité. Il "suffit" ensuite d'appliquer une regression ou un ESD sur les résidus pour détécter d'eventuels anomalies.

Chose à savoir: Twitter va publier un package R contenant ces fonctions et algorithms, qui seront donc utilisables par le commun des mortels !




