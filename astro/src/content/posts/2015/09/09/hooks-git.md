---
layout: ../../layouts/post.astro
title: "Simplifiez vous la vie avec les hooks Git"
description: "Comment simplifier son quotidien de développeur Symfony2 avec nos hooks Git"
author: m_randy
category:
tags: [git, hooks, workflow, composer, coke]
feature-img: "../../../../images/posts/git-hooks.png"
thumbnail: "../../../../images/posts/git-hooks.png"
comments: true
---

La stack de base de tout projet un minimum sérieux à tendance à devenir de plus en plus lourde.

Chez M6Web, et particulièrement dans la [team Burton](https://twitter.com/teamburtonM6Web), nous développons principalement des projets Symfony2.
Cette stack est donc composée, entre autre de [coke](https://github.com/BedrockStreaming/Coke) et de [composer](https://getcomposer.org/).

Concernant coke, l'idée est de ne jamais versionner de code qui ne respecte pas les standards de développements.
Interdit les commits "fix standards" ou autre "fix coke" qui alimentent une PR avant d'être rebasés !

Concernant composer, il s'agit de toujours travailler sur la "bonne version" des dépendances. 
Certes, composer (via le composer.lock) permet d'être sûr que toute personne qui lance un `composer install` aura la même version des dépendances.
Toutefois, il faut encore penser à lancer cette commande, surtout lorsque l'on récupère du code depuis le repository central où le composer.lock peut avoir évolué.

Pour répondre à ces besoins, nous nous sommes basés sur l'excellent [système de hooks de git](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) et nous avons développé [2 petits scripts](https://github.com/BedrockStreaming/git-hooks).

### check-coke.sh

Coke est un petit utilitaire qui facilite le lancement de PHP_CodeSniffer sur son projet.
Toutefois, ce dernier est relativement lent, surtout sur les projets composés d'un grand nombre de fichiers.
Pour optimiser son exécution, le script "check-code.sh" se charge de lancer coke uniquement sur les fichiers en cours de modification d'un point de vue Git.
Ainsi, son exécution est extrêment rapide, ce qui permet de l'exécuter en `pre-commit` pour ne jamais commiter un code ne respectant pas les standards de développement

### check-composer

Comme indiqué plus haut, le soucis avec composer est qu'il faut penser à lancer la commande `composer install` pour s'assurer que les dépendances sont à jour.
Non seulement cette commande prend un certains temps, mais il faut surtout penser à la lancer, même pour des actions qui semblent anodines, comme changer de branche.

Partant de ce constat, nous avons créé le script "check-composer.sh", qui vérifie s'il y a une différence entre la version de départ et d'arrivée du fichier `composer.lock`, et qui lance la commande `composer install` si nécessaire.



N'hésitez pas à les essayer et nous faire part de vos retours, voir de proposer vos hooks.
Le but de ce repository partagé est de nous simplifier la vie en nous permettant de ne plus penser aux outils qui sont autour de notre code, mais de nous concentrer sur ce que nous avons à faire.
