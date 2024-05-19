import dum from "../../../../../tools/frontend/dum";

export default function(sidebar) {
    dum.css(sidebar, {width: localStorage.getItem("ui-panel-sidebar-width") + "px"});
    const resizer = dum.celm("button", {class: "ui-panel-sidebar-resizer"});
    const root = dum.select("#root");
    let resizerDragging = false;
    dum.listen(resizer, "mousedown", e => {
        resizerDragging = true;
        dum.css(sidebar, {width: dum.dimension(sidebar).w + "px"});
    });
    dum.listen(root, "mousemove", e => {
        if (!resizerDragging) return;
        const {left} = sidebar.getBoundingClientRect();
        dum.css(sidebar, {width: e.screenX - left + "px"});
    });
    dum.listen(root, "mouseup", e => {
        if (!resizerDragging) return;
        resizerDragging = false;
        const sidebarWidth = dum.dimension(sidebar).w;
        dum.css(sidebar, {width: sidebarWidth + "px"});
        localStorage.setItem("ui-panel-sidebar-width", sidebarWidth);
    });
    return resizer;
}