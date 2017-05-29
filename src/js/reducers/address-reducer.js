import { FETCH_ADDRESS, UPDATE_ADDRESS, UPDATE_DRAFT_ADDRESS } from '../actions/address-action-creator';
import serialize from '../utils/serialize';

const DEFAULT_STATE = {
    data: {}, meta: {},
};

/**
 * @param {Object} [state]
 * @param {Action} [action]
 * @return {Object}
 */
export default function addressReducer(state = DEFAULT_STATE, action = {}) {
    if (action.type === FETCH_ADDRESS) {
        return handleFetchAddress(state, action);
    }

    if (action.type === UPDATE_ADDRESS) {
        return handleUpdateAddress(state, action);
    }

    if (action.type === UPDATE_DRAFT_ADDRESS) {
        return handleUpdateDraftAddress(state, action);
    }

    return state;
}

/**
 * @param {Object} state
 * @param {Action} action
 * @return {Object}
 */
function handleFetchAddress(state, action) {
    if (action.meta.isPending) {
        return {
            ...state,
            meta: { ...state.meta, error: null, isFetching: true },
        };
    }

    if (action.error) {
        return {
            ...state,
            meta: { ...state.meta, error: serialize(action.payload.error), isFetching: false },
        };
    }

    return {
        ...state,
        meta: { ...state.meta, error: null, isFetching: false },
        data: serialize(action.payload.address),
    };
}

/**
 * @param {Object} state
 * @param {Action} action
 * @return {Object}
 */
function handleUpdateAddress(state, action) {
    if (action.meta.isPending) {
        return {
            ...state,
            meta: { ...state.meta, error: null, isUpdating: true },
        };
    }

    if (action.error) {
        return {
            ...state,
            meta: { ...state.meta, error: serialize(action.payload.error), isUpdating: false },
        };
    }

    return {
        ...state,
        meta: { ...state.meta, error: null, isUpdating: false },
        data: serialize(action.payload.address),
    };
}

/**
 * @param {Object} state
 * @param {Action} action
 * @return {Object}
 */
function handleUpdateDraftAddress(state, action) {
    return {
        ...state,
        meta: { ...state.meta, error: null, draft: serialize(action.payload.address) },
    };
}
