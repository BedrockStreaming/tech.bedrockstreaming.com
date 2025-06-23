---
layout: post
title: "Crafting Your Own Streamer: A Hands-on Guide to JavaScript MSE"
description: In this article, I'm going to explain how to enhance your player using the Media Source Extension API.
author: [a_gaudard]
tags: [TVJS, smartTV, web, javascript, frontend, player, video]
color: rgb(251,87,66)
language: en
---

Streaming is now everywhere and used by almost everyone, but do you know how it works behind the frame ?

Let say you want to create a player to watch your favorite TV Show.

First step will probably be to create a page one which you will add the famous video tag, give it a source and maybe display the controls so you can interact with it.
You will end up with something like this :

```html
<video src="" controls></video>
```

Your video will probably play well, but depending on, for example the video size or your connexion, you might have some performances issues.

That's where the Media Source Extension API comes to safe the day.

## 💡 Media Source Extension

_"MSE gives us finer-grained control over how much and how often content is fetched, and some control over memory usage details, such as when buffers are evicted."_ - [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API)

Here MDN tells us that MSE allows us to better control the flow of the stream.

**This means new features are now available !**

Going back to my previous use case, what if I want to play Dune in 4K ?
It is going to be a super heavy file and if I give it to my video tag, it is going to download the entire file before being ready to play the content.

Do I want to wait to watch my movie ? Of course not ! I'm aleady in the sofa with my ice cream ready for it to start 🍦

MSE helps us manipulate other video file format such as Dash (Dynamic Adaptive Streaming over HTTP) or HLS (HTTP Live Streaming). Those formats are a list of chunk of the video we want to play.
So instead of having a massive video file we can now have a list of small part of the same video.

![Manifest file pointing to segments](/images/posts/2025-06-23-video-player-mse-introduction/manifest-1.png)

That's not all ! Those list file (= manifest) can transport additional informations.

We can now have list of chunk based on specific settings such as the resolution, a recommanded bandwidth per list, a link to subtitles and many more !

Having multiple playlist based on the resoltion brings a new acronym (I now what you think another one). We can now talk about Adaptive Bitrate Streaming (= ABR).
This adds the feature of switching qualities based on the user bandwidth to our player 🤩

![Manifest file pointing to multiple playlist of segments](/images/posts/2025-06-23-video-player-mse-introduction/manifest-2.png)

Here is below an example of an HLS manifest where you can see the playlist links to video specific resolutions as well as links to the audio file and the subtitles.

![HLS manifest example](/images/posts/2025-06-23-video-player-mse-introduction/hls-manifest-example.png)

## 🤔 How to use it ?

### Step 1

We start by creating a player component with a video tag.

```js
export const Player = ({ source }: { source: string }) => {
  return <video src={source} title="Video player" controls />;
};
```

### Step 2

Now we want to add a **MediaSource** to handle our manifest.

Also, to better manipulate our video tag we use the useRef hook from React.

```js
import { useEffect, useRef } from "react";

export const Player = ({ source }: { source: string }) => {
  const playerRef = useRef<HTMLVideoElement>(null);

  // MediaSource instance
  let ms: MediaSource;

  useEffect(() => {
    ms = new MediaSource();

    // Link the MediaSource to the video tag
    playerRef.current!.src = window.URL.createObjectURL(ms);

    // 1 - Handle the sourceopen event
    ms.addEventListener('sourceopen', onMediaSourceOpen);
  });

  return (<>
    <video title="Video player" controls ref={playerRef} />
  </>)
}
```

### Step 3

Now we need to add a SourceBuffer to handle each segments of our video.

```js
import { useEffect, useRef } from "react";

export const Player = ({ source }: { source: string }) => {
  const playerRef = useRef<HTMLVideoElement>(null);

  let ms: MediaSource;

  // SourceBuffer instance
  let videoSourceBuffer: SourceBuffer;

  // 1 - Define the SourceBuffer
  const onMediaSourceOpen = () => {
    videoSourceBuffer = ms.addSourceBuffer('video/mp4; codecs="avc1.42c01e"');

    // 3 - We add a new video chunk on each SourceBuffer update
    videoSourceBuffer.addEventListener('updateend', nextVideoSegment);

    // 4 - We fetch the fist segment (init)
    fetch(segmentInitVideo, appendToVideoBuffer);
  };

  useEffect(() => {
    ms = new MediaSource();

    playerRef.current!.src = window.URL.createObjectURL(ms);

    ms.addEventListener('sourceopen', onMediaSourceOpen);
  });

  return (<>
    <video title="Video player" controls ref={playerRef} />
  </>)
}
```

Here is the final version with the `nextVideoSegment` and `appendToVideoBuffer` methods.

```js
import { useEffect, useRef } from "react";
import { parseManifest, fetch } from './player.utils';

export const Player = ({ source }: { source: string }) => {
  const playerRef = useRef<HTMLVideoElement>(null);

  let ms: MediaSource;

  // SourceBuffer instance
  let videoSourceBuffer: SourceBuffer;

  //
  let indexVideoSegment = 1;

  // You will need to parse the manifes to get the init segment as well as all the segments
  const { video: { segmentInit: segmentInitVideo, segments: segmentsVideo } } = parseManifest(source);

  // Here we just append 10 chunks
  const numberOfChunks = 10;

  // 1 - Define the SourceBuffer
  const onMediaSourceOpen = () => {
    videoSourceBuffer = ms.addSourceBuffer('video/mp4; codecs="avc1.42c01e"');

    // 3 - We add a new video chunk on each SourceBuffer update
    videoSourceBuffer.addEventListener('updateend', nextVideoSegment);

    // 4 - We fetch the fist segment (init)
    fetch(segmentInitVideo, appendToVideoBuffer);
  };

  useEffect(() => {
    ms = new MediaSource();

    playerRef.current!.src = window.URL.createObjectURL(ms);

    ms.addEventListener('sourceopen', onMediaSourceOpen);
  });

  const nextVideoSegment = () => {
    var url = segmentsVideo.replace('$Number$', indexVideoSegment.toString());

    fetch(url, appendToVideoBuffer);

    indexVideoSegment++;

    if (indexVideoSegment > numberOfChunks) {
      videoSourceBuffer.removeEventListener('updateend', nextVideoSegment);
    }
  };


  const appendToVideoBuffer = (videoChunk: Iterable<number>) => {
    if (videoChunk) {
      videoSourceBuffer.appendBuffer(new Uint8Array(videoChunk));
    }
  };

  return (<>
    <video title="Video player" controls ref={playerRef} />
  </>)
}
```

### Step 4

Now that you should have a video playing you might realize that you don't have sound on it.
It is because we now need to do the same segment management with the audio.

<!-- TODO: Add gif a shit here we go again -->

You will then have a **videoSourceBuffer** and a **audioSourceBuffer** which will work just the same !

## 🎉 Congratulations !

You can now play a video like a pro ! 🚀

## 🔎 What's next ?

To be honest if you don't want to bother with all this chunk management, you can find libraries online that will handle it for you 😄

If you want to have a look at some I would recommand to check :

- [Shaka Player](https://shaka-player-demo.appspot.com/demo/#audiolang=en;textlang=en;uilang=en;panel=HOME;build=uncompiled)
- [HLSjs](https://github.com/video-dev/hls.js)

Those are open source and they can help you build a player faster if you don't want to handle everything on your own.

In a future article we will talk about content protection and the **Encrypted Media Extensions** API so stay tuned !

## 📚 Sources

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API)
- [LyonJS - Play Pause - Les coulisses d'un player vidéo](https://www.youtube.com/watch?v=VX9ppF6eMjc) 🇫🇷
