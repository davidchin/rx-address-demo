import pick from './pick';

/**
 * @param {Object} object
 * @return {object}
 */
export default function serialize(object) {
    if (object instanceof Error) {
        return serializeError(object);
    }

    return JSON.parse(JSON.stringify(object));
}

function serializeError(error) {
    return pick(error, 'message', 'stack', 'name', 'type');
}
