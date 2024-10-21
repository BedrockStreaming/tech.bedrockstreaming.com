---
layout: ../../../../../layouts/post.astro
title: "Intégration continue avec Jenkins et Atoum"
description: ""
author: o_mansour
category: 
tags: [php,atoum,jenkins,ci]
comments: true  
permalink: integration-continue-avec-jenkins-et-atoum
---

![Intégration continue avec Jenkins et Atoum](./atoum.png)

Chez M6 Web nous tentons de créer une approche open-source intra entreprise. L'objectif est que certains composants génériques adaptés notre métier puissent être crées et diffusés largement parmis les dizaines de projets gérés chaque année. Un prochain post traitera de cette problématique.

Dans cette optique, il faut nous assurer de la qualité et la non régréssion de ces composants. Pour cela nous avons mis en place Jenkins afin d'assurer l'intégration continue de nos tests unitaires. Voici un exemple d'intégration avec Atoum (ce n'est pas forcement la meilleur méthode, n'hésitez pas à la commenter).



Structure du composant :

- ./src contient les classes du composants au format PSR-0
- ./tests contient les TU Atoum
- ./build-tools/jenkins contient les fichiers de configuration pour Atoum et Ant
- ./vendor contient les dépendances externes du projet (gérées avec Composer)

Voici le composer.json utilisé.



<script src="https://gist.github.com/3089529.js"></script>
Voici le fichier de configuration de Atoum : build-tools/jenkins/atoum.ci.php et celui de jenkins build-tools/jenkins/build.xml



<script src="https://gist.github.com/3090911.js"></script>
(cette configuration inclut l'ensemble des outils d'analyse statique que l'on utilise)

Enfin, voici la configuration faire sur Jenkins (en image).



![Intégration continue avec Jenkins et Atoum](./jenkins-ic1.jpg)

![Intégration continue avec Jenkins et Atoum](./jenkins-ic2.jpg)

![Intégration continue avec Jenkins et Atoum](./jenkins-ic3.jpg)

Via cette conf on obtient le résultat des tests (naturellement) ainsi que la couverture de code des tests avec la coloration des lignes couvertes ou non couvertes dans les classes testées.



![Intégration continue avec Jenkins et Atoum](./jenkins-ic4.jpg)

![Intégration continue avec Jenkins et Atoum](./jenkins-ic5.jpg)

