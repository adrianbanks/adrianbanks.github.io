---
layout: post
title: .Net 2.0 installation
categories: [dotnet]
tags: [dotnet, installation]
fullview: true
---

[Aaron Stebner](http://blogs.msdn.com/astebner/default.aspx) posted [a recent article](http://blogs.msdn.com/astebner/archive/2006/07/02/655011.aspx) about the available installation modes for the [.Net Framework 2.0](http://msdn.microsoft.com/netframework/downloads/updates/default.aspx).

There are three supported modes:

**Standard Mode**

All UI screens are displayed, including warnings about missing prerequisites, existing beta versions, errors and reboots.

The setup includes a multi-lingual UI that chooses the correct language from the user's operating system UI language settings, so a user should always see the install in their preferred language.

**Unattended Mode**

All UI screens are suppressed, except for a progress dialog during installation.

To install in unattended mode, use the following command line:

{% highlight shell %}
dotnetfx.exe /q:a /c:"install.exe /qb"
{% endhighlight %}

Changing `/qb` to `/qb!` will hide the cancel button on the progress dialog, stopping the user from aborting the install.

**Silent Mode**

All UI screens are suppressed. This is useful for a custom installer to install the .Net Framework.

To install in silent mode, use the following command line:

{% highlight shell %}
dotnetfx.exe /q:a /c:"install.exe /q"
{% endhighlight %}

If using silent mode, any errors, previous beta versions or reboots must be handled by the hosting installer since the .Net Framework installer cannot display any dialogs to prompt the user. Aaron also provides details of [possible return codes from the installer](http://blogs.msdn.com/astebner/archive/2005/12/07/501381.aspx), [how to detect previous beta versions of the framework](http://blogs.msdn.com/astebner/archive/2006/04/30/587352.aspx) and [how to manage reboots](http://blogs.msdn.com/astebner/archive/2006/06/13/627729.aspx).
