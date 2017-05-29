export default class View {
    /**
     * @param {Element} parentElement
     */
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.element = document.createElement('div');
    }

    /**
     * @return {void}
     */
    mount() {
        this.parentElement.appendChild(this.element);

        this.render();
    }

    /**
     * @return {void}
     */
    unmount() {
        this.parentElement.removeChild(this.element);
    }

    /**
     * @return {void}
     */
    render() {
        console.warn('Not implemented');
    }
}
