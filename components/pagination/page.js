import dum from "../../../../tools/frontend/dum";

export default function(index, action, isCurrent = false) {
    const page = dum.celm("button", {class: "ui-pagination-page"}, index);
    if (isCurrent == true) dum.open.on(page);
    dum.listen(page, "click", e => action(index));
    return page;
}