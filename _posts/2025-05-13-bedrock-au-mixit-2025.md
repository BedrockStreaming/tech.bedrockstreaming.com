---
layout: post
title: Bedrock au MiXiT 2025
description: 
author: [y_ferlin, p_rambaud, a_moutounet, v_clavreul, h_detang]
tags: [conference, lyon, tech, agilité]
color: rgb(251,87,66)
language: fr
---

Bedrock était présent au [MiXiT 2025](https://mixitconf.org/fr/), les 29 et 30 avril à Lyon.
Voici un petit résumé des conférences qui nous ont le plus marqués.

## De la pseudoscience pour mon (pseudo) management — Anaïs Huet

_Revue écrite par Yorick_

Pourquoi les pseudo-sciences connaissent-elles un tel succès,
notamment dans le management, le recrutement ou encore l'accompagnement ?
Que ce soit en entreprise ou même en tant qu'étudiant ou étudiantes,
tout le monde a sans doute déjà entendu parler ou déjà eu affaire
à des tests ou des méthodes telles que MBTI (Myers Briggs Type Indicator), DISC
(Dominant, Influent, Stable, Consciencieux), ProcessCom etc...
Pourtant, alors que toutes ces méthodes s'appuient sur ce qu'il est convenu
d'appeler de la pseudo-science, à savoir ce qui à
l'apparence de la science mais ne reposant en aucun cas sur une
réelle démarche expérimentale sérieuse, et sont fichées à
la [MIVILUDES](https://www.miviludes.interieur.gouv.fr/) pour certaines d'entre elles,
leur succès est incontestable.

**Anaïs Huet** a tenté d'en comprendre les raisons, en l'expliquant
notamment par l'effet Barnum ou effet de validation suggestive, qui
consiste à se retrouver dans toute description un peu vague ou
positive de soi-même.

Si en plus on ajoute quelques références aux neurosciences ou une image
d'un cerveau, les études ont montré que cela en renforçait la crédibilité.
Si ces méthodes permettent cependant à certains managers de prendre
conscience de la diversité des méthodes de pensées qui peuvent
exister au sein de leurs équipes, Anaïs nous mettra toutefois en garde
contre les risques d'enfermement et d'intériorisation d'un mode de
pensée prédéfini par les personnes qui sont la cible de telles méthodes.
En conclusion, elle nous rappellera l'importance de garder un esprit
critique dans l'utilisation de telles méthodes, car nous ne sommes pas
des thérapeutes.

## Nos manières de compter, périls économiques, démocratiques et écologiques — Valérie Charolles

_Revue écrite par Yorick_

**Valérie Charolles** est philosophe et chercheure au Laboratoire d’Anthropologie
Critique Interdisciplinaire.

Lors de cette conférence, elle ouvre sur cette citation de Wittgenstein : "Les
limites de notre langage posent les limites de notre rapport au monde"
Elle entend par là montrer que nos sociétés ont évolué vers un rapport aux chiffres
en tant qu'élément unique de mesure des faits, et que ce rapport pose problème.
On peut déjà citer comme exemple la vision réductrice du monde imposée par les
chiffres (Aristote proposait dix manières différentes de le décrire), mais aussi
les biais que ces derniers peuvent induire.

**Valérie Charolles** cite en exemple les chiffres du chômage chez les jeunes, souvent
annoncée par l'INSEE autour de 15-20%. Pourtant, l'INSEE ne précise jamais que cela ne concerne
qu'un tiers de la population des 15-25 ans, les deux autres tiers faisant des études.
Le risque étant pour les décisionnaires d'engager des politiques basées sur une
vision du monde inadéquate, et bien entendu pour les populations d'évoluer dans
une vision d'un monde distordue.

## Le pattern Hive : une stratégie de modularisation pour votre monolithe modulaire ou vos microservice — Julien Topçu et Thomas Pierrain

_Revue écrite par Pauline_

**Julien Topçu** et **Thomas Pierrain** ont présenté "la ruche", une architecture alternative aux microservices et au DDD face au "big bowl of mud" monolithique. Constatant que les microservices manquaient de cadre et créaient de nouveaux problèmes malgré leur exhaustivité, ils ont souligné que le DDD dimensionne mieux les microservices (une responsabilité métier = un microservice) et aligne le SI sur le business. Ils proposent un découpage fonctionnel si le cadre est clair et insistent sur le fait que les microservices sont une stratégie de déploiement, complémentaire au DDD. "La ruche" vise une architecture agnostique du déploiement, flexible pour une évolution continue, faisant cohabiter des bounded contexts (= mono métier) dans une même application. Contrairement aux systèmes distribués coûteux et difficiles à refactoriser, le monolithe modulaire (1 module = 1 mini architecture hexagonale = 1 bounded context = 1 responsabilité métier) assemblé via le pattern port-adapter et avec des data stores isolés, permet une itération facile et un découpage/regroupement flexible. C’est un pattern très adapté à la reprise d’un code ancien et monolithique. Ils ont terminé en présentant les cas de scale-on et scale-off, ainsi que quelques bonnes pratiques pour l’implémentation de la ruche.

## Quand le terminal dévore la UI : TUI pour tout le monde — Thierry Chantier

_Revue écrite par Pauline_

Terminal User Interface : permet de pleinement utiliser son terminal et d’avoir quelque chose d’un peu sympa et connu.

**Thierry Chantier** nous présente Posting un outil comme Postman en TUI qui sert à interroger une API et stocker les requêtes. Puis il nous parle de l’histoire du terminal et des premiers outils qui ont servi à automatiser les process comme le métier Jacquard premier input automatisé en 1801. Ou encore la carte avec 80 colonnes, création IBM et des machines Remington et naissance d'ASCII en 1890. Nous avons rencontré une évolution de plein d’interfaces graphiques avec le téléscripteur et puis l’informatique moderne.

Enfin, nous assistons à un atelier en live de comment nous pouvons faire pour implémenter notre propre outil TUI. Pour cela, vous prenez le langage que vous préférez et avec l’aide de quelques librairies dédiées comme Typer (Python) ou celles de CharmSH (Go) vous obtenez un outil personnalisé qui répond à vos besoins.

## Onboarding 2.0 : Réinventer l’intégration des devs — Hafsa El maizi

_Revue écrite par Anouk_

Dans cette conférence, **Hafsa El maizi** nous rappelle les principaux objectifs d’un OnBoarding: s’intégrer dans l’équipe, créer du lien, devenir performant, comprendre la culture de l’entreprise et de l’équipe ainsi que maîtriser les outils.

Pour ce faire, elle évoque les éléments essentiels à mettre en place pour atteindre ces objectifs et faire un bon OnBoarding:

- Préparer les accès aux outils et env de travail en amont
- Préparer une documentation d’intégration : organigramme / trombinoscope / guide / glossaire / schéma d’architecture du/des projet(s)
- Mettre en place un plan personnalisé pour avoir une vision du déroulé de l’OnBoarding
- Privilégier l’accueil en personne
- Présenter l’équipe, le contexte fonctionnel/technique du/des projet(s), les outils, les conventions de code, les rituels de l’équipe etc
- Désigner un mentor qui doit: accueillir, guider, accompagner, répondre aux questions, transmettre, favoriser l’autonomie. Le mentor doit être pédagogue, disponible, empathique, ouvert d’esprit, inspirant ( encourager les prises d’initiatives ), encourageant. Attention, le mentorat n’est pas un transfert de compétence d’une personne sur le départ.
- Assigner des tâches simples avec un accompagnement. (Privilégier le Pair programming / mob programming)
- Donner du feed-back régulièrement, constructif et bilatéral ( mise en place du rapport d’étonnement )

A Bedrock, ces différents éléments sont pris en compte dans chacun des OnBoarding et tout ça améliore la confiance et l’autonomie du nouvel arrivant.

## Faut-il changer d'ère numérique pour préserver la démocratie ? — David Chavalarias

_Revue écrite par Valentin_

Pour cette première keynote de la 2e journée, **David Chavalarias** vient nous parler des réseaux sociaux et leurs influences sur le fonctionnement de nos démocraties.

Il commence par nous montrer que sur X, environ un tiers du contenu provient de comptes qui ne sont pas suivis, et le restant est trié selon un algorithme opaque.
Au final, c'est seulement 3% du contenu ami possible qui est réellement visible, ce qui représente un levier pour influencer des millions de personnes.

Tant que les API de Twitter étaient ouvertes, il était possible de créer un graph des relations (via les retweets) entre les comptes.
Ceci permet d'observer les sphères d'influences et notamment des campagnes de désinformation orchestrées depuis des comptes pro-russes. Il a également pu observer les évolutions des rapports de force, par exemple lors du rachat de Twitter par Elon Musk, où le poids des discours de déni-climatique commence à égaler, voire à surpasser celui des discours pro-climatiques.

Enfin, il évoque les principaux axes sur lesquels agir : individuel, collectif et institutionnel.

## Les accidents du travail dans la tech — Camille Dupond et Camille Dupont

_Revue écrite par Yorick_

**Camille Dupond** & **Camille Dupont** nous présentent ce qu'est (et ce que n'est pas)
un accident du travail, en rappelant d'une part que la responsabilité de l'employeur
est inscrite dans le droit français depuis 1898, et d'autre part ce fait évident
défini par l'OMS :
>"Personne ne devrait tomber malade ou mourir en faisant son travail"
La définition d'un accident du travail, telle que donnée par [l'article L411-1](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006742977)
du code de la sécurité sociale, le détermine :

- quelle qu'en soit la cause
- par le fait ou à l'occasion du travail
- à toute personne travaillant pour un employeur

Camille & Camille nous rappellent également que les atteintes à la santé de l'employé
peuvent être de nature physiques (douleur, chute durant le télétravail, malaise, infarctus)
ou psychique (syndrome anxio-dépressif après un entretien d'évaluation, non prise en compte de
la fragilité ou antécédents des salariées, aggression verbale)
En revanche, les accidents de trajet ou les maladies professionnelles ne sont pas
considérées comme accident du travail.

Un fait intéressant à noter est que le nombre d'accidents du travail est en
hausse de +46% chez les femmes depuis 2010.

Concernant la déclaration dudit accident, elle doit se faire dans les 24h après l'accident
à la suite de quoi plusieurs échanges entre l'employeur, la médecin et la CPAM
vont avoir lieu, pouvant aller jusqu'à 90 jours.

Camille & Camille nous rappellent l'importance d'avoir des témoins lors de ladite
déclaration, car l'entrerprise aura souvent tendance à minimiser voir à nier
l'existence de l'accident en question.

Enfin, ils proposent des solutions telles que l'enquête syndicale, la recherche
de causes ou encore l'anticipation de la reprise du travail de la victime
après son arrêt.

## 3 techniques pour piloter par la valeur — Alfred Almendra

_Revue écrite par Anouk_

**Alfred Almendra** nous parle de trois techniques pour piloter la valeur:

- **Les critères de succès** : Cela consiste en, dès la demande initiale, arriver à connaître les critères de succès futurs (d’un projet, d’une initiative, etc) afin de proposer des solutions plus pertinentes pour arriver à la réalisation de la demande. Les critères de succès doivent être imaginés « sans contrainte et sans limite » afin d’arriver à proposer des options alternatives à valeur ajoutée qui correspondent et accompagnent mieux dans la réalisation du projet.
- **Les couloirs de nage** : Cela consiste à protéger des allocations spécifiques pour répondre à des besoins spécifiques. Point de vigilance: ce qui se passe de bien ou de mal dans un “couloir” (un flux) ne doit pas impacter les autres couloirs. Il faut également identifier, réduire ou supprimer les dépendances dans les planning entre les couloir. Trois actions indispensable pour cette technique: mesurer (rendre visible les dépenses d’énergie sur chaque élément), protéger (définir une allocation et répartition qu’il faut respecter) et réguler (adapter en fonction des constats) les allocations de capacité.
- **Le carpaccio d’éléphant** : Cela consiste à découper la valeur finement.  Se questionner: dans les moyens qu’on se donne quelle est la meilleur valeur ajoutée que je peux délivrer ?

## Ma vie de développeur web dans le quantique — Benjamin Becquet

_Revue écrite par Hugo_

**Benjamin Becquet** nous parle de son quotidien chez Pasqal: acteur dans le domaine des processeurs quantiques. Après une présentation des phénomènes quantiques tels que la superposition ou l’intrication, nous sommes introduits aux principes de l’informatique quantique et qu’est-ce qui diffère de l’informatique classique que nous pratiquons. Là où nous manipulons des bits représentant 0 ou 1, en quantique il s’agit de qbits qui superposent les états 0 et 1. Cela permet aux processeurs de réaliser des traitements et calculs beaucoup plus rapidement que sur des processeurs classiques. Mais cela ne vient pas sans inconvénients, Benjamin nous parle également toutes les difficultés de ce domaine: le matériel sensible des processeurs et capteurs utilisés ou encore la gestion de la donnée alors que cette dernière a plusieurs états à la fois.

Mais concrètement, que fait un développeur web dans le quantique ? Ce n’est pas seulement des ordinateurs quantiques mais aussi des machines classiques pour piloter cette infrastructure et gérer les données qui ressortent des processeurs. C’est là dessus que Benjamin intervient en développeur web dans l’équipe cloud chez Pasqal. Il travaille sur la plateforme permettant aux clients d’accéder à la puissance de calcul des processeurs quantiques et les résultats qui en découlent. On y retrouve des tâches de notre quotidien comme le développement de nouvelles fonctionnalités, faire du monitoring ou de la documentation.

## Mapping the critical infrastructure sustaining our understanding of the Earth — Codrina Maria Illie

_Revue écrite par Hugo_

Dans ce talk, **Codrina Maria Illie** vient nous parler de l’écosystème open-source du domaine géospatiale. Sans s’en rendre compte, c’est aujourd’hui utilisé dans la vie de tous les jours. Par exemple, sur votre téléphone, il suffit de constater toutes les applications qui utilisent votre localisation.

En tant que membre élu du conseil d'administration de la Fondation Open Source Geospatial (OSGeo), Codrina recense toutes les librairies open source de géospatiale afin d’offrir une documentation des différentes solutions disponibles, servir la communauté open source et guider les utilisateurs dans leur choix selon leurs besoins. La fondation promeut également ces différentes solutions auprès des agences spatiales internationales et a même reçu le soutien de l’agence spatiale européenne (ESA) en 2023.
