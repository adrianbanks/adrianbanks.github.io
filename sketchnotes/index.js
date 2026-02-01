import { SummaryPresenter } from './SummaryPresenter.js';
import { UiSearcher } from './UiSearcher.js'
import { KeyboardShortcut } from './KeyboardShortcut.js'

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
        searchTextBox.on('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchTextBox.blur();
            }
        });

        nextButton.click(() => searcher.moveToNextPage());
        previousButton.click(() => searcher.moveToPreviousPage());
    
        const summaryPresenter = new SummaryPresenter(sketchnotes);
        summaryPresenter.addConferences($('#conference-list'));
        summaryPresenter.addEvents($('#event-list'));
        summaryPresenter.addSpeakers($('#speaker-list'));
        summaryPresenter.addTags($('#tag-list'));

        const keyboardShortcuts = [
            new KeyboardShortcut('Focus the search box', () => {
                e.preventDefault();
                searchTextBox.focus();
            }, 'f'),
            new KeyboardShortcut('Clear the search box', (e) => {
                searchTextBox.val('');
                searcher.runSearch('');
            }, 'x'),
            new KeyboardShortcut('Move to the previous page', (e) => searcher.moveToPreviousPage(), 'ArrowLeft', '←'),
            new KeyboardShortcut('Move to the next page', (e) => searcher.moveToNextPage(), 'ArrowRight', '→'),
            new KeyboardShortcut('Toggle the syntax help', (e) => $('#search-help-content').toggle('fast'), 'h'),
            new KeyboardShortcut('Show this help', (e) => $('#keyboard-help').modal(), '?'),
        ];

        keyboardShortcuts.forEach(shortcut => shortcut.addHelp($('#keyboard-shortcut-list')));

        const searchText = window.location.hash.length > 1 
            ? decodeURIComponent(window.location.hash.substring(1))
            : '';

        searcher.runSearch(searchText);
        searcher.addSearchActionToLinks($(".modal-link"));

        $("#search-help").click(() => $('#search-help-content').toggle('fast'));
        $(".example").click(example => searcher.runSearch(example.currentTarget.innerText));

        $(document).on('keydown', e => {
            if (e.target.id === 'search-text') {
                return;
            }

            keyboardShortcuts.forEach(shortcut => shortcut.apply(e));
        });
    });
});

