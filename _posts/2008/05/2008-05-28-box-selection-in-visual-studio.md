---
layout: post
title: Box selection in Visual Studio
categories: [visual-studio]
tags: [visual-studio, box-selection]
fullview: true
---

I was editing a large SQL script inside Visual Studio today and needed to insert several spaces into multiple lines to make the script more readable.

Turning something like this:

{% highlight text %}
some text on line a
some text on line b
some text on line c
some text on line d
{% endhighlight %}

into: 

{% highlight text %}
some text      on line a
some text      on line b
some text      on line c
some text      on line d
{% endhighlight %}

I thought of doing it manually by hand, but as there were lots of lines to alter, I thought there must be a better way. I then remembered a feature of a word processor called [ProText](http://en.wikipedia.org/wiki/Protext) that I had many years ago on the Atari ST that had a feature called "Box Selection". This enabled you to select text across multiple lines without having to select the whole line (a bit like drawing a box with the mouse).

A quick search later and I found the [instructions on how to do box selections in Visual Studio](http://blogs.msdn.com/saraford/archive/2007/07/27/did-you-know-how-to-do-box-selection-in-the-editor.aspx) in an article on Sara Ford's blog.

Just hold down the <kbd>Alt</kbd> key whilst selecting text with the mouse and Visual Studio will switch from its normal "stream selection" mode into "box selection" mode. Once selected, you can indent the text using the tab key as normal and it will insert space to get the desired effect.
