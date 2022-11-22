---
 layout: post
 title: SymfonyCon - Disneyland Paris 2022
 description: 
 author: backend
 tags: [conferences, backend, symfony, php]
 color: rgb(251,87,66) # this is Bedrock color here
---

## Unleashing the power of lazy objects in PHP

[Nicolas Grekas](https://connect.symfony.com/profile/nicolas-grekas), habitué de la scène PHP et membre de la Symfony Core Team, nous a présenté les différentes façons d'utiliser des lazy objects en PHP et plus spécifiquement à l'aide de Symfony. 

Que sont les lazy objects ? 

Ce sont des objets qui sont créés vides puis renseignent eux-mêmes leurs propriétés, ils sont utiles lors de l'instanciation de lourds objets peu appelés. Oui, cela permet de faire du lazy loading.\
Comment appeler des lazy objects ? 

Nicolas nous a aussi présenté deux nouveaux traits prochainement disponibles sur Symfony 6.2 permettant de travailler avec ces objets. Les VirtualInheritanceProxies et les GhostsObjects sont les nouvelles possibilités pour travailler avec les lazy objects en plus du ValueHolder. Ces deux nouveaux traits sont beaucoup plus simples à utiliser que ce qui existe actuellement.

## Advanced Git magic

[Pauline Vos](https://connect.symfony.com/profile/paulinevos) nous représente GIT en dehors de son usage quotidien, comment aller plus loin que les pull, commit, push et merge habituels, elle nous livre donc une présentation sur une méthode de débug en utilisant GIT.

Retour dans un premier temps sur l’importance des commits dit “atomic” avec comme règles :
- Chaque commit se résume à un fix ou une feature
- Chaque commit doit fonctionner (tous les tests doivent passer)
- Chaque message et description doit être clair et concis

Pauline nous introduit ensuite la commande `git rebase-i` qui permet un rebase interactif servant notamment à réécrire notre historique, à drop un commit par exemple.

![git rebase intéractif](/images/posts/symfonycon2022/IMG-0785.jpg)

Vient ensuite l’utilisation de la commande `git reflog`, commande avec laquelle nous pouvons obtenir le détail des commandes sur la branche, elle peut de ce fait être utile pour réparer une erreur.

####Comment utiliser toutes ces commandes GIT pour débugger ?
Une démonstration de la commande `git bisect` en faisant une recherche dichotomique des commits pour identifier le commit qui a introduit le bug. 
Elle divise donc ses commits avec `git bisect start`, `git bisect good`, `git bisect bad` , `git bisect reset`
Pauline pousse la réflexion plus loin en alliant la commande ‘git bisect’ avec un script de débug ou un test unitaire.

_“Write it, push it and find where it breaks_

Afin de tirer partie de cette méthode, il est important que chaque commit doit être fonctionnel, tous les tests doivent donc passer.

Vous pouvez également retrouver [un article de Pauline](https://www.pauline-vos.nl/fix-bugs-%e2%9a%a1-fast-with-regression-tests-and-auto-bisect/
) à ce sujet sur son blog personnel.


## Schrödinger's SQL - The SQL inside the Doctrine box

Au début de sa conférence [Claudio Zizza](https://connect.symfony.com/profile/senseexception) insiste sur le fait de bien connaître nos bases de données et le langage utilisé pour les requêter, il évoque notamment les différences entre MySQL et PostgreSQL. Ensuite, il nous a parlé de Doctrine ORM, des fonctions que nous aimons tant car elles nous facilitent la vie. Puis, il a rappelé l'importance de savoir faire des requêtes SQL même si nous utilisons Doctrine car comprendre SQL peut nous faire optimiser notre utilisation de Doctrine et donc mieux comprendre son fonctionnement. Il insiste aussi sur le fait que SQL "seul" est bien plus puissant que DQL (langage Doctrine). Pour terminer, Claudio nous a donné quelques pistes de lecture (apprentissage) pour SQL, ainsi qu'un site permettant de tester nos queries.

## Advanced Test Driven Development

Durant cette conférence, [Diego Aguiar](https://connect.symfony.com/profile/mollokhan), développeur de chez SymfonyCasts nous rappelle ce qu’est le **TDD (Test Driven Development)**, son histoire, les différentes techniques ainsi que des astuces afin de nous débloquer et bien sûr les cas où il ne semble pas utile d’utiliser le TDD.

A retenir, le TDD est une discipline, il faut beaucoup d'entraînement et répéter continuellement ces exercices.

![tdd discipline](/images/posts/symfonycon2022/IMG-0848.jpg)

_**“Fake it till you make it”**_ , il s’agit d’abord d’écrire son code de test en utilisant par exemple des assertions, des tests avec différentes sorties et ensuite de produire le code qui va résoudre ces tests.

![Fake it till you make it](/images/posts/symfonycon2022/IMG-0852.jpg)

**“ Write your test code, produce it and repeat.”**
##Pourquoi nous retrouvons nous parfois bloqués ?
- Les tests écrits sont peut-être faux
- Les tests ne sont pas assez segmentés
- Le code écrit est peut-être trop spécifique

####Comment se débloquer ?
- Continuer et trouver un test plus simple
- Refactoriser le code en production qui met en difficulté
- Ecrire les différents use-cases
- Passer outre les tests un instant

Les cas les plus favorables au TDD sont les nouvelles fonctionnalités qui n’ont pas de lien avec du code legacy. En ce qui concerne les cas non pertinent au TDD, nous retrouvons les cas de configuration, de découverte de code, et de requêtes.

Pour conclure, Diego nous rappelle le TDD est bien évidemment un outil et non une règle.

## Dynamic Validation With Symfony

Tout en se basant sur les évolutions des Pokémon, [Marion Hurteau](https://connect.symfony.com/profile/marionleherisson) a introduit le principe de validation dynamique. Par exemple, vérifier que le nom de notre Pokémon contient bien 10 caractères, ou encore selon les différentes règles d'évolution en fonction du type de Pokémon utilisé. À l'aide d'exemple de code qui sont sur son repo Git, elle a passé en revue les façons d'implémenter des validations à l'aide du Symfony Validator Component. Au fil de sa présentation, la complexité des contraintes croît ce qui permet de voir un éventail développé de possibilités.

## Notre retour d'expérience

![Fresque Lego symfony](/images/posts/symfonycon2022/IMG-0773.jpg)