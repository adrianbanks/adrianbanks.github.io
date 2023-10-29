import { GroupedSummary } from './GroupedSummary.js';
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
    
        const searchText = window.location.hash.length > 1 
            ? decodeURIComponent(window.location.hash.substring(1))
            : '';

        searcher.runSearch(searchText);

        function addListItem(list, type, item) {
            let html = `<li><a class="modal-link" link-type="${type}" link-value="${item.name}" href="#" rel="modal:close">${item.name}</a>`;

            if (item.count > 1) {
                html += ` (${item.count})`;
            }

            html += '</li>';
            list.append(html);
        }
        
        const summary = new GroupedSummary(sketchnotes);
        summary.byConference().forEach(conference => addListItem($("#conference-list"), 'conference', conference));
        summary.byEvent().forEach(event => addListItem($("#event-list"), 'event', event));
        summary.bySpeaker().forEach(speaker => addListItem($("#speaker-list"), 'speaker', speaker));
        summary.byTag().forEach(tag => addListItem($("#tag-list"), 'tag', tag));

        searcher.addSearchActionToLinks($(".modal-link"));

        $("#search-help").click(() => $('#search-help-content').toggle('fast'));
        $(".example").click(example => searcher.runSearch(example.currentTarget.innerText));
    });
});

