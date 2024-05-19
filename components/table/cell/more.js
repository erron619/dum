import dum from "../../../../../tools/frontend/dum";
import utils from "../../../../../tools/frontend/utils";

import $icon from "../../icon";

export default function(event, data) {
    const button = dum.celm("button", {}, $icon("line-more-circle"));
    if (utils.function.isFunction(event.onclick)) dum.listen(button, "click", e => event.onclick({button, data}));
    if (utils.function.isFunction(event.oncreate)) event.oncreate({button, data});
    return dum.celm("td", {class: "ui-table-cell-more"}, [
        dum.celm("div", {class: "ui-table-cell-inside"}, button)
    ]);
}