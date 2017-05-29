import AddressForm from './components/address-form';
import AddressFormView from './components/address-form-view';
import AddressActionCreator from './actions/address-action-creator';
import AddressSelector from './selectors/address-selector';
import AddressService from './services/address-service';
import appReducer from './reducers/app-reducer';
import Store from './services/store';
import QuoteActionCreator from './actions/quote-action-creator';
import QuoteSelector from './selectors/quote-selector';
import QuoteService from './services/quote-service';

/**
 * Initialize the application
 * @return {void}
 */
function main() {
    const host = 'http://localhost:3000';
    const initialState = {};

    const addressForm = new AddressForm(
        new AddressFormView(document.querySelector('[data-id=addressForm]')),
        new Store(appReducer, initialState),
        new AddressActionCreator(new AddressService(host)),
        new QuoteActionCreator(new QuoteService(host)),
        new AddressSelector(),
        new QuoteSelector()
    );

    addressForm.mount();
}

document.addEventListener('DOMContentLoaded', main);
