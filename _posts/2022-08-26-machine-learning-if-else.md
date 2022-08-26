---
layout: post
title: Is machine learning a unicorn hiding a succession of “if” and “else”?
description: Let's think about what is behind machine learning
author: n_saby
tags: [machine learning, Data Science]
color: rgb(251,87,66) # this is Bedrock color here
---

Recently, a colleague asked me:

"All good with your if and else machine learning system?”

It was a joke but this one made me think. 

*This is a running gag: machine learning is only a succession of “if” and “else”.*

![unicorn in the forest](/images/posts/2022-08-26-machine-learning-if-else/unicorn_forest.jpg)

Beyond the joke, it is true?

Yes! …and no. As always, it depends.

**Quick answer**: Machine learning is a bunch of mathematical and statistical operations. Sometimes, the operations you use can be translated into “if” and “else” clauses, and sometimes not. But you never write the succession of “if” and “else” yourself.

## A recap of machine learning
As a recap, with machine learning, you have data, you apply an algorithm on these data to detect patterns that is grouped as a function.

![ml recap schema](/images/posts/2022-08-26-machine-learning-if-else/ML%20recap.png)

Then, you'll be able to use this function on new data to extract new information.

## A decision tree with a succession of “if” and “else”

There are different types of machine learning. If you decide to build a decision tree (a famous way to do machine learning), you’ll get something like that:

![decision tree](/images/posts/2022-08-26-machine-learning-if-else/decision_tree.png)

If you translate it with code, you’ll get something like that:

```python
if carat is high:
    return red plate
else:
    if size is high:
        return red plate
    else:
        return grey pentagon
```

**Then, yes, you can see that here, we have a succession of “if” and “else”.**

And decision trees are used a lot in machine learning. Most of the time, you don’t use decision trees directly but forests of decision trees in the Random Forest algorithm or a succession of decision trees in the Gradient Boosted Trees algorithm.

## But, many algorithms in machine learning are just the generation of plain mathematical formulas

Let’s take another famous way to do machine learning: a neural network. What we’ll get at the end is more something like that: 

```
a*10+b*15+c*16+20…
```

Then, the process doesn’t try to find a succession of “if” and “else”, but a mathematical formula.

I would like to finish with a last example: recommender systems. There are many ways to build a recommendation system. One which is well known is matrix factorization. 

*Matrix factorization, what?*

I won’t explain deeply what it is about, but as a sum up, it’s a manipulation of matrices. It comes from linear algebra.
Here is a definition: [Matrix decomposition](https://en.wikipedia.org/wiki/Matrix_decomposition).

The result is something like that: 

```
Vector A * Vector B
```

**As a result, yes, you have types of machine learning that will generate a succession of “if” and “else”. But, you have also plenty of algorithms that try to find the variables of an equation or vectors.**

## You never write the succession of “if” and “else” yourself

Let’s go back to the decision tree. As we’ve seen, the result could be translated as a succession of “if” and “else”.

But, you don’t write directly this code. You generate it using… mathematical operations. Yes, again! 

You’ve got different ways to get it and I won’t explain them. 
As an example, you can get the result of a decision tree using the Shannon Entropy which is a mathematical formula:

![shannon entropy formula](/images/posts/2022-08-26-machine-learning-if-else/formula.png)

If you want to know how it works, you’ve got this article: [Classification in machine learning - Example of Decision Tree with Shannon Entropy](https://medium.zenika.com/classification-in-machine-learning-example-of-decision-tree-with-shannon-entropy-945fc8e2a3fb)

**Then as a result, yes, you can’t have machine learning algorithms that will build a succession of “if” and “else”. But to generate it, you’ll use mathematical operations.**

## So why do we sometimes say that machine learning is a bunch of “if” and “else” statements?

To my opinion, because of expert systems. They are the ancestors of machine learning in artificial intelligence.

Artificial intelligence is a way to simulate human cognitive abilities. In the history of artificial intelligence, we thought that we’d be able to target that with expert systems. These are big successions of hardcoded rules and then... of “if” and “else”.

## Conclusion
To conclude, most of the time, machine learning is not a succession of “if” and “else”. It’s just mathematics and for some techniques, they are very old. I’m thinking of linear regressions or Bayesian probabilities. These were used long before the existence of computers.

*Photo of the unicorn by <a href="https://unsplash.com/@stephenleo1982?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Stephen Leonardi</a> on <a href="https://unsplash.com/s/photos/unicorn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>*
