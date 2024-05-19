import dum from "../../../../../tools/frontend/dum";

import $icon from "../../icon";

export default function(icon, name, cb) {
    const button = dum.celm("button", {class: "ui-panel-sidebar-button"}, [$icon(icon), dum.celm("div", {}, name)]);
    dum.listen(button, "click", cb);
    return button;
}