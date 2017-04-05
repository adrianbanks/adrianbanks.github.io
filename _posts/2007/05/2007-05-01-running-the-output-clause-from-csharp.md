---
layout: post
title: Running the OUTPUT clause from C#
categories: [dotnet]
tags: [dotnet, sql-server, output-clause]
fullview: true
---

SQL Server 2005 introduced a new feature called the output clause. This enables INSERT, UPDATE and DELETE queries to be run, with the original information which has been changed being returned. This is particularly useful if you want to run a query and know what has been changed by it by returning the identites of the modified rows.

The full documentation for the output clause can be found in [SQL Server 2005 Books Online](http://msdn2.microsoft.com/en-us/library/ms177564.aspx).

In trying to use this feature, I could get it to work in a query window, but when trying it using C# and ADO, it was not obvious how to execute the query and return the results because the `ExecuteNonQuery()` method of `SqlCommand` only returns the count of the number of rows that have been updated. After a bit of unsuccessful searching, I came across a [post](http://nayyeri.net/archive/2007/03/31/output-clause-in-sql-server-2005.aspx) by [Keyvan Nayyeri](http://nayyeri.net) with something that gave me an idea:

> OUTPUT clause works like a SELECT statement but its usage differs in INSERT, UPDATE and DELETE commands 

Switching my code around to run the update query using the `ExecuteReader()` method of `SqlCommand` as would be used for a `SELECT` query proved to be fruitful, enabling the returned result set to be read.
