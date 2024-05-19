import dum from "../../../tools/frontend/dum";

import $icon from "./icon";

export default function(clickEvent) {
    const button = dum.celm("button", {class: "ui-closer"}, $icon("fill-close"));
    dum.listen(button, "click", clickEvent);
    return button;
}