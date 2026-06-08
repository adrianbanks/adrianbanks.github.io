---
layout: post
title: SQL Server test databases
categories: [databases]
tags: [sql-server, testing]
fullview: true
---

As mentioned in my [previous post](/databases/2026/06/06/reference-databases.html), I often need to run the tooling I'm working on against databases to test it. Part of this testing is to ensure that the tooling can handle schemas with odd naming. Over the years working on database tooling, I've collated a script full of odd cases that can easily trip up tooling. It's now become a standard script that I run on my local SQL Server testing instance when I first set it up.

{% highlight sql %}
CREATE DATABASE [💩]
GO

USE [💩]
GO

CREATE SCHEMA [💰]
GO

CREATE TABLE [dbo].[🍺]
(
    [🐈] INT NULL
)
GO

CREATE TABLE [💰].[💾]
(
    [📌] INT NULL
)
GO

------------------------------------------------------------------------------------
CREATE DATABASE [.]
GO

USE [.]
GO

CREATE SCHEMA [.]
GO

CREATE SCHEMA [..]
GO

CREATE TABLE [.].[.]
(
    [.] [int] NULL,
    [..] [int] NULL,
    [...] [int] NULL
)
GO

CREATE TABLE [.].[..]
(
    [.] [int] NULL,
    [..] [int] NULL,
    [...] [int] NULL
)
GO

CREATE TABLE [..].[.]
(
    [.] [int] NULL,
    [..] [int] NULL,
    [...] [int] NULL
)
GO

CREATE TABLE [..].[..]
(
    [.] [int] NULL,
    [..] [int] NULL,
    [...] [int] NULL
)
GO

------------------------------------------------------------------------------------
CREATE DATABASE [')) group by groupcir; select 1;GO--%']
GO

------------------------------------------------------------------------------------
CREATE DATABASE [_Burma ဗမာ (မြန်မာ) my-mm]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [_Georgia _ქართული (საქართველო) ka-ge]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [_Saudi Arabia العربية (المملكة العربية السعودية) ar-sa]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [_Tamil தமிழ் (இலங்கை) ta-lk]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [<script>alert("hi there");</script>]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [a-database-with-a-very-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-name]
GO

USE [a-database-with-a-very-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-name]
GO

CREATE SCHEMA [a-schema-with-a-very-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-name]
GO

CREATE TABLE [a-schema-with-a-very-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-name].[a-table-with-a-very-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-name]
(
    [a-column-with-a-very-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-name] INT NULL
)
GO

CREATE TABLE [another-table-with-a-very-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-name]
(
    [another-column-with-a-very-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-name] INT NULL
)
GO

CREATE VIEW [a-view-with-a-very-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-name]
AS
    SELECT 1 AS V
GO

CREATE PROCEDURE [a-procedure-with-a-very-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-name] @a_parameter_with_a_very_long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_name INT 
AS
    SELECT 1
GO

CREATE FUNCTION [a-function-with-a-very-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-long-name](@another_parameter_with_a_very_long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_long_name INT)
RETURNS INT AS
BEGIN
    RETURN 1
END
GO

------------------------------------------------------------------------------------
CREATE DATABASE [Empty]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [name with spaces]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [name'with'single'quotes]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [name.with.dots]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [name/with/forward/slashes]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [name[with[opening[brackets]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [name\with\backslashes]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [name]]with]]closing]]brackets]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [name-with-dashes]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [name]
GO

------------------------------------------------------------------------------------
CREATE DATABASE [Offline]
GO

ALTER DATABASE [Offline] SET OFFLINE
GO

------------------------------------------------------------------------------------
CREATE DATABASE [ReadOnly]
GO

ALTER DATABASE [ReadOnly] SET READ_ONLY WITH NO_WAIT
GO
{% endhighlight %}
