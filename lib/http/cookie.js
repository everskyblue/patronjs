/**
 * @version 0.1.0
 */
export default class Cookie {
    /**
     * @constructor
     */
    constructor() {
        this.expires = null;
        this.path = location.path;
        this.domain = location.hostname;
        this.secure = null;
        this.max_age = null;
        this.samesite = null;
        this.values = this.getValues();
    }

    /**
     * 
     * @param {string} key 
     * @param {string} value 
     * @param {object} options 
     */
    add(key, value, options = {}) {
        let sc = `${key}=${value}`;
        for (const kopt in options) {
            sc += `;${kopt}=${options[kopt]}`;
        }
        document.cookie = sc;
    }

    /**
     * 
     * @param {string} key 
     */
    remove(key) {
        document.cookie = key + '=;expires=' + (new Date('-1')).toUTCString();
    }

    /**
     * @returns {object}
     */
    getValues() {
        let vals = {}, rv,
            rgx =  /([\w]+)\s*\=\s*([^;]*)/g;
        while ((rv = rgx.exec(document.cookie)) !== null) {
            vals[rv[1]] = rv[2];
        }
        return vals;
    }
    
    /**
     * 
     * @param {string} key
     * @return {any}
     */
    getValue(key) {
        return this.getValues()[key];
    }
}
