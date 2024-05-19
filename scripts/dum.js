const appendChildNodes = (element, child) => {
    if (
        child instanceof HTMLElement ||
        child instanceof SVGElement  ||
        child instanceof Comment     ||
        child instanceof DocumentFragment
    ) element.appendChild(child);
    else if (typeof child == "string" || typeof child == "number") element.appendChild(document.createTextNode(child));
    else if (child instanceof Array) child.forEach(i => appendChildNodes(element, i));
}
/**
 * @param {keyof HTMLElementTagNameMap} tag 
 * @param {object} attrs 
 * @param {HTMLElement | string | number | (HTMLElement | string | number)[]} children 
 * @returns {HTMLElement | SVGElement}
 */
const celm = (tag, attrs, children) => {
    const svgTags = ["path", "svg", "use", "g"];
    const element = svgTags.includes(tag) 
    ? document.createElementNS("http://www.w3.org/2000/svg", tag) 
    : document.createElement(tag);
    for (const [key, value] of Object.entries(attrs ?? {})) {
        key.startsWith("on")
        ? element.addEventListener(key.slice(2).toLowerCase(), value)
        : element.setAttribute(key, value);
    }
    if (children !== null) appendChildNodes(element, children);
    return element;
}
/**
 * @param {string} htmlText 
 * @returns {(HTMLElement | SVGElement)[]}
 */
const html = htmlText => {
    const parent = celm("div");
    parent.innerHTML = htmlText;
    const inner = children(parent);
    return inner.length > 1 ? inner : (inner.length == 1 ? inner[0] : null);
}
/**
 * @param {string} selector 
 * @param {boolean} all 
 * @param {HTMLElement} target 
 * @returns {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]}
 */
const select = (selector, all = false, target = document) => {
    if (all == true) return [...target.querySelectorAll(selector)];
    else return target.querySelector(selector);
}
/**
 * @param {*} item 
 * @returns {boolean}
 */
const check = item => item instanceof HTMLElement || item instanceof SVGElement;
/**
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
 */
const empty = target => {
    const apply = i => i.innerHTML = "";
    if (target instanceof Array) target.forEach(apply);
    else apply(target);
}
/**
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
 */
const remove = target => {
    const apply = i => i.remove();
    if (target instanceof Array) target.forEach(apply);
    else apply(target);
}
/**
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} elements 
 * @param {"start" | "end"} at 
 */
const insert = (target, elements, at = "end") => {
    const apply = (parent, item) => {
        if (!check(item)) return;
        else if (at == "start") parent.prepend(item);
        else if (at == "end") parent.append(item);
    }
    if (target instanceof Array) {
        if (elements instanceof Array) target.forEach(i => elements.forEach(j => apply(i, j)));
        else target.forEach(i => apply(i, elements));
    }
    else {
        if (elements instanceof Array) elements.forEach(i => apply(target, i));
        else apply(target, elements);
    }
}
/**
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} elements 
 * @param {"after" | "before"} place
 */
const adjacent = (target, elements, place = "after") => {
    const apply = (parent, item) => {
        if (!check(item)) return;
        else if (place == "after") parent.after(item);
        else if (place == "before") parent.before(item);
    }
    if (target instanceof Array) {
        if (elements instanceof Array) target.forEach(i => elements.forEach(j => apply(i, j)));
        else target.forEach(i => apply(i, elements));
    }
    else {
        if (elements instanceof Array) elements.forEach(i => apply(target, i));
        else apply(target, elements);
    }
}
/**
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} elements 
 */
const replace = (target, elements) => {
    empty(target);
    insert(target, elements);
}
/**
 * @param {HTMLElement | SVGElement} target 
 * @param {number} index 
 * @returns {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]}
 */
const children = (target, index) => {
    const array = [...target.children];
    if (typeof index == "number") {
        if (index < 0) index = Math.max(0, array.length + index);
        return array[index];
    }
    else return array;
}
/**
 * @param {Array} array 
 * @param {Function} componentCallback correct style example: i => myComponent(i.a, i.b, i.c, ...)
 * @returns {[HTMLElement|SVGElement]}
 */
const _for = (array, callback) => {
    const result = [];
    for (const i of array) result.push(callback(i));
    return result;
}
/**
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
 * @param {string | number | boolean} value 
 */
const content = (target, value) => {
    const apply = i => i.textContent = value;
    if (target instanceof Array) target.forEach(apply);
    else apply(target);
}
/**
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
 * @param {string | [string]} events 
 * @param {Function} callback 
 */
const listen = (target, events, callback) => {
    if (typeof events == "string") events = events.split(" ");
    const apply = i => {
        if (check(i)) events.forEach(event => i.addEventListener(event, callback));
    }
    if (target instanceof Array) target.forEach(apply);
    else apply(target);
}
/**
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
 * @param {string | [string]} events 
 * @param {Function} callback 
 */
const unlisten = (target, events, callback) => {
    if (typeof events == "string") events = events.split(" ");
    const apply = i => check(i) ? events.forEach(event => i.removeEventListener(event, callback)) : null;
    if (target instanceof Array) target.forEach(apply);
    else apply(target);
}
/**
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
 * @param {object} properties 
 */
const css = (target, properties) => {
    const apply = i => {
        for (const [prop, value] of Object.entries(properties)) {
            if (prop == "x" || prop == "y") i.style.transform = `translate${prop.toUpperCase()}(${value})`;
            else if (
                prop == "scale" || 
                prop == "scaleX" || 
                prop == "scaleY" ||
                prop == "rotate" || 
                prop == "rotateX" || 
                prop == "rotateY"
            ) i.style.transform = `${prop}(${value})`;
            else i.style.setProperty(prop, value);
        }
    }
    if (target instanceof Array) target.forEach(apply);
    else apply(target);
}
/**
 * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
 */
const clearCss = target => _attrs.remove(target, "style");
const _attrs = {
    set: (target, name, value) => {
        const apply = i => i.setAttribute(name, value);
        if (target instanceof Array) target.forEach(apply);
        else apply(target);
    },
    remove: (target, name) => {
        const apply = i => {
            if (name instanceof Array) name.forEach(j => i.removeAttribute(j));
            else i.removeAttribute(name);
        }
        if (target instanceof Array) target.forEach(apply);
        else apply(target);
    },
    get: (target, name) => target.getAttribute(name),
    /**
     * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
     * @param {string} name 
     * @returns {boolean}
     */
    has: (target, name) => {
        if (target instanceof Array) return target.every(i => i.hasAttribute(name));
        else return target.hasAttribute(name);
    },
}
const _open = {
    check: target => _attrs.has(target, "open"),
    on: target => {
        const apply = i => _attrs.set(target, "open", true);
        if (target instanceof Array) target.forEach(apply);
        else apply(target);
    },
    off: target => {
        const apply = i => _attrs.remove(target, "open");
        if (target instanceof Array) target.forEach(apply);
        else apply(target);
    },
    /**
     * @param {HTMLElement | SVGElement | (HTMLElement | SVGElement)[]} target 
     * @param {Function} callback callback example: (elm, isOpen) => {...}
     */
    toggle: (target, callback) => {
        const apply = i => {
            const isOpen = _open.check(i);
            if (isOpen) _open.off(i);
            else _open.on(i);
            if (callback) callback(i, isOpen);
        }
        if (target instanceof Array) target.forEach(apply);
        else apply(target);
    },
    radio: (onList, offList) => {
        _open.off(offList);
        _open.on(onList);
    }
}
const _class = {
    add: (target, value) => {
        if (typeof value == "string") value = value.split(" ");
        const apply = i => value.forEach(j => i.classList.add(j));
        if (target instanceof Array) target.forEach(apply);
        else apply(target);
    },
    remove: (target, value) => {
        if (typeof value == "string") value = value.split(" ");
        const apply = i => value.forEach(j => i.classList.remove(j));
        if (target instanceof Array) target.forEach(apply);
        else apply(target);
    },
    set: (target, value) => {
        const apply = i => i.className = value;
        if (target instanceof Array) target.forEach(apply);
        else apply(target);
    },
    has: (target, value) => {
        if (typeof value == "string") value = value.split(" ");
        return value.every(i => target.classList.contains(i));
    },
    toggle: (target, value) => {
        if (typeof value == "string") value = value.split(" ");
        const apply = i => value.forEach(j => i.classList.toggle(j));
        if (target instanceof Array) target.forEach(apply);
        else apply(target);
    }
}
/**
 * @param {HTMLElement | SVGElement} target
 * @param {"client" | "offset" | "scroll" | "natural"} type 
 * @returns {{w: number, h: number}}
 */
const dimension = (target, type = "client") => ({
    w: target[`${type}Width`], 
    h: target[`${type}Height`],
});
/**
 * @param {boolean|undefined} state 
 */
const darkMode = (state) => {
    if (state == false) _class.remove(document.body, "dark");
    else if (state == true) _class.add(document.body, "dark");
    else _class.toggle(document.body, "dark");
}
export default {
    celm, html,
    select, check, empty, remove, insert, replace, adjacent, children, content, for: _for,
    listen, unlisten,
    css, clearCss,
    attrs: _attrs, open: _open, class: _class,
    dimension,
    darkMode,
}