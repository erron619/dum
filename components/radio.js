import dum from "../../../tools/frontend/dum";
import reactor from "../../../tools/frontend/reactor";
import _utils from "./_utils";

import $icon from "./icon";

/**
 * @param {{
 * checked: boolean,
 * disabled: boolean,
 * value: string,
 * text: string,
 * name: string,
 * id: string,
 * }} props 
 */
export default function(props) {
    const _id = _utils.defaultID("radio");
    props = {
        checked: false,
        disabled: false,
        value: "",
        id: _id,
        name: _id,
        ...props,
    }
    const input = dum.celm("input", {type: "radio", id: props.id, name: props.name, value: props.value});
    const button = dum.celm("label", {for: props.id, class: "ui-radio-button"}, dum.celm("div"));
    const container = dum.celm("div", {class: "ui-radio"}, [input, button]);
    if (props.text) {
        const text = dum.celm("label", {for: props.id, class: "ui-radio-text"}, props.text);
        dum.insert(container, text);
    }
    input.disabled = props.disabled;
    input.checked = props.checked;
    const checked = reactor.ref(props.checked);
    dum.listen(input, "change", e => checked(input.checked));
    return {container, input, checked};
}