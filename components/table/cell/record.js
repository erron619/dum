import dum from "../../../../../tools/frontend/dum";

import $icon from "../../icon";
import $tooltip from "../../tooltip";

const prefix = "ui-table-cell-record";

export default function(value, type, options = {}) {
    const cellInside = dum.celm("div", {class: "ui-table-cell-inside"});
    let cellValue;
    if (type == "string") {
        cellValue = dum.celm("div", {class: prefix + "-string"}, value);
        $tooltip({target: cellValue, text: value});
    }
    else if (type == "number") {
        cellValue = dum.celm("div", {class: prefix + "-number"}, value);
        $tooltip({target: cellValue, text: value});
    }
    else if (type == "boolean") {
        cellValue = dum.celm("div", {class: prefix + "-boolean", "ui-value": value}, String(value));
        $tooltip({target: cellValue, text: String(value)});
    }
    else if (type == "enum") {
        cellValue = dum.celm("div", {class: prefix + "-enum", "ui-color": options?.enums?.findIndex(i => i == value) % 5 || 0}, value);
        $tooltip({target: cellValue, text: value});
    }
    else if (type == "date") {
        options = {locale: "en-US", ...options}
        const dateOptions = {}
        if (options.date) {
            if (["2-digit", "numeric"].includes(options.date.year)) dateOptions.year = options.date.year;
            if (["2-digit", "long", "narrow", "short", "numeric"].includes(options.date.month)) dateOptions.month = options.date.month;
            if (["2-digit", "numeric"].includes(options.date.day)) dateOptions.day = options.date.day;
            if (["long", "narrow", "short"].includes(options.date.weekday)) dateOptions.weekday = options.date.weekday;
        }
        if (options.time) {
            if (options.time.hour !== false) dateOptions.hour = "2-digit";
            if (options.time.minute !== false) dateOptions.minute = "2-digit";
            if (options.time.second === true) dateOptions.second = "2-digit";
            dateOptions.hour12 = options.time.hour12 === true ? true : false;
        }
        const _value = new Date(value).toLocaleString(options.locale, dateOptions);
        cellValue = dum.celm("div", {class: prefix + "-date"}, [
            $icon("line-clock"),
            dum.celm("div", {dir: options.locale == "fa-IR" || options.locale == "ar-EG" ? "rtl" : "ltr"}, _value)
        ]);
        $tooltip({target: cellValue, text: _value});
    }
    else if (type == "link") {
        cellValue = dum.celm("a", {href: options.link || "#", class: prefix + "-link"}, value);
        $tooltip({target: cellValue, text: value});
    }
    else if (type == "icon") cellValue = dum.celm("div", {class: prefix + "-icon"}, $icon(value));
    else if (type == "custom") cellValue = value;
    else return;
    dum.insert(cellInside, cellValue);
    return dum.celm("td", {}, cellInside);
}