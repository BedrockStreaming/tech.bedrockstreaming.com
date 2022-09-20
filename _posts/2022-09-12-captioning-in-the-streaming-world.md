---
 layout: post
 title: Subtitles, open captions, closed captions, SDH, oh my!
 description: Dive into the complex world of subtitling/captioning in the streaming industry
 author: h_riffiod
 tags: [streaming, subtitles, captions, video, player]
 color: rgb(251,87,66) # this is Bedrock color here
---

# Subtitles, open captions, closed captions, SDH, oh my!

Wait, what? Subtitles and captions are not the same? Have you noticed the popular « cc » logo in a player you use, standing for « Closed Captions » but you have never heard of Open Captions? In this article we are going to dive into the different textual representations used in the streaming world.

## Subtitles vs Captions: a matter of accessibility

Since both terms are often mixed up, in this post we are going to explain in details the different types of subtitles and captions.

Subtitles exist in order to help the viewer understand the spoken language in the content being watched, assuming that the viewer can hear. This is the important part. You can think of subtitles as the closest translation of what is being said, textually represented on the screen.

### Closed Captions

Closed Captions on the other hand, assume that the viewer is deaf (or hard of hearing) hence cannot understand what is being said, regardless of the spoken language. For this reason and contrary to subtitles, it will describe spoken dialogues as well as all important audio information such as music, sounds, speaker information when it makes sense (for example narrated content). In terms of appearance, closed captions are usually white text on a black background. An important note is that they are not supported through digital connections such as HDMI.

Subtitles and closed captions are separate files that provide information for the receiver to decode. They’re not part of the stream and both can be turned off.

### Subtitles for the Deaf and Hard of Hearing

Subtitles for the Deaf and Hard of Hearing, known as SDH, are some sort of combination between subtitles and closed captions. They can be in the same language of the video original audio and bring some additional non-spoken information (speaker identification, sound effects etc.) and/or be translated. This makes the content accessible for the deaf and hard of hearing who can read and understand foreign languages.

### Open Captions

The most important difference between Closed and Open Captions is that Open Captions are always visible and cannot be turned off. Think of them as « burned » in the video stream: they are not a separate file. Because of this, quality and readability may be affected. Open captions are widely used on social media for retention: since there is a high chance that the end user is scrolling through content without sound, ensuring the display of text on the video helps catch and retain attention. In other cases where closed captions cannot be used for example if you have no control on the media player that will play your file, you may provide open captions to be sure to display a textual translation. The downside of doing this is that part of the audience might dislike the superfluous text burned in the stream.

### Forced subtitles

There is often a misconception around forced subtitles (sometimes referred as forced narratives) as they are mistaken with open captions. The name « forced » might suggest that they are burned in the video stream like open captions but there is a difference. Forced subtitles are actually distributed in a separate file and, despite their name, are not necessarily displayed. On our platform, if a subtitle or closed captions track is selected by the user, forced subtitles will not show up. We will come back to this later.

Actually, forced subtitles are a text representation of a communication element like a spoken dialogue, specify a character ID that are not described in the original (or dubbed) audio stream. A common example would be to translate alien language. Despite watching a movie in your native (or any language that does not require you to activate subtitles), you would not be able to understand so that’s when forced subtitles come into play and ensure that you have a textual representation of what is being said even if you set subtitles to off, hence the « forced » attribute.

However, imagine you are French and watch a Spanish show for instance. If you set the subtitles to French in order to be able to understand the content, forced subtitles won’t show up since you already have a textual representation of the content. Same goes for closed captions: if set to off, forced subtitles will display, if any. Otherwise, they won’t show up. To ensure better user experience, forced subtitles content should be included in all other tracks (regular subtitles, SDH, CC).

If available, forced subtitles should be displayed in the preferred language set up by the user.

To sum up, here is a table comparing the different technologies:


|  | Subtitles | SDH | Closed Captions | Open Captions | Forced Subtitles |
|-|:-:|:-:|:-:|:-:|:-:|
| Can be turned off | ✔️ | ✔️ | ✔️ | | *
| Appearance | Varies | Varies | Usually white text / black background | Varies | Varies
| Position | Bottom third, centered | Bottom third, centered | Varies | Varies | Bottom third, centered
| HDMI Supported | ✔️ | ✔️ | |✔️ | ✔️ |
| Describes music and sounds |  | ✔️ |✔️ | ✔️ | |
| Describes speaker ID |  | ✔️ |✔️ | ✔️ | |
| Available in source language |  | ✔️ |✔️ | ✔️ | ✔️ |

\*: Forced subtitles do not show up in the track selection tool making them impossible to turn on or off. However, the business rules of the media platform will take care of displaying them, if needed.
