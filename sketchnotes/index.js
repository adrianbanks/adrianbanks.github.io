$.getScript("SearchTerms.js");
$.getScript("Searcher.js");

$(document).ready(() => {
    var page = 1;
    var resultsPerPage = 8;
    var allData = [];
    var rootPath = '';
    var allEvents = [];
    var allSpeakers = [];
    var allTags = [];

    var currentData = [];

    $("#searchText").on("keyup", () => search($("#searchText").val()));

    $("[data-action='next']").click(() => displayPage(currentData, page + 1));
    $("[data-action='prev']").click(() => displayPage(currentData, page - 1));

    $.addTemplateFormatter({
        tags: value => value.map(tag => '<span class="tag">' + tag + '</span>'),
        sketchnoteImage: value => rootPath + value
    });

    const displayPage = (data, pageNo) => {
        $("#sketchnotes").loadTemplate("sketchnote.html", data, { paged: true, pageNo: pageNo, elemPerPage: resultsPerPage });

        if (pageNo * resultsPerPage >= data.length) {
            $("[data-action='next']").attr('disabled', 'disabled');
        } else {
            $("[data-action='next']").removeAttr('disabled');
        }

        if (pageNo <= 1) {
            $("[data-action='prev']").attr('disabled', 'disabled');
        } else {
            $("[data-action='prev']").removeAttr('disabled');
        }

        page = pageNo;
        $("#sketchnote-count").text(data.length + ' sketchnote' + (data.length != 1 ? "s" : ""));
    }

    const search = (search) => {
        var terms = new SearchTerms(search);
        var searcher = new Searcher(terms);

        console.log("'" + search + "' parsed to " + terms.toJson());
        var results = allData.filter(sketchnote => searcher.isSearchHit(sketchnote));

        currentData = results;
        $("#searchText").val(search);
        displayPage(results, 1);
    }

    fetch('./index.json')
    .then(response => response.json())
    .then(json => {
        allData = json.sketchnotes;
        rootPath = json.rootPath;
        allEvents = [...new Set(allData.map(sketchnote => sketchnote.event))];
        allSpeakers = [...new Set(allData.map(sketchnote => sketchnote.speaker))];
        allTags = [...new Set(allData.map(sketchnote => sketchnote.tags).flat(Infinity))];

        var searchText = window.location.hash;

        if (searchText.length > 0) {
            searchText = decodeURI(searchText.substring(1));
        }

        search(searchText);
    });
});
