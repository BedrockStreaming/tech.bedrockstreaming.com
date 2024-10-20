---
layout: ../../../../../layouts/post.astro
title: "Bedrock à la kubecon 2022, 1ere partie : performances applicatives et scalabilité"
description: "Une partie des équipes infra Bedrock étaient à la KubeCon 2022, voici leur retour d'expérience."
author: bedrock
tags: [kubecon, kubernetes, cloud, k8s, conference]
color: rgb(251,87,66)
thumbnail: "../../../../../../../images/posts/2022-06-13-kubecon-2022/main.jpg"
---

!["KubeCon 2022 part1"](../../../../../../../images/posts/2022-06-13-kubecon-2022/part1.jpg)

## BEDROCK à la KubeCon 2022

Après 2018 à Copenhague et 2019 à Barcelone, cette année encore, nous étions trois, [Coraline](https://twitter.com/_CoralinePetit), [Julien](https://twitter.com/julien_menan) et [Pascal](https://twitter.com/pascal_martin), présents à la KubeCon CloudNativeCon Europe 2022, à Valencia !

Plus de quatre ans après le début de notre migration vers Le Cloud (AWS + Kubernetes) racontée dans [Le Plan Copenhague](https://leanpub.com/6cloud/), nous visions à découvrir de nouvelles idées, à confirmer certains de nos choix et à apprendre des retours d’expérience de nos pairs. Après tout, avec une communauté aussi large (plus de 7000 participants et participantes cette année), il serait dommage de rester seuls avec nos idées !

## Sommaire

À trois, nous avons assisté à une grosse quarantaine de conférences. Nous avons choisi d’organiser nos notes par thèmes, en quatre articles :
* Un premier, celui-ci, centré sur les performances applicatives, sur la scalabilité des applications et la gestion des coûts.
* [Le second, consacré aux performances système, aux services mesh, aux fonctionnalités au niveau du cluster.](/2022/06/14/kubecon-2022-part-2.html)
* [Le troisième, pour regrouper ce qui est Dev XP, outillage, CI/CD, rollback, observabilité…](/2022/06/15/kubecon-2022-part-3.html)
* Et [un dernier, pour quelques sujets divers, dont le chaos engineering et la résilience, et pour conclure sur ce que nous avons retenu de cette édition de la KubeCon publication jeudi](/2022/06/16/kubecon-2022-part-4.html).

Avec une plateforme de VOD et de replay déployée en marque blanche pour des broadcasters européen majeurs, des millions d’utilisateurs actifs, des milliers de CPU consommés, des centaines d’instances allumées et des dizaines de microservices, les performances sont au cœur de nos préoccupations. 

Cet article reprend nos retours sur les nombreuses conférences consacrées à la scalabilité lors de cette KubeCon 2022. Cette fonctionnalité essentielle de Kubernetes est l’une des raisons de notre migration sur cette plateforme. En effet, notre activité nécessite que nous adaptions la taille de nos clusters en fonction du nombre d’utilisateurs connectés.
Nous avons donc assisté à la plupart des conférences consacrées à la performance et à l’adaptation de celle-ci en fonction de nos besoins.

### Le scaling vertical
La conférence "How Lombard Odier Deployed VPA to Increase Resource Usage Efficiency" ([vidéo](https://www.youtube.com/watch?v=eAAio3KFm6w)) nous présentait comment fonctionnent les `requests` et `limits`.
Un sujet qui demande du temps pour être efficace afin de ne pas être en *oversizing* ou au contraire en *undersizing*.

Mais surtout, le conférencier nous a présenté son implémentation d’un composant Kubernetes assez rarement utilisé : Le VerticalPodAutoscaler. Le VPA à fait récemment l'objet de discussions au sein de nos équipes et cette présentation a confirmé notre ressenti : cette ressource est intéressante pour des cas d'usages spécifiques, notamment sur des "workloads" assez consommateurs en RAM et/ou en CPU et ne pouvant pas être découpés en multiples pods via un HorizontalPodAutoscaler. 

le VPA souffre toujours d'une limitation : l'ajout de RAM ou CPU à chaud n'est pas possible et nécessite la re-création du pod.

!["KubeCon 2022 day1"](../../../../../../../images/posts/2022-06-13-kubecon-2022/vpa.jpg)

### Améliorer la scalabilité
Une autre conférence, donnée cette fois-ci par Intel, présentait un projet récent : [Telemetry Aware Scheduler](https://github.com/intel/platform-aware-scheduling/tree/master/telemetry-aware-scheduling) ([vidéo](https://www.youtube.com/watch?v=csg7ZQXQ5u8)). Cet outil permet d'améliorer les choix du scheduler de Kubernetes en s'appuyant sur des métriques "customs". Le projet est récent et en ALPHA, mais à surveiller dans l'avenir.


Lors d’une autre conférence intitulée “How Adobe is optimizing resource usage in K8s” ([vidéo](https://www.youtube.com/watch?v=iVD5YI1-U_M)), Carlos Sanchez a présenté un outil interne permettant d’émettre des recommandations basées sur un historique de métriques, un peu comme fait VPA, mais au niveau d’un namespace ou du cluster entier. Il est également revenu sur comment ils parviennent à éteindre automatiquement des applications non utilisées par les clients pour réaliser des économies conséquentes.

#### Mais comment configurer les requests, limits et tout ça… sans y passer des mois ?

Notre plateforme est composée de dizaines de services qui interagissent les uns avec les autres et sont soumis à un trafic qui varie au quotidien, avec des pics parfois impressionnants. Le paramétrage des requests et limits de chaque conteneur, ainsi que d’autres ressources, comme le nombre de processus php-fpm par conteneur, est un travail de fourmi, où nous devons itérer quotidiennement pendant une ou deux semaines, en travaillant application par application. Et tout ce travail est à refaire lorsque les applications ou leurs usages évoluent… un vrai casse-tête !.
Nous ne sommes pas les seuls à rencontrer ces problématiques et c’était le sujet de la conférence “Getting the optimal service efficiency that autoscaler won’t give you” ([vidéo](https://www.youtube.com/watch?v=Z-G6yMavQrU)), où une approche basée sur de l’IA (ou, plutôt, sur du brute-force) était présentée.

Voici les grandes lignes de la méthodologie présentée : 
 * définition d’un scénario de load-test (ce qui reste difficile, il faut qu’il soit représentatif de la réalité)
 * Définition d’objectifs (les temps de réponses attendus, le pourcentage d’erreurs… en fait, des SLOs que chacun devrait déjà avoir pour ses services), 
 * Lancer en boucle ces scenarios en retouchant ```request``` et ```limits``` (et configuration JVM) entre chaque itération. 

Sur un cas réel, après la 34ᵉ itération (réalisées en 19 heures), environ 49% d’économies ont été réalisées. Mais surtout, cela a représenté un jour de travail grâce à cet outillage, au lieu de deux mois à la main.

Le logiciel utilisé ne semble pas disponible en open-source, mais l’approche “automatiser les itérations” en retouchant les paramètres est très intéressante et nous saurions la reproduire. Elle nous permettrait de gagner beaucoup de temps, en supprimant beaucoup de tâches fastidieuses aujourd’hui. Reste à continuer à définir des SLOs, puis créer de nouveaux scénarios de load-testing représentatifs ! ;-) 

#### Et les coûts d’hébergement, alors ?

Nous avons aussi entendu parler plusieurs fois de coûts d’hébergement tout au long de cette KubeCon : comme l’illustrent les travaux de la FinOps Foundation, nous sommes de plus en plus nombreux à réaliser que si nous ne pensons pas à l'impact financier de nos infrastructures élastiques, où n’importe quel membre des équipes peut déployer des applications, la facture augmente vite et fort.

Le talk “Why Kubernetes can’t get around FinOps - Cost Management best practices” ([vidéo](https://www.youtube.com/watch?v=zqJ9CqaQpYw)) était une bonne introduction aux principes de gestion de coûts sur Kubernetes. Rien de nouveau pour nous, sur la théorie… même s’il nous reste encore beaucoup de progrès à réaliser pour mieux maîtriser nos frais d’hébergement !

## Conclusion
Sur ces sujets de scalabilité, les conférences auxquelles nous avons assisté confirment que bon nombre des choix que nous avons fait sont les bons, et que les problématiques qui nous font encore souffrir sont partagées par d’autres membres de la communauté.

Nous allons prochainement tenter de mettre en place VPA sur un de nos composants majeur, VictoriaMetrics, qui consomme beaucoup de ressources quelques heures par jour et pour lequel un scaling horizontal n’est pas adapté.

Nous n’en avons pas (ou peu) entendu parler pendant cette KubeCon, mais nous étudions en ce moment la solution Karpenter pour remplacer cluster-autoscaler, très utilisé dans la communauté, mais qui ne sait pas réellement tirer profit de spécificités liées à AWS.

Enfin, sur les coûts… OK, il n’y a pas que chez nous que c’est compliqué. Et c’est clairement un sujet, dans Kubernetes comme au niveau d’AWS, sur lequel nous avons encore du boulot devant nous pour un an ou deux. [Nous avons même un poste FinOps ouvert ;-)](https://www.bedrockstreaming.com/career)

!["KubeCon 2022 day1"](../../../../../../../images/posts/2022-06-13-kubecon-2022/end-part1.jpg)
