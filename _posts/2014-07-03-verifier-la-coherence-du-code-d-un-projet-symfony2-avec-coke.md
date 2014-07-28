---
layout: post
title: "Contrôlez facilement votre cohérence de code sur votre projet Symfony2 avec coke"
description: "Voici comment facilement et rapidement mettre en place un système de contrôle de la cohérence du code d'un projet Symfony2 avec coke"
author:
  name:     Mikael Randy
  avatar:   mikaelrandy.png
  email:
  twitter:  techM6Web
  facebook:
  github:
category:
tags: [code sniffing, coke, Symfony2]
image:
  feature:
  credit:
  creditlink:
comments: true
---

Pour qu'un projet persiste dans le temps, il est important que le style de codage soit le même. Et quand vous vous reposez sur des outils, autant faire en sorte que le style de codage retenu soit proche, si ce n'est le même, que les briques que vous utilisez. Et dans le cas où vous utilisez un framework, c'est d'autant plus important.

Dans le cas de Symfony2, c'est d'autant plus marqué que l'architecture des bundles est très marquée, et qu'un coding guide est publié.

Ça, c'est pour la théorie, mais en pratique, si ce n'est pas super simple, automatique, une somme de toutes petites erreurs s'installent et le sentiment d'abandon s'installe vite.

## Coke

Il y a un peu plus d'un an, chez M6Web, nous avons développé [coke](/coke-pour-bien-sniffer-son-code/) pour configurer simplement l'exécution de PHP_CodeSniffer.

Récemment, nous avons ajouté la possibilité d'installer coke via Composer :

{% highlight json %}
{
  "require": {
    "m6web/coke": "~1.2"
  }
}
{% endhighlight %}

L'avantage de passer par Composer, c'est que coke va lui-même installer PHP_CodeSniffer en tant que dépendance Composer (dans le dossier `vendor`), permettant de ne pas avoir à suivre la [fastidieuse procédure d'installation via PEAR](http://pear.php.net/manual/en/guide.users.commandline.installing.php).

## Installer un coding standard via Composer

Lorsque nous voulons utiliser un coding standard qui n'est pas inclus par défaut avec PHP_CodeSniffer, il est possible de l'installer en utilisant Composer

## Symfony2-coding-standard

Chez M6Web, nous maintenons le standard [Symfony2-coding-standard](https://github.com/M6Web/Symfony2-coding-standard) qui permet de valider que le code d'un projet respecte les [coding standard de Symfony2](http://symfony.com/doc/current/contributing/code/standards.html).

Pour rendre à César ce qui appartient à César, nous avons récupéré la base du standard telle que créé par [opensky](https://github.com/opensky).

Si nous avons décidé de le forker, c'est que la structure ne correspondait pas à ce qui nécessaire pour une installation de ce standard via Composer

## Procédure complète, pas-à-pas

Créer le fichier `composer.json` suivant :

{% highlight json %}
{
  "require": {
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
test

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

Pour que cette vérification soit faite automatiquement au commit, il suffit d'ajouter la ligne `./vendor/bin/coke` dans le fichier `.git/hooks/pre-commit`.
