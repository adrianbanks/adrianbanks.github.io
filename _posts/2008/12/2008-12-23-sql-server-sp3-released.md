---
layout: post
title: SQL Server SP3 released
categories: [sql-server]
tags: [sql-server]
fullview: true
---

[Service pack 3](http://www.microsoft.com/downloads/details.aspx?FamilyID=ae7387c3-348c-4faa-8ae5-949fdfbe59c4&displaylang=en) for SQL Server 2005 was [released last week](http://blogs.msdn.com/sqlreleaseservices/archive/2008/12/16/sql-server-2005-sp3-released.aspx). In it, they have fixed a curious [bug that I reported back in January](http://support.microsoft.com/kb/959016/).

The bug occurs when trying to delete rows from a table that has a `NULL` value for an `image` column. This works fine normally, but if there is a foreign key referencing the table (to any of its columns), any rows that have had their image column updated to be `NULL` fail to be deleted. This SQL demonstrates the problem:

{% highlight sql %}
-- create two linked tables
CREATE TABLE [dbo].[TableA]
(
    [Identity] [int] NOT NULL IDENTITY(1, 1) PRIMARY KEY,
    [TableB_Identity] [int] NULL
)

CREATE TABLE [dbo].[TableB]
(
    [Identity] [int] NOT NULL IDENTITY(1, 1) PRIMARY KEY,
    [DATA] image NULL
)

ALTER TABLE [TableA] ADD CONSTRAINT [FK_TableA_TableB] 
    FOREIGN KEY ([TableB_Identity]) REFERENCES [TableB] ([Identity])

-- insert some data
INSERT INTO [TableB] ([DATA]) VALUES (NULL)
INSERT INTO [TableB] ([DATA]) VALUES (NULL)
INSERT INTO [TableB] ([DATA]) VALUES (NULL)

-- this delete works successfully
DELETE FROM [TableB] WHERE [DATA] IS NULL
SELECT COUNT(*) AS Remaining_Count_Should_Be_0 FROM [TableB]

-- insert some data
INSERT INTO [TableB] ([DATA]) VALUES (NULL)
INSERT INTO [TableB] ([DATA]) VALUES (NULL)
INSERT INTO [TableB] ([DATA]) VALUES (NULL)

-- update the data to be have a NULL value
UPDATE [TableB] SET [DATA] = NULL WHERE [DATA] IS NULL

-- this delete doesn't work
DELETE FROM [TableB] WHERE [DATA] IS NULL
SELECT COUNT(*) AS Remaining_Count_Should_Be_0 FROM [TableB]

-- this delete doesn't work
DELETE FROM [TableB] WHERE ISNULL([DATA], NULL) IS NULL
SELECT COUNT(*) AS Remaining_Count_Should_Be_0 FROM [TableB]

-- this delete does work successfully
DELETE FROM [TableB] WHERE EXISTS
    (
        SELECT * FROM [TableB] AS TB
        WHERE [DATA] IS NULL 
        AND TB.[Identity] = [TableB].[Identity]
    )
SELECT COUNT(*) AS Remaining_Count_Should_Be_0 FROM [TableB]
{% endhighlight %}

Not all of the delete queries work correctly. The output of the script is four result sets with the count of how many rows are in the table at each point. All of them should be 0 (as is the case on SQL Server 2000), but in SQL Server 2005 without SP3 they are actually 0, 3, 3 and 0.

The simple delete query:

{% highlight sql %}
DELETE FROM [TableB] WHERE [DATA] IS NULL
{% endhighlight %}

**does not delete any rows** after the values for the Data column have been updated to `NULL`, even though a similar select query:

{% highlight sql %}
SELECT * FROM [TableB] WHERE [DATA] IS NULL
{% endhighlight %}

Notably, if either the foreign key is removed, or the:

{% highlight sql %}
UPDATE [TableB] SET [DATA] = NULL WHERE [DATA] IS NULL
{% endhighlight %}

query is not performed, the script behaves as expected. Additionally, using `text` or `ntext` instead of `image` does not work as well, but using the new `varchar(max)`, `nvarchar(max)` or `varbinary(max)` data types does work.

Apparrently, the distinction between `NULL` values stored as a result of an insert or an update has precendece in the [`WRITETEXT`](http://msdn2.microsoft.com/en-us/library/ms186838.aspx) command:

> If the table does not have in row text, SQL Server saves space by not initializing text columns when explicit or implicit null values are added in text columns with INSERT, and no text pointer can be obtained for such nulls. To initialize text columns to NULL, use the UPDATE statement. If the table has in row text, you do not have to initialize the text column for nulls and you can always get a text pointer.

This points to the "text in row" option having a bearing on this behaviour. Indeed, altering this option after creating the tables:

{% highlight sql %}
sp_tableoption N'TableB', 'text in row', 'ON'
{% endhighlight %}

results in the script working as expected. Useful as a potential workaround.

The bug is present in all versions of SQL Server 2005, but not in SQL Server 2000 or 2008.

A full list of what's changed in SP3 can be found [here](http://msdn.microsoft.com/en-us/library/dd353312(SQL.90).aspx), with a full list of the bugs fixed [here](http://support.microsoft.com/?kbid=955706).
