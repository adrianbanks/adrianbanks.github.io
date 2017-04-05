---
layout: post
title: Setting a culture for all threads in an application
categories: [dotnet]
tags: [dotnet, localisation]
fullview: true
---

If you do any kind of globalisation in your applications, you will probably already be familiar with the `Thread.CurrentCulture` and `Thread.CurrentUICulture` properties that can be used to set a culture on the thread so that .Net knows to load the correct resources and to format numbers and dates properly.

A big downside to using approach this is that the culture is only set on the current thread, meaning that any new threads created will be using the default culture for the application (which is tied to the regional settings of the operation system). This wasn't too much of a problem years ago when multi-threading was not used widely, but in modern application development it is virtually impossible to avoid using multiple threads (e.g. Task Parallel Library), especially when trying to make use of modern multi-core hardware. You would have to manually set the culture when spawning new threads to ensure that the correct culture was being used - a real pain and a common cause of bugs.

.Net 4.5 comes to the rescue with the introduction of two new properties:

{% highlight csharp %}
CultureInfo.DefaultThreadCurrentCulture
CultureInfo.DefaultThreadCurrentUICulture
{% endhighlight %}

A culture can be set using properties that will then be used for all threads in the whole application domain, meaning that you can set the correct culture at application start up and all threads will use that culture. By default, these properties are set to null meaning that the pre-4.5 behaviour will still hold and that the system culture will be used by default.

The MSDN docs for [`CultureInfo.DefaultThreadCurrentCulture`](http://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.defaultthreadcurrentculture(v=vs.110).aspx) and [`CultureInfo.DefaultThreadCurrentUICulture`](http://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.defaultthreadcurrentculture(v=vs.110).aspx) provide more details.
