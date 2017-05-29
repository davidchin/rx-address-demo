import addressReducer from './address-reducer';
import quoteReducer from './quote-reducer';

/**
 * @param {Object} state
 * @param {Action} action
 * @return {Object}
 */
export default function appReducer(state, action) {
    return {
        address: addressReducer(state.address, action),
        quote: quoteReducer(state.quote, action),
    };
}
