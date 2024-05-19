import dum from "../../../tools/frontend/dum";

/**
 * @param {string} name 
 * @returns {SVGElement}
 */
export default function(name) {
    return dum.html(`<svg style="flex-shrink: 0; aspect-ratio: 1/1;"><use xlink:href="../admin/images/icons.svg#${name}"></use></svg>`);
}