---
layout: post
title: Accessing network file shares from a command prompt
categories: [windows]
tags: [windows, file-shares, command-prompt]
fullview: true
---

If you've ever tried to access a network file share in a command prompt by simply using the cd command, you'll know that it just complains that "CMD does not support UNC paths as current directories". Well, there is a way to do it (two in fact):

{% highlight text %}
net use z: \\machine\share
{% endhighlight %}

{% highlight text %}
pushd \\machine\share
{% endhighlight %}

Both of these approaches map the network share to a local drive letter that you can change to using the cd command.

The first one can be combined with the /user switch to provide additional user details:

{% highlight text %}
net use z: \\machine\share /user:domain\username
{% endhighlight %}

The bonus of using the pushd command over the net use command is that it will automatically change the current directory to the mapped drive (which will be the first unused drive letter available in reverse alphabetical order). Also, when finished with the network share, you can use the popd command to remove the mapped drive.
