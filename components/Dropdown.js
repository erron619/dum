import dum from "../../../tools/frontend/dum";
import utils from "../../../tools/frontend/utils";
import animate from "../../../tools/frontend/animate";
import _utils from "./_utils";

import $icon from "./icon";

export default class {
    #state = "close";
    #el = {
        container: dum.celm("div", {class: "ui-dropdown"}),
        items: {},
    }
    #props = {}
    #disabled = false;
    /**
     * @param {{
     * target: HTMLElement,
     * items: Object.<string, {
     * icon: string,
     * text: string,
     * type: "default"|"danger",
     * disabled: boolean,
     * onclick: Function,
     * }>[],
     * onopen: Function,
     * onclose: Function,
     * boundry: number,
     * }} props 
     */
    constructor(props) {
        this.#props = props;
        this.refresh();
        dum.listen(this.#props.target, "click", e => {
            if (this.#disabled == true) return;
            if (this.#state == "close") this.open();
            else if (this.#state == "open") this.close();
        });
        dum.listen(dum.select("#root"), "mousedown", e => {
            if (this.#state != "open") return;
            this.close();
        });
        //TODO: add boundry
        //TODO: add auto closing
        //TODO: add more items
    }
    refresh() {
        dum.empty(this.#el.container);
        for (const group of this.#props.items) {
            const groupElm = dum.celm("div", {class: "ui-dropdown-group"});
            for (const [itemKey, itemOptions] of Object.entries(group)) {
                this.#el.items[itemKey] = dum.celm(
                    "button", 
                    {class: "ui-dropdown-button", "ui-type": itemOptions.type},
                    [$icon(itemOptions.icon), dum.celm("div", {}, itemOptions.text)]
                );
                this.#el.items[itemKey].disabled = itemOptions.disabled;
                dum.listen(this.#el.items[itemKey], "click", itemOptions?.onclick);
                dum.insert(groupElm, this.#el.items[itemKey]);
            }
            dum.insert(this.#el.container, groupElm);
        }
    }
    open(refresh = false) {
        this.#state = "open";
        if (refresh == true || dum.children(this.#el.container).length == 0) this.refresh();
        dum.insert(dum.select("#root"), this.#el.container);
        animate(
            this.#el.container, 
            {opacity: 0, scale: 0.95},
            {opacity: 1, scale: 1},
            {delay: 25, before: () => _utils.boundToScreen(this.#props.target, this.#el.container)}
        );
        if (utils.function.isFunction(this.#props.onopen)) this.#props.onopen(this);
    }
    close() {
        this.#state = "closing";
        animate(
            this.#el.container,
            {opacity: 1, scale: 1},
            {opacity: 0, scale: 0.95},
            {
                after: () => {
                    dum.remove(this.#el.container);
                    this.#state = "close";
                    if (utils.function.isFunction(this.#props.onclose)) this.#props.onclose(this);
                }
            }
        );
    }
    disable(value) {
        if (value && typeof value == "boolean") this.#disabled = value;
        else this.#disabled = !this.#disabled;
        return this.#disabled;
    }
    disableItem(itemKey, value) {
        if (!this.#el.items[itemKey]) return;
        if (value && typeof value == "boolean") this.#el.items[itemKey].disabled = value;
        else this.#el.items[itemKey].disabled = !this.#el.items[itemKey].disabled;
        return this.#el.items[itemKey].disabled;
    }
    getState() {
        return this.#state;
    }
}