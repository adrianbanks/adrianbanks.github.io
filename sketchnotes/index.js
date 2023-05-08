$(document).ready(() => {
    var page = 1;
    var resultsPerPage = 1;
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
        tags: value => value.join(", "),
        sketchnoteImage: value => rootPath + value + '#img-sketchnote'
    });

    function displayPage(pageNo) {
        $("#sketchnote-container").loadTemplate("sketchnote.html", allData, { paged: true, pageNo: pageNo, elemPerPage: resultsPerPage });

        page = pageNo;

        if (page * resultsPerPage >= allData.length) {
            $("[data-action='next']").attr('disabled', 'disabled');
        } else {
            $("[data-action='next']").removeAttr('disabled');
        }

        if (page <= 1) {
            $("[data-action='prev']").attr('disabled', 'disabled');
        } else {
            $("[data-action='prev']").removeAttr('disabled');
        }
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
