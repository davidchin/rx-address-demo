/**
 * @param {Object} object
 * @return {boolean}
 */
export default function empty(object) {
    return !object || !Object.keys(object).length;
}
