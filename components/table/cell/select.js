import dum from "../../../../../tools/frontend/dum";
import _utils from "../../_utils";

import $checkbox from "../../checkbox";

export default function(isSelectAll) {
    const id = _utils.defaultID("ui-table-cell-select");
    const checkbox = $checkbox({id: id, name: id});
    const cell = dum.celm(
        isSelectAll == true ? "th" : "td",
        {class: "ui-table-cell-select"},
        dum.celm("div", {class: "ui-table-cell-inside"}, checkbox.container)
    );
    return cell;
}