import dum from "../../../../tools/frontend/dum";

import $spiner from "../spinner";
import $header from "./header";
import $record from "./record";

export default class {
    #el = {
        container: dum.celm("div", {class: "ui-table"}),
        table: dum.celm("table"),
        header: null,
        body: dum.celm("tbody"),
        loader: dum.celm("div", {class: "ui-table-loading"}, $spiner()),
        rows: [],
    }
    #cellsPlacementList = [];
    #props = {};
    #records = [];
    /**
     * @param {{
     * cols: Object.<string, {
     * text: string,
     * type: "string"|"boolean"|"number"|"date"|"enum"|"custom"|"link",
     * filter: boolean,
     * sort: boolean,
     * tooltip: string,
     * options: {
     *      date: {
     *          year: "2-digit"|"numeric",
     *          month: "2-digit"|"long"|"narrow"|"short"|"numeric",
     *          day: "2-digit"|"numeric",
     *          weekday: "long"|"narrow"|"short",
     *      }
     *      time: {
     *          hour: boolean,
     *          minute: boolean,
     *          second: boolean,
     *          hour12: boolean,
     *      },
     *      enums: [string],
     *      link: string,
     *      locale: "en-US"|"fa-IR"|"ar-EG",
     * },
     * }>,
     * records: [object]|undefined,
     * more: {
     * oncreate: Function,
     * onclick: Function,
     * }
     * }} props 
     */
    constructor(props) {
        this.#props = props;
        dum.insert(this.#el.container, this.#el.table);
        const header = $header(this.#props.cols, this);
        this.#cellsPlacementList = header.cellsPlacementList;
        this.#el.header = header.header;
        if (this.#props.records.length > 0) this.create(this.#props.records);
        dum.insert(this.#el.table, [this.#el.header, this.#el.body]);
    }
    container() {
        return this.#el.container;
    }
    create(data) {
        const apply = i => {
            const record = $record(i, this);
            this.#records.push(i);
            this.#el.rows.push(record);
            dum.insert(this.#el.body, record);
        }
        if (data instanceof Array) data.forEach(apply);
        else apply(data);
    }
    update(index, data) {
        if (index == undefined || this.#el.rows[index] == undefined || this.#records[index] == undefined) return;
        data = {...this.#records[index], ...data}
        const record = $record(data, this);
        dum.replace(this.#el.rows[index], record);
        this.#el.rows[index] = record;
        this.#records[index] = data;
    }
    delete(index) {
        if (index == undefined || this.#el.rows[index] == undefined || this.#records[index] == undefined) return;
        dum.remove(this.#el.rows[index]);
        this.#el.rows.splice(index, 1);
        this.#records.splice(index, 1);
    }
    clear() {
        dum.empty(this.#el.body);
        this.#el.rows = [];
        this.#records = [];
    }
    set(data) {
        this.clear();
        this.create(data);
    }
    select(index) {}
    meta() {
        return {
            props: this.#props,
            cellsPlacementList: this.#cellsPlacementList,
            records: this.#records,
        }
    }
}