---
layout: post
title: "Retour sur le forum PHP 2014 organisé par l'AFUP"
description: ""
author:
  name: Team Burton
  avatar: 
  email:
  twitter: techM6Web
  facebook:
  github:
category:
tags: [afup, php, forumphp,conference]
image:
  feature: posts/forumphp2014/cover.jpg
  credit: Olivier Mansour
  creditlink: 
comments: true
permalink: 
---

> On a dit qu’on ne parlait pas du jeudi soir !

M6Web était présent en force avec 5 collaborateurs présent à l’évènement. Voici un retour des conférences qui nous ont le plus marquées.

## Vers des applications "12 factor" avec Symfony et Docker

Cette session avait pour objectif de nous présenter la méthodologie du “twelve-factor app”, à travers des exemples concrets pour PHP à l’aide de Symfony et Docker.

[“The twelve-factor app”](http://12factor.net/) est une suite de recommandations, indépendante d’un langage de programmation particulier et pouvant s’appliquer à toutes sortes de logiciels développés en tant que service.

Sans revenir sur l’ensemble de la présentation, voici un retour sur les 12 facteurs :

* Codebase : une app = un repo (ou équivalent) servant de source à tous les déploiements (dev / preprod / recette / prod  etc.). Exemples : git, mercurial etc.
* Dependencies : déclaration explicite et complète de l’arbre de dépendances, utilisé uniformément pour tous les environnements. Exemples : composer, npm etc.
* Config : séparation stricte config/code (Resources, Backing services, Credentials, Hostname etc.). Exemples : parameters.yml pour Symfony 2 ou utilisation de variables d’environnement avec Docker notamment. Utilisation de fig pour l’orchestration des containers docker.
* Backing Services : tous les services utilisés par l’application sont accessibles par le réseau. Il n’y a pas de distinction entre les ressources locales et distantes car toutes sont accessibles via URL et/ou Credentials. Exemples : MySQL, RabbitMQ, Postfix, Redis, S3 etc.
* Build, release, run : séparation stricte entre 
  * “build stage” : téléchargement d’une version du code et des dépendances. Exemples : “docker build”
  * “release stage“ : utilise le “build” et le combine avec la configuration du déploiement (une version sur un environnement). Exemple : “docker push”, utilisation de capistrano...
  * “run stage” : lancement de la “release” sur l’environnement cible. Exemple “docker run” ou “fig run”
* Processes : chaque composant de l’application est ‘sans état’ et ne doit pas partager directement des données. Tout doit être partagé en “backing service”.
* Port binding : les services doivent être disponibles en mettant à disposition un port d’accès, directement accessible. Cela permet une utilisation aisée en environnement de dev mais également de réutiliser les services.
* Concurrency : une application respectant les “12 factor” est facilement scalable, quel que soit son type (web, worker, etc.) car elle repose sur des composants systèmes pour son pilotage.
* Disposability : robustesse par le lancement et l’arrêt rapide des services, pour rendre chacune de ses services scalables.
* Dev/Pro parity : homogénéité des environnements dev/prod et gain de temps pour la prise en main d’un projet. (mais le développeur n’aura pas une vision précise de la configuration… boite noire ?)
* Logs : traitement des logs en tant que flux, utilisés par des services. Exemples : ELK, StatsD/Grafana etc.
* Admin process : Exécuter les tâches de maintenance sur les mêmes environnements/containers. Exemples : docker exec

[slides](https://speakerdeck.com/ubermuda/vers-des-applications-twelve-factor)

Personnellement, j'ai trouvé cette conférence vraiment riche et instructive. Peut-être un peu plus d'exemples de configuration fig/docker aurait pu illustrer d'avantage. 

## La mesure ce n'est pas que pour le devops

Les conférenciers ont commencé leur présentation sur un rappel de ce qu'est le Lean Startup, héritier de la méthode Lean mise au point par Toyota. Nous connaissions la démarche Lean mais pas du tout son approche spécifique au lancement d'un produit .

Le concept pourrait se résumé à : la base du lean startup est de savoir écouter -ses utilisateurs- car le succès dépend d'un feedback mesurable.

Le processus d'application est très simple : un cycle construit/mesure/apprend.

S'en est logiquement suivi une énumération des manières de mettre en oeuvre le processus en sachant prendre en compte les mesures qui importent (AAA, AARRR), plutôt que des “mesures de vanité” (followers, nombre de visite,..).

Enfin pour appliquer ces mesures, une présentation des outils a disposition a été faite.

<iframe width="560" height="315" src="//www.youtube.com/embed/8tgvbue4Qqo" frameborder="0" allowfullscreen></iframe>

## PHP dans les distributions RPM

[Slides](http://blog.famillecollet.com/public/Docs/PHPRPM.pdf)

Cette session avait comme objectif de faire un état de PHP dans les distributions RPM RHEL/Centos/Fedora.

RHEL / Centos :
* Objectif de stabilité à 10 ans
* Stabilité binaire et de configuration sur la durée de vie de la distribution
* RHEL : version payante avec support (contacts avec les ingénieurs RedHat, ressources en ligne, cycles de mises à jour garantis etc.).
* Centos : même code que RHEL (juste recompilé) mais uniquement un support communautaire (comme fedora, ubuntu, suse...).
* RHEL 5 : PHP 5.1 / RHEL 6 : PHP 5.3 / RHEL 7 : PHP 5.4
* Application des patchs de sécurités sur les versions anciennes de PHP pendant 10 ans.
* Possibilité d’utiliser des repos tiers pour choisir une version plus récente spécifique (comme ceux de Remi Collet) - mais pas de support officiel.
* Distributions plutôt destinées à des applicatifs maintenus sur le long terme.

Fedora 21+ :
* 3 sous distributions : Workstation / Server / Cloud
* Dernière version de PHP (PHP5.5 pour f20 et PHP5.6 pour f21)
* Intégration continue de PHP dans les cycles de Fédora. Permet d’éviter les régressions.

A venir : Software Collections (scl) permet d’avoir TOUTES les versions de PHP souhaitées simultanément sur la même installation de Fedora. **Vraiment prometteur** !

Exemple d’utilisation des SCL en cli : 


    scl enable php56 -f myscript56.php
    scl enable php56 bash
    scl enable php53 -f myscript53only.php
    scl enable php53 bash



Dans une config apache :

    <VirtualHost *:80>
    ServerName php56scl
    
    # Redirect to FPM server in php56 SCL
    <FilesMatch \.php$>
    SetHandler "proxy:fcgi://127.0.0.1:9006"
    </FilesMatch>
    </VirtualHost>

## Frameworks: A History of Violence

![president](/images/posts/forumphp2014/francoisz.jpg)

Francois Zaninotto nous a offert un vrai show en se mettant dans la peau d'un homme politique candidat à la présidence du parti des développeurs. Avec beaucoup d'humour il a fait un retour sur l'évolution (sa propre évolution ?) du développement web et son futur hypothétique, tout en distillant (son programme) de précieux conseils pour être de meilleur développeur.

Son programme :
 
* Le domaine d'abord : lier son développement métier à un minimum de tierce partie (pas facile à faire !),
* Dites non au full-stack (ça se discute !),
* L'application plurielle : ne pas hésitez à mélanger différents langages et différents projets dialoguant via http sur une même application,
* Repenser le temps : passons au 32h pour nous permettre de faire de la veille.
 
 A la communauté PHP nous pourrions proposer une synthèse (entendu ailleurs) : *"soyons plus des développeurs web que des développeurs PHP, soyons plus des développeurs que des développeurs web"*. 
 
<iframe width="560" height="315" src="//www.youtube.com/embed/ep3Oztvy0rk" frameborder="0" allowfullscreen></iframe>

## Retour d'expérience ARTE GEIE : développement d’API

Un conférence donnée par un de nos confrères d’ARTE sur des problématiques très actuelles pour nous. [François Dume](https://twitter.com/_franek_) a expliqué la stratégie de mise en place d’une API autour de [JSON API](http://jsonapi.org/) et des microservices. L’utilisation de OpenResty et du langage Lua couplé à un serveur oAuth en Symfony2 gérant la validation des tokens et le throttling.

Il a ensuite expliqué en détail l’implémentation de {json:api} dans Symfony2, en mettant en avant de nombreuses contributions open-source.

![archi de l'API ARTE](/images/posts/forumphp2014/arte.jpg)

Une conférence didactique et claire. 

<iframe width="560" height="315" src="//www.youtube.com/embed/nxqEpkTV_BE" frameborder="0" allowfullscreen></iframe>

## VDM, DevOps malgré moi

[Maxime Valette](https://twitter.com/maxime) nous expliqué comment il a (à 20 ans à peine) crée un business incroyable sur Internet et a surtout réussi à gérer une augmentation de 30 à 40K visiteurs de plus chaque jour avec pratiquement juste sa b* et son c*.


    - Comment on fait ? 
    - Comme on peut !
 

De vrai qualité d'orateur pour Maxime et une conf très rafraichissante. Une démonstration de lean startup par l'exemple. Même si ce choix n'a pas été discuté, PHP était un choix naturel pour lui à l'époque.
 
 <iframe width="560" height="315" src="//www.youtube.com/embed/rZrj_1IFGCM" frameborder="0" allowfullscreen></iframe>

## Table ronde "Etat des lieux et avenir de PHP"

[Pascal Martin](https://twitter.com/pascal_martin) a animé d’une main de maître une table ronde sur l’avenir de PHP. Avec Jordi Boggiano, lead developer de Composer, Pierre Joye, core dev de PHP, Julien Pauli, release manager de PHP 5.5 et co-RM de PHP 5.6. 

La communauté se pose beaucoup de questions sur le devenir de l’engine PHP et comment va évoluer le langage.   
Les débats ont été intenses et les invités ont pu répondre à des questions posées via Twitter. Au final peu de conclusions définitives. On peut déduire que malgré les alternatives proposées par HHVM et HippyVM, la communauté reste majoritairement sur PHP et est toujours très friande d’évolutions du langage et de sa performance. Les invités de la table ronde ont exhortés les participants à contribuer au code de PHP en nous fournissant pas mal de conseils.

<iframe width="560" height="315" src="//www.youtube.com/embed/U4dYlxQATlk" frameborder="0" allowfullscreen></iframe>

## Slideshow Karaoké
   
Une honte ! En plus les slides n’avaient aucun sens ! :) Bravo à [Mc Kenny](https://twitter.com/kenny_dee) pour l'animation.

<iframe width="560" height="315" src="//www.youtube.com/embed/Ln12meWM1pE" frameborder="0" allowfullscreen></iframe>

![Les participants au karaoké](/images/posts/forumphp2014/ss_karaoke.jpg)   
   
Un grand merci à l’AFUP pour ce joli évènement ! Retrouvez pas mal de ressources partagés pendant l'event sur [eventifier](http://eventifier.com/event/frmphp/).
