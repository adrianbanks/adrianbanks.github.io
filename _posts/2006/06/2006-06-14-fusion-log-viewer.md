---
layout: post
date: 2006-06-14 00:30:00
title: Fusion log viewer
categories: [dotnet]
tags: [dotnet, fusion]
fullview: true
comments: true
---

Whilst trying to work out why some code was running very slowly (see [System.Diagnostics.Process and speed]({{ site.baseurl }}{% post_url 2006/06/2006-06-14-system-diagnostics-process-and-speed %})), I tried to see whether the slowness was caused by loading code contained in a separate dll. To get this information, I needed to look at the fusion logs. Configuring these logs is not fool-proof, so having spent a few hours getting it working, I thought I'd document the process.

[Suzanne Cook's blog](http://blogs.msdn.com/suzcook/archive/2003/05/29/57120.aspx) was quite useful, as was the [Assembly Binding Log Viewer article](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cptools/html/cpgrffusionlogviewerfuslogvwexe.asp) on MSDN, but neither of them contained exactly what was needed.

To set up the fusion logs ready for viewing, some entries need to be added to the registry in the `HKEY_LOCAL_MACHINE\Software\Microsoft\Fusion` key. The combination needed depends on what you're trying to inspect. The keys are:

- **LogFailures = 1 (DWORD Value)**  
This turns on failure logging so that failed attempts to locate all assemblies are logged.

- **LogResourceBinds = 1 (DWORD Value)**  
This turns on failure logging so that failed attempts to locate satellite assemblies are logged. This is not logged by default.

- **ForceLog = 1 (DWORD Value)**  
This turns on logging for all assembly binds - both failures and successes. By default, only failures are logged. This is useful if you want to verify that an assembly is loading from a specific directory instead of from the global assembly cache.

- **LogPath = "C:\fusionlogs\" (String Value)**  
If you want to view the fusion logs easily, set the LogPath to a directory to output them to. By default the log files go into the Temporary Internet Files folder of the current user's profile. For an ASP.Net or a .Net Windows service application, the only way to view the fusion log is to use this option. This is because they run as users other than the current user. **The directory specified must already exist and have appropriate file permissions to be written to. For ASP.Net applications, the ASPNET user must have write permission to the directory.** If the permissions are wrong, there will be no log output.

Once you have configured the relevant logging options, running the .Net application will generation the fusion logs. Once generated, the logs can be viewed using the `fuslogvw.exe` tool that comes as part of the framework SDK (mine was inside the SDK folder inside Visual Studio's installation folder). I found that either the 1.1 or 2.0 version will work, but the 2.0 version is a little better as it has a few more options in the GUI:

[![Fusion log viewer][1]][1]

To view a specific log, choose it from the main section and click the view log button. The log will open in an internet browser showing the assembly binding details.

  [1]: /assets/media/images/2006/06/fusion-log-viewer.gif
