import Rx from 'rxjs/Rx';

export default class Component {
    /**
     * @param {View} view
     * @param {Store} store
     */
    constructor(view, store) {
        this._unmount$ = new Rx.Subject();
        this._view = view;
        this._store = store;
    }

    /**
     * @return {void}
     */
    mount() {
        this._view.mount();
    }

    /**
     * @return {void}
     */
    unmount() {
        this._unmount$.next();
        this._unmount$.complete();
        this._view.unmount();
    }
}
