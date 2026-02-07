---
layout: post
title: Visual Studio 2005 and proxy authentication
categories: [dotnet, visual-studio]
tags: [dotnet, visual-studio, proxy]
fullview: true
---

Using Visual Studio 2005 today, I received a "407 Proxy Authentication Required" message when trying to search the online help integrated into the IDE. [KB910804](http://support.microsoft.com/?kbid=910804) from Microsoft held the answer.

In order to allow VS2005 through an authenticating proxy, you have to edit the Visual Studio configuration file located at `C:\Program Files\Common Files\Microsoft Shared\Help 8\dexplore.exe.config`. To add support for the proxy, make sure the proxy element is present:

{% highlight xml %}
<configuration>
    ...
    <system.net>
        ...
        <defaultProxy enabled="true" useDefaultCredentials="true">
            <proxy bypassOnLocal="True"
                   proxyAddress="http://yourproxy:port"/>
        </defaultProxy>
    </system.net>
</configuration>
{% endhighlight %}

where the correct proxy server is configured in the proxyaddress element.

If you use the integrated help viewer, you must also add this xml to the configuration file located at `C:\Program Files\Microsoft Visual Studio 8\Common7\IDE\devenv.exe.config`.
