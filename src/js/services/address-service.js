import Address from '../models/address';

export default class AddressService {
    /**
     * @param {string} host
     */
    constructor(host) {
        this._host = host;
    }

    /**
     * @param {AddressData} addressData
     * @return {Promise<Address>}
     */
    submitAddress(addressData) {
        const options = {
            body: JSON.stringify(addressData),
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };

        return fetch(`${this._host}/address`, options)
            .then(response => response.json())
            .then(data => new Address(data))
            .catch(() => {
                throw new Error('Unable to save');
            });
    }

    /**
     * @return {Promise<Address>}
     */
    fetchAddress() {
        return fetch(`${this._host}/address`)
            .then(response => response.json())
            .then(data => new Address(data));
    }
}
