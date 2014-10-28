---
layout: post
title: "Configuration dynamique avec Symfony ExpressionLanguage"
description: "Comment utiliser le composant ExpressionLanguage de Symfony pour rendre dynamique la configuration."
author:
  name: Team Cytron
  avatar: cytron.png
  email:
  twitter: techM6Web
  facebook:
  github:
category:
tags: [configuration, symfony, cytron]
image:
  feature:
  credit:
  creditlink:
comments: true
permalink: symfony-expression-language.html
---

Avec notre bundle [MonologExtra](http://github.com/M6Web/MonologExtraBundle), nous avons la possibilité d'ajouter des informations statiques dans le contexte de nos logs.
Nous avons maintenant le besoin d'ajouter automatiquement d'autres informations plus dynamiques comme le nom de l'utilisateur.

Pour cela, nous avons donc ajouté la possibilité de configurer une expression qui sera évaluée par le composant [ExpressionLanguage](http://symfony.com/doc/current/components/expression_language/index.html) de Symfony.

{% highlight yaml %}
config:
    env: expr(container.getParameter('kernel.environment'))
    user: expr(container.get('security.context').getToken() ? container.get('security.context').getToken().getUser().getUsername() : 'anonymous')
{% endhighlight %}

Nous avons donc injecté dans notre processeur Monolog une instance de `ExpressionLanguage` ainsi que le `container` :

{% highlight yaml %}
services:
  m6_web_monolog_extra.expression_language:
    class: Symfony\Component\ExpressionLanguage\ExpressionLanguage
    public: false
  m6_web_monolog_extra.processor.contextInformation:
    abstract: true
    class: M6Web\Bundle\MonologExtraBundle\Processor\ContextInformationProcessor
    arguments:
      - @service_container
      - @m6_web_monolog_extra.expression_language
    calls:
      - [ setConfiguration, []]
{% endhighlight %}

La [configuration sémantique](http://symfony.com/fr/doc/current/cookbook/bundles/extension.html) est gérée par l'extension du bundle :

{% highlight php %}
foreach ($config['processors'] as $name => $processor) {
    $serviceId = sprintf('%s.processor.%s', $alias, is_int($name) ? uniqid() : $name);

    $definition = clone $container->getDefinition(sprintf('%s.processor.%s', $alias, $processor['type']));
    $definition->setAbstract(false);

    $tagOptions = [];
    if (array_key_exists('channel', $processor)) {
        $tagOptions['channel'] = $processor['channel'];
    }
    if (array_key_exists('handler', $processor)) {
        $tagOptions['handler'] = $processor['handler'];
    }
    $definition->addtag('monolog.processor', $tagOptions);

    if (array_key_exists('config', $processor)) {
        if ($definition->hasMethodCall('setConfiguration')) {
            $definition->removeMethodCall('setConfiguration');
            $definition->addMethodCall('setConfiguration', [$processor['config']]);
        } else {
            throw new InvalidConfigurationException(sprintf('"%s" processor is not configurable.', $processor['type']));
        }
    }

    $container->setDefinition($serviceId, $definition);
}
{% endhighlight %}

Et l'expression est finalement évaluée par le processeur en utilisant le composant :

{% highlight php %}
protected function evaluateValue($value)
{
    if (preg_match('/^expr\((.*)\)$/', $value, $matches)) {
        return $this->expressionLanguage->evaluate($matches[1], ['container' => $this->container]);
    }
    return $value;
}
{% endhighlight %}
