---
layout: post
title: "Firewall applicatif PHP et bundle Symfony"
description: ""
author:
  name:           M6Web
  avatar:         
  email:          
  twitter:  techM6Web      
  facebook:       
  github:    
category: 
tags: [php,symfony,open-source]
image:
  feature: 
  credit: 
  creditlink: 
comments: true  
permalink: firewall-applicatif-php-et-bundle-symfony
---

[![(c) http://www.flickr.com/photos/23959858@N03/](http://img.over-blog-kiwi.com/0/00/30/83/201305/ob_7488b3_capture-d-e-cran-2013-05-30-a-14-19-08.png)](http://img.over-blog-kiwi.com/0/00/30/83/201305/ob_7488b3_capture-d-e-cran-2013-05-30-a-14-19-08.png)
(c) http://www.flickr.com/photos/23959858@N03/


Nous publions aujourd'hui notre firewall applicatif sur notre [compte GitHub](https://github.com/M6Web). Il se compose :

- d'un [composant PHP](https://github.com/M6Web/Firewall) (5.4+) gérant les IPs (V4 et V6), plages, wildcards, white/black lists, etc.
- d'un [bundle Symfony](https://github.com/M6Web/FirewallBundle) permettant d'utiliser le composant [Firewall](https://github.com/M6Web/Firewall) dans les controllers l'aide des annotations et de retourner une réponse HTTP personnalisée.

Ils utilisent tous les deux [Composer](http://getcomposer.org/) et sont [disponibles sur Packagist](https://packagist.org/packages/m6web/).



#### 



#### Qu’est ce qu’un Firewall applicatif ?

Un Firewall applicatif permet de restreindre l’accès de certaines IPs certaines parties d'une application. Vous pouvez par exemple définir la liste des IPs autorisées dans la section d’administration ou au contraire celles que vous souhaitez bloquer dans un forum.



#### Pourquoi cette implémentation ?

Nous souhaitions éviter de redéfinir l’ensemble des IPs chaque point de restriction. Nous avons donc cherché centraliser la configuration. Le [FirewallBundle](https://github.com/M6Web/FirewallBundle) permet de mettre en place des listes hiérarchisées ainsi que des configurations prédéfinies que nous pouvons réutiliser et adapter chaque besoin.



#### 



#### Comment contribuer ?

Si notre firewall applicatif répond certaines de vos problématiques, mais que vous souhaitez le voir évoluer, n'hésitez pas participer son développement :

- forkez les projets sur [GitHub](https://github.com/m6web),
- faites une branche par fonctionnalité,
- proposez-nous vos évolutions et optimisations via les [Pull Requests](https://github.com/blog/712-pull-requests-2-0).

  
 Vous pouvez également nous remonter les problèmes rencontrés lors de son utilisation dans les [issues du composant](https://github.com/M6Web/Firewall/issues) ou les [issues du bundle](https://github.com/M6Web/FirewallBundle/issues).

Enfin, n'hésitez pas utiliser les commentaires de cet article pour nous faire part de vos réactions.



[![](http://knpbundles.com/M6Web/FirewallBundle/badge-short)](http://knpbundles.com/M6Web/FirewallBundle)
