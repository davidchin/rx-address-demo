import Rx from 'rxjs/Rx';

export const FETCH_ADDRESS = 'FETCH_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const UPDATE_DRAFT_ADDRESS = 'UPDATE_DRAFT_ADDRESS';

export default class AddressActionCreator {
    /**
     * @param {AddressService} addressService
     */
    constructor(addressService) {
        this._addressService = addressService;
    }

    /**
     * @return {Observable<Action>}
     */
    fetchAddress() {
        return Rx.Observable.create((observer) => {
            observer.next({
                meta: { isPending: true },
                type: FETCH_ADDRESS,
            });

            this._addressService.fetchAddress()
                .then(address => observer.next({
                    meta: { isPending: false },
                    payload: { address },
                    type: FETCH_ADDRESS,
                }))
                .catch(error => observer.next({
                    error: true,
                    meta: { isPending: false },
                    payload: { error },
                    type: FETCH_ADDRESS,
                }))
                .then(() => observer.complete());
        });
    }

    /**
     * @param {Address} address
     * @return {Observable<Action>}
     */
    updateAddress(address) {
        return Rx.Observable.create((observer) => {
            observer.next({
                meta: { isPending: true },
                payload: { address },
                type: UPDATE_ADDRESS,
            });

            this._addressService.submitAddress(address)
                .then(response => observer.next({
                    meta: { isPending: false },
                    payload: { address: response },
                    type: UPDATE_ADDRESS,
                }))
                .catch(error => observer.next({
                    error: true,
                    meta: { isPending: false },
                    payload: { error },
                    type: UPDATE_ADDRESS,
                }))
                .then(() => observer.complete());
        });
    }

    /**
     * @param {Address} address
     * @return {Action}
     */
    updateDraftAddress(address) {
        return {
            payload: { address },
            type: UPDATE_DRAFT_ADDRESS,
        };
    }

    /**
     * @param {Object} change
     * @param {string} change.name
     * @param {string} change.value
     * @param {Address} address
     * @return {Action}
     */
    updateDraftAddressWithChange(change, address) {
        return this.updateDraftAddress({ ...address, [change.name]: change.value });
    }
}
