---
layout: post
title: How we made our apps more accessible on SmartTVs 📺
description: In this article, I'm going to share with you how we improved our accessibility score of our apps at _TVJS_.
author: [j_nginn]
tags: [TVJS, smartTV, javascript, react, web, frontend, accessibility, a11y]
color: rgb(251,87,66)
language: en
---

Accessibility is at the heart of our concerns, at Bedrock Streaming we work hard to make our applications accessible to everyone.
In this article, I'm going to share with you how my team and I improved our accessibility score of our SmartTV apps by 18% in just a few months!
This improvement is even more impressive because on smartTV we have to manage several constraints, including taking into account the specificities of each device (Tizen, WebOS, Hisense, Panasonic, etc.).

I tried to make this article accessible to everyone, whether you're a developer or not. I have to admit that for the code samples, you need to know a bit of `HTML`, `CSS` and `JavaScript`, but I tried to explain it as simply as possible.

Hi there! 👋 I'm Julie Nginn, I'm a front-end developer and the accessibility technical referent at the _TVJS_ service. We called this service "TVJS" because we develop the apps for the smartTVs, like Samsung, LG, Sony etc. using JavaScript.
First of all, you need to know that I'm very passionate and engaged in accessibility. My main motivation is to make the streaming better for everyone, including people with disabilities. 💪

> ℹ️ What is the web accessibility?
> 
> Web accessibility is the practice of designing and developing websites so that they can be used by as many people as possible, including those with disabilities. It's about removing barriers that prevent people from accessing or interacting with web content.

## Background
### October 2022
During the R&D (Research and Development) day at Bedrock, we decided to investigate and see if it is possible to implement audio guidance on our TVJS apps. Audio guidance is a basic feature on the smartTVs that can be found in the accessibility settings which allows the user to hear the text on the screen.

I took the lead on this project and I started to implement it for the platform WebOS first, because it's the device I had at home, and it's pretty easy to test on this device.
At that time, the only documentation I found to implement the feature on WebOS was using the [Luna Service API](https://webostv.developer.lge.com/develop/references/luna-service-introduction) to enable the audio guidance feature. By calling the method `voicereadout.readAlert()` returned by the API and passing it the text we want to read.
For the demonstration, I implemented it in the pairing page. When any button in this page is focused, we can hear the text of the button.

Here is the result of this first POC (it's in French):
<video src="/images/posts/tvjs/tvjs_tts_webos.mp4" width="560" height="315" controls>
</video>

The implementation was pretty simple (but spoiler alert: it will be even easier later). Here is the code, we need to add to enable the audio guidance feature on WebOS:
```js
const audioGuidanceConfig = {
  urlLuna: 'luna://com.webos.settingsservice',
  method: 'getSystemSettings',
  parameters: { keys: ['audioGuidance'], category: 'option' },
  requestType: 'audio guidance',
};

const activateTTS = async (text) => {
  if (!text) {
    return;
  }

  try {
    const { settings } = await wrappers.window.serviceRequestWrapper(audioGuidance);

    if (settings && settings.audioGuidance && settings.audioGuidance === 'on') {
      const { voicereadout } = wrappers.window.getWebOS();

      voicereadout.readAlert(text);
    }
  } catch (e) {
    // Fail silently
  }
};
```

Then, in order to use it in our app, we just have to call the function where we want to read the text. At this time, my first idea was to find a way to trigger the focus to be able to pass the text to read to `activateTTS`.
But it was not very simple because, the navigation on our apps was managed by a custom navigation system, and the focus was not managed by the browser. So, I  created a HOC (Higher Order Component) to manage the focus and the text to read.

```js
const withTTS = Component => {
    const TTSComponent = ({ children, focus, ...props }) => {
        const text = typeof children === 'string' ? children : undefined;

        useEffect(() => {
            if (text && focus) {
                activateTTS(text);
            }
        }, [focus]);

        return <Component {...props} />;
    };

    return TTSComponent;
};
```

To manage the navigation and the focus in our components, we used a HOC called `withNavigator`. Thanks to this, the wrapped component become focusable and navigable with the remote control (and the keyboard directional arrows). I won't talk more about our navigation system today because it should have its own article.
By using `withTTS` inside the `withNavigator` to wrap the `Button` component, we can retrieve the `focus` status from the props. So, we can call the `activateTTS` function when the button is focused.

```js
const NavigationButton = withNavigator(withTTS(Button));
```

We can clearly improve this code, moreover, with hindsight, I realize that it was quite cumbersome to have to add this HOC to all the components we wanted to read. But at this time, I was proud to have been able to prove that it was possible to implement the audio guidance on our smart TV apps. 🎉
After this POC, unfortunately no initiative was taken because the accessibility was not our first priority at that time, so this feature had been abandoned... 😭

### February 2024
A few months later, I decided to spend another R&D day to develop another feature to improve the accessibility of our apps. This time, I wanted to do something especially for the dyslexic people, because I'm dyslexic myself, and I'm a big user of streaming platforms.

In accessibility, we can often see features for the blind or the deaf people, but it's rare to see something for the dyslexic ones and even more on streaming platforms.
So, I started with a benchmark to see what is already done in the industry and at that time none of our competitors has implemented a feature for the dyslexic people, except Canal+ (for video subtitles only).

After that, I put myself in the shoes of a user and imagined what could be useful for me to enjoy my experience on our apps. The project "Dyslexic mode" on TVJS was born! 🎉

First, I added a new entry called "Accessibility" in the user settings, where the user can activate the "Dyslexic mode" and personalize the font and the size of the text etc.
And then, the personalization will be applied on the whole application.

<img src="/images/posts/tvjs/tvjs_dys_settings.png" alt="tvjs_dys_entry" height="340px" />
<img src="/images/posts/tvjs/tvjs_dys_entry.png" alt="tvjs_dys_entry" height="340px" />
<img src="/images/posts/tvjs/tvjs_dys_program.png" alt="tvjs_dys_entry" height="340px" />

To do that, we updated the global style, using CSS and JavaScript, to switch between the dyslexic and the default modes.

```js
if (dyslexicMode) {
  document.getElementById('root').style.letterSpacing = '3px';
  document.getElementById('root').style.wordSpacing = '5px';
  document.getElementById('root').style.fontFamily = '"Open Dyslexic", Arial, sans-serif';
} else {
  document.getElementById('root').style.letterSpacing = null;
  document.getElementById('root').style.wordSpacing = null;
  document.getElementById('root').style.fontFamily = 'Arial, sans-serif';
}
```

As you can see it's very easy to personalize the font, and since we can use only CSS to do that, the performance is not impacted. This feature requires very few resources and effort but brings considerable improvement for users.

Why is it interesting for the user to have this feature? Because it can help reduce reading time, fatigue and errors. It can also help to improve comprehension and focus. The user experience is clearly better.
And what is the benefit for Bedrock Streaming? It's a competitive advantage, it's a way to show that we care about our users, and we want to make the streaming better for everyone.

As a user, this kind of feature is very important, especially on smartTV apps, because when we watch a movie or a series, we're on our sofa, which is often a long way from the TV, and we don't all have plasma screens. So, the text should be readable to keep the user on our platform.

I presented this project to Mathieu Bouillot (our Product Manager, expert in accessibility) and some of our designers, and they were very enthusiastic about it. We worked together with Mathieu, and some months later the initiative "Style Switcher" was created. 🥹
The project deserves a dedicated article, so I will not go into details here. But the main idea of this project is to allow the user to personalize the font, the size, the spacing, the colors etc. of the text on the whole application, so the user can adapt the app to his needs.

## 2024 March: the first accessibility audit
First of all, I'm going to explain what is an accessibility audit. 

An accessibility audit is a process to evaluate the accessibility of a website or an application. The goal is to find the issues and the barriers that prevent the users with disabilities to use the website or the application.
The audit is based on the WCAG (Web Content Accessibility Guidelines) which is a set of rules to follow to make the web accessible to everyone:
- **Perceivable:**  Users must be able to perceive the information being presented. This means it must be presentable to the senses (e.g., sight, hearing, touch) in ways users can understand
- **Operable:** Users must be able to operate the interface. This means users must be able to interact with the controls and content (e.g., using a keyboard, mouse, or assistive technology)
- **Understandable:** Users must be able to understand the content and the interface. This means the content and interface must be clear, consistent, and easy to understand
- **Robust:** The content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technology

The audit is based on the conformity rate of the WCAG, and the score is between 0% and 100%.
In France, we use the RGAA (Référentiel Général d'Amélioration de l'Accessibilité) which is based on the WCAG, but with some specificities for the French administration.
There are three levels of conformance:
- **non-compliant** (0% to 49%)
- **partially compliant** (50% to 99%)
- **totally compliant** (100%)

Obviously, the audit alone cannot evaluate whether a site or application is completely accessible, as there are many factors to consider, and it remains theoretical because we cannot know if users will actually find it accessible.
But as developers, we need to follow the accessibility rules at least and keep our code with a correct semantic. 

So, in March 2024, we received the first audit of the TVJS apps from Mathieu. The score was 43% 😱 The score is not catastrophic, but we noticed that our app is non-compliant. We could do better, and we decided to do so!

![The score for TVJS with the first audit](/images/posts/tvjs/tvjs_accessibility_first_audit.png)

We first decided to "prepare the ground" and fix some minor issues. Then, to have the same knowledge and understanding of the accessibility, we organized a workshop with Mathieu and the TVJS core developers to explain the basics of the accessibility, the WCAG, the ARIA (Accessible Rich Internet Applications), the tools etc. 
We can perceive the accessibility as an annoying constraint to do when we develop an app, because we need to follow some specific rules. But, when we know the context and the importance of accessibility for users, our engagement is different. And that's what happened during this workshop. The developers were very interested and motivated to improve the accessibility of our apps.

During this workshop, we also explained to Mathieu the constraints and the specificities of the smartTV apps, because those are not the same as web apps. For example, focus management is different, navigation is different *(remote control and no keyboard)*, screen reader is different etc. With his help, we did a mob programming to find some solutions to implement screen reader on our apps.
And now, the POC I did 2 years ago becomes a reality. 🤩 However, it was not easy, because on the TVJS apps, we use a custom navigation system to be able to navigate with the remote control. This system is not compatible with the screen reader because we need to use the native focus management of the browser and to use the correct HTML tags and attributes. 

## The refactoring
### Our contraints
This refactoring was not easy, we had to manage several constraints because of the platform we worked on. Even if we use a web app on the smartTV, we need to take into account the specificities of each device and also their versions. Some of them use an old version of the browser, so some of the HTML tags and attributes are not supported. 

For example, if we don't produce a list using `ul` and `li`, the screen reader is not able to identify the list. To have a good semantic we have to update our lists from nested `div` to `ul`/`li` HTML tags.
But even if we use the correct HTML tags, the screen reader is not able to read the list correctly because the browser doesn't manage the lists natively, because of the old OS version of the browser.
So to work around this problem, we decided to manage the lists manually by using the number of elements and their position in the list to announce to the user that they are in a list. We also need to handle the texts and translations by ourselves, which we wouldn't need to do on the web because the screen reader does it natively.

Also, each device works differently and needs a specific configuration. At TVJS, we manage a dozen of different platforms. We had to test and document each device to see if the audio guide feature is present and ensure our implementation works correctly on them. 
Sometimes the results were different between devices, so we need to be attentive during development and testing.
And for the unsupported devices/versions, we must avoid negatively impacting them with our changes.

### Updating the HTML structure
We made many pull requests to refactor our components to use the correct HTML tags and attributes. For example, we replaced the `div` by `button`, `span` by `h1`, `h2`, `h3` etc. to have a good semantic for accessibility. We also added the ARIA attributes to improve the accessibility of our components.
Thanks to Mathieu, we learned the good practices and how to use the ARIA attributes as `aria-label`, `aria-hidden` or `aria-describedBy`.

Here is a typical example of what we did:

Before:
```js 
const Sidenav = () => (
    <div className="sidenav">
        {entries.map(({ entry }, index) => 
            <div key={index} className="sidenav__item">{entry}</div>
        )}
    </div>
);
```

After:
```js 
const Sidenav = () => (
    <nav role="navigation" className="sidenav">
        <ul>
            {entries.map(({ entry }, index) =>
                <li key={index} className="sidenav__item">{entry}</li>
            )}
        </ul>
    </nav>
);
```

ℹ️ We replaced the `div` by the more appropriate tag as `nav`, `ul` and `li`.

### Using the native focus management
As I mentioned before, to navigate through our apps, we developed our own navigation system with a custom focus management. But the screen reader doesn't work with this system because it needs to use the native focus.
So, we refactored our system to fix this issue by synchronizing the focus of the browser with our navigation system. We added `HTMLElement.focus()`, and `tabindex` attribute to make some elements focusable.

### Implementing audio guidance on SmartTV
To implement the audio guidance feature to WebOS, we need to enable the feature in the WebOS config (`appinfo.json` file) as following:

```json
{
  "accessibility": {
    "supportsAudioGuidance": true
  }
}
```

Compared to what I did in my first POC in 2022, the implementation is much simpler and more efficient.

Even simpler, on Tizen and Hisense, we didn't need to do anything, since we already refactored our code by using the correct HTML structure and the native focus, audio guidance is already enabled by default on these platform. But of course, it depends if the device version is compatible with the feature.
To date, the work is still in progress to list all the supported devices.

## 2024 October: the second audit
![The score for TVJS with the first audit](/images/posts/tvjs/tvjs_accessibility_scores.png)

Some months later, we received the second audit of the TVJS apps from Mathieu and the score has increased to 61%. 🚀 I am very proud of my team and myself, because we did a great job! We improved the accessibility of our apps by 18% in just a few months. It's a great achievement, and it's just the beginning. We are motivated to reach the 100% of the accessibility score. 💪
Of course, this performance is also due to the work of Mathieu (our PM) and Shaïnez (our PO) who have been very helpful and supportive during this refactoring.
I think the communication between the product line and the technical line is primordial to be sure to go in the right direction. And obviously, the communication between the developers is also important, it's thanks to our many brainstorming sessions that we found the best solutions.

If I have some advice to give to the developers who want to improve the accessibility of their apps, it would be:
- Before developing, to think about the accessibility and use the good practices (like the semantic HTML, the ARIA, the focus management etc.)
- Take the time to understand the accessibility, the constraints and the specificities of the platform (by attending a workshop for example)
- If possible, to have an accessibility referent in the team to stay aware of this topic and communicate with the product line and the designers
- To test with the existing tools (like [Axe](https://www.deque.com/axe/), [Wave](https://wave.webaim.org/), the screen reader and the browser accessibility panel)
- To test directly on the device and if possible with the users

To conclude this article, I would like to note accessibility is not a constraint, it's a strength, and a competitive advantage for our apps. If our platform is accessible, the users will be happy and will prefer to use our apps rather than the other ones. 
The accessibility is not only for the people with disabilities, it's for everyone. And in the TVJS team, we understand that well! 📺

## 📚 Sources
___
- WCAG Guidelines: [https://www.w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)
- RGAA: [https://accessibilite.numerique.gouv.fr](https://accessibilite.numerique.gouv.fr)/
- Accessibility Tools: [Wave](https://wave.webaim.org/) - [Axe](https://www.deque.com/axe/) - [Screen reader](https://www.nvaccess.org/) - [Browser accessibility panel](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- HTMLElement.focus(): [https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)
- WebOS audio guidance: [https://webostv.developer.lge.com/develop/references/luna-service-introduction](https://webostv.developer.lge.com/develop/references/luna-service-introduction)