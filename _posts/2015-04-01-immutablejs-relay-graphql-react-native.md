---
layout: post
title: "Introduction à Immutable.Js, Relay + GraphQL et React Native"
description: "Compte rendu de la React Conférence ciblé sur 3 sujets : Immutable.Js, Relay + GraphQL et React Native"
author: kenny
category:
tags: [javascript, react, reactnative, lft, video]
feature-img: "images/posts/reactconf/reactnative.png"
thumbnail: "images/posts/reactconf/reactnative.png"
comments: true
---
Voici un petit compte rendu vidéo, filmé lors de notre [Last Friday Talk](https://tech.m6web.fr/organiser-des-conferences-technique-en-interne/) de Mars, d'un retour de veille techno suite à la [React Conférence](https://conf.reactjs.com/).

Le retour est une introduction sur 3 des sujets qui m'ont paru les plus importants lors de cette conférence :

* <a href='javascript:;' id='sn1-button'>Immutable.Js</a>
* <a href='javascript:;' id='sn2-button'>Relay + GraphQL</a>
* <a href='javascript:;' id='sn3-button'>React Native</a>

La vidéo :

<iframe id='playerVideo' width="560" height="315" src="https://www.youtube.com/embed/-TjG0nMbQ2k?enablejsapi=1&html5=1" frameborder="0" allowfullscreen></iframe>

Les slides :

<script async class="speakerdeck-embed" data-id="67994df555e64b37b04a49fddacccc6d" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

Pour plus d'informations sur la React Conférence, nos CR sont disponibles ici : 

* [Compte rendu React Conférence Jour 1](https://tech.m6web.fr/cr-react-conf-2015-day-one)
* [Compte rendu React Conférence Jour 2](https://tech.m6web.fr/cr-react-conf-2015-day-two)

Enjoy

<script type='text/javascript'>
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('playerVideo', {
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {

  var sn1 = document.getElementById("sn1-button");
  sn1.addEventListener("click", function(){
    player.seekTo(440, true);
  });


  var sn2 = document.getElementById("sn2-button");
  sn2.addEventListener("click", function(){
    player.seekTo(778, true);
  });


var sn3 = document.getElementById("sn3-button");
  sn3.addEventListener("click", function(){
    player.seekTo(1272, true);
  });

}
                                    
</script>
