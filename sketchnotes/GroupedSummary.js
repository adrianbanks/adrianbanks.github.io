export class GroupedSummary {
    #sketchnotes;

    constructor(sketchnotes) {
        this.#sketchnotes = sketchnotes;
    }

    byConference = () => { 
        const grouped = this.#groupBy(sketchnote => sketchnote.conference);
        return this.#getSummary(grouped);
    };

    byEvent = () => {
        const grouped = this.#groupBy(sketchnote => sketchnote.event);
        return this.#getSummary(grouped);
    }

    bySpeaker = () => {
        const grouped = this.#groupBy(sketchnote => sketchnote.speakers);
        return this.#getSummary(grouped);
    }

    byTag = () => {
        const grouped = this.#groupBy(sketchnote => sketchnote.tags);
        return this.#getSummary(grouped);
    }

    #groupBy = (keyGetter) => {
        return this.#sketchnotes.reduce(function (acc, sketchnote) {
            const key = keyGetter(sketchnote);

            if (!key) {
                return acc;
            }

            const add = (k) => (acc[k] = acc[k] || []).push(sketchnote)

            if (Array.isArray(key)) {
                key.forEach(add);
            } else {
                add(key);
            }

            return acc;
        }, {})
    };

    #getSummary = (grouped) => {
        let summary = [];

        for (const property in grouped) {
            if (Object.prototype.hasOwnProperty.call(grouped, property)) {
                summary.push({ name: property, count: grouped[property].length });
            }
        }

        return summary.sort((a, b) => a.name.localeCompare(b.name));
    };
}
