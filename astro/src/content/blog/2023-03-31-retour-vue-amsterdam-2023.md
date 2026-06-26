---
title: Retour Conférence Vue Amsterdam 2023
description: Retour sur la conférence Vuejs à Amsterdam 2023
tags:
  - node
  - Node
  - vue
  - vuex
  - pinia
  - vite
  - Vitest
  - TypeScript
  - developer
  - javascript
color: 'rgb(251,87,66)'
thumbnail: /images/posts/2023-03-31-retour-vue-amsterdam-2023/vue_amsterdam_logo.jpeg
author:
  - pl_perez
  - l_penaguin
  - c_berard
date: '2023-03-31'
---

C’est dans le Theater Amsterdam que se sont déroulés ces deux jours de VueJS Amsterdam, événement faisant partie de la JSWorld Conference, durant toute la semaine.

De nombreux sponsors étaient là pour l’occasion, ainsi que des écoles comme VueMastery ou VueSchool (proposant une toute nouvelle certification Vue), et des partenaires plus connus comme Storyblok ou Nuxt Labs.

![2023-03-31-retour-vue-amsterdam-2023](/images/posts/2023-03-31-retour-vue-amsterdam-2023/bedrock-vue-amsterdam-2023-002.jpg)

L’ambiance était au rendez-vous dès le début avec une conférence en musique, avec Tim Benniks guitare en main !

Nous avons ensuite pu profiter de conférences aussi nombreuses que variées. De l’accessibilité à la gestion de l'interface en Vue du leader mondial du transport de marchandises [Maersk](https://www.maersk.com/fr-fr/), en passant par les tests et le guide ultime pour publier un package NPM !

Sans oublier la grande famille Nuxt qui était (presque) au complet !

L’ensemble des conférences est visible sur [la chaîne youtube du JSWorld Conference](https://www.youtube.com/@JSWORLDConference).

## State of Vuenion

Evan You (créateur de [Vue](https://vuejs.org/) et [Vite](https://vitejs.dev/)) a présenté un état des lieux et des dernières avancées de Vue, épaulé par Alex Kyriakidis (fondateur de [VueSchool](https://vueschool.io/)).

![2023-03-31-retour-vue-amsterdam-2023](/images/posts/2023-03-31-retour-vue-amsterdam-2023/bedrock-vue-amsterdam-2023-003.jpg)

Commençant par un retour sur les nombreuses nouveautés de ces trois dernières années, pour les plus connues Vue 3, Vite, Vitest et Pinia, Evan a d'abord fait un focus sur la position de Vue 3 en tant que version par défaut depuis le 7 février 2022.

Il a aussi évoqué les avancées relatives à Vue 2.7 (dont l'intégration de la Composition API, du v-bind CSS, etc.) permettant de rapprocher les expériences développeurs entre Vue 2 et Vue 3.

Evan a ensuite présenté les derniers travaux sur la version core de Vue en version 3. Principalement orientés sur des améliorations concernant la facilité d’utilisation, l'accélération des tests (avec Vitest) ainsi que la vitesse de build (avec Rollup).

Enfin, Evan a présenté les projets à venir pour le core. La disparition de la Reactivity Transform jugée trop risquée, l’amélioration du server side rendering et la création d’un "vapor mode", une nouvelle manière de compiler les Single Files Components en optimisant l’utilisation d’un Virtual DOM. Ce dernier permet d’approcher la vitesse de compilation d’une application en JS vanilla, en gardant la puissance du framework !

> 📺 [Conférence sur Youtube](https://www.youtube.com/watch?v=I5mGNB-4f0o)

## La fin de vie de Vue 2

![2023-03-31-retour-vue-amsterdam-2023](/images/posts/2023-03-31-retour-vue-amsterdam-2023/bedrock-vue-amsterdam-2023-end-of-vue2.JPG)

Après avoir présenté l’état de l'écosystème qui gravite autour de Vue et Vite lors de sa conférence “State of the Vuenion 2023”, Evan You a terminé en dévoilant la date de fin de vie de Vue 2 au 31 décembre 2023.

Après cette date, la version arrêtera de recevoir des mises à jour ; il sera néanmoins possible de bénéficier de mise à jour payante, bien qu’il soit vivement conseillé de migrer vers la dernière version du framework.

Une [page dans la documentation](https://v2.vuejs.org/lts/) a été mise en place, présentant les options qui s’offrent aux développeurs et aux organismes qui n’ont pas encore migré leurs applications.

## Il était une fois… Histoire

![2023-03-31-retour-vue-amsterdam-2023](/images/posts/2023-03-31-retour-vue-amsterdam-2023/bedrock-vue-amsterdam-2023-histoire.JPG)

Guillaume Chau, un des membres de l’équipe de développement de Vue, a présenté l’outil [Histoire](https://histoire.dev/) durant une petite demi-heure.

L’outil est dans la même veine que Storybook. La plupart du temps, il sert à afficher et documenter des composants d’un design system en complète isolation.

Contrairement à d'autres outils, Histoire est pensé pour s'intégrer parfaitement dans son environnement de développement, de façon à ce que l’écriture des “stories” s'apparente le plus possible à l'écriture et à l'utilisation native de composants Vue.

Histoire utilise [Vite](https://vitejs.dev/) ce qui lui permet de s'intégrer dans un projet qui l’utilise déjà avec très peu de configurations supplémentaires.

> 📺 [Conférence sur Youtube](https://www.youtube.com/watch?v=Q8LeAg-9ngs)

## Une autre histoire de... migration !

![2023-03-31-retour-vue-amsterdam-2023](/images/posts/2023-03-31-retour-vue-amsterdam-2023/bedrock-vue-amsterdam-2023-migration-vue3.JPG)

La société [Maersk](https://www.maersk.com/fr-fr/), spécialiste dans la logistique des transports, nous a présenté son application destinée entre autres, à la gestion des conteneurs maritimes. Une occasion pour nous faire part de leur processus de migration de Vue 2 vers Vue 3 !

Réalisant la même migration de version à [Bedrock Streaming](https://bedrockstreaming.com/) sur la partie backoffice, nous constatons que nous partageons beaucoup de similitudes !

Vous trouverez un article dédié sur la migration Vue 2 vers Vue 3 à Bedrock en suivant ce [lien](https://tech.bedrockstreaming.com/2023/03/25/de-node-js-10-a-node-js-18-nous-avons-rattrape-8-ans-de-retard-et-de-dette-technique-et-seule-une-approche-progressive-et-incrementale-etait-viable.html) ! 🎉


> 📺 [Conférence sur Youtube](https://www.youtube.com/watch?v=93KdAJ8sSjM)

## "Let's Build A Virtual DOM"

![2023-03-31-retour-vue-amsterdam-2023](/images/posts/2023-03-31-retour-vue-amsterdam-2023/bedrock-vue-amsterdam-2023-virtual-dom.jpg)

Certaines conférences étaient aussi l’occasion de rappeler des fondamentaux. Beaucoup de développeurs sont conscients que Vue utilise un système de DOM virtuel pour générer ses pages mais peu savent vraiment ce que cela signifie.

La conférence de Marc Backes a permis de démystifier cela en développant sur scène un DOM virtuel simple à travers plusieurs cas pratiques.

Ce dernier a d’ailleurs publié le code écrit sur son Github : https://github.com/themarcba/vue-vdom.

> 📺 [Conférence sur Youtube](https://www.youtube.com/watch?v=Pf-N8WGu7iQ)

## Le guide complet du packaging des librairies

![2023-03-31-retour-vue-amsterdam-2023](/images/posts/2023-03-31-retour-vue-amsterdam-2023/bedrock-vue-amsterdam-2023-packaging.jpg)

Cette conférence était présentée par Bjorn Lu (core team member de Astro, Vite et Svelte), et expliquait comment créer un package d’une librairie et le publier “presque” sans peine.

En prenant l’exemple d’une librairie extrêmement simple, proposant une fonction d’addition, Bjorn a parcouru les étapes de la création de ce package progressivement, en prenant en compte le fonctionnement d’ESModules, l'ajout du typage, puis le support de CommonJS pour les utilisations sur des anciennes versions de node et de l’export en parallèle des version ESM et CJS.

Il présente ensuite les outils de build les plus courants ainsi que quelques outsiders, puis prend l’exemple de [Tsup](https://github.com/egoist/tsup) pour montrer une commande de build.

Une solution intéressante pour typer utilisant JSDoc et simplifiant beaucoup les étapes du build completera sa conférence, 
pour enfin terminer par une série d'outils et de “do and don’t” très pratiques dont [publint.dev](https://publint.dev/) fait parti.

> 📺 [Conférence sur Youtube](https://www.youtube.com/watch?v=bzYFCDz817I)

## Conclusion

![2023-03-31-retour-vue-amsterdam-2023](/images/posts/2023-03-31-retour-vue-amsterdam-2023/bedrock-vue-amsterdam-2023-bedrock-team.JPG)

Ce séjour à Amsterdam pour assister à cette conférence de deux jours a été enrichissant à bien des égards.
Non seulement la ville est belle et agréable à visiter, mais la découverte d'outils prometteurs répondant à nos besoins a également été un véritable apport pour notre entreprise.

## Pour en découvrir plus

- [Site VueJS Amsterdam](https://vuejs.amsterdam/)
- [Gallerie photos](https://www.facebook.com/media/set/?vanity=jsworldconf&set=a.687856240008465)
- [Replay des conférences sur Youtube](https://www.youtube.com/@JSWORLDConference/videos)
