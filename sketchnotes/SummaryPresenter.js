import { GroupedSummary } from './GroupedSummary.js';

export class SummaryPresenter {
    #summary;

    constructor(sketchnotes) {
        this.#summary = new GroupedSummary(sketchnotes);
    }

    addConferences = (list) => {
        this.#summary.byConference().forEach(conference => this.#addListItem(list, 'conference', conference));
    }

    addEvents = (list) => {
        this.#summary.byEvent().forEach(event => this.#addListItem(list, 'event', event));
    }

    addSpeakers = (list) => {
        this.#summary.bySpeaker().forEach(speaker => this.#addListItem(list, 'speaker', speaker));
    }

    addTags = (list) => {
        this.#summary.byTag().forEach(tag => this.#addListItem(list, 'tag', tag));
    }
    
    #addListItem = (list, type, item) => {
        let html = `<li><a class="modal-link" link-type="${type}" link-value="${item.name}" href="#" rel="modal:close">${item.name}</a>`;

        if (item.count > 1) {
            html += ` (<span title="${item.count} sketchnotes">${item.count}</span>)`;
        }

        html += '</li>';
        list.append(html);
    }
}
