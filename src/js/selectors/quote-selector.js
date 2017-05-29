import Quote from '../models/quote';
import { QUOTE_UNAVAILABLE } from '../errors/quote-errors';

export default class QuoteSelector {
    /**
     * @param {Object} state
     * @return {?Quote}
     */
    getQuote({ quote: { data } }) {
        return data ? new Quote(data) : null;
    }

    /**
     * @param {Object} state
     * @return {?Quote}
     */
    getQuoteError({ quote: { meta: { error } } }) {
        return error ? Object.assign(new Error(error.message), error) : null;
    }

    /**
     * @param {Object} state
     * @return {?Error}
     */
    getQuoteUnavailableError(state) {
        const error = this.getQuoteError(state);

        return error && error.type === QUOTE_UNAVAILABLE ? error : null;
    }

    /**
     * @param {Object} state
     * @return {boolean}
     */
    isCalculatingQuote({ quote: { meta: { isCalculating } } }) {
        return isCalculating === true;
    }
}
