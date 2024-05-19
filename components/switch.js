import dum from "../../../tools/frontend/dum";
import reactor from "../../../tools/frontend/reactor";
import _utils from "./_utils";

/**
 * @param {{
 * checked: boolean,
 * disabled: boolean,
 * text: string,
 * name: string,
 * id: string,
 * }} props 
 */
export default function(props) {
    const _id = _utils.defaultID("switch");
    props = {
        checked: false,
        disabled: false,
        id: _id,
        name: _id,
        ...props,
    }
    const input = dum.celm("input", {type: "checkbox", id: props.id, name: props.id});
    const button = dum.celm("label", {class: "ui-switch-button", for: props.id}, dum.celm("div"));
    const container = dum.celm("div", {class: "ui-switch"}, [input, button]);
    if (props.text) {
        const text = dum.celm("label", {class: "ui-switch-text", for: props.id}, props.text);
        dum.insert(container, text);
    }
    input.disabled = props.disabled;
    input.checked = props.checked;
    const value = reactor.ref(props.checked);
    dum.listen(input, "change", e => value(input.checked));
    return {container, input, value}
}