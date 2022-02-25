---
layout: post
title: "Tests E2E sur son application AngularJS avec Protractor"
description: "Comment mettre en place des tests E2E sur son application AngularJS : outils et problématiques."
author: cytron
category:
tags: [qualite, tests, javascript, angular, protractor, cytron]
feature-img: "images/posts/cytron/protractor.jpg"
thumbnail: "images/posts/cytron/protractor.jpg"
comments: true
permalink: tests-e2e-application-angularjs-protractor.html
---

Familier des tests fonctionnels avec Behat et Atoum pour des applications majoritairement PHP, nous l’étions beaucoup moins avec les tests end-to-end pour des applications pures Javascript, qui plus est, sous [AngularJS](https://angularjs.org/). Les tests end-to-end ou tests e2e ne sont autres que des tests fonctionnels dans la domaine du Javascript. L’objectif de cet article est de montrer le cheminement que nous avons emprunté pour mettre en place ces tests sur une de nos applications et pour gérer les difficultés qui en ont découlé.

### Le contexte

Il s’agit d’une application web présentant des écrans différents à l’utilisateur en fonction des données contenues dans un fichier distant requêté à intervalle régulier court (quelques secondes). L’utilisateur est invité ou non à agir avec les vues, principalement en appuyant sur des boutons, qui changent l’état interne de l’application et peut, a posteriori, influer sur les écrans suivants.

### Mettre en place Protractor

La première étape consiste à installer [Protractor](https://angular.github.io/protractor/#/), framework de tests e2e dédié à AngularJS et utilisant Node.js. Si vous utilisez Grunt pour gérer les tâches de build de votre projet, il suffit d'exécuter la commande :
{% highlight bash %}
npm install grunt-protractor-runner --save-dev
{% endhighlight %}
 
Puis on crée le fichier de configuration dans le projet :
{% highlight js %}
/* protractor-local.conf.js */
exports.config =  {
  specs: ['app/**/*.e2e.js'],
  baseUrl: 'https://localhost:9000/'
};
{% endhighlight %}

Tous les tests e2e de notre application sont écrits dans des fichiers javascript dont le nom est suffixé par `.e2e.js`. Nous avons en effet fait le choix d'une architecture modulaire se retrouvant dans l'organisation des dossiers de notre projet : les fichiers de tests e2e se trouvent dans les mêmes répertoires que les controllers auxquels ils sont rattachés [^1].

### Un navigateur pour mes tests

Pour exécuter ses tests dans les conditions réelles de son application, il faut un navigateur. Nous développons sur un serveur distant en SSH. Le seul navigateur utilisable est donc un browser headless, le plus connu et utilisé étant [PhantomJS](https://phantomjs.org/). Cependant, combiné à Protractor, ce dernier est particulièrement instable pour le moment et il n'est pas recommandé de l'utiliser. Nous optons donc pour Chrome (via le plugin chromedriver). Nécessitant une interface graphique, nous ne pourrons donc pas lancer nos tests sur le serveur de développement mais nous devrons le faire en local sur nos machines.

{% highlight js %}
/* protractor-local.conf.js */
exports.config =  {
  specs: ['app/**/*.e2e.js'],
  baseUrl: 'https://localhost:9000/',
  maxSessions: 1,
  multiCapabilities: [
    { browserName: 'chrome' }
  ]
};
{% endhighlight %}
On installe les binaires nécessaires au lancement de Chrome via Protractor :

{% highlight bash %}
./node_modules/grunt-protractor-runner/node_modules/.bin/webdriver-manager update
{% endhighlight %}

Puis on ajoute les tâches Grunt :
{% highlight js %}
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
  'build',
  'connect:dist',
  'protractor:local'
]);
{% endhighlight %}

### Intégration continue

L'ensemble de nos projets joue automatiquement leurs tests sur un serveur Jenkins commun qui ne dispose pas de navigateurs graphiques. Nous aurions pu mettre en place au sein de notre infrastructure un serveur Selenium pour répondre à cette problèmatique. Mais les contraintes du projet ne nous autorisaient pas à y consacrer le temps nécessaire. Nous avons donc opté pour une solution tiers plus rapide à mettre en œuvre : [SauceLabs](https://saucelabs.com/), plateforme de tests hébergée dans le “cloud”.

Une fois enregistré sur le site, on crée un nouveau fichier de configuration Protractor :

{% highlight js %}
/* protractor-saucelabs.conf.js */
exports.config =  {
  specs: ['app/**/*.e2e.js'],
  baseUrl: 'https://localhost:9000/',
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
{% endhighlight %}

Notons que l'on peut lancer ses tests sur autant de couples OS/navigateurs que l'on souhaite en remplissant le tableau `multiCapabilities`. Le fichier de configuartion Grunt doit être adapté pour lancer *SauceConnect*, l’interface entre SauceLabs et l’application, avant le démarrage des tests :

{% highlight js %}
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
    'build',
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
{% endhighlight %}

Avec cette configuration, nous lançons les tests en local sur notre machine avec la commande `grunt test-e2e:local` ou à distance sur SauceLabs avec `grunt test-e2e`.

### Notre premier test

Le premier test que nous avons écrit pour valider l’architecture est plutôt basique :

{% highlight js %}
describe('Controller: MainCtrl', function () {
  it('should work', function () {
    browser.get(browser.baseUrl);
    expect(true).toBe(true);
  })
});
{% endhighlight %}

On remarque que l’écriture d’un test e2e utilise, comme les tests unitaires, la syntaxe du framework [Jasmine](https://jasmine.github.io/) : un bloc `describe` regroupe une suite de tests définis dans des blocs `it`. Les variables de configuration définies dans les fichiers de configuration Protractor sont utilisables via la variable globale `browser`, variable qui nous permettra d’entretenir le lien entre nos tests et le code exécuté dans le navigateur. Pour mieux appréhender les étapes du processus et les erreurs qui se produisent, il est en effet très important de bien comprendre la séparation entre le code Javascript exécuté dans Node.js via Protractor, qui correspond au déroulement des tests, et le code Javascript de notre application qui lui est exécuté dans le browser et avec lequel on ne peut interagir depuis les tests que par certaines fonctions du framework (`element`, `executeScript`, `addMockModule`, etc.)[^2]. Ce sont deux univers d'exécution bien distincts.

### Débugger avec Protractor

Lorsque vous lancerez les tests en local, vous remarquerez que Chrome est réellement exécuté mais vous ne verrez pas grand chose car l’affichage est bien trop rapide. Il est possible de mettre des points d’arrêt dans ses tests pour y voir plus clair et pour, par exemple, consulter la console Javascript du navigateur. Pour cela, il faut utiliser la fonction `browser.debugger()` comme point d’arrêt et ajouter l’option `debug` dans la configuration Grunt : 

{% highlight js %}
/* Gruntfile.js */
protractor: {
  local: {
    options: {
      configFile: 'protractor-local.conf.js',
      debug: true
    }
  }
}
{% endhighlight %}

Pour passer d’un point d’arrêt à l’autre, on saisit `c` comme *continue*. Notez que cela ne fonctionnera pas si vous avez plus d'un navigateur dans le tableau `multiCapabilities` de votre configuration.

On peut également ajouter l’option `--debug` à la commande `grunt test-e2e:local` pour afficher l’ensemble des requêtes lancées par l’application.

### Mocker sa config

Comme souvent dans les projets AngularJS, nous utilisons un module pour définir nos variables de configuration :

{% highlight js %}
angular.module("config", [])
  .constant("config", {
    'ma_variable': 'une_valeur'
  });
{% endhighlight %}

Dans les tests e2e, on veut tout tester, en particulier les comportements qui diffèrent en fonction des valeurs de configuration. Comment faire puisque ce module est chargé une fois pour toute au lancement de l’application ? Protractor introduit la fonction `addMockModule` qui permet de bouchonner à la volée un module Angular.

{% highlight js %}
it('comportement avec une autre valeur', function () {
  browser.addMockModule('config', function () {
  	angular.module('config', []).constant('config', {
    		'ma_variable': 'une_autre_valeur'
  	});
  });

  // mon test
  
  browser.removeMockModule('config');
});
{% endhighlight %}

### Mocker le service `$http`

Dans notre application, un fichier externe est requêté régulièrement via le service Angular `$http`. AngularJS fournit déjà un mock complet de ce service nommé [`$httpBackend`](https://docs.angularjs.org/api/ngMock/service/$httpBackend). Pour y avoir accès, il faut ajouter la dépendance `angular-mocks` en `devDependencies` dans son fichier `bower.json` et inclure le fichier `bower_components/angular-mocks/angular-mocks.js` dans l’application en développement. `$httpBackend` permet de définir quels appels HTTP doivent être interceptés et quelles réponses doivent être renvoyées.


La difficulté dans notre cas réside dans le fait de pouvoir simuler le changement d’état du fichier distant dans un même test pour pouvoir vérifier les changements de vue qui en découlent. Il est possible de le faire directement via `$httpBackend` moyennant quelques acrobaties, mais la librairie [HttpBackend](https://github.com/nchaulet/httpbackend) simplifie grandement son utilisation pour ce type de tests [^3].

{% highlight js %}
var HttpBackend = require('httpbackend');  
var backend;

describe('Test workflow', function() {  
  beforeEach(function() {
    backend = new HttpBackend(browser);
  });

  afterEach(function() {
    backend.clear();
  });

  it('should display result when status is changed to RESULT', function(done) {
    backend.whenJSONP(/status.json/).respond({status: 'initial'});

    browser.get('/');

    var result = element(by.binding('result'));
    expect(result.getText()).toEqual('no result');
    
    backend.whenJSONP(/status.json/).respond({status: 'result', percentage: 70});
    
    browser.wait(function () {
      return browser.getLocationAbsUrl().then(function (currentUrl) {
        return currentUrl === 'https://localhost:9000/#/result';
      });
    }, 5000).then(function () {
      expect(result.getText()).toEqual('70 %');
      done();
    });
  });
});
{% endhighlight %}

### Oui, mais...
Protractor nous a été indispensable pour implémenter les tests fonctionnels sur notre application car son intégration avec AngularJS offre des possibilités que les autres frameworks de tests fonctionnels n'ont pas. On pense principalement à la synchronisation qui est mise en œuvre entre les tests et l'initialisation d'Angular dans la page ("wait for angular"). Cependant, avec le recul que l'on peut avoir sur notre projet :

* il faut l'avouer, Protractor n'est pas aussi simple à mettre en place que [Behat](https://docs.behat.org/) par exemple,
* le debuggage est assez pénible car les messages d'erreur sont souvent peu verbeux et, c'est l'inconvénénient de tester du javascript avec du javascript, on ne sait pas toujours où se situe l'erreur (dans les tests ou dans le code applicatif ?),
* Protractor est parfois instable avec les webdrivers utilisés, ce qui nous oblige à relancer les tests manuellement,
* nos tests dans SauceLabs sont (très) lents, ce qui nous a contraint à la longue à réduire le nombre de navigateurs testés (améliorant par la même occasion la stabilité des tests).

[^1]: [Scalable code organization in AngularJS](https://medium.com/opinionated-angularjs/scalable-code-organization-in-angularjs-9f01b594bf06)
[^2]: [Protractor API](https://angular.github.io/protractor/#/api)
[^3]: [Angular e2e tests, Mock your backend](https://blog.nchaulet.fr/test-angularjs-app-mock-backend/).
