import {parse_url} from './helpers.js';

/**
 * @class
 * @version 0.1.0
 */
export default class URLStateCapture {

    /**
     * @param {Dispacther} dispatcher 
     */
    state(dispatcher) {
        window.addEventListener('hashchange', () => {
            dispatcher.send();
        });
    }
    
    /**
     * @return {String}
     */
    get url() {
        const url = parse_url(location.hash.substr(1) || '/');
        return url.pathname;
    }
}