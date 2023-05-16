export class Searcher {
    #terms;

    constructor(terms) {
        this.#terms = terms;
    }

    search(sketchnotes) {
        var results = sketchnotes.filter(sketchnote => this.#isTitleMatch(sketchnote));
        results = results.filter(sketchnote => this.#isSpeakerMatch(sketchnote));
        results = results.filter(sketchnote => this.#isEventMatch(sketchnote));
        results = results.filter(sketchnote => this.#isTagMatch(sketchnote));
        results = results.filter(sketchnote => this.#isTextMatch(sketchnote));
        results = results.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
        return results;
    }

    #isTitleMatch = (sketchnote) => this.#terms.hasTitle() ? this.#contains(sketchnote.title, this.#terms.title) : true;

    #isSpeakerMatch = (sketchnote) => this.#terms.hasSpeaker() ? sketchnote.speakers.some(speaker => this.#contains(speaker, this.#terms.speaker)) : true;

    #isEventMatch = (sketchnote) => this.#terms.hasEvent() ? this.#contains(sketchnote.event, this.#terms.event) : true;

    #isTagMatch = (sketchnote) => this.#terms.hasTag() ? sketchnote.tags.some(tag => this.#contains(tag, this.#terms.tag)) : true;

    #isTextMatch = (sketchnote) => this.#terms.hasText() 
        ? this.#contains(sketchnote.title, this.#terms.text)
        || sketchnote.speakers.some(speakerText => this.#contains(speakerText, this.#terms.text))
        || this.#contains(sketchnote.event, this.#terms.text)
        || sketchnote.tags.some(tagText => this.#contains(tagText, this.#terms.text))
        : true;

    #contains = (text, innerText) => innerText.length > 0 && text.toUpperCase().indexOf(innerText.toUpperCase()) !== -1;
}
