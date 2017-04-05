---
layout: post
title: Suppressing FxCop message
categories: [dotnet]
tags: [dotnet, fxcop]
fullview: true
---

Using the latest version (1.35) of [FxCop](http://www.gotdotnet.com/team/fxcop/), it is possible to exclude generated warning messages in the source code instead of having to exclude them in the FxCop project file. This is accomplished using the `System.Diagnostics.CodeAnalysis.SuppressMessageAttribute` class.

To exclude a message, simply mark up the method with the `SuppressMessage` attribute, declaring both the rule category and the specific rule to exclude:

{% highlight csharp %}
[SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
public string ConvertToString(object obj)
{
    return obj.ToString();
}
{% endhighlight %}

The above example will exclude the "Validate Arguments Of Public Methods" rule from the Design category for the `ConvertToString` method (although in this contrived example it is probably a bad idea to do so as passing in a `null` will clearly cause problems).

One extra "tweak" that can be utilised in this scenario is the `Justification` property. Altering the above code to:

{% highlight csharp %}
[SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods", Justification="I do have a valid reason")]
public string ConvertToString(object obj)
{
    return obj.ToString();
}
{% endhighlight %}

will allow the person excluding a message to provide a reason for doing so in the code, alongside the exclusion. FxCop (v1.35) currently doesn't display this in its output, but will do in the next release ([source](http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=623855&SiteID=1)). It does however output the justification to a generated report if the options are set to output exclusions to the report.

Excluding FxCop messages in the source code has advantages over excluding them in the FxCop project as it demonstrates that the message has been specifically excluded for that particular case, but also will withstand class and namespace changes. It also makes switching from the standalone FxCop to Visual Studio's code analysis an easier process.

In order to allow the `SuppressMessage` attribute to work, a `CODE_ANALYSIS` conditional compilation symbol must be defined for the project. Without this, FxCop will ignore the suppressed attribute and will still generate a warning.

More details can be found on the FxCop blog.
