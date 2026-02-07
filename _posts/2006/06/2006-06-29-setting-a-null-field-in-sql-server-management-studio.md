---
layout: post
title: Setting a NULL field in SQL Server Management Studio
categories: [sql-server]
tags: [sql-server, ssms]
fullview: true
---

SQL Server Management Studio provides a simple results view to show the data contained in a table. With this view, it's possible to edit the data in the table but there is no obvious method of setting a nullable field to `null` - emptying the cell simply sets the value to empty, which may or may not work depending on the type of the column.

To set a `null` value, you have to use the `Ctrl-0` (Control + Zero) shortcut. Why is there no option in the GUI to do this?
