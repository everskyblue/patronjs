import {parse_url} from './helpers.js';
import HRequest from './http/request.js';

/**
 * @class
 * @version 0.1.0
 */
export default class URLStateCapture extends HRequest {

    constructor() {
        super()
    }

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
        const url = parse_url(location.hash.substring(1) || '/');
        return url.pathname;
    }
}