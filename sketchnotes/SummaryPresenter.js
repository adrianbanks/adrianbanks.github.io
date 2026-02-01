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
        this.#addItemsWithGrouping(list, 'conference', this.#summary.byConference());
    }

    addEvents = (list) => {
        this.#addItemsWithGrouping(list, 'event', this.#summary.byEvent());
    }

    addSpeakers = (list) => {
        this.#addItemsWithGrouping(list, 'speaker', this.#summary.bySpeaker());
    }

    addTags = (list) => {
        this.#addItemsWithGrouping(list, 'tag', this.#summary.byTag());
    }

    #addItemsWithGrouping = (list, type, items) => {
        if (items.length > 50) {
            let currentLetter = '';

            items.forEach(item => {
                const firstLetter = item.name[0].toUpperCase();

                if (firstLetter !== currentLetter) {
                    currentLetter = firstLetter;
                    list.append(`<h3 class="letter-heading">${currentLetter}</h3>`);
                }
                
                this.#addListItem(list, type, item);
            });
        } else {
            items.forEach(item => this.#addListItem(list, type, item));
        }

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
