import template from './address-form-view.html';
import View from './view.js';

export default class AddressFormView extends View {
    /**
     * @param {HTMLElement} parentElement
     */
    constructor(parentElement) {
        super(parentElement);

        this.element.innerHTML = template;
        this.form = this.element.querySelector('[data-id=form]');
        this.countryField = this.element.querySelector('[data-id=country]');
        this.cityField = this.element.querySelector('[data-id=city]');
        this.phoneField = this.element.querySelector('[data-id=phone]');
        this.addressElement = this.element.querySelector('[data-id=address]');
        this.errorElement = this.element.querySelector('[data-id=error]');
        this.quoteElement = this.element.querySelector('[data-id=quote]');
        this.loadingIndicator = this.element.querySelector('[data-id=loadingIndicator]');
    }

    /**
     * @param {Object} state
     * @return {void}
     */
    render(state = {}) {
        this._renderError(state.error);
        this._renderQuote(state.quote);
        this._renderAddress(state.address);
        this._renderAddressForm(state.draftAddress, state.isFetching);
        this._renderLoadingIndicator(state.isUpdating || state.isFetching);
    }

    /**
     * @private
     * @param {Address} address
     * @param {boolean} isFetching
     * @return {void}
     */
    _renderAddressForm(address, isFetching) {
        if (isFetching) {
            this.form.style.display = 'none';
        } else {
            this.form.style.display = '';
        }

        if (address) {
            this.countryField.value = address.country || '';
            this.cityField.value = address.city || '';
            this.phoneField.value = address.phone || '';
        } else {
            this.countryField.value = '';
            this.cityField.value = '';
            this.phoneField.value = '';
        }
    }

    /**
     * @private
     * @param {Address} address
     * @return {void}
     */
    _renderAddress(address) {
        if (address) {
            this.addressElement.innerText = `${address.country || ''} ${address.city || ''} ${address.phone || ''}`;
            this.addressElement.style.display = '';
        } else {
            this.addressElement.innerText = '';
            this.addressElement.style.display = 'none';
        }
    }

    /**
     * @private
     * @param {Error} error
     * @return {void}
     */
    _renderError(error) {
        if (error) {
            this.errorElement.innerText = error.message;
            this.errorElement.style.display = '';
            this._renderQuote(null);
        } else {
            this.errorElement.innerText = '';
            this.errorElement.style.display = 'none';
        }
    }

    /**
     * @param {Quote} quote
     * @return {void}
     */
    _renderQuote(quote) {
        if (quote && quote.isAvailable()) {
            this.quoteElement.innerText = `${quote.name} ${quote.price}`;
            this.quoteElement.style.display = '';
            this._renderError(null);
        } else {
            this.quoteElement.innerText = '';
            this.quoteElement.style.display = 'none';
        }
    }

    /**
     * @private
     * @param {boolean} isVisible
     * @return {void}
     */
    _renderLoadingIndicator(isVisible) {
        this.loadingIndicator.style.display = isVisible ? '' : 'none';
    }
}
