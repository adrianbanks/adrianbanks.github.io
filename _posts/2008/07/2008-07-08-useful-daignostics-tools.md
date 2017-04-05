---
layout: post
title: Useful diagnostics tools
categories: [diagnostics]
tags: [diagnostics, tools]
fullview: true
---

I recently visited a customer site to diagnose some problems with an application deployed on a server. Because I was effectively "visiting blind" in not knowing what was wrong or even if I would have internet access, I had to pre-empt any potential problems and take whatever tools I would need to diagnose them with me.

The following is a list of the tools I took:

- [Active Ports](http://www.tucows.com/preview/213738)  
This is an equivalent to running `netstat -nabv 5` from the command line, but wraps a nice GUI around it with the ability to look up the host names for connected IP addresses.

- [BareTail](http://www.baremetalsoft.com/baretail/)  
This is a simple log file viewer that can "tail" a running log and apply highlighting based on custom searches.

- [CorFlags](http://msdn.microsoft.com/en-us/library/ms164699(vs.80).aspx)  
This is a tool that comes as part of the Visual Studio SDK and enables a .Net application to be forced to run as 32-bit on 64-bit hardware. Existing applications can be tweaked without re-compilation.

- [Culture Launcher](http://www.adrianbanks.co.uk/downloads/download.php?id=04196e2c89a0b6d4f4266c7a636470ea)  
This is one of my own tools that can launch an .Net application using a different culture/language. The culture and UI culture can be set independently of each other.

- [Error Lookup](http://msdn.microsoft.com/en-us/library/akay62ya(VS.80).aspx)  
This is a small tool that comes with Visual Studio (when you install the C++ components). It enables Win32 error codes to be translated into "meaningful" English error messages.

- [Managed Stack Explorer](http://www.codeplex.com/Wiki/View.aspx?ProjectName=MSE)  
This is a tool that can preiodically capture stack traces from running .Net applications. It also shows a variety of information about the managed processes and threads running on a machine.

- [Red Gate Diagnostics Tool](http://labs.red-gate.com/index.php/Main_Page)  
This is a tool from Red Gate that collects lots of system information from a computer. It is very useful because of the amount of data that it collects all in one place.

- [Snippet Compiler](http://www.sliver.com/dotnet/SnippetCompiler/)  
This is like a cut-down version of Visual Studio. It has an IDE-like editor (with only basic intellisense) and can compile and run .Net applications. The biggest plus is that it requires no installation.

- [SpaceMonger](http://www.sixty-five.cc/sm/v1x.php)  
This is a tool that gives a visual representation of disk usage for a whole drive. This version is an older version of the tool, but is the last version that is free.

- [SysInternals](http://technet.microsoft.com/en-us/sysinternals/default.aspx)  
This is the famous SysInternals Suite of tools, now owned by Microsoft, but still occasionally updated with new features and bug fixes. This contains lots of file, disk, network, process, registry and system utilities.

This toolset (along with a few custom-written SQL scripts) provided me with everything I needed to collect all the information I needed to get to the bottom of the problems.
