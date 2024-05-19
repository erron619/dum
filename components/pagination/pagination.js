import dum from "../../../../tools/frontend/dum";

import $page from "./page";
import $dots from "./dots";
import $controler from "./controler";

/**
 * @param {{
 * max: number,
 * current: number,
 * action: Function,
 * }} props 
 */
export default function(props) {
    props = {
        max: 1,
        current: 1,
        action: () => {},
        ...props
    }
    // add pages ______________________________________________
    const children = [$page(props.current, props.action, true)];
    if (props.current == 1) {
        for (let i = 1; i <= 2; i++) {
            if (props.current + i <= props.max) children.push($page(props.current + i, props.action));
        }
    }
    else if (props.current == props.max) {
        for (let i = 1; i <= 2; i++) {
            if (props.max - i >= 1) children.unshift($page(props.max - i, props.action));
        }
    }
    else {
        children.unshift($page(props.current - 1, props.action));
        children.push($page(props.current + 1, props.action));
    }
    // add dots _______________________________________________
    const firstDots = [$page(1, props.action), $dots()];
    const lastDots = [$dots(), $page(props.max, props.action)];
    if (props.max > 4) {
        if (props.current <= 3) children.push(...lastDots);
        else if (props.current >= props.max - 3) children.unshift(...firstDots);
        else {
            children.unshift(...firstDots);
            children.push(...lastDots);
        }
    }
    else if (props.max == 4) {
        if (props.current == 1 || props.current == 2) children.push(...lastDots);
        if (props.current == 3 || props.current == 4) children.unshift(...firstDots);
    }
    // add controlers _________________________________________
    if (props.max > 1 && props.current != 1) children.unshift($controler("prev", props.current, props.action));
    if (props.max > 1 && props.current != props.max) children.push($controler("next", props.current, props.action));
    // assemble _______________________________________________
    const pagination = dum.celm("div", {class: "ui-pagination"}, children);
    return pagination;
}