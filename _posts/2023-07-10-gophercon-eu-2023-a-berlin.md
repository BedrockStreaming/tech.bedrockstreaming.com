---
layout: post
title: Bedrock à la GopherCon EU (2023)
description: Nous étions à Berlin pour l'édition 2023 de la GopherCon EU !
author: team_backend
tags: [conference, berlin, tech, go]
color: rgb(251,87,66)
thumbnail: "/images/posts/2023-07-10-gophercon-eu-2023-a-berlin/thumbnail.jpg"
---

Depuis maintenant presque 1 an, la verticale Backend de Bedrock, s'ouvre à d'autres langages de programmation que PHP, à
savoir Golang et Rust.
C'est pourquoi cette année, pour la 1<sup>ère</sup> fois, 6 de nos collègues ont participé (2 en présentiel, 4 à
distance) à la GopherCon EU ayant lieu à Berlin.

![Fabien et Nathan](/images/posts/2023-07-10-gophercon-eu-2023-a-berlin/bedrock-people.jpg)

La GopherCon EU, c'est un peu comme le Forum PHP, mais pour le Go et à un niveau international. À cette édition, environ
600 participants étaient présents sur place ou à distance depuis les 4 coins du monde (Brésil, États-Unis, Afrique du
Nord, Europe, Asie, Australie…) et bien sûr d’autres Français.e. Elle se déroule sur 1 semaine entière :

- Jour 1 : Visite de Berlin et table ronde
- Jour 2 : Atelier
- Jour 3 et 4 : Conférences
- Jour 5 : Interview avec les UX de l’équipe Go

L'évènement avait lieu dans un espace assez typique de l'Allemagne, un "Biergarten" que l'on pourrait traduire par
"Brasserie en plein air". On vous rassure tout de suite pas de bière pendant les conférences ;)

Les conférences se déroulaient principalement dans la salle de concert du Biergarten, cependant l'après-midi, il y avait
une 2ᵉ track qui se tenait dans un entrepôt de ventes aux enchères.

![Festsaal Kreuzberg](/images/posts/2023-07-10-gophercon-eu-2023-a-berlin/festsaal-kreuzberg-berlin.jpg)

Lieux atypiques, pour nous, bonne ambiance, des gophers.euses très sympas, amicaux, respecteux.ses, tout pour assister à
des conférences fantastiques.

## Keynote - State of the Go Nation

Les deux jours de conférences ont démarré par une Keynote donnée par [Cameron Balahan](https://twitter.com/cameronbalahan),
le Product Lead pour le Go chez Google.

Cette keynote a été l’occasion de revenir sur l’historique de Go en tant que plateforme depuis sa création en 2007
jusqu’à aujourd’hui avec l’arrivée prochaine de [la version 1.21](https://tip.golang.org/doc/go1.21) en août :

- 2007 : Création de go par Google (utilisé à 20% sur les projets Google)
- 2009 : Go devient open source
- 2012 : Sortie de Go 1.0. Avec pour promesse d’assurer une plateforme stable et compatible dans le temps. Objectif : construire une plateforme pour le « software engineering »
- 2015 : Go est amélioré. Sortie de Go 1.5. Augmentation des performances. Nouveautés : compiler et runtime écrit en go, mise en place du « low latency garbage collection »
- 2018 : Introduction des modules. Amélioration de la sécurité. Nouveautés : SBOM, fuzzing
- 2022 : Introduction des generics sans breaking changes

Une fois cet historique présenté, Cameron a parlé de l’avenir du Go et de son écosystème dans les années à venir. Pour
l’équipe de développement (dont plusieurs membres étaient présents), le Go n’est pas juste un langage de programmation
mais tout un écosystème : des outils pour les IDE (le plugin Go pour VS Code est maintenu par la team), la gestion des
dépendances, les systèmes de test, le formatting, le profiling, le CLI, la rétro-compatibilité, la documentation web et
bien sûr le langage lui-même.

La rétro-compatibilité est un point sur lequel il a beaucoup insisté, en parlant notamment de l’ajout des generics
dans [la version 1.18](https://tip.golang.org/doc/go1.18), et ce, sans aucun breaking change. Cet ajout est pour la Core
Team la modification la plus complexe ayant eu lieu sur le langage, et la plus complexe qu’il n’y aura jamais. Tout ça
pour dire qu’ils ne voient pas de raison à ce qu’il existe un jour un Go 2.0 et que le langage restera donc toujours
rétro-compatible dans ses futures versions.

## Useful Functional-Options Tricks For Better Libraries

![Julien Cretel](/images/posts/2023-07-10-gophercon-eu-2023-a-berlin/conf-useful-functional-options-tricks-for-better-libraries.jpg)

[Julien Cretel](https://twitter.com/jub0bs) nous a présenté le pattern `functional options` à travers l'exemple d’une
petite librairie de gestion de `CORS`.

Pour faire cette première librairie, une première approche "classique" serait d'utiliser une fonction de création de
cors avec des paramètres pour chacune des options.

Il note plusieurs inconvénients :
- Pas très ergonomique
- Pas assez expressif
- Et pas extensible

```go
fcors.NewCORS([]string{"https://example.com"}, 0, nil)
```

Une première alternative est l'utilisation d'une config struc qui contiendrait toutes les options possibles et de passer
cette struct en paramètre :

```go
type Config struct {
  Origins []string
  MaxAgeInSeconds uint
  RequestHeaders []string
}

func NewCORS(cfg Config) *Middleware
```

C'est plus extensible, mais certains inconvénients restent :

- pas de possibilité de ne pas passer un paramètre
- peu expressif

Il propose alors une autre possibilité : le `functional options` :

```go
func NewCORS(opts ...Option) *Middleware

func FromOrigins(origins ...string) Option
func MaxAgeInSeconds(delta uint) Option
func WithRequestHeaders(names ...string) Option
```

L'idée est d'utiliser des constructeurs nommés pour instancier des options selon les besoins et de passer ses options en
paramètre !

Les avantages qu'il y voit sont :
- le système est facilement extensible
- c'est beaucoup plus expressif

Il a ensuite pu détailler certaines astuces pour aller plus loin avec ce pattern :
- « When order doesn't matter, users are happier »
- « Multiple calls to the same option »
- « Immutability »

Vous pouvez retrouver les slides de sa présentation [ici](https://github.com/jub0bs/talks/tree/main/2023/06/functional-options)
et cerise sur le gâteau, une librairie qui sert d'exemple existe : [repo](https://github.com/jub0bs/fcors)

## Towards modern development of cloud applications with service weaver

![Robert Grandl](/images/posts/2023-07-10-gophercon-eu-2023-a-berlin/conf-service-weaver.jpg)

Cette conférence, présentée par [Robert Grandl](https://twitter.com/GrandlRobert), est intéressante pour une entreprise
qui commence à utiliser Go. On peut se poser la question : Faut-il partir tout de suite sur des Micro-services ou bien
commencer par un Monolithe ?

L'idée générale de [Service Weaver](https://serviceweaver.dev) est de permettre aux développeurs de se concentrer sur le
développement de leur application sans se soucier de cette question d'architecture.

Grâce à ce framework, une application peut être développée comme une sorte de monolithe via des modules Go qui
communiquent via des interfaces. Le framework permet ensuite de déployer cette application de deux façons différentes :

- un Monolithe, où les modules communiquent via des appels direct dans un seul fichier binaire final
- des Micro-services, où les modules communiquent via des appels réseaux (gRPC) et sont déployés dans des containers
  séparés

Dans le cas d'un déploiement en Micro-services, le framework prend entièrement en charge la communication entre les
modules, sans aucun impact sur le code ou le développeur.

![Le pont Oberbaum à Berlin](/images/posts/2023-07-10-gophercon-eu-2023-a-berlin/pont-oberbaum.jpg)
