import Status from "./status.js";

/**
 * @version 0.1.0
 */
export default class HResponse extends Status {
    /**
     * @constructor
     * @param {object} container 
     */
    constructor(container) {
        super();
        this.container = container;
    }

    /**
     * 
     * @param {string} key 
     * @param {any} value 
     * @param {Object} options 
     */
    signedCookie(key, value, options = {}) {
        this.container.cookie.add(key, value, options);
    }

    /**
     * 
     * @param {string} file 
     * @param {Object} data 
     */
    view(file, data = {}) {
        this.container.view.render(file, data);
    }
}