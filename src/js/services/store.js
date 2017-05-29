import Rx from 'rxjs/Rx';

export default class Store {
    /**
     * @param {function(state: Object, action: Action): Object} reducer
     * @param {Object} initialState
     * @return {void}
     */
    constructor(reducer, initialState) {
        this._dispatcher$ = new Rx.BehaviorSubject({});
        this._state$ = new Rx.BehaviorSubject(initialState);

        this._dispatcher$.scan(reducer, initialState)
            .subscribe(this._state$);
    }

    /**
     * @return {Object}
     */
    getCurrentState() {
        return this._state$.getValue();
    }

    /**
     * @return {Observable<Object>}
     */
    getState() {
        return this._state$;
    }

    /**
     * @param {Action} action
     * @return {void}
     */
    dispatch(action) {
        this._dispatcher$.next(action);
    }
}
