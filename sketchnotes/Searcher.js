export class Searcher {
    #terms;

    constructor(terms) {
        this.#terms = terms;
    }

    search = (sketchnotes) =>
         sketchnotes.filter(sketchnote => this.#isTitleMatch(sketchnote))
            .filter(sketchnote => this.#isSpeakerMatch(sketchnote))
            .filter(sketchnote => this.#isConferenceMatch(sketchnote))
            .filter(sketchnote => this.#isEventMatch(sketchnote))
            .filter(sketchnote => this.#isTagMatch(sketchnote))
            .filter(sketchnote => this.#isTextMatch(sketchnote))
            .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

    #isTitleMatch = (sketchnote) => this.#terms.hasTitle() ? this.#contains(sketchnote.title, this.#terms.title) : true;

    #isSpeakerMatch = (sketchnote) => this.#terms.hasSpeaker() ? sketchnote.speakers.some(speaker => this.#contains(speaker, this.#terms.speaker)) : true;

    #isConferenceMatch = (sketchnote) => this.#terms.hasConference() ? this.#contains(sketchnote.conference, this.#terms.conference) : true;
    
    #isEventMatch = (sketchnote) => this.#terms.hasEvent() ? this.#contains(sketchnote.event, this.#terms.event) : true;

    #isTagMatch = (sketchnote) => this.#terms.hasTag() ? sketchnote.tags.some(tag => this.#contains(tag, this.#terms.tag)) : true;

    #isTextMatch = (sketchnote) => this.#terms.hasText() 
        ? this.#terms.text.every(text => this.#contains(sketchnote.title, text)
            || sketchnote.speakers.some(speakerText => this.#contains(speakerText, text))
            || this.#contains(sketchnote.conference, text)
            || this.#contains(sketchnote.event, text)
            || sketchnote.tags.some(tagText => this.#contains(tagText, text)))
        : true;

    #contains = (text, innerText) => text && innerText.length > 0 && text.toUpperCase().indexOf(innerText.toUpperCase()) !== -1;
}
