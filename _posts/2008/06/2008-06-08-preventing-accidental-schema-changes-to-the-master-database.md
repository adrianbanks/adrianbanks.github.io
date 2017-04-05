---
layout: post
title: Preventing accidental schema changes to the master database
categories: [sql-server]
tags: [sql-server]
fullview: true
---

If you have ever run some SQL within SQL Server Management Studio only to realise that you've run it against the master database by mistake, you'll know that it can sometimes be hard to undo the damage.

A simple way to stop these accidental changes is to create a database trigger that will prevent any schema changes to the master database:

{% highlight sql %}
USE master
GO

CREATE TRIGGER StopSchemaChanges ON DATABASE FOR 
CREATE_APPLICATION_ROLE, ALTER_APPLICATION_ROLE, DROP_APPLICATION_ROLE,
CREATE_ASSEMBLY, ALTER_ASSEMBLY, DROP_ASSEMBLY,
CREATE_CERTIFICATE, ALTER_CERTIFICATE, DROP_CERTIFICATE,
GRANT_DATABASE, DENY_DATABASE, REVOKE_DATABASE,
CREATE_EVENT_NOTIFICATION, DROP_EVENT_NOTIFICATION,
CREATE_FUNCTION, ALTER_FUNCTION, DROP_FUNCTION,
CREATE_INDEX, ALTER_INDEX, DROP_INDEX,
CREATE_PROCEDURE, ALTER_PROCEDURE, DROP_PROCEDURE,
CREATE_SCHEMA, ALTER_SCHEMA, DROP_SCHEMA,
CREATE_STATISTICS, DROP_STATISTICS, UPDATE_STATISTICS,
CREATE_SYNONYM, DROP_SYNONYM,
CREATE_TABLE, ALTER_TABLE, DROP_TABLE,
CREATE_TRIGGER, ALTER_TRIGGER, DROP_TRIGGER,
CREATE_VIEW, ALTER_VIEW, DROP_VIEW
AS 
BEGIN
    RAISERROR(N'Do you really modify the master database?', 16, 1) WITH NOWAIT
    ROLLBACK TRANSACTION
END
GO
{% endhighlight %}

Any time you attempt to change the master database, SQL Server will fail with an error. If you do want to make a schema change, simply [disable the trigger](http://msdn.microsoft.com/en-us/library/ms189748.aspx) and then [re-enable it](http://msdn.microsoft.com/en-us/library/ms182706.aspx) once the schema change is complete.

*(NB. this only works with SQL Server 2005 and above)*
