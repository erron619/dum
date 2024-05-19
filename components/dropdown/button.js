import dum from "../../../../tools/frontend/dum";

import $icon from "../icon";

export default function(props) {
    props = {
        type: "default",
        disabled: false,
        ...props,
    }
    const button = dum.celm("button", {class: "ui-dropdown-button", "ui-type": props.type}, [
        $icon(props.icon),
        dum.celm("div", {}, props.text),
    ]);
    button.disabled = props.disabled;
    dum.listen(button, "click", props?.onclick);
    return button;
}