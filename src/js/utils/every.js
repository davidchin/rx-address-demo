/**
 * @param {Object} object
 * @param {...string} keys
 * @return {boolean}
 */
export default function every(object, ...keys) {
    if (keys.length === 0) {
        return Object.keys(object).every(value => value);
    }

    return keys.every(key => object[key]);
}
