---
layout: post
title: MSDN low bandwidth view
categories: [msdn]
tags: [msdn]
fullview: true
---

Several months ago, I read a tip about passing an extra parameter on the url to MSDN documentation to put it into "low bandwidth" mode. I remember doing it at the time, but almost immediately forgot the url switch. That was until last week when I read [Eric Nelson](http://blogs.msdn.com/ericnel)'s [post on how to do it](http://blogs.msdn.com/ericnel/archive/2009/04/02/msdn-library-low-bandwidth-option.aspx).

The trick is to put `(loband)` before the `.aspx` part of the url. For example, the low bandwidth version of

{% highlight text %}
http://msdn.microsoft.com/en-us/library/system.object.aspx
{% endhighlight %}

becomes

{% highlight text %}
http://msdn.microsoft.com/en-us/library/system.object(loband).aspx
{% endhighlight %}

Once you have accessed it, you can persist it by clicking on the “Persist low bandwidth view” link.

Since Eric wrote his post, it seems that a “Switch on low bandwidth view” link has been added into the normal MSDN pages to enable it to be switched on without hacking around with the url.

[Jon Galloway](http://weblogs.asp.net/jgalloway) has a [post that summarises the benefits of the low bandwidth view](http://weblogs.asp.net/jgalloway/archive/2008/08/30/msdn-low-bandwidth-bookmarklet.aspx). For me, the biggest benefit is the speed of loading, since the page doesn’t run lots of JavaScript to sync the contents tree to the currently displayed article.
