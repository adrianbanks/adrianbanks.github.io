import { GroupedSummary } from './GroupedSummary.js';

export class SummaryPresenter {
    #summary;

    constructor(sketchnotes) {
        sketchnotes.forEach(sketchnote => {
            if (sketchnote.conference && !sketchnote.event) {
                const date = new Date(sketchnote.date);
                sketchnote.event = `${sketchnote.conference} ${date.getFullYear()}`;
            }
        });

        this.#summary = new GroupedSummary(sketchnotes);
    }

    addConferences = (list) => {
        this.#summary.byConference().forEach(conference => this.#addListItem(list, 'conference', conference));
        this.#configureColumns(list);
    }

    addEvents = (list) => {
        this.#summary.byEvent().forEach(event => this.#addListItem(list, 'event', event));
        this.#configureColumns(list);
    }

    addSpeakers = (list) => {
        this.#summary.bySpeaker().forEach(speaker => this.#addListItem(list, 'speaker', speaker));
        this.#configureColumns(list);
    }

    addTags = (list) => {
        this.#summary.byTag().forEach(tag => this.#addListItem(list, 'tag', tag));
        this.#configureColumns(list);
    }

    #addListItem = (list, type, item) => {
        let html = `<li><a class="modal-link" link-type="${type}" link-value="${item.name}" href="#" rel="modal:close">${item.name}</a>`;

        if (item.count > 1) {
            html += ` (<span title="${item.count} sketchnotes">${item.count}</span>)`;
        }

        html += '</li>';
        list.append(html);
    }

    #configureColumns = (list) => {
        const itemCount = list.children('li').length;
        const columnCount = itemCount < 15
            ? 1
            : itemCount < 50
                ? 2
                : itemCount < 100
                    ? 3
                    : 4;
        console.log(`Setting column count to ${columnCount} for ${itemCount} items`);
        console.log(list);
        list.css('column-count', columnCount);
    }
}
