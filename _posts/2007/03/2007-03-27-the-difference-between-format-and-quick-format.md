---
layout: post
title: The difference between format and quick format
categories: [windows]
tags: [windows, format]
fullview: true
---

Having done several installations of Windows over the years and always chosen the "quick format" option over the normal format option (mainly due to the time it takes to do a full format compared to a quick format), I finally looked into what the differences between the two are. Microsoft's site has a [knowledge base article](http://support.microsoft.com/kb/302686) about this very thing.

A full format will wipe the disk, format it and run a check disk to find any bad sectors. A quick format will wipe the disk and format it, but will skip the check disk stage. As it turns out, the check disk stage is the thing that causes a full format to take a lot longer than a quick format.

If formatting a new hard disk, it is probably wise therefore to do a full format to find any sectors that may have been damaged whilst the disk was in transit. If formatting an old disk, it is already in a known state and so a quick format should suffice.
