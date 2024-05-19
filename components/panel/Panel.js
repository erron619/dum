import dum from "../../../../tools/frontend/dum";
import utils from "../../../../tools/frontend/utils";

import $bodyHeader from "./bodyHeader";
import $sidebarButton from "./sidebar/button";
import $sidebarResizer from "./sidebar/resizer";
import $toast from "../toast/toast";
import $loadingScreen from "../loadingScreen";

export default class {
    #el = {
        container: dum.celm("div", {class: "ui-panel"}),
        sidebar: {
            container: dum.celm("div", {class: "ui-panel-sidebar"}),
            header: dum.celm("div", {class: "ui-panel-sidebar-header"}),
            footer: dum.celm("div", {class: "ui-panel-sidebar-footer"}),
            body: dum.celm("div", {class: "ui-panel-sidebar-body"}),

        },
        body: {
            container: dum.celm("div", {class: "ui-panel-body"}),
            content: dum.celm("div", {class: "ui-panel-body-content"}),
            loader: $loadingScreen(),
        }
    }
    #pageDefault = {
        icon: "line-page",
        content: [],
    }
    #pages = {}
    #currentPage = null;
    /**
    * @param {{
    * sidebar: {
    * header: HTMLElement|HTMLElement[]|Function,
    * footer: HTMLElement|HTMLElement[]|Function,
    * },
    * pages: {
    * name: string,
    * text: string,
    * icon: string,
    * open: boolean|"auto",
    * content: HTMLElement[]|Function,
    * custom: HTMLElement|undefined,
    * }[]
    * }} props
    */
    constructor(props) {
        props = {pages: [], ...props}
        let openPage;
        props.pages.forEach(i => {
            const sidebarGroup = dum.celm("div", {class: "ui-panel-sidebar-group"});
            i.forEach(j => {
                j = {...this.#pageDefault, ...j}
                if (j.custom == undefined) {
                    const button = $sidebarButton(j.icon, j.text, e => this.openPage(j.name));
                    const header = $bodyHeader(j.icon, j.text);
                    const content = j.content;
                    dum.insert(sidebarGroup, button);
                    this.#pages[j.name] = {button, header, content}
                    if (j.open == true) openPage = j.name;
                    else if (j.open == "auto") openPage = localStorage.getItem("ui-panel-page-last") || j.name;
                }
                else {}
            });
            dum.insert(this.#el.sidebar.body, sidebarGroup);
        });
        if (props.sidebar?.header) {
            if (utils.function.isFunction(props.sidebar.header)) dum.insert(this.#el.sidebar.header, props.sidebar.header(this));
            else dum.insert(this.#el.sidebar.header, props.sidebar.header);
            dum.insert(this.#el.sidebar.container, this.#el.sidebar.header);
        }
        dum.insert(this.#el.sidebar.container, [this.#el.sidebar.body, $sidebarResizer(this.#el.sidebar.container)]);
        if (props.sidebar?.footer) {
            if (utils.function.isFunction(props.sidebar.footer)) dum.insert(this.#el.sidebar.footer, props.sidebar.footer(this));
            else dum.insert(this.#el.sidebar.footer, props.sidebar.footer);
            dum.insert(this.#el.sidebar.container, this.#el.sidebar.footer);
        }
        dum.insert(this.#el.container, [this.#el.sidebar.container, this.#el.body.container]);
        this.openPage(openPage);
    }
    container() {
        return this.#el.container;
    }
    openPage(pageName, ...otherParams) {
        this.closeAllPages();
        this.#currentPage = pageName;
        localStorage.setItem("ui-panel-page-last", pageName);
        const contentRef = this.#pages[pageName].content;
        const content = [];
        if (contentRef instanceof Array || dum.check(contentRef)) content.push(contentRef);
        else if (typeof contentRef == "function") {
            if (utils.function.isAsync(contentRef)) {
                content.push(this.#el.body.loader);
                contentRef(this, ...otherParams)
                .then(res => {
                    dum.remove(this.#el.body.loader);
                    dum.insert(this.#el.body.content, res);
                })
                .catch(err => {
                    console.error(err);
                    $toast({
                        title: "An error occurred while receiving the data",
                        desc: "Panel cannot receive the required data, or an error occured while displaying them; Please check the console for more information",
                    });
                });
            }
            else content.push(contentRef(this, ...otherParams));
        }
        dum.insert(this.#el.body.content, content);
        dum.insert(this.#el.body.container, [
            this.#pages[pageName].header, 
            this.#el.body.content
        ]);
        dum.open.on(this.#pages[pageName].button);
    }
    closeAllPages() {
        dum.empty([this.#el.body.container, this.#el.body.content]);
        dum.open.off(Object.values(this.#pages).map(i => i.button));
    }
    currentPage() {
        return this.#currentPage;
    }
}