---
layout: post
title: ASP.Net web development helper For IE
categories: [aspnet]
tags: [aspnet, internet-explorer]
fullview: true
---

[Nikhil Kothari](http://www.nikhilk.net) has made a nice little [Web Development Helper](http://www.nikhilk.net/Project.WebDevHelper.aspx) for ASP.Net. It works as a plugin for Internet Explorer and is similar to the [Internet Explorer Development Toolbar](http://www.microsoft.com/downloads/details.aspx?FamilyID=e59c3964-672d-4511-bb3e-2d5e1db91038&displaylang=en), but with more of an ASP.Net twist.

Some of its most useful features are:

-Rich error information for script errors, including call stack, script url and line number.
- a DOM inspector with filtering to enable easy viewing of particular items.
- a view state browser.
- trace information can be shown in a separate dialog instead of in the page itself.
- a full HTTP/HTTPS logger showing all traffic between the browser and the server.

The Web Development Helper requires .Net 2.0 to run and can only work on the same machine as the server, but this should not be a problem during development.

After installation, I had the same problem that lots of other people seem to have in that clicking the newly installed toolbar button did nothing. The suggested fix of installing the [Internet Explorer Development Toolbar](http://www.microsoft.com/downloads/details.aspx?FamilyID=e59c3964-672d-4511-bb3e-2d5e1db91038&displaylang=en) solved the problem though. Nikhil also suggested that a reboot (or killing explorer.exe) may also work because information about plugins is cached on startup.
