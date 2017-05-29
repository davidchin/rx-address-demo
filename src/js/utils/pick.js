/**
 * @param {Object} object
 * @param {...string} keys
 * @return {boolean}
 */
export default function pick(object, ...keys) {
    return keys.reduce((result, key) => (
        { ...result, [key]: object[key] }
    ), {});
}
