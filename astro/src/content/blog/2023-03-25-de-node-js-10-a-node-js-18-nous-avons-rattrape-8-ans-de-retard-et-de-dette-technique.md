---
title: >-
  De Node.js 10 à Node.js 18, nous avons rattrapé 8 ans de retard et de dette
  technique
description: >-
  Difficile de faire évoluer des applications et améliorer une stack si
  l’ensemble est basé sur une version obsolète de Node.js… Dans cet article,
  nous verrons comment nous avons réussi à migrer vers une version récente et
  maintenue de Node.js grâce à une approche progressive et incrémentale.
tags:
  - node
  - Node.js
  - vue
  - Vue.js
  - vuex
  - pinia
  - vite
  - Vite.js
  - Vitest
  - TypeScript
  - developer retention
  - migration
color: 'rgb(251,87,66)'
author: t_crespy
date: '2023-03-25'
redirectFrom:
  - >-
    /2023/03/25/de-node-js-10-a-node-js-18-nous-avons-rattrape-8-ans-de-retard-et-de-dette-technique-et-seule-une-approche-progressive-et-incrementale-etait-viable.html/
---

Difficile de faire évoluer des applications et améliorer une stack si l’ensemble est basé sur une version obsolète de Node.js… Dans cet article, nous verrons comment nous avons réussi à migrer vers une version récente et maintenue de Node.js grâce à une approche progressive et incrémentale.

* TOC
{:toc}

# Contexte général et fonctionnel

Bedrock streaming est une co-entreprise (joint-venture) créée en 2020 par M6 Group et RTL Group, permettant à 7 diffuseurs et sociétés de médias dans 5 pays d’Europe de divertir 45 millions d'utilisateurs chaque jour, sur tous les écrans.

Pour gérer tous leurs utilisateurs ainsi que leurs contenus, notamment vidéos, les clients de Bedrock Streaming accèdent chacun à une constellation d’applications au sein d’un back-office centralisé (appelé BO par la suite).

# Contexte technique

De part sa conception initiale, le BO est une application monorepo. Elle fournit (à elle-même donc), des données via une API Symfony 4 (PHP 7.4), consommées uniquement par :

- des applications Vue.js 1 et Vue.js 2 gérées par la team backend (qui historiquement maintient le frontend de quelques applications) ;
- des applications Vue.js 2 gérées par la team frontend.

Le tout, dans un environnement [Node.js 10](https://github.com/nodejs/Release/blob/main/schedule.json#L50).

# Objectif

Node.js 10 est arrivé en fin de vie le 30 avril 2021. Il n’est donc plus maintenu, que ce soit en terme de fonctionnalités ou en terme de sécurité. Naturellement, toutes les dépendances JS migrent progressivement vers un support des versions de Node.js supérieures, et abandonnent le support de cette version 10 devenue obsolète.

Il s’agit donc de migrer la version de Node.js vers une version supérieure, dans l’idéal LTS afin de se prémunir d’une obsolescence prématurée. Dans un premier temps, Node.js 12.

Voici plusieurs raisons qui poussent à migrer Node.js :

- Nouvelles fonctionnalités (e.g. nouvelle implémentation pour l'ES6 Module Support expérimental, source : <https://nodejs.medium.com/announcing-a-new-experimental-modules-1be8d2d6c2ff> ) ;
- Abandon de fonctionnalités défaillantes (e.g. via dépréciation) ;
- Performance (e.g. mise à jour de V8 engine, source : <https://nodejs.medium.com/introducing-node-js-12-76c41a1b3f3f> ) ;
- Sécurité (e.g. mise à jour de TLS, source : <https://nodejs.medium.com/introducing-node-js-12-76c41a1b3f3f> ) ;
- Évolutions des dépendances externes. (e.g. Cypress qui abandonne les versions de Node.js non maintenues et qui requiert Node.js 14, 16 ou 18+, source : <https://docs.cypress.io/guides/references/changelog#12-0-0>).

# Une première stratégie problématique : la méthode “rhinocéros” 🦏

La décision a été prise de migrer le repository de Node.js 10 vers Node.js 12 en début d’année 2021.

Empiriquement, cette méthode a montré plusieurs limites :

- même si la compilation semblait bien se dérouler, des erreurs apparaissaient au moment de l’affichage de l’UI ➡ Il semblait donc nécessaire de parcourir l’intégralité des écrans afin de déceler toutes les anomalies possibles ➡ Le travail de la QA était alors conséquent ;
- même lorsqu’une anomalie est corrigée, une nouvelle peut apparaitre ➡ Il fallait re-parcourir les écrans concernés (par exemple, après avoir corrigé une anomalie qui empêche l’apparition d’une modale, de nouvelles anomalies peuvent être décelées au niveau des fonctionnalités que permet cette modale) ➡ Le travail de la QA augmentait de façon exponentielle au fil des corrections d’anomalies ;
- des dizaines voire centaines de dépendances dans le projet étaient dépendantes de Node.js 10 sans être encore compatibles avec Node.js 12 ➡ Il s’agissait donc de faire le point sur celles-ci, pour trouver des équivalents compatibles.

Après plusieurs mois, bien que bon nombre d’anomalies avaient pu être corrigées, la situation stagnait et la fin ne semblait pas plus proche qu’au début.

Les raisons de l'échec :

- L’ancienneté de certaines applications. Certaines d’entre elles avaient plus de 8 ans d’existence. En n’ayant subi que quelques corrections seulement. Les connaissances fonctionnelles et techniques s'étaient donc estompées naturellement, en raison d’une absence de documentation (autant fonctionnelle que technique). Il s’agit là des dettes fonctionnelle et technique. Lorsqu’elles sont là, elles sont relativement simples à identifier. Mais c’est déjà trop tard… ;
- L’absence de mise à jour des technologies. Certaines technologies devenues obsolètes (`jQuery 1.9`, `Vue.js 1`, `Bootstrap 2.3`) imposait non plus un refactor lié à une migration, mais une véritable refonte ;
- L’absence de tests. La couverture de tests était alors faible voire nulle. Migrer sans régression relevait alors d’une chance non maitrisable ;
- La façon dont la migration a été lancée était trop téméraire : c’est la méthode rhinocéros.
  - création d’une nouvelle branche (et d’une PR pour cette branche)
  - suppression de Node.js 10 et installation de Node.js 12
  - correction de toutes les anomalies qui apparaissent !

Ce fonctionnement peut marcher pour des périmètres techniques plus petits ou du moins dont les contours sont précisément marqués ;

L’organisation en équipe devenait compliquée. Au fur et à mesure des découvertes des anomalies au sein d’une seule et unique PR, il devenait difficile de suivre tous les sujets, sans découpage précis et rigoureux.

Face à cette situation, dont les développeurs et testeurs ne semblaient plus voir le bout, il a été décidé d’employer une autre stratégie.

# La stratégie gagnante : une migration progressive 📶

De part un essoufflement des développeurs et une nouvelle énergie insufflée par des départs et arrivées dans l'équipe, une nouvelle stratégie a émergé. Face à l'échec de la première, il a été proposé plus simplement de partir sur des bases saines, afin de migrer les applications sur des fondations plus solides car maitrisées.

Plus techniquement, cela s’est traduit par :

1. Création d’un nouveau répertoire `modern-apps/` dans le monorepo.
1. Mise en place d’une architecture basée sur Node.js 16 (Oui oui, Node.js 16 directement ! Il s’agissait de la version LTS en cours en date de début 2022.) dans ce répertoire seulement.
1. Migration des applications du BO, une par une, vers une stack plus moderne. En date de début 2023, cette migration est toujours en cours.

## Motivation

La motivation était principalement portée par :

- une volonté forte d’abandonner des outils et technologies vieillissantes voire obsolètes ;
- une pression engendrée par l'évolution rapide des technologies :
  - Node.js sort une version LTS tous les ans ;
  - Vue.js 3 venait de sortir et l’effort des développeurs du framework allait se porter plutôt sur cette version que sur la version 2.
- une pression engendrée par les autres équipes de la société qui, elles, étaient à jour (pour certaines), dont celle qui proposait des outils JS et TS dont l'équipe pourrait avoir l’usage, comme par exemple une librairie de configuration pour `eslint` couplé à `vue` ;
- une excitation liée à l’utilisation d’une stack récente et de *cutting-edge tools*.

## Plan d’action

Cette page blanche a nécessité un plan d’action que voici :

1. Création d’une application simplissime en guise de PoC, afin de montrer la viabilité d’un travail sous Node.js 16 dans une sous-partie du projet en parallèle d’un travail toujours actif sous Node.js 10 dans le reste du projet.
1. Mise en place d’une certaines DX vis-à-vis des linters et formatters notamment (ainsi que d’extensions d’IDE), par l’application de règles simples mais strictes, qui évitent aux développeurs les tâches sans plus-value, comme ajuster manuellement l’indentation ou ajouter les points-virgules.
1. Migration des librairies internes au monorepo.
1. Migration du design system, ainsi que des outils afférents (Storybook).
1. Migration d’une première application, la plus simple possible. L’objectif était alors de se rendre compte très concrètement des étapes de migration d’une application, afin d’en tirer une documentation exploitable pour les futures applications. Il en est ressorti que la majeure partie du travail consistait à refactor le code avec les nouvelles technologies choisies, en l’occurrence :
   1. `Vue.js 3` et sa `Composition API` (framework JS),
   1. `Vite` (serveur de dev et de build),
   1. `Pinia` (global state management),
   1. `Vitest` (framework de test unitaire),
   1. `Cypress` dans ses dernières versions (framework de test end-to-end)
   1. aussi et surtout `Typescript` (langage de programmation, sur-couche à JS).
1. Migration du processus de build et d’intégration aux templates backend (via notamment une extension Twig implémentée par nos soins, `ViteAppExtension.php`)
1. Mise en place d’une CI pour ces nouvelles applications, calquée sur celle des anciennes applications : linting, tests pour celles qui en avaient, déploiement en preview, etc.

En quelques mois seulement, il a été possible d’obtenir un résultat concret. Le répertoire `modern-apps/` a été initié en février 2022, et dès avril de la même année, une première application migrée était livrée en production. Et cela, avec un seul développeur à plein temps sur le sujet.

# Difficultés rencontrées

Cette seconde stratégie n’a bien sûr pas été sans encombre. Voici les principales difficultés rencontrées, dont l'équipe a su se prémunir au fil du temps.

## Non découpage des étapes de migration

Lors de la migration d’une des premières applications dont la complexité était légèrement supérieure aux précédentes, nous nous sommes retrouvés embourbés dans une multitude de bugs techniques et fonctionnels. En effet, migrer implique plusieurs changements qui n’ont pas nécessairement de rapport les uns avec les autres :

- ajouter des types TS
- migrer la librairie de Global State Management de `vuex` vers `pinia`
- migrer la Global API de Vue (de `new Vue()` vers `createApp()`)
- migrer de l'`Options API` vers la `Composition API` de Vue
- etc.

Si tous ces changements sont opérés en même temps, comment réagir lors de l’apparition d’une anomalie ? Comment traquer efficacement cette anomalie ?

> **Solution adoptée**
> 
> Nous avons décidé de découper plus finement nos développements. Une PR doit concerner un périmètre réduit et bien défini. Par exemple, la PR de migration de la librairie de Global State Management ne doit comporter que des modifications à ce sujet, et doit fournir une application fonctionnelle dont les tests passent.

## Méconnaissance de Typescript

> TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

Source : <https://www.typescriptlang.org/>

Ce langage de programmation, bien que son adoption parmi les développeurs JS explose, s’est avéré une complète nouveauté dans l'équipe. Il peut être tentant d'écrire des `any` partout, ou de supprimer le `strict mode`…

> **Solution adoptée**
> 
> Nous avons décidé d’intégrer TS progressivement sans se mettre trop de pression quant à l’intégralité du typage de nos applications. Typescript permet justement cette intégration progressive aux projets.
> 
> Un très gros progrès a aussi été réalisé grâce à la génération automatique des types TS à partir de l’API (grâce à l’*introspection system* de GraphQL). Les données reçues du backend se voyaient alors avoir une structure directement exploitable dans le frontend.

## Suppression précipitée de librairies obsolètes

Lors du découpage des étapes de migration, une problématique est apparue. Par exemple, si nous souhaitons migrer de `vuex` vers `pinia` dans un second temps, comment faire pour que l’application reste fonctionnelle avec `vuex` dans le premier temps ?

> **Solution adoptée**
>
> Nous avons décidé de conserver certaines librairies, le temps de la migration des applications. Il peut être tentant de vouloir supprimer immédiatement ce qui nous semble obsolète, mais ces éléments ne seront vraiment obsolètes que lorsque toutes les applications seront migrées ; mais pas le temps qu’elles le soient.

## Non anticipation de la complexité liée à certaines dépendances

Bien que cet aspect n'était pas une surprise, certaines librairies ont apporté plus de difficultés que d’autres lors de la migration. Par exemple, l’intégration de Vue 3 et la Composition API impliquait la montée de version de `vee-validate`, un librairie de validation de formulaire. Il s’est avéré que l’implémentation imposée était radicalement différente de la version précédente (compatible avec Vue 2 et l’Options API), moins intuitive et plus complexe.

> **Solution adoptée**
> 
> Ce cas de figure n’est pas vraiment impressionnant car nous nous y attendions. Nous avons décidé dans un premier temps d’effectuer une certaine veille technique, afin de remettre en cause le choix initial de cette librairie. Il s’est avéré que nous l’avons conservée, ce qui amenait dans un second temps une montée en compétence quant à l’utilisation de celle-ci, en vue de son intégration.

## Entretien des applications legacy en même temps

Une application donnée pouvait se retrouver d’une part en cours de migration, et d’autre part devoir recevoir une évolution ou une correction d’anomalie.

> **Solution adoptée**
> 
> Le choix et l’ordre des applications à migrer a été choisi en fonction des priorités en cours. Nous avons choisi de migrer en premier les applications qui ne subissaient que très peu de modifications. Par la suite, et encore aujourd’hui, nous livrons en production rapidement chaque application migrée, afin de ne pas avoir à maintenir plusieurs versions en même temps (la version legacy étant tout de même conservée le temps de s’assurer que la version moderne tourne correctement en production auprès des clients). Dans les très rares cas où une application en cours de migration devait recevoir une évolution ou une correction d’anomalie, nous la traitions dans les 2 versions. 

# Autres avantages

## Uniformisation des technologies au sein de la société

Au sein de Bedrock, le back-office n’est pas la seule application. Il existe aussi des applications frontend sur les mêmes technologies pour adresser l'écran web ou les télévisions connectées. Bien que le framework utilisé pour celles-ci soit React.js et non Vue.js, l’outillage peut être uniformisé entre les projets et les équipes. La migration a permis de préparer le terrain pour mettre en place ces outils : TypeScript, PNPM, etc.

## Attractivité et rétention des développeurs

Cette migration générale permet de mettre en place une stack résolument plus moderne et d’utiliser des outils et technologies plus récents. N’est-ce pas là un argument fort pour attirer des nouveaux développeurs et retenir ceux déjà en place ? Dans l'équipe, plusieurs personnes ont émis des doutes sur leur volonté de rester dans la société si la décision de migrer, et donc d’intégrer des technologies plus à jour, n’avait pas été prise. En date de début 2023, il fait peu de doutes que les projets en Vue 3 sont plus attractifs que les projets en Vue 2…

# Conclusion

En fin de compte, cette approche progressive et incrémentale, toujours en cours, permet de maintenir dans un répertoire bien défini une stack récente dont les mises à jour sont simples car petites. Par exemple, nous avons récemment migré de Node.js 16 vers Node.js 18… en quelques jours !

Cette grande aventure, toujours en cours, nous a permis de vraiment prendre conscience qu’il faut entretenir certes les applications mais aussi les versions des frameworks et outils ! Utiliser un nouvel outil ou une nouvelle technologie est un choix fort qu’il faut être capable d'assumer dans le temps.

Il peut paraitre frustrant d’entretenir des outils, sans gagner en performance ni en productivité mais seulement pour ne pas devenir obsolète. Mettre l’accent sur ces points, tout en sachant bien jauger jusqu’où doivent aller ces upgrades, est la marque d’un certain professionnalisme.

Il est vrai que dans l’immédiat, la valeur ajoutée pour le client est modérée : les gains restent très techniques, notamment en termes de stabilité et de performances. Ce n’est que plus tard que les gains se feront concrètement sentir : plus d’efficacité et de productivité pour les évolutions, et plus de fiabilité.

Il est aussi important de savoir reconnaitre qu’une technologie utilisée (parfois avec fierté à ses débuts) est devenue obsolète, et qu’il faut s’en débarrasser pendant qu’il est encore temps.
