---
layout: post
title: "Contrôlez facilement votre cohérence de code sur votre projet Symfony2 avec coke"
description: "Voici comment facilement et rapidement mettre en place un système de contrôle de la cohérence du code d'un projet Symfony2 avec coke"
author: mikaelrandy
category:
tags: [code sniffing, coke, Symfony2]
feature-img: "images/posts/coke-et-symfony2/feature.png"
thumbnail: "images/posts/coke-et-symfony2/feature.png"
comments: true
---

Pour qu'un projet persiste dans le temps, il est important que le style de codage soit le même. Et quand vous vous reposez sur des outils, autant faire en sorte que le style de codage retenu soit proche, si ce n'est le même, que les briques que vous utilisez. Et dans le cas où vous utilisez un framework, c'est d'autant plus important.

Avec Symfony2, c'est d'autant plus facile que l'architecture des bundles est très marquée, et qu'un coding guide est publié.

Ça, c'est pour la théorie, mais en pratique, si ce n'est pas super simple, automatique, une somme de toutes petites erreurs apparaissent et le sentiment d'abandon s'installe rapidement.

## Coke

Il y a un peu plus d'un an, chez M6Web, nous avons développé [coke](/coke-pour-bien-sniffer-son-code) pour configurer simplement l'exécution de PHP_CodeSniffer.

Depuis quelques mois, il est possible [d'installer coke via Composer](https://github.com/BedrockStreaming/Coke/pull/4) :

{% highlight json %}
{
  "require": {
    "m6web/coke": "~1.2"
  }
}
{% endhighlight %}

L'avantage de passer par Composer, c'est que coke va lui-même installer PHP_CodeSniffer en tant que dépendance Composer (dans le dossier `vendor`), permettant de ne pas avoir à suivre la [fastidieuse procédure d'installation via PEAR](https://pear.php.net/manual/en/guide.users.commandline.installing.php).

## Installer un coding standard via Composer

Lorsque nous voulons utiliser un coding standard qui n'est pas inclus par défaut avec PHP_CodeSniffer, il est possible de l'installer en utilisant Composer

## Symfony2-coding-standard

Chez M6Web, nous maintenons le standard [Symfony2-coding-standard](https://github.com/BedrockStreaming/Symfony2-coding-standard) qui permet de valider que le code d'un projet respecte les [coding standard de Symfony2](https://symfony.com/doc/current/contributing/code/standards.html).

Pour rendre à César ce qui appartient à César, nous avons récupéré la base du standard telle que créé par [opensky](https://github.com/opensky).

Si nous avons décidé de le forker, c'est que la structure ne correspondait pas à ce qui est nécessaire pour une installation de ce standard via Composer

## Procédure complète, pas-à-pas

Créer le fichier `composer.json` suivant :

{% highlight json %}
{
  "require-dev": {
    "m6web/coke"                       : "~1.2",
    "m6web/symfony2-coding-standard"   : "~1.1",
  }
}
{% endhighlight %}

Installer les dépendances Composer :

{% highlight bash %}
composer install
{% endhighlight %}

Créer le fichier `.coke` suivant :

{% highlight bash %}
# Standard used by PHP CodeSniffer (required)
standard=vendor/m6web/symfony2-coding-standard/Symfony2
{% endhighlight %}

Il est désormais possible d'appeler la commande suivante pour valider le style de codage de votre projet

{% highlight bash %}
./vendor/bin/coke
{% endhighlight %}

## Conclusion

Avec cette technique, il est très simple de valider le style de codage d'un projet. Du coup, plus d'excuse pour ne pas le faire ;)

## Bonus

L'idéal, pour ne jamais commiter un code ne respectant pas les conventions de codage, est d'utiliser les [hooks de commit](https://git-scm.com/book/en/Customizing-Git-Git-Hooks) pour que cette vérification soit faite automatiquement.

La manière la plus simple de le faire est d'ajouter la ligne `./vendor/bin/coke` dans le fichier `.git/hooks/pre-commit`, mais cette méthode a le défaut de vérifier tout le projet, et pas uniquement le code modifié et à commiter.

Pour aller plus loin, vous pouvez vous inspirer du [script suivant](https://gist.github.com/JJK801/5867810) qui ne lance coke que sur les fichiers dans le "staging" de Git (les fichiers à commiter).


