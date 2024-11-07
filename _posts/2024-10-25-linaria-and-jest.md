---
layout: post
title: Use Jest with Linaria in a React App
description: How do we make Linaria and Wyw-in-js coexist with Jest
author: [a_guinet]
tags: [test, css, frontend, react, linaria, jest]
color: rgb(251,87,66)
language: en
---

## Overview
At [Bedrock](https://bedrockstreaming.com/), we constantly seek to enhance our technical stack to better serve our clients. One of our ongoing challenges is managing CSS effectively in our web applications.

Currently, we use [styled-components](https://styled-components.com/) for CSS-in-JS. While it has served us well, we’ve encountered several limitations:
- **Client-Side Generation**: Styled-components generates CSS on the client side, impacting performance.
- **SSR Limitations**: Server-side rendering (SSR) is limited, which affects our ability to deliver optimized content quickly.
- **Bundle Size**: The tool adds significantly to our bundle size, which we aim to reduce.

We explored multiple alternatives to replace styled-components, ultimately selecting [Linaria](https://linaria.dev/) as our preferred solution.

Migrating to Linaria has posed several challenges, especially given our codebase spans over a decade. Testing was one of the major areas impacted. In this article, we’ll share our approach, the challenges we faced, and the solutions we implemented.

## Tool for testing
For our tests, we use [Jest](https://jestjs.io/). This popular testing framework within the React community is well-regarded for its simplicity and powerful features, making it an ideal choice for our test suite.

## What is Linaria?
[Linaria](https://linaria.dev/) is a zero-runtime CSS-in-JS library, ideal for JavaScript applications, particularly with [React](https://react.dev/). Linaria allows us to write CSS directly in our JavaScript, providing an efficient way to manage component styling within a large application while aiming to enhance performance.

In the sections that follow, we’ll delve into how we set up Linaria with Jest for testing and the workarounds we used to overcome specific integration challenges.

## Introducing Wyw-in-js
Starting with Linaria version 6.0.0, a new tool called [Wyw-in-js](https://wyw-in-js.dev/) has been introduced to manage the build process. This tool centralizes all configuration settings, making it easier to manage styles.

Wyw-in-js operates during the compilation process, specifically with [Webpack](https://webpack.js.org/), to generate CSS. It parses JavaScript files that contain styles and transforms them into CSS files.

To achieve this, Wyw-in-js stores all files in your computer's memory, then reads and processes them accordingly. It also provides flexibility for developers to modify this behavior. Our solution is to create intermediate files that we can use to read and manage the CSS for our application, enabling us to utilize it in our tests.

## Practical Setup
### Setting Up a React Project with Linaria
Create a New Directory:

```bash
mkdir react-linaria-jest
cd react-linaria-jest
```
Add package.json for Dependency Management: Create a package.json file with the following content:

```json
{
  "name": "wyw-js-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve --mode development --open",
    "build": "webpack --mode production",
    "test": "jest"
  },
  "dependencies": {
    "@linaria/core": "^6.2.0",
    "@linaria/react": "^6.2.1",
    "@wyw-in-js/babel-preset": "^0.5.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@babel/core": "^7.25.8",
    "@babel/preset-env": "^7.25.8",
    "@babel/preset-react": "^7.25.7",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@wyw-in-js/webpack-loader": "^0.5.4",
    "babel-jest": "^29.7.0",
    "babel-loader": "^9.2.1",
    "css-loader": "^7.1.2",
    "html-webpack-plugin": "^5.6.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "jest-transform-css": "^6.0.1",
    "mini-css-extract-plugin": "^2.9.1",
    "style-loader": "^4.0.0",
    "webpack": "^5.95.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^5.1.0"
  }
}
```
Install Dependencies: Run the following command to install the dependencies:

```bash
pnpm install
```
Create the Application: Create a file named src/index.js with the following content:

```javascript
// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);
```
Create the App Component: Create the main component in src/App.jsx:

```javascript
// src/App.jsx
import React from 'react';
import { styled } from '@linaria/react';

const Title = styled.h1`
  color: red;
`;

const Link = styled.a`
  color: blue;
  display: none; // This element is not visible
`;

const App = () => {
  return (
    <div>
      <Title>Hello!</Title>
      <Link data-testid='link'>Link</Link>
    </div>
  );
};

export default App;
```
Create an HTML File: Create a basic HTML file for your application in public/index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Linaria and Jest</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```
Configure Webpack: Create a webpack.config.js file with the following content:

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
      new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
          {
            test: /\.?(js|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                }
              }, 
              { 
                loader: '@wyw-in-js/webpack-loader' 
              }
            ]
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader, 
              { 
                loader: 'css-loader', 
                options: {
                  esModule: true,
                  modules: {
                    namedExport: true,
                    localIdentName: '[local]'
                  },
                }
              }
            ],
          },
        ]
      },
  devServer: {
    port: 3000,
  },
};
```
Add Wyw-in-js Configuration: Create a configuration file named wyw-in-js.config.js:

```javascript
// wyw-in-js.config.js
module.exports = {
  evaluate: true,
  displayName: process.env.APP_ENV !== 'prod',
  classNameSlug: '[title]',
};
```
Add Babel Configuration: Create a configuration file named babel.config.js:

```javascript
// babel.config.js
module.exports = {
  "presets": [["@babel/preset-env", {targets: {node: "current"}}], "@babel/preset-react", "@wyw-in-js"]
}
```
And add the last config, Jest Configuration: Create a configuration file named babel.config.js:

```javascript
// jest.config.js
module.exports = {
  "testEnvironment": "jsdom",
  transform: {
    '^.+\\.(jsx?|tsx?|js)$': 'babel-jest',
  },
};
```

🎉🎉 Congratulation, our application is configured. 🎉🎉

### Running Your Application
Launch your application with the command:

```bash
pnpm start
```
You should see a page displaying just the title.

🎊 Nice, we have step up all our tools and we are ready to start testing. 🎊

### The Test
We need to ensure that Linaria and Wyw-in-js cannot handle styles on their own. Let's write a simple test.

Create a new file named src/App.test.js with the following content:

```javascript
// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('should render app', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent('Hello!');
    expect(screen.getByTestId('link')).not.toBeVisible();
});
```
You can run this test with:

```bash
pnpm test
```
Oops, you got a 🔴 message.

By compiling CSS, we can generate a more lightweight version of our bundle. However, this approach presents a significant challenge: if the CSS is not generated to the client, we cannot use it in our tests.

This becomes problematic when we need to test the visibility of an element using `.not.toBeVisible()`. For example, we have a CSS class that sets an element's display to none. While Jest can recognize that the element is not visible, the absence of the compiled CSS means that it only knows the class name without any associated CSS code.

Let's try a solution to handle it.

## Solution
In your webpack.config.js, ensure you have added the Wyw-in-js loader:

```javascript
{
  loader: '@wyw-in-js/webpack-loader'
}
```
This loader can accept options, one of which is cache-provider. This option allows you to modify how files are cached for reuse in the CSS generation.

Now, let's create a custom cache provider to generate temporary files.

### Implementing the Cache Provider
Create a new file named cacheProvider.js in your project directory:

```javascript
// cacheProvider.js
const fs = require('fs'); // to read and write on file
const { hash } = require('node:crypto');

const BASE_PATH = '.cache/wyw-in-js'; // path to store temporary files

class CacheFileForWyw {
    // Generate a file name to store CSS
    static getPathFromKey(key) {
        return hash('md5', key, 'hex');
    }

    get(key) {
        const keyPath = CacheFileForWyw.getPathFromKey(key);
        if (fs.existsSync(`${BASE_PATH}/${keyPath}.css`)) {
            return fs.readFileSync(`${BASE_PATH}/${keyPath}.css`, { encoding: 'utf-8' });
        }
        return Promise.reject();
    }

    set(key, value) {
        if (!fs.existsSync(BASE_PATH)) {
            fs.mkdirSync(BASE_PATH, { recursive: true });
        }
        const keyPath = CacheFileForWyw.getPathFromKey(key);
        fs.writeFileSync(`${BASE_PATH}/${keyPath}.css`, value);
        return Promise.resolve();
    }
}

const cacheProvider = new CacheFileForWyw();
module.exports = cacheProvider;
```
Next, integrate the custom cache provider with Webpack:

```javascript
{
  loader: '@wyw-in-js/webpack-loader', 
  options: { cacheProvider: path.resolve(__dirname, 'cacheProvider.js') }
}
```
### Custom Render Function for Tests
To ensure Jest utilizes the generated CSS, we will create a custom render function.

Create src/render.js with the following content:

```javascript
// src/render.js
import { render as rtlRender } from '@testing-library/react';
const fs = require('node:fs');

const BASE_PATH = '.cache/wyw-in-js';

const getCSS = () => {
    const filesStyle = fs.readdirSync(`./${BASE_PATH}/`);
    return filesStyle.reduce((acc, file) => acc + fs.readFileSync(`./${BASE_PATH}/${file}`, { encoding: 'utf-8' }), '');
};

function render(ui, options = {}) {
    const view = rtlRender(ui, options);
    const concatFiles = getCSS();

    const styleElement = document.createElement('style');
    styleElement.innerHTML = concatFiles.toString();
    document.body.appendChild(styleElement);
    document.body.appendChild(view.container);
    return view;
}

export * from '@testing-library/react';
export { render };
```
Update your test file (src/App.test.js) to import the custom render function:

```javascript
import { render, screen } from './render.js';
```
Finally, run a build with:

```bash
pnpm build
```
Rerun your tests:

```bash
pnpm test
```
Houra 🎊🎊 ! Finally, the test works !

## A Note on Potential Issues
As mentioned, our setup relies on temporary files generated by Webpack. This introduces the risk of discrepancies between the actual styles and the CSS in these files if a build is not performed. Currently, we have no solution for this issue, and it remains an area for future improvement.

We have think to others solutions:
- Create a custom [Jest transformer](https://jestjs.io/docs/code-transformation) like in [CSS Module](https://www.npmjs.com/package/jest-css-modules-transform) or [Vanilla Extract](https://www.npmjs.com/package/@vanilla-extract/jest-transform)
- Create a custom class for visibility in global and use it in our component (like that you can check if the class is in our test or not).
- Test the visibility via a functional test

## Final Note about Linaria
Do you need to use this trick to make Linaria work with Jest?
Sadly, yes.

This workaround, along with a few other issues, made us reconsider Linaria’s fit for our project. Here are the main challenges we faced:

- Outdated Documentation: Key parts of Linaria's documentation were outdated or incomplete, requiring us to dig through code and experiment extensively to find solutions.
- Small Community and Limited Support: The community around Linaria is still relatively small, with limited articles, resources, and tutorials available. The Discord server is inactive, making it difficult to find support or share experiences with other developers.
- Unresolved GitHub Issues: We observed several issues on Linaria’s GitHub repository that had gone months without responses, which raised concerns about maintenance and support going forward.

Given these red flags, we concluded that Linaria might not be the best fit for our needs. While it offers potential advantages, the lack of support and the necessity of workarounds have prompted us to explore alternative solutions for managing styles in our React application.

## Conclusion
I hope this article helps you understand how to set up Linaria with Jest for testing in a React application. By creating a custom cache provider and render function, we can ensure that our tests accurately reflect the styles in our components.

Thank you for reading, and best of luck with your migration!