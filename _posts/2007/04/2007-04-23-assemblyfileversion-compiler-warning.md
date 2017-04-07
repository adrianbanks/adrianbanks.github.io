---
layout: post
title: AssemblyFileVersion compiler warning
categories: [dotnet]
tags: [dotnet, csharp]
fullview: true
---

If you are using the `AssemblyFileVersion` attribute to mark your compiled assemblies with specific Win32 file version numbers, you may get a compiler warning with certain revision numbers. The compiler warning looks like this:

{% highlight text %}
warning CS1607: Assembly generation -- The version '2.0.0.070105' specified for the 'file version' is not in the normal 'major.minor.build.revision' format.
{% endhighlight %}

This warning is documented as occurring when the version string is not in the `major.minor.build.revision` format, but does not explain why it happens for the example above.

[Frans Bouma](http://weblogs.asp.net/fbouma/) updated [his existing post](http://weblogs.asp.net/fbouma/archive/2007/01/05/assemblyfileversions-2-0-0-071005-is-bad-but-2-0-0-061005-is-good.aspx) with the reason why. The revision part of the version number must not exceed 65535 (ie. a 16-bit number). If it does, the compiler generates the warning. The [MSBuild Team](http://blogs.msdn.com/msbuild/) [posted about the same thing](http://blogs.msdn.com/msbuild/archive/2007/01/03/why-are-build-numbers-limited-to-65535.aspx), but also provided the fact that it is the underlying operating system that [imposes this limit](http://blogs.msdn.com/msbuild/archive/2007/01/03/why-are-build-numbers-limited-to-65535.aspx).
