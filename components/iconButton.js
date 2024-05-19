import dum from "../../../tools/frontend/dum";

import $icon from "./icon";

/**
 * @param {{
 * type: "primary"|"secondary"|"danger"|"outline"|"ghost",
 * round: boolean,
 * disabled: boolean,
 * icon: string,
 * }} props 
 * @returns {HTMLElement}
 */
export default function(props) {
    props = {
        type: "primary",
        round: false,
        disabled: false,
        ...props,
    }
    const button = dum.celm(
        "button", 
        {
            class: "ui-iconButton", 
            "data-ui-type": props.type, 
            "data-ui-round": props.round,
        }, 
        $icon(props.icon)
    );
    if (props.disabled == true) dum.attrs.set(button, "disabled", true);
    return button;
}