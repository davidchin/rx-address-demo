import Address from '../models/address';
import Quote from '../models/quote';
import empty from '../utils/empty';
import { QUOTE_UNAVAILABLE } from '../errors/quote-errors';

export default class QuoteService {
    /**
     * @param {string} host
     */
    constructor(host) {
        this._host = host;
    }

    /**
     * @param {AddressData} addressData
     * @return {Promise<Quote>}
     */
    calculateQuote(addressData) {
        const address = new Address(addressData);

        if (!address.canCalculateQuote()) {
            return Promise.reject(new TypeError('Missing required fields'));
        }

        const options = {
            body: JSON.stringify(address),
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };

        return fetch(`${this._host}/quote`, options)
            .then(response => response.json())
            .then((data) => {
                if (empty(data)) {
                    throw Object.assign(new Error('N/A'), { type: QUOTE_UNAVAILABLE });
                }

                return new Quote(data);
            });
    }
}
