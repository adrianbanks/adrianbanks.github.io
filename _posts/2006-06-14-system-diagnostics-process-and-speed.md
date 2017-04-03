---
layout: post
date: 2006-06-14 00:10:00
title: System.Diagnostics.Process and speed
categories: [dotnet]
tags: [dotnet, performance]
fullview: true
comments: true
---

I was working on some code that seemed to take an age to get going. Simple I thought: run it throught the [Red Gate ANTS Profiler](http://www.red-gate.com/products/ANTS_Profiler/index.htm), look at the offending code and sort the problem. I wish it was as straightforward. Profiling or debugging the code seemed to make it run quickly, so I had to resort to the good old technique of logging debug output line by line.

After finding the lethargic code, the line that stalled progress for almost a minute didn't look that concerning:

{% highlight csharp %}
Process.GetCurrentProcess().ProcessName
{% endhighlight %}

A bit of Googling turned up trumps. A [post by Brian Grunkemeyer](http://groups.google.co.uk/group/microsoft.public.dotnet.framework.performance/browse_frm/thread/d26aad313dedcd9d/b6db985440fa4b7b?lnk=st&q=c%23+process.processname&rnum=1&hl=en#b6db985440fa4b7b) from the BCL team gave the answer:

> The way the Process class currently works, the first time you try to do anything that requires knowing the state of the current process, we take a snapshot of all the processes in the system. So yes, this operation is slow the first time you call it. We could potentially limit this snapshot to just the current process by requesting MORE information about the current process from Windows (CreateToolhelp32Snapshot is a peculiar method), but that leads into peculiar situations where the snapshot information for the current process then gets out of sync if you call another method on the Process class to enumerate all the other processes.

This initial snapshot must have been the cause of the delay. A quick code-edit later to avoid the use of the Process class (I was actually interested in the name of the executing file so I used `Assembly.GetExecutingAssembly()`) and the almost 60 second pause was gone.

So why was it running quicker when debugging/profiling? I presume that the debugger/profiler would have been using the `System.Diagnostics` namespace, and more specifically the `Process` class, as part of its internals, thus the costly first call snapshot had already happened.
