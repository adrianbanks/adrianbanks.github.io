---
layout: post
title: Ambiguous match found
categories: [dotnet]
tags: [dotnet, aspnet]
fullview: true
---

Whilst porting an ASP.Net application to the .Net 2.0 framework, I came across a spurious error when viewing a few specific pages. The error was occurring during the runtime compilation of these specific aspx pages.

<pre>
Parser Error

Description: An error occurred during the parsing of a resource required to service this request. Please review the following specific parse error details and modify your source file appropriately.

Parser Error Message: Ambiguous match found.
</pre>

To make this error more confusing, the error was reported on line 1 of the aspx page which contained nothing more than the page directive tag.

After a bit of searching, I found the cause of the problem. The cause was that there were two member variables declared with names that differed only by case (one was an ASP.Net `PlaceHolder` control, the other an `int`). Simply renaming one of the variables solved the compilation error.

[Eran Sandler](http://dotnetdebug.net) has also encountered this problem, but delves a lot deeper into what is going on.
