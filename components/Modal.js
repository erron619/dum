import dum from "../../../tools/frontend/dum";
import utils from "../../../tools/frontend/utils";
import animate from "../../../tools/frontend/animate";

import $toast from "./toast/toast";
import $closer from "./closer";
import $loadingScreen from "./loadingScreen";
import _frontScreen from "./_frontScreen";

export default class {
    #el = {
        container: dum.celm("div", {class: "ui-modal"}),
        base: dum.celm("div", {class: "ui-modal-base"}),
        header: dum.celm("div", {class: "ui-modal-header"}),
        body: dum.celm("div", {class: "ui-modal-body"}),
        footer: dum.celm("div", {class: "ui-modal-footer"}),
        closer: $closer(e => this.close()),
        loader: $loadingScreen(),
    }
    #props = {title: "A new modal"}
    #disableClosing = false;
    /**
     * @param {{
     * title: string,
     * footer: HTMLElement|HTMLElement[]|Function,
     * content: HTMLElement|HTMLElement[]|Function,
     * }} props 
     */
    constructor(props) {
        this.#props = {...this.#props ,...props}
        dum.insert(this.#el.header, [
            dum.celm("div", {class: "ui-modal-title"}, this.#props.title),
            this.#el.closer
        ]);
        dum.insert(this.#el.base, [this.#el.header, this.#el.body, this.#el.footer]);
        dum.insert(this.#el.container, this.#el.base);
    }
    /**
     * @param {boolean} refresh 
     * @param {[*]|{footer: [*], content: [*]}} otherParams 
     */
    open(refresh = false, otherParams) {
        if (dum.children(this.#el.body).length == 0 || refresh == true) this.refresh(otherParams);
        _frontScreen.add(this.#el.container);
        animate(
            this.#el.base, 
            {y: "-16px", opacity: 0}, 
            {y: "0px", opacity: 1},
            {duration: 300}
        );
    }
    close(urgentClosing = false) {
        if (urgentClosing == true) this.disableClosing(false);
        if (this.#disableClosing == true) return;
        animate(
            this.#el.base, 
            {y: "0px", opacity: 1},
            {y: "16px", opacity: 0}, 
            {
                after: () => {
                    _frontScreen.remove(this.#el.container);
                    dum.empty([this.#el.body, this.#el.footer]);
                },
                duration: 300,
            }
        );
    }
    /**
     * @param {boolean} refresh 
     * @param {[*]|{footer: [*], content: [*]}} otherParams 
     */
    refresh(otherParams = []) {
        dum.empty([this.#el.body, this.#el.footer]);
        let contentParams, footerParams;
        if (utils.object.check(otherParams)) {
            contentParams = otherParams.content || [];
            footerParams = otherParams.footer || [];
        }
        else if (otherParams instanceof Array) {
            contentParams = otherParams;
            footerParams = otherParams;
        }
        // content ____________________________________________
        if (utils.function.isFunction(this.#props.content)) {
            if (utils.function.isAsync(this.#props.content)) {
                dum.insert(this.#el.body, this.#el.loader);
                this.#props.content.apply(this, contentParams)
                .then(res => {
                    dum.remove(this.#el.loader);
                    dum.insert(this.#el.body, res);
                })
                .catch(err => {
                    console.error(err);
                    $toast({
                        title: "An error occurred while receiving the data",
                        desc: "Modal cannot receive the required data, or an error occured while displaying them; Please check the console for more information",
                    });
                });
            }
            else dum.insert(this.#el.body, this.#props.content.apply(this, contentParams));
        }
        else dum.insert(this.#el.body, this.#props.content);
        // footer _____________________________________________
        if (utils.function.isFunction(this.#props.footer)) {
            dum.insert(this.#el.footer, this.#props.footer.apply(this, footerParams));
        }
        else dum.insert(this.#el.footer, this.#props.content);
    }
    disableClosing(value) {
        if (value && typeof value == "boolean") this.#disableClosing = value;
        else this.#disableClosing = !this.#disableClosing;
        return this.#disableClosing;
    }
}