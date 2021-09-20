---
layout: post
title: Finding wifi passwords for saved networks
categories: [windows]
tags: [windows, wifi]
fullview: true
---

Occasionally I need to find the password for a wifi connection that I have previously connected to. Navigating the maze of dialogs to find it is never easy, especially when the path to those dialogs changes frequently in Windows 10.

One way to do it is to find the network via the Windows Control Panel (Control Panel -> Network and Internet -> Network and Sharing Centre). Once found, clicking on the connection properties will open the Wi-Fi Status panel:

[![Status of a wifi connection][1]][1]

Clicking on the Wireless Properties button and then selecting the Security tab will show the wifi password:

[![Security properties of a wifi connection][2]][2]

This method works, but involves a lot of clicking through screens. Also, it requires starting at the legacy Control Panel, which is gradually being replaced with the new Settings app. Instead, all of this information and more can be accessed via the command line using the `netsh` command.

To get the password for a wifi network, run the command:

{% highlight text %}
netsh wlan show profile WifiName key=clear
{% endhighlight %}

You can also use this command to see the list of every saved network that your device has connected to:

{% highlight text %}
netsh wlan show profile
{% endhighlight %}


  [1]: /assets/media/images/2021/09/wifi-status.png
  [2]: /assets/media/images/2021/09/wifi-properties.png
