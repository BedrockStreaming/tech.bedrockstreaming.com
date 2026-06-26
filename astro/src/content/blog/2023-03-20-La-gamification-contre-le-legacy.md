---
title: La gamification contre le legacy
description: >-
  Retour d'expérience des équipes Infra de Bedrock sur la mise en place de
  journées dédiées au traitement des sujets legacy
tags:
  - infra
  - legacy
  - retour d'expérience
color: 'rgb(251,87,66)'
excerpt: >-
  Elles sont là, tapies dans l’ombre de la colonne “To do” de vos backlogs,
  attendant que leur heure vienne. À chaque backlog refinement, vous vous
  demandez s’il ne faut pas tout simplement les annuler, puisque personne ne les
  prend en charge… De quoi parle-t-on ? De ces user stories qui existent dans le
  backlog…
thumbnail: /images/posts/2023-03-16-la-gamification-contre-le-legacy/Article-Target.png
author:
  - e_perrin
  - a_ferez
date: '2023-03-20'
---

## Ce que vous ne voulez pas voir dans vos backlogs…

Elles sont là, tapies dans l’ombre de la colonne “To do” de vos backlogs, attendant que leur heure vienne. À chaque [backlog refinement](https://blog.myagilepartner.fr/index.php/2017/01/17/la-product-backlog-refinement/), vous vous demandez s’il ne faut pas tout simplement les annuler, puisque personne ne les prend en charge… De quoi parle-t-on ? De ces user stories qui existent dans le backlog de chaque équipe technique, pour traiter “un jour” un sujet legacy. Ces petits aides-mémoire de sujets “à ne pas oublier” qui nous poursuivent mais ne sont que peu souvent traités, faute de priorisation.

<center><img alt="Un exemple de backlog legacy" src="/images/posts/2023-03-16-la-gamification-contre-le-legacy/Article-Target.png"></center>
<center>Un exemple de backlog legacy</center>
<br>

Clean de code mort, montées de versions de layers Terraform, projets de refactoring jamais débutés… autant de sujets pénibles à traiter qui nécessitent du temps… et de la résilience. Parce que bien souvent, débuter l’un de ces sujets revient à s’attaquer à toutes les dépendances liées, à gérer tous les impacts. Et parce qu’il s’agit aussi de tâches redondantes, non-automatisables, n’apportant quasiment aucune valeur business immédiatement mesurable.. Du “run”, pur et simple. Dans le Slack de Bedrock, il y a un emoji tout trouvé pour ce type de tâche : <img alt="Gif exprimant la souffrance" src="/images/posts/2023-03-16-la-gamification-contre-le-legacy/souffrir.gif" height="30" width="30" style="padding: 0">

Bien sûr, on parvient parfois à dégager du temps pour s’atteler à ces user stories. Mais il faut souvent plus d’un sprint pour en venir à bout, et l’équipe en charge de leur réalisation peut rapidement se décourager devant l’ampleur et le caractère répétitif de la tâche.

Nos équipes Ops et DevOps sont responsables de 23 repositories Terraform. Lorsqu’il a été nécessaire d’upgrader tous nos layers en version 1.x, nous nous sommes d’abord donné pour consigne que chaque personne qui tombait sur un layer obsolète devait le mettre à jour avant de poursuivre son travail. Oui mais voilà, mettre à jour un layer ça ne se fait pas en deux minutes, et bien souvent on refuse d’abandonner ce sur quoi on travaillait jusqu’alors pour mettre à jour sa version de Terraform. La consigne a alors évolué : pour chaque layer à mettre à jour, on créé une US en colonne “to do”… Vous voyez où l’on veut en venir ? 😏

Pour tenter de venir à bout de ces sujets legacy que l’on traîne comme des boulets, nous avons mis en place depuis octobre 2022 les “Jeudis du fun”, dont l’organisation est prise en charge par la facilitatrice agile et la Project Manager Officer (PMO) du service Infrastructure (autrices de cet article).

<center><img alt="Logo de la 1ère édition du “jeudi du fun”" src="/images/posts/2023-03-16-la-gamification-contre-le-legacy/Article-logo.png"></center>
<center>Logo de la 1ère édition du “jeudi du fun”</center>
<br>

## Éradiquer en gamifiant, challengeant, s’entraidant. 

L’idée est simple : faire travailler ensemble, sur une journée, les cinq équipes de la verticale (trois équipes de SysAdmins et deux équipes DevOps) pour faire avancer un sujet legacy. Au cours de cette journée, les profils et les membres d’équipe seront mixés, afin de ne pas travailler avec les mêmes collègues qu’au quotidien. Leads, principal engineer, seniors et juniors : tout le monde participe à la corvée !

Il est difficile de convoquer 25 personnes sur une journée en leur disant que la journée est banalisée pour traiter des tâches pénibles. Elles viendraient à reculons. Deux axes ont été choisis pour faire de ces journées des journées “particulières” :

* **Gamifier** certains moments clés de la journée : la découverte du sujet, la composition des équipes, la remise en jambe du début d’après-midi…
* **Challenger** les participants pour ne pas simplement leur demander de traiter du legacy, mais bien d’être la _meilleure_ équipe pour traiter du legacy. Celle qui ira le plus loin, qui en fera le plus.
* (Un troisième axe, plus convivial, est choisi pour la fin de journée : partager un verre tous ensemble.)

<center><img alt="Le jeu de découverte du sujet de la 3ème édition : Ansible" src="/images/posts/2023-03-16-la-gamification-contre-le-legacy/Article-jeu.png"></center>
<center>Le jeu de découverte du sujet de la 3ème édition : Ansible</center>
<br>

Lors de la 1ère édition, en octobre 2022, nous avons proposé aux équipes un grand thème : le repository “SysAdmin/Terraform”, centre névralgique du travail de l’Infra. Il y a beaucoup à faire : les fameux upgrades de layers, du refactoring de code pour industrialiser nos process, des PRs ouvertes et restées en suspens depuis de nombreux mois… chacun peut y trouver son compte. Chacune des six équipes composées ce jour-là disposait de dix minutes pour définir à quel chantier elle s’attaquerait durant la journée. A l’issue de ces dix minutes, le représentant de l’équipe devait présenter aux autres le sujet choisi et l’indicateur qui permettrait de juger si le travail a été accompli ou non, en fin de journée. L’équipe ayant proposé le sujet le plus ambitieux s’est vue attribuer des points bonus, rentrant en compte pour le calcul du score final.

Pour la seconde édition le mois suivant, le sujet était imposé : toutes les équipes avaient pour objectif de mieux sécuriser les secrets contenus dans le code Bedrock. L’équipe qui en traiterait le plus grand nombre l’emporterait.

Lors de la dernière édition, en février dernier, la compétition reposait également sur le nombre de points gagnés par chaque équipe en fin de journée. Nous avons attribué un nombre de points à chaque tâche pouvant être traitée dans la journée, en fonction de sa complexité et/ou de sa priorité. Chaque équipe pouvait s’organiser librement : choisir plusieurs petites tâches ou deux plus importantes…

Bien sûr, pour que la compétition soit totale, chaque édition du jeudi du fun se termine par une remise de prix : distribution de goodies, de cartes “bonus” ou “malus” valables dans nos “vrais” sprints, de gourmandises… il faut que la récompense soit réelle pour que les participants se prennent au jeu.

<center><img alt="Exemple de lot pouvant être remporté lors du “Jeudi du fun”" src="/images/posts/2023-03-16-la-gamification-contre-le-legacy/Article-carte.png"></center>
<center>Exemple de lot pouvant être remporté lors du “Jeudi du fun”</center>
<br>

Le risque avec la compétition, c’est de se laisser déborder : gagner coûte que coûte, ajouter des points à son compteur en faisant du “quick & dirty”. Jusqu’à présent, la compétition dans la verticale Infra est restée bon enfant : les équipes se défient entre elles tout au long de la journée, des points “bonus” sont réclamés aux organisatrices au moindre prétexte… mais personne ne perd de vue l’objectif principal : venir à bout du sujet.

Les Jeudis du Fun reposent donc sur le challenge et le jeu. Mais nous avions sous-estimé un autre axe nous permettant de faire de ces journées un succès : l’entraide. A chaque édition, les retours les plus enthousiastes portent sur le fait de passer une journée à travailler en cross-team. SysAdmins et DevOps apprennent les uns des autres, les juniors ont l’occasion de former des leads… et chacun élargit son spectre de compétences. Au-delà du fait de venir à bout de sujets legacy, l’émulation engendrée par ces journées justifie à elle-seule leur organisation.

Et puis, quitte à faire des jeudis du fun des journées particulières, autant y aller franchement : certains membres de nos équipes n’hésitent pas à venir déguisés pour ajouter une dose de fun. Vous avez croisé une licorne, Pikachu ou un plombier dans l’open space de Bedrock ? Aucun doute, c’était un jeudi ! Un dress code a même été défini lors de l’édition de février 2023.

## Itérer, et corriger nos erreurs à chaque édition

Trois éditions du “jeudi du fun” ont été organisées jusqu’à présent. À la fin de chaque édition, les organisatrices recueillent le feed-back des participantes et participants, afin de corriger ce qui doit l’être et de capitaliser sur ce qui a marché. Voici le premier bilan que nous pouvons en tirer.


### _De l’importance du choix du sujet_

Le succès de la journée repose sur le choix du sujet. En choisissant un sujet fédérateur, comme lors de notre première édition, et en laissant le soin à chaque équipe de définir quel chantier elle souhaitait mener, nous partions gagnantes. Le repo Sysadmin/Terraform sur lequel nous avons travaillé lors de cette journée est un point de douleur pour l’ensemble de nos équipes : chacun des participants a compris l’intérêt de jouer le jeu et de retrousser ses manches. Les équipes ont même eu du mal à clôturer la journée, car elles voulaient finir ce qu’elles avaient commencé.

<center><img alt="Au cours de la 1ère journée du “Jeudi du fun”" src="/images/posts/2023-03-16-la-gamification-contre-le-legacy/Article-slack.png"></center>
<center>Au cours de la 1ère journée du “Jeudi du fun”</center>
<br>

Lors de la seconde édition en revanche, le sujet de cette édition a mis la journée en péril. Nous avions demandé aux équipes d’ajouter un niveau de sécurité à l’ensemble des secrets contenus dans la codebase de Bedrock. Cela a suscité quelques difficultés :
* Tout d’abord, il s’agissait de trouver une méthode pour identifier tous les secrets concernés. Toutes les équipes du jeudi du fun ont alors planché sur ce sujet, en utilisant des méthodes et outils différents. Au final, nous ne sommes parvenus que tardivement (2h après le lancement de la journée) à nous mettre d’accord sur une méthodologie. Autant de temps perdu que nous aurions pu consacrer au cœur du sujet, la sécurisation des secrets.
* En nous attaquant à l’ensemble des secrets de Bedrock, nous touchions forcément à des repositories projets dont nous ne sommes pas les _code owners._ Ce n’est pas une véritable difficulté en soi, puisqu’au quotidien, nous intervenons fréquemment dans ces repos projets pour accompagner les équipes devs. En revanche, l’ajout d’un niveau de sécurité supplémentaire sur des secrets implique de pouvoir tester, puis de merger nos modifications. Impossible de réaliser ces actions sans les équipes back et front responsables des projets, ou sans impacter leur travail. Notre périmètre d’intervention lors de cette journée à été considérablement limité.

La complexité du sujet et le constat de notre incapacité à avancer lors de cette journée ont rapidement conduit à un découragement des troupes. Nous sommes tout de même ressortis de cette édition avec des points positifs : 
* Une meilleure visibilité sur le périmètre de sécurisation à couvrir, en définissant le nombre de secrets concernés,
* Un workflow visant à détecter à l’avenir tout nouveau secret concerné
* … et la nécessité de mieux définir les guidelines pour le choix du sujet !

#### Entendu pendant la 2nde édition du jeudi du fun 😅

> 👧🏻 : "Alors, qu’est-ce que tu fais de beau ?"
>
> 👦 : "Je souffre"

Ces guidelines nous ont aidé à définir le choix de la thématique de la 3ème édition du jeudi du fun. Le sujet devait répondre à ces critères :
* Être réalisable en une journée,
* Permettre de terminer / accélérer un projet ou d’éradiquer du legacy,
* Être dans le périmètre dont l’infra est le code owner,
* Et être “morcelable” en sous-périmètres, un pour chaque équipe.
* Enfin, l’avancée du sujet doit être mesurable.

Pour l’édition de février 2023, nous avons donc “joué” avec la migration Ansible en cours de réalisation dans l’une de nos équipes de SysAdmins. 45 rôles Ansible restaient à migrer vers notre nouveau template Ansible, utilisé pour déployer nos machines on-prem : il y a du travail pour tout le monde, c’est parti !


### Et finalement, est-ce que ça marche ?

Après trois éditions, il nous semble nécessaire de prendre un peu de recul pour analyser si ces journées portent leur fruit. Les équipes sont ravies de travailler ensemble, certes, mais l’objectif principal est-il rempli ? Les jeudis du fun permettent-ils de venir à bout de sujets legacy ?

La première édition a fortement contribué à éradiquer du legacy : nous avons mis à jour la quasi-totalité des layers Terraform, nous avons mergé ou fermé l’entièreté des PRs, et nous avons initié des travaux de rework. Cependant, nous n’avions pas défini d’indicateurs de réussite assez fiables lors de cette première itération pour quantifier réellement le travail accompli. Si toute la Verticale partage le sentiment d’avoir avancé lors de cette journée, nous ne savons pas le mesurer finement.

<center><img alt="Capture d’écran du repo sysadmin/terraform au cours de la 1ère édition du “Jeudi du fun”" src="/images/posts/2023-03-16-la-gamification-contre-le-legacy/Article-git.png"></center>
<center>Capture d’écran du repo sysadmin/terraform au cours de la 1ère édition du “Jeudi du fun”</center>
<br>

Pour pallier cette difficulté, nous avions défini un indicateur de suivi très simple pour la seconde édition du jeudi du fun : nombre de secrets à traiter / nombre de secrets traités. Ainsi, nous savons que, lors de cette (difficile) journée, nous avons traité environ un quart du périmètre.

Au lancement de la 3ème édition du jeudi du fun, nous avions 45 rôles à migrer vers notre nouveau template Ansible. À l’issue de cette journée, l’équipe responsable du sujet n’en avait plus que 10 à traiter. La mutualisation de nos forces a porté ses fruits !

Insuffisants lors de la première édition, les indicateurs de suivi mis en place dans les éditions suivantes sont cruciaux pour évaluer le ROI de ces journées de travail “particulières”.

## Les coulisses du jeudi du fun

Les jeudis du fun sont organisés par deux personnes au sein de la verticale infra. Si les séances de préparation de cette journée (qui débutent environ 3 semaines avant la tenue de l’événement) sont source de beaucoup de rires, il n’empêche qu’elles doivent également répondre à certaines problématiques.

### _S’adapter aux habitudes de travail de chacun_

En premier lieu, nous devons organiser une journée à laquelle tous les membres de nos équipes puissent prendre part, qu’ils soient au bureau ou en télétravail. Tous les moments de la journée doivent tenir compte de cet élément, qu’il s'agisse des phases de travail en petits groupes, des sessions en plénière (25 personnes) comme le lancement de la journée, la remise des prix ou les différents jeux qui ponctuent ces jeudis.

Les phases de travail en équipe sont les plus simples à gérer : nos équipes ont déjà l’habitude au quotidien de travailler avec des collègues à distance. Tout le monde se connecte sur une room de visioconférence, et le tour est joué.

<center><img alt="Team mixte présentiel / distanciel lors du 1er “jeudi du fun”" src="/images/posts/2023-03-16-la-gamification-contre-le-legacy/Article-team-hybride.png"></center>
<center>Team mixte présentiel / distanciel lors du 1er “jeudi du fun”</center>
<br>

Les moments en plénière sont en revanche plus délicats à gérer, car le brouhaha d’une vingtaine de personnes rassemblées dans une même pièce reste difficilement audible pour les personnes à distance. Un prochain challenge pourrait être d’organiser un jeudi du fun 100% distanciel.

Il est également nécessaire de tenir compte de la façon de travailler de chacun : si certaines personnes sont capables de travailler en faisant fi du bruit d’un open space, d’autres ont besoin de plus de calme. À chaque édition, nous tentons d’organiser le jeudi du fun sous différentes formes, pour tenir compte des besoins de chacun, mais nous n’avons pas encore trouvé la solution idéale.

Lors de la première édition, nous étions tous rassemblés dans le même open space, sans dispositif particulier pour les personnes ayant besoin d’un environnement silencieux, et cette journée leur a été difficile à supporter. De nombreuses autres équipes de Bedrock avec qui nous partageons d’habitude cet open space étaient en déplacement ce jour-là, ce qui a néanmoins permis de limiter nos nuisances sonores à notre seule verticale.

Pour la seconde édition, nous avions réservé un open space dans les locaux de Bedrock pour ne pas prendre le risque de déranger les autres équipes : l’ambiance y a été d’autant plus conviviale mais n’a apporté aucun mieux aux personnes ayant besoin de tranquillité pour travailler.

Lors de notre dernière édition, nous avons tenté une approche hybride : la plupart des équipes étaient rassemblées dans un même open space, et pour les personnes ayant besoin de s’isoler, une salle de réunion avait été réservée pour l’occasion. Il semble que cette organisation a apporté un mieux pour les personnes souffrant du bruit avec un écueil cependant : elles étaient isolées des autres équipes tout au long de la journée, et le jeudi du fun repose (aussi) sur l’émulation collective…

### _Les autres limites de l’organisation_

Au fil des éditions, nous avons rencontré, en tant qu'organisatrices, deux autres limites.

La première touche au choix du sujet. Si la définition de la thématique de la première journée a été évidente car le repository sysadmin/terraform est source de complaintes quotidiennes, très vite, nous avons eu besoin d’aide pour définir les sujets des éditions suivantes.  \
En effet, il est difficile pour nous d’appréhender un sujet dans sa globalité : y aura-t’il du travail pour chaque équipe ? Le sujet est-il accessible pour tous nos profils, sans montée en compétence préalable ? Quelles sont concrètement les actions à conduire pour venir à bout d’un sujet ? Pour pallier à ce problème, nous avons réalisé un tour de passe-passe : l’équipe qui remporte le jeudi du fun gagne le droit de définir avec nous le sujet de l’édition suivante. Et ça fonctionne ! Les gagnants participent avec plaisir au choix du prochain sujet ~~de torture~~ de fun !

La seconde limite concerne la récurrence de l’événement. Initialement, nous avions prévu d’organiser un jeudi du fun par mois, pour venir à bout rapidement de nos sujets legacy. Après les deux premières éditions (organisées en octobre et novembre 2022), nous nous sommes aperçues que nous perdrions le fun de cette journée si elle revenait trop fréquemment. Pour que cet événement reste une journée de travail particulière à laquelle les personnes participent avec plaisir, nous avons fait le choix d’opter pour un format trimestriel.

## Next steps et prochains défis

D’autres améliorations restent à apporter, notamment autour de la gestion du reste à faire. Comment finir correctement les travaux initiés dans cette journée, afin de ne pas créer de nouvelles user stories legacy ? Ce point est tout aussi important que celui sur le travail accompli au cours de ces journées. Entamer un rework et le laisser en chantier génère au moins autant de frustration que le manque de temps pour traiter du legacy.

Néanmoins, après trois éditions du jeudi du fun, il nous semblait important de partager notre expérience, ne serait-ce que pour convaincre des équipes de devs de Bedrock de venir jouer avec nous lors d’une prochaine édition !

<center><img alt="Les participants du Jeudi du fun" src="/images/posts/2023-03-16-la-gamification-contre-le-legacy/Article-team.png"></center>
<center>Les participants du Jeudi du fun</center>
<br>

<hr>
Pour vous donner un aperçu de comment se déroulent ces fameux jeudis, voici _grosso modo_ le programme d’une journée : 

- ⏰ 9h00 Petit déjeuner convivial (car c’est très important de commencer une telle journée en prenant des forces)

- ⏰ 9h30 **Début officiel de la journée** : on se retrouve en plénière, dans une grande salle de réunion, avec tous les participants et on (ré)explique le contexte de la journée ainsi que le programme. 
On commence avec un petit jeu (5 minutes maximum) qui sert à deviner le sujet du jour. Les sujets sont toujours gardés secrets jusqu’au lancement de la journée, ce qui donne lieu à toutes sortes d’hypothèses les jours qui précèdent (“Oui, oui, bien sûr on va recoder toute notre plateforme dans un autre langage jeudi”).On fait monter la pression !  \
L’objectif de ce premier jeu est d’énergiser un maximum nos collègues et de leur permettre de commencer à se projeter sur ce qu’ils vont pouvoir y faire. Le jeu change à chaque fois, pour garder un effet de surprise. 
Ensuite, vient le temps de révéler la constitution des équipes qui changent elles aussi à chaque édition afin de permettre à chaque personne de côtoyer de nouveaux collègues.

- ⏰ 10h00 Les équipes partent travailler sur le sujet du jour, à leurs postes de travail

- ⏰ 12h30 - 13h30 Déjeuner 

<br>

- ⏰ 13h30 Jeu de reprise (facultatif) : on se retrouve autour d’un blind test ou un gartic phone, histoire de passer un bon moment et de se remettre en jambe pour l’après-midi. C’est un court moment de _team building_ qui est très apprécié la plupart du temps (sauf lorsque les équipes ne veulent pas perdre un minute pour venir à bout de leur objectif !)

- ⏰ 14h00 Les équipes reprennent le travail initié le matin et essayent de finir un maximum de choses

- ⏰ 17h30 On se retrouve en plénière pour le débrief de la journée : on fait le point sur le travail accompli, le décompte des points gagnés par chaque équipe et on fait le fameux podium ainsi que la remise des prix. 
On récupère à chaud les premiers retours des participants.

- ⏰ 18h00 Le verre de l’amitié
