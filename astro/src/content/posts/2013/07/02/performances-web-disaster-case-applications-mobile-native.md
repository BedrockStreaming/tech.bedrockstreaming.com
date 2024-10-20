---
layout: ../../layouts/post.astro
title: "Performances web et \"Disaster case\" sur applications mobile native"
description: ""
author: k_dits 
category: 
tags: [webperf,mobile]
image:
  feature: 
  credit: 
  creditlink: 
comments: true  
permalink: performances-web-disaster-case-applications-mobile-native
---

La performance Web (ou grossièrement temps de chargement) est devenue aujourd'hui une problématique majeure dans tout développement Web.

Les outils pour mesurer / comprendre sont plutôt reconnus désormais et arrivent a une certaine maturité. Il y a toutefois encore un créneau plutôt peu documenté (à mon goût) dans le domaine, celui permettant de mesurer les temps de chargement dans des applications mobiles natives (Android / iOs ...)

Voici un retour des méthodes que nous utilisons pour mesurer les performances (notamment de chargement) de nos applications natives et générer des Waterfall Charts, mais aussi sur la mise en place de tests "disaster case" en cas d'indisponibilité de services utilisés par l'application.

Pour les besoins de ce tutoriel, nous allons prendre comme configuration, un Mac, avec une application native sur un iPhone 4 (relié au même réseau Wi-Fi que le Mac), ainsi que la version d'essai du logiciel CharlesProxy installé. (Mais la configuration et procédure est la même sur un autre OS, ou un autre mobile, et fonctionne aussi pour tester des webapps ou sites mobiles)





### CharlesProxy

Nous allons donc utiliser le logiciel payant [CharlesProxy](https://www.charlesproxy.com/), qui est un proxy HTTP ou Reverse Proxy permettant de capturer le traffic HTTP de son ordinateur. Il existe une version d'essai sans limite de 30 jours. Il y a peut être des alternatives libres, mais Charles étant plutôt une référence, c'est l'outil que nous utilisons.

Commencez donc par aller sur le site et installez CharlesProxy.

Une fois installé, lancez le, il devrait automatiquement commencer à capturer le trafic réseau.





### Connexion Wi-Fi et récupération IP

La deuxième étape consiste à connecter votre Ordinateur et votre Téléphone sur le même réseau Wi-Fi.



Récupérons ensuite notre adresse Ip via les "Préférences Système", section "Internet et sans fil" et icone "Réseau" sur votre configuration Wi-Fi :



![Performances web et "Disaster case" sur applications mobile native](../../../../images/posts/imgob/0-00-30-83-201306-ob_9f332944f7f96d84b86805a14041a546_recup-ip.png)




### Configuration du proxy sur son iPhone

Passons ensuite sur le téléphone, dans vos préférences Wi-Fi.

Cliquez ensuite sur la flèche bleu à droite du nom de la connexion sur le paramétrage Wi-Fi de notre iPhone, et descendre tout en bas du paramétrage pour configurer manuellement notre proxy HTTP :

Configurez le proxy de cette connexion pour passer par le Proxy Charles, avec l'adresse IP récupérée plus haut, et le port par défaut de Charles 8888.



Une fois la connexion lancée avec le Proxy activé et Charles bien lancé sur votre Mac, une popup d'activation devrait apparaitre :



![Performances web et "Disaster case" sur applications mobile native](../../../../images/posts/imgob/0-00-30-83-201306-ob_5fdf154fbea7025d99bd2e09dcd8e6cb_autorisation-charles.png)

Aller ensuite sur un site mobile via Safari pour vérifier que le trafic est bien capturé par votre Proxy.




A ce stade, tout est prêt pour commencer les mesures.




### Prise de mesure avec Charles

Pour prendre une mesure avec Charles, allez dans le menu "Proxy", décochez le "MAC OS X Proxy" afin de ne pas parasiter vos mesures, et nettoyez l'écran de Charles pour commencer une "session" propre.



![Performances web et "Disaster case" sur applications mobile native](../../../../images/posts/imgob/0-00-30-83-201306-ob_689b14b9dc97e42b31a007ecfe7343f1_cleaner-charles.png)

Vous n'avez ensuite plus qu'a lancer une application pour mesurer la liste des requêtes HTTP nécessaire à son démarrage.

Dans la partie Structure, un clic sur un domaine vous donnera plus d'infos (nombre de requête, et détails de chacune) ...

Sélectionnez toutes les requêtes, puis cliquez sur "Chart" sur la droite, pour obtenir un premier Waterfall (made in Charles)



![Performances web et "Disaster case" sur applications mobile native](../../../../images/posts/imgob/0-00-30-83-201306-ob_a5ed4b66cceafe170170112a0c5bc5ae_recording-charles-chart.png)



### Génération de Waterfall (plus complet)

Toujours sous Charles, avec toutes les structures sélectionnées, Fichier / Export puis selectionner le format Http Archive (.har)

Nous allons ensuite utiliser l'outil harviewer, pour visualiser le waterfall sous une forme plus complète que dans Charles.

Rendez vous ici (avec Firefox, plutôt que Chrome dont le rendu est buggé sur cet outil) : [https://www.softwareishard.com/har/viewer/](https://www.softwareishard.com/har/viewer/)

Décochez la case "Validate data before processing?" pour être moins embêté par des problèmes de compatibilité surement liés à l'export de Charles.



![Performances web et "Disaster case" sur applications mobile native](../../../../images/posts/imgob/0-00-30-83-201306-ob_1ca8d35846fcf94af13302079edba29d_harviewer.png)

Ensuite, faites un Drag & Drop de votre fichier .har dans le textarea de HarViewer pour obtenir votre waterfall, très proche de l'onglet Réseau de Firebug ou Network de la console de Chrome.

Vous retrouvez donc pour chaque requête tous les élements classique, avec détail des réponses, code HTTP de retour, taille etc, et le tout sur une timeline très précise.



![Performances web et "Disaster case" sur applications mobile native](../../../../images/posts/imgob/0-00-30-83-201306-ob_592bf871e7372f057e87d3bad159ca0d_waterfall-har-viewer.png)



### Throttling

Pour le moment, nous avons donc testé notre application sur notre connexion Wi-Fi, cas plutôt idéal. Mais comment simuler une connexion 3g par exemple, peut être plus proche de la réalité des utilisateurs de l'applications ?

Pour cela, il vous suffit d'aller dans Charles, puis le menu "Proxy" et "Throttle Settings".

La latence par défaut configurée est un peu élevée (600ms), mais vous pouvez la modifier et affiner vos tests pour se rapprocher de conditions plus réelles.

Ensuite, toujours dans le menu "Proxy", activé l'option "Throttle" et vous pourrez tester sur une connexion différente.



![Performances web et "Disaster case" sur applications mobile native](../../../../images/posts/imgob/0-00-30-83-201306-ob_e2de8973ef740d2832a1e475cc632226_throttling.png)



### Disaster Case ?

Comment savoir comment se comporte votre application si vos Webservices sont injoignables ? ou si l'un des services tiers que vous utilisez est down ? Comment trouver les [SPOF](https://blog.patrickmeenan.com/2011/10/testing-for-frontend-spof.html) (Single Point Of Failure) de vos apps ?

Toujours dans Charles, Allez dans "Tools", puis "Map Remote".

Ici, vous allez pouvoir rediriger les domaines de vos choix, vers un domaine de type Blackhole.

C'est à dire que le domaine choisi réagira comme si votre serveur web était dans un état de mort cérébrale ! Pas celui où il rejette la connexion immédiatement (trop facile), celui où il végète sans arriver à acquitter la réponse (le fameux "en attente de https:// ....")

Pour ce besoin, nous allons utiliser le Blackhole fourni par [Patrick Meenan](https://twitter.com/patmeenan) pour l'outil de mesure de performance web : [WebPageTest](https://www.webpagetest.org) : https://blackhole.webpagetest.org



![Performances web et "Disaster case" sur applications mobile native](../../../../images/posts/imgob/0-00-30-83-201307-ob_f21590aa8b7234c9f7bc596f31f3d6d3_mapremote.png)

Vous pouvez ensuite jouer avec les domaines, et regarder comment se comporte votre application dans le cas où l'un d'entre eux est inaccessible.

Sur notre iPhone 4 de test, on remarque d'ailleurs un timeout sur les requêtes de 75 secondes ! Imaginez le cas, où le développement et l'appel à ce service est synchrone ? 75 secondes de loading dans votre application avant de passer aux requêtes suivantes ...



![Performances web et "Disaster case" sur applications mobile native](../../../../images/posts/imgob/0-00-30-83-201307-ob_08a2d492e28867e560b7a8863c328022_spof.png)

Voilà, vous avez désormais une solution vous permettant de générer des Waterfall Charts pour vos apps natives, et de tester des conditions de mauvaises connexions, ou d'indisponibilité de service.

Si vous avez d'autres méthodes, plus simples ou plus complètes, ou tout autre remarque sur cette article, n'hésitez pas à le faire dans les commentaires ci-dessous.

Merci.

P.s: pour complément, n'hésitez pas à creuser le blogpost de Steve Souders sur les waterfall mobile, qui utilise une méthode très différente avec tcpdump et pcapperf [https://www.stevesouders.com/blog/2013/03/26/mobile-waterfalls/](https://www.stevesouders.com/blog/2013/03/26/mobile-waterfalls/)



