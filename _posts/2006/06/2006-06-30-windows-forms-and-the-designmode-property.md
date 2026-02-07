---
layout: post
title: Windows forms and the DesignMode property
categories: [dotnet]
tags: [dotnet, windows-forms, visual-studio]
fullview: true
---

In .Net Windows Forms, any form or control that derives from a `Component` has a `DesignMode` property that tells you whether the control is being rendered in design mode in Visual Studio. This is useful if your control has different behaviour at runtime than at design time (for example, if you show a connection dialog when a form opens but you don't want it to happen in design mode inside Visual Studio).

The `DesignMode` property has its quirks though. Using Lutz Roeder's Reflector reveals the implementation of the DesignMode property:

{% highlight csharp %}
protected bool DesignMode
{
    get
    {
        if (this.site != null)
        {
            return this.site.DesignMode;
        }
        return false;
    }
}
{% endhighlight %}

This shows that design time support is not hooked up until the control is sited. Siting happens after the control is created, but before any properties are set, so if you check the `DesignMode` property in the constructor of a control, it will always be false.

There is also a bug with the `DesignMode` property whereby a custom control inside a custom control will always report its `DesignMode` property as `false`. Microsoft has more details of this in [knowledge base article KB839202](http://support.microsoft.com/default.aspx?scid=kb;en-us;839202) and in their [Visual Studio feedback website](http://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=117130).

A workaround to both of the above problems it to use the following:

{% highlight csharp %}
Application.ExecutablePath.ToLower().IndexOf("devenv.exe") > -1
{% endhighlight %}

A bit crude, but it works.
