import { Searcher } from './Searcher.js'
import { SearchTerms } from './SearchTerms.js'

export class UiSearcher { 
    #currentData = [];
    #currentSearch = null;
    #currentPage = 1;

    #sketchnotes;

    #searchTextBox;
    #sketchnotesArea;
    #sketchnoteCount;
    #previousButton
    #nextButton;

    constructor(sketchnotes, searchTextBox, sketchnotesArea, sketchnoteCount, previousButton, nextButton) {
        this.#sketchnotes = sketchnotes;
        this.#searchTextBox = searchTextBox;
        this.#sketchnotesArea = sketchnotesArea;
        this.#sketchnoteCount = sketchnoteCount;
        this.#previousButton = previousButton;
        this.#nextButton = nextButton;
    }

    moveToPreviousPage() {
        this.#currentPage--;
        this.#displayPage(this.#currentData, this.#currentPage);
    }

    moveToNextPage() {
        this.#currentPage++;
        this.#displayPage(this.#currentData, this.#currentPage);
    }

    #displayPage(data, pageNo) {
        const resultsPerPage = 8;
    
        this.#sketchnotesArea.loadTemplate("sketchnote.html", data, { paged: true, pageNo: pageNo, elemPerPage: resultsPerPage });
    
        if (pageNo <= 1) {
            this.#previousButton.attr('disabled', 'disabled');
        } else {
            this.#previousButton.removeAttr('disabled');
        }

        if (pageNo * resultsPerPage >= data.length) {
            this.#nextButton.attr('disabled', 'disabled');
        } else {
            this.#nextButton.removeAttr('disabled');
        }

        this.#sketchnoteCount.text(`${data.length} sketchnote${data.length != 1 ? "s" : ""}`);
    
        var pageNum = data.length > 0 ? pageNo : 0;
        var numPages = Math.ceil(data.length / resultsPerPage);
        this.#sketchnoteCount.prop('title', `Page ${pageNum}/${numPages}`);
    
        $(".search-link").click(function() {
            this.searchLinkClicked(this);
        });
    }
    
    runSearch(searchText) {
        if (searchText === this.#currentSearch) {
            return;
        }
    
        this.#currentSearch = searchText;
        var terms = new SearchTerms(searchText);
        var searcher = new Searcher(terms);
        this.#currentData = searcher.search(this.#sketchnotes);

        this.#displayPage(this.#currentData, 1);
    }
    
    searchLinkClicked(link) {
        var type = link.getAttribute("link-type");
        var value = link.innerText;
        var search = `${type}:"${value}"`;
        this.#searchTextBox.val(search);
        this.runSearch(search);
    }
}
