export default function(query) {
    const result = [];
    const entries = Object.entries(query);
    for (const [k, v] of entries) {
        if (v instanceof Array) v.forEach(i => result.push(`${k}=${i}`))
        else result.push(`${k}=${v}`);
    }
    return "?" + result.join("&");
}