import Rx from 'rxjs/Rx';

export const CALCULATE_QUOTE = 'CALCULATE_QUOTE';

export default class QuoteActionCreator {
    /**
     * @param {QuoteService} quoteService
     */
    constructor(quoteService) {
        this._quoteService = quoteService;
    }

    /**
     * @param {Address} address
     * @return {Observable<Action>}
     */
    calculateQuote(address) {
        return Rx.Observable.create((observer) => {
            observer.next({
                meta: { isPending: true },
                payload: { address },
                type: CALCULATE_QUOTE,
            });

            this._quoteService.calculateQuote(address)
                .then(quote => observer.next({
                    meta: { isPending: false },
                    payload: { quote },
                    type: CALCULATE_QUOTE,
                }))
                .catch(error => observer.next({
                    error: true,
                    meta: { isPending: false },
                    payload: { error },
                    type: CALCULATE_QUOTE,
                }))
                .then(() => observer.complete());
        });
    }

    /**
     * @param {Object} change
     * @param {string} change.name
     * @param {string} change.value
     * @param {Address} address
     * @return {Observable<Action>}
     */
    calculateQuoteWithChange(change, address) {
        const quotableFields = ['country', 'city'];

        return Rx.Observable.of(change)
            .filter(({ name }) => quotableFields.includes(name))
            .map(({ name, value }) => ({ ...address, [name]: value }))
            .switchMap(newAddress => this.calculateQuote(newAddress));
    }
}
