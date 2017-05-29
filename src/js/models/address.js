import every from '../utils/every';

export default class Address {
    /**
     * @param {Object} [data]
     */
    constructor(data = {}) {
        this.country = data.country;
        this.city = data.city;
        this.phone = data.phone;
    }

    /**
     * @return {boolean}
     */
    canCalculateQuote() {
        const requiredFields = [
            'country',
            'city',
        ];

        return every(this, ...requiredFields);
    }
}
