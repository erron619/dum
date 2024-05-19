import dum from "../../../../tools/frontend/dum";

import $icon from "../icon";

export default function(icon, name) {
    return dum.celm("div", {class: "ui-panel-body-header"}, [$icon(icon), name]);
}