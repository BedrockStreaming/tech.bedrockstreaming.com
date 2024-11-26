---
layout: post
title: We love speed 2024 ❤️
description: Retour sur la conférence We love speed 2024 ❤️, une conférence annuelle axée sur la performance du web.
author: [ j_nginn, j_poissonnet ]
tags: [ performance, conference, webperf, javascript, react, web, frontend ]
color: rgb(251,87,66)
language: fr
thumbnail: "images/posts/2024-10-29-we-love-speed-2024/welovespeed_2024-1709240237.jpg"
---

Nous avons eu la chance de participer à la conférence We love speed, une conférence annuelle axée sur la
performance du web. C’est un domaine qui nous passionne et nous sommes très content d’avoir pu y assister.
Le thème de cette édition, c’est l’INP. En effet, cette métrique de performance a été ajoutée aux core web vitals par
[Google _récemment_](https://developers.google.com/search/blog/2023/05/introducing-inp?hl=fr).
L’objectif de cette métrique est de refléter l’expérience utilisateur en mesurant la réactivité d’une application.
Elle observe le temps entre une action utilisateur et une réponse visuelle de notre interface.

![L'équipe frontend à la we love speed](/images/posts/2024-10-29-we-love-speed-2024/team_picture.jpeg)

## HTMX, le nouvel atout pour vos projets SSR - [Ewen Quimerc‘h](https://ewen.quimerch.com/)

Lors de ce talk, nous avons découvert un outil très intéressant. Il s'agit de HTMX : une bibliothèque Javascript qui
permet d'ajouter des fonctionnalités de type SPA (Single Page Application) à une application web classique et de façon
non intrusive. Par exemple, on peut surcharger les liens `<a>` pour qu’ils chargent une nouvelle page en AJAX grâce à un
attribut ajouté au HTML. Ce mode de fonctionnement est très intéressant, car il permet de garder une application web
classique avec tous ses comportements le temps que HTMX se charge. C’est-a-dire que si HTMX venait à ne pas démarrer,
votre application web se comporterait de la même manière, mais sans les améliorations de temps d’interaction.

HTMX surcharge la manière dont vos liens et images vont être chargés par le navigateur.
Ainsi, lors de la prochaine interaction, ce dernier sera déjà prêt à servir les ressources.
Le principe de HTMX consiste à ajouter des balises HTML spécifiques dans le DOM qu'il va lire et en déduire les
comportements à son chargement.
Cette manipulation est appelée le "DOM morphing". Grâce à ce processus le temps de chargement est réduit et on évite
l'effet "blink" (page blanche lors du chargement de la page).
Il est à noter que ces comportements ne sont qu’un embellissement proposé par HTMX, il est tout à fait possible
d’ajouter par exemple l’attribut `preload` sur une balise `a` pour demander le chargement en avance du lien par le
navigateur.

> <div style="display: flex">
> <img src="/images/avatar/j_nginn.jpeg" alt="Julie" style="padding: 0;border-radius: 50%; height: 70px; margin: 10px">
> Comme nous utilisons React pour notre application, l'utilisation de HTMX n'est pas vraiment utile.
> Il est déjà possible avec React de précharger les ressources en avance. Mais ça reste un outil intéressant...
> </div>

> <div style="display: flex">
> ...effectivement, HTMX semble être intéressant, mais on se retrouve à ajouter
> beaucoup d'attributs dans le HTML. Ça peut le rendre le markup moins lisible. Et en plus, ça donne l'impression de recoder les comportements du navigateur.
> <img src="/images/avatar/j_poissonnet.jpg" alt="Jules" style="padding: 0;border-radius: 50%; height: 70px; margin: 10px">
> </div>

## React / Next vs INP - [Jean-Pierre Vincent](https://www.linkedin.com/in/jeanpierrevincent/)

Le deuxième talk a une place particulière dans notre cœur ❤️ puisqu’il a été donné par notre cher Jean-Pierre Vincent,
qui a audité les performances du web de Bedrock, il y a deux ans.
Lors de ce talk, Jean-Pierre nous a donné la feuille de route pour éviter au mieux la déferlante de Javascript que vos
utilisateurs reçoivent au chargement de votre site.

![JS Tsunami storming your users](/images/posts/2024-10-29-we-love-speed-2024/js_tsunami.jpeg)

L'INP (Interaction to Next Paint) est une métrique qui mesure le temps entre une interaction utilisateur et le prochain
rendu du navigateur. L’idée générale est de pouvoir mesurer l’incapacité du navigateur à réagir. Après avoir récupéré
des mesures, il est bon de se rappeler qu’il y a un biais de selection pour les données de Crux. Pour rappel, Crux est
une base de données qui contient des métriques de performance de sites web collectées par Google.
En effet, il n’est calculé que sur les appareils Google (c’est le principe). Une fois qu’on a récolté des métriques de
performance de nos utilisateurs, si on veut travailler sur notre site web et avoir une bonne idée du ressenti de nos
utilisateurs, l’idéal est de tester avec un véritable Samsung S8 par exemple. Le S8 est un appareil sur lequel on a
beaucoup de données et qui représente à l'heure actuelle une bonne représentation des capacités de l'utilisateur moyen.
L’INP est une métrique qui peut être influencée par des interactions qui ne sont pas prévues par les devs. Par exemple,
on a été étonnés de constater que lorsque les temps de chargement sont un poil trop longs à leur goût, les utilisateurs
se mettent à cliquer partout 🤷 C’est pourquoi il est important de se baser sur des données réelles.

![INP est bousculé par la charge de js!](/images/posts/2024-10-29-we-love-speed-2024/inp_charge.jpeg)

Parmi les bonnes pratiques qu’on peut appliquer dès maintenant, et qui je dois le dire m’a paru un peu contre-intuitif :
faire passer Babel sur les node_modules.
En fait, du point de vue d’un développeur, on peut se dire que cela va augmenter les temps de build drastiquement, et on
aurait sûrement raison. Mais en fait, il faut voir le bénéfice qu’il y a derrière. Si on personnalise les règles Babel
afin qu’elles correspondent aux navigateurs de nos utilisateurs, on évite des transformations inutiles qui
augmenteraient le poids de nos fichiers Javascript.

Une nouvelle fonctionnalité de React appelée RSC (React Server Components) permet de combiner le rendu côté serveur avec
l'interactivité côté client.
Les RSC aident à réduire la taille du Javascript dans le navigateur ce qui permet d’améliorer le temps d’interaction et
donc l’expérience utilisateur. Vous l’aurez compris, c’est l’ennemi n°1 de Jean-Pierre (et de vos navigateurs) !
Le principe est de rendre les composants côté serveur et de faire en sorte que ces derniers ne rendent que du HTML, qui
ne sera pas hydraté côté client.
L’étape de réhydratation est une étape importante et trop souvent sous-estimée. Il s’agit d’une nouveauté de React qui
est prometteuse et qui est déjà présente dans Next.js.

Pour nous montrer un exemple concret d’abus de JavaScript : il a montré du code Bedrock 😅.
Il s’agit d’un FlameGraph du rendu de notre `<Footer />` côté app web. Il y a une quantité conséquente de JS car nous
faisions ce qu’on appelle du CSS-in-JS.
Vous l’avez deviné, c’est la partie "in-JS" qui pose un problème. Cela signifie que pour appliquer du style sur notre
site, c’est le Javascript qui s’en charge. Or dans un composant, comme le `<Footer />`, il y a beaucoup d’éléments et
chacun va avoir besoin de son propre style. Si l’idée de colocaliser le CSS dans le JS n’est pas nocive en soi, le plus
gros problème était l'utilisation de [Styled-Components](https://styled-components.com/) qui calcule le style au moment
du rendu, le rendant donc plus long. FYI : Entre temps, nous avons chez Bedrock entamé une migration pour quitter
Styled-Components au profit de [Linaria](https://linaria.dev/) pour le projet web
et [Vanilla Extract](https://vanilla-extract.style/) pour le projet smart TV.

![Flamegraph du Footer de Bedrock](/images/posts/2024-10-29-we-love-speed-2024/flamgraph.jpeg)

Autre information qui nous concerne chez Bedrock, au moment d’écrire ces lignes, nous sommes en train de mettre en
production la migration de React 17 vers React 18 sur le projet web.
D’après les retours d’expérience de Jean-Pierre, cette version de React aura un impact positif sur l’INP car il permet
de faire moins de `render`.

Enfin, Jean-Pierre nous laisse avec un ultime conseil pour que nos applications web soient pérennes : “Monitore (au
moins une fois dans ta vie) l’origine des INP avec un vrai utilisateur.”

> <div style="display: flex">
> <img src="/images/avatar/j_nginn.jpeg" alt="Julie" style="padding: 0;border-radius: 50%; height: 70px; margin: 10px">
> J'ai bien aimé ce talk ! J'ai trouvé que sa présentation était très accessible, il a su vulgariser des concepts et rendre un sujet fastidieux (la performance) intéressant 👏
> </div>

## Débogage des performances à l’aide des DevTools : Mise en pratique approfondie - [Umar Hansa](https://umaar.com/)

Avoir un œil sur ses performances est essentiel pour avancer dans la bonne direction et s’assurer qu’on
fournit à nos utilisateurs une expérience optimale. Fort heureusement pour nous les devs, on est bien lotis avec de très
bons outils. Il suffit d’ouvrir les Chrome DevTools pour s’en rendre compte. Ce talk nous a présenté comment bien
utiliser les DevTools pour mesurer les performances de nos applications web et se mettre à la place de
nos utilisateurs. Par exemple, on peut brider son réseau et son CPU pour simuler une connexion 3G et un CPU lent. Dans
cette présentation, on nous a quand même rappelé que les DevTools ne sont pas une solution miracle, il est important de
tester sur de vrais devices pour le ressenti.

Pour ce qui est de l'interprétation des données, une myriade d'outils est à notre disposition pour nous aider à
comprendre ce que nous voyons. Par exemple, on peut ajouter des annotations dans le flamegraph comme des labels, des
diagrammes ou encore des plages de temps. On peut aussi mettre en place des custom tracks pour suivre des événements
spécifiques. Au sein de notre application, on peut utiliser l’API User Timing pour ajouter des points de repère dans
notre code et ainsi mieux comprendre ce qui se passe au déclenchement d'événements spécifiques.

## Web Performance Testing - [Estela Franco](https://x.com/guaca)

Nous avons également eu un talk sur l'intégration de Lighthouse, un outil de Google pour mesurer la performance de nos
applications web, dans une CI. Cela permet de détecter les problèmes de performance avant qu'ils ne soient déployés en
production. Il est possible de mettre des warnings, voire des erreurs empêchant de merger, si l’application ne respecte
pas les standards que nous nous sommes fixés. L'idée est de s'assurer que la performance de
notre application web est toujours au top et ne se dégrade pas dans le temps.
![Key takeaways from the talk](/images/posts/2024-10-29-we-love-speed-2024/Key%20Takeaways.jpeg)

> <div style="display: flex">
> <img src="/images/avatar/j_nginn.jpeg" alt="Julie" style="padding: 0;border-radius: 50%; height: 70px; margin: 10px">
> On envisage de l'ajouter au projet smart TV, mais plus pour générer un rapport de performance quotidien plutôt que de le faire pour chaque push ou merge. 
> </div>

## Comment les navigateurs chargent VRAIMENT les pages web - [Robin Marx](https://x.com/programmingart)

Dans ce qui est probablement le talk le plus technique de la journée, on nous a expliqué comment les navigateurs
chargent les différentes ressources nécessaires à l'affichage d'une page web. Plus spécifiquement, on nous a expliqué
comment les navigateurs interprètent le HTML pour déterminer quelles ressources charger en priorité.

Le talk était très intéressant, mais la conclusion est un peu frustrante : il est pour le moment impossible de prévoir
l'ordre de chargement des ressources par le navigateur à partir du même HTML. En effet, les navigateurs ont des
comportements différents entre eux et même par version 🤯. Chrome a, par exemple, un comportement très différent cette
année
par rapport à deux ans en arrière.

Même si on est tenté de vouloir contrôler le chargement des ressources, il est important de se rappeler que le
navigateur
est très bien optimisé pour charger les ressources de manière efficace. Il est donc préférable de laisser le navigateur
faire son travail plutôt que de vouloir le contrôler. L'attribut `preload` est un bon exemple de ce que l'on peut faire
pour aider le navigateur à charger les ressources de manière plus efficace. Il faut cependant l'utiliser avec parcimonie
et de manière chirurgicale pour ne pas interférer avec le travail du navigateur.

![Preload with surgical precision](/images/posts/2024-10-29-we-love-speed-2024/preload_surgical.jpeg)

## Mais que fait la police ? - [Eroan Boyer](https://x.com/eroan)

Pour finir, on a eu un talk sur les polices de caractères. Elles sont essentielles pour l'identité visuelle de nos
applications web, mais elles peuvent aussi être une source de problèmes de performance. En effet, les polices de
caractères peuvent être très lourdes et ralentir le chargement de nos pages. Il est donc important de bien les choisir
et de les optimiser pour garantir une bonne performance. Il existe plusieurs techniques pour optimiser les polices,
notamment en réalisant un subset de la police pour ne télécharger que les glyphes dont on a besoin. (En français, on a
besoin que de 165 glyphes, comparé à 528 pour le latin).
Il existe des outils pour nous aider à réaliser ces subsets
comme : [Font Subsetter](https://everythingfonts.com/subsetter), [fontTools](https://fonttools.readthedocs.io/) ou
[Glyphanger](https://www.zachleat.com/web/glyphhanger/).
> <div style="display: flex">
> Attention à ne pas abuser des subsets, car cela peut entraîner des problèmes de lisibilité du texte. Le fameux t🠉fu .
> <img src="/images/avatar/j_poissonnet.jpg" alt="Jules" style="padding: 0;border-radius: 50%; height: 70px; margin: 10px">
> </div>

![Say no to tofu](/images/posts/2024-10-29-we-love-speed-2024/tofu.jpeg)

Il est aussi possible de minimiser le nombre de fichiers en utilisant des polices variables. Un bon exemple est la
police Roboto Flex, qui est customisable et permet ainsi de pouvoir réduire le nombre de fichiers nécessaires à charger.
Il est là aussi, possible de sélectionner les variations que l'on souhaite pour réduire encore plus le poids de la
police.

# Conclusion

Cette année, l'accent a été mis sur l'INP et la manière de l'améliorer. Il est important de garder en tête que l'INP est
une métrique qui mesure l'expérience utilisateur, il est donc essentiel de la garder à l'œil. Il est bon de
rappeler que la performance est plus une habitude à prendre qu'un constat à réaliser. Une application performante, c'est
une expérience utilisateur améliorée et des utilisateurs satisfaits !

De notre côté, nous sommes rentrés avec quelques idées à mettre en place dans nos projets à Bedrock, notamment :

- Etudier la possibilité d'ajouter des React Server Components pour réduire le poids de notre JS
- Mettre en place des tests de performance dans notre CI avec Lighthouse CI
- Vérifier que nos polices de caractères sont bien optimisées pour la performance

Notre équipe est ressortie de cette conférence ravie et avec de nouvelles idées qui vont surement nous suivre sur nos
projets personnels aussi. La We love speed ❤️ est une conférence à ne pas manquer pour tous les passionnés de
performance web, on vous recommande chaudement d'y assister si vous en avez l'occasion !

