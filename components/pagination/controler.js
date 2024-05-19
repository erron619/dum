import dum from "../../../../tools/frontend/dum";

import $icon from "../icon";

export default function(goto, current, action) {
    const button = dum.celm("button", {class: "ui-pagination-controler"});
    if (goto == "next") {
        dum.content(button, "Next")
        dum.insert(button, $icon("line-arrow-right"), "end");
        dum.listen(button, "click", e => action(current + 1));
    }
    if (goto == "prev") {
        dum.content(button, "Prev")
        dum.insert(button, $icon("line-arrow-left"), "start");
        dum.listen(button, "click", e => action(current - 1));
    }
    return button;
}