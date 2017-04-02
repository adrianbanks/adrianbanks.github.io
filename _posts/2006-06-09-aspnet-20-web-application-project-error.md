---
layout: post
title: ASP.Net 2.0 web application project error
categories: [aspnet, dotnet]
tags: [aspnet, dotnet, error]
fullview: true
---

Chris Sells [posted](http://www.sellsbrothers.com/news/showTopic.aspx?ixTopic=1995) a useful tip (courtesy of Scott Guthrie) about duplicate types when compiling using the web application project model in VS2005.

The error displays as:

<pre>
Compilation Error

Description: An error occurred during the compilation of a resource required to service this request.
 
Please review the following specific error details and modify your source code appropriately.
 
Compiler Error Message: CS0433: The type 'ASP.clientredirector_ascx' exists in both 'C:\Windows\Microsoft.NET\Framework\v2.0.50727\Temporary ASP.NET Files\sb2\4d76034e\bec2c8d0\App_Web_clientredirector.ascx.cdcab7d2.zmdrab5k.dll' and 'C:\Windows\Microsoft.NET\v2.0.50727\Temporary ASP.NET Files\sb2\4d76034e\bec2c8d0\App_Web_axhgbqrn.dll'
</pre>

The solution is simply (although not obviously) to add the `batch="false"` attribute to the compilation element in the web.config file:

{% highlight xml %}
<configuration ...>
    <system.web>
        <compilation batch="false"/>
{% endhighlight %}

This generates a lot fewer assemblies and avoids the problem.

**Update:** According to Mike Harder (a Software Design Engineer on the ASP.NET team) in his recent [post](http://forums.asp.net/thread/1312617.aspx) on the ASP.Net forums, this is a known bug in the ASP.Net compiler involving directory level circular references. An alternative fix to the batch="false" option is to reorganise the files in the web application to avoid a circular reference.
