---
layout: post
title: Reference databases
categories: [databases]
tags: [sql-server, postgresql, mysql, mariadb, oracle]
fullview: true
---

As part of my day-to-day work, I often need to run the tooling I'm working on against databases to test it. The databases need to have a variaty of different schemas and data in them to do a representative test. A big problem with this is getting hold of an array of different databases in the first place. This problem is compounded further by the fact that the tooling I work on supports five different database platforms, so there is a need for different databases for each platform.

A useful source of ready-made databases is the reference databases that are provided by the vendor or community around each database. The ones I've found so far are listed below, with a bit of detail about what each one represents.


### SQL Server

| **Name** | **Description** | **Install** |
| - | - | - |
| AdventureWorks | A fictional bicycle manufacturer "Adventure Works Cycles", containing data including manufacturing, sales, purchasing, product management, contact management, and human resources. Available in Online transactional (OLTP), Data warehousing (DW), and Lightweight (LT) formats. | [backups](https://learn.microsoft.com/en-us/sql/samples/adventureworks-install-configure)<br/>[scripts](https://github.com/microsoft/sql-server-samples/tree/master/samples/databases/adventure-works) |
| Chinook | A fictional digital media store, containing data including artists, albums, tracks, invoices, and customers. | [script](https://github.com/lerocha/chinook-database/blob/master/ChinookDatabase/DataSources/Chinook_SqlServer.sql) |
| Contoso | "Contoso Corporation", a fictional multinational business (more info here), containing data including manufacturing, sales, and products. | [scripts](https://github.com/microsoft/sql-server-samples/blob/master/samples/databases/contoso-data-warehouse/readme.md) |
| Northwind | "Northwind Traders", a fictional importer/exporter of speciality foods from around the world, containing sales data including customers, orders, inventory, purchasing, suppliers, shipping, employees, and accounting. | [scripts](https://github.com/microsoft/sql-server-samples/blob/master/samples/databases/northwind-pubs/readme.md) |
| WideWorldImporters | "Wide World Importers", a fictional wholesale novelty goods importer and distributor operating from the San Francisco bay area (more info [here](https://learn.microsoft.com/en-gb/sql/sam ples/wide-world-importers-what-is)), containing data including purchasing, sales and stock. Available in Online transactional (OLTP) and Data warehousing (DW) formats. | [backups](https://github.com/Microsoft/sql-server-samples/releases/tag/wide-world-importers-v1.0) |
{:.mdtable}

#### Stack Exchange / StackOverflow

The databases behind the many sites in the [Stack Exchange](https://stackexchange.com) network can be downloaded [here](https://archive.org/details/stackexchange). The database for each Stack Exchange site can be downloaded, including that for [StackOverflow](https://stackoverflow.com). However, the StackOverflow database is quite big (~65GB), so it has been split up into several files. That makes it non-trivial to get it into a SQL Server database.

Brent Ozar has simplified this process by [providing downloads](https://www.brentozar.com/archive/2015/10/how-to-download-the-stack-overflow-database-via-bittorrent/) of the database files in SQL Server 2016 format.


### PostgreSQL

| **Name** | **Description** | **Install** |
| - | - | - |
| AdventureWorks | A port of the SQL Server version of AdventureWorks, a fictional bicycle manufacturer "Adventure Works Cycles", containing data including manufacturing, sales, purchasing, product management, contact management, and human resources. | [script](https://github.com/NorfolkDataSci/adventure-works-postgres) |
| Chinook | A port of the SQL Server version of Chinook, a fictional digital media store, containing data including artists, albums, tracks, invoices, and customers. | [script](https://github.com/lerocha/chinook-database/blob/master/ChinookDatabase/DataSources/Chinook_PostgreSql.sql) |
| Pagila | A database of a fictional DVD rental store, containing data including films, actors, customers, staff, and payments. | [scripts](https://github.com/devrimgunduz/pagila) |
{:.mdtable}

#### Bluebox

Ryan Booz has created [Bluebox](https://github.com/ryanbooz/bluebox), a database based on Pagila that aims to make it more full-featured.

#### NYC Census

If using PostGIS (an extension for managing spatial data), the [introduction to PostGIS tutorial](https://postgis.net/workshops/postgis-intro/index.html) contains a sample database of census data for New York City.

#### Other Databases

The PostgreSQL website has a [long list of other sample databases](https://wiki.postgresql.org/wiki/Sample_Databases), including IMDB, the UK land registry of sales, and OpenStreetMap.


### MySQL / MariaDB

| **Name** | **Description** | **Install** |
| - | - | - |
| Bureau of Transportation Statistics | A database of US commercial airline flight data including airlines, airports, and flights. | [scripts](https://github.com/mariadb-corporation/mariadb-analytics-sample-data) |
| Employees | A database containing generated data including employees, departments, employees, and salaries. | [scripts](https://dev.mysql.com/doc/employee/en/employees-installation.html) |
| Sakila | A fictional DVD rental store, containing data including films, actors, customers, staff, and payments. | [scripts](https://dev.mysql.com/doc/sakila/en/sakila-installation.html) |
| World | A database containing information about the countries and cities of the world, containing data including countries, cities, and languages spoken. | [script](https://dev.mysql.com/doc/world-setup/en/world-setup-installation.html) |
{:.mdtable}

#### Other Databases

The MySQL website has a [list of other sample databases](https://dev.mysql.com/doc/index-other.html), including some with large data sets.


### Oracle

Oracle themselves provide some interlinked sample schemas:

- Customer Orders (CO)
- Human Resources (HR)
- Online Catalog (OC)
- Order Entry (OE)
- Product Media (PM)
- Sales History (SH)

These are [documented on the Oracle site](https://docs.oracle.com/en/database/oracle/oracle-database/19/comsc/), and can be obtained from the [Oracle samples GitHub repository](https://github.com/oracle-samples/db-sample-schemas).

| **Name** | **Description** | **Install** |
| - | - | - |
| OT | A global fictitious company that sells computer hardware including storage, motherboard, RAM, video card, and CPU. | [scripts](https://www.oracletutorial.com/getting-started/oracle-sample-database/) |
| O7 | A schema for a fictitious bank, containing customers, accounts, products, branches, departments, and employees. | [scripts](https://o7planning.org/10233/sample-oracle-database-for-learning-sql#a23171) (see section 2) |
{:.mdtable}


### Gerenal data sources

There are many sites that provide data suitable for using as a reference database. While many of these sites provide the data, few of them provide it in a format that can be loaded straight into the relevant database platform. They can however be imported fairly trivially.

| **Name** | **Description** |
| - | - |
| [Google Dataset Search](https://datasetsearch.research.google.com) | A search engine for datasets from across the internet. |
| [Kaggle](https://www.kaggle.com/datasets) | Datasets for data science and machine learning. Interesting datasets include [NBA Basketball](https://www.kaggle.com/datasets/wyattowalsh/basketball) and [Spotify](https://www.kaggle.com/datasets/maltegrosse/8-m-spotify-tracks-genre-audio-features). |
| [UC Irvine Machine Learning Repository](https://archive.ics.uci.edu) | Well-documented and clean data sources, mainly geared towards machine learning. |
| [Awesome Public Data Sets](https://github.com/awesomedata/awesome-public-datasets) | A list of high quality, topic-centric public data sources. |
| [Data Is Plural](https://www.data-is-plural.com/archive/) | A weekly newsletter and archive of real-world datasets. |
| [Hugging Face](https://huggingface.co/datasets) | A huge set of data, mainly targeted at machine learning. |
{:.mdtable}
