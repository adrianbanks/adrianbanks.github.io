---
layout: post
title: The perils of sp_rename
categories: [sql-server]
tags: [sql-server, sql, sp_rename]
fullview: true
---

[Andras Belokosztolszki](http://www.simple-talk.com/community/blogs/andras/default.aspx) from [Red Gate](http://www.red-gate.com) posted [an interesting article](http://www.simple-talk.com/community/blogs/andras/archive/2006/05/10/783.aspx) about the `sp_rename` stored procedure in SQL Server and the pitfalls that can occur after its use.

When a stored procedure is created, an object is created in the `sysobjects` table (or the `sys.objects` view in SQL Server 2005), and the textual definition is stored in the `syscomments` table (or the `sys.sql_modules` view in SQL Server 2005).

When using `sp_rename` to rename a stored procudure, the definition is left intact and only the name is changed in the `sysobjects` table (or `sys.objects` view). This means that the definition of the stored procedure stored in database now has the wrong name.

The best way of renaming a stored procedure is to completely delete it and then recreate it with the new name.

The following SQL displays the definitions of all stored procedures in a database alongside their names:

**SQL Server 2000**

{% highlight sql %}
SQL Server 2000
SELECT V2.[name], V1.[text]
    FROM syscomments AS V1, sysobjects AS V2
    WHERE V1.[id] = V2.[id]
    AND (V2.[xtype] = 'P' OR V2.[xtype] = 'F')
{% endhighlight %}

**SQL Server 2005**

{% highlight sql %}
SQL Server 2005
SELECT V2.[name], V1.[definition]
    FROM sys.sql_modules AS V1, sys.objects AS V2
    WHERE V1.[object_id] = V2.[object_id]
{% endhighlight %}

It is worth noting that enterprise manager uses the sp_rename stored procedure when using the right-click rename option (although SQL Server 2005 management studio does try to correct this problem if you view the definition of a renamed stored procedure by replacing the original stored name with the new one).
