import dum from "../../../tools/frontend/dum";

import $spinner from "./spinner";

export default function() {
    return dum.celm("div", {class: "ui-loadingScreen"}, $spinner());
}