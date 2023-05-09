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

    const contains = (text, innerText) => text.toUpperCase().indexOf(innerText.toUpperCase()) !== -1;

    const search = (text) => {
        var results = allData.filter(sketchnote => {
            var inTitle = contains(sketchnote.title, text);
            var inSpeaker = contains(sketchnote.speaker, text);
            var inTag = sketchnote.tags.some(tag => contains(tag, text));
            return inTitle || inSpeaker || inTag;
        });

        currentData = results;
        $("#searchText").val(text);
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
            searchText = searchText.substring(1);
        }

        search(searchText);
    });
});
