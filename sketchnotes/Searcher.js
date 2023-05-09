class Searcher {
    terms;

    constructor(terms) {
        this.terms = terms;
    }

    isSearchHit(sketchnote) {
        var inTitle = this.#contains(sketchnote.title, this.terms.title);
        var inSpeaker = this.#contains(sketchnote.speaker, this.terms.speaker);
        var inTag = sketchnote.tags.some(tagText => this.#contains(tagText, this.terms.tag));
        var inText = this.#contains(sketchnote.title, this.terms.text) 
                     || this.#contains(sketchnote.speaker, this.terms.text) 
                     || sketchnote.tags.some(tagText => this.#contains(tagText, this.terms.text));

        var isHit = (this.terms.hasTitle() && inTitle) 
                    || (this.terms.hasSpeaker() && inSpeaker) 
                    || (this.terms.hasTag() && inTag) 
                    || (this.terms.hasText() && inText);

        console.log(isHit + " " + sketchnote.title + " " + sketchnote.speaker + "    " + JSON.stringify({"inTitle": inTitle, "inSpeaker": inSpeaker, "inTag": inTag, "inText": inText}));
        return isHit;
    }

    #contains(text, innerText) {
        if (innerText.length == 0) {
            return false;
        }

        return text.toUpperCase().indexOf(innerText.toUpperCase()) !== -1;
    }
}
