---
layout: ../../layouts/post.astro
title: "Tentative d'explication des Fast-Forward sous Git"
description: ""
category: 
author: k_dits
tags: [git]
comments: true  
permalink: tentative-d-explication-des-fast-forward-sous-git
---

![Tentative d'explication des Fast-Forward sous Git](../../../../images/posts/git-ff.png)

Tous les projets M6Web sont passés récemment sous le système de gestion de contenu [Git.](https://fr.wikipedia.org/wiki/Git)

Git, c'est super cool ! On peut faire facilement des branches, les "merger" les unes aux autres et "switcher" d'une branche une autre. Pratique donc (dans l'idée) !

Il a été finalement assez facile de se faire au vocabulaire et au fonctionnement de git. Je ne dis pas que je ne fais pas non plus mes commit sur la bonne branche chaque fois, mais on arrive tout de même assez facilement à s'en sortir ("*git reset --help*" si vous êtes dans ce cas) !

Le très intéressant article "[A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)" a mis en avant la gestion des **fast-forward**, cela dit l'utilité m'est resté assez floue et ne couvrait pas l'ensemble de mes questions.

J'ai donc fouillé la documentation de Git afin de débroussailler les "fast-forward".



### Que fait git lors d'un merge

Git "merge" deux branches lorsque :

- La commande "merge" est utilisée, par exemple *git merge feature-myfeature*,
- la commande pull est utilisée, exemple *git pull origin master*



### Git "fast-forward"

Mettons que Bob fasse une modification sur une branche, il crée un commit **Y**.

Il fait une autre modification qu'il commit, il crée alors un commit **Z**.

Automatiquement git "fast-forward", c'est dire qu'il fait pointer la branche, qui pointait sur le commit **Y**, vers le commit **Z**. Sur les graphiques de *git log*, les deux commit sont liés par un trait continu.

<pre>- Y - <strong>Z</strong></pre>

Tant que Bob continue faire des modifications + commit sans toucher au fast-forward, git va automatiquement "fast-forwarder". On aura donc un enchaînement de commit qui sont liés par un trait continu.

<pre>- Y - Z - AA - AB - AC - ...</pre>


### Git ne "fast-forward" pas

Nous sommes maintenant sur une branche qui en est la révision **X**.

Alice travaille sur son projet et crée la révision **A**.

Cela dit, Bob travaille aussi sur le projet et crée la révision **B**.

**Alice pousse ses modifications :**

Le commit **A** a pour parent le commit **X**, qui est le dernier commit connu par la branche, Git peut donc "fast-forwarder".

<pre>- X - <strong>A</strong></pre>

**Bob pousse ses modifications :**

Le commit de bob ne connaît pas de commit **A** dans son historique (son commit parent est le commit **X**).

<pre>
- X - A
   \
    B</pre>

Si git "fast-forwardait" ici, il ferait pointer la branche sur le commit **B**, et perdrait le commit **A**. Comme on ne souhaite pas perdre les modifications d'Alice, il va donc passer en mode "no fast-forward" automatiquement.

Git va donc récupérer les modifications de **A** et les mélanger (merge) aux modifications de **B** en créant un commit **C**.

Le commit **C** a pour parent les commit** B** et** A**, le pointeur de dernier commit peut donc être placé sur **C** sans risque de perte d'historique.

<pre>- X - A</pre><pre>   \   \</pre><pre>    B - <strong>C</strong></pre>



### Option* --no-ff*

L'auteur de l'article cité précédemment conseille d'utiliser l'option *--no-ff* sur les merge.

Cette option force git a créer un commit de "merge" qui aura pour parents notre commit de modification, et le dernier commit connu sur la branche, même si il n'y a pas eu de modification sur cette dernière.

Cela permet de revenir facilement à la version antérieure de la branche, sans avoir à fouiller dans les nombreux commits ayant pu amener un bug : on revient à la version initiale avant de passer plus de temps pour corriger le bug.

<pre>- M1 -- -- -- -- M2</pre><pre>    \            /</pre><pre>     B1 - B2 - B3</pre>

Dans l'exemple ci-dessus, on peut facilement revenir au commit **M1**, et exclure ainsi toute la branche **B**. Si on avait "fast-forwardé", il nous aurait fallut retrouver le commit **M1** en regardant tous les commit précédent.



### Mode auto contre *--no-ff*

Forcer le *--no-ff *ne sera finalement utile que lorsque vous développez une fonctionnalité pour laquelle vous allez beaucoup "commiter", sans que personne d'autre ne commit entre-temps.

A vous de l'utiliser de manière intelligente !



#### Sources

- nvie.com : [A successful Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)
- *git push --help*



