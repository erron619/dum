import axios from "../../../tools/frontend/axios";
import dum from "../../../tools/frontend/dum";
import quta from "../../../tools/frontend/quta";
import utils from "../../../tools/frontend/utils";

import $toast from "./toast/toast";

export default class {
    #url = "/";
    #el = {
        container: dum.celm("form", {class: "ui-form"}),
    }
    #fields = {}
    #activeErrors = new Set();
    #event = {
        submit: null,
        success: res => {},
        fail: err => {
            console.log(err);
            $toast({
                title: "An error occurred while fetching the form's data",
                desc: "Form encountered an error while fetching data; Please check the console for more information",
            });
        },
    }
    /**
     * @param {{
     * url: string,
     * fields: Object.<string, {
     * value: Function,
     * validation: Function,
     * errors: Object.<string, string|{text: string, type: "danger"|"hint"|"success"}>,
     * }>,
     * content: HTMLElement|HTMLElement[],
     * }} props 
     */
    constructor(props) {
        if (props.url) this.#url = props.url;
        if (props.fields) this.#fields = props.fields;
        dum.insert(this.#el.container, props.content);
        dum.listen(this.#el.container, "submit", e => e.preventDefault());
    }
    submit = {
        /**
         * @param {{
         * invalid: Function,
         * submit: Function,
         * success: Function,
         * fail: Function,
         * }} event
         */
        post: (event) => {
            if (this.validate() == false) return utils.function.isFunction(event.invalid) ? event.invalid() : null;
            if (utils.function.isFunction(event.submit)) event.submit();
            axios.post(this.#url, this.getData())
            .then(utils.function.isFunction(event.success) ? event.success : this.#event.success)
            .catch(utils.function.isFunction(event.fail) ? event.fail : this.#event.fail);
        },
        /**
         * @param {{
         * invalid: Function,
         * submit: Function,
         * success: Function,
         * fail: Function,
         * }} event
         */
        get: (event) => {
            if (this.validate() == false) return utils.function.isFunction(event.invalid) ? event.invalid() : null;
            if (utils.function.isFunction(event.submit)) event.submit();
            axios.get(this.#url + quta(this.getData()))
            .then(utils.function.isFunction(event.success) ? event.success : this.#event.success)
            .catch(utils.function.isFunction(event.fail) ? event.fail : this.#event.fail);
        },
        /**
         * @param {{
         * invalid: Function,
         * submit: Function,
         * success: Function,
         * fail: Function,
         * }} event
         */
        put: (event) => {
            if (this.validate() == false) return utils.function.isFunction(event.invalid) ? event.invalid() : null;
            if (utils.function.isFunction(event.submit)) event.submit();
            axios.put(this.#url, this.getData())
            .then(utils.function.isFunction(event.success) ? event.success : this.#event.success)
            .catch(utils.function.isFunction(event.fail) ? event.fail : this.#event.fail);
        },
        /**
         * @param {{
         * invalid: Function,
         * submit: Function,
         * success: Function,
         * fail: Function,
         * }} event
         */
        delete: (event) => {
            if (this.validate() == false) return utils.function.isFunction(event.invalid) ? event.invalid() : null;
            if (utils.function.isFunction(event.submit)) event.submit();
            axios.delete(this.#url + quta(this.getData()))
            .then(utils.function.isFunction(event.success) ? event.success : this.#event.success)
            .catch(utils.function.isFunction(event.fail) ? event.fail : this.#event.fail);
        },
    }
    getData() {
        const formData = new FormData(this.#el.container);
        const data = {}
        const customFieldsList = new Set();
        for (const [key, opt] of Object.entries(this.#fields)) {
            if (formData.has(key)) {
                if (utils.function.isFunction(opt.value)) data[key] = opt.value(formData.get(key));
                else data[key] = formData.get(key);
            }
            else if (utils.function.isFunction(opt.value)) customFieldsList.add(key);
        }
        customFieldsList.forEach(i => data[i] = this.#fields[i].value(data));
        return data;
    }
    validate() {
        this.#activeErrors.clear();
        const data = this.getData();
        for (const [key, value] of Object.entries(data)) {
            if (utils.function.isFunction(this.#fields[key]?.validation)) {
                const result = this.#fields[key].validation(value);
                if (result == false) this.#activeErrors.add(key);
            }
        }
        return this.getActiveErrors().length > 0 ? false : true;
    }
    getActiveErrors() {
        return Array.from(this.#activeErrors);
    }
    container() {
        return this.#el.container;
    }
}