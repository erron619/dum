import dum from "../../../../tools/frontend/dum";

import $icon from "../icon";

export default function() {
    return dum.celm("div", {class: "ui-pagination-dots"}, $icon("fill-dots-hor"));
}