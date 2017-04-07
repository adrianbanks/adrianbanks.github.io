---
layout: post
title: Alternatives to .Net Reflector
categories: [dotnet]
tags: [dotnet, csharp, reflector, decompilation]
fullview: true
---

[RedGate](http://www.red-gate.com) [recently announced](http://www.red-gate.com/products/dotnet-development/reflector/announcement) that from the next version of [Reflector](http://www.red-gate.com/products/dotnet-development/reflector/) (v7), they will charge $35 for a licence. Since the announcement a few weeks ago, there has been quite a backlash against the decision from the .Net community, mainly because RedGate have put a time-bomb in the currently-free version so that it will expire at the end of May 2011.
In response to this announcement, several alternatives to Reflector have surfaced - some free, some commercial. The list below outlines all of the alternatives, some of which have been around for many years.

- [JetBrains ReSharper](http://www.jetbrains.com/resharper/) (commercial + free)  
Within a day of the announcement, JetBrains [put out a teaser](http://blogs.jetbrains.com/dotnet/2011/02/reflections-on-recent-news/) suggesting that a decompiler was in the works. Two weeks later, they [announced that the next version of ReSharper will have an integrated decompiler](http://blogs.jetbrains.com/dotnet/2011/02/resharper-6-bundles-decompiler-free-standalone-tool-to-follow/) akin to reflector, along with a free standalone version to be released later in the year.

- [Telerik JustCode](http://www.telerik.com/products/justcode.aspx) (commercial)  
Just as JetBrains put out a teaser, Telerik followed suit and [showed a decompilation feature](http://blogs.telerik.com/vassilterziev/posts/11-02-07/reflections_on_the_net_world.aspx) that will be in the next version of their JustCode tool.

- [ldasm](http://msdn.microsoft.com/en-us/library/f7dy01k1(v=VS.100).aspx) (free)  
This tool comes bundled with the Windows SDK Tools (that get installed as part of Visual Studio). It is purely an IL disassembler, and so cannot decompile to C#.

- [ILSpy](http://wiki.sharpdevelop.net/ilspy.ashx) (free)  
The team behind [SharpDevelop](http://sharpdevelop.net/OpenSource/SD/Default.aspx) have been working hard on ILSpy and have already released a major milestone of v1 of their decompiler. It can decompile to C#.

- [Cecil Studio](http://sharpdevelop.net/OpenSource/SD/Default.aspx) (free)  
This is a Windows forms UI based on the [Mono Cecil](http://www.mono-project.com/Cecil) library. It has already been around for a few years.

- [MonoReflector](https://github.com/jcdickinson/Monoflector) (free)  
This is a WPF UI based on the [Mono Cecil](http://www.mono-project.com/Cecil) library.

- [MonoDevelop Assembly Browser](http://monodevelop.com/Download/MonoDevelop_2.0_Released) (free)  
Released for the first time in version 2.0 of MonoDevelop (currently at v2.4.2).

- [Salamander .Net Decompiler](http://www.remotesoft.com/salamander/index.html) (commercial)  
This is part of a larger tool called [.Net Explorer](http://www.remotesoft.com/salamander/index.html).

- [Dis#](http://www.netdecompiler.com/) (commercial)  
This tool has been around for a while, but is not often mentioned. It is not as polished as Reflector and does not support never versions of .Net, but has some nice features not seen anywhere else. Once such feature is to rename the decompiled variables within the tool to give them a more meaningful name.

- [Spices .Net Decompiler](http://www.9rays.net/Category/54-spicesnet-decompiler.aspx) (commercial)  
As well as decompiling to IL, C#, J#, C++ and Delphi.Net, this tool has a feature to build code flow diagrams from the decompiled source to show the execution flow.

- [Decompiler.NET](http://www.junglecreatures.com/DesktopDefault.aspx?tabindex=3&tabid=3) (commercial)  
This is s decompiler combined with an obfuscator, language translator and refactoring tool that integrates with Visual Studio.

- [Keep Decompiling Free](http://www.keepdecompilingfree.com)  
This website popped up recently with nothing more than a teaser to get more information when it is available.

- [RedGate Reflector](http://www.red-gate.com/products/dotnet-development/reflector/) (commercial)  
Of course, there is still the current king of them all, albeit in a now charged-for format. Still well worth the $35.

Which of these will turn out to be the best/most successful to take Reflector's throne is yet to play out, but there seems to be a healthy interest from both the community and commercial aspects in making a replacement.
