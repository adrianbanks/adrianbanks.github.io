import { SummaryPresenter } from './SummaryPresenter.js';
import { UiSearcher } from './UiSearcher.js'

$(document).ready(() => {
    let rootPath = '';

    $.addTemplateFormatter({
        speakers: value => value.map(speaker => `<a class="search-link" link-type="speaker" href="#">${speaker}</a>`).join(", "),
        tags: value => value.map(tag => `<a class="tag search-link" link-type="tag" href="#">${tag}</a>`),
        sketchnoteImage: value => rootPath + value
    });

    fetch('./index.json')
    .then(response => response.json())
    .then(json => {
        rootPath = json.rootPath;
        const sketchnotes = json.sketchnotes;

        const searchTextBox = $("#search-text");
        const previousButton = $("[data-action='prev']");
        const nextButton = $("[data-action='next']");
        const searcher = new UiSearcher(sketchnotes, searchTextBox, $("#sketchnotes"), $("#sketchnote-count"), previousButton, nextButton);
        
        searchTextBox.on("keyup", () => searcher.runSearch(searchTextBox.val()));
        searchTextBox.on('search', () => searcher.runSearch(''));

        nextButton.click(() => searcher.moveToNextPage());
        previousButton.click(() => searcher.moveToPreviousPage());
    
        const summaryPresenter = new SummaryPresenter(sketchnotes);
        summaryPresenter.addConferences($('#conference-list'));
        summaryPresenter.addEvents($('#event-list'));
        summaryPresenter.addSpeakers($('#speaker-list'));
        summaryPresenter.addTags($('#tag-list'));

        const searchText = window.location.hash.length > 1 
            ? decodeURIComponent(window.location.hash.substring(1))
            : '';

        searcher.runSearch(searchText);
        searcher.addSearchActionToLinks($(".modal-link"));

        $("#search-help").click(() => $('#search-help-content').toggle('fast'));
        $(".example").click(example => searcher.runSearch(example.currentTarget.innerText));
    });
});

