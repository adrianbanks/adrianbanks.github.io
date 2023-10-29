import { UiSearcher } from './UiSearcher.js'

$(document).ready(() => {
    var rootPath = '';
    var allConferences = [];
    var allEvents = [];
    var allSpeakers = [];
    var allTags = [];

    $.addTemplateFormatter({
        speakers: value => value.map(speaker => `<a class="search-link" link-type="speaker" href="#">${speaker}</a>`).join(", "),
        tags: value => value.map(tag => `<a class="tag search-link" link-type="tag" href="#">${tag}</a>`),
        sketchnoteImage: value => rootPath + value
    });

    fetch('./index.json')
    .then(response => response.json())
    .then(json => {
        rootPath = json.rootPath;
        var sketchnotes = json.sketchnotes;

        allConferences = [...new Set(sketchnotes.filter(sketchnote => sketchnote.conference).map(sketchnote => sketchnote.conference))].sort((a, b) => a.localeCompare(b));
        allEvents = [...new Set(sketchnotes.filter(sketchnote => sketchnote.event).map(sketchnote => sketchnote.event))].sort((a, b) => a.localeCompare(b));
        allSpeakers = [...new Set(sketchnotes.map(sketchnote => sketchnote.speakers).flat(Infinity))].sort((a, b) => a.localeCompare(b));
        allTags = [...new Set(sketchnotes.map(sketchnote => sketchnote.tags).flat(Infinity))].sort((a, b) => a.localeCompare(b));

        var searchTextBox = $("#search-text");
        var previousButton = $("[data-action='prev']");
        var nextButton = $("[data-action='next']");
        var searcher = new UiSearcher(sketchnotes, searchTextBox, $("#sketchnotes"), $("#sketchnote-count"), previousButton, nextButton);
        
        searchTextBox.on("keyup", () => searcher.runSearch(searchTextBox.val()));
        searchTextBox.on('search', () => searcher.runSearch(''));

        nextButton.click(() => searcher.moveToNextPage());
        previousButton.click(() => searcher.moveToPreviousPage());
    
        var searchText = window.location.hash;

        if (searchText.length > 0) {
            searchText = decodeURIComponent(searchText.substring(1));
        }

        searcher.runSearch(searchText);

        allConferences.forEach(conference => $("#conference-list").append(`<li><a class="modal-link" link-type="conference" link-value="${conference}" href="#" rel="modal:close">${conference}</a></li>`));
        allEvents.forEach(event => $("#event-list").append(`<li><a class="modal-link" link-type="event" link-value="${event}" href="#" rel="modal:close">${event}</a></li>`));
        allSpeakers.forEach(speaker => $("#speaker-list").append(`<li><a class="modal-link"link-type="speaker" link-value="${speaker}" href="#" rel="modal:close">${speaker}</a></li>`));
        allTags.forEach(tag => $("#tag-list").append(`<li><a class="modal-link" link-type="tag" link-value="${tag}" href="#" rel="modal:close">${tag}</a></li>`));

        searcher.addSearchActionToLinks($(".modal-link"));

        $("#search-help").click(() => $('#search-help-content').toggle('fast'));
        $(".example").click(example => searcher.runSearch(example.currentTarget.innerText));
    });
});
