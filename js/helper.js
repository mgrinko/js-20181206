export default class Helper {
    constructor() { }
    static debounce(fn, ms) {
        let timer = null;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(fn.bind(this, ...args), ms);
        }
    }
}