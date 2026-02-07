---
layout: post
title: Running applications on different versions of the .Net framework
categories: [dotnet]
tags: [dotnet]
fullview: true
---

[Peter Laudati](http://blogs.msdn.com/peterlau/) posted about [migrating applications from .Net 1.1 to .Net 2.0](http://blogs.msdn.com/peterlau/archive/2006/05/11/595294.aspx). In doing so, he listed the different behaviours of .Net applications when running on computers with different versions of the .Net Framework installed:

| Application type | Computer with 1.1 | Computer with 2.0 | Computer with 1.1 and 2.0 |
| --- | --- | --- | --- |
| 1.1 stand-alone application (Web or Microsoft Windows client) | Loads with 1.1 | Loads with 2.0 | Loads with 1.1 |
| 2.0 stand-alone application (Web or Microsoft Windows client) | Fails | Loads with 2.0 | Loads with 2.0 |
| 1.1 add-in to a native application (such as Office or Internet Explorer) | Loads with 1.1 | Loads with 2.0 | Loads with 2.0 unless the process is configured to run against 1.1 |
| 2.0 add-in to a native application (such as Office or Internet Explorer) | Fails | Loads with 2.0 | Loads with 2.0 |
{:.table .table-bordered}
