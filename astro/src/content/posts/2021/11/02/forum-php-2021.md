---
layout: ../../../../../layouts/post.astro
title: "Forum PHP 2021 - L'édition des retrouvailles"
description: "Nos retours du Forum PHP à Paris, les 21 et 22 octobre 2021"
author: bedrock
category:
tags: [afup, php, forumphp, conference]
thumbnail: "../../../../../../../images/posts/forumphp2021/header.jpg"
comments: true
language: fr
redirect_from:
  - /forum-php-2021/
---

Cette année encore, Bedrock participait au Forum PHP où était proposé une grande diversité de conférences.
Des sujets techniques et d'autres, plus génériques, étaient abordés : Symfony 6, Git, environnement, sous-représentation des femmes dans l'informatique…
Avec [Sofia LESCANO](https://twitter.com/SofLesc), [Benoit VIGUIER](https://twitter.com/b_viguier) sur les planches et une quinzaine de participantes et participants dans le publique, l'occasion de rencontrer à nouveau la communauté PHP en chair et en os a été saisie avec une certaine impatience.

Plusieurs conférences ont retenu notre attention et auront un impact à court terme sur nos projets :

Suite à la conférence "[Les exceptions : le trou dans la raquette du typage](https://www.youtube.com/watch?v=YfoLM0vWALM)" de [Baptiste LANGLADE](https://twitter.com/Baptouuuu), la bonne gestion des exceptions nous semble primordiale. Nos équipes sont donc en train de tester le bundle [Innmind/Immutable](https://github.com/Innmind/Immutable) pour mettre en place le pattern Monad (Maybe et Either) afin d'améliorer la gestion d'absence de données à différents niveaux de nos outils.

La conférence "[Des tests unitaires pour nos règles de conception](https://www.youtube.com/watch?v=PB3NWOwBCyQ
)" de [Frédéric BOUCHERY](https://twitter.com/FredBouchery) mettait en lumière l'importance de documenter, expliciter et tester les règles de conception d'un projet. La mise en place d'ADR (Architectural Decision Records) et des tests unitaires associés est une bonne pratique que nous souhaitons développer au sein des équipes. Nous attendons avec impatience le bundle que Klaxoon devrait bientôt open-sourcer: il permettra de tester facilement nos règles de conceptions avec PHPUnit et d'automatiser une partie de la revue technique.

[Anne-Laure DE BOISSIEU](https://twitter.com/AnneLaure2B) et [Amélie DEFRANCE](https://twitter.com/amelie_defrance) ont rappelé quelques règles fondamentales d'accessibilité pour nos sites Internet pendant "[Accessibilité et SEO : et si on relevait le niveau ?](https://www.youtube.com/watch?v=vvLoYCq9uPw
)". Nous espérons désormais améliorer l'accessibilité de notre back-office. Par exemple : retravailler le contraste couleur de certains écrans ou ajouter du contenu dans nos balises HTML pour faciliter la compréhension.

Pendant leur conférence "[Kairoi, et PHP se réconcilie avec les tâches planifiées](https://www.youtube.com/watch?v=Sis1Q_ON_QY)",  [Emeric KASBARIAN](https://twitter.com/emerick42) et [Jérémy JAMES](https://twitter.com/JamesJrmy) nous ont expliqué que leurs clients ont un même besoin : _"Déclencher une action automatique à un moment précis, sans aucune limite dans le temps"_. Par exemple : _"supprimer, automatiquement, un panier d’achat au bout de 15 minutes"_.
Après de longues recherches, il n’existe rien sur le marché pour répondre à un tel besoin. Et nous, BedRock, confirmons : nous avons le même besoin et n’avons rien trouvé non plus.
Kairoi est donc né. C’est une application serveur Rust de planification de tâches, avec son propre protocole _(inspiré de celui de Redis)_ qui permet de :
* Récupérer des évènements à planifier
* Connaître l'état d'un l'évènement
* Le déclencher au moment opportun
  * soit sur un protocole AMQP
  * soit sur un shell
  

Le Forum PHP est l'occasion de parler de sujets pointus techniquement, mais aussi une occasion d'échange et de partage autour de sujets plus transversaux.
Notre domaine, l'IT, comme bien d'autres, est sensible au sujet de l'écologie. Deux axes de réflexion ont été évoqués pendant deux conférences.

En ouverture, [François ZANIOTTO](https://twitter.com/francoisz) nous a partagé avec entrain sa recherche de mesures fiables des dépenses énergétiques. Elle l'a menée à développer  [GreenFrame](https://greenframe.io/), un outil en cours de construction chez Marmelab, qui a pour but de cibler au plus près la consommation énergétique afin de tendre "[Vers la sobriété numérique](https://www.youtube.com/watch?v=bBaXxMFMGbA)".

[Hélène MAITRE-MARCHOIS](https://twitter.com/helenemaitre) a sû mettre en perspective le rôle de chaque développeuse et développeur en insistant sur le fait que la responsabilité du dérèglement climatique n'est pas forcément là où on l'attend. Avec "[Comment sauver la planète en ne faisant rien](https://www.youtube.com/watch?v=BNVwYAlE9XA)", elle entend faire prendre conscience que si, la production et consommation de contenu représentent des pôles sur lesquels en tant que tech, nous pouvons agir. Le renouvellement du parc reste une cause prépondérante dans l'impact écologique.
Le renouvellement accéléré par le foisonnement de nouvelles fonctionnalités, trop souvent inutiles, est une obsolescence programmée.
Utile, Accessible, Durable. Voilà trois notions simples qui peuvent, pourtant, nous permettre de faire la différence.

[Nicolas GREKAS](https://twitter.com/nicolasgrekas), principal engineer Symfony, nous a parlé de l'écosystème de ce framework à travers de sa conférence "[Symfony 6 : le choix de l'innovation et de la performance](https://www.youtube.com/watch?v=fLXDRQBbh3E)". Il nous a présenté le [calendrier de livraisons](https://symfony.com/releases) et de maintenance des différentes versions, avec la sortie d'une nouvelle majeure prévue tous les deux ans. Chaque majeure voit la suppression du code déprécié dans la version précédente. Par exemple, Symfony 6 est un Symfony 5.4 sans ses dépréciations. Les dernières versions avant une majeure (comme la 4.4 ou 5.4) sont assurées d'avoir un support à long terme.
Pour les prochaines versions de Symfony, l'accent est mis sur la compatibilité avec PHP8. Puisque la majorité du travail consiste à remplacer les annotations `@return` par un typage natif, Nicolas a parlé de l'outil [patch-type-declarations](https://symfony.com/doc/5.4/setup/upgrade_major.html#upgrading-to-symfony-6-add-native-return-types) qui automatise cette tâche.

Pour finir cette série de conférences, nous avons suivi l'incroyable histoire de WorkAdventure, lors de "[WorkAdventure de la genèse à aujourd'hui : Retour d'expérience sur 1 an d'univers virtuels](https://www.youtube.com/watch?v=YKNqngG-c-w)" présenté par [David NÉGRIER](https://twitter.com/david_negrier)) : le résultat d'un hackathon fait pour pallier l'ennui des confinements, qui est devenu le support d'événements majeurs l'année dernière.


![Photo de l'équipe Bedrock](../../../../../../../images/posts/forumphp2021/bedrock_team.jpg)

## Les speakers Bedrock
Lors de cette édition, deux Bedrockers ont eu l'opportunité de présenter un sujet, l'occasion pour nous de demander à [Sofia LESCANO](https://twitter.com/SofLesc) "[Faites confiance aux développeurs.euses de votre équipe : voyez plus loin que les fonctionnalités](https://www.youtube.com/watch?v=tuGpNiy6e9s)" et [Benoit VIGUIER](https://twitter.com/b_viguier) "[Fiber : la porte ouverte sur l'asynchrone](https://www.youtube.com/watch?v=KkRo7fAC28s)" comment ils ont vécu cet événement.

**_Comment vous est venue l'idée de soumettre un sujet de conférence, et comment avez-vous abordé sa préparation ?_**

**Sofia**: Cela faisait longtemps que j'avais ce sujet en tête, et l'idée de refaire des événements en présentiel m'a fait me lancer. Pour moi les tech meetings étaient une grande découverte et un rituel que j'apprécie vraiment et je voulais partager cela avec la communauté. Pour la préparation, j'ai été accompagnée par Matthieu Napoli avec le programme de mentoring de l'AFUP et par mes collègues de Bedrock.
![Photo de Sofia](../../../../../../../images/posts/forumphp2021/sofia_speaker.jpg)
**Benoit**: Le PHP asynchrone est un sujet qui m'occupe beaucoup à Bedrock, j'ai donc suivi attentivement la RFC Fiber. L'idée d'en faire un sujet de conférence est venue en me rendant compte que, même au sein de nos équipes, il n'était pas évident pour tout le monde de comprendre tout ce que cet outil pouvait changer. Et puis, refaire un événement en présentiel me manquait vraiment ! La préparation de ce format court était nouveau pour moi, heureusement j'ai pu faire quelques répétitions à Bedrock et à l'AFUP Lyon pour bien ajuster mon timing.

**_Maintenant que l'événement est derrière nous, que retenez-vous de cette expérience ?_**

**Sofia**: C'était une très belle expérience et les échanges que j'ai pu avoir suite à ma conférence ont été très intéressants. C'est très enrichissant d'échanger avec la communauté et de voir que des pratiques similaires ont lieu ailleurs et pouvoir les enrichir dans les deux sens.
![Photo de Benoit](../../../../../../../images/posts/forumphp2021/benoit_speaker.jpg)
**Benoit**: C'était un vrai plaisir de pouvoir échanger avec de vraies personnes, sans écrans interposés ! Côté speaker, l'organisation était au top et j'ai eu pleins d'échanges prometteurs sur le potentiel des Fibers. Côté conférences, j'ai vu plein de choses intéressantes, ça donne toujours matière à réfléchir, que l'on partage le point de vue exposé ou non. Merci encore à l'AFUP pour avoir mis toute cette énergie au service d'un si bel événement.


Le forum, particulièrement cette édition en présentiel, c’est retrouver toute une communauté qui partage la même passion. Encore merci aux conférencières et conférenciers, merci aux organisatrices et organisateurs… Et à l’année prochaine !