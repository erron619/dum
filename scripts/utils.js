const random = {
    range: function(max, min = 1) {
        return Math.trunc(Math.random() * (max - min + 1) + min);
    },
    choose: function() {
        const items = [...arguments];
        return items[random.range(items.length) - 1];
    }
}

const file = {
    size: function(item) {
        const numberOfBytes = item.size;
        const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const exponent = Math.min(Math.floor(Math.log(numberOfBytes) / Math.log(1024)), units.length - 1);
        const approx = numberOfBytes / 1024 ** exponent;
        return exponent == 0 ? `${numberOfBytes} Bytes` : `${approx.toFixed(0)} ${units[exponent]}`;
    },
}

const number = {
    clamp: function(min, value, max) {
        if (min instanceof Array && value <= min[0]) return min[1];
        else if (value <= min) return min;
        else if (max instanceof Array && value >= max[0]) return max[1];
        else if (value >= max) return max;
        else return value;
    },
    /**
     * @param {number} value 
     * @param {[number]} array 
     * @returns {number}
     */
    closest: (value, array) => array.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev),
}

const string = {
    charBetween: function(text = "", char = " ") {
        return text.toLocaleLowerCase().split(" ").join(char);
    },
    capitalize: function(text = "", all = false) {
        const apply = item => {return item.charAt(0).toLocaleUpperCase() + item.slice(1)};
        if (all == true) {
            let result = [];
            text.split(" ").forEach(item => result.push(apply(item)));
            return result.join(" ");
        }
        else return apply(text);
    },
    camelCase: function(text = "") {
        const array = text.split(" ");
        return [
            array[0].toLocaleLowerCase(), 
            array.slice(1).map(item => item.charAt(0).toLocaleUpperCase() + item.slice(1))
        ].join("");
    },
    lorem: function(words = 1) {
        const result = [];
        const template = "lorem ipsum dolor sit amet consectetur adipiscing elit proin a enim sit amet dui rutrum convallis vestibulum eu semper arcu fusce a dapibus nisi ut tincidunt justo nulla vel quam nec purus facilisis fermentum vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae proin vulputate purus metus eget tincidunt sapien ultricies eu ut sit amet turpis id turpis gravida hendrerit a quis mauris nulla facilisi nam eu facilisis mi nunc dapibus nec odio at pharetra quisque nec velit in tortor feugiat faucibus nec eget enim etiam ac dolor vestibulum finibus sapien vitae ultrices arcu maecenas interdum urna a velit euismod eu facilisis mauris aliquam sed tempus tellus et euismod venenatis enim mi cursus nisi eget facilisis felis arcu a quam".split(" ");
        for (let i = 0; i < words; i ++) {
            result.push(random.choose(...template));
        }
        return result.join(" ") + ".";
    },
    hash: function(pattern = "") {
        let result = "";
        const letters = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*-_+=/?<>";
        for (const i of pattern) {
            if (i == "a") result += random.choose(...letters);
            else if (i == "A") result += random.choose(...(letters.toUpperCase()));
            else if (i == "0") result += random.choose(...numbers);
            else result += random.choose(...symbols);
        }
        return result;
    }
}

const object = {
    swap: value => {
        const result = {}
        Object.keys(value).forEach(i => result[value[i]] = i);
        return result;
    },
    check: value => typeof value == "object" && !Array.isArray(value) && value !== null,
}

const _function = {
    isFunction: cb => cb && typeof cb == "function",
    isAsync: cb => _function.isFunction(cb) && cb.constructor.name === "AsyncFunction",
}

export default {random, file, number, string, object, function: _function}