---
layout: post
title: Bedrock au Kubernetes Community Days France 2023
description: Notre retour sur cette édition de Kubernetes Community Days en France
author: christianvdz
tags: [kubernetes, cloud, devops, opensource, community, conference, rex]
color: rgb(251,87,66)
thumbnail: "images/posts/2023-kcd-france/KCD_LOGO_2023-color-2000px.png"
---

La première édition de KCD (Kubernetes Community Days) en France s’est déroulée le 7 mars au Centre Pompidou et rassemblant près de 1000 participants pour une belle journée de conférences.

!["Accueil centre Pompidou"](/images/posts/2023-kcd-france/centre-pompidou.png)

KCD a rassemblé les communautés tech françaises pour cette journée de partage d’expertise et de retours d’expérience autour de Kubernetes et des technologies Cloud Native et DevOps.

Solomon Hykes, son acolyte Jérome Petazzoni et l’Éducation Nationale ont présenté la [keynote d’ouverture](https://www.youtube.com/watch?v=OKIehz7p4ug){:target="_blank"}.
Cette première keynote à permis d’introduire le projet Santorin du Ministère de l'Éducation. C’est un système d’aide à la correction et à la notation pour lequel ils utilisent 3 clusters afin d’analyser 5 millions de copies.

<center>
  <img alt="Solomon Hykes et Jérôme Petazzoni" src="/images/posts/2023-kcd-france/keynote.png">
</center>
<center>Solomon Hykes & Jérôme Petazzoni</center>
<br>

Des grands acteurs de la tech en France tels que Scaleway, OVHCloud, Shadow, eTF1, Back Market, vpTech, Doctolib, Deezer, Carrefour et l’Éducation Nationale étaient présents pour rapporter leurs expériences. 
Les trois salles nommées aux couleurs du drapeau français étaient disponibles tout au long de la journée pour accueillir la quarantaine de conférences organisées par KCD.

### La plus-value d'un portail développeur chez Back Market <a name="BackMarket"></a>

Conférence présentée par :

* Sami Farhat - Backend Engineer

Back Market, entreprise française de commerce électronique, est venue nous parler de leur implémentation 
d’un “DevPortal” basé sur le projet [Backstage.io](https://backstage.io/){:target="_blank"}.

!["Backstage Main features"](/images/posts/2023-kcd-france/backmarket-devportal-1.jpg)

La création de ce portail développeur à été initié en 2021 suite au projet de mise à l’échelle et de passage en microservices de leur applications.

Initialement, chaque nouveau service était créé manuellement et nécessitait du travail dans les équipes d’infrastructure.
En plus de demander du travail lors de leur création, les services n’étaient donc pas systématiquement créés avec les mêmes bases de codes et pouvaient différer dans leurs implémentation.

Le but était donc d’obtenir une vue centralisée sur les projets et de permettre aux développeurs de créer de nouveaux services eux-mêmes.

!["Central Hub: Goal"](/images/posts/2023-kcd-france/backmarket-devportal-2.jpg)

La création de ce portail à également permis à Back Market d’initier l’utilisation d’un modèle pour la création de services, ainsi d’uniformiser les architectures et de faciliter le passage en microservices.

Ils ont également implémenté une vue relationnelle concernant les projets et les équipes qui y sont associées.

!["Entity Relationships Graph"](/images/posts/2023-kcd-france/backmarket-devportal-3.jpg)

Enfin, pour trouver les projets prioritaires pour la migration en microservices, ils ont créé une vue nommée Coupling scores :

!["Coupling scores dashboard"](/images/posts/2023-kcd-france/backmarket-devportal-4.jpg)

C’est une vue qui permet d’obtenir la liste des applications monolithiques avec le taux de couplage le plus élevé.

Le replay de cette conférence est disponible [ici](https://www.youtube.com/watch?v=2XghfHsbRtw){:target="_blank"}.

### VPC dans k8s : Pas aussi simple que ça en a l’air <a name="Scaleway"></a>

Conférence présentée par : 

* Louis Portay - Ingénieur DevOps Kapsule Scaleway

Au tour de Scaleway qui nous ont présenté comment ils ont implémenté les VPC privés dans le service Kaspule, leur Kubernetes managé.
C’est un besoin qui s’est présenté afin d’éviter que les échanges inter-noeuds transitent via le réseau public.

!["Kaspule sans VPC privé"](/images/posts/2023-kcd-france/scaleway-vpc-1.jpg)

Pour utiliser le réseau privé dans Kaspule, ils ont ajouté une interface nommée “kapsule0” sur les instances utilisées dans la création du cluster. Cette interface est ensuite attachée à [Cilium](https://cilium.io/){:target="_blank"} dans le cluster.

!["Kaspule avec VPC privé"](/images/posts/2023-kcd-france/scaleway-vpc-2.jpg)

Cette fonctionnalité est actuellement en bêta, elle sera bientôt disponible de manière régionale.

Parmi les implémentations futures, Scaleway prévoit de proposer la possibilité de retirer l’interface réseau publique afin que tous les échanges entre Kubelet et le Control Plane passent également via le réseau privé.

Le replay de cette conférence est disponible [ici](https://www.youtube.com/watch?v=FobnKozk2Z8){:target="_blank"}.

### Kubernetes the not so hard Veepee way <a name="Veepee"></a>

Conférence présentée par :

* Loïc Blot - Lead SRE Veepee
* Mickaël Todorovic - Tribe Lead SRE Veepee

Loïc et Mickaël de Veepee sont venus présenter l’évolution des infrastructures utilisées par l’entreprise.
Initialement, avant 2019, ils comptaient plus de 10 000 machines virtuelles dans leur parc.
Ces machines hébergaient les applications de Veepee via diverses technologies :
* Swarm
* Rancher
* Hashicorp Nomad
* Docker compose
* LXC

En 2019, pour anticiper la gestion de la vente des tickets pour le concert de Céline Dion, ils ont choisi de migrer leurs services sur des clusters Kubernetes.
La première infrastructure était managée via Ansible, ils utilisaient Traefik et un cert manager home made.

!["Kubernetes deployment evolution"](/images/posts/2023-kcd-france/veepee-1.jpg)

Aujourd’hui, ils fournissent un produit Container as a Service nommé [Starfish](https://medium.com/vptech/standardized-deployment-at-vptech-7ebf8b8c6a1b){:target="_blank"}. C’est un outil qu’ils ont écrit en Go et qui permet de gérer les applications des équipes Veepee. Ils utilisent également Gitlab et [ArgoCD](https://argoproj.github.io/cd/){:target="_blank"}.

Le replay de cette conférence est disponible [ici](https://www.youtube.com/watch?v=vD8bVD7-iZo){:target="_blank"}.

### Conclusion

La majorité de conférences auxquelles j'ai assisté étaient des retours d'expérience. C'était particulièrement intéressant car en plus de la présentation d'une technologie, nous avons un retour détaillé sur l'usage de cette dernière.

Merci à tout les speakers pour leur partage de connaissances et aux organisateurs de KCD France.
