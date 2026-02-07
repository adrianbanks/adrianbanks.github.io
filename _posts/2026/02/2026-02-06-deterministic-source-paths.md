---
layout: post
title: Deterministic source paths in C#
categories: [dotnet]
tags: []
fullview: true
---

When an exception occurs in a .Net application, it's common see a stack trace that looks something like this:

<pre class="stacktrace">
System.Exception: This is an exception
   at Class3.Method1() in D:\code\test\Exceptions\Exceptions\Class3.cs:line 3
   at Class2.Method2() in D:\code\test\Exceptions\Exceptions\Class2.cs:line 5
   at Class2.Method1() in D:\code\test\Exceptions\Exceptions\Class2.cs:line 3
   at Class1.Method2() in D:\code\test\Exceptions\Exceptions\Class1.cs:line 5
   at Class1.Method1() in D:\code\test\Exceptions\Exceptions\Class1.cs:line 3
   at Program.<Main>$(String[] args) in D:\code\test\Exceptions\Exceptions\Program.cs:line 5
</pre>

By default, this stack trace contains the full path to the source file that was originally compiled. This isn't great as it exposes a full file path on a machine, which could potentially reveal information that you don't want sharing publicly (e.g. GDPR issue with usernames, security leaks, etc...).

All is not lost though, as this can be controlled when compiling the code by using the `DeterministicSourcePaths` property.

{% highlight xml %}
<PropertyGroup>
  <DeterministicSourcePaths>true</DeterministicSourcePaths>
</PropertyGroup>
{% endhighlight %}

By enabling this setting, the source paths will be rooted to the solution file, meaning that only the relative paths will show in a stack trace:

<pre class="stacktrace">
System.Exception: This is an exception
   at Class3.Method1() in /_/Exceptions/Class3.cs:line 3
   at Class2.Method2() in /_/Exceptions/Class2.cs:line 5
   at Class2.Method1() in /_/Exceptions/Class2.cs:line 3
   at Class1.Method2() in /_/Exceptions/Class1.cs:line 5
   at Class1.Method1() in /_/Exceptions/Class1.cs:line 3
   at Program.<Main>$(String[] args) in /_/Exceptions/Program.cs:line 5
</pre>

can of worms: 

Both projects target net10.0, which includes SourceLink built into the SDK (since .NET 8). So DeterministicSourcePaths=true is recognized by the built-in
  Microsoft.Build.Tasks.Git without needing any explicit package reference.

  The reason it works in the Anonymization repo but not in your test repo: your Exceptions repo has no commits yet. The built-in Git tasks need to resolve the repository root from git history to
  generate the PathMap. With zero commits, they silently fail and no path mapping is produced.

  The fix is simple — either:

  1. Make an initial commit in the Exceptions repo so the Git tasks can resolve the repo root
  2. Or set PathMap manually if you don't want to depend on git state:
  <PathMap>$(MSBuildProjectDirectory)=.</PathMap>

  My earlier explanation about needing an explicit SourceLink package was wrong — that's only true for .NET 7 and earlier. On .NET 8+ the SDK handles it, but it still needs a functioning git repo
  with at least one commit.


Source
ContinuousIntegrationBuild
https://github.com/dotnet/sourcelink/blob/main/docs/README.md#deterministicsourcepaths
https://github.com/dotnet/reproducible-builds/blob/main/src/DotNet.ReproducibleBuilds/DotNet.ReproducibleBuilds.props

