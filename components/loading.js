import dum from "../../../tools/frontend/dum";

export default function(bgColorClass) {
    return dum.celm("div", {class: "ui-loading"}, [
        dum.celm("div", {class: bgColorClass}),
        dum.celm("div", {class: bgColorClass}),
        dum.celm("div", {class: bgColorClass}),
        dum.celm("div", {class: bgColorClass}),
    ]);
}