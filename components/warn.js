import dum from "../../../tools/frontend/dum";

import $icon from "./icon";

/**
 * @param {{
 * text: string,
 * type: "danger"|"default"|"success",
 * open: boolean,
 * }} props 
 */
export default function(props) {
    props = {
        type: "default", 
        text: "Default warn text", 
        open: true, 
        ...props
    }
    const icon = {
        danger: $icon("line-danger-circle"),
        default: $icon("line-more-circle"),
        success: $icon("line-tick-circle"),
    }
    for (const [key, i] of Object.entries(icon)) dum.class.add(i, `ui-warn-icon-${key}`);
    const warn = dum.celm("div", {class: "ui-warn", "ui-type": props.type}, [
        ...Object.values(icon),
        dum.celm("div", {}, props.text),
    ]);
    if (props.open == true) dum.open.on(warn);
    return warn;
}