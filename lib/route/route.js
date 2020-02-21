import RoutePattern from './route-pattern.js';
import Store from "./store.js";

export default class Route {
    
    constructor() {
        this._group = '';
        this._store = null;
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
     * 
     * @param {String} url 
     * @param {Function|Object} fn 
     */
    hash(url, option) {
        const data_url = this.pattern.resolverCondition(this._group+url)
        
        if (this._group !== '') {
            this._store = new Store(data_url);
        }

        this.actions.push({
            data_url,
            option
        });
    }

    /**
     * @return {Array<Object>}
     */
    get urls_defined() {
        return this.actions;
    }

    /**
     * @return {Store|Null}
     */
    get store() {
        return this._store;
    }
    
}