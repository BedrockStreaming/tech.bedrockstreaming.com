---
layout: post
title: Bedrock au Devoxx 2025
description: 
author: [paulinermbd, fferriere]
tags: [devoxx, conference, event, backend, go, kubernetes, github]
color: rgb(251,87,66)
language: fr
thumbnail: "/images/posts/2025-04-16_devoxx_2025/thumbnail.jpg"
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


## Anatomie d'une faille

Olivier PONCET nous raconte l'histoire de la mise en place d'une faille de sécurité dans `XZ utils`, un ensemble de bibliothèques et d'outils pour la compression et décompression LZMA, très utilisé en partie dans les distributions Linux ainsi que dans le noyau.

Cette faille, CVE-2024-3094, du 29 mars 2024, a le score de 10, le plus élevé et exploitable tout de suite (0-day). Heureusement, elle est découverte, par hasard, avant la sortie des releases des distributions les plus connues comme Ubuntu et Fedora.

Olivier nous explique les différentes étapes de l'attaque et sa chronologie.
L'attaque, organisée et planifiée, commence en 2022. La cible est d'affaiblir le démon SSH des machines.
Tout commence par de l'ingénierie sociale, c'est pourquoi, l'attaquant `Jia Tan` (ou peut-être les attaquants) cible `XZ utils`. Le projet est maintenu par une seule personne `Lasse Collin`, donc une seule personne à convaincre pour devenir co-mainteneur. Cette étape est réussie à cause de pressions faites pour merger une PR, pour un patch légitime, sur GitHub. Ces pressions sont faites par d'autres comptes, mais des suspicions pensent à croire que tous ces comptes appartenaient à la même personne (ou le même groupe).
En 2023, `Jia Tan` devient co-mainteneur, ce qui lui permet d'appliquer dans un premier temps des corrections, mais prend le contrôle de l'adresse email de contact pour que `Lasse Collin` ne soit pas mis au courant de possibles problèmes.

Début 2024, `Jia Tan` gagne le contrôle du projet sous GitHub et change l'hébergement des pages GitHub. En février, la charge utile est ajouté et la version 5.6.0 sort au moment des releases des grandes distributions Linux. Un dysfonctionnement est détecté, ce qui entraine la création d'un patch rapide : 5.6.1.
La charge utile n'existe pas dans les sources sur GitHub, uniquement dans le fichier `.tar.gz`.

Un forte ingénierie technique est mise en place pour réussir à modifier des fichiers Makefile lors du build des distributions Linux.
`Jia Tan` a principalement consolidé les tests dans `XZ utils`, et dans un nouveau test, un fichier compressé, qui semble inoffensif est ajouté, mais le script va prendre des bouts de codes par-ci par-là pour injecter la vraie faille de sécurité.

La découverte de la faille est faite par un ingénieur, `Andres Freund`, qui travaille principalement sur PostgreSQL, chez Microsoft, mais pas du tout dans le domaine de la sécurité. Alors qu'il débogue son travail sur PostgreSQL, il se rend compte de ralentissement et investigue un peu, il publie alors un board de sécurité.

Il a fallu un alignement des planètes exceptionnel pour permettre de créer la faille, mais encore plus pour la détecter.
Mais la conclusion de tout ça, c'est que la sécurisation de la supply-chain est souvent oubliée. C'est pourtant un grand vecteur d'attaque, car il est possible d'infecter l'OS, les logiciels ou les paquets, les gestionnaires de paquets (composer, npm, pip, go, cargo, maven, ...) et sans oublier les images docker.
Ce n'est pas parce que c'est sur GitHub que c'est au-dessus de tous soupçons.
Pour éviter tout ça, il est préférable d'utiliser des gestionnaires d'artefacts qui vont valider et approuver les différents éléments.

En plus de la conclusion, ce qui reste le plus marquant, c'est le temps utilisé pour planifier et réaliser l'attaque, et la chance d'une détection, opportuniste, avant un déploiement massif.
Mais après avoir réalisé tout ça, on peut se demander combien d'attaques existe-t-il encore et sont toujours invisibles ?

## Go sans fioriture

Nathan CASTELEIN nous présente comment faire une API Web sans utiliser de composants externes à Golang. En effet, plusieurs fonctionnalités disponibles dans des librairies externes ont été intégrées petit à petit dans le cœur du langage.
Dans cette conférence, on nous présente trois grosses fonctionnalités : l'écriture d'API Web, la gestion des logs et l'écriture de tests unitaires sans librairie.

Avant la version 1.22, parser une URL pour récupérer des paramètres de route, n'était pas aisé sans librairie, mais depuis le pattern du routing est amélioré et natif, nous pouvons donc récupérer nous paramètre avec `r.PathValue("name")`.
L'utilisation de middleware existe dans les librairies de router HTTP, mais Nathan nous montre comment faire de manière native.

Depuis la version 1.21, nous pouvons profiter de `log/slog` qui permet de logger des messages comme `logrus` ou `zerolog` de manière structurée.
Nativement, il est possible d'utiliser 2 types de handler, un pour envoyer des logs au format texte et un autre au format JSON.
Des helpers pour structurer les logs sont également disponibles.
L'interface `LogValuer` permet d'adapter une structure dans le log, pour, par exemple, ne pas afficher un mot de passe, etc.

Enfin, Nathan nous présente comment faire les tests parallélisés, initialisé et nettoyé (équivalent de setUp() et tearDown()) sans testify.

On peut voir que certaines des fonctionnalités qu'on utilise au travers de librairies externes peuvent être évité, mais ce n'est pas pour autant que nous devons arrêter d'en utiliser, car souvent ça peut simplifier des choses. L'idée est surtout de bien réfléchir à l'utilisation que l'on a besoin de ces librairies. Il faut se poser la question bénéfice/risque pour les utiliser, par exemple testing a intégré des fonctionnalités de testify mais la gestion des assertions est encore inexistante.

## La territorialisation des infrastructures comme levier de pouvoir

Ophélie COELHO, nous présente dans cette conférence, un sujet dont on parle peu a l'air du cloud : les infrastructures matérielles et toute la géopolitique qui tourne autour.
Nous pouvons voir qu'entre le réseau de télégraphe de 1903 et aujourd'hui, les routes sont presque les mêmes. Il y a une concentration autour de l'ancien empire britannique. Et déjà l'époque, cette infrastructure est industrialisée à but géopolitique.

En 1905, pendant la bataille navale de Tsushima, opposant le Japon et la Russie, le Japon reçoit un soutien de la part des britanniques en incluant le pays dans son réseau télégraphique et le coupant aux Russes.

Aujourd'hui, les réseaux sont encore considérés comme une force et un moyen de pression. Les câbles sont du dur, du matériel et font partie du territoire. Internet dans pas un village sans frontières.
Des négociations pour connecter les câbles et les infrastructures sont bien réelles.
Des routes peuvent apparaître pour des raisons de redondance, mais aussi géopolitique.

Certaines réalités ne sont pas très glorieuses comme des datacentres d'Afrique sont priorisés pour l'électricité et prive une part non négligeable de la population ou bien, les infrastructures globales du continent Africain où la majorité du trafic passe par l'Afrique du Sud.

On nous présente aussi que sur ce sujet, la puissance n'est pas qu'étatique à ce niveau, en effet, des entreprises privées sont souvent les plus grands propriétaires avec, par exemple, Google qui est copropriétaire d'une trentaine de câbles sous-marins dont 16 tout seul.

Pour conclusion, on nous explique qu'il est toujours temps d'agir si l'on veut plus de décentralisation. Qu'apprendre les réseaux en cours de Géographie dans toutes les filières serait un plus.

## PostgreSQL : Le couteau suisse dont vous avez besoin (sans le savoir)
[slides](https://l_avrot.gitlab.io/slides/justpg_20250418.html)

Dans cette conférence, Lætitia AVROT, nous parle de plusieurs fonctionnalités utiles de PostgreSQL, en partant d'exemple concret d'une entreprise fictive qui ferait de la location de vélo.

### Range

Pour gérer le non-chevauchement de location de vélo, on nous présente le type Range, qui peut aussi être indexé et surtout utilisé dans des contraintes d'unicité. Il existe plusieurs opérateurs pour manipuler les ranges, comme `@>` qui permet de savoir si un range est inclus dans un autre, etc.
Nous allons pouvoir écrire nos range de date de cette manière : `'[2025-04-01, 2025-04-05)'::daterange`. `[` inclut la valeur alors que `(` l'exclut.

PostgreSQL est aussi capable de gérer la valeur `inifiniy`, fini le champ `end` à `NULL` pour dire que c'est en cours.

### Identifiers

Lætitia, continue par nous présenter les différentes manières de gérer des identifiants de table :
- les séquences, où il est préférable de ne pas oublier l'instruction `DEFAULT nextval('my_seq')`
- les colonnes de type `SERIAL` qui crée automatiquement une séquence et renseigne l'instruction `DEFAULT`, mais là encore rien n'empêche de mettre une valeur qui ne provienne pas de la séquence
- et enfin les `Identity Columns` que l'on peut déclarer comme ceci : `id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY`, là aussi cela crée la séquence, mais le `ALWAYS` empêche de mettre une valeur qui ne viendrait pas de la séquence.

### Generated Columns

Pour continuer dans l'exemple de la location de vélo, nous aimerions avoir l'information de la durée de la location. On nous montre qu'il est relativement simple à calculer à partir de 2 dates, elles même extraites du range. Mais pour éviter de faire le calcul dans le `SELECT`, nous pouvons utiliser une colonne générée :
```
create table Rental (
    ...
    Rental_Range txtzrange,
    /* Generated column */
    Rental_Duration integer always generated as (
        ceil(extract(epoch from upper(Rental_Range) - lower(Rantal_Range))) / (12 * 3600)) * 0.5
    ) stored,
    ...
)
```
Dans PostgreSQL, seules les colonnes `stores` sont mises en œuvre, pour l'instant, la donnée est donc calculée et stockée à chaque insertion ou modification des données.

Et pour le calcul du prix ?
Il n'est pas possible d'utiliser une colonne générée à partir d'une autre colonne générée.
Pour ce cas, nous pouvons utiliser un trigger qui viendra enregistrer le prix si celui-ci n'est pas déjà présent (pour éviter de le recalculer).

### Listen/Notify

On nous présente les fonctionnalités de `LISTEN` et de `NOTIFY` qui permet de faire de la gestion d'événement. Par contre, cela nécessite que l'application qui écoute, boucle infiniment pour recevoir les notifications.

### Returning

L'instruction `RETURNING`, que l'on peut ajouter dans un insert ou un update, permet de retourner (une partie ou) les données modifiées.
Un use-case intéressant fut présenté avec des insertions en chaine dans une transaction avec des Common Table Expressions et `RETURNING`.

### Conclusion

Encore une fois, Lætitia, nous montre la force de PostgreSQL.

