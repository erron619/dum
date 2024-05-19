import dum from "../../../tools/frontend/dum";
import utils from "../../../tools/frontend/utils"

const defaultID = compName => `ui-${compName}-${utils.string.hash("00000")}`;

function boundToScreen(target, item) {
    const pagePad = 32;
    const pageDim = dum.dimension(root, "client");
    const targetPos = target.getBoundingClientRect();
    const itemDim = dum.dimension(item, "client");
    const itemPos = {x: targetPos.left, y: targetPos.bottom}
    if (targetPos.bottom + itemDim.w >= pageDim.h - pagePad) itemPos.y -= itemDim.h;
    if (targetPos.left + itemDim.w >= pageDim.w - pagePad) itemPos.x -= (targetPos.left + itemDim.w) - (pageDim.w - pagePad * 1.5);
    dum.css(item, {top: itemPos.y + "px", left: itemPos.x + "px"});
}

export default {defaultID, boundToScreen}