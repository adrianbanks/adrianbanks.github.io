---
layout: post
title: Windows and .Net framework default versions
categories: [dotnet]
tags: [dotnet, windows]
fullview: true
---

[Aaron Stebner](http://blogs.msdn.com/astebner/) has compiled [a list](http://blogs.msdn.com/astebner/archive/2007/03/14/mailbag-what-version-of-the-net-framework-is-included-in-what-version-of-the-os.aspx) of which version of the .Net Framework is included in which version of Windows by default:

| Operating System | Framework Version | Included As |
| --- | --- | --- |
| Windows XP Home/Professional SP1 | .NET Framework 1.0 + SP2 | MSI Based Installer |
| Windows XP Home/Professional SP2 | .NET Framework 1.1 + SP1 | MSI Based Installer |
| Windows XP Media Center Edition | .NET Framework 1.0 + SP2 | OS Component |
| Windows XP Tablet PC Edition | .NET Framework 1.0 + SP2 | OS Component |
| Windows Server 2003 (all editions) | .NET Framework 1.1 | OS Component |
| Windows Server 2003 R2 | .NET Framework 2.0 | MSI Based Installer* |
| Windows Vista (all editions) | .NET Framework 2.0 & 3.0 | OS Component |
{:.table .table-bordered}

<sup>\* although it appears as an OS component, it is actually just an MSI based installer.</sup>

The MSI based installers can be used to install or uninstall the .Net Framework from the OS, enabling it to be removed completely if needed.

Very useful if you are targeting specific platforms with your .Net applications.
