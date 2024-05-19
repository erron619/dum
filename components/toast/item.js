import dum from "../../../../tools/frontend/dum";

import $closer from "../closer";

export default function(props, removeItemCallback) {
    const closer = $closer(e => removeItemCallback(Number(dum.attrs.get(item, "ui-order"))));
    const item = dum.celm("div", {class: "ui-toast-item", "ui-order": -1, open: true}, [
        dum.celm("div", {class: "ui-toast-item-header"}, [
            dum.celm("div", {class: "ui-toast-item-title"}, props.title),
            closer
        ]),
        dum.celm("div", {class: "ui-toast-item-desc"}, props.desc),
        props.controlers ? dum.celm("div", {class: "ui-toast-item-controlers"}, props.controlers) : null
    ]);
    return item;
}