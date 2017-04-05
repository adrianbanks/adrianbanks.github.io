---
layout: post
date: 2007-02-08 00:10:00
title: Testing applications in different cultures
categories: [dotnet]
tags: [dotnet, localisation]
fullview: true
---

Having worked on an application that required localising so that it can be translated into different languages, I know how hard it can be to test the different possibilities while still developing the code. This is especially so if the language is automatically detected from the current culture of the operating system.

[Shawn Farkas](http://blogs.msdn.com/shawnfa/) came up with a simple solution for [quickly testing code under different cultures](http://blogs.msdn.com/shawnfa/archive/2006/10/20/quickly-testing-code-under-different-cultures.aspx) that involves creating a bootstrap application to first set the required culture on the current thread and then launch the application to be tested.

One downside is that only the culture of the main thread is set, but for simple GUI testing this should be adequate in most cases.
