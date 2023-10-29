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
    #previousButton;
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

        const searcher = this;
        const complete = () => searcher.addSearchActionToLinks($(".search-link"));
        this.#sketchnotesArea.loadTemplate("sketchnote.html", data,
            { 
                isFile: true,
                paged: true,
                pageNo: pageNo, 
                elemPerPage: resultsPerPage, 
                bindingOptions: { ignoreUndefined: true }, 
                complete: complete
            }
        );
    
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
    
        this.#currentPage = pageNo;
        const pageNum = data.length > 0 ? pageNo : 0;
        const numPages = Math.ceil(data.length / resultsPerPage);
        this.#sketchnoteCount.prop('title', `Page ${pageNum}/${numPages}`);
    }
    
    runSearch(searchText) {
        if (searchText === this.#currentSearch) {
            return;
        }
    
        this.#currentSearch = searchText;
        const terms = new SearchTerms(searchText);
        const searcher = new Searcher(terms);
        this.#currentData = searcher.search(this.#sketchnotes);

        this.#displayPage(this.#currentData, 1);
        this.#searchTextBox.val(searchText);
        const hash = encodeURIComponent(searchText);
        window.location.hash = hash;
    }
    
    addSearchActionToLinks(items) {
        items.click(link => {
            const type = link.currentTarget.getAttribute("link-type");
            const value = link.currentTarget.innerText;
            const search = `${type}:"${value}"`;
            this.runSearch(search);
        });
    }
}
