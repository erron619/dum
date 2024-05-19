import dum from "../../../../tools/frontend/dum";
import utils from "../../../../tools/frontend/utils";

import $selectCell from "./cell/select";
import $recordCell from "./cell/record";
import $moreCell from "./cell/more";

export default function(data, ref) {
    const meta = ref.meta();
    const cells = [$selectCell(false)];
    meta.cellsPlacementList.forEach(j => cells.push($recordCell(
        data[j], 
        meta.props.cols[j].type, 
        meta.props.cols[j].options
    )));
    if (meta.props.more && (utils.function.isFunction(meta.props.more.onclick) || utils.function.isFunction(meta.props.more.oncreate))) {
        cells.push($moreCell(meta.props.more, data));
    }
    return dum.celm("tr", {}, cells);
}