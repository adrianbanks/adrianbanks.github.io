---
layout: post
title: Temporarily disabling ReSharper
categories: [resharper]
tags: [resharper, visual-studio]
fullview: true
---

I have [ReSharper](http://www.jetbrains.com/resharper/) installed and think it is a great tool for productivity, but occasionally I find it useful to temporarily disable it to speed up Visual Studio (especially so on my old, slow laptop). This is achieved in two different ways, depending on the version of ReSharper.

In versions prior to version 5, ReSharper appears in the `Add-in Manager` dialog, accessed via the `Tools` menu. Using this dialog, you can uncheck the ReSharper add-in which will suspend it (the menu will still be visible, but its functionality will be disabled).

![](/assets/media/images/2010/06/resharperpre5suspend.jpg)

Checking it again will re-enable it. Both of these actions can be performed without restarting Visual Studio.

In version 5, ReSharper no longer appears in the add-ins dialog. At first glance, I though the ability to disable ReSharper was no longer available. As it turns out, it is now part of ReSharper itself and is accessed via the `Tools -> Options -> ReSharper -> General` dialog. Clicking the suspend button will suspend ReSharper and disable its functionality. Once suspended, clicking the resume button will re-enable it.

![](/assets/media/images/2010/06/resharper5suspend.jpg)

This applies to all versions of Visual Studio - the difference is based on the version of ReSharper only.
