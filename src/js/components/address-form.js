import Rx from 'rxjs/Rx';
import Component from './component';

export default class AddressForm extends Component {
    /**
     * @param {AddressFormView} view
     * @param {Store} store
     * @param {AddressActionCreator} addressActionCreator
     * @param {QuoteActionCreator} quoteActionCreator
     * @param {AddressSelector} addressSelector
     * @param {QuoteSelector} quoteSelector
     */
    constructor(
        view,
        store,
        addressActionCreator,
        quoteActionCreator,
        addressSelector,
        quoteSelector
    ) {
        super(view, store);

        this._addressActionCreator = addressActionCreator;
        this._quoteActionCreator = quoteActionCreator;
        this._addressSelector = addressSelector;
        this._quoteSelector = quoteSelector;
    }

    /**
     * @return {void}
     */
    mount() {
        super.mount();

        this._fetchData();
        this._subscribeFieldChange();
        this._subscribeFormSubmit();
        this._subscribeState();
    }

    /**
     * @private
     * @return {void}
     */
    _fetchData() {
        Rx.Observable.concat(
            this._addressActionCreator.fetchAddress(),
            Rx.Observable.create((observer) => {
                const state = this._store.getCurrentState();
                const address = this._addressSelector.getAddress(state);

                Rx.Observable.of(this._addressActionCreator.updateDraftAddress(address))
                    .concat(this._quoteActionCreator.calculateQuote(address))
                    .subscribe(observer);
            })
        )
            .takeUntil(this._unmount$)
            .subscribe((action) => {
                this._store.dispatch(action);
            });
    }

    /**
     * @private
     * @return {void}
     */
    _subscribeFieldChange() {
        const change$ = Rx.Observable.fromEvent(this._view.form, 'input')
            .map(({ target: { name, value } }) => ({ name, value }))
            .share();

        change$.map(change => this._addressActionCreator.updateDraftAddressWithChange(change, this._address))
            .takeUntil(this._unmount$)
            .subscribe((action) => {
                this._store.dispatch(action);
            });

        change$.debounceTime(500)
            .switchMap(change => this._quoteActionCreator.calculateQuoteWithChange(change, this._address))
            .takeUntil(this._unmount$)
            .subscribe((action) => {
                this._store.dispatch(action);
            });
    }

    /**
     * @private
     * @return {void}
     */
    _subscribeFormSubmit() {
        Rx.Observable.fromEvent(this._view.form, 'submit')
            .do(event => event.preventDefault())
            .switchMap(() => this._addressActionCreator.updateAddress(this._address))
            .takeUntil(this._unmount$)
            .subscribe((action) => {
                this._store.dispatch(action);
            });
    }

    /**
     * @private
     * @return {void}
     */
    _subscribeState() {
        this._store.getState()
            .takeUntil(this._unmount$)
            .subscribe((state) => {
                this._address = this._addressSelector.getDraftAddress(state);

                this._view.render({
                    address: this._addressSelector.getAddress(state),
                    draftAddress: this._addressSelector.getDraftAddress(state),
                    quote: this._quoteSelector.getQuote(state),
                    error: this._addressSelector.getAddressError(state) ||
                           this._quoteSelector.getQuoteUnavailableError(state),
                    isFetching: this._addressSelector.isFetchingAddress(state),
                    isUpdating: this._addressSelector.isUpdatingAddress(state) ||
                                this._quoteSelector.isCalculatingQuote(state),
                });
            });
    }
}
