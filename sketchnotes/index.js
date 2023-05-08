$(document).ready(() => {
    var page = 1;
    var resultsPerPage = 8;
    var allData = [];
    var rootPath = '';
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
    }

    const contains = (text, innerText) => text.toUpperCase().indexOf(innerText.toUpperCase()) !== -1;

    const search = (text) => {
        console.log('Searching for \'' + text + '\'...');

        var results = allData.filter(sketchnote => {
            var inTitle = contains(sketchnote.title, text);
            var inSpeaker = contains(sketchnote.speaker, text);
            var inTag = sketchnote.tags.some(tag => contains(tag, text));
            return inTitle || inSpeaker || inTag;
        });

        console.log(results.length + ' results found')
        currentData = results;
        displayPage(results, 1);
    }
    
    fetch('./index.json')
    .then(response => response.json())
    .then(json => {
        allData = json.sketchnotes;
        rootPath = json.rootPath;
        allSpeakers = [...new Set(allData.map(sketchnote => sketchnote.speaker))];
        allTags = [...new Set(allData.map(sketchnote => sketchnote.tags).flat(Infinity))];

        currentData = allData;
        displayPage(allData, 1);
    });
});
