---
layout: post
title: git bisect
categories: [git]
tags: [git]
fullview: true
---

I've been using [`git bisect`](https://git-scm.com/docs/git-bisect) a lot recently to find where in a branch a bug was introduced, but can never remember the command to get going.

git bisect start
git bisect good [commit]
git bisect bad [commit]

git bisect good/bad

git bisect reset


https://www.metaltoad.com/blog/beginners-guide-git-bisect-process-elimination

