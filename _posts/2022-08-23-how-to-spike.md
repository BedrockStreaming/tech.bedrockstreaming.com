---
layout: post
title: "Les spikes : quand, comment, pour quoi faire ?"
description: "Décomposer une tâche complexe, de A à Z"
author: e_doyon
tags: [spike, methodologie, cytron, tech]
language: fr
color: rgb(255,128,0)
feature-img: "images/posts/how-to-spike/cactus.jpg"
permalink: how-to-spike
---

C’est une histoire bien connue, dans la vie de n’importe quel développeur : un ticket arrive dans le backlog, décrivant une problématique relativement complexe. C’est parfois une question de technologie inconnue, ou parfois simplement un chantier un peu trapu. Je pense que toutes les équipes ont, au moins une fois dans leur vie, fait face à ce genre de tâche impossible : c’est l’occasion des regards désespérés, alors qu’un junior se lamente en disant « Mais par où est-ce qu’il faut commencer ? ». Et c’est là qu’on répond : « Essaye de faire un spike ».

Faire un spike ? Quelle excellente idée ! Encore faudrait-il savoir ce qu’est un spike, comment ça marche, et à quoi ça sert.

Je vous propose donc ensemble de voir dans cet article : qu’est-ce qu’un spike, quand l’utiliser, et comment considérer qu’il est réussi ?

# spike --help 📚

Si je devais citer [Wikipedia](https://en.wikipedia.org/wiki/Spike_(software_development)), je dirais qu’un Spike, c’est “une méthode de développement de produit, dérivée de l’extrême programming, et qui cherche à créer le code le plus simple possible pour obtenir des solutions potentielles”.

En gros, le but d’un spike, c’est de répondre à la question *“Comment on fait ?”* avec un prototype de code réalisé grâce à une série de petites étapes simples. Un spike n’est pas une formule magique qui va vous permettre de réaliser la tâche impossible que votre client vous a donné. En revanche, le spike va vous permettre de savoir si la tâche impossible ou compliquée à première vue est en fait possible, et si oui, comment.
Il arrivera également que votre spike vous permette de constater qu’une tâche donnée peut être réalisée de plusieurs manières : que ce soit en passant par des librairies différentes, avec une implémentation changeante, ou autre chose encore. Dans ces cas, le spike va également vous servir à essayer ces différentes possibilités, et à choisir celle qui est la plus appropriée !

Le moyen le plus simple est de procéder morceau par morceau. Alors je vous propose qu’on s’y mette maintenant, et qu’on regarde quoi faire !

# “kowalski, analysis !” 📊

Avant toute chose, il faut savoir exactement ce que vous souhaitez faire. Rien ne sert de mettre la charrue avant les bœufs.

Si ce n’est pas fait, écrivez noir sur blanc les lignes exactes qui vont définir votre tâche comme finie. Que ce soit connecter votre utilisateur de façon sécurisée, afficher une vidéo sans heurt, ou juste avoir une page qui clignote en blanc et bleu, il faut que vous ayez une liste de *bullet points*, qui définit précisément ce que vous voulez faire.

Votre objectif final est de réaliser tout ce que vous avez sur cette liste : strictement rien de moins, mais aussi strictement rien de plus ! Pas de demande implicite de type “Ah mais je voulais aussi que l’image soit visible en noir et blanc” : si ce n’est pas sur la liste, ce n’est pas à faire.

Cette liste peut être écrite selon votre format favori : un cahier des charges, une série de directives *Gherkin*, l’important c’est qu’elle soit écrite, claire et précise. En d’autres termes, vous définissez ici votre propre cahier des charges.

Le résultat final doit donc être quelque chose dans ce style : 

```
As a client
I want to see my product in 3 dimensions
So that I can know what it looks like

As a client
I want to be able to rotate my product using the arrow keys
So that I can check it out entirely

As a client
I want to be able to zoom on my product
So that I can see even the smallest details
```


Une fois que vous savez quoi faire, on peut vraiment commencer à mettre la main dans le code !

# // TODO : make the code below work 💻

Stop. Lâchez tout.

Je vous vois déjà, votre liste de points en main, à tenter de la faire rentrer dans votre gros projet à grands coups de burin, de vous gratter la tête à comprendre pourquoi ça ne rentre pas, et qu’est-ce qui a bien pu casser, cette fois.

Un peu de calme : le but d’un spike n’est pas de faire tout fonctionner, pas du tout. Prenez de la distance, et on va y aller en douceur.

Pour commencer, isolez une partie de votre projet et de vos points objectifs. Il existe plusieurs moyens de s’y prendre : créer un nouveau projet, créer une nouvelle page avec seulement quelques composants, décharger votre backend… On veut un environnement le plus propre possible.
Beaucoup de projets sont vieux, et si mal conçus qu’il [aurait fallu les jeter au bout de deux ans](/2021/09/01/bonnes-pratiques-web). On cherche ici à se détacher au maximum de cette dette technique.

N’hésitez pas à utiliser des *mocks*, des faux appels et résultats au reste de votre application :  en simulant comment se comporte le reste de votre projet sans véritablement y faire appel, vous diminuez au maximum votre marge d’erreur, et vous assurez que vous contrôlez la moindre information qui transite par votre code. 

Maintenant seulement, vous pouvez prendre votre clavier, et coder. Regardez comment implémenter chacun de ces points dans votre code propre de manière épurée.
Ça fonctionne du premier coup ? Génial, notez comment vous avez fait ! Ça ne marche pas ? Dommage, mais ce n’est pas une raison pour Ctrl+Z et recommencer. Notez bien ce qui n’a pas marché, avant de retenter ! Si ça ne marche toujours pas au bout de 2/3 essais, pas de soucis, n’hésitez pas à laisser ce point de côté et passer à un autre. Mais écrivez tout, car cela va vous servir très bientôt !

# if(bug == true) { delete(bug); console.log("It works !"); } 🤖

Il peut cependant arriver que, parfois, tous vos efforts ne mènent à rien. Vous avez déjà passé plusieurs jours sur les différents sujets du spike, et vous n’avez pas encore identifié de solution pour faire fonctionner le tout.
Dans ce cas-là, pas de panique ! Il s’agit également d’un des objectifs du spike. Après tout, si vous n’avez pas pu réaliser votre objectif dans un cadre réduit, il est bien probable que vous n’auriez jamais pu le faire fonctionner dans votre projet lui-même.

Les mêmes points qu’indiqués ci-dessus continuent de s’appliquer : notez ce que vous avez tenté et les soucis rencontrés avec chaque implémentation. Puis, continuez le processus détaillé ici : ce n’est pas parce que votre code n’as pas fonctionné qu’il ne doit surtout pas être présenté. Peut-être un de vos collègues trouvera-t-il la ligne qui vous manque, ou le point-virgule que vous avez oublié : mais peut-être aussi qu’il vous aidera à comprendre ensemble pourquoi la solution ne fonctionne pas dans votre cadre.
Et puis, vous pourrez alors vous poser la question : est-ce qu’il faut bien faire comprendre que la tâche demandée est irréalisable, ou est-ce qu’il faut prévoir un chantier pour réussir à trouver un moyen de remplir la requête ?

# L’instant doc 📝 

Une fois que vous avez terminé de coder, il est temps pour vous de poser votre IDE, et de sortir votre outil de documentation favori : Confluence, Jira, que sais-je. 
Puis, écrivez un compte-rendu de votre aventure. Présentez l’origine de votre spike (Le **Pourquoi**), ce que vous avez tenté (Le **Comment**). Expliquez ce qui a marché et ce qui n’a pas marché : cela vous servira lorsque vous implémenterez vraiment la feature !
Enfin, écrivez également les étapes qu’il faudrait suivre pour terminer la feature : ajoutez un maximum de détails techniques. Ce sera autant de problématiques en moins pour le pauvre dev qui va récupérer les US après vous.

Je vous suggère donc de faire un plan de ce type :

1. **Problème** - Expliquez ici l’état initial. Qu’est-ce qui était demandé ? Pourquoi avoir choisi de faire un spike ? Quel en est l’objectif ?
2. **Observations**  - Indiquez là vos réflexions et le code que vous avez produit. Expliquez ce que vous avez tenté, les problèmes rencontrés et les solutions établies, vos pistes de réflexion. N’hésitez surtout pas à détailler !
3. **Actions** - Enfin, détaillez dans cette dernière partie ce qu’il restera à faire afin de transformer ce spike en une feature fonctionnelle. Quels bugs corriger ? Quels points n’ont pas encore été réalisés, et comment faire pour les réaliser ?

Pour la dernière étape, je vous conseille de réaliser un tableau d’actions *SMART* afin de définir au mieux les tâches à réaliser.
Le principe SMART suppose qu’une tâche doit être composées des cinq caractéristiques suivantes afin d’être pertinente :
- Elle doit être **Spécifique**, afin que l’objectif soit clair et concis (Qu’est-ce que je dois faire ? Exemple de réponse : « Il faut que l’image d’un objet soit en 3D »)
- Elle doit être **Mesurable**, pour définir un objectif quantifiable (Quant est-ce que ma tâche sera finie ? Exemple de réponse : « Il faut que je puisse faire tourner l’image avec les flèches gauches et droites du clavier  »))
- Elle doit être **Atteignable**, sans demander de décrocher les étoiles (Comment réaliser ma tâche ? Exemple de réponse : « Utiliser la méthode *Get3D* de la librairie *Easy3D* »))
- Elle doit être **Réaliste** au sujet en cours, donc nécessaire à l’accomplissement final (Est-ce qu’il est pertinent de prendre du temps pour faire ça ? Exemple de réponse : « Afin que notre client puisse voir l’avant et l’arrière de nos produits »)
- Elle doit être définie de façon **Temporelle**, afin de ne pas pouvoir s’éterniser (Pour quand ma tâche doit-elle être réalisée ? Exemple de réponse : « A réaliser avant que la feature soit considérée terminée »)

Dans le cas où une des tâches que vous avez devisé ne peut pas répondre à un de ces cinq points, alors il est probable qu’elle ne soit pas suffisamment précise : peut-être la tâche manque-t-elle de cadre ou de contexte, ou le temps nécessaire pour la réaliser ne peut que difficilement être justifié. Je vous invite alors à la supprimer, ou à la fusionner avec une autre jusqu’à enfin pouvoir répondre à ces cinq questions !

Bien entendu, n’hésitez pas à modifier le plan de cette documentation comme vous l’entendez : vous êtes celui qui allez l’utiliser, après tout !

La doc est finie ? Il ne reste plus que deux étapes, puis on pourra enfin considérer ce spike comme fini !

# Presentation_Spike.ppt 🎬

Avant de pouvoir clôturer ce spike, il serait bien d’avoir des retours extérieurs. Pour ça, rien de mieux que de le présenter à votre équipe !
Organisez ensemble une réunion, pas très longue. Au sein de mon équipe, une demi-heure suffit. Il vous faudra peut-être un peu moins ou un peu plus de temps.

Utilisez cette présentation afin de montrer, étape par étape, ce que vous avez réalisé. Rappelez tout d’abord les objectifs du spike, avant d’expliquer votre analyse du problème et les objectifs que vous avez identifiés. Puis, présentez les différentes implémentations que vous avez tentées, avant de conclure en montrant votre documentation et en expliquant les tâches qui restent à accomplir pour réaliser la feature objectif.

Il est très important que vous ne présentiez pas uniquement le code que vous avez réussi à faire fonctionner, mais aussi vos tentatives échouées, et ce pour plusieurs raisons. Tout d’abord, il est tout à fait possible qu’un de vos collègues, en voyant votre présentation, réalise une de vos erreurs et vous l’indique. Mais surtout, si quelqu’un d’autre que vous récupère une des tâches restantes, il risque de tenter les mêmes pistes que vous, et rencontrer les mêmes problématiques que vous ! 

Une fois votre présentation terminée, débattez avec le reste de votre équipe. S’ils sont d’accord avec vous sur le plan d’action que vous avez établi grâce à votre tableau SMART, il vous reste une toute dernière étape à accomplir !

# “Happily ever after…” 💭

Maintenant que tous vos coéquipiers ont pu constater et valider votre travail, il ne vous reste plus qu’à acter la mise en place : et pour ça, rien de mieux que, aux côtés de votre *Product Owner* (Ou de l’équivalent dans votre équipe) de créer des tâches, *User Story*, post-its, ou quoi que ce soit, pour que les étapes restantes soient visibles et accessibles par tous !

N’hésitez pas à le guider pour ajouter encore une fois des détails techniques dans ces US ou tâches : vous avez réalisé l’analyse, il serait dommage de ne pas l’utiliser, et ce sera autant de temps gagné pour votre équipe. Tant que vous y êtes, pensez aussi à ajouter un lien vers votre documentation, ou vers une vidéo de votre présentation… Plus il y aura de détails, mieux ça sera !

Il est également possible, comme indiqué plus haut, que la tâche qui a entraîné la réalisation de ce spike se découvre être impossible à implémenter. Il s’agit là également d’un point à faire avec votre *Product Owner*, afin de décider ensemble de la procédure à suivre : peut-être faudra-t-il redéfinir les critères d’acceptation, ou bien laisser tomber complètement cette idée.

# return 0;

Vous avez fini votre spike ! Ce qui était à l’origine une tâche complexe, confuse ou impossible à prévoir, est désormais divisée en une série d’étapes, qui sera désormais bien plus aisée à réaliser pour votre équipe. Alors, satisfait ? 
