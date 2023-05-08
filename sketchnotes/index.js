$(document).ready(() => {
    var page = 1;
    var resultsPerPage = 18;
    var allData = [];
    var rootPath = '';
    var allSpeakers = [];
    var allTags = [];

    $("#searchText").on("keyup", () => {
        var toFind = $(this).val();

        console.log(toFind); 
    });

    $("[data-action='next']").click(() => displayPage(page + 1));
    $("[data-action='prev']").click(() => displayPage(page - 1));

    $.addTemplateFormatter({
        tags2: value => value.join(", "),
        tags: value => value.map(element => '<span class="tag">' + element + '</span>'),
        sketchnoteImage: value => rootPath + value + '#img-sketchnote'
    });

    function displayPage(pageNo) {
        $("#sketchnotes").loadTemplate("sketchnote.html", allData, { paged: true, pageNo: pageNo, elemPerPage: resultsPerPage });

        if (pageNo * resultsPerPage >= allData.length) {
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
    
    fetch('./index.json')
    .then(response => response.json())
    .then(json => {
        allData = json.sketchnotes;
        rootPath = json.rootPath;
        allSpeakers = [...new Set(allData.map(element => element.speaker))];
        allTags = [...new Set(allData.map(element => element.tags).flat(Infinity))];

        displayPage(1);
    });                    
});
