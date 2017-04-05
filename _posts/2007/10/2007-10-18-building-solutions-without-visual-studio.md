---
layout: post
title: Building solutions without Visual Studio
categories: [visual-studio]
tags: [visual-studio, compilation]
fullview: true
---

When working with several source control branches, especially with a large solution with many projects, it is not always practical to open Visual Studio to perform a quick build. Using [NAnt](http://nant.sourceforge.net) is one alternative solution, but this requires creating and maintaining a build script. Using MSBuild from the command line is another option, but this involves getting the command line arguments correct, and working with command line output is not easy to visually filter. The same goes for using Visual Studio from the command line.

[Gaston Milano](http://weblogs.asp.net/gmilano/default.aspx) has created a simple tool called [Build Console](http://weblogs.asp.net/gmilano/archive/2007/04/16/a-better-way-to-show-your-build-output-buildconsole-net.aspx) capable of loading both MSBuild and Visual Studio solution files, and building any of the available build targets.

![](/assets/media/images/2007/10/buildconsole.gif)

It's main features are:

- The ability to choose which target/project to build.
- A build report in a tree structure to show the status of each project built.
- The ability to choose the verbosity of the build output.
- A coloured build output log to distinguish different types out log output.
- A 'quick history' to load recently built solutions.

Whilst a little rough around the edges, it comes in very handy for those times where you just need to compile quickly without the overhead of loading Visual Studio.
