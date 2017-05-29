import Address from '../models/address';

export default class AddressSelector {
    /**
     * @param {Object} state
     * @return {?Address}
     */
    getAddress({ address: { data } }) {
        return data ? new Address(data) : null;
    }

    /**
     * @param {Object} state
     * @return {?Address}
     */
    getDraftAddress({ address: { meta: { draft } } }) {
        return new Address(draft);
    }

    /**
     * @param {Object} state
     * @return {?Error}
     */
    getAddressError({ address: { meta: { error } } }) {
        return error ? Object.assign(new Error(error.message), error) : null;
    }

    /**
     * @param {Object} state
     * @return {boolean}
     */
    isFetchingAddress({ address: { meta: { isFetching } } }) {
        return isFetching === true;
    }

    /**
     * @param {Object} state
     * @return {boolean}
     */
    isUpdatingAddress({ address: { meta: { isUpdating } } }) {
        return isUpdating === true;
    }
}
