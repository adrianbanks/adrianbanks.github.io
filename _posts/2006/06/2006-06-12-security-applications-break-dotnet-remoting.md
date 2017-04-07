---
layout: post
title: Security applications break .Net 2.0 remoting
categories: [dotnet]
tags: [dotnet, remoting]
fullview: true
---

Jamie Cansdale from TestDriven.Net [posted about certain security software breaking remoting with .Net 2.0](http://weblogs.asp.net/nunitaddin/archive/2006/06/07/Security-Apps-Break-.NET-2.0-Remoting.aspx). He also includes a downloadable example to demonstrate the problem.

The current list of culprits is:

- [NOD32](http://www.eset.com)
- [Trend Micro Office Scan](http://www.trendmicro.com/en/products/desktop/osce/evaluate/overview.htm)
- [Embassy Trust Suite](http://www.broadcom.com/support/ethernet_nic/faq_drivers.php)
- [Broadcom Advanced Control Suite](http://www.broadcom.com/support/ethernet_nic/faq_drivers.php)
- [NetLimiter](http://www.netlimiter.com)

The common thread amongst these is that they all have some network monitoring functionality.

The error occurs whenever a .Net TCP remoting channel is closed. Perculiarly, the error happens not on the end that closes the channel, but in the application on the other end of the channel.

The stack trace of the error is:

<pre class="stacktrace">
Exception: System.AccessViolationException
Message: Attempted to read or write protected memory. This is often an indication that other memory is corrupt.

Server stack trace:  
at System.Net.UnsafeNclNativeMethods.OSSOCK.WSAGetOverlappedResult(SafeCloseSocket socketHandle, IntPtr overlapped, UInt32& bytesTransferred, Boolean wait, IntPtr ignored)  
at System.Net.Sockets.BaseOverlappedAsyncResult.CompletionPortCallback(UInt32 errorCode, UInt32 numBytes, NativeOverlapped* nativeOverlapped)  
at System.Threading._IOCompletionCallback.PerformIOCompletionCallback(UInt32 errorCode, UInt32 numBytes, NativeOverlapped* pOVERLAP)  
</pre>

I tried the sample code as described with NOD32, remoting to both localhost and to a separate PC but could not get the behaviour.

**Update:** Jon Cole from Microsoft has [posted on the MSDN forums](http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=273738&SiteID=1) verifying that this is indeed a bug, and that it should be fixed in the next release.
