---
 layout: post
 title: SymfonyCon 2022
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

## Schrödinger's SQL - The SQL inside the Doctrine box

Au début de sa conférence [Claudio Zizza](https://connect.symfony.com/profile/senseexception) insiste sur le fait de bien connaître nos bases de données et le langage utilisé pour les requêter, il évoque notamment les différences entre MySQL et PostgreSQL. Ensuite, il nous a parlé de Doctrine ORM, des fonctions que nous aimons tant car elles nous facilitent la vie. Puis, il a rappelé l'importance de savoir faire des requêtes SQL même si nous utilisons Doctrine car comprendre SQL peut nous faire optimiser notre utilisation de Doctrine et donc mieux comprendre son fonctionnement. Il insiste aussi sur le fait que SQL "seul" est bien plus puissant que DQL (langage Doctrine). Pour terminer, Claudio nous a donné quelques pistes de lecture (apprentissage) pour SQL, ainsi qu'un site permettant de tester nos queries.

## Dynamic Validation With Symfony

Tout en se basant sur les évolutions des Pokémon, [Marion Hurteau](https://connect.symfony.com/profile/marionleherisson) a introduit le principe de validation dynamique. Par exemple, vérifier que le nom de notre Pokémon contient bien 10 caractères, ou encore selon les différentes règles d'évolution en fonction du type de Pokémon utilisé. À l'aide d'exemple de code qui sont sur son repo Git, elle a passé en revue les façons d'implémenter des validations à l'aide du Symfony Validator Component. Au fil de sa présentation, la complexité des contraintes croît ce qui permet de voir un éventail développé de possibilités.