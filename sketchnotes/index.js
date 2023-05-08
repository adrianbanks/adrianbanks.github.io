$(document).ready(() => {
    var page = 1;
    var resultsPerPage = 18;
    var allData = [];
    var rootPath = '';
    var allSpeakers = [];
    var allTags = [];

    $("#searchText").on("keyup", () => search($("#searchText").val()));

    $("[data-action='next']").click(() => displayPage(page + 1));
    $("[data-action='prev']").click(() => displayPage(page - 1));

    $.addTemplateFormatter({
        tags2: value => value.join(", "),
        tags: value => value.map(tag => '<span class="tag">' + tag + '</span>'),
        sketchnoteImage: value => rootPath + value + '#img-sketchnote'
    });

    function displayPage(data, pageNo) {
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

    function contains(text, innerText) {
        return text.toUpperCase().indexOf(innerText.toUpperCase()) !== -1;
    }

    function search(text) {
        console.log('Searching for ' + text);

        var results = allData.filter(sketchnote => {
            var inTitle = contains(sketchnote.title, text);
            var inSpeaker = contains(sketchnote.speaker, text);
            var inTag = sketchnote.tags.some(tag => contains(tag, text));

            return inTitle || inSpeaker || inTag;
        });

        displayPage(results, 1);
    }
    
    fetch('./index.json')
    .then(response => response.json())
    .then(json => {
        allData = json.sketchnotes;
        rootPath = json.rootPath;
        allSpeakers = [...new Set(allData.map(sketchnote => sketchnote.speaker))];
        allTags = [...new Set(allData.map(sketchnote => sketchnote.tags).flat(Infinity))];

        displayPage(allData, 1);
    });                    
});
