---
layout: post
title: Fixing database logins after a restore
categories: [sql-server]
tags: [sql-server, logins]
fullview: true
---

For several years now I've been moving development databases between SQL Servers using backup and restore. When you restore the database on the target server, the logins for the database are invariably broken with the database user having an empty login name, meaning that they cannot log in to the database. My usual fix is to delete the database user and re-add it. Paul Hayman however [pointed out a useful stored procedure](http://www.geekzilla.co.uk/View688B3920-1D87-4661-9C95-C3E55630C13C.htm) to fix broken logins:

{% highlight sql %}
sp_change_users_login 'Auto_Fix', 'username'
{% endhighlight %}

where *username* is the name of the account to fix.

The *Auto_Fix* option will attempt to match the broken login with an existing user with the same name.

More information on this can be found in the [MSDN documentation](http://msdn2.microsoft.com/en-us/library/Aa259633(SQL.80).aspx). Specific things to note are that it only works with SQL Server and not Windows logins, and that you must be a member of the **sysadmin** fixed server role for it to work.
