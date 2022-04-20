---
layout: post
title: AWS Summit 2022, notre retour d'expérience
description: Cinq de nos devops, ops et développeurs ont pu se rendre au AWS Summit, en voici un retour d'expérience
author: bedrock
tags: [aws, summit, cloud, sysadmin, conference, kubernetes, ]
color: rgb(251,87,66) # this is Bedrock color here
thumbnail: "images/posts/2022-04-20-aws-summit-2022-notre-retour-dexperience/main-image.png"
---

Deux années se sont écoulées depuis le dernier AWS Summit à Paris, il a fait son retour ce 12 avril !  
Cet évènement, qui a lieu au printemps dans plusieurs pays, est l’occasion de rencontrer la communauté AWS française, d’assister à de nombreuses conférences et de bénéficier de retours d’expérience d’autres clients.  C’était aussi pour nous, comme en 2019, l’occasion de partager les nôtres !

## Sommaire

* [Introduction](#Intro)
* [Rendez vos équipes de Data Science 10x plus productives avec SageMaker](#SageMaker)
* [Comment le cloud permet à France Télévisions d’innover dans la diffusion de contenu live](#FranceTV)
* [Découvrez comment Treezor utilise AWS comme moteur de sa plateforme de Banking-as-a-service](#Treezor)
* [Tracer votre chemin vers le Modern DevOps en utilisant les services AWS d’apprentissage machine](#ModernDevops)
* [Innover plus rapidement en choisissant le bon service de stockage dans le cloud](#ChoixStockageCloud)
* [Sécuriser vos données et optimiser leurs coûts de stockage avec Amazon S3](#OptimiserS3)
* [Minimiser vos efforts pour déployer et administrer vos cluster Kubernetes](#MinimiserEffortsKubernetes)

## Introduction <a name="Intro"></a>

Depuis notre migration vers le Cloud, AWS et Kubernetes entre 2018 et 2021 (plus d’informations dans [Le Plan Copenhague](https://leanpub.com/6cloud/){:target="_blank"}), nous sommes plusieurs centaines à travailler au quotidien avec AWS.  
Cette année, cinq de nos DevOps, Ops et Développeurs ont eu la chance de se rendre à l’AWS Summit.  
Nous partageons quelques notes que nous avons prises lors de cette journée, sur des sujets qui nous ont marqués et qui vont sans doute nous occuper une partie de l’année à venir.

### Rendez vos équipes de Data Science 10x plus productives avec SageMaker <a name="SageMaker"></a>

Conférence présentée par :

* Olivier Sutter - AWS Solution Architect
* Yoann Grondin - IA Team Leader Canal+

Cette session présentait le produit [Amazon SageMaker](https://aws.amazon.com/sagemaker/){:target="_blank"}, d’abord dans sa globalité, puis appliqué au cas des équipes de Data Scientist chez Canal+.

SageMaker a été lancé fin 2017 pour créer, entraîner et déployer des modèles de machine learning. C’est une solution tout-en-un, avec une interface graphique intuitive et un accent porté sur l’automatisation. Amazon promet également de gagner en performance sur SageMaker via l’implémentation de nombreux algorithmes d’apprentissage supervisés ou non-supervisés (XGBoost, kNN, PCA…).

De manière générale, les équipes de Canal+ utilisent des solutions d’apprentissage pour différents cas d’usages :

* Personnaliser l'expérience utilisateur et proposer du contenu ciblé
* Mieux connaître, labelliser, classifier leurs contenus vidéo
* Anticiper les besoins des abonnés ou des prospects

Ils se sont tournés vers SageMaker pour diminuer le temps passé dans les étapes de preprocessing, data cleaning et déploiement en production.

Chez Bedrock, nous avons aussi rencontré ces problématiques, nous avons réalisé des PoC de différentes solutions (dont SageMaker) et nous avons retenu la plateforme [Databricks](https://databricks.com){:target="_blank"}.

En effet, Databricks répond à nos besoins de fine-tuning des paramètres des clusters Spark et d’intégration avec Terraform (ce qui est important pour nous car nous utilisons exclusivement de l’Infra-as-Code). Nous avons également automatisé le déploiement en production de nos modèles d’apprentissage, de la même manière que SageMaker.

Cette session nous a conforté dans l’approche et l’utilisation que nous avons de nos outils actuels, tout en nous confrontant à d’autres solutions techniques et d’autres cas d’usages au sein de notre industrie.

Résumé par Gabriel FORIEN - Devops

### Comment le cloud permet à France Télévisions d’innover dans la diffusion de contenu live <a name="FranceTV"></a>

Conférence présentée par :

* Raphaël Goldwaser - AWS Solution Architect
* Guillaume Postaire - Directeur de la Media Factory, France Télévisions
* Matthieu Parmentier - Responsable de l'Al factory, France Télévisions
* Nicolas Pierre - Al factory Lead Tech, France Télévisions

!["Live subtitling diagram"](/images/posts/2022-04-20-aws-summit-2022-notre-retour-dexperience/live-subtitling.png)

Nous avons assisté à une conférence présentée par les responsables Média et AI de France Télévisions et Raphaël Goldwaser Solutions Architect chez AWS. Ils nous ont parlé de l’évolution de leur usage du cloud dans la diffusion de vidéo en direct et des différentes étapes de la construction d’un système de sous-titrage automatique en direct.

Pour ce système de sous-titrage, ils utilisent les services [Media & Entertainment](https://aws.amazon.com/media-services){:target="_blank"} fournis par AWS.  

Les flux de vidéo sont envoyés directement dans le cloud via Elemental MediaConnect pour générer des sous-titres automatiquement en utilisant Media-Cloud AI et [Speechmatics](https://www.speechmatics.com/){:target="_blank"}. Une fois les fichiers de sous-titres générés, ils sont insérés et synchronisés sur le flux en direct.

Ces outils peuvent également être utilisés pour analyser des vidéos afin de contextualiser les publicités affichées et/ou choisir le meilleur moment pour les afficher.

Chez Bedrock comme chez France Télévisions, nous challengeons régulièrement les solutions Médias proposées par AWS pour améliorer nos infrastructures et apporter de nouvelles fonctionnalités à nos produits.

Résumé par [Christian VAN DER ZWAARD](https://twitter.com/christianvdz){:target="_blank"} - Sysadmin

### Découvrez comment Treezor utilise AWS comme moteur de sa plateforme de Banking-as-a-service <a name="Treezor"></a>

Conférence présentée par :

* Armel Negret - AWS Central Sales Representative
* Nicolas Bordes - Technical Lead and AWS Sponsor, Société Générale

Treezor, une filiale du groupe Société Générale, fournit une plateforme complètement APIsée qui permet aux fintechs et plus généralement aux acteurs de la finance d’accéder à leurs services bancaires. Cette plateforme est hébergée sur AWS et utilise une stack de services entièrement serverless : API Gateway, CloudWatch, Lambda, SNS et SQS entre autres. Les Lambdas sont développées en PHP grâce au framework [Bref](https://bref.sh/){:target="_blank"}.

A l’instar de Treezor, Bedrock possède également de nombreuses Lambda développées en PHP avec Bref. Ces Lambdas sont majoritairement déployées via le [framework serverless](https://www.serverless.com/){:target="_blank"}. PHP n’étant pas nativement supporté par Lambda et Bref étant principalement maintenu par un seul développeur, nous essayons, autant que possible, d’utiliser d’autres langages comme Python ou Go, notamment dans le pôle infrastructure.

L’approche “full serverless” est intéressante car elle permet de s’abstraire de la gestion de l’infrastructure sous-jacente et donc de se concentrer sur des problématiques intrinsèques au métier.  
En sus, les services AWS serverless apportent souvent nativement de la haute disponibilité ainsi que de l’auto-scaling, deux problématiques très importantes pour garantir un service de qualité à nos utilisateurs finaux. C’est pour ces raisons que Bedrock utilise de nombreux services AWS serverless : Athena, CloudWatch, DynamoDB, Lambda, S3, SNS, SQS, Kinesis, …  
Le pôle infrastructure de Bedrock étant relativement “petit” par rapport au nombre total de développeurs (environ 30 devops/sysops pour 250 fullstack en date du 15 avril 2022), l’utilisation du serverless est un réel enjeu business.

Résumé par Timothée AUFORT - Devops

### Tracer votre chemin vers le Modern DevOps en utilisant les services AWS d’apprentissage machine <a name="ModernDevops"></a>

Conférence présentée par :

* Patrick Lamplé - AWS Principal Specialist SA

La conférence nous proposait d’en apprendre un peu plus sur les nouveaux produits AWS Code Guru et DevOps Guru. 

[Code Guru](https://docs.aws.amazon.com/codeguru/latest/reviewer-ug/welcome.html){:target="_blank"}
se découpe en deux parties :

* *Reviewer*, qui a pour ambition d’accélérer la revue de code ;
* *Profiler*, qui peut aider à optimiser les performances d’une application.
A ce jour, ces services ne supportent que les langages Python et Java.

[DevOps Guru](https://docs.aws.amazon.com/devops-guru/latest/userguide/welcome.html){:target="_blank"}
permet d’identifier les comportements anormaux des applications au runtime.  
Par exemple, si une application utilise une table DynamoDB qui n’est pas suffisamment provisionnée, une alerte va être déclenchée. Cette dernière pourrait permettre d’identifier un souci de configuration avant même que l’application ne soit déployée en production.

Chez Bedrock, les langages utilisés étant principalement Javascript, PHP et Python, Code Guru ne sera pas une solution adéquate dans toutes les situations. Nous avons donc mis en place la solution [KICS](https://kics.io/){:target="_blank"} qui nous permet, à l’aide de règles [Open Policy Agent](https://www.openpolicyagent.org/){:target="_blank"}, d’effectuer automatiquement de nombreuses validations sur le code infrastructure (Terraform, Docker, YAML, …). KICS est utilisé au travers de [GitHub Actions](https://github.com/features/actions){:target="_blank"} pour ajouter des commentaires sur les pull requests comme Code Guru est capable de le faire.

Une analyse au runtime effectuée par DevOps Guru pourrait permettre de venir compléter la liste de services AWS que nous utilisons déjà et qui vérifient la configuration de notre infrastructure comme : Config, Trusted Advisor, CloudWatch,  …

Les outils du Modern Devops d’AWS pourraient venir en complément d’outils de qualité actuellement utilisés chez nous. À tester en complément de KICS pendant une de nos journées R&D (journées organisées le dernier vendredi du mois, un mois sur deux).

Résumé par Valentin CHABRIER & Mickaël VILLERS - Devops

### Innover plus rapidement en choisissant le bon service de stockage dans le cloud <a name="ChoixStockageCloud"></a>

Conférence présentée par :

* Thomas Barandon - AWS Enterprise Support Manager
* Laurent Dirson - Directeur des Solutions Business et des Technologies, Nexity

Thomas Barandon a rappelé les solutions de stockage d’AWS : S3 pour du stockage objet, EBS pour le stockage bloc et EFS/FSx pour le stockage fichier.
Il a par la suite présenté Storage Gateway, qui permet d’utiliser les services de stockage AWS dans une infrastructure on-prem via un montage NFS/Samba ou iSCSI.

Laurent Dirson de chez Nexity a ensuite partagé la stratégie adoptée pour concevoir leur SI comme un service. Tous leurs documents sont désormais stockés dans un bucket S3 mis à disposition des agences via un montage NFS opéré par l’outil Storage Gateway. Une politique d’Object Lock permet d’utiliser le modèle WORM (write-once-read-many).

Chez Bedrock, nous stockons déjà la grande majorité de nos données dans des buckets S3. Nous aimerions aussi bénéficier des avantages de ce service pour le stockage de nos métriques. Mais, comme nous utilisons [VictoriaMetrics](https://docs.victoriametrics.com/Cluster-VictoriaMetrics.html){:target="_blank"}, ce mode de stockage n’est pas disponible et ces données sont stockées dans EBS. Peut-être que Storage Gateway nous permettrait d’écrire nos métriques directement sur un bucket S3 ?

Résumé par [Coraline PETIT](https://twitter.com/_CoralinePetit){:target="_blank"} - Sysadmin

### Sécuriser vos données et optimiser leurs coûts de stockage avec Amazon S3 <a name="OptimiserS3"></a>

Conférence présentée par :

* Meriem Belhadj - AWS Storage Specialist Solutions Architect

Pendant cette présentation, Meriem Belhadj est revenue sur les classes de stockage disponibles sur S3, en mettant une attention particulière à Glacier Instant Retrieval et à Intelligent-Tiering. Le second permet d’appliquer une politique de stockage basée sur la fréquence d’accès aux données au cours des 30 derniers jours.  
En effet, pour déterminer la “bonne” classe à utiliser, il faut notamment connaître la disponibilité des données. Les autres points à prendre en compte sont la fréquence d’accès, les performances recherchées, la taille des objets à stocker et enfin la durée de rétention.

Nous appliquons, chez Bedrock, ces pratiques, depuis plusieurs années. Toutefois, il serait judicieux de mettre en place des règles, type AWS Config, pour s’assurer que ces recommandations soient bien appliquées sur tous nos buckets S3.

Résumé par [Coraline PETIT](https://twitter.com/_CoralinePetit){:target="_blank"} - Sysadmin

### Minimiser vos efforts pour déployer et administrer vos cluster Kubernetes <a name="MinimiserEffortsKubernetes"></a>

Conférence présentée par :

* Abass Safouatou - AWS Lead Solution Architect
* Sébastien Allamand - AWS Solution Architect Specialist Container
* Patrick Chatain - CTO Contentsquare

Contentsquare, analyste de l'expérience numérique, est venu nous parler de son utilisation d’[EKS](https://aws.amazon.com/eks/){:target="_blank"} Blueprint avec [AWS CDK](https://aws.amazon.com/cdk/){:target="_blank"} (Cloud Development Kit) pour la configuration et le déploiement de leurs infrastructures Kubernetes. Cet outil leur a permis de rapidement migrer leur infrastructures dans le Cloud.

À l’occasion de cette conférence, un début de comparatif a été amorcé entre les solutions de passage à l’échelle automatique : [Cluster Auto Scaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler){:target="_blank"} et [Karpenter](https://karpenter.sh/){:target="_blank"}.

Cette analyse a particulièrement attiré notre attention : nous souhaitons migrer nos clusters Kubernetes, actuellement déployé par [Kops](https://kops.sigs.k8s.io/){:target="_blank"} vers des clusters EKS, pour gagner en maintenabilité et en rapidité de scaling. Karpenter est l'une des solutions que nous étudions dans le cadre de ce projet, afin de tirer partie de cet outil auquel AWS contribue activement et qui semble mieux tirer profit des fonctionnalités spécifiques d’AWS que cluster-autoscaler.

Contentsquare a mentionné son besoin de développer un outil de passage à l'échelle basé non pas sur la consommation CPU et mémoire mais sur des métriques métier spécifiques. C’est un besoin que nous avons également chez Bedrock, nous avons donc développé un outil pour y répondre. Cette remarque nous a conforté dans notre volonté de continuer à open-sourcer les outils que nous développons, pour qu’ils bénéficient à la communauté.

Résumé par [Coraline PETIT](https://twitter.com/_CoralinePetit){:target="_blank"} & [Christian VAN DER ZWAARD](https://twitter.com/christianvdz){:target="_blank"} - Sysadmin
