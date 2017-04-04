---
layout: post
date: 2006-06-21 00:30:00
title: Sharing Strong Name Keys Across Multiple Projects In VS2005
categories: [dotnet]
tags: [dotnet, strong-naming, visual-studio]
fullview: true
comments: true
---

I've recently been doing some work in Visual Studio 2005 which consisted of several projects in a single solution that I'd converted from Visual Studio 2003 format. Since the `AssemblyKeyFile` attribute has been deprecated, I began to add the shared strong name key to each project using the project properties view. The problem with this is that it copies the strong name key file to each project directory, making a shared key a bit pointless. This behaviour doesn't happen (as [explained in more detail by Shawnfa](http://blogs.msdn.com/shawnfa/archive/2006/04/24/582278.aspx)) if the strong name key file is added to the project as a linked item before setting it in the project properties view. This leaves a single strong name key file on disk, but still includes it in each project as with Visual Studio 2003's `AssemblyKeyFile` attribute.
