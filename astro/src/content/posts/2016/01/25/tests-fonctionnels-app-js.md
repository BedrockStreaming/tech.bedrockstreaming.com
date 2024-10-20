---
layout: ../../layouts/post.astro
title: "On a testé fonctionnellement notre app JS"
description: "Faire des tests fonctionnels avec Cucumber.js, WebdriverIO et PhantomJS sur une app JS isomorphique."
author: f_dubost 
category:
tags: [tests fonctionnels, javascript, phantomjs, webdriver, Cytron]
feature-img: "../../../../images/posts/cytron/moon.jpg"
comments: true
---

L’utilité des tests fonctionnels pour les applications web n’est plus à démontrer (comment ça, vous ne testez pas encore vos apps ?). Malheureusement, tout ne peut pas être totalement testé fonctionnellement, ou de façon aisée : je pense par exemple au player chez nous, un composant stratégique mais pauvrement testé fonctionnellement de par sa nature un peu hybride (mélange de flash et de JS). Dans tous les cas, pour ce qui peut l’être, nous sommes partisans dans l’équipe Cytron d’user sans mesure (ou presque !) de cet outil de manière à être le plus zen possible au moment d’appuyer sur le bouton “deploy”.

## Quelle stack ?

Notre application est codée en JS isomorphique (ou [Universal JS](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.2srtfrqku)) grâce à [React et Node.js](/beta-nouveau-6play-react-isomorphic/).

Pour les tests fonctionnels, nous utilisons le trio [Cucumber.js](https://github.com/cucumber/cucumber-js) + [WebdriverIO](https://webdriver.io/) + [PhantomJS](https://phantomjs.org/) :

* **Cucumber.js** est l’outil qui permet de dérouler la suite de tests écrits dans la syntaxe [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin),
* **WebdriverIO** permet d’interfacer les tests traduits en JS avec un serveur Selenium (dialoguant grâce au protocole [WebDriver Wire](https://code.google.com/p/selenium/wiki/JsonWireProtocol) et permettant de contrôler un browser),
* **PhantomJS** est le browser dans lequel les scénarios de tests seront exécutés, il embarque son propre serveur Webdriver, [Ghostdriver](https://github.com/detro/ghostdriver).

Toutes [nos Pull Requests lancent les tests indépendamment via Jenkins](/lache-moi-la-branch) dans un environnement “dockerisé”, donc complètement autonome et isolé. De façon à respecter ce principe jusqu’au bout et à ne pas dépendre de données versatiles, nos API sont aussi mockées grâce à [superagent-mock](https://github.com/BedrockStreaming/superagent-mock).

## Setup

### Arborescence
Dans notre projet, nous avons un dossier pour les tests fonctionnels organisés comme suit :

{% highlight bash %}
├─┐ tests
│ ├─┐ step_definitions
│ │ └── my_feature.steps.js
│ ├─┐ screenshots
│ │ └── my_scenario.png
│ ├─┐ support
│ │ ├── config.json
│ │ ├── constants.json
│ │ ├── hooks.js
│ │ └── world.js
│ └── my_feature.feature
{% endhighlight %}

### Features
Une feature est un fichier testant une fonctionnalité de l’application et regroupant plusieurs scénarios de test. Il est écrit en langage naturel (Gherkin) de façon à être lisible par tous.

{% highlight bash %}
# tests/support/cookie.feature
Feature: Scenarios about the cookie banner

  Scenario: See the cookie banner and close it
    Given My browser storage is empty
    When I visit the "homepage" page
    Then I should see the "cookie banner"

    When I click on "Accept cookie"
    Then I should not see a "cookie banner"

    When I visit the "homepage" page
    Then I should not see a "cookie banner"
{% endhighlight %}

### World
Le fichier `world.js` est le point de départ pour Cucumber.js. C’est ici que nous initialisons WebdriverIO et que nous mettons un place un contexte qui sera disponible pour tous les tests.

{% highlight javascript %}
// tests/support/world.js
var Webdriver = require('webdriverio');
var config = require('./config.json');
var assert = require('assert');

var browser = Webdriver.remote({
  logLevel: config.logLevel || 'silent',
  host: config.webdriver.host,
  port: config.webdriver.port,
  waitforTimeout: config.waitTimeout,
  desiredCapabilities: {browserName: 'phantomjs'}
});

function WorldConstructor() {
  var world = {
    browser: browser,

    // Global visit method
    visit: function (baseUrl, params) {
      var pathUrl = url.format({
        pathname: baseUrl,
        query: params
      });

      return this.browser.url(pathUrl);
    },

    // Take screenshot
    screenshot: function (filename) {
      return browser.saveScreenshot(path.join(config.screenshot.path, filename));
    },

    assert: {
      /**
       * Assert if element(s) are visible
       *
       * @param selector    {String}   Can be query multiple DOM elements
       * @param failMessage {String}   Fail message if no visible
       */
      visible: function (selector, failMessage) {
        // ...
      },
    }

    // ...
  }

  return world;
}

module.exports = WorldConstructor;
{% endhighlight %}

### Hooks
Cucumber.js permet de déclencher des traitements sur [certains évènements clés](https://github.com/cucumber/cucumber-js#hooks) lors de l’exécution de la suite de tests. Nous utilisons ce système pour réaliser une capture d’écran sur chaque scénario de test en échec qui viendra s'ajouter dans le dossier `screenshots`.

{% highlight javascript %}
// tests/support/hook.js
var config = require('./config.json');
var sprintf = require('sprintf-js').sprintf;

module.exports = function () {
  this.Before(function (scenario) {
    return this.browser.init().then(function () {
      return this.browser.setViewportSize({
        width: config.screenshot.width,
        height: config.screenshot.height
      });
    }.bind(this));
  });

  this.After(function (scenario) {
    if (scenario.isFailed()) {
      return this.screenshot(sprintf(
        '%s_%d.png',
        scenario.getName().toLowerCase().replace(' ', '-'),
        new Date().getTime()
      )).then(function () {
        return this.browser.end();
      }.bind(this));
    } else {
      return this.browser.end();
    }
  });
};
{% endhighlight %}

### Step definitions
Ce sont les fichiers qui font le lien entre les features (écrit en langage naturel) et WebdriverIO (initialisé dans `world.js`).

{% highlight javascript %}
// tests/step_definitions/cookie.steps.js
var sprintf = require('sprintf-js').sprintf;

module.exports = function () {
  /**
   * Visit a page
   *
   * @param page {String}
   *
   * @require config routes object
   */
  this.When(/^I visit the "([^"]*)" page$/, function (page) {    
    return this.visit(this.getRoute(page)).then(function () {
      return this.assert.existing('#__main', 'React application is not loaded.');
    }.bind(this));
  });

  /**
   * I click on "label"
   *
   * @param label {String}   DOM selector label
   */
  this.When(/^I click on "([^"]*)"$/, function (label) {
    var selector = this.getDOMSelector(label);
    
    return this.action.click(selector);
  });

  /**
   * Assert element matching the given selector is visible.
   *
   * @param label {String}
   *
   * @require config DOMSelectors object
   */
  this.Then(/^I should see a "([^"]*)"$/, function (label) {
    var selector = this.getDOMSelector(label);
    var failMessage = sprintf('%s is not visible', label);
    
    return this.assert.visible(selector, failMessage);
  });

  // ...
}
{% endhighlight %}

### Design
Nous n'avons pas mis en œuvre le [pattern Page Object](https://blog.josephwilk.net/cucumber/page-object-pattern.html). Ce n'était pas un choix délibéré mais le contexte et les enjeux du projet nous ont fait passer à côté, ou ce n'était peut être simplement pas le moment. Malgré tout, nous avons tenté de rationaliser au mieux l'organisation du code. Par exemple, afin de ne pas se retrouver avec des sélecteurs CSS éparpillés dans plusieurs fichiers de “features” ou de “step definitions”, nous avons choisi de les regrouper dans un fichier `constants.json` et d’utiliser seulement des labels ailleurs. Nous faisons le lien entre le label et le sélecteur CSS avec la méthode `getDOMSelector`, visible ci-dessus et définie dans le fichier `world.js`.

### Run 
Pour lancer les tests, il faut :

* lancer le serveur de l’app en local (l’URL du serveur est paramétrable dans le fichier de config),
* lancer un phantomjs en mode webdriver `phantomjs --webdriver=5024` où 5024 est le port du serveur (également configurable dans `config.json`),
* lancer une suite de tests via Cucumberjs, au choix :
  * tous les tests `cucumberjs tests/`,
  * une feature `cucumberjs tests/cookie.feature`,
  * un scénario `cucumberjs tests/cookie.feature:3` où 3 correspond à la ligne du début du scénario ciblé dans le fichier `cookie.feature`.

## Particularité de l’isomorphisme

Deux chemins sont possibles avec l’isomorphisme. Soit l’utilisateur arrive directement sur la page, auquel cas celle-ci sera générée sur le serveur, soit il y arrive en naviguant sur l’app et c’est le client qui aura exécuté le code. Il faut tester ces deux cas car le code concerné n’est pas toujours le même (la variable `window` par exemple n’est pas accessible côté serveur).

Il est bien sûr impossible d’être exhaustif. L’idée est d’abord de couvrir les cas les plus fréquents et les plus critiques pour l’application. Ensuite, il faut s’astreindre à ajouter un test à chaque fois qu’un bug est détecté de façon à s’assurer qu’on ne le rencontrera plus dans le futur.

## PhantomJS, la stabilité en question...

Basé sur Webkit, PhantomJS est le plus connu des navigateurs headless, c’est-à-dire exécutables sans interface visuelle. D’autres navigateurs légers et créés pour les tests fonctionnels existent comme [SlimerJS](https://slimerjs.org/) (basé sur Gecko et pas vraiment headless) ou [Zombie.js](https://zombie.js.org/) (pas de moteur de rendu). Cependant aucun n’offre toutes les fonctionnalités de PhantomJS qui se rapprochent le plus d’un vrai browser. **Il émule de façon transparente tout le rendu graphique** avec la possibilité de réaliser des screenshots par exemple ou de tester la visibilité d’un élément du DOM (non opaque, dans le viewport, sur la couche z-index la plus haute...).

Néanmoins celui-ci n'intègre pas toutes les dernières avancées en terme de JS et de CSS. Flexbox n’est par exemple pas pris en charge ce qui nous a posé quelques problèmes sur les vérifications liées à la visibilité des éléments. Sa version 2.0 qui date de début 2015, malgré la bonne volonté des contributeurs, n’a toujours pas de build officiel sous Linux, ce qui oblige à compiler les sources sur sa machine de tests ou à trouver sur le net un build officieux correspondant à sa distribution. C’est ce que nous avons fait via [M6Web/phantomjs2](https://github.com/BedrockStreaming/phantomjs2). Cependant, l’outil est assez instable (builds officiels ou pas) et nous avons rencontré beaucoup de crashs aléatoires ou reproductibles mais incompréhensibles (dus par exemple à l’ajout de quelques lignes de CSS anodines...).

En local, sur sa machine, PhantomJS est encore moins stable que sur Jenkins. Il semblerait qu’exécution après exécution, il garde des “choses” en cache quelque part qui, à terme, produisent des crashs systématiques de l’outil. Nous n'avons pas réussi à établir un scénario reproductible qui nous permette de poser une issue sur le projet. N'hésitez pas à réagir en commentaire si vous vous êtes trouvé dans un cas similaire.

Pour régler temporairement ce problème, nous avons utilisé l’[image docker de Gabe Rosenhouse](https://github.com/rosenhouse/phantomjs2) pour le faire tourner dans un environnement indépendant mais ce n’est pas faciliter la vie des développeurs qui veulent juste lancer des tests sans avoir à mettre en œuvre une usine à gaz derrière.

*Edit: hier, la version 2.1 de PhantomJS a (enfin) été publiée avec [un build pour chaque plateforme](https://phantomjs.org/download.html). Plusieurs de nos soucis pourraient être réglés avec cette nouvelle release, à suivre...*

## Chrome+ChromeDriver, une alternative ?

Nous avons alors opté pour la solution Chrome+ChromeDriver. [ChromeDriver](https://code.google.com/p/selenium/wiki/ChromeDriver) a le rôle du serveur Selenium qui permet de faire communiquer WebriverIO avec Chrome. Les avantages de cette stack sont multiples. D’abord, l’ensemble est beaucoup **plus stable**, fini les crashs impromptus. Ensuite, le **debug des tests** en échec est bien plus aisé : on voit en effet la suite se jouer en temps réel dans son navigateur, on peut ainsi tout à fait mettre un point d’arrêt et utiliser la console de développement. Enfin, on utilise la version de Chrome que l’on souhaite, donc **plus de problème de CSS non supportés**.

Alors pourquoi se cantonner à n’utiliser Chrome+ChromeDriver qu’en local et pas en intégration continue sur Jenkins ? Chrome n’est pas un browser headless et a besoin d’une interface visuelle qui n’est pas disponible sur Jenkins. Il existe des solutions pour simuler un affichage graphique avec [Xvfb](https://www.x.org/archive/X11R7.6/doc/man/man1/Xvfb.1.xhtml) par exemple. Nous avons tenté de mettre en place une telle stack sur l’image docker utilisée pour créer notre environnement de test sur Jenkins en se basant sur l’[image de Rob Cherry](https://github.com/RobCherry/docker-chromedriver). Malheureusement, après y avoir consacré un peu d’énergie, le résultat n’a pas été au rendez-vous car :

* l'exécution des tests dans Chrome est bien plus lente que sur PhantomJS (2 à 3 fois plus lent), notre intégration continue prenant déjà plus de 10 minutes sur ce projet,
* il semble difficile d’obtenir ici aussi une stabilité du dispositif, les sessions Webdriver étaient souvent perdues, sans que nous en trouvions la cause.

Ces raisons nous ont conduit à abandonner cette piste.

## Quelques tips pour améliorer la stabilité de ses tests

Nous avons continué d’espérer avoir une stack stable pour nos tests fonctionnels. Avec persévérance, nous pouvons dire qu’à l’heure actuelle grâce à ces quelques tips, nous avons une plateforme de test stable (à 99%) !

### waitUntil
C’est la première chose à faire et la plus importante de notre point de vue. On ne sait jamais vraiment quand un élément s’affichera dans la page car son chargement dépend de trop de facteurs non prédictibles (la connexion, l’utilisation cpu, gpu, mémoire, etc.). Sur notre projet, nous avons par exemple beaucoup d’animations CSS qui retardent le timing d’apparition des pages et des éléments du DOM. Notre première approche a été de rajouter des `sleep` un peu de partout dans nos tests. Chose à ne pas faire. L’usage des `sleep` doit être cantonné à des cas très spécifiques. Pour tout le reste, il faut user et abuser du [`waitUntil`](https://webdriver.io/api/utility/waitUntil.html) de WebdriverIO, que ce soit pour des actions ou des vérifications dans la page, et en adaptant le timeout à votre projet (certaines de nos animations sont assez longues).

### rollover
Un autre problème que nous avons rencontré est la bonne exécution des rollovers. En utilisant la méthode [`moveToObject`](https://webdriver.io/api/action/moveToObject.html) pour pointer la souris sur un élément, il nous arrivait que le comportement “hover” ne soit pas déclenché, mettant en échec la suite du test. Nous avons donc changé notre manière d’effectuer le rollover : on répète l’action grâce au `waitUntil` tant que l’élement devant apparaître au hover n’est pas visible.

Nous n’écrivons plus
{% highlight bash %}
I rollover the "Header login icon"
{% endhighlight %}
mais
{% highlight bash %}
I rollover the "Header login icon" to make "Submenu" appear
{% endhighlight %}

### rerun
[“Rerun”](https://github.com/cucumber/cucumber-js#formatters) est une fonctionnalité existante sur d’autres frameworks de tests fonctionnels tel que Behat et créée pour les tests récalcitrants encore instables. Elle permet de stocker dans un fichier texte la liste des scénarios en échec pour les relancer ensuite afin de vérifier qu’ils le sont réellement. Nous avons mis en place ce process sur Jenkins, bien qu’il y ait [quelques subtilités qui ne facilitent pas la tâche](https://github.com/cucumber/cucumber-js/issues/499) (mais qui devraient être bientôt corrigées), et nous en sommes satisfaits.

### isVisible
A nos débuts, nous avons eu quelques problèmes avec la fonction [`isVisible`](https://webdriver.io/api/state/isVisible.html) de WebdriverIO car les éléments opaques ou en dehors du viewport étaient considérés comme visibles. Nous avons alors choisi d’utiliser [une fonction custom](https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433) injectée via [`execute`](https://webdriver.io/api/protocol/execute.html). Récemment, dans la version 3 de WebdriverIO, la fonction [isVisibleWithinViewport](https://webdriver.io/api/state/isVisibleWithinViewport.html) a fait son apparition mais nous n'avons pas encore tenté de l'utiliser dans nos tests.

Cet article est un retour d’expérience sur notre usage des tests fonctionnels sur un projet précis mais il est loin d’exposer des vérités absolues. Si vous avez des remarques ou n’êtes pas d’accord avec certaines choses, n’hésitez pas à nous le faire savoir !
