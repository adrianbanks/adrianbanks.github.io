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

    $("#sketchnote-count").text(`${data.length} sketchnote${data.length != 1 ? "s" : ""}`);

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
        speakers: value => value.map(speaker => `<a href="#">${speaker}</a>`).join(", "),
        events: value => `<a href="#">${value}</a>`,
        tags: value => value.map(tag => `<span class="tag"><a href="#">${tag}</a></span>`),
        sketchnoteImage: value => rootPath + value
    });

    fetch('./index.json')
    .then(response => response.json())
    .then(json => {
        sketchnotes = json.sketchnotes;
        rootPath = json.rootPath;
        allEvents = [...new Set(sketchnotes.map(sketchnote => sketchnote.event))].sort((a, b) => a.localeCompare(b));
        allSpeakers = [...new Set(sketchnotes.map(sketchnote => sketchnote.speakers).flat(Infinity))].sort((a, b) => a.localeCompare(b));
        allTags = [...new Set(sketchnotes.map(sketchnote => sketchnote.tags).flat(Infinity))].sort((a, b) => a.localeCompare(b));

        var searchText = window.location.hash;

        if (searchText.length > 0) {
            searchText = decodeURIComponent(searchText.substring(1));
        }

        $("#searchText").val(searchText);
        runSearch();

        allEvents.forEach(event => $("#event-list").append(`<li><a class="modal-link" data-type="event" data-value="${event}" href="#" rel="modal:close">${event}</a></li>`));
        allSpeakers.forEach(speaker => $("#speaker-list").append(`<li><a class="modal-link"data-type="speaker" data-value="${speaker}" href="#" rel="modal:close">${speaker}</a></li>`));
        allTags.forEach(tag => $("#tag-list").append(`<li><a class="modal-link" data-type="tag" data-value="${tag}" href="#" rel="modal:close">${tag}</a></li>`));

        $(".modal-link").click(function () {
            var type = this.getAttribute("data-type");
            var value = this.getAttribute("data-value");
            var search = `${type}:"${value}"`;
            $("#searchText").val(search);
            runSearch();
        });
    });
});
