---
 layout: ../../../../../layouts/post.astro
 title: API Platform Conference 2022
 description: Venez avec nous assister aux conférences API Platform ! 
 author: bedrock
 tags: [conferences, backend, api, php]
 color: rgb(251,87,66) # this is Bedrock color here
---

En cette période de rentrée, Bedrock participait à l'[API Platform Conference 2022](https://api-platform.com/con/2022), où nous avons eu le plaisir d'assister à une partie des conférences proposées. Un grand merci à toutes les personnes chez [Les-Tilleuls.coop](https://les-tilleuls.coop/) pour l'organisation de cet évènement !
Pour cette seconde édition, le programme était réparti sur deux jours, les 15 & 16 septembre 2022.

En introduction à cette conférence, Kévin Dunglas, créateur d'[API Platform](https://api-platform.com/), a mis en ligne la version 3.0.0 du framework en nous présentant certaines nouvelles fonctionnalités développées telles que le support natif de XDebug. Il a profité de l'occasion pour présenter un petit historique d'API Platform.

## Domain-driven design with API Platform 3

Lors de cette conférence, [Robin Chalas](https://twitter.com/chalas_r) et [Mathias Arlaud](https://twitter.com/matarld) nous ont parlé de l'utilisation d'API Platform dans le cadre du Domain Driven Development et de l'Architecture Hexagonale.
Les présentateurs ont commencé cette présentation par plusieurs rappels et présentations sur des sujets comme :
- Domain Driven Design
- Structures hexagonales
- CQRS

Ces rappels ont permis d'enchainer sur l'utilisation du framework dans ce contexte à travers un [exemple de projet](https://github.com/mtarld/apip-ddd) DDD utilisant API Platform 3 et suivant l'architecture hexagonale.

Ils expliquent comment implémenter API Platform dans notre code en détaillant plusieurs points : 
- L'implémentation des providers côté query 
- L'implémentation des processors côté command
- Le système d'opération
- Les providers/processors qui appellent l'app via les bus

## Comment Alice Garden's gère-t-elle son code métier via les évènements

Nous avons pu assister à la conférence “Comment Alice Garden’s gère-t-elle le code métier via des évènements ?” proposée par leur technical architect [Nicolas Lemahieu](https://twitter.com/epatwon). Tout d’abord, il nous a présenté le contexte de son entreprise Alice Garden’s qui fait de la vente de mobilier d’extérieur. En se basant sur la stack technique déjà présente : Symfony, RabbitMQ, MariaDB et sans tout refondre, comment faire pour mieux gérer le code métier actuellement éparpillé un peu partout dans le code.

Ils utilisaient beaucoup de subscribers Doctrine, ce qui entraîne plusieurs problèmes :
- Des subscribers nombreux = plus de logique au flush 
- Code plus difficile à maintenir et à comprendre
- L'augmentation du risque de boucles infinies implique que chaque changement entraîne des boucles sur le UnitOfWork
- Duplication de code
- Code fortement couplé à Doctrine et manque de typage
- Du côté du profiler Symfony, cela devient compliqué aussi dès qu’on commence à en avoir beaucoup
- Les tests sont compliqués :
    - Unitaires quasi impossibles,
    - Fonctionnels possibles, mais demandent beaucoup de ressources en temps et donc d’argent

Nicolas Lemahieu a donc présenté les différentes solutions envisagées ainsi que leurs avantages et inconvénients : 
- Domain Driven Development : séparation très nette du métier et de l’infra, mais demande beaucoup trop d’effort à mettre en place, car aucune correspondance avec les bundles déjà existants (risque de régression trop haut, coût de développement trop grand…)
- Garder les évènements et s’affranchir de Doctrine : c’est la solution qui a été retenue parce qu'elle permettait de réutiliser un maximum de l’existant

Puis, nous avons pu apprendre comment implémenter cette solution :
- Création d’une abstraction supplémentaire “BusinessObject” : nouveau dossier Business dans src où : 
    - Entité = objet métier
    - Méthodes des entités = règles métier
    - Toutes les interfaces entité étendent BusinessObjectInterface
- Classes abstraites dans Business
- Implémentation d’events custom pour chaque objet métier et par type d’event 
- Event provider : fournit les évènements qui sont mis dans une collection puis tag dans les services

En conclusion, chez Alice Garden’s, ils ont réussi à n’avoir qu’un seul Doctrine Subscriber, donc une seule boucle de UnitOfWork et des tests facilités, car c’est seulement du PHP. La dépendance à Doctrine est éliminée et il suffira de déplacer le provider pour adapter le code à une autre infrastructure.

## Réutiliser et partager vos opérations personnalisées avec API Platform

Grâce à [Hubert Lenoir](https://mobile.twitter.com/jean_beru) et [Jérémy Jarrié](https://mobile.twitter.com/jjarrie) de l’entreprise SensioLabs, nous avons pu apprendre à réutiliser et partager les opérations avec API Platform. Ils utilisent 3 API REST faites avec API Platform v3. Des opérations génériques comme “liker” peuvent s’appliquer sur des ressources différentes (articles, photos, pages, etc.), on peut donc réutiliser du code.

Les principes pour faire cette utilisation générique de code sont simples :
- Un seul contrôleur pour plusieurs ressources = un contrôleur de comportement
- Une interface pour que les entités puissent adopter ce comportement
- Trait pour les méthodes du comportement (1 à n comportements, donc classe abstraite ou interface impossible)
- Ajouter des services intermédiaires

Il survient un seul problème avec ce pattern : la duplication des annotations API Platform. La solution est d’ajouter des décorations (design pattern decorator) sur les métadatas d’API Platform. Il est donc simple de créer des comportements indépendants des ressources qui pourront être facilement réutilisés. Ce projet était encore à l’état de POC, mais Jérémy et Hubert allaient mettre à jour la version plus aboutie sur le [repository GitHub](https://github.com/JJarrie/reuse-behaviour).

## La revue de code est un art

[Smaine Milianni](https://twitter.com/SmaineDev) a proposé une conférence sur les conseils à suivre afin d’effectuer une revue de code. Nous avons pu réaliser qu’au sein de Bedrock nous appliquions déjà de nombreux principes.

Nous appliquons déjà :
- Un template de PR pour décrire les caractéristiques du bug ou de l’US :
    - Quoi, pourquoi, comment, comment tester, etc.
- Des noms de commits explicites
- La bienveillance
- Le challenge du code des autres personnes
- La connaissance des nombreux concepts de code (SOLID, KISS…) 
- Faire du pair review ou mob review
- Un request bot déjà en place 
- Tester et ne pas se fier uniquement à la lecture du code

Nous avons aussi pu prendre du recul et noter des conseils à appliquer. Chacun a pu transmettre ses idées à son équipe. Le rappel qu’une revue c’est aussi souligner le positif et pas seulement challenger le code. Cette conférence est très concrète et facilement applicable à Bedrock. 

## Fighting impostor syndrome: a practical handbook

Lors de cette conférence, [Marine Gandy](https://twitter.com/mupsigraphy) commence sa présentation par définir ce que le syndrome de l'imposteur est : une peur de l'échec, la crainte que quelqu'un dise que nous ne sommes pas capables, mais aussi le sentiment de ne pas mériter de réussir.
Elle nous explique que ce terme était tout d'abord attribué exclusivement aux femmes, mais qu'après une étude montrant que 70% de la population était touchée, il se serait généralisé à tous les genres.
Marine Gandy nous énonce que la tech est très touchée par ce phénomène pour plusieurs raisons comme le fait qu'il y ait beaucoup de renouveau dans ce corps de métier et que nous avons vite l'impression de retourner à nos débuts lorsque nous changeons de techno, créant ainsi un sentiment d'instabilité. 
Dans ce contexte, Marine nous parle de [l'effet Julien Lepers](https://www.universite-paris-saclay.fr/sites/default/files/media/2020-02/erreur-fondamentale-d-attribution-atelierfbjip2018.pdf) en prenant pour exemple le fait de se trouver dans une équipe de personnes bien plus expérimentées que nous où la situation influe sur la personne.
Pour finir, la conférencière nous présente plusieurs pistes à suivre pour éviter ou minimiser ce genre de sentiment :
- Arrêter de se comparer aux autres
- Se challenger sur de nouveaux domaines pour se rendre compte qu'on peut toujours apprendre
- Travailler sur ses faiblesses pour permettre de se sentir plus compétent

## Mon combat contre l'arachnophobie

[Jérôme Tanghe](https://twitter.com/Deuchnord), par son arachnophobie, nous a expliqué comment il est arrivé à contribuer à API Platform afin d’ajouter une option pour cacher la mascotte Webby. Et c’est ce dont il nous a parlé, à savoir comment bien démarrer sa première pull request pour contribuer au logiciel libre. La première étape étant de trouver le bon repository qui nous conviendrait parmi les projets existants. Dans le but d'identifier un sujet sur lequel contribuer, il ne faut pas hésiter à utiliser la fonctionnalité des tags sur les issues, par exemple le tag hacktoberfest dans le cadre d’API Platform. Une fois le sujet trouvé, il faut maintenant identifier la branche de base à partir de laquelle faire sa pull request, cela peut s’agir d’une version spécifique choisie ou même de la branche principale. La contribution au logiciel libre ou à l’open source ne passe pas uniquement par des pull requests uniquement basés sur le code. Il est également possible de tester les préversions (release-candidate), signaler des bugs, faire des suggestions, améliorer la documentation ou encore rédiger des traductions. Enfin, il est conseillé de prendre en compte chaque retour sur d'autres pull requests, cela permet notamment de découvrir les principes et standards du projet.

## Pourquoi je n’utilise pas API Platform

[Frédéric Bouchery](https://twitter.com/FredBouchery), s’est décidément perdu en se retrouvant à présenter cette conférence à l'API Platform conference 2022. Malgré tout, cela lui a permis de nous partager son introspection : Mais au fait, pourquoi il ne s’en sert pas ?  
Dans cette première partie de sa conférence, Frédéric n'hésite pas à utiliser beaucoup de sarcasme. Il nous explique qu’il ne s’en sert pas, car API Platform est écrit en PHP et pour lui, c'est une technologie vieillissante qui ne devrait pas tarder à rejoindre Cobolt. Également parce qu'API Platform utilise Symfony, alors que tout le monde le sait très bien, enfin surtout les Google Trend, Laravel est plus utilisé dans le monde. De plus, Frédéric n’aime pas la magie et API Platform en est rempli : sérialisation et désérialisation à tout va alors que lui est capable de faire une API en seulement quelques lignes avec du PHP pur sans artifice. Enfin, il reproche à API Platform de devenir compliqué à utiliser si le projet qui se base dessus est complexe, trop de personnalisation et de configurations doivent être effectuées.   
Dans cette deuxième partie, Frédéric fait tomber son masque sarcastique et décide de revenir sur les points qu'il a abordés précédemment :  
- Les tendances concernant un langage ne sont pas des bons indicateurs, en effet imaginer le futur ou la mort de PHP via des statistiques dont certaines basées sur l’opinion publique n’est pas une bonne façon de faire
- PHP, c'est aujourd’hui 75% des sites du monde entier et 54% parmi le top 1000 des sites internet fréquemment utilisés
- Malgré tout, il nous conseille de ne pas être mono technologique non plus. S'intéresser à d’autres langages est une bonne chose
- API Plateform a quand même de bonnes performances : 99% de réponses avec une moyenne de 91 ms sur 5 000 requêtes comparées à son code PHP pur avec une moyenne de 21 ms pour 5 000 requêtes également sachant que son code ne prend pas en compte la sécurité
- Le framework Laravel utilisant des composants Symfony, il est dès lors difficile de les comparer. Même si factuellement Laravel est plus utilisé dans le monde, on n’utilise pas du Laravel ou du Symfony pour les mêmes raisons et c’est une bonne chose que les deux coexistent ensemble
- Il pensait qu’avec la complexité de ses projets, il était trop dur de passer à API Platform, mais il s’est rendu compte que ce n’était pas nécessairement vrai

En conclusion de sa conférence et sans aucun sarcasme, Frédéric n’hésite pas à se livrer à nous et finit par nous dire qu’il va finalement utiliser API Platform 3 pour un projet.

## What's New in Caddy, the webserver of API Platform

[Francis Lavoie](https://twitter.com/_francislavoie) nous a présenté plusieurs nouveautés dans **Caddy**, un webserver écrit en Go ayant beaucoup de fonctionnalités activées par défaut et fourni avec API Platform dans [l'installation de base](https://api-platform.com/docs/distribution/caddy/).

Parmi les nouveautés présentées, il nous a notamment parlé d'améliorations au niveau des **request matchers** avec des matchers réutilisables, des expressions et des fonctions. Il a ensuite parlé d'une gestion native de [Authelia](https://www.authelia.com) permettant de déléguer facilement l'authentification depuis la configuration du serveur.
Enfin, la directive **file_server** peut maintenant servir des fichiers provenant d'autres sources que le système de fichiers local, par exemple depuis un **bucket S3**.

Certaines fonctionnalités sont désormais activées par défaut comme **HTTP/3** et la suppression du log des headers d'authentification où il est également possible de créer des filtres pour retirer d'autres informations.

## WebAuthn : se débarrasser des mots de passe. Définitivement.

[Florent Morselli](https://mobile.twitter.com/florentmorselli) nous fait une proposition : il est de plus en plus possible aujourd'hui de se passer complètement des mots de passe.

Il a commencé par nous rappeler les problèmes récurrents : mots de passe trop faibles et/ou trop courts, réutilisation sur plusieurs sites, la multiplication des fuites de bases de données, etc.

La solution proposée : [WebAuthn](https://webauthn.io), un standard d'authentification multifacteur permettant d'identifier les utilisateurs via des données biométriques, des clés physiques ou sans aucune information après la première authentification sur un appareil.

Côté implémentation, Florent nous a présenté deux projets : un [bundle Symfony](https://github.com/web-auth/webauthn-symfony-bundle) pour le côté backend et un [composant Symfony UX](https://github.com/web-auth/webauthn-stimulus) pour le frontend.

## PHP WebSockets, or how to communicate with clients in real-time

Habituellement connue pour faire des conférences sur Git, [Pauline Vos](https://twitter.com/vanamerongen) nous a fait une démo en live de l'utilisation des **WebSockets** en PHP.

Elle a commencé par une rapide explication de différents protocoles de communication en temps réel existant : *WebRTC* chez Google, *Mercure* chez Symfony et *Livewire* chez Laravel.
Les WebSockets étant de simples tunnels à données, ces protocoles permettent de les enrichir de diverses fonctionnalités : identification, structures de messages, reconnexion auto, etc.

Vient ensuite la démo qui consistait en une mini webapp de tombola en ligne. Elle a été découpée en différentes étapes (préparées dans des branches Git) avec, pour chaque étape, une présentation du code et des tests en live via l'outil [WebSocketKing](https://websocketking.com).
Pour l'étape finale, un QR code a été affiché à l'écran pour permettre aux spectateurs et spectatrices de participer en live. Le hasard a voulu que le nom tiré soit [Antoine Bluchet](https://twitter.com/s0yuka), le contributeur principal d'API Platform !

## Comment (re)mettre la tech au service du bien commun ?

Pour conclure ces deux jours de conférences intenses en savoir et en émotions, animé par [Grégory Copin](https://twitter.com/gregcop1) : [Hélène Marchois](https://twitter.com/HeleneMaitre), [Paul Andrieux](https://twitter.com/paulandrieux) et [Kévin Dunglas](https://twitter.com/dunglas) nous ont proposé une excellente table ronde riche en idées et porteuse (d’un peu) d’espoir. Le sujet étant de savoir s’il est possible de faire évoluer la tech dans le but de rejoindre les objectifs de départ du logiciel libre. 

L’apparition du mouvement du logiciel libre puis celle du web se sont bâties sur de grands espoirs et de beaux objectifs : émancipation des individus, partage des connaissances à l’échelle planétaire, liberté d’expression, constructions de bien commun appartenant à toutes et tous et maintenues collectivement. Malheureusement, force est de constater que le web comme le logiciel libre ont été détournés de leurs objectifs de base et que les idéaux qu’ils portaient ont été bien mis à mal : surveillance de masse, capitalisation de ces biens communs et précarisation des individus et des libertés.

Kévin nous explique ensuite la différence entre logiciel libre et open source : API Platform est un logiciel libre plus qu’open source, même si techniquement, c'est les deux. Historiquement, le logiciel libre est apparu dans le but de créer un bien commun pour l’humanité et s’est élargi avec, notamment, la notion de commons via Wikipédia. La différence avec l’open source est que si le code est disponible, ce n’est pas uniquement pour bâtir tout et n’importe quoi avec, mais c’est un code qui porte des valeurs et qui a pour but de faire en sorte que tout le monde sans distinction puisse facilement créer de nouveaux outils qui puissent être partagés, qui appartiennent à un ensemble de personnes et qui vont socialiser le travail qui est réalisé en commun là-dessus. Le but du logiciel libre à la base, c’est de faire en sorte que ces valeurs de transparence, de démocraties, de partage de connaissance s’étendent via le logiciel à l’ensemble de la société. Donc si vous aussi, vous voulez utiliser un logiciel libre, la condition est que, vous aussi, vous devez faire quelque chose qui sert l’humanité : créer un bien commun et mettre aussi à disposition le code source du logiciel. En l’occurrence, API Platform, est une licence permissive, c'est-à-dire qu’il est possible de faire tout et n’importe quoi avec, mais ce n’est pas le cas pour le logiciel [Mercure](https://github.com/dunglas/mercure) par exemple, où si vous l’utilisez et le modifiez, vous êtes obligé de redistribuer les éléments.

Quant à l’open source, c’est une initiative qui est arrivée bien après le logiciel libre et est une offensive de multinationale de la technologie qui veut dépolitiser le mouvement du logiciel libre. Le point de départ étant que, techniquement, c’est très intéressant de créer du logiciel ensemble, de partager les coûts de maintenance entre différentes entreprises ou personnes et c’est surtout très intéressant d’avoir accès au secret de fabrication pour les choses qui ont peu de valeur ajoutée. Mais l’objectif final étant de capitaliser, faire du business et capter la valeur sur ce qui a une très forte valeur ajoutée. Par exemple, pour macOS, toutes les briques de bases sont complètement libres, développées par une communauté de personne, d’entreprise et essentiellement beaucoup de bénévoles et d'hobbyiste. Et dans ce cas-là, ce qui a une extrême valeur ajoutée, c'est l’UI au-dessus du matériel ou encore les jolis outils qui coûtent une fortune. Ce qui permet à Apple d’être la boite la plus riche du monde en réutilisant le travail de personnes qui n’ont pas fait ça pour macOS à la base.

Les trois personnes intervenantes représentant chacune une SCOP, la table ronde s’est ensuite naturellement tournée vers le lien entre le logiciel libre et le mouvement coopératif. Le lien étant la vision politique du logiciel libre via son socle de valeur : liberté, transparence, gouvernance partagée et coopération. On retrouve cet esprit de transparence, de fonctionnement démocratique et de fonctionnement par coopération à l’intérieur de la SCOP et entre les différentes SCOP.
S’en est ajoutée la question du sens par rapport à son travail. Effectivement, le logiciel libre, comme le mouvement coopératif, redonne du sens, principalement car cela ouvre le champ des possibles en vue des enjeux climatiques et sociaux actuels. Même si l'on vit dans une société qui est régie par le profit, la compétition féroce et le pouvoir, il existe des possibilités de s’organiser autrement et qui fonctionne quand même à une échelle conséquente, bien qu’encore insuffisante. Des actions individuelles existent et sont possibles. Pour cela, nous vous recommandons de regarder [la conférence d’Hélène](https://www.youtube.com/watch?v=XpY7p062zIo&list=PL3hoUDjLa7eSo7-CAyiirYfhJe4h_Wxs4) à l’API Platform Conference de l’année dernière qu’elle résume et étoffe lors de cette table ronde.

Et bien sûr, quand cela sera possible, nous vous encourageons fortement de regarder le replay de cette conférence ([sur la chaine des Tilleuls](https://www.youtube.com/c/Les-tilleulsCoop)) qui redonne un peu d’espoir quant aux futurs des organisations démocratiques de nos métiers.


## Conclusion
Merci à toutes et tous les speakers, à API Platform ainsi qu'aux Tilleuls-coop pour cet évènement ! Nous avons pu en apprendre plus sur API Platform et revenir la tête pleine d’idées pour nos projets futurs et présents ! À l’année prochaine peut-être !
