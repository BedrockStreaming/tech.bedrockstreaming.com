---
layout: ../../layouts/post.astro
title: "Vigo, le fléau des Carpates"
description: ""
author: team_cytron
category:
tags: [outil, qualite, javascript, tests fonctionnels]
feature-img: "../../../../images/posts/cytron/vigo.jpg"
thumbnail: "../../../../images/posts/cytron/vigo.jpg"
comments: true
permalink: vigo-le-fleau-des-carpates-la-tristesse-de-moldavie
---

[CasperJS](https://casperjs.org/) permet d’écrire des scripts javascript qui vont automatiser des tests fonctionnels de pages web. Il exécute ces tests dans une instance de [PhantomJS](https://phantomjs.org/) qui est un navigateur scriptable et sans interface graphique ("Headless" dit-on dans le milieu).

Afin de mieux structurer nos tests, de faciliter leur écriture et de pouvoir les lancer avec une commande unique, nous avons créé [VigoJS](https://github.com/BedrockStreaming/VigoJS), une surcouche pour [CasperJS](https://casperjs.org/).

#### Fonctionnalités

Toutes les fonctionnalités de base de [CasperJS](https://casperjs.org/) sont accessibles. Nous y avons simplement ajouté un mécanisme de configuration contenant plusieurs paramètres de base dont l’URL de test par défaut, l’authentification HTTP éventuelle ou encore la taille de l’écran virtuel. Il est également possible de spécifier des environnements (dev, preprod, prod...) pour différencier les comportements de certains tests. Ainsi, en fonction de l’environnement demandé dans la ligne de commande, les tests peuvent être joués sur des URL différentes avec la bonne authentification HTTP.

Quelques fonctions utilitaires sont aussi disponibles pour réaliser rapidement certaines vérifications récurrentes et ainsi faciliter le développement des tests. On peut, par exemple, rechercher aisément la présence d’erreurs ou warnings PHP dans une page. Il est aussi possible de faire un *retry* lorsqu'un test a échoué afin d'être certain que ce n'est pas une erreur du type "MySql server has gone away" qui peut se produire de temps en temps sur les serveurs de tests. Par ailleurs, quand un test échoue, [VigoJS](https://github.com/BedrockStreaming/VigoJS) exporte une capture d’écran qui s'avère très pratique pour comprendre ce qu’il s’est passé !

Tous les paramètres ajoutés à la ligne de commande et dans la configuration sont injectés et accessibles dans la classe de test. On garde, de cette manière, une certaine flexibilité. Cela peut permettre, par exemple, de découper les tests avec de la pagination :

<script src="https://gist.github.com/KuiKui/6121955.js"></script>

<script src="https://gist.github.com/fdubost/6172224.js"></script>

#### Affichage dans le terminal

Nous avons aussi amélioré l’affichage des résultats des tests. Il est ainsi possible de préciser pour chaque test : un titre et une description personnalisés afin de rendre les comptes-rendus plus compréhensible pour les utilisateurs. De même des commentaires utilisateurs peuvent être ajoutés plus simplement dans le déroulement des tests.

![Affichage dans le terminal](/images/posts/imgob/0-00-30-83-201308-ob_a1e6705b03efdc2518ba5e18c284550a_vigo-console-5.png)

#### Intégration continue

[CasperJS](https://casperjs.org/) génère nativement des rapports xUnit. [VigoJS](https://github.com/BedrockStreaming/VigoJS) intègre donc cette fonctionnalité pour être utilisé sur une plateforme d’intégration continue comme [Jenkins](https://jenkins-ci.org/). Il est aussi possible de modifier le paramètre *classPath* dans le fichier xUnit pour améliorer la lisibilité des résultats :

![Affichage des résultats des tests dans Jenkins](/images/posts/imgob/0-00-30-83-201308-ob_5138f3_capture-d-e-cran-2013-08-01-a-15-57-02.png)

Le chemin dans lequel est généré le rapport est configurable par l’option *--buildPath* (ou dans la configuration) :


<script src="https://gist.github.com/KuiKui/6122091.js"></script>

Il suffit ensuite de configurer le job Jenkins pour qu'il récupère le rapport de test dans ce dossier. Sans oublier de [faire un job pour tester les Pull Requests](/lache-moi-la-branch) de votre projet.

[VigoJS](https://github.com/BedrockStreaming/VigoJS) est disponible en [open-source](https://tom.preston-werner.com/2011/11/22/open-source-everything.html) sur [le compte GitHub de M6Web](https://github.com/BedrockStreaming).

Enjoy !
