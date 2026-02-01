export class KeyboardShortcut {
    #description;
    #onPressed;
    #key;
    #keyText;

    constructor(description, onPressed, key, keyText) {
        this.#description = description;
        this.#onPressed = onPressed;
        this.#key = key;
        this.#keyText = keyText;
    }

    apply(keyEvent) {
        if (keyEvent.key === this.#key) {
            this.#onPressed(keyEvent);
            keyEvent.preventDefault();
        }
    }

    addHelp(list) {
        const row = `<li><kbd>${this.#keyText ?? this.#key}</kbd> ${this.#description}</li>`;
        list.append(row);
    }
}
