---
layout: ../../../../../layouts/post.astro
title: "API à consommer avec modération"
description: "Authentification des API par nom de domaine"
author: team_cytron
category:
tags: [outil, api, symfony, doctrine, cytron, open-source]
feature-img: "./domainuserbundle.png"
thumbnail: "./domainuserbundle.png"
comments: true
---

Après avoir travaillé pendant plusieurs mois sur la création et les [tests](/redismock-qui-a-bouchonne-mon-redis) de nos API avec Symfony, le moment de leur publication est enfin arrivé !

Or, les clients de nos API sont multiples : il peut s'agir d'applications mobiles, de sites web mais aussi d’un *back office* interne. Chacun de ces clients peut nécessiter des “vues” différentes de l’API.

Effectivement, alors que le BO devra pouvoir accéder à la totalité des ressources disponibles, l'application mobile ne devra avoir accès qu’aux ressources publiées. De la même manière, la gestion du cache ainsi que la disponibilité des routes doit pouvoir s’adapter facilement aux clients qui consomment l’API.

Nous avons opté pour l’utilisation d’un sous-domaine par client afin de l’identifier et ainsi de lui appliquer des configurations particulières. Ex :

* https://bo.api.monservice.fr pour le BO,
* https://mobile.api.monservice.fr pour l'application mobile.


#### Authentification

Nous utilisons le [composant sécurité](https://symfony.com/doc/current/components/security/introduction.html) de Symfony, qui permet de créer un utilisateur authentifié à la volée et de charger la configuration spécifique à celui-ci.

Nous avons tout d’abord besoin de créer une classe `User` implémentant `Symfony\Component\Security\Core\User\UserInterface`, et contenant les informations de configuration spécifique.

Les différents `Users` sont ensuite créés à l’aide d’un fournisseur d'utilisateurs implémentant `Symfony\Component\Security\Core\User\UserProviderInterface`.
Dans notre cas, chaque utilisateur possède son propre fichier de configuration yml. Le fournisseur d’utilisateur vérifie donc que l’utilisateur demandé possède un fichier de configuration et instancie un objet `User` avec cette configuration. Ce UserProvider est défini comme service dans notre bundle et configuré dans `security.yml`.

Il faut ensuite créer notre propre fournisseur d’authentification pour avoir une authentification par nom de domaine. Pour cela nous avons suivi et adapté le [cookbook de Symfony](https://symfony.com/doc/current/cookbook/security/custom_authentication_provider.html). Cette authentification s’articule autour de 2 classes : un FirewallListener et un AuthenticationProvider. Pour que notre FirewallListener puisse facilement récupérer le client associé, nous avons ajouté un paramètre au routing Symfony :

{% highlight yaml %}
host: {client}.api.monservice.fr
{% endhighlight %}

Le FirewallListener utilise donc ce paramètre du routing comme nom d’utilisateur et le transmet à notre AuthenticationProvider. Celui-ci récupère le `User` grâce au `UserProvider` et profite de cette phase pour vérifier que l’adresse IP du client est bien autorisée dans sa configuration grâce au [FirewallBundle](https://github.com/BedrockStreaming/FirewallBundle).

Effectivement, nous avons ajouté un filtrage initial (mais optionnel) sur les IPs pour chaque client, dans le fichiers `app/config/users/{username}.yml` :

{% highlight yaml %}
firewall:
    user_access:
        default_state: false
        lists:
            m6_prod: true
            m6_preprod: true
            m6_dev: true
            m6_lan: true
            m6_local: true
            m6_public: true
{% endhighlight %}

Pour plus de précisions, voir la [documentation du FirewallBundle](https://github.com/BedrockStreaming/FirewallBundle#firewall-bundle-).

#### Autorisation

Pour gérer les autorisations d’accès des utilisateurs aux différentes routes, nous avons créé un EventListener qui écoute `kernel.request` et qui décide de laisser passer la requête ou non en fonction de la configuration de l’utilisateur.

{% highlight yaml %}
allow:
    default: true
    methods:
        delete: false
    resources:
        exam: false
    routes:
        get_articles: false
{% endhighlight %}

Dans cet exemple, l’utilisateur a accès par défaut à toutes les routes sauf les méthodes `DELETE`, les routes concernant les `exams` et la route spécifique `get_articles`.

#### Durée de cache

Les temps de cache sont différents en fonction de l’utilisation des données. Les données du backoffice ne seront pas cachées, tandis que les données de l’application mobile auront un temps de cache de 300s.
Nous avons là-aussi créé un EventListener qui écoute cette fois `kernel.response` et qui modifie les headers de cache de la réponse en fonction de la configuration utilisateur qui peut contenir une durée par défaut de cache et des durées de cache par route.

#### Filtrage automatique avec Doctrine

Nous pouvons offrir une "vue" différente de nos données à chaque client en définissant des critères de filtrage pour Doctrine (ex: date de publication, ressource activée, etc.) dans les fichiers de configuration des clients :

{% highlight yaml %}
entities:
    article:
        active: true
        publication: false
{% endhighlight %}

Afin de ne pas modifier le comportement par défaut de Doctrine, nous avons ajouté une méthode [`findWithContext`](https://gist.github.com/oziks/8180382) à nos repositories qui reprend les mêmes paramètres que la méthode `findBy` en injectant le `SecurityContext`. Cette méthode permet donc de récupérer des entités filtrées en fonction des paramètres d'un client :

{% highlight php %}
<?php
$article = $this
    ->get('m6_contents.article.manager')
    ->getRepository()
    ->findWithContext($this->container->get('security.context'), ['id' => $id]);
{% endhighlight %}

#### Personnalisation avancée

Grâce à l'utilisation du Bundle Security de Symfony, toute la configuration spécifique à un sous-domaine est stockée dans l’utilisateur courant. Et dans Symfony, l’utilisateur courant est facilement récupérable à partir du service `security_context`. Il est ainsi possible de personnaliser n’importe quelle brique de l'application en y injectant la dépendance sur ce service.

#### DomainUserBundle

Afin d'implémenter facilement ce fonctionnement sur nos API, nous avons développé un bundle dédié. Il peut donc aussi vous permettre de gérer l'authentification et la configuration de vos API par nom de domaine.

[DomainUserBundle](https://github.com/BedrockStreaming/DomainUserBundle) est disponible en [open-source](https://tom.preston-werner.com/2011/11/22/open-source-everything.html) sur le [compte GitHub de M6Web](https://github.com/BedrockStreaming).

Enjoy !
