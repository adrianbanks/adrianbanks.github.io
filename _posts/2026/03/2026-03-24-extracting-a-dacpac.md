---
layout: post
title: Extracting a DACPAC
categories: [sql-server]
tags: [dacpac, bacpac]
fullview: true
---

SQL Server has the concept of [data-tier applications](https://learn.microsoft.com/en-us/sql/tools/sql-database-projects/concepts/data-tier-applications/overview). This is a way of defining the structure and data of an entire database within a single file, enabling it to be moved between machines. There are two types of files that can be used:

- BACPAC - This contains the database schema and the data from a database.
- DACPAC - This contains the just the database schema by default, but data from some tables can be included.

Data-tier applications have benefits over backup files in that they are more portable. Backups are tied to the version of SQL Server that they are created with, meaning that only that version or later can restore them. 

I use DACPACs a lot to get database schemas between different servers. Deploying a DACPAC will sometimes fail due to it containing logins, users, etc... from the database it was created from that don't exist on the server it is being deployed to. When this happens, SQL Server Management Studio simply fails with an error with no way around the issue.

It is possible to deploy however, but it takes a bit of command line trickery. To do this, first install the [SqlPackage](https://learn.microsoft.com/en-us/sql/tools/sqlpackage/sqlpackage-download) dotnet tool:

```
 dotnet tool install -g microsoft.sqlpackage
```

Once installed, you can run it from the command line, passing the option to exclude certain object types. Something like:

```
sqlpackage
  /Action:Publish
  /TargetServerName:.\SQL2025
  /TargetDatabaseName:Northwind
  /Properties:ExcludeObjectTypes="Users;RoleMembership;Logins;ServerRoles;ServerRoleMembership;Permissions"
  /SourceFile:northwind.dacpac
```

It's the `/Properties:ExcludeObjectTypes=...` parameter that does the magic. In this case, the security-related objects causing the deploy to fail will be excluded from the deployed database schema.

More details can be found in the docs for the [SqlPackage publish action](https://learn.microsoft.com/en-us/sql/tools/sqlpackage/sqlpackage-publish).
