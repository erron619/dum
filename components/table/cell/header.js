import dum from "../../../../../tools/frontend/dum";

import $tooltip from "../../tooltip";

function setCellWidth(cell, value) {
    dum.css(cell, {width: value + "px"});
    dum.attrs.set(cell, "ui-width", value);
}

function calcTableWidth(headersList) {
    return headersList.reduce((prev, curr) => prev += Number(dum.attrs.get(curr, "ui-width")), 0);
}

function setTableWidth(table, headersList) {
    const tableWidth = calcTableWidth(headersList);
    dum.css(table, {width: tableWidth + "px"});
    return tableWidth;
}

function getLastCell(headersList) {
    const susCell = headersList[headersList.length - 1];
    return dum.class.has(susCell, "ui-table-cell-more") ? headersList[headersList.length - 2] : susCell;
}

function fixTableWidth(container, table, headersList) {
    const tableWidth = calcTableWidth(headersList);
    const containerWidth = dum.dimension(container).w;
    const diff = containerWidth - tableWidth;
    if (diff > 0) {
        const lastCell = getLastCell(headersList);
        const lastCellWidth = dum.dimension(lastCell).w;
        setCellWidth(lastCell, lastCellWidth + diff);
    }
    dum.css(table, {width: Math.max(containerWidth, tableWidth) + "px"});
}

const prefix = "ui-table-cell-header";

export default function(data, ref) {
    // controls _______________________________________________
    // CONTROLS ARE REMOVED! adding it next update
    const resizer = dum.celm("button", {class: prefix + "-resizer"});
    const controls = dum.celm("div", {class: prefix + "-controls"}, [resizer]);
    // name & tooltip _________________________________________
    const text = dum.celm("div", {class: prefix + "-text"}, data.text);
    if (data.tooltip && typeof data.tooltip == "string") $tooltip({target: text, text: data.tooltip});
    // resizablity ____________________________________________
    const container = ref.container();
    const table = dum.children(container, 0);
    const root = dum.select("#root");
    let resizerDragging = false;
    let headersList = [];
    dum.listen(resizer, "mousedown", e => {
        resizerDragging = true;
        headersList = dum.select("th", true, table);
        headersList.forEach(i => setCellWidth(i, dum.dimension(i).w));
    });
    dum.listen(root, "mousemove", e => {
        if (!resizerDragging) return;
        const {left} = cell.getBoundingClientRect();
        const diff = Math.max(192, e.screenX - left);
        setCellWidth(cell, diff);
        setTableWidth(table, headersList);
    });
    dum.listen(root, "mouseup", e => {
        if (!resizerDragging) return;
        resizerDragging = false;
        setCellWidth(cell, dum.dimension(cell).w);
        fixTableWidth(container, table, headersList);
    });
    // container ______________________________________________
    const cell = dum.celm("th", {}, [
        dum.celm("div", {class: "ui-table-cell-inside"}, [text, controls])
    ]);
    return cell;
}