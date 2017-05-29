import { CALCULATE_QUOTE } from '../actions/quote-action-creator';
import serialize from '../utils/serialize';

const DEFAULT_STATE = {
    data: {}, meta: {},
};

/**
 * @param {Object} [state]
 * @param {Action} [action]
 * @return {Object}
 */
export default function quoteReducer(state = DEFAULT_STATE, action = {}) {
    if (action.type === CALCULATE_QUOTE) {
        return handleCalculateQuote(state, action);
    }

    return state;
}

/**
 * @param {Object} state
 * @param {Action} action
 * @return {Object}
 */
function handleCalculateQuote(state, action) {
    if (action.meta.isPending) {
        return {
            ...state,
            meta: { isCalculating: true },
        };
    }

    if (action.error) {
        return {
            ...state,
            data: {},
            meta: { error: serialize(action.payload.error), isCalculating: false },
        };
    }

    return {
        ...state,
        data: serialize(action.payload.quote),
        meta: { isCalculating: false },
    };
}
