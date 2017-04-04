---
layout: post
date: 2006-06-21 00:10:00
title: SQL Server system table map
categories: [sql-server]
tags: [sql-server, system-tables]
fullview: true
comments: true
---

After trying to modify unique index names on tables in a database using the `INFORMATION_SCHEMA` views and getting nowhere fast, I delved into the system tables to see if they would shed any light on how to do it. This was even more confusing as it's not obvious how these tables fit together. If only there was a map of the relationships between the system tables. Well, there is - Microsoft helpfully supply one on their [SQL Server website](http://www.microsoft.com/sql/prodinfo/previousversions/systables.mspx). Very useful.
