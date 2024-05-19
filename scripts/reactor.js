const activeEffect = [];
const lastActiveEffect = () => activeEffect[activeEffect.length - 1];

const effect = (callback) => {
    const execute = () => {
        activeEffect.push(execute);
        callback();
        activeEffect.pop();
    }
    execute();
}

const ref = value => {
    const subscribes = new Set();
    const setValue = newValue => {
        value = newValue;
        subscribes.forEach(i => i());
    }
    const getValue = () => {
        if (lastActiveEffect()) subscribes.add(lastActiveEffect());
        return value;
    }
    return function(newValue) {
        return arguments.length > 0 ? setValue(newValue) : getValue();
    }
}

export default {ref, effect}