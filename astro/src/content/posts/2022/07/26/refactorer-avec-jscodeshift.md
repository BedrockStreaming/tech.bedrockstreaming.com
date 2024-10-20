---
layout: ../../layouts/post.astro
title: "Comment appliquer automatiquement des modifications sur une codebase JS 🤖"
description: "Ou comment j'ai appris à ne plus m'en faire et à aimer JSCodeshift"
author: m_schneider
category:
tags: [javascript, outil, cytron, frontend, react, refactor, js]
language: fr
permalink: refactorer-avec-jscodeshift
---

Dans cet article, je vais vous présenter [JSCodeshift](https://github.com/facebook/jscodeshift), une libraire qui va vous permettre d'analyser et appliquer automatiquement des modifications sur du code Javascript ou Typescript. 

# Cas d'école 👨‍🎓

Maintenir à jour les dépendances de nos projets JS est l'une des règles primordiales que nous nous efforçons de bien respecter pour [ne pas avoir à jeter nos applications tous les deux ans. 🗑](/2021/09/01/bonnes-pratiques-web)

Cette tâche exige souvent d’un développeur plus de travail que de simplement changer les versions des libraires dans le *package.json*.
Si une dépendance est utilisée dans différentes parties du code et qu’un breaking-change est introduit, on peut vite se retrouver avec **des centaines** de fichiers à modifier manuellement.

<center>
<a href="https://www.monkeyuser.com/2018/implementation/"><img src="/images/posts/refactorer-avec-jscodeshift/102-implementation.png" alt="Caricature de projet avec ses dependencies"/></a>
<br/>
ℹ️ <em>Exemple d'un project Javascript qui ne respecte pas cette règle</em>
</center> <br/>

C'est un problème de ce genre que nous avons rencontré lors de la mise à jour de [notre librairie d’internationalisation](https://github.com/BedrockStreaming/i18n-tools) sur notre web app React en JS.

Après mise à jour, l'appel à l'API de la librairie change de forme :
```typescript
//Before
const t: (
    translationKey: string,
    // All options are passed as parameters
    data?: object, // Data used for interpolation
    number?: number, // Amount used for plural form
    general?: boolean, // Use general plural form
    renderers?: object // JSX renderers
) => string

//After
const t: (
    translationKey: string,
    // Object containing all options
    options?: {
      data?: object, // Data used for interpolation
      number?: number, // Amount used for plural form
      general?: boolean, // Use general plural form
      renderers?: object // JSX renderers
    }
) => string
```

Plus simplement, quelques exemples de transformations :
```tsx
// Before
const title1 = t('translationKeyExample')
const title2 = t(labelKey, { someData }, aNumber);
const title3 = t('translationKeyExample', undefined, 0);

// After
const title1 = t('translationKeyExample'); // Basic usecase with only one argument, nothing changed on this one
const title2 = t(labelKey, { data: { someData }, number: aNumber });
const title3 = t('translationKeyExample', { number: 0 });
```

Dans le cas le plus basique sans les arguments optionnels `t(‘translationKey’)` nous n’avons rien à modifier, mais dans les autres cas, il y a du changement à faire. 🧹

## Les solutions que nous avons écartées ❌

- Avec un **Find All**, trouver toutes les utilisations de la librairie et modifier les appels problématiques à la main.
  - Cette solution est la plus simple, mais peut être très répétitive, ce qui augmente la probabilité de faire une erreur. On aura du mal à uniquement filtrer les cas spécifiques qui nous intéressent.
- Utiliser des RegExp pour mieux cibler les cas spécifiques
  - Cela nous a permis de faire rapidement une estimation approximative du nombre de cas qu’il nous faudrait modifier, mais nous avons eu du mal à cibler correctement tous les appels et la modification se fait toujours à la main.
- Créer un fichier de définition TypeScript pour la librairie, et laisser le Language Server Protocol ou son IDE trouver les appels problématiques
  - La solution la plus rapide et la plus fiable pour la partie détection, mais qui demande toujours de faire les modifications à la main.

Mais il nous restait encore un Joker pour cette tâche. 🃏 

# JSCodeshift 🪄

[Cette librairie](https://github.com/facebook/jscodeshift) permet d’exposer facilement [*l’Abstract Syntax Tree*](https://fr.wikipedia.org/wiki/Arbre_de_la_syntaxe_abstraite), autrement dit la représentation du code après le parsing des fichiers.
Nous pouvons ainsi écrire des scripts qui nous permettent de parcourir cet arbre, de le modifier facilement, d’appliquer les modifications et de les formater.
Ces scripts s'appellent des _codemods_.

Pour en savoir un peu plus sur *l’Abstract Syntax Tree*, je vous conseille de jeter un coup d’œil à [ASTExplorer](https://astexplorer.net/) qui vous permet de visualiser l’AST d’un fichier facilement pour en comprendre le fonctionnement.

Quelques librairies ont proposé des _codemods_ lors de leurs grosses mises à jour, par exemple [React avec react-codemod](https://github.com/reactjs/react-codemod).

<center>
<a href="https://astexplorer.net/"><img src="/images/posts/refactorer-avec-jscodeshift/astexplorer.png" alt="Capture d'écran du site ASTExplorer"/></a>
<br/>
ℹ️ <em>Capture d'écran du site ASTExplorer</em>
</center> <br/>

## En application 💪

```typescript
module.exports = function (file: FileInfo, api: API) {
  const j = api.jscodeshift;

  // If we don't find any "Translate" string inside our file, we can assume that it's safe to skip it
  const regex = new RegExp('Translate[(]', 'i');
  if (!regex.test(file.source)) {
    return null;
  }

  return j(file.source)
    .find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: 't',
      },
    })
    .filter(filterOutSimpleUsages)
    .map(mutatePath(j))
    .toSource();
};
```

Dans la fonction principale du script, j'ai utilisé une expression régulière pour filtrer les fichiers qui ne possèdent pas la chaîne de caractères `Translate(`.
Ceci permet de gagner un peu de temps sur l'exécution. ⌛️

Ensuite, je cherche dans le fichier une ou plusieurs variables `t`. Si aucune n'est présente, on peut passer au fichier suivant, sinon on continue le raffinage.

On passe dans un filtre qui va nous permettre d'enlever les usages de la fonction `t` avec un seul argument qui ne posent pas de problème.

```typescript
const requiredPropertiesKeys = ['data', 'number', 'general', 'renderers'] as const;

// Filter function to ensure that we enter the mutation function only if needed
const filterOutSimpleUsages = (p: ASTPath<CallExpression>) => {
  const args = p.value.arguments;

  // If we only have the translation key, we don't need to refactor this usage
  if (args.length === 1) {
    return false;
  }

  // More than 2 arguments is an absolute sign of an old usage
  // If second argument is not an object, we need to manually fix this case
  if (args.length > 2 || args[1].type !== 'ObjectExpression') {
    return true;
  }

  // If none of the above properties is found in second argument, we can say that this is an old usage
  return requiredPropertiesKeys.every(
    (requiredPropertyKey) =>
      !(args[1] as ObjectExpression).properties.find(
        // I needed to do some TS trickery to avoid getting warnings everywhere, sorry for that
        (property) => ((property as ObjectProperty).key as Identifier).name === requiredPropertyKey,
      ),
  );
};
```

Finalement, on peut passer dans la fonction de mutation, qui va nous permettre de modifier directement le code des fichiers.

```typescript
// Mutation function, we apply our modification to the AST
const mutatePath = (j: JSCodeshift) => (p: ASTPath<CallExpression>) => {
  const objectProperties = requiredPropertiesKeys.reduce((acc, propertyKey, index) => {
    const argument = p.value.arguments[index + 1];
    // If no argument or argument is a spread type, we don't take it in consideration
    if (!argument || argument.type === 'SpreadElement') {
      return acc;
    }

    // If argument is undefined, we skip it
    if ((argument as Identifier).name && (argument as Identifier).name === 'undefined') {
      return acc;
    }

    // We create a new object property with an identifier (the object key) and put our argument inside
    return [...acc, j.objectProperty(j.identifier(propertyKey), argument)];
  }, [] as ObjectProperty[]);

  // Finally, we keep our translation key in first position and our newly created object in second argument
  p.value.arguments = [p.value.arguments[0], j.objectExpression(objectProperties)];

  return p;
};
```

On récupère les arguments déjà existants, on crée un nouvel objet et on y place nos arguments !

## Résultats ✨

⏱ Pour à peu près **2900 fichiers**, le script a mis moins de **5,9 secondes** à s'exécuter _(Macbook Pro 13" 2019)_.

JSCodeshift nous a permis de cibler très rapidement 99 % des cas problématiques et de les corriger automatiquement.

Le pourcentage restant concerne des cas où il était généralement difficile de cibler la fonction `t` (passée en props à un autre composant sous un autre nom). Ces quelques cas ont pu être corrigés rapidement à la main et détectés grâce à nos nombreux tests (heureusement qu'on a [une règle de bonne pratique](/2021/09/01/bonnes-pratiques-web#tester-tester-tester) pour ça 😇).

# tl;dr & conclusion 🏃

Vous pouvez retrouver la source du codemod [ici même](https://gist.github.com/martinschneider01/40e0f340cf2ed549a875e8de00475b97).

Si vous êtes mainteneur d'une librairie, il peut être très intéressant de livrer des _codemods_ en même temps que les breaking-changes pour faciliter l'adoption des mises à jour par exemple !

Avec une prise en main relativement facile pour un résultat très rapide, nous avons été très satisfaits de JSCodeshift et nous n'hésiterons pas à réutiliser cette librairie dans le futur. 👊

Merci à tous pour la lecture de mon premier article et JSCodeshiftez bien. 😘
