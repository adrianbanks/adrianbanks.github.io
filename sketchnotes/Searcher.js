export class Searcher {
    terms;

    constructor(terms) {
        this.terms = terms;
    }

    search(sketchnotes) {
        var results = sketchnotes.filter(sketchnote => this.#isTitleMatch(sketchnote))
                                 .filter(sketchnote => this.#isSpeakerMatch(sketchnote))
                                 .filter(sketchnote => this.#isEventMatch(sketchnote))
                                 .filter(sketchnote => this.#isTagMatch(sketchnote))
                                 .filter(sketchnote => this.#isTextMatch(sketchnote))
                                 .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
        return results;
    }

    #isTitleMatch(sketchnote) {
        return this.terms.hasTitle() ? this.#contains(sketchnote.title, this.terms.title) : true;
    }

    #isSpeakerMatch(sketchnote) {
        return this.terms.hasSpeaker() ? sketchnote.speakers.some(speaker => this.#contains(speaker, this.terms.speaker)) : true;
    }

    #isEventMatch(sketchnote) {
        return this.terms.hasEvent() ? this.#contains(sketchnote.event, this.terms.event) : true;
    }

    #isTagMatch(sketchnote) {
        return this.terms.hasTag() ? sketchnote.tags.some(tag => this.#contains(tag, this.terms.tag)) : true;
    }

    #isTextMatch(sketchnote) {
        var terms = this.terms;
        return terms.hasText() 
            ? this.#contains(sketchnote.title, terms.text)
            || sketchnote.speakers.some(speakerText => this.#contains(speakerText, terms.speaker))
            || this.#contains(sketchnote.event, terms.text)
            || sketchnote.tags.some(tagText => this.#contains(tagText, terms.text))
            : true;
    }

    #contains(text, innerText) {
        if (innerText.length == 0) {
            return false;
        }

        return text.toUpperCase().indexOf(innerText.toUpperCase()) !== -1;
    }
}
