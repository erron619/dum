import dum from "../../../tools/frontend/dum";
import _utils from "./_utils";

let tooltipFadeoutTimer;

/**
 * @param {{
 * text: string,
 * target: HTMLElement|string,
 * }} props 
 */
export default function(props) {
    props = {text: "This is a tooltip!", ...props}
    const root = dum.select("#root");
    let tooltip = dum.select("#ui-tooltip");
    if (!tooltip) {
        tooltip = dum.celm("div", {id: "ui-tooltip"});
        dum.insert(root, tooltip);
    }
    if (typeof props.target == "string") props.target = dum.select(props.target);
    dum.listen(props.target, "mouseover", e => {
        dum.content(tooltip, props.text);
        _utils.boundToScreen(props.target, tooltip);
    });
    dum.listen(props.target, "mouseenter", e => {
        tooltipFadeoutTimer = setTimeout(() => dum.open.on(tooltip), 1000);
    });
    dum.listen(props.target, "mouseleave", e => {
        dum.open.off(tooltip);
        if (tooltipFadeoutTimer) {
            clearTimeout(tooltipFadeoutTimer);
            tooltipFadeoutTimer = null;
        }
    });
    return tooltip;
}