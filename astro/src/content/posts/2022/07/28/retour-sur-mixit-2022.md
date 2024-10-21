---
layout: ../../../../../layouts/post.astro
title: Retour sur la conférence MiXiT 2022
description: Plusieurs Bedrockiens étaient présents à MiXiT 2022, voici un résumé de leurs conférences préférées.
author: [s_haim,e_perrin,j_mastounga,s_zoccarato]
tags: [conference, agile]
color: rgb(251,87,66)
thumbnail: "./mixit-crepes.jpg"
---
!["MiXiT, la conférence avec des crêpes et du cœur"](./mixit-crepes.jpg)

[MiXiT](https://mixitconf.org/) est une conférence "avec des crêpes et du cœur" qui se déroule à Lyon. Les sujets sont assez variés abordant autant l'agilité, que la programmation, le droit ou encore l'histoire de l'informatique.

Voici un résumé des conférences de l'édition 2022 qui nous ont le plus marquées.


## How to build the alert system that France deserves?

Gaël Musquet nous a d’abord expliqué le rôle de Gustave Ferrié, qu’il considère comme le premier hacker, qui a installé des mâts de télégraphe sans fil en 1902, entre les émetteurs en Martinique, pour remplacer le câble télégraphique, détruit lors de la catastrophe de la montagne Pelée du 8 mai 1902. Cet homme avait saisi l’intérêt d’avoir un système de communication fiable.

Gaël Musquet nous explique ce qu’on est en droit d’attendre en 2022 d’un pays moderne, concernant les alertes sur les risques majeurs, qui varient selon notre emplacement (du tsunami à la rupture de barrage artificiel).

Il nous incite à lire le DICRIM de notre ville ([celui de Lyon](https://www.lyon.fr/sites/lyonfr/files/content/documents/2021-02/risque-majeurs-DICRIM-ALEX-25-01-2021.pdf)) ainsi qu’à nous procurer un poste de radio à piles, car dans l’éventualité d’un moment catastrophique sans Internet et sans satellites, comment ferons-nous pour nous tenir au courant de ce qu'il faut faire pour rester en vie ?

[Page du talk sur le site de MiXiT et voir le replay](https://mixitconf.org/2022/how-to-build-the-alert-system-that-france-deserves-)

## Meet NULL the UNKNOWN

Dans cette conférence, Laëtiia Avrot entame un rappel de la norme SQL, que PostgresQL implémente au plus près, sur la valeur de NULL en SQL. Et la valeur UNKNOWN est également abordée. Notamment la complexité induite par le fait qu’un champ de type Boolean peut se retrouver avec comme valeurs possibles : True, False, UNKNOWN et NULL. Cela donne un système à quadruple valeur. Pour un champ typé.

NULL est plus facile à définir par ce qu’il n’est pas qu’en expliquant ce qu’il est.
Une option intéressante pour mettre en évidence la valeur NULL dans PostgresQL est d’en définir nous-même une valeur affichée.

Ensuite, Laëtitia nous propose un Quizz. Sur une base de données qu’on connaît, chaque fois la même question est posée sur “Combien de lignes vont être retournées par la requête SQL ?”

C’est intéressant, car chaque question comporte un degré de complexité élevé impliquant l’usage de la valeur NULL, tout en suivant la logique de la norme SQL. Cerise sur le gâteau, Laëtitia propose en “Réponse D”, le nom d’une scientifique célèbre et nous en donne une courte biographie à chaque question.

***Liens***

* [Blog de l’oratrice, Laëtitia Avrot](https://mydbanotebook.org/)
* [Page du talk sur le site de MiXiT et voir le replay](https://mixitconf.org/2022/meet-null-the-unknown)

## Parlez de vous, faites des feedbacks

Le feedback est un outil communicationnel qui permet de formuler un avis sur une situation passée dans le but de gérer les situations futures.

On peut trouver plusieurs formes de feedbacks :
le feedback est à destination de la personne, pour l’aider à s’améliorer. Elle peut décider de le suivre ou non,
la demande que l’on fait à quelqu’un est à notre bénéfice (on demande à la personne de changer un comportement qui nous gêne) en laissant la possibilité à la personne de décider si elle veut ou non répondre favorablement à cette demande,
l’exigence qui est aussi à notre bénéfice, mais pour laquelle on ne laisse pas le choix (dans le cadre d’une relation hiérarchique)

Julie Quillié propose un modèle de feedbacks basé sur la CNV (Communication Non Violente) et qui peut se résumer de la manière suivante.

### Feedback basé sur la CNV (Communication Non Violente)

1. On vérifie la disponibilité de la personne en lui demandant si elle est d’accord pour qu’on lui fasse des feedbacks et sous quelle forme.
2. On formule le feedback :
  Décrire une Observation, les faits (= pas de jugement)
  Exprimer le Sentiment que cette situation a engendré
  Expliquer le Besoin qui est la source du sentiment ressenti
  et finir par faire une Demande (= réalisable, formulée positivement, précise)

  **Un exemple :**
  Nous avions rendez-vous à 12h et il est 12h30 = observation, factuel.
  Je suis très fâché car je m’étais organisé pour être à l’heure = le sentiment
  C’est important pour moi de ne pas perdre de temps et de pouvoir rester libre dans mon organisation = le besoin
  La prochaine fois que tu sais que tu seras en retard, peux-tu stp m’appeler dès que possible pour me le signaler ? De cette manière, je peux me réorganiser facilement. = la demande

3. On vérifie ce qui a été reçu par la personne. On lui propose de nous reformuler ce qu’elle en a retenu. Cela permet de vérifier que le message que l’on voulait faire passer a bien été entendu.

### 2ème possibilité pour faire un feedback : le feedback en 4 temps

1. On demande à la personne ce qu’elle a aimé dans ce qu’elle vient de faire
2. On lui demande ensuite ce qu’elle aurait aimé faire différemment

    On lui demande si elle veut qu’on lui donne notre feedback

3. _“Moi, j'ai aimé …, parce que … ”_ : on parle de ce que ça nous a apporté (clarté, motivation, inspiration, soutien, etc.)
4. _“Et j’aurais aimé …  de différent, parce que … ”_ on parle de ce que ça nous apporterait (clarté, motivation, inspiration, soutien, etc.)

Et en bonus : “Peux-tu me dire comment tu reçois ce que je te dis ?”

[Page du talk sur le site de MiXiT et voir le replay](https://mixitconf.org/2022/parlez-de-vous-faites-des-feedbacks-)

## Arrêtez l’auto-sabotage et sortez de la boucle (systémique)

Dans cet atelier, Albane Veyron nous explique que nous avons tous des croyances sur nous-mêmes et sur les autres. Les croyances sont des pensées qui sont des vérités, pour nous. Elles ont plusieurs origines : l’enfance, notre cercle social et notre expérience de vie.

Les croyances peuvent être aidantes ou limitantes.

L’atelier commence par une première phase qui consiste à reconnaître une de ses croyances limitantes :
* les généralisations : personne, tout le monde, toujours, tout le temps, jamais, trop, je dois, il faut, pas assez
* les barrières infinies aka les bonnes excuses pour ne pas passer à l’action : j’aimerais, mais … / je pourrais, mais …
* les sensations de déjà vu : les blocages et les situations récurrentes

Une fois qu’on a repéré une de ses croyances limitantes, on l’écrit sur une feuille et on va ensuite décomposer cette croyance et réfléchir à :
* son origine : d’où nous vient cette croyance ? depuis combien de temps fait-elle partie de nous ? nous vient-elle de notre éducation ?
* les bénéfices : quels bénéfices nous apporte cette croyance ? qu’est-ce qu’elle nous permet ?
* les inconvénients / les freins : en quoi cette croyance nous gêne et quels sont les impacts sur notre vie (pro ou perso) ?
* les contradictions : a-t-on déjà fait quelque chose ou été dans une situation qui vient contredire cette croyance ?

On va ensuite venir agrémenter notre croyance avec tous ces éléments puis, pour finir, transformer notre croyance limitante en une croyance aidante.

[Page du talk sur le site de MiXiT et voir le replay](https://mixitconf.org/2022/-arretez-l-auto-sabotage-et-sortez-de-votre-boucle-systemique-)

## Comment fonctionne un gestionnaire de mots de passe

Les mots de passe sont partout. Ils nous permettent d'accéder à nos photos, nos comptes bancaires, nos documents de santé et bien d'autres données sensibles que l'on ne souhaite pas voir aux mains d'individus que l’on ne connaît pas.
Tout le monde sait que l'on doit avoir des longs mots de passe mais comment tous les retenir ? C'est là que les gestionnaires de mot de passe entrent en jeu. Mais peut-on leur faire confiance ? Comment ça marche au juste ? C'est à cette question qu'a souhaité répondre Eric Daspet pendant sa conférence.

Le rôle d'un gestionnaire de mots de passe est de permettre à son utilisateur d'utiliser qu'un seul mot de passe pour ensuite laisser l'outil générer et mémoriser tous les autres mots de passe. On a plus qu'à retenir un seul mot de passe qui peut donc être long et complexe. L'exercice de mémoire sera alors moins compliqué que si on en avait plusieurs à retenir.

À travers son exposé, on découvre un peu plus tous les procédés de cryptographie utilisés afin de gérer les mots de passe que l'on va créer ou modifier en utilisant ces outils.
Grâce à de nombreux schémas, il explique clairement les différentes étapes de chiffrements utilisées que ce soit pour la création du mot de passe maître, la création et le changement des mots de passe, l'affichage des mots de passe et même le fonctionnement du partage de mots de passe (lorsque celui-ci existe dans l'outil).

On découvre pendant cette heure que les gestionnaires de mots de passe ne cherchent pas à réinventer la roue en matière de cryptographie mais s'appuient sur des concepts déjà éprouvés et robustes. On apprend aussi que tout est chiffré de bout en bout et que seul celui qui détient le mot de passe maître (l'utilisateur donc, même l'outil ne le connaît pas et n'en a pas besoin) peut interagir avec les mots de passe créés. Rassurant, non ? En tout cas, me voilà maintenant prêt à expliquer autour de moi pourquoi il est grand temps de passer à un gestionnaire de mot de passe !

[Page du talk sur le site de MiXiT et voir le replay](https://mixitconf.org/2022/comment-fonctionne-un-gestionnaire-de-mots-de-passe-)

## Optimiser votre revue de code avec le rebase interactif

GIT est un outil bien connu des développeurs de nos jours, mais dès qu'on s'écarte des commandes traditionnelles (checkout, commit et push), on sait bien moins ce que l'on peut faire d'autre avec.

Sonia Seddiki nous explique ici comment rendre la revue de code, souvent longue et fastidieuse, plus simple et agréable pour nos collègues avec quelques astuces qu'elle a partagées avec nous lors d'un live coding.
Contrairement à l'idée que j'en avais, le rebase interactif n'est pas là que pour nettoyer les noms de commit sans aucun sens que j'avais mis dans la précipitation mais que c'est un outil bien plus puissant.

Elle nous a ainsi montré comment elle utilise cette commande afin d’organiser et de donner une chronologie à son travail rendant ainsi la revue de code plus facile. Elle a ainsi, devant nos yeux, changé des fichiers de commits, réorganisé l'ordre des commits et tout ça sans altérer le code produit.

Évidemment, c'est une habitude à prendre, elle-même le souligne que ce n'est pas facile d'exporter cette bonne pratique au sein des équipes avec qui elle travaille. Mais la démonstration m'a convaincu, je vais m'essayer à cette pratique et qui sait, un jour j'arriverai peut-être à mon tour à convaincre des gens de mon équipe à en faire de même.

[Page du talk sur le site de MiXiT et voir le replay](https://mixitconf.org/2022/optimisez-vos-revues-de-code-avec-le-rebase-interactif-)

## Violence Herméneutique - Comment éviter le malaise

Le MiXiT est aussi un évènement nous permettant d’ouvrir notre esprit à des connaissances qui sortent de notre quotidien. Cette conférence animée par Romeu Moura et Sara Dufour en fait partie. Ce talk nous fait découvrir le concept d’herméneutique, défini en début de présentation comme étant “La connaissance d’un concept permettant l’interprétation”. Si vous n’avez rien compris à cette définition à ce stade, c’était également mon cas.

Malgré cette introduction confuse, petit à petit, en allant de plus en plus dans le détail, des sujets apparaissent et donnent sens à ce concept. On y parle de systémisme, de charge mentale, de patriarcat et autres systèmes de notre société dont l’exercice de compréhension va plus loin que leur simple mot ou leur définition. L'herméneutique consiste à comprendre les fondements et rouages d’un système, qu’on y appartienne ou non.

Mais notre société, et l'humain, tend à compliquer cet exercice de compréhension de concept. C’est là qu’on arrive à la notion de violence herméneutique, à savoir tous les mécanismes conscients et inconscients, systémiques ou non, internes ou externes, qui vont venir entraver et contraindre l’herméneutique. De réels freins à la compréhension d’un système. Ils peuvent prendre plusieurs formes, comme la notion de norme, le fait de nier l’existence d’un système ou de réfuter un sujet du simple fait qu’il soit considéré tabou. On y retrouve également la déformation de mots, et le fameux “wokisme”.

Il s’agit d’une conférence passionnante, dérangeante et éclairante que je conseille à tous. Le début piétine un peu, mais le voyage en vaut la peine.

[Page du talk sur le site de MiXiT et voir le replay](https://mixitconf.org/2022/violence-hermeneutique-comment-eviter-le-malaise-)

## Designer pour le service public

Cela peut faire un peu peur dit comme ça, mais je suis allé sceptique à cette conférence d’Anne-Sophie Tranchet. J’étais rattaché à une image peu flatteuse des outils du service public, alors que ces derniers ont connu une vraie progression ces dernières années. Anne-Sophie fait partie du programme beta.gouv qui intervient auprès des administrations pour les services numériques.

C’est armé des bonnes pratiques de nos métiers que Beta.gouv a la mission de transformer et d’accompagner les services publics. On y apprendra le parcours d’Anne-Sophie, ce que travailler pour le service public veut dire, ainsi que les projets et challenges qui en découlent. Leur méthodologie centrée utilisateur leur permet de travailler en itération, et de délivrer de la valeur, en incubation d’abord, puis jusqu’à un développement national en fonction des retours sur le service.

On peut citer quelques réalisations Beta.gouv comme la plateforme dossierfacile.com, qui facilite la création de dossier pour une location, ou 1000 Premiers Jours, qui délivre des informations et un accompagnement sur la grossesse et les 2 premières années de l’enfant

[Page du talk sur le site de MiXiT et voir le replay](https://mixitconf.org/2022/designer-pour-le-service-public)

### Nos autres conférences coup de coeur

* [Ma vie est un ticket](https://mixitconf.org/2022/ma-vie-est-un-ticket-eloge-de-la-communication-paresseuse-et-enjeux-pour-l-agilite-du-futur) de Romain Couturier, une conférence raconté avec dessins légère et qui donne des idées pour lutter contre la mauvaise utilisation des outils de ticketing
* [Tout ce que l'on ne vous pas dit sur l'IA](https://mixitconf.org/2022/tout-ce-que-l-on-ne-vous-dit-pas-sur-l-intelligence-artificielle-ia-) de Amélie Cordier, une conférence pleine d'humour sur ce qu'est et n'est pas une IA
