---
layout: post
title: Journal de l'alternant - Comment j'ai perdu mes dépendances pnpm
description: "Comment la non-compréhension du hoisting m'a fait perdre des dépendances"
author: [j_poissonnet]
tags: [pnpm, hoisting, node_modules, alternant]
color: rgb(254,91,73)
language: fr
---

À Bedrock, on m’a chargé de faire un POC (proof of concept) pour tester les avantages et les limites d’un double run entre notre app côté web en déléguant des pages progressivement vers une app Next.JS. Étant tout nouveau dans le dev et encore plus nouveau sur le projet, ma vie ces derniers temps est une suite d’obstacles, d’essai, d’erreurs et de triomphes (pas toujours, mais souvent) bien mérités. Je suis habitué à faire des erreurs plus lunaires les unes que les autres, mais je vais m’attarder dans cet article sur une erreur qui m’a retourné le cerveau. Au menu : erreurs soudaines, dépendances disparues et désespoir… Bonne lecture.

Je suis alternant depuis un an à Bedrock et je travaille pour la première fois sur notre projet web interne. C’est un projet qui est très complexe, avec lequel vient énormément d’historique et dont la lecture du code relève parfois autant de l’histoire que du développement. 

> D’ailleurs à Bedrock, si on arrive à maintenir notre application web dans la durée, c'est grâce aux [bonnes pratiques qu’on essaie de respecter au mieux](https://tech.bedrockstreaming.com/2021/09/06/web-best-practices.html). 

En bref, je n’ai qu’une connaissance très superficielle du projet et des outils qu’il intègre.

Dans mes habitudes de code, il peut parfois m’arriver d’oublier de vérifier que le code que j’écris ne vienne pas casser les tests en place dans le code. Heureusement, notre CI qui nous est chère ne manque jamais de me rappeler mon manque rigueur. Cette fois-là, je casse un test à cause d’une erreur tellement anodine que je ne parviens pas à m’en rappeler. Je peux juste vous dire que j’ai eu le réflexe d’aller dans mon terminal de lancer le runner de test jest à l’aide de notre package manager pnpm dans une commande qui doit très certainement ressembler à : pnpm test <test-qui-casse>. Le test est rouge pour une raison qui me semble venir d’un problème de dépendances. Ayant beaucoup trituré mes `node_modules`, je me dis que repartir sur des bases propres ne devraient pas faire de mal au projet. Je décide donc, sans savoir ce qui m’attend, de lancer l’innocente commande : `pnpm i`

J’observe que pnpm fait son travail, met à jour des dépendances, je devais effectivement avoir joué un peu trop avec mes `node_modules`.

Je relance la commande à l’identique qui doit très certainement ressembler à : pnpm test <test-qui-casse> … et là quelle ne fut pas ma surprise quand mon terminal, sans trembler m’a affiché `Command: "jest" not found`.

Je commence à penser que je ne viens pas seulement de casser un test, mais j’ai également cassé jest. À ce moment-là, je venais de ressortir d’une bataille avec des dépendances et donc je venais de me familiariser avec le `node_modules` `.pnpm` et autre `.bin` . C’est dans ce dernier dossier que je me rends pour me rendre compte qu’effectivement, il y manque l’exécutable jest.

En fait, il y manque également d’autres outils que je m’attendais à trouver comme prettier et eslint.

Je me redis que la portée de mon problème vient de s’étendre de jest à mes `node_modules`. 🫠

Désespéré, je tente une recherche globale des mots clés : **prettier** et **eslint**. Je finis par trouver une correspondance intéressante dans le fichier `.npmrc`.

Voilà à quoi ressemble le fichier à ce moment-là :
```
public-hoist-pattern[]=*@testing-library/jest-dom*
public-hoist-pattern[]=*@testing-library/react*
public-hoist-pattern[]=*@testing-library/user-event*
public-hoist-pattern[]=*enzyme*
public-hoist-pattern[]=*jest*
public-hoist-pattern[]=*redux-mock-store*
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
```
Je peux sentir qu’il s’agit d’une véritable piste parce que dans ce fichier sont listées toutes les dépendances qui sont cassées sur ma machine.

# Comprendre la configuration de pnpm
## Hoisting des dépendances
Pour comprendre la configuration `public-hoist-pattern` il faut d’abord comprendre comment sont formés les `node_modules` par pnpm. Pnpm ne va mettre dans le dossier `node_modules` en racine uniquement les dépendances directes du projet, toutes les sous-dépendances seront placées dans un dossier caché .pnpm et un lien symbolique sera créé. 

> Je vous invite à lire la [documentation écrite par pnpm](https://pnpm.io/symlinked-node-modules-structure) afin de comprendre leur système de dépendances.

Cela peut parfois poser des problèmes avec des libraries qui utilisent des dépendances fantômes. C’est pourquoi pnpm laisse quand même du contrôle sur ce comportement.

> On parle de dépendance fantôme pour désigner toutes les dépendances qui ne sont pas désignées dans le package.json root mais qui sont quand même nécessaire pour le bon fonctionnement de l’application.

`public-hoist-pattern` permet d’indiquer quelles dépendances on veut forcer à être dans le dossier `node_modules` racine plutôt que `node_modules/.pnpm`.

La ligne `public-hoist-pattern[]=*jest*` veut donc dire qu’on ajoute jest aux dépendances qui sont accessibles depuis la racine et ainsi l’exécutable dans `node_modules/.bin` . Cela permet par exemple de déléguer la configuration et l’import de jest dans un package enfant du repository.

## Retour à l’histoire… let’s debug
A cet instant je suis convaincu que c’est le fichier `.npmrc` qui est responsable de l’erreur `Command: "jest" not found`. Je ne vois rien d’anormal dans ce fichier qui pourrait me mettre la puce à l’oreille, c’est alors que je me dis que peut être pnpm ne lit pas la bonne configuration. En lisant la documentation, je tombe sur la commande parfaite : pnpm config get. Cette commande permet d’afficher la configuration que résout pnpm. La sortie de cette commande m’a mis sur une nouvelle piste puisque c’est là que j’ai vu apparaître la ligne problématique : `shamefully-hoist=false`. Je tente de chercher dans le projet où est écrite cette ligne. Aucune trace de cette maudite ligne. Je retourne tout le projet à la recherche d’une ligne de code qui pourrait ajouter cette ligne de configuration. Je me mets à lire toute la documentation pnpm pour pouvoir comprendre d’où cette ligne peut venir. Après avoir désinstallé et réinstallé, pnpm, node et redémarrer mon PC, je tente dans un dernier espoir de créer un dossier test-a-laide dans lequel je reclone le projet. Malheureusement, rien n’y fait. 

C’est à ce moment que je me dis que si le problème ne vient pas de mes outils ni de la configuration locale, il faut peut-être que j’aille chercher dans ma configuration globale. En effet, en ouvrant cette dite configuration `~/.npmrc`, je m’aperçois que c’est de là que vient la ligne `shamefully-hoist=false`. C’est un soulagement, j’ai enfin trouvé d’où cette ligne mystique venait.

> Je suis encore à la recherche de la réponse à la question : pourquoi diable, ai-je mis cette configuration dans mon `.npmrc` global. Je pense me souvenir l’avoir fait en me disant que je voulais m’assurer que pnpm se comporte en faisant des symlinks. (l’intention n'était pas mauvaise, mais la conséquence pas joyeuse)

On peut lire dans la documentation de pnpm que : _Setting shamefully-hoist to true is the same as setting `public-hoist-pattern` to *._

En d’autres termes `shamefully-hoist` à une influence sur le hoisting de toutes les dépendances du projet.

J’ai deux problèmes avec la documentation à ce sujet:

Tout d’abord, il n’est pas explicité le cas inverse à savoir si on met `shamefully-hoist=false` alors ça revient à écraser toutes les configurations de `public-hoist-pattern`

Mais le comportement, qu’il soit un bug ou un cas à la marge, de la configuration globale de `shamefully-hoist` qui écrase la configuration locale de `public-hoist-pattern` manque de documentation.

Bref, après avoir déduit que c'était cette ligne qui cassait mon hoisting, je retire la ligne et je lance un pnpm install. Bingo ! Je récupère toutes mes dépendances perdues.

# Conclusion:
J’essaie a posteriori de déchiffrer pourquoi j’ai eu ce problème et comment faire en sorte que cela n’arrive pas. Je pense être tombé sur un comportement étrange de pnpm. Je ne sais pas s’il s’agit d’un bug ou d’une feature. En effet, intuitivement, j’aurais tendance à dire qu’une configuration globale de `shamefully-hoist` ne devrait pas override la configuration locale de `public-hoist-pattern`. Je suis prêt à entendre que le comportement est attendu et voulu, mais dans ce cas je pense qu’un peu plus de documentation à ce sujet ne peinera personne. À cet égard j’ai ouvert [une issue](https://github.com/pnpm/pnpm/issues/7312) sur le Github de pnpm.

Je retire plusieurs enseignements de cette aventure :
- Douter de la configuration qui est lue par les outils
- La documentation ne contient pas toujours tous les comportements. 
- Il faut penser à voir plus loin que son fichier local de config et penser aux potentielles surcharges...
