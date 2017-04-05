---
layout: post
title: Extracting MSI files (revisited)
categories: [windows]
tags: [windows, msi]
fullview: true
---

A few years ago, I posted about [how to extract the contents of an MSI file]({{ site.baseurl }}{% post_url 2006/06/2006-06-29-extracting-msi-files %}) without having to go through the process of installing it. The tool used to do this was called [Less MSIerables](http://blogs.pingpoet.com/overflow/archive/2005/06/02/2449.aspx). This tool does do the job, but the UI is a bit clunky to use, it has a few bugs, and occasionally fails to extract the contents of a file. On top of this, it looks like this tool is not actively developed (it was last updated in 2005), so I recently started to look for an alternative.

It turns out that Microsoft provide this functionality as part of MSIExec that comes as part of the Windows installer. To extract the contents of any MSI file, simply run the following:

{% highlight text %}
msiexec.exe /a installer.msi /qb TARGETDIR=C:\temp
{% endhighlight %}

This will extract the complete contents of the MSI file to the specified directory.
