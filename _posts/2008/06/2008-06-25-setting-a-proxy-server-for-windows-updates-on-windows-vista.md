---
layout: post
title: Setting a proxy server for Windows updates on Windows Vista
categories: [windows]
tags: [windows, windows-updates, proxy-server]
fullview: true
---

I've recently been trying to get automatic Windows updates working on Vista. Every time it tried to fetch the updates, it reported an error code of 80070057. After getting more detailed information from the WindowsUpdate.log in the Windows directory, the problem turned out to be the proxy server in our office. Whilst my user profile has the correct proxy server settings, the Background Intelligent Transfer Service (BITS) that is used to download Windows updates doesn't. The solution is to set the proxy server for the system.

To see the current proxy settings, run from the command line:

{% highlight text %}
netsh winhttp show proxy
{% endhighlight %}

If it says "direct", there are no proxy settings and Windows update probably will not work.

To set the proxy settings, run from the command line (you will probably need to run this with administrative permissions):

{% highlight text %}
netsh winhttp set proxy proxy-server="yourproxy:port" bypass-list="<local>"
{% endhighlight %}

This will set the proxy server on the system to allow the BITS service to connect to the Windows updates servers.
