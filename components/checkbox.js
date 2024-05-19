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
    const _id = _utils.defaultID("checkbox");
    props = {
        checked: false,
        disabled: false,
        value: "",
        id: _id,
        name: _id,
        ...props,
    }
    const input = dum.celm("input", {type: "checkbox", id: props.id, name: props.name, value: props.value});
    const button = dum.celm("label", {class: "ui-checkbox-button", for: props.id}, $icon("fill-tick"));
    const container = dum.celm("div", {class: "ui-checkbox"}, [input, button]);
    if (props.text) {
        const text = dum.celm("label", {class: "ui-checkbox-text", for: props.id}, props.text);
        dum.insert(container, text);
    }
    input.disabled = props.disabled;
    input.checked = props.checked;
    const checked = reactor.ref(props.checked);
    dum.listen(input, "change", e => checked(input.checked));
    return {container, input, checked};
}