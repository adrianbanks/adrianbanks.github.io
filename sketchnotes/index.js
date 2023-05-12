import { Searcher } from './Searcher.js'
import { SearchTerms } from './SearchTerms.js'

const displayPage = (data, pageNo) => {
    const resultsPerPage = 8;

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

    $("#sketchnote-count").text(data.length + ' sketchnote' + (data.length != 1 ? "s" : ""));

    var pageNum = data.length > 0 ? pageNo : 0;
    var numPages = Math.ceil(data.length / resultsPerPage);
    $("#sketchnote-count").prop('title', `Page ${pageNum}/${numPages}`);
}

const search = (sketchnotes, search) => {
    var terms = new SearchTerms(search);
    var searcher = new Searcher(terms);
    return searcher.search(sketchnotes);
}

$(document).ready(() => {
    var sketchnotes = [];
    var rootPath = '';
    var allEvents = [];
    var allSpeakers = [];
    var allTags = [];

    var currentPage = 1;
    var currentData = [];
    var currentSearch = null;

    const runSearch = () => {
        var searchText = $("#searchText").val();

        if (searchText === currentSearch) {
            return;
        }

        currentSearch = searchText;
        currentData = search(sketchnotes, searchText)
        displayPage(currentData, 1);
    }

    $("#searchText").on("keyup", () => runSearch());

    $("[data-action='next']").click(() => {
        currentPage++;
        displayPage(currentData, currentPage);
    });

    $("[data-action='prev']").click(() => {
        currentPage--;
        displayPage(currentData, currentPage);
    });

    $.addTemplateFormatter({
        tags: value => value.map(tag => `<span class="tag">${tag}</span>`),
        sketchnoteImage: value => rootPath + value
    });

    fetch('./index.json')
    .then(response => response.json())
    .then(json => {
        sketchnotes = json.sketchnotes;
        rootPath = json.rootPath;
        allEvents = [...new Set(sketchnotes.map(sketchnote => sketchnote.event))];
        allSpeakers = [...new Set(sketchnotes.map(sketchnote => sketchnote.speaker))];
        allTags = [...new Set(sketchnotes.map(sketchnote => sketchnote.tags).flat(Infinity))];

        var searchText = window.location.hash;

        if (searchText.length > 0) {
            searchText = decodeURIComponent(searchText.substring(1));
        }

        $("#searchText").val(searchText);
        runSearch();
    });
});
