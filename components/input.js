import dum from "../../../tools/frontend/dum";
import reactor from "../../../tools/frontend/reactor";
import _utils from "./_utils";

import $icon from "./icon";

/**
 * @param {{
 * type: "text"|"email"|"number"|"password",
 * id: string,
 * name: string,
 * value: *,
 * icon: string,
 * placeholder: string,
 * eye: boolean,
 * disabled: boolean,
 * counter: boolean|number,
 * }} props 
 */
export default function(props) {
    const _id = _utils.defaultID("input");
    props = {
        type: "text",
        id: _id,
        name: _id,
        eye: true,
        disabled: false,
        counter: false,
        value: null,
        placeholder: "",
        ...props,
    }
    const input = dum.celm(
        "input",
        {
            type: props.type,
            id: props.id,
            name: props.name,
            placeholder: props.placeholder,
        },
    );
    const value = reactor.ref(props.value);
    input.value = props.value;
    dum.listen(input, "input", e => value(input.value));
    const container = dum.celm("div", {class: "ui-input", "ui-invalid": false}, input);
    if (props.icon) {
        const icon = dum.celm("div", {class: "ui-input-icon"}, $icon(props.icon));
        dum.insert(container, icon, "start");
    }
    if ((props.type == "text" || props.type == "password") && (props.counter == true || props.counter > 0)) {
        const counterLimit = typeof props.counter == "number" ? props.counter : 0;
        const counter = dum.celm("div", {class: "ui-input-counter"}, counterLimit);
        reactor.effect(() => {
            const valueLength = value()?.length || 0;
            if (counterLimit > 0) {
                dum.content(counter, counterLimit - valueLength);
                if (counterLimit - valueLength < 0) dum.open.on(counter);
                else dum.open.off(counter);
            }
            else dum.content(counter, valueLength);
        });
        dum.insert(container, counter);
    }
    if (props.type == "password" && props.eye == true) {
        const eye = dum.celm("button", {class: "ui-input-eye"}, [$icon("line-eye-open"), $icon("line-eye-close")]);
        dum.listen(eye, "click", e => dum.open.toggle(eye, (elm, isOpen) => {
            if (isOpen) dum.attrs.set(input, "type", "password");
            else dum.attrs.set(input, "type", "text");
        }));
        dum.insert(container, eye);
    }
    return {input, container, value}
}