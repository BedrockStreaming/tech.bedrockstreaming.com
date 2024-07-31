---
layout: post
title: "Migrate smoothly your Flux isomorphic app to Redux"
description: "How we upgraded your big isomorphic web app from Fluxible to Redux, examples and tips."
author: f_dubost
category:
tags: [react, flux, redux, fluxible, isomorphic, javascript]
feature-img: "images/posts/redux.jpg"
thumbnail: "images/posts/redux.jpg"
comments: true
language: en
---

## Flux, history reminders...

« Flux is the application architecture that Facebook uses for building client-side web applications. » That’s the definition of Flux on the [Facebook website](https://facebook.github.io/flux/). So Flux is just a pattern, not a framework, that goes well with React, but not only. The model is focused on user interactions. Its main strength is the unidirectional data flow that enforces developers to be careful and ensures code consistency when application grows up.

Several libraries propose tools to implement Flux pattern easily. If no one stood out from the crowd at the beginning, now [Redux](https://redux.js.org/), created by [Dan Abramov](https://twitter.com/dan_abramov), is clearly the one that the community have chosen as you can see below. Most Flux based React start kits you can find are based on Redux.

![Redux popularity](/tech.bedrockstreaming.com/public/images/posts/redux/redux-popularity.png)

At M6Web, our [6play web application](/beta-nouveau-6play-react-isomorphic/) is not designed with Redux, but we use [Fluxible](https://fluxible.io/). Fluxible is another Flux library, developed by Yahoo. We chose it back in December 2014, when we started the project, because Fluxible was at the time one of the few tool designed for [isomorphic applications](/isomorphic-single-page-app-parfaite-react-flux/). Moreover it was already used in production by Yahoo.

## Why do we think Redux is a better choice

Even though Fluxible did get the job done, we are now willing to upgrade our application to Redux. Why?

* The popularity of Redux will certainly affect other libraries life and support in the future, maybe Fluxible will be concerned. Fluxible is only supported by a firm and not really by the community.
* Fluxible has a powerful but complex structure based on contexts and plugins. This can be useful, however when new developers come on the project, this is not always easy to understand. We are always searching to make code simpler for maintainability and we think that Redux is a better alternative than Fluxible on this topic.
* For a given feature, developers write less code using Redux because the design is very simple, there is no extra boilerplate, the flow is condensed as much as possible. As a consequence, unit tests are easier to write.
* There are very useful tools about Redux that make Developer eXperience better. For instance, the Redux DevTools allows to time travel live between Flux events. The middleware concept extending capabilities of actions is also interesting.
* We are beginning to make our development processes converge. Every new React project here starts on Redux, including the Proof Of Concept we made with React Native. Using the same libraries made code sharing easier for us.

## Migrating a big app from Fluxible to Redux is crazy, isn’t it?

6play is a very big web application. How to migrate to Redux in a reasonable amount of time and without risk?

We were quite sure that Redux and Fluxible could work together. The goal would be to migrate gradually to Redux without having to remove Fluxible in one giant step. First of all, because we can’t mobilise enough resources to do this in a relatively short time. Secondly, we want to avoid a big deploy in production and potentially critical bugs (even though our application is [well tested](/tests-fonctionnels-app-js/), there are always cases that we can’t control like memory load for example).

We tried it… And we succeeded! And this is quite simple.

First, we define the store configuration like other Redux application.

{% highlight javascript %}
// configureStore.js

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';

import myReducer1 from './modules/myModule1/myModule1.reducer';
import myReducer2 from './modules/myModule2/myModule2.reducer';

export default initialState => createStore(
  combineReducers({myReducer1, myReducer2}),
  initialState,
  compose(
    applyMiddleware([thunk]),
    canUseDOM && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
{% endhighlight %}

Then we initialize Redux store in our server file. For isomorphic purposes, we have to serialize stores' state and give it to the html so that client side can take control of the application with server's data. So here, we build data for the client by combining Redux and Fluxible states.

{% highlight javascript %}
// server.js

import {provideContext} from 'fluxible-addons-react';
import {match, RouterContext} from 'react-router';
import configureStore from './configureStore';

processAppRequest() {
  // ...

  const fluxibleContext = FluxibleApp.createContext();
  const reduxStore = configureStore(initialState);

  match({routes: FluxibleApp.getComponent(), location: url}, (error, redirectLocation, routerState) => {
    // ...

    // Original Fluxible root element
    const rootElement = React.createElement(
      provideContext(RouterContext, customContextTypes),
      {...routerState, context: fluxibleContext.getComponentContext()}
    );

    // Now with Redux
    const markup = ReactDOMServer.renderToString(
      React.createElement(Provider, {store: reduxStore}, rootElement)
    );

    // Build state for client
    const finalState = {
      ...FluxibleApp.dehydrate(fluxibleContext),
      reduxStoreState: reduxStore.getState()
    };

    // Then build the response layout with the markup and the whole state as usual
    // ...
  }
}
{% endhighlight %}

On client side, we do the opposite operation.

{% highlight javascript %}
// client.js

import {provideContext} from 'fluxible-addons-react';
import {Router, browserHistory} from 'react-router';
import configureStore from './configureStore';

const dehydratedState = window[stateVarName];
const reduxStore = configureStore(dehydratedState.reduxStoreState);

// Fluxible rehydrate its state
app.rehydrate(dehydratedState, (error, fluxibleContext) => {
  // ...

  // Original Fluxible root element
  const rootElement = React.createElement(provideContext(Router, customContextTypes), {
    history: browserHistory,
    routes: app.getComponent(),
    context: fluxibleContext.getComponentContext()
  });

  // Now with Redux
  ReactDOM.render(
    React.createElement(Provider, {store: reduxStore}, rootElement),
    document.getElementById(rootId)
  );
});
{% endhighlight %}

And that’s it! We can now use Redux in our component as usual, in combination with Fluxible. We can define actions and reducers for new features (instead of using Fluxible) but we can also transform progressively some Fluxible stores and actions into Redux flow, this is very easy. API requests stay in actions but data processing moves to reducers. Then data sorting and filtering logic in Fluxible stores moves to [selectors](https://redux.js.org/docs/recipes/ComputingDerivedData.html).

## Components connection to stores

### Two files to rule them all

With Fluxible, we linked components with stores through `connectToStore` in the same file and exported only the connected component. But we think now it is a bad practice:

* splitting data fetching from stores and display logic is interesting for maintainability and code understanding,
* it is much easier to unit test the component without the connection to store, `connectToStores` (Fluxible) or `connect` (Redux) methods are parts of a 3rd-party library, and we don’t need to test it.

From now on, components are files named `*.component.js` and stores connections are in `*.connector.js` files in the same folder. We can link a component both with Redux and Fluxible stores.

{% highlight javascript %}
// myComponent.connector.js

import MyComponent from './myComponent.component';

// Stores
import connectToStores from 'fluxible-addons-react/connectToStores';
import {connect} from 'react-redux';
import MyFluxibleStore from '../stores/myFluxible.store';

// Utils
import {getSomeDataFromState} from '../myModule.selectors';

// Redux
export const mapStateToProps = (state, props) => {
  return {dataFromRedux: getSomeDataFromState(state, props.myProps2)};
};

// Fluxible
export default connectToStores(
  connect(mapStateToProps)(MyComponent),
  [MyFluxibleStore],
  (context, props) => ({
    dataFromFluxible: context.getStore(MyFluxibleStore).getSomeData(props.myProps1)
  })
);
{% endhighlight %}

We export `mapStateToProps` function because in a few cases it contains logic that may be interesting to unit test.


### Stores connections order

In this example, the link to Fluxible store is higher in components tree than the Redux one as we can see below.

![Component tree](/tech.bedrockstreaming.com/public/images/posts/redux/component-tree.png)

It means that if Redux state changes, the Fluxible wrapper component won’t be reloaded but in the reverse case, both Fluxible and Redux wrapper components will rerender. In most scenarios, it doesn’t matter. Connection order of Redux and Fluxible is significant in two situations:

* If one connection depends on data stored in the other library state, it has to be lower in components tree.

{% highlight javascript %}
// myComponent.connector.js

import MyComponent from './myComponent.component';

// Stores
import connectToStores from 'fluxible-addons-react/connectToStores';
import {connect} from 'react-redux';
import MyFluxibleStore from '../stores/myFluxible.store'

// Utils
import {getSomeDataFromState} from '../myModule.selectors';

// Fluxible wrapper depends on data from Redux state
const MyComponentFluxibleConnector = connectToStores(
MyComponent,    
  [MyFluxibleStore],
  (context, props) => ({
    dataFromFluxible: context.getStore(MyFluxibleStore).getSomeDataFromReduxState(props.myPropsFromRedux)
  })
);

// Redux
export const mapStateToProps = state => {
  return {myPropsFromRedux: getSomeDataFromState(state)};
};

export default connect(mapStateToProps)(MyComponentFluxibleConnector);
{% endhighlight %}

* If the higher connection is made on Fluxible stores (like first example of `myComponent.connector.js`), data passed to props must be immutable otherwise it can cause edge effects. Indeed, Redux wrapper component checks if it has to rerender when props change by [comparing their references](https://github.com/reactjs/react-redux/blob/v4.4.5/src/components/connect.js#L216). So, if we mutate data in Fluxible store when dispatch is handled, references don’t change and Redux wrapper (and sub-components) will not rerender (unless you tell the `connect` method that your component isn’t ["pure"](https://github.com/reactjs/react-redux/blob/v4.4.5/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)).

If we watch carefully to those particular cases, we will succeed in our quest!


In a nutshell, Redux can easily work in addition to Fluxible (and certainly to other Flux libraries), most likely because of the lightness of its implementation. It is very convenient to upgrade smoothly a big application on Redux! But be aware that it is only a transitory situation, the final goal is to use only Redux. We wrote 50% less code with this upgrade, not bad... Developers are lazy, don’t forget this! If you have some feedback on Redux and/or Fluxible, don’t hesitate to share your experience with us :)

