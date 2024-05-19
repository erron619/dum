import dum from "../../../tools/frontend/dum";
import reactor from "../../../tools/frontend/reactor";

const screen = dum.celm("div", {id: "ui-frontScreen"});
dum.insert(dum.select("#root"), screen);

const stack = [];
const lastItem = reactor.ref();

reactor.effect(() => {
    dum.empty(screen);
    if (lastItem()) dum.insert(screen, lastItem());
    else dum.open.off(screen);
});

function getStack(index) {
    if (typeof index == "number") return stack[index];
    else if (index == "last") return stack[stack.length - 1];
    else return stack;
}

function addItem(item) {
    dum.open.on(screen);
    stack.push(item);
    lastItem(item);
}

/**
 * @param {"first"|"last"|"all"|number} index 
 */
function removeItem(index) {
    if (typeof index == "number") stack.splice(index, 1);
    else if (index == "last") stack.pop();
    else if (index == "first") stack.shift();
    else if (index == "all") stack.splice(0, stack.length);
    else if (dum.check(index)) return removeItem(stack.findIndex(i => i === index));
    else return;
    lastItem(getStack("last"));
}

export default {el: screen, get: getStack, add: addItem, remove: removeItem}