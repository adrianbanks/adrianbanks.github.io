---
layout: post
title: Google page rank and redirection
categories: [website]
tags: [website, google, page-rank]
fullview: true
---

After reading [Jeff Atwood](http://www.codinghorror.com)'s [recent post about URL rewriting to prevent duplicate URLs](http://www.codinghorror.com/blog/archives/000797.html), I started to look at my own site's redirections, specifically with regards to Google's page rank. The first thing I noticed was that I had two different page ranks for this site.

[http://adrianbanks.co.uk](http://adrianbanks.co.uk) had a page rank of 3, whilst [http://www.adrianbanks.co.uk](http://www.adrianbanks.co.uk) had a page rank of zero, even though I've never really used the [http://adrianbanks.co.uk](http://adrianbanks.co.uk) version of the url.

Jeff's ISAPI rewrite rules were helpful, but were not going to work on an Apache server. The [Apache docs for the URL rewriting engine](http://httpd.apache.org/docs/1.3/mod/mod_rewrite.html) were very detailed, but a little too verbose to glean which exact rules I needed. Luckily, the [Search Engine Promotion Help site](http://www.searchenginepromotionhelp.com) has an example of [exactly what I was after](http://www.searchenginepromotionhelp.com/m/articles/search-engine-problems/domain-redirection.php).

{% highlight apache %}
RewriteEngine On
RewriteCond %{HTTP_HOST} !^www\.adrianbanks\.co\.uk [NC]
RewriteCond %{HTTP_HOST} !^report\.adrianbanks\.co\.uk [NC]
RewriteCond %{HTTP_HOST} !^$
RewriteRule ^(.*) http://www.adrianbanks.co.uk/$1 [L,R=301]
{% endhighlight %}

The only alteration I had to make was to add in an extra line to stop any subdomains of my site being redirected to the main site.

Now for a quick explanation of how the rules work:

- The RewriteRule will only run if all of the preceding rewrite conditions (RewriteCond) are true.
- Line 1 turns on the rewrite engine in Apache.  
- Line 2 will be true if the host url is not www.adrianbanks.co.uk.  
- Line 3 will be true if the host url is not report.adrianbanks.co.uk (this is my alteration for my subdomain).  
- Line 4 will be true if the host url is not empty.

Only if all of these conditions are met will the rule run.

Having made this change, the page rank for [http://www.adrianbanks.co.uk](http://www.adrianbanks.co.uk) has now jumped to up 3.
