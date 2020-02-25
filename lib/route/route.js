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
        this._group = url + '/';
        
        fn(this);
        
        this._group = '';
    } 
    
    /**
     * define route
     * @param {String} url 
     * @param {Function} option 
     */
    hash(url, option) {
        const data_url = this.pattern.resolverCondition(this._group+url)

        this.actions.push({
            data_url,
            option
        });
    }

    /**
     * @return {Array}
     */
    get urls_defined() {
        return this.actions;
    }
}