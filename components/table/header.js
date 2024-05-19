import dum from "../../../../tools/frontend/dum";
import utils from "../../../../tools/frontend/utils";

import $selectCell from "./cell/select";
import $headerCell from "./cell/header";

export default function(cols, ref) {
    const cellsPlacementList = [];
    const headerCells = [$selectCell(true)];
    for (const [k, v] of Object.entries(cols)) {
        cellsPlacementList.push(k);
        headerCells.push($headerCell(v, ref));
    }
    if (ref.meta().props.more && (utils.function.isFunction(ref.meta().props.more.onclick) || utils.function.isFunction(ref.meta().props.more.oncreate))) {
        headerCells.push(dum.celm("th", {class: "ui-table-cell-more"}));
    }
    const header = dum.celm("thead", {}, dum.celm("tr", {}, headerCells));
    return {cellsPlacementList, header}
}