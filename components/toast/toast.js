import dum from "../../../../tools/frontend/dum";

import $toastItem from "./item";

const toast = dum.celm("div", {id: "ui-toast"});
dum.insert(dum.select("#root"), toast);

const toastStack = [];

let toastTimeout;

function clearToastTimeout() {
    clearTimeout(toastTimeout);
    toastTimeout = null;
}

function setToastTimeout() {
    dum.open.on(toast);
    if (toastTimeout) clearToastTimeout();
    toastTimeout = setTimeout(() => {
        dum.open.off(toast);
        toastTimeout = null;
        setTimeout(() => {
            toastStack.splice(0, toastStack.length);
            dum.empty(toast);
        }, 150);
    }, 5000);
}

function updateToastItemOrder() {
    toastStack.forEach((i, index) => dum.attrs.set(i, "ui-order", index));
}

function removeToastItem(index) {
    const item = toastStack[index];
    dum.open.off(item);
    setTimeout(() => {
        toastStack.splice(index, 1);
        dum.remove(item);
        updateToastItemOrder();
    }, 300);
}

dum.listen(toast, "mouseenter", e => clearToastTimeout());
dum.listen(toast, "mouseleave", e => setToastTimeout());

/**
 * @param {{
 * title: string,
 * desc: string,
 * type: "default"|"danger",
 * controlers: [HTMLElement],
 * }} props 
 */
export default function(props) {
    props = {
        title: "This is a title",
        desc: "This is a description",
        type: "default",
        ...props,
    }
    setToastTimeout(toast);
    // add items ______________________________________________
    const item = $toastItem(props, removeToastItem);
    dum.insert(toast, item);
    toastStack.unshift(item);
    setTimeout(
        () => {
            if (toastStack.length > 3) {
                for (let i = 3; i < toastStack.length; i++) {
                    const removeItem = toastStack[i];
                    toastStack.splice(i, 1);
                    dum.remove(removeItem);
                }
            }
            updateToastItemOrder();
        },
        25,
    )
    return toast;
}