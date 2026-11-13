---
layout: post
title: Speeding up Microsoft.Data.SqlClient
categories: [dotnet]
tags: [csharp, sql-server, performance]
fullview: true
---

The product I work on does a lot of manipulation of textual data in a SQL Server database. It reads the data, manipulates it, then writes it back to the database. We've heavily optimised this to handle the throughput of data when processing large databases, writing the code using the async features of C# and streaming data in and out as we pass over it. There is however an inherent time cost in just moving that much data in and out of the database.

I recently came across mention of [an issue](https://github.com/dotnet/SqlClient/issues/593) reported against the [`Microsoft.Data.SqlClient` library](https://github.com/dotnet/SqlClient) showing that reading large textual or binary data synchronously can be much quicker than doing the equivalent asynchronously. This caught my attention, as we were using asynchronous loading assuming it would be the quickest way. The issue shows that not only does the asynchronous method take much longer, it also uses much more memory.

There are many comments on the issue, but linked from it is [an experimental fix](https://github.com/dotnet/SqlClient/pull/3161) that was released in `Microsoft.Data.SqlClient` v7.0. The fix works by changing the packet multiplexing behaviour to dramatically speed up the asynchronous reads, but because this could cause breaking issues in existing code bases, it is disabled by default. To opt into the new behaviour, a couple of `AppContext` switches have been added that need to be set:

{% highlight csharp %}
AppContext.SetSwitch("Switch.Microsoft.Data.SqlClient.UseCompatibilityAsyncBehaviour", false);
AppContext.SetSwitch("Switch.Microsoft.Data.SqlClient.UseCompatibilityProcessSni", false);
{% endhighlight %}

Setting both of these switches to `false` will turn on the new behaviour. It is important that both switches are set together, as otherwise the fix will not be enabled. Also, the switches need to be set before any `SqlConnection` instances are opened otherwise they will not apply to any connections due to their values being cached after first access (see [here](https://github.com/dotnet/SqlClient/issues/593#issuecomment-4143617567) for more detail).

Having tested this on our product, I can confirm that it had a significant effect. Processing 70GB of textual data was taking about 20 minutes, but with the fix applied it took just 3 minutes - that's a huge improvement from just two lines of code.
