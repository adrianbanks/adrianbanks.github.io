---
layout: post
title: Extracting MSI files
categories: [windows]
tags: [windows, msi]
fullview: true
---

The latest trend for even the simplest of tools is to provide the executables as an MSI file, requiring an installation to run the application. Lots of applications simply do not require an installation and will work if the .exe contained in the MSI file is run.

[Scott Willeke](http://scott.willeke.com/) has made a nice little tool called [Less MSIerables](http://blogs.pingpoet.com/overflow/archive/2005/11/16/14995.aspx) (aka lessmsi) that can extract the contents of an MSI file directly to disk with no installation. Extracting the contents and running the .exe has worked successfully on every simple application I've tried so far.
