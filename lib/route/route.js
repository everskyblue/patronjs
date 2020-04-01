import RoutePattern from './route-pattern.js';

/**
 * @class
 * @version 0.1.0
 * @property {RoutePattern} pattern
 * @property {String} _group
 * @property {Array} actions
 */
export default class Route {
    /**
     * @constructor
     */
    constructor() {
        this._group = '';
        this.pattern = new RoutePattern();
        this.actions = [];
    }
    
    /**
     * 
     * @param {String} url 
     * @param {Function} fn 
     */
    group(url, fn) {
        this._group = url;

        if (!url.endsWith('/')) this._group += '/';
        
        fn(this);
        
        this._group = '';
    } 
    
    /**
     * define route
     * @param {String} url 
     * @param {Function} option 
     */
    hash(url, option) {
        const path = this.pattern.resolverCondition(this._group+url)

        this.actions.push({
            path,
            option
        });
    }
}