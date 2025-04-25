---
layout: post
title: Bedrock au Devoxx 2025
description: 
author: [paulinermbd]
tags: [devoxx, conference, event, backend, go, kubernetes, github]
color: rgb(251,87,66)
language: fr
---
# Devoxx 2025 

Le Devoxx est un événement incontournable pour les développeurs et les professionnels de la technologie. Cette année, nous avons eu la chance d'y assister et de découvrir de nombreuses conférences passionnantes. Dans cet article, nous partagerons avec vous les points clés des conférences auxquelles nous avons assisté. Cet évènement a eu lieu du 16 avril 2025 au 18 avril 2025 au Palais des Congrés de Paris.

## Gitflow et Gitbutler

Yann-Thomas Le Moigne et Lilian Forget nous présentent un outil permettant de faire des stratégies de gestion de branche. Cette conférence était basée sur une comparaison entre Gitflow et [Gitbutler](https://gitbutler.com/). De plus nous avons pu assister à la démonstration de l’outil en live.

### Gitflow

**Forces**

-   **Processus normalisés :** Instaure une structure et une cohérence dans le flux de travail, réduisant les ambiguïtés et les malentendus potentiels.
-   **Structure claire :** Offre une visibilité et une prévisibilité accrues, facilitant la navigation et la compréhension du projet, en particulier pour les nouveaux membres de l'équipe.
-   **Historique des modifications organisé :** Permet un suivi méticuleux des changements, simplifiant le débogage, la résolution des conflits et l'identification des contributions individuelles.

**Faiblesses**

-   **Adaptation à la stratégie d'entreprise :** Peut nécessiter des ajustements et des personnalisations pour s'aligner sur les objectifs et les processus spécifiques de l'entreprise.
-   **Connaissances en Git requises :** Présuppose une familiarité avec le système de contrôle de version Git, ce qui peut constituer un obstacle pour les membres de l'équipe moins expérimentés.
-   **Manque de souplesse :** Peut montrer des limites dans sa capacité à s'adapter rapidement et efficacement à des changements de contexte ou de priorités imprévus.

**Difficultés quotidiennes**

-   **Lacunes en Git :** L'utilisation quotidienne peut être entravée par des difficultés à exécuter des commandes Git, à comprendre les concepts clés ou à résoudre les conflits de fusion.
-   **Workflows rigides :** Les workflows imposés peuvent parfois être perçus comme contraignants ou restrictifs, limitant la liberté d'action et l'autonomie des développeurs.
-   **Changements de contexte :** La nécessité de basculer fréquemment entre différentes tâches, branches ou projets peut perturber la concentration, réduire la productivité et augmenter le risque d'erreurs.

### GitButler

-   **Créé par le fondateur de GitHub** : bénéficie de l'expertise de la plateforme de développement collaborative la plus populaire
-   **Visualisation claire des commits et branches** : interface conviviale facilitant l'organisation et la gestion du travail
-   **Configuration IA personnalisable** : adapte les suggestions et l'assistance de l'IA selon vos préférences pour les messages de commit
-   **GUI avec branches virtuelles, indépendante du fonctionnement strict de Git** : approche plus flexible et intuitive de la gestion des branches
-   **Réorganisation et application personnalisée des branches** : contrôle accru sur l'ordre des modifications et l'intégration des branches
-   **Notifications de mises à jour du dépôt distant** : restez informé des changements externes et synchronisez votre travail
-   **Mise à jour en un clic avec gestion des conflits** : simplifie le processus de mise à jour et offre des options de résolution de conflits (merge ou rebase)
-   **Blocage des pushs en cas de conflit** : évite les erreurs et les incohérences en empêchant les pushs non résolus
-   **Historique complet des commandes et actions avec annulation facile** : permet de revenir en arrière et de corriger les erreurs rapidement
-   **Réinitialisation automatique pour un dépôt propre** : maintient l'environnement de travail organisé

**Avantages**

-   **Branches légères et flexibles** : simplifie la création, la gestion et la manipulation des branches
-   **Changement de contexte aisé** : facilite le passage d'une tâche à l'autre et la gestion de différents aspects du projet
-   **Intégration simplifiée du contenu** : facilite la fusion des modifications et la collaboration entre les développeurs
-   **Réduction des conflits de merge** : minimise les risques d'erreurs et facilite la résolution des conflits
-   **Connaissances limitées de Git nécessaires** : interface intuitive et assistance intégrée réduisant la courbe d'apprentissage

**Inconvénients**

-   **Origine obligatoire** : peut nécessiter une adaptation des workflows pour les projets existants
-   **Gitflow non adapté** : peut ne pas être compatible avec certains modèles de branches spécifiques
-   **Intégration des hooks** : pourrait nécessiter des ajustements pour certains flux de travail automatisés

**Notes**

-   **Hybridation possible** : peut être combiné avec des outils et des workflows Git existants
-   **Équipe dynamique** : bénéficie d'un développement actif et d'une communauté grandissante
-   **Opensource** : accessible à tous et encourageant les contributions et l'amélioration continue

**Points Supplémentaires à Considérer**

-   **Potentiel d'intégration avec d'autres outils** : explore les possibilités de connexion avec des IDE, des plateformes de gestion de projets, etc.
-   **Évolutivité pour les grands projets** : évalue les performances et la capacité à gérer des dépôts complexes et volumineux
-   **Support et documentation** : vérifie la disponibilité de ressources d'aide et de guides d'utilisation
-   **Comparaison avec d'autres interfaces Git** : évalue les différences et les avantages par rapport à des outils similaires
-   **Impact sur les pratiques de développement** : analyse comment GitButler peut influencer les workflows et la collaboration au sein des équipes

En résumé, GitButler se présente comme une interface prometteuse pour Git, offrant une expérience utilisateur simplifiée et des fonctionnalités innovantes. En se concentrant sur la visualisation, la flexibilité et la facilité d'utilisation, il vise à améliorer la productivité et à faciliter la gestion du code source, en particulier pour ceux qui sont moins familiers avec Git. C'est un outil que je vais tester pour en savoir plus et savoir si cela pourrait être utile dans l’entreprise.

## Copilot aller plus loin que l’auto-complétion

Les deux conférencières, Kim-Adeline Miguel et Sandra Parlant, travaillent chez GitHub et sont venues nous parler plus en détails de Copilot. Chez Bedrock nous avons accès à cet outil et cette conférence m’a permis de découvrir des fonctionnalités que je ne connaissais pas du tout et que je vais tester à l’avenir.

### Chat Copilot

-   **Instructions personnalisées dans le projet** : Adaptation du comportement de Copilot en fonction du contexte spécifique du projet (fonctionnalité à venir sur JetBrains).
-   **Instructions personnalisées** : Capacité à donner des directives spécifiques à Copilot, comme répondre dans une langue donnée (par exemple, le français).
-   **Mode immersif** : Expérience utilisateur optimisée pour minimiser les distractions et maximiser la productivité.
-   **Présentation des fonctionnalités du chat** : Guide intégré pour découvrir et maîtriser les différentes fonctionnalités offertes par l'outil.
-   **@workspace et contexte étendu** : Prise en compte de l'ensemble du contenu du projet pour des réponses et suggestions plus pertinentes et précises.
-   **Modes ask, edit, agent** : Adaptation du comportement de Copilot selon le besoin : poser des questions, éditer du contenu ou agir en tant qu'assistant intelligent.
-   **Choix de fichiers précis pour le contexte** : Possibilité de spécifier les fichiers à considérer pour le contexte, améliorant la pertinence des réponses.
-   **Mode agent et serveur MCP** : Interaction avec le serveur MCP pour effectuer des actions directement depuis le chat, comme ouvrir des Pull Requests ou des issues (avec possibilité d'accepter ou de refuser les suggestions).
-   **Mode multi-edit et mode agent** : Gestion des modifications soit en une seule étape (multi-edit), soit étape par étape (mode agent).

### Copilot Code Review

-   **Génération de la description de la PR** : Automatisation de la création de descriptions claires et concises pour les Pull Requests.
-   **Commentaires sur les diffs de la PR** : Ajout automatique de commentaires pertinents sur les modifications apportées dans la Pull Request.
-   **Suggestions d'améliorations** : Propositions de modifications pour optimiser le code.
-   **Encourage à 👍 ou 👎** : Incitation à donner son avis sur les modifications proposées (approbation ou refus).

### GitHub Advanced Security

-   **Propositions de fixs de sécurité** : Identification des vulnérabilités et suggestions de corrections pour renforcer la sécurité du code.
-   **Activable** : Fonctionnalité optionnelle pouvant être activée ou désactivée selon les besoins.


## Mixité femme/homme : diagnostiquer, agir et révolutionner la tech

Dans cette conférence, les 3 collaboratrices (Claire Gourcy, Aude Malabat et Barbara Martin) de chez Michelin veulent nous présenter le constat fait chez Michelin IT en France mais aussi quels moyens ont été mis en place. Le départ a été le diagnostic de mixité qui nous apprend que seulement 28% de femmes dans l'entreprise et dans les métiers techniques, ce chiffre tombe à 10%.

Il existe au sein de l’entreprise le réseau Better Together qui a été créé pour promouvoir la diversité au sein de l'entreprise : mixité homme-femmes mais aussi l'inclusion des minorités.

Pour que leur travail ait du sens, elles ont définis des axes de travail pour plus de diversité, d'équité et d'inclusion :

*   Objectivité : avoir des chiffres pour étayer les actions à mener
*   Témoignages : recueillir des témoignages pour sensibiliser et montrer l'importance du sujet
*   Sponsoring : impliquer la direction pour expliquer les enjeux et les objectifs de la démarche

Un des points les plus abordé à la fois par les hommes et les femmes est la notion de discrimination positive. En effet, les hommes ont “peur” d’être défavorisé si en concurrence avec une collègue féminine et les femmes elles ne sentent pas légitime dans leur poste.

Ce projet a été lancé en 2022, en 2025 elles sont en phase d’action. Il est important de souligner que ce projet a été mené en parallèle de leur travail respectif. Le périmètre est celui de Michelin IT en France.

Pour commencer ce projet, voici le kit de démarrage

*   Équipe motivée
*   Données qualitatives et quantitatives
*   Cadre clair avec score et objectifs
*   Sponsor influent
*   Patience et persévérance

### Avant de démarrer

1.  Équipe cœur : Rassembler 4 personnes engagées et complémentaires.
2.  Définir le score : Définir le périmètre (France ou monde), les éléments à mesurer (catégorie de métier, répartition homme-femme, reconnaissance au poste, ressentis sur le terrain) et fixer des objectifs réalistes et mesurables.
3.  Collecter les données : Identifier les tendances, étudier les pratiques internes et externes, et analyser la situation actuelle.
4.  Obtenir un sponsor : Convaincre la direction et obtenir le soutien de personnes influentes en mettant en avant les bénéfices concrets.
5.  Vérifications : être sûres que tout est prêt pour passer à l’étape suivante

### Diagnostiquer

L’objectif est de trouver une clé de mesure précise, avec de bons capteurs humains et pour cela, vous aurez besoin d’un bon carnet de notes !

Ensuite, la démarche est la suivante :

1.  Analyse qualitative : Repérer les écarts invisibles, les ressentis et les témoignages. Analyser les freins et les opportunités à travers des interviews et des questionnaires.
2.  Préparation des interviews : Identifier des collaborateurs de différents niveaux, former des intervieweurs motivés, élaborer une trame d'interview et planifier les entretiens avec des collaborateurs de tous niveaux hiérarchiques et de tous les services.
    Note : L'objectivité des réponses peut être remise en question, car des employés Michelin interrogent d'autres employés Michelin.
3.  Conduite et collecte : Réaliser des interviews de manière structurée, analyser les propos et extraire des verbatims marquants. Note : Penser à l'analyse des verbatims lors de l'élaboration de la trame d'interview.
4.  Enquête complémentaire : Mener une enquête à grande échelle avec des questions fermées, organiser l'envoi et les relances (avec l'appui du sponsor) et réaliser une analyse statistique.

### Agir et révolutionner

1.  Présenter les résultats : Partager les résultats de façon claire et engageante avec les sponsors et la direction avant une restitution globale.
2.  Restitution globale : Utiliser une forme originale comme une pièce de théâtre mettant en scène des situations vécues pour présenter les résultats globaux.

Plan d'action : Construire un plan d'action en mettant en valeur les points forts et en s'attaquant aux axes d'amélioration. Il est important de souligner que ce plan d’action a été validé par la direction et est maintenant mis en place progressivement pour augmenter la mixité et réduire les inégalités. Il a été souligné que sans appui et volonté de la direction rien n’aurait été possible.

## Kubernetes: 5 façons créatives de flinguer sa prod 🔫

Dans un incident basé sur des faits réels, les équipes de Denis Germain ont rencontré des problèmes avec les sondes Kube (Readiness, Liveness et Healthchecks) lorsqu'elles ont introduit des dépendances externes et cycliques dans leurs vérifications de vivacité. Cette mauvaise pratique a entraîné un effet domino catastrophique : lorsqu'un pod tombait en panne, il entraînait la défaillance d'autres pods dépendants, provoquant une cascade d'arrêts qui a finalement mis hors service tous les pods du système. La résolution de cet incident a nécessité une intervention manuelle fastidieuse et chronophage pour rétablir le fonctionnement du système, soulignant les risques liés à la mauvaise gestion des dépendances dans les sondes Kube. Difficultés lors de la migration Helm et l'importance du GitOps.

Une autre erreur coûteuse s'est produite lors d'une migration de Helm V2 vers V3. Une mauvaise interprétation de la chaîne "v1" dans les noms des manifests a conduit à leur suppression accidentelle. Cette chaîne faisait en fait référence à la version de l'API, et sa suppression a effacé l'historique de déploiement de Helm, empêchant les mises à jour. Cette situation a entraîné une interruption de service critique, nécessitant la restauration manuelle des manifests supprimés dans la base de données de production à partir de sauvegardes. Cette expérience souligne l'importance cruciale de bien comprendre les outils utilisés et de disposer de sauvegardes fiables. Elle met également en évidence les avantages du GitOps (avec des outils comme ArgoCD ou FluxCD) pour la gestion des déploiements. Le GitOps réduit les erreurs humaines en fournissant une source unique de vérité et un processus de déploiement automatisé et reproductible. Bonnes pratiques pour la résilience des applications Kubernetes.

En résumé, ces incidents soulignent l'importance d'une conception et d'une gestion minutieuses des applications Kubernetes. Voici quelques points clés à retenir :

*   Sondes Kube : Évitez d'introduire des dépendances externes ou cycliques dans les sondes de vivacité pour prévenir les pannes en cascade.
*   Migrations : Effectuez des tests approfondis et comprenez parfaitement les implications de toute modification lors des migrations d'outils comme Helm.
*   Sauvegardes : Maintenez des sauvegardes régulières et fiables de vos environnements, y compris les bases de données Helm et les manifests Kubernetes.
*   GitOps : Envisagez l'adoption de pratiques GitOps pour améliorer la fiabilité, la reproductibilité et la traçabilité de vos déploiements.
*   Outils de restauration : Familiarisez-vous avec des outils comme Velero pour faciliter la restauration de vos environnements Kubernetes en cas de sinistre.

En suivant ces recommandations, vous pouvez renforcer la résilience de vos applications Kubernetes et minimiser les risques d'interruption de service.

## 45min pour mettre son application à genoux : le guide complet du test de charge

**Résumé du format de crash-course sur les tests de charge**

D'un point de vue technique, il est essentiel de déterminer les éléments critiques dont la défaillance impacterait la production, et donc de définir les composants à tester. D'un point de vue fonctionnel, il faut identifier le parcours et le scénario utilisateur. Le scénario de test doit cibler les briques à tester (authentification, application, API, etc.).

**Exemple de scénario**

Une fausse application web a été créée pour la conférence. Le scénario simule la navigation d'un utilisateur via une gateway et une API. Il s'agit d'un test de capacité visant à déterminer le nombre d'utilisateurs que l'application peut supporter avant de crasher de manière critique.

**Outil de test**

L'outil utilisé est Gatling, un outil open source permettant de créer des tests de charge "as code", c'est-à-dire que les scénarios de test sont intégrés dans le code comme le sont les tests unitaires.

**Points clés de la conférence et bonnes pratiques**

L'objectif principal de la conférence était de présenter les bases de Gatling et des tests de charge. Un point important soulevé est que le système s'optimise lorsqu'on teste toujours la même chose, il est donc crucial de varier les scénarios pour couvrir un maximum de cas d'erreur. C'est pourquoi un système permettant de tester des utilisateurs personnalisés et différents de manière aléatoire a été présenté.

**Quelques bonnes pratiques à retenir :**

*   Pour les contextes authentifiés, privilégier la désactivation du WAF plutôt que des développements complexes.
*   Pour exposer des éléments spécifiques au SI, utiliser une gateway de test.
*   Les données de test doivent être reproductibles et il faut prévoir comment les réinitialiser.
*   Pour maintenir le test de charge, inclure un smoke test dans la CI.

