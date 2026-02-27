(function () {
    function showResults(results, store) {
        const searchResults = document.getElementById('search-results');

        if (results.length) {
            let appendString = '';

            for (let i = 0; i < results.length; i++) {
                const item = store[results[i].ref];

                appendString += '<article class="home search-result">'
                                + '  <h2 class="search-result-title"><a href="' + item.url + '">' + item.title + '</a></h2>'
                                + '  <div class="post-date">' + item.date + '</div>'
                                + '  <div><p>' + item.content.substring(0, 250) + '...</p></div>'
                                + '  <div>'
                                + item.categories.split(' ').map(c => '<i class="fa fa-folder-open"></i> <a href="/categories.html#ref=' + c + '">' + c + '</a>').join(' ')
                                + '    <br />'
                                + item.tags.split(' ').map(t => '<i class="fa fa-tags"></i> <a href="/tags.html#ref=' + t + '">' + t + '</a>').join(' ')
                                + '  </div>'
                                + '</article>';
            }

            searchResults.innerHTML = appendString;
        }
        else {
            searchResults.innerHTML = '<div>No results found</div>';
        }
    }

    function getQuery(variable) {
        const query = window.location.search.substring(1);
        const vars = query.split('&');

        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    function doSearch(searchTerm) {
        if (!searchTerm) {
            return;
        }

        const idx = lunr(function () {
            this.field('id');
            this.field('title', {boost: 10});
            this.field('url');
            this.field('content', {boost: 5});
            this.field('categories');
            this.field('tags');

            for (var key in window.store) {
                this.add({
                    'id': key,
                    'title': window.store[key].title,
                    'url': window.store[key].url,
                    'content': window.store[key].content,
                    'categories': window.store[key].categories,
                    'tags': window.store[key].tags
                });
            }
        });

        const results = idx.search(searchTerm);
        showResults(results, window.store);
    }

    const searchBox = document.getElementById('search-text');
    const searchTerm = getQuery('q');

    if (!searchBox.value && searchTerm) {
        searchBox.value = searchTerm;
    }

    if (window.store != null) {
        doSearch(searchTerm);

        searchBox.addEventListener('keyup', function (event) {
            doSearch(this.value);
        });
    }
})();
