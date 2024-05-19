import dum from "./dum";

/**
 * @param {HTMLElement|SVGElement|[HTMLElement|SVGElement]} target 
 * @param {object} from 
 * @param {object} to 
 * @param {{
 * duration: number,
 * ease: string,
 * delay: number,
 * before: Function,
 * after: Function,
 * }} options 
 */
export default function(target, from = {}, to = {}, options = {}) {
    options = {
        duration: 150,
        ease: "cubic-bezier(0, 0, 0.2, 1)",
        delay: 0,
        ...options
    }
    const safeDelay = 25;
    dum.css(target, {
        ...from,
        "transition-property": "all",
        "transition-duration": `${options.duration}ms`,
        "transition-timing-function": options.ease,
        "transition-delay": `${options.delay}ms`,
    });
    if (options.before && typeof options.before == "function") setTimeout(options.before, safeDelay + options.delay);
    setTimeout(
        () => {
            dum.css(target, to);
            if (options.after && typeof options.after == "function") setTimeout(options.after, options.duration + options.delay + safeDelay);
        }, 
        safeDelay
    );
}