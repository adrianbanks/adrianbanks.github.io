---
layout: page
title: Search
---

<input type="search" id="search-text" name="q" placeholder="Search" autofocus>

<div id="search-results" class="post-list"></div>

<script>
  window.store = {
    {% for post in site.posts %}
      "{{ post.url | slugify }}": {
        "title": {{ post.title | xml_escape | jsonify }},
        "date":  {{ post.date | date: "%b %-d, %Y" | jsonify}},
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "url": {{ post.url | xml_escape | jsonify }}
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  };
</script>

<script src="https://unpkg.com/lunr/lunr.js"></script>
<script src="/assets/js/search.js"></script>
