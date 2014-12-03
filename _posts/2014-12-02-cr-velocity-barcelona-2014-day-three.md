---
layout: post
title: "Retour sur la Velocity Barcelone - troisième journée"
description: "Retour sur la Vélocity Europe 2014 à Barcelone - Troisième journée"
author:
  name:           Baptiste, François Verron et Olivier Mansour
  avatar:
  email:
  twitter:  techM6Web
  facebook:
  github:
category:
tags: [conference,velocity,webperf,devops,sysadmin]
image:
  feature: posts/velocity2014/velocity_banner3.jpg
  credit: oreillyconf
  creditlink: https://www.flickr.com/photos/oreillyconf/15790152366/in/set-72157649351412705
comments: true
permalink: velocity-europe-2014-day-2.html
---

# Velocity Barcelone, troisième journée

Le troisième jour étant dédié aux tutoriaux, on passe de conférence de 45min à des ateliers de 1h30.

## Extreme Web Performance for Mobile Devices

Maximiliano Firtman nous a dressé un portrait vraiment exhaustif du web mobile et de l'état actuel des navigateurs. 

![browser_mess](/images/posts/velocity2014/browser_mess.jpg)

En gros c'est compliqué. Le marché est très fragmenté, certains constructeurs comme Samsung ajoute du bruit en diffusant massivement un navigateur modifié. L'usage des sites en webview depuis une application native n'arrange pas les choses (par exemple, l'application Facebook).

Après un rappel sur l'importance de la performance, l'orateur a distillé de nombreuses pratiques permettant de faire un web mobile plus performant.
  
On peut retenir : 

 - Le RWD est un outil, pas un fin en soi,
 - il faut s'imposer de tester sur du hadware *cheap* avec une connection faible,
 - ne pas oublier le temps perdu sur le réseau (*600ms mandatory network overhead*),
 - ne pas oublier l'impact que le parsing du JS et le rendu CSS est bloquant,
 - utiliser les solutions de stockage coté client,
 - de très nombreux outils de simulation existent, il faut les maitriser.

Il propose un site récapitulatant toutes les informations délivrées : [http://firtman.github.io/velocity/](http://firtman.github.io/velocity/).

Slides :  

<iframe src="//www.slideshare.net/slideshow/embed_code/41739320" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/firt/extreme-web-performance-for-mobile-devices-velocity-barcelona-2014" title="Extreme Web Performance for Mobile Devices - Velocity Barcelona 2014" target="_blank">Extreme Web Performance for Mobile Devices - Velocity Barcelona 2014</a> </strong> from <strong><a href="//www.slideshare.net/firt" target="_blank">Maximiliano Firtman</a></strong> </div>

---

## Zero Downtime Deployment with Ansible

![ansible](http://www.ansible.com/hs-fs/hub/330046/file-764918161-png/Official_Logos/ansible_logo_black_square.png)

[Slides](http://cdn.oreillystatic.com/en/assets/1/event/121/Zero%20Downtime%20Deployment%20with%20Ansible%20Presentation.pdf)

[Github Repo](https://github.com/steinim/zero-downtime-ansible)

Tutorial intéressant conduit par un développeur (sur un sujet à priori plus opérationnel) qui démontre bien la flexibilité et la simplicité d'Ansible.

Après avoir mener le tutorial à son terme vous aurez deployé deux machines avec du code Java, un load balancer NGINX, et une base de données PostgreSQL (utilisateur + base).

A contre courant des systèmes de gestion de configurations comme SaltStack, Puppet ou Chef, Ansible est basé sur le modèle push et ne nécessite aucun agent, il repose entièrement sur SSH. D'autre part il mixe gestion de configuration **et** orchestration, ce que qu'on doit bien souvent faire via des outils tiers comme MCollective.

La simplicité de ce modèle en fait sa plus grande force. Ansible est capable de gérer dynamiquement les inventaires (de base c'est une liste statique contenue dans un fichier). Par exemple il est capable d'interroger les APIs Amazon, Google Cloud ou RackSpace pour récupérer la liste de vos machines, celles de votre Cluster VMWare ou n'importe quel script qui sortira une liste en JSON.

Alors que Chef et Puppet offrent une DSL pour décrire votre infrastructure sous forme de code, Ansible a opté pour une description au format YAML. Sur l'Ansible Galaxy vous retrouverez tout les modules disponibles (quelques milliers) comme Nginx, PHP etc... Développés en Python, il est évidemment possible de faire soit même ses modules.

Le déploiement avec zéro temps de panne peut être implémenté avec Ansible de la façon suivante:

- récupération de la liste des machines
- sortie du load balancer d'une machine (Ansible est compatible GCE et AWS)
- mise à jour de la configuration (code et/ou logiciel)
- période d'attente: vous spécifiez si un port TCP doit être disponible, un fichier, etc...
- itération sur la machine suivante

Le nombre de machine traitées en parallèle est bien entendu configurable.

![ansible_deploy](http://cdn2.hubspot.net/hub/330046/file-480404281-png/site_diagrams/app_deploy_diagram.png?t=1416582132229)

Je suis Ansible depuis quelques mois déjà et j'ai été conforté dans l'idée que c'est un excellent produit: pas d'agent, basé sur une brique solide qu'est SSH, et développé en Python :) La gestion de l'inventaire peut être délicate, mais un CMDB comme [Collins de Tumblr](http://tumblr.github.io/collins/index.html) ou un taggage précis peuvent résoudre l'équation.

Ansible facilite le déploiement d'infrastructure immuable, le blue/green, violet et canary deployment de par son modèle. C'est un atout qui en fait à mon sens le meilleur système de gestion de configuration aujourd'hui.

Cependant je reste encore un peu dubitatif sur le déploiement et le rollback de code qui ne sont pas encore à la hauteur de Capistrano. Un aperçu du workflow et des schémas de développement auraient été aussi bienvenus.

- [Ansible Galaxy](https://galaxy.ansible.com/)
- [Ansible Docs](http://docs.ansible.com/index.html)
- [How Twitter use Ansible](https://www.youtube.com/watch?v=fwGrKXzocg4)
- [Ansible Tower (Payant)](http://www.ansible.com/tower)
- [Thoughts on deploying Symfony with Ansible](http://www.future500.nl/articles/2014/07/thoughts-on-deploying-with-ansible/)

---

## Linux Containers from Scratch

![container](http://image.slidesharecdn.com/linuxcontainersfromscratch-velocitybarcelona2014-141119031144-conversion-gate01/95/linux-containers-from-scratch-1-638.jpg)

[Slides](http://fr.slideshare.net/joshuasoundcloud/linux-containers-from-scratch-velocity-barcelona-2014)

Quelle est la différence entre le cloud, les containers et un repas gratuit ? Aucun n'existe :)

Joshua Hoffman (SoundCloud) est dans le top 5 de mes orateurs préféré. J'ai beaucoup apprécié ce tutorial car il fait clairement la part entre virtualisation, containers, LXC et Docker (nom qui ne sera prononcé qu'à la fin lors des questions, pas de buzzword, de hype ni de marketing, merci Joshua).

![containers](http://cdn1.cloudtp.com/wp-content/uploads/sites/13/2014/06/Containers.jpg)

Le tutorial vous aménera à créer plusieurs containers portable, du plus simple ou plus complexe, avec les outils de bases du noyau. Vous apprendrez aussi à vous servir des cgroups, des namespaces process, network, et mount, et serez amené à utiliser des systèmes de fichiers unis, ici AUFS.
J’aurais bien aimé une démo avec le format de QEMU ou btrfs pour ce qui est des systèmes de fichiers unis au niveau bloc.

Ce tutorial est un must-do pour tout personne désirant s’initier aux architectures de containers. Le marketing relativement agressif de Docker ne doit pas faire oublier qu'il existe d'autres alternatives, et que Docker est un choix de design bien particulier pas forcement adapter à tous.
Ex: un container en 3 lignes:

![container](http://image.slidesharecdn.com/linuxcontainersfromscratch-velocitybarcelona2014-141119031144-conversion-gate01/95/linux-containers-from-scratch-26-638.jpg)

Pour rappel:

LXC/LXD = Ensemble d'APIs et d'outils dans l'espace utilisateur linux exposant les capacités d'isolation du noyau (cgroups, chroot, namespaces, selinux, iptables etc...), alternative légère à la virtualisation telle qu’on la connaît (avec Vmware par exemple)

Docker = un des cas d'usage des containers, application unique, statique, immuable, single app delivery plateform

[LXC](https://linuxcontainers.org/)

[Docker F.A.Q](https://docs.docker.com/faq/)

---

## CoreOps - CoreOS for Sysadmins

![coreOs](https://coreos.com/assets/images/brand/coreos-wordmark-horiz-color.png)

[Github](https://github.com/kelseyhightower/coreos-ops-tutorial)

Tutorial très attendu par beaucoup, Kelsey Hightower (CoreOS Inc.) nous a présenté l'écosystème de CoreOs et les problèmes qu'il tente de résoudre. Suite à la demande générale il nous a aussi fait une démonstration de Kubernetes, l'outil de gestion de containers de Google.

CoreOS est distribution Linux accompagnée d'outils qui vise à penser le datacentre comme une seule machine (voir Mesos/Yarn). En d'autres termes, vous n'avez que faire de savoir quelle application tourne sur quel serveur. Le datacentre apparaît comme une entité unique où l'on déploie des applications.

Techniquement, CoreOS est un Linux + systemd + docker + etcd + fleet. CoreOS est basé sur Chrome OS, épuré et léger, il bénéficie du système d'update en arrière plan bien connu de Chrome. On oublie donc le gestionnaire de paquets, les outils de debug (tcpdump etc..) et tout ce qui fait un Linux en mode serveur tel qu'on le connaît.

- **gentoo**: parfum de distribution Linux (ex: Ubuntu, Debian, Centos)
- **systemd**: alternative à SysV Init, le gestionnaire des démons, le premier programme lancé au démarrage (PID: 1)
- **docker**: Système de containers légers, ensemble d'apis et librairies centrés sur le déploiement et la gestion d'application isolée du kernel.
- **etcd**: base de données clé/valeur distribuée, utilisée pour centraliser la configuration et la découverte de service, fondée sur le protocole de consensus Raft.
- **fleet**: SysV Init distribué (c'est la glue entre systemd et etcd), votre programme doit au minimum avoir 3 instances ? fleet s'en assurera !

![core_os_archi](https://coreos.com/assets/images/media/Host-Diagram.png)

![core_os_archi2](https://coreos.com/assets/images/media/5-Machine-Cluster.png)

La démonstration vous amènera à lancer 1 master et plusieurs machines "workers" et quelques containers Docker.

![kubernetes](http://kubernetes.io/img/desktop/hero_logo.svg)

Kubernetes est la réponse de Google à la question des gestionnaires de containers disitribués.

Constitué d'un certain nombre de composants qu'on ne détaillera pas ici, il permet de gérer des pods (un ou plusieurs containers qui doivent fonctionner localement sur le même host). Il intervient dans la répartition des applications dans le cluster, la distribution et l'ordonnancement des containers Docker.

Liens:

- [CoreOS Doc](https://coreos.com/docs/)
- [Kubernetes](http://kubernetes.io/)
- [Introduction to Kubernetes](https://www.digitalocean.com/community/tutorials/an-introduction-to-kubernetes)

--

## Responsive and Fast: Iterating Live on a RWD Site

Cette conférence est globalement une redite des autres sur l’optimisation côté front. Colin Bendell d’Akamai nous présente plusieurs outils comme webpagetest, mais aussi des astuces pour tester sur Device depuis chrome. Il nous rappelle qu’il faut faire attention aux conditions de tests avec certains facteurs comme la connexion. Il faut faire aussi attention à limiter le nombre d’images, de ressources (js, css …). Un des gros problèmes sur un site responsive, est celui des images. Pour éviter de charger des images trop importantes, il faut utiliser la balise <picture>. Cette nouvelle balise n’étant pas disponible sur tous les navigateurs, il nous conseille d’utiliser un composant Picturefill. En ce qui concerne les CSS, il conseille d'inliner les css critiques et de ne charger, par la suite, que les css correspondant au device que l’on utilise. Pour conclure, l’utilisation d’un CDN avancé est hautement recommandée grâce à des options permettant de différencier navigateur / devices.

Liens :
- [Slide de la présentation](http://fr.slideshare.net/AkamaiTechnologies/edge-2014-responsive-fast-iterating-live-on-modern-rwd-sites)

---

## Build a device lab

- "Qui a un placard avec pleins de devices en vrac qui n'ont ni câbles, ni batterie et dont vous ne connaissez plus le mot de passe ?"

J'ai levé la main ;) .

Lara Hogan et Destiny Montague nous ont expliqués comment Etsy avait construit un *device lab*, permettant à leurs collaborateurs d'emprunter des appareils mobiles pour tester leur applications, sites mobiles et newsletters.

L'idée est d'outiller puissament les équipes et leur donner un accès extrement simple à un parc complet (même un chromebook pixel !) - afin d'assurer un maximum de tests sur les différents équipements.

Bien sur il y a un *device lab* pour les équipes techniques et un autre pour le produit / marketing. 

Les sujets suivants ont été abordées : 

- choix des appareils
- consommation électrique
- le setup des devices (à l'aide d'un Mobile Device Management) 
- les tests
- le réseau
- un retour complet sur l'expèrience utilisateur

Un site complet dédié à leur conférence est disponible : [http://larahogan.me/devicelab/](http://larahogan.me/devicelab/).

Une vidéo de la même conférence à New York est également en ligne : 
 
 <iframe width="853" height="480" src="//www.youtube.com/embed/QOatJD_3bTM" frameborder="0" allowfullscreen></iframe>
 
 <iframe width="853" height="480" src="//www.youtube.com/embed/YBn_bQrdVRI" frameborder="0" allowfullscreen></iframe>
 
 Une conférence un peu #old car déjà faite, mais toujours d'actualité concernant la problématique. Je suis bluffé par la capacité d'Etsy à mettre en oeuvre des moyens et des compétences sur des sujets qu'ils estiment important. C'est surement en ligne avec le succès que la société rencontre actuellement.

---

## Conclusion

Une conférence dense et intéressante, qui nous a donnée l'opportunité de rencontrer pleins de gens intéressants et même de visiter (un peu) Barcelone !

![sagrada](/images/posts/velocity2014/sagrada.jpg)
