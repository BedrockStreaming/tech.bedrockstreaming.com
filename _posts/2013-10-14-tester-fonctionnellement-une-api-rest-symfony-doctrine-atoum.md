---
layout: post
title: "Tester fonctionnellement une API REST"
description: ""
author: team_cytron
category:
tags: [qualite, symfony, atoum, tests fonctionnels]
feature-img: "images/posts/cytron/husky.png"
thumbnail: "images/posts/cytron/husky.png"
comments: true
permalink: 2013/10/tester-fonctionnellement-une-api-rest-symfony-doctrine-atoum
---

Un des enjeux des tests fonctionnels est de pouvoir être joués dans un environnement complètement indépendant, dissocié de l'environnement de production, afin de ne pas être tributaires de données versatiles qui pourraient impacter leur résultat. Il faut, cependant, que cet environnement soit techniquement similaire à celui de production pour que les tests aient une réelle validité fonctionnelle.

Avec la Team Cytron, nous sommes tombés face à cette problématique lorsque nous avons voulu tester fonctionnellement un service agnostique de contenu mettant à disposition une API REST et utilisant [Symfony2](https://symfony.com/), MySQL, Doctrine et [atoum](https://www.atoum.org).


#### Monter un serveur de données dédié aux tests

Dans le cas d’une application utilisant MySQL, on pense alors monter un serveur applicatif de test relié à une base de données de test. Plusieurs problèmes peuvent alors découler d’un tel système :

- il faut être en mesure de pouvoir mettre en œuvre un serveur MySQL dédié uniquement aux tests,
- mais surtout cette architecture n’est pas exploitable pour exécuter des tests de manière concurrentielle (ce qui pose problème pour l'intégration continue). En effet, des collisions apparaîtraient en base de données et le résultat des tests ne seraient plus exploitables.



#### Mocker Doctrine

Notre seconde réaction a été de vouloir mocker Doctrine pour devenir indépendant de MySQL. Lourde tâche.

Tant bien que mal, nous sommes arrivés à un résultat plutôt satisfaisant car notre API réalise des opérations simples : ajout, modification, suppression et consultation avec un filtrage élémentaire.

La première chose à faire est de s’assurer que notre serveur de test n’accède pas aux données de production dans MySQL en changeant la configuration Doctrine dans le fichier config_test.yml.



<script src="https://gist.github.com/KuiKui/6976725.js"></script>

Ensuite, nous avons créé une [classe abstraite](https://gist.github.com/fdubost/6761079#file-gistfile1-php) dont héritent toutes nos classes de test, et qui permet d’initialiser le mock de Doctrine.

Autant vous dire que le développement de cette classe a été fastidieux car incrémental : chaque nouveau besoin de manipulation de données dans nos tests, il a fallu modifier le mock pour prendre en compte des méthodes ou des fonctionnalités de méthodes qui n’avaient pas été encore mockées (comme le filtrage par critères dans la fonction findBy).

Les possibilités de ce mock reste limitées. Nous sommes, par exemple, tombés sur le cas où deux managers de données en relation (des recettes et leurs ingrédients) dépendaient d’un même EntityManager Doctrine : tel que nous l’avons développé, le mock ne sait pas gérer cette situation et engendre des erreurs à l'exécution. Il aurait fallu refactoriser le code pour parvenir à nos fins et passer encore plus de temps sur ce projet… et nous n’en avions pas beaucoup !

Autre problème : nous utilisons des fonctionnalités de la librairie Gedmo/DoctrineExtensions pour la gestion automatique des dates de création et de modification. Évidemment, elles ne sont pas opérationnelles avec notre mock et nous aurions encore dû développer pour faire passer nos tests.



#### Utiliser les transactions de Doctrine

Il a donc fallu nous rendre l’évidence : cette solution ne correspondait pas à nos besoins ! Nous avons alors émis l’hypothèse d’une alternative qui nous permettrait peut-être de nous passer d’une config spécifique MySQL pour nos tests : l’utilisation des transactions via Doctrine.

Au début de chaque test, nous aurions ouvert une transaction mais qui n’aurait jamais été commitée par la suite, évitant toute interaction avec la base de données de production. Mais avec cette solution, dangereuse à mettre en place et à maintenir, nous aurions couru le risque de modifier des données de production.



#### Remplacer MySQL par un autre SGBD uniquement pour les tests

Finalement, nous sommes partis sur une autre piste, celle qui fait actuellement tourner nos tests fonctionnels sur ce projet. Nous utilisons [SQLite](https://www.sqlite.org/) dans notre environnement de test la place de MySQL. Ce SGBD est très léger et simple mettre en œuvre : pas besoin d’une installation sur un serveur dédié, il suffit simplement d’activer une extension de PHP. SQLite se base sur des fichiers physiques pour gérer le stockage des données. Ainsi, chaque build de test peut avoir ses propres fichiers de BDD dans son répertoire évitant toute collision dans le cas de tests concurrentiels.

Nous avons donc configuré Doctrine, pour qu'il utilise SQLite lors de son exécution en environnement de test en modifiant le config_test.yml



<script src="https://gist.github.com/KuiKui/6976835.js"></script>

Comme pour le mock de Doctrine, nous avons mis en place une [classe abstraite](https://gist.github.com/fdubost/6761662#file-gistfile1-php) qui permet de gérer la réinitialisation de la base pour chaque test.

Nous pouvons donc maintenant tester unitairement et fonctionnellement notre API REST développée en PHP l'aide de Symfony2 et Doctrine. Et nous ne nous en privons pas : notre API est couverte par bientôt 5.000 assertions.



#### Génération des données de test

Après avoir trouvé une solution pour l'accès à la structure de données en environnement de test, nous nous sommes penchés sur la question du contenu de ces données de tests. Pas longtemps.

Notre service REST permettant des opérations CRUD, nous partons pour chaque test d'un contenu vide que nous remplissons à l'aide de notre propre service. Cela permet de tester beaucoup plus de cas d'utilisation. Mais surtout cela permet aussi de tester des cas plus réels, plus proches de son utilisation par nos clients.
