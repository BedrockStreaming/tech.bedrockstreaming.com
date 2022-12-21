---
 layout: post
 title: Ce que nous avons retenu de la SymfonyCon - Disneyland Paris 2022
 description: "Nos retours de la SymfonyCon à Paris, les 17 et 18 novembre 2022"
 author: backend
 tags: [conferences, backend, symfony, php]
 color: rgb(251,87,66) # this is Bedrock color here
 thumbnail: "images/posts/symfonycon2022/header.jpg"
 language: fr
 comments: true
---

En cette fin d'année, une petite équipe de chez Bedrock a assisté au grand retour de la SymfonyCon 2022 après 3 ans d'absence. 
Nous avons eu la chance de découvrir les nouveautés liées à Symfony 6.2 et d'assister aux conférences sur de nombreux sujets techs à Disneyland.
La keynote présentée par [Fabien Potencier](https://github.com/fabpot), le créateur de Symfony, nous donne un avant-goût des nouvelles fonctionnalités qui seront présentes dans la future version de Symfony.
Au programme, un nouveau composant Webhooks ainsi que l'évolution du composant Mailer.

## Unleashing the power of lazy objects in PHP

[Nicolas Grekas](https://connect.symfony.com/profile/nicolas-grekas), habitué de la scène PHP et membre de la Symfony Core Team, nous a présenté les différentes façons d'utiliser les lazy objects en PHP et plus spécifiquement à l'aide de Symfony. 

Les lazy objects sont des objets instanciés vides qui peuplent leurs propriétés eux-mêmes seulement quand ils sont utilisés.
Ils sont utiles lors de l'instanciation de lourds objets peu appelés, cela permet de faire du lazy loading.

Nicolas nous a aussi présenté deux nouveaux traits prochainement disponibles sur Symfony 6.2 permettant de travailler avec ces objets.
Les `VirtualInheritanceProxies` et les `GhostsObjects` sont deux nouvelles possibilités pour implémenter plus facilement des lazy objects en plus du `ValueHolder`.

## Advanced Git magic

[Pauline Vos](https://connect.symfony.com/profile/paulinevos) nous représente GIT en dehors de son usage quotidien, comment aller plus loin que les pull, commit, push et merge habituels, elle nous livre donc une présentation sur une méthode de debug en utilisant GIT.

Retour dans un premier temps sur l’importance des commits dit “atomic” avec comme règles :
- Chaque commit se résume à un fix ou une feature
- Chaque commit doit fonctionner (tous les tests doivent passer)
- Chaque message et description doivent être clairs et concis

Pauline introduit ensuite la commande `git rebase -i` qui permet un rebase interactif servant notamment à réécrire notre historique.

![git rebase intéractif](/images/posts/symfonycon2022/IMG-0785.jpg)

Vient ensuite l’utilisation de la commande `git reflog`, commande avec laquelle nous pouvons obtenir le détail des commandes lancées sur la branche, elle peut de ce fait être utile pour réparer une erreur.

#### Comment utiliser toutes ces commandes GIT pour debugger ?
Une démonstration de la commande `git bisect` et de toutes ses options qui permettent d'identifier le commit qui a introduit le bug en faisant une recherche dichotomique. 

Pauline pousse la réflexion plus loin en alliant la commande `git bisect` avec un script de debug ou un test unitaire.

_“Write it, push it and find where it breaks”_

Afin de tirer parti de cette méthode, il est important que chaque commit soit fonctionnel, tous les tests doivent donc passer.

Vous pouvez également retrouver [un article de Pauline](https://www.pauline-vos.nl/fix-bugs-%e2%9a%a1-fast-with-regression-tests-and-auto-bisect/
) à ce sujet sur son blog personnel.


## Schrödinger's SQL - The SQL inside the Doctrine box

Au début de sa conférence [Claudio Zizza](https://connect.symfony.com/profile/senseexception) insiste sur le fait de bien connaître nos bases de données et le langage utilisé pour les requêter, il évoque notamment les différences entre MySQL et PostgreSQL. Ensuite, il nous a parlé de Doctrine ORM, des fonctions que nous apprécions tant, car elles nous facilitent la vie. 
Puis, il a rappelé l'importance de savoir faire des requêtes SQL même si nous utilisons Doctrine. Comprendre le SQL peut nous permettre d'optimiser notre utilisation de Doctrine et donc de mieux appréhender son fonctionnement. 
Il insiste aussi sur le fait que SQL "seul" est bien plus puissant que DQL (Doctrine Query Language). 
Pour terminer, Claudio nous a donné quelques recommandations de lecture pour apprendre le SQL ainsi qu'un site permettant de tester nos requêtes.

## Advanced Test Driven Development

Durant cette conférence, [Diego Aguiar](https://connect.symfony.com/profile/mollokhan), développeur de chez SymfonyCasts nous rappelle ce qu’est le **TDD (Test Driven Development)**, son histoire, les différentes techniques ainsi que des astuces afin de nous débloquer et bien sûr les cas où il ne semble pas utile d’utiliser le TDD.

À retenir, le TDD est une discipline, il faut beaucoup d'entraînement et répéter continuellement ces exercices.

![tdd discipline](/images/posts/symfonycon2022/IMG-0848.jpg)

_**“Fake it till you make it”**_, il s’agit d’abord d’écrire son code de test en utilisant par exemple des assertions, des tests avec différentes sorties et ensuite de produire le code qui va résoudre ces tests.

![Fake it till you make it](/images/posts/symfonycon2022/IMG-0852.jpg)

**“ Write your test code, produce it and repeat.”**

#### Pourquoi nous retrouvons nous parfois bloqués ?
- Les tests écrits sont peut-être faux
- Les tests ne sont pas assez segmentés
- Le code écrit est peut-être trop spécifique

#### Comment se débloquer ?
- Continuer et trouver un test plus simple
- Refactoriser le code en production qui met en difficulté
- Écrire les différents use-cases
- Passer outre les tests un instant

Les cas les plus favorables au TDD sont les nouvelles fonctionnalités qui n’ont pas de lien avec du code legacy. En ce qui concerne les cas non pertinent au TDD, nous retrouvons les cas de configuration, de découverte de code et de requêtes.

Pour conclure, Diego nous rappelle que le TDD est bien évidemment plus un outil qu'une règle.

## Dynamic Validation With Symfony

Tout en se basant sur les évolutions des Pokémon, [Marion Hurteau](https://connect.symfony.com/profile/marionleherisson) a introduit le principe de validation dynamique. Par exemple, vérifier que le nom de notre Pokémon contient bien 10 caractères, ou encore les différentes règles d'évolution en fonction du type de Pokémon. 
À l'aide d'exemples de code qui sont disponibles sur son repo Git, elle a passé en revue les façons d'implémenter des validations à l'aide du composant `Symfony Validator`.
Au fil de sa présentation, la complexité des contraintes croît ce qui permet de voir un éventail de possibilités.

##  From monolith to decoupled…wait, why is that one getting bigger?!?
Lors de cette conférence, [Shawna Spoor](https://connect.symfony.com/profile/shawnaspoor) est venue nous parler de comment découper un monolithe en une multitude de microservices grâce au "Strangler Fig Pat". Elle a commencé par nous rappeler les avantages et les inconvénients des microservices comparé à un monolithe.

Suite à cela, elle nous a donné les différentes étapes pour découper une application monolithe en micro-services et cela sans jamais arrêter le développement de nouvelles features:  
- Choisir une fonctionnalité qui peut être découpée
- Créé le nouveau Service
- Déplacer le trafic vers le nouveau service
- Recommencer jusqu'à la disparition du monolithe

On peut résumer ce pattern via l’image ci-dessous, le tronc représente le monolithe et les branches qui l'étranglent lentement correspondent aux micro-services.
![Strangler Fig Paterne](https://w2j6m4k9.rocketcdn.me/wp-content/uploads/2019/09/Strangler-Tree-Header-Big-1024x576.png)


## From a legacy Monolith to a Symfony Service Oriented Architecture with zero downtime
Lors de la conférence présentée par [Clément Bertillon](https://connect.symfony.com/profile/skigun), nous avons pu voir comment son équipe a transformé leur ancienne application monolithe composée de milliers de fichiers PHP en un monorepo décomposé en micro-services en utilisant le **Strangler Fig** pattern et cela sans aucune rupture de service ni arrêter le développement de nouvelles features.

De manière très simplifiée, ils ont installé Symfony, mis le code legacy dans un dossier à la racine du projet, le routeur symfony permet d'accéder au nouveau micro-service tout en redirigeant vers le legacy si aucun contrôleur n’a été trouvé. Il a conclu avec les règles d’or et comment analyser les performances via Blackfire.
Ces deux conférences sur le **Strangler fig** paterne, mon permis de mettre en place un micro projet dans un de nos projets, tout en le cloisonnant du code parent (règles d’or vérifié grâce à l'outil présenté [deptrac](https://github.com/qossmic/deptrac)). Ce principe nous permettra de le transformer en micro service très facilement.


##  PHPStan: Advanced Types
Cette conférence centrée sur l’outil d'analyse statique de code : PHPStan, a été présentée par son créateur [Ondřej Mirtes](https://connect.symfony.com/profile/mirtes).
Il a commencé par nous rappeler quelle est la différence entre un langage compilé et un langage interprété, le premier ne se compile pas s’il y a des erreurs alors que le second ne plante qu'à l'exécution. Le but de PHPStan est de nous aider à identifier toutes les erreurs sans avoir besoin d'exécuter le code.

![PHPstan](/images/posts/symfonycon2022/phpstan.png)

Cet outil analyse toutes les fonctions, les propriétés, le typage PHP, mais aussi la PHPDoc. Ondřej nous a ensuite parlé de tous les types PHPStan avec des exemples, en voici quelques un qui ont marqué notre attention : 
- `non-empty-array`, `non-empty-string`
- `literal-string`
- `integer-range`, `integer-mask`, `integer-maskof`
- `conditional return types, union types, intersection types` …

Il finit en nous rappelant que l’utilisation de `@var` est une mauvaise pratique et qu’il vaut mieux renforcer le typage quitte à modifier la documentation des `vendor` via les `Stub files`.

## GNAP: The future of OAuth
[[Slides](https://slides.com/chalasr/gnap-the-future-of-oauth-2fefdf)]

[Robin Chalas](https://connect.symfony.com/profile/chalas_r) @chalas_r nous a présenté GNAP (Grant Negotiation and Authorization Protocol) : une initiative pour développer la prochaine génération de protocoles d'autorisation.
Pour mieux comprendre les enjeux, nous sommes repartis de l’historique d’oauth, ses évolutions et ses écueils. Le constat étant que même si de nombreux problèmes connus ont été résolus, aujourd'hui, pour bien utiliser OAuth 2, il faut lire une douzaine de RFC et s'assurer qu'elles soient pertinentes pour les différents cas d'utilisation. 

L'augmentation de la complexité du protocole dégrade l'expérience du développeur, ce qui va à l'encontre de son objectif principal qui est la simplicité pour les développeurs de clients.

GNAP (prononcé "nap") est une complète réécriture afin de répondre aux besoins en sécurité des applications modernes :
- Pensé pour tous les clients, plateformes (pas uniquement web, possibilités de deeplinking mobile par exemple)
- les interactions sont un concept clé
- Du chiffrement partout et des mécanismes de rotation extensibles
- Plusieurs Access Tokens / grant request
- Gestion de l’identité intégrée
- Plus developer friendly
- Pas rétrocompatible avec OAUTH2

Ce protocole est toujours à l’état de brouillon, le groupe de travail a été monté en octobre 2020 et lors du dernier rassemblement (nov. 2022), aucune modification du protocole n’a été actée. Le speaker conclut sur la nécessité de commencer à travailler sur l'implémentation de ce protocole dans l'écosystème PHP afin de supporter ce nouveau standard dont la finalisation ne devrait plus tarder. 
Pour aller plus loin [https://oauth.xyz/](https://oauth.xyz/)

## A self-training journey to the certification Symfony
Cette conférence traite de la méthodologie et des bonnes pratiques pour obtenir la fameuse certification Symfony.
En effet, la conférencière, [Camille Jouan](https://connect.symfony.com/profile/ca-jou), nous présente sa manière de préparer l'examen.
Elle commence par énoncer son plan d'action :
- Rassembler un maximum d'informations (Symfony doc, site pour la préparation à la certification, etc)
- Organiser un plan autour du quoi/comment/pourquoi
- Faire une timeline avec les étapes prévues
- Se fixer un objectif dans le temps

L'idée est d'accepter que cela ne sera pas parfait et que des retouches vont y être apportées

Pour Camille, l'idéal serait de pouvoir faire un test blanc au bout d'un certain temps de préparation sans "grandes convictions" : le but étant de se familiariser avec l'exercice.
Si les fonds sont disponibles, [un training est proposé par Sensiolabs](https://training.sensiolabs.com/fr/courses/SF5PRECERTIF-preparation-certifcation-symfony-5-online-sensiolabs-university).
En fonction de cet examen blanc, ajuster son plan, se concentrer sur des parties qui doivent être approfondies.
Un autre point sur lequel la conférencière a insisté est le monitoring : régulièrement faire un bilan sur son avancée pour s'adapter.
Des outils comme Trello, Excel, Google permettent d'en avoir une vision globale.

Il est important de parler de ce projet autour de soi, notamment auprès de ses proches pour avoir du soutien, mais également auprès de son entreprise qui peut éventuellement proposer une subvention et ou un aménagement du temps de travail. 

Elle conclut son intervention par un dernier conseil : cette méthodologie est adaptable à la vie quotidienne et peut être utile dans d'autres situations.

## Notre retour d'expérience
Cette nouvelle édition de la SymfonyCon nous a permis de découvrir ou d'approfondir certaines connaissances. 
Nous pouvons aussi nous rendre compte de notre travail quotidien et prendre du recul sur celui-ci.
Cette expérience anglophone était très enrichissante et les conférences proposées étaient variées.
Il y avait de la résolution de problèmes techniques, des retours d'expériences ou encore de la télémétrie.

![Fresque Lego symfony](/images/posts/symfonycon2022/IMG-0773.jpg)
