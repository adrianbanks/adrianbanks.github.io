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

        console.log(`'${search}' parsed to ${JSON.stringify(this)}`);
    }

    #getSearchTermForField(term, text) {
        var pattern = `${term}:(?:"([^"]+)"|(\\w+))`;
        var match = text.match(pattern);
        return match ? match.filter(n => n)[1] : "";
    }
    
    #getGeneralSearchTerm(text) {
        var match = text.match(/(?<!\S)\w+(?!\S|:\s*"[^"]*")/g);
        return match ? match.join(" ") : "";
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
