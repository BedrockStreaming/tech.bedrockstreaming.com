---
layout: post
title: Scroll performance enhancement on TV apps 
description: From an R&D project came a new scroll implementation for our TV apps, with better performance and experience. 
author: [m_bernier]
tags: [TV, performance, javascript, react, web, frontend]
color: rgb(251,87,66)
---

A core experience of a Bedrock app for the end user is browsing the catalogue. Scrolling vertically though blocks of content, and scrolling horizontally though lists of items. TVs do not offer high performance, and provide poor user experience during heavy resource actions. Namely, we noticed that scrolling horizontally in a list was laggy and unpleasant. This article focuses on performance optimisation to enhance the horizontal scroll experience.

# [Context](#context)
On TV, we scroll horizontally by focusing each item sequentially, when the user presses the left or right arrow button on their remote.

Scrollable lists can be of various sizes and even include paginated content. In cases of paginated content, the next page is fetched preemptively during scroll, when the focus reaches a certain threshold.

Our old scroll component worked as follows : we would render a whole list of items, in a parent component handling scroll. When scrolling horizontally, the focus would switch to the next item. This would notify the parent component is charge of scroll, that would move the whole list laterally, based on measurements of the focused item, the size of the list and the size of the container.

There are multiple chances of improvement in this implementation.

1. Since every item was rendered in the dom, moving the whole list, was very heavy. Subsequently, a whole page of lists was itself pretty heavy to render.
2. Because the whole list is rendered, a new page fetched means the new items are immediately all rendered to the dom when a new age it fetched, imposing a heavy load to display content that is not even on the screen.

# [Virtualization](#virtualization)
To address the first shortcoming of the initial approach, we introduced virtualization. Virtualization is a technique to render only the items that are visible on the screen.

For context, the content of the list is stored in a redux store, normalised : to select a specific item from the store, all you need is it’s index in the array of item for the corresponding list.

```javascript
const ItemComponent = ({ key, position }) => {
    const item = useSelector(selectItemByIndex(position));

    return <Item {...item} />;
}
```
The virtualized scroll renders items based on a static array, each cell of the array being a slot for the item it’s going to display.
```javascript
const ScrollComponent = () => {
    const SCROLLER_BASE_ARRAY = Array.from(
        { length: nbItemsToDisplay },
        (_, index) => index - 1
    );

    return SCROLLER_BASE_ARRAY.map(index => {
        const [focusOffset, setFocusOffset] = useState(0);
        // focusOffset is a state updated upon user input : 
        // + 1 when right arrow is clicked, -1 when left arrow is clicked
        const position = index + focusOffest; 
        

        return (
            <ItemComponent
                key={`${position}`}
                position={position}
            />
        );
    });
}
```

![Schema representing 4 empty slots](/images/posts/2024-11-22-tvjs-scroll-performance-enhancement/empty-slots.png)

Each cell is connected to the store, and uses its own index as selection parameter to get the corresponding item in the store (Cell of index 0 gets the first item, cell of index 1 gets the second …)

![Schema representing 4 slots with rendered items inside](../images/posts/2024-11-22-tvjs-scroll-performance-enhancement/filled-slots.png)

At this point, only a subset of the list is rendered, as many items as the static array has cells.

Horizontal scroll is managed by incrementing the selection index upon user input (e.g., pressing the right arrow key). Using the same array, each cell now selects from the store the item for it’s index plus an “offset”, that describes how much the list is scrolled.

![Schema representing 4 slots with rendered items inside](../images/posts/2024-11-22-tvjs-scroll-performance-enhancement/filled-slots-with-offset.png)

By switching items to a cell over at every user input, we achieve a visual scroll, with only a subsection of the list displayed on screen.

![Animation showing a scrolling list.gif](../images/posts/2024-11-22-tvjs-scroll-performance-enhancement/scrolling.gif)

# [Optimised Rendering with React Keys](#optimised-rendering-with-react-keys)

The heart of the implementation is to fill each cell with a new item at each scroll. From the point of view of a single cell, when we scroll, the item it displays is new. But we know that the item already exited in the DOM, just one cell over. This is where we can leverage Reacts keys mechanism. Items rendered use a key that combine the original cell index with the current scroll offset. These keys helps React reconcile the item in cell 1 before render as the item in cell 2 after render as the same item, thus reusing the same DOM node. As a result, we get 0 re-renders for the items that are shifting places, significantly reducing the performance impact of a scroll.

![profiling.png](../images/posts/2024-11-22-tvjs-scroll-performance-enhancement/profiling.png)

<figure>
  <img src="/images/posts/2024-11-22-tvjs-scroll-performance-enhancement/profiling.png" alt="profiling"/>
  <figcaption>Profiling during a single scroll right. The only items rendering are the ones with focus change (item losing the focus and item gaining the focus) and the new item that wasn’t on the screen. Every other item in unbothered by a horizontal scroll</figcaption>
</figure>
---  

# [Optimised pagination](#optimised-pagination)

A nice win from virtualization is the impact on pagination. Only a subset of items or rendered on the screen. Also, the list itself only needs to know about that subset of items, since it uses a constant array to display its items. This means that a new page fetched has 0 impact on renders : the new items are added to the store, but the React component itself has no knowledge of that operation and triggers no re-renders. 

# [Results](#results)
_Note: measurements presented here are taken with the Chrome DevTools performance tab, with x6 CPU throttle and network connection limited to fast 4G to mimic a low performance TV device and keep a steady test environment. Times are scripting and rendering times added._

We can compare a few benchmarks to exhibit the gains from the new scroller.


Scrolling right is obviously less expensive now. Here, measurements were taken from a signe scroll right, in a 72 items list.

|Before|After, with new scroll|
|-|-|
|462ms|41ms (-91%%)|

But more closely to the apps actual use, here is a scenario measuring the cost of scrolling right through a list of 72 items, with 8 pages fetched during scroll.

| Before            | After                  |
|-------------------|------------------------|
| 9830+1785=11615ms | 8026+605=8631ms (-26%) |



Here, we include everything else a list does when scrolling (fetching new pages, additional handlers ...), so the gain is less, but still significant.

Scrolling down in a page with lighter lists is also more efficient. Here, measurements were taken during a scroll down 25 lists.

Beyond benchmarks, on device tests were also conclusive : the scroller is smother, we almost eliminate the lag caused by a pagination fetch. Overall, it feels better to scroll through a list.

# [Conclusion](#conclusion)
This frontend R&D project successfully addressed the scrolling performance issues on TV. The new scrolling solution dramatically improved performance by limiting re-renders. This optimisation ensured a smoother scrolling experience, enhancing usability on TV devices.
From this experience, we also moved on to implementing the same virtualization on the horizontal scroll of the catalogue, which presented its own challenges but was also a success.  