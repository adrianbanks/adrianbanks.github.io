export class SearchTerms{
    title;
    speaker;
    conference;
    event;
    tag;
    text;

    constructor(search) {
        this.title = this.getSearchTermForField("title", search);
        this.speaker = this.getSearchTermForField("speaker", search);
        this.conference = this.getSearchTermForField("conference", search);
        this.event = this.getSearchTermForField("event", search);
        this.tag = this.getSearchTermForField("tag", search);
        this.text = this.getGeneralSearchTerm(search);

        console.log(`'${search}' parsed to ${JSON.stringify(this)}`);
    }

    getSearchTermForField(term, text) {
        const pattern = `${term}:(?:"([^"]+)"|(\\w+))`;
        const match = text.match(pattern);
        return match ? match.filter(n => n)[1] : "";
    }
    
    getGeneralSearchTerm(text) {
        const match = text.match(/(?<!\S)\w+(?!\S|:\s*"[^"]*")/g);
        return match ?? [];
    }

    hasTitle = () => this.title.length > 0;

    hasSpeaker = () => this.speaker.length > 0;
    
    hasConference = () => this.conference.length > 0;
    
    hasEvent = () => this.event.length > 0;
    
    hasTag = () => this.tag.length > 0;

    hasText = () => this.text.length > 0;
}
