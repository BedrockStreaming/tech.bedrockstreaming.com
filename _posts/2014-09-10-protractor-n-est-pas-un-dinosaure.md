---
layout: post
title: "Non, Protractor n'est pas un dinosaure"
description: "Comment mettre en place des tests E2E sur son application AngularJS : outils et problématiques."
author:
  name: Team Cytron
  avatar: cytron.png
  email:
  twitter: techM6Web
  facebook:
  github:
category:
tags: [qualite, tests, protractor, angular, grunt, cytron]
image:
  feature: posts/cytron/protractor.jpg
  credit: 
  creditlink: 
comments: true
permalink: test-e2e-pour-angularjs-avec-protractor.html
---

Familier des tests fonctionnels avec Behat et Atoum pour des applications majoritairement PHP, nous l’étions beaucoup moins avec les tests end-2-end pour des applications pures Javascript, qui plus est, sous [AngularJS](https://angularjs.org/). L’objectif de cet article est de montrer le cheminement que nous avons emprunté pour mettre en place ces tests sur une de nos applications et pour gérer les difficultés qui en ont découlées.

#### Le contexte

Il s’agit d’une application web présentant des écrans différents à l’utilisateur en fonction des données contenues dans un fichier distant requêté à intervalle régulier court (quelques secondes). L’utilisateur est invité ou non à agir avec les vues, principalement en appuyant sur des boutons, qui change l’état interne de l’application et peut, a posteriori, influer sur les écrans suivants.

#### Mettre en place Protractor

La première étape consiste à installer [Protractor](http://angular.github.io/protractor/#/), framework de tests e2e dédié à AngularJS et utilisant Node.js. Si vous utilisez Grunt pour gérer les tâches de build de votre projet, il suffit d'exécuter la commande :
```
npm install grunt-protractor-runner --save-dev
```
 
Puis on crée le fichier de configuration dans le projet :
```js
/* protractor-local.conf.js */
exports.config =  {
  specs: ['app/**/*.e2e.js'],
  baseUrl: 'http://localhost:9000/'
};
```

#### Un navigateur pour mes tests

Pour exécuter ses tests dans les conditions réelles son application, il faut un navigateur. Nous développons sur un serveur distant en SSH. Le seul navigateur utilisable est donc un browser headless, le plus connu et utilisé étant [PhantomJS](http://phantomjs.org/). Cependant, combiné à Protractor, ce dernier est particulièrement instable pour le moment et il n'est pas recommandé de l'utiliser. Nous optons donc pour Chrome (via le plugin chromedriver). Nécessitant une interface graphique, nous ne pourrons donc pas lancer nos tests sur le serveur de développement mais nous devrons le faire en local sur nos machines.

```js
/* protractor-local.conf.js */
exports.config =  {
  specs: ['app/**/*.e2e.js'],
  baseUrl: 'http://localhost:9000/',
  maxSessions: 1,
  multiCapabilities: [
    { browserName: 'chrome' }
  ]
};
```
On installe les binaires nécessaires au lancement de Chrome via Protractor :

```
./node_modules/.bin/webdriver-manager update
```

Puis on ajoute les tâches Grunt :
```js
/* Gruntfile.js */
grunt.initConfig({
  connect: {
    dist: {
      options: {
        port: 9000,
        hostname: 'localhost',
        base: 'dist'
      }
    }
  },
  protractor: {
    local: {
      options: {
        configFile: "protractor-local.conf.js"
      }
    }
  }
});

grunt.registerTask('test', [
  'connect:dist',
  'protractor:local'
]);
```

#### Intégration continue

L'ensemble de nos projets jouent automatiquement leurs tests sur un serveur Jenkins commun qui ne dispose pas de navigateurs graphiques. Nous aurions pu mettre en place au sein de notre infrastructure un serveur Selenium pour répondre à cette problèmatique. Mais les contraintes du projet ne nous autorisaient pas à y consacrer le temps nécessaire. Nous avons donc opté pour une solution tiers plus rapide à mettre en œuvre : [SauceLabs](https://saucelabs.com/), plateforme de tests hébergée dans le “cloud”.

Une fois son compte créé, on crée un nouveau fichier de configuration Protractor :

```js
/* protractor-saucelabs.conf.js */
exports.config =  {
  specs: ['app/**/*.e2e.js'],
  baseUrl: 'http://localhost:9000/',
  allScriptsTimeout: 30000,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000
  },
  maxSessions: 1,
  sauceUser: 'mySauceUser',
  sauceKey: 'mySauceKey',
  multiCapabilities: [
    {
      browserName: 'chrome',
      platform: 'Linux'
    },
    {
      browserName: 'firefox',
      platform: 'Linux'
    },
    {
      browserName: 'safari',
      platform: 'OS X 10.9'
    },
    {
      browserName: 'chrome',
      platform: 'Windows 8.1'
    }
  ]
};
```

Notons que l'on peut lancer ses tests sur autant de couples OS/navigateurs que l'on souhaite en remplissant le tableau `multiCapabilities`. Le fichier de configuartion Grunt doit être adapté pour lancer *SauceConnect*, l’interface entre SauceLabs et l’application, avant le démarrage des tests :

```js
/* Gruntfile.js */
grunt.initConfig({
  connect: {
    dist: {
      options: {
        port: 9000,
        hostname: 'localhost',
        base: 'dist'
      }
    }
  },
  protractor: {
    local: {
      options: {
        configFile: 'protractor-local.conf.js'
      }
    },
    saucelabs: {
      options: {
        configFile: 'protractor-saucelabs.conf.js'
      }
    }
  },
  run: {
    installsc: {
      options: {
        wait: true
      },
      cmd: 'bash',
      args: [
        '-c',
        'test -d sc-4.2-linux || (wget https://saucelabs.com/downloads/sc-4.2-linux.tar.gz && tar xvf sc-4.2-linux.tar.gz)'
      ]
    },
    sauceconnect: {
      options: {
        wait: false,
        quiet: true,
        ready: /Sauce Connect is up/
      },
      cmd: './sc-4.2-linux/bin/sc',
      args: [
        '-u',
        'mySauceUser',
        '-k',
        'mySauceKey'
      ]
    }
  }
});
  

grunt.registerTask('test-e2e', function (target) {
  var tasks = [
    'connect:dist'
  ];

  if (target === 'local') {
    tasks.push('protractor:local');
  } else {
    tasks.push('run:installsc');
    tasks.push('run:sauceconnect');
    tasks.push('protractor:saucelabs');
    tasks.push('stop:sauceconnect');
  }

  grunt.task.run(tasks);
});
```

Avec cette configuration, nous pouvez lancer nos tests en local sur notre machine avec la commande `grunt test-e2e:local` ou à distance sur SauceLabs avec `grunt test-e2e`.

#### Notre premier test

Le premier test que nous avons écrit pour valider l’architecture est plutôt basique :

```js
describe('Controller: MainCtrl', function () {
  it('should work', function () {
    browser.get(browser.baseUrl);
    expect(true).toBe(true);
  })
});
```

On remarque que l’écriture d’un test e2e utilise, comme les tests unitaires, la syntaxe du framework [Jasmine](http://jasmine.github.io/) : un bloc `describe` regroupe une suite de tests définis dans des bloc `it`. Les variables de configuration définies dans les fichiers de configuration Protractor sont utilisables via la variable globale `browser`, variable qui nous permettra d’entretenir le lien entre nos tests et le code exécuté dans le navigateur. Pour mieux appréhender les étapes du processus et les erreurs qui se produisent, il est effet très important de bien comprendre la séparation entre le code Javascript exécuté dans Node.js via Protractor, qui correspond au déroulement des tests, et le code Javascript de notre application qui lui est exécuté dans le browser et avec lequel on ne peut interagir depuis les tests que par certaines fonctions du framework (`element`, `executeScript`, `addMockModule`, etc.). Ce sont deux univers d'execution bien distincts.

#### Débugger avec Protractor

Lorsque vous lancerez les tests en local, vous remarquerez que Chrome est réellement exécuté mais vous ne verrez pas grand chose car l’affichage est bien trop rapide. Il est possible de mettre des points d’arrêt dans ses tests pour y voir plus clair et pour, par exemple, consulter la console Javascript du navigateur. Pour cela, il faut utiliser la fonction `browser.debugger()` comme point d’arrêt et ajouter l’option `debug` dans la configuartion Grunt : 

```js
/* Gruntfile.js */
protractor: {
  local: {
  	options: {
    	configFile: 'protractor-local.conf.js',
    	debug: true
  	}
  }
}
```

Pour passer d’un point d’arrêt à l’autre, on saisit `c` comme continue.
On peut également ajouter l’option `--debug` à la commande `grunt test-e2e:local` pour afficher l’ensemble des requêtes lancées par l’application.

#### Mocker sa config

Comme souvent dans les projets AngularJS, nous utilisons un module pour définir nos variables de configuration :

```js
angular.module("config", [])
  .constant("config", {
    'ma_variable': 'une_valeur'
  });
```

Dans les tests e2e, on veut tout tester, en particulier les comportements qui diffèrent en fonction des valeurs de configuration. Comment faire puisque ce module est chargé une fois pour toute au lancement de l’application ? Protractor introduit la fonction `addMockModule` qui permet de bouchonner à la volée un module Angular.

```js
it('comportement avec une autre valeur', function () {
  browser.addMockModule('config', function () {
  	angular.module('config', []).constant('config', {
    		'ma_variable': 'une_autre_valeur'
  	});
  });

  // mon test
  
  browser.removeMockModule('config');
});
```

#### Mocker le service `$http`

Dans notre application, un fichier externe est requêté régulièrement via le service Angular `$http`. AngularJS fournit déjà un mock complet de ce service nommé `$httpBackend`. Pour y avoir accès, il faut ajouter la dépendance `angular-mocks` en `devDependencies` dans son fichier `bower.json` et inclure le fichier `bower_components/angular-mocks/angular-mocks.js` dans l’application en développement. `$httpBackend` permet de définir quels appels HTTP doivent être interceptés et quelles réponses doivent être renvoyées.


La difficulté dans notre cas réside dans le fait de pouvoir simuler le changement d’état du fichier distant dans un même test pour pouvoir vérifier les changements de vue qui en découlent. Il est possible de le faire directement via `$httpBackend` moyennant quelques acrobaties, mais la librairie [HttpBackend](https://github.com/nchaulet/httpbackend) simplifie grandement son utilisation pour ce type de tests.

Exemple

cf article Nico Chaulet : http://blog.nchaulet.fr/test-angularjs-app-mock-backend/


Lien vers l’api de Protractor : https://github.com/angular/protractor/blob/master/docs/api.md

Conclusion, ressenti : pas aussi simple à mettre en place qu’un Behat, assez difficile à debugger car manque de messages (+ du javascript dans du javascript : où se situe réellement mon erreur ?)
