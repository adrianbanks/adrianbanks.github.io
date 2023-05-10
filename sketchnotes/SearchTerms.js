export class SearchTerms{
    title;
    speaker;
    tag;
    text;

    constructor(search) {
        this.title = this.#getSearchTermForField("title", search);
        this.speaker = this.#getSearchTermForField("speaker", search);
        this.tag = this.#getSearchTermForField("tag", search);
        this.text = this.#getGeneralSearchTerm(search);

        console.log("'" + search + "' parsed to " + JSON.stringify(this));
    }

    #getSearchTermForField(term, text) {
        var parts = text.split(" ");

        for (let i = 0; i < parts.length; i++) {
            var part = parts[i];

            if (part.startsWith(term + ":")) {
                return part.substring(part.indexOf(":") + 1);
            }            
        }

        return "";
    }
    
    #getGeneralSearchTerm(text) {
        var parts = text.split(" ");
        var terms = [];

        for (let i = 0; i < parts.length; i++) {
            var part = parts[i];

            if (!part.includes(":")) {
                terms.push(part);
            }            
        }

        return terms.join(" ");
    }

    hasTitle() {
        return this.title.length > 0;
    }

    hasSpeaker() {
        return this.speaker.length > 0;
    }
    
    hasTag() {
        return this.tag.length > 0;
    }

    hasText() {
        return this.text.length > 0;
    }
}
