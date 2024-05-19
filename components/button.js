import dum from "../../../tools/frontend/dum";

import $icon from "./icon";
import $spinner from "./spinner";
import $tooltip from "./tooltip";

/**
 * @param {{
 * type: "primary"|"secondary"|"danger"|"outline"|"ghost"|"link",
 * position: "left"|"right",
 * disabled: boolean,
 * icon: string,
 * text: string,
 * loading: boolean,
 * events: Object.<string, Function>,
 * tooltip: string,
 * link: string,
 * }} props 
 * @returns {HTMLElement}
 */
export default function(props) {
    props = {
        type: "primary",
        round: false,
        state: "default",
        position: "left",
        disabled: false,
        text: "Button",
        ...props,
    }
    const button = dum.celm(
        props.link ? "a" :"button", 
        {
            class: "ui-button", 
            "ui-type": props.type, 
            "ui-loading": false,
        }, 
        dum.celm("div", {}, props.text)
    );
    button.disabled = props.disabled;
    if (props.link) dum.attrs.set(button, "href", props.link);
    if (props.icon) dum.insert(button, $icon(props.icon), props.position == "left" ? "start" : "end");
    if (props.loading == true) dum.insert(button, $spinner(), "start");
    if (props.events) Object.entries(props.events).forEach(i => dum.listen(button, i[0], i[1]));
    if (props.tooltip) $tooltip({target: button, text: props.tooltip});
    return button;
}