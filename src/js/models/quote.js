export default class Quote {
    /**
     * @param {Object} [data]
     */
    constructor(data = {}) {
        this.price = data.price;
        this.name = data.name;
    }

    /**
     * @return {boolean}
     */
    isAvailable() {
        return this.price >= 0;
    }

    /**
     * @return {boolean}
     */
    isFree() {
        return this.price === 0;
    }
}
