---
layout: ../../../../../layouts/post.astro
title: "Mix-IT 2015 - Jour 1"
description: "Retour des conférences vues lors du jour 1 du Mix-IT 2015"
author: m_randy
category:
tags: [mixit, conference, video]
feature-img: "../../../../../../../images/posts/mixit2015/logo-mixit.png"
thumbnail: "../../../../../../../images/posts/mixit2015/logo-mixit.png"
comments: true
---

Il est tout naturel que M6Web soit présent à une conférence qui mêle sujet technique d'avant-garde et agilité, 2 sujets qui nous sont chers, surtout lorsqu'elle se déroule à Lyon.

J'ai donc eu la chance de participer au [Mix-IT 2015](https://www.mix-it.fr/) qui se tenait les 16 et 17 avril derniers au [CPE Lyon](https://www.cpe.fr/).

Cet article est découpé en 2 parties. Dans l'article que vous êtes en train de lire, vous trouverez les retours des conférences que j'ai suivies le premier jour, mais vous pourrez également trouver le [retour des conférences suivies lors du second jour](/mixit-2015-jour-2/).

# The three ages of innovation
--- [Dan North](https://twitter.com/tastapod) - [[Slides](https://speakerdeck.com/tastapod/the-three-ages-of-innovation)]

Dan nous a partagé sa vision de l'innovation à travers l'évolution d'une technologie.

Selon lui, il existe donc 3 âges dans l'évolution : 

> Explore (Maximize discovery)

Il s'agit de la phase initiale, celle de la découverte, de l'expérimentation.
Dans cette phase, on essaye, on se trompe, on apprend.

> Stabilize (Minimize variance)

Il s'agit de la phase où on fait le tri sur tout ce qu’on a testé, initié, et qu’on essaye de catégoriser, stabiliser tout ça, voir retirer ce qui n’est pas une bonne idée.

C’est le moment où on est capable de reproduire ces créations, et donc de les apprendre (repeatability, predictability, teachability).

Dans cette phase, nous apprenons à réduire l'incertitude autour de la manière de réaliser un code.

> Commoditize (Maximize efficiency)

Cette phase est celle de l'industrialisation, celle où on essaye de réduire les coûts pour augmenter l'efficacité.

Et même si ces 3 phases sont conflictuelles, l'innovation existe dans chacune de ces 3 phases, et il faut savoir les respecter et s'impliquer dans chacune.

# Le pourquoi du pourquoi de l'agilité
--- [Cédric Bodin](https://twitter.com/cedricbodin) - [[Screencast de la même conférence, mais à Nantes](https://www.youtube.com/watch?v=HruQWrUTFIw&noredirect=1)]

Au cours de cette présentation, Cédric nous a poussé à réfléchir sur la raison profonde du succès de l'agilité.

Nous le savons, l'agilité est une solution efficace contre les plannings qui glissent, les cahiers des charges non tenables, le syndrome de la tour de cristal et autres dysfonctionnement organisationnels.

Depuis 1994, le Chaos Manifesto publie un rapport indiquant le pourcentage de projets qui échouent ou réussissent, et il y a 2 fois plus de projets qui échouent que de projets qui réussissent. Il est courant que des projets qui s'éternisent, dérapent, ... soient finalement abandonnés.

De même, il est courant que le produit fini ne corresponde pas à ce que l'utilisateur attend, à cause de la distance entre eux et les équipes qui développent le produit.

Mais pourquoi est-ce que nous avons besoin de l'agilité ? Pourquoi en sommes nous arrivés à cette situation où tout ces syndromes apparaissent ?

Tout simplement parce que nous avons construit l'Entreprise d'aujourd'hui sur la base du [Taylorisme](https://www.wikiwand.com/fr/Taylorisme) qui permet d'être le plus rentable possible en prévoyant tout les cas pour réduire le hasard et donc l'échec. Le socle de base de cette théorie est que rien ne change et que tout est prévisible.

Or, la société actuelle va plus vite, veut pouvoir être très réactive, et notre branche en particulier.

À partir de là, le modèle qui veux que certaines personnes pensent, prévoient, organisent, pour que les techniciens n'aient "que" à exécuter est dépassée. Et cela se voit ! Combien de "j'ai fait ce que le cahier des charges demandait", combien de discussions stérile autour d'un changement de périmètre pour recalculer des délais ?

Voici 2 exemples de phrases qui montrent le décalage entre la vision du Taylorisme dans l'informatique et la réalité :

> En informatique, la production, c’est la compilation. Et elle est tellement efficace qu’on ne la facture plus.

> Nos métiers de services ne sont pas des métiers de production, mais des métiers de conception.

À partir de là, il faut considérer le travail du développeur comme du côté "pensant" et pas du côté "exécutant" : ne pas essayer de maximiser sa productivité en réduisant sa réflexion. Bien s'assurer de sa compréhension du besoin au lieu de lui lister des tâches à accomplir sans réflexion.

Les principes mis en avant par l'agilité vont en ce sens : rapprocher l'utilisateur et le développeur, laisser l'équipe décider du planning, permettre l'imprévu.

Toutefois, l'agilité n'est pas un déclencheur. Une société qui passe à l'agilité sans modifier son fonctionnement va à l'échec. L'agilité n'est qu'un moyen de changer.

N'oublions pas la [loi de Conway](https://en.wikipedia.org/wiki/Conway%27s_law) :

> Tout logiciel reflète l'organisation qui l'a créé.

# Solution focus in team
--- [Vincent Daviet](https://twitter.com/vincentdaviet) et [Géry Derbier](https://twitter.com/gery7)

Cet atelier destiné plutôt aux managers donnait des pistes et des exemples pour réussir à relancer de la synergie dans des équipes qui ont tendance à se bloquer lors de la mise en place de l'agilité.

Le principal ressort de l'agilité est la communication. Si cette communication est brisée, tout est en péril, et c'est souvent la principale cause d'échec de son adoption.

Nous avons réalisé des mises en condition pour voir comment la communication peut être un véritable frein ou un formidable moteur pour avancer. En posant une même question de plusieurs manières, nous avons constaté qu'il est tout aussi possible de bloquer un échange qui était intéressant, que d'aller voir plus loin que les explications qui nous étaient proposées.


# Si le TDD est mort, alors pratiquons une autopsie
--- [Thomas Pierrain](https://twitter.com/tpierrain) et [Bruno Boucard](https://brunoboucard.com/) - [[Slides](https://fr.slideshare.net/brunoboucard/si-le-tdd-est-mort-alors-mix-it)]

Derrière ce titre un peu provocateur, Thomas et Bruno voulaient faire une analyse à date du [TDD](https://www.wikiwand.com/fr/Test_driven_development), pour voir comment il est utilisé, et pourquoi il a tendance à être délaissé.

Comme il est un peu facile de dire que les développeurs peuvent avoir du mal à changer leurs habitudes, nous sommes allés voir un peu plus loin :

Le développeur qui est habitué à écrire du code, voir s'il marche, l'éditer, voir s'il marche, ... fonctionne selon un principe d'expérimentation. Il ne sait pas très bien où il va, il essaye du code jusqu'à ce qu'il fonctionne. Et une fois qu'il maitrise le code, il va continuer à travailler de la même manière, même si le code fonctionne beaucoup plus rapidement qu'avant.

Mais cette manière de travailler reste fortement exposée à 2 limitations :
* perte de vue de l'objectif réel;
* sur-architecture.

Avec le TDD, le fonctionnement est de décrire ce qu'on veut faire d'abord (se fixer un objectif) en l'éclaircissant au maximum, au plus tôt.

Pour être efficace en TDD, il faut commencer par creuser son sujet et s'assurer de comprendre ce qu'on veut, comment, avec quelles limites ([les 5 pourquois](https://www.wikiwand.com/fr/Cinq_pourquoi)). Ensuite, il faut le formuler, de préférence à haute voix pour bien s'assurer de comprendre ce qu'on est en train de dire ([méthode du canard en plastique](https://www.wikiwand.com/fr/M%C3%A9thode_du_canard_en_plastique)), puis finalement lister une série de phrases en "mon code devrait" indiquant le fonctionnement nominal et les cas limites.

Une fois que tout ça est respecté, il est possible de démarrer le TDD proprement dit, à savoir d'écrire les tests, de le voir échouer, puis de réaliser le code qui permet à ces tests de fonctionner. Ainsi, il est possible de dégager son esprit du fonctionnel pour se concentrer sur le technique, jusqu'à voir le code réussir à atteindre le but fixé.


Rappel : cet article est découpé en 2 parties. N'oubliez pas de consulter le [retour des conférences suivies lors du second jour](/mixit-2015-jour-2/).
