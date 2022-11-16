import RoutePattern from './route-pattern.js';
import '../types.js'

/**
 * @class
 * @version 0.2.0
 */
export default class Route {
    /**
     * @type {string}
     */
    _group = '';

    /**
     * @type {RouteAction[]}
     */
    actions = [];

    /**
     * @type {RoutePattern}
     */
    pattern =  new RoutePattern();
    
    /**
     * url groups
     * @param {String} url 
     * @param {(context: Route)=> any} fn 
     * @return {Route}
     */
    group(url, fn) {
        this._group = url;
        fn(this);
        this._group = '';
        return this;
    } 

    /**
     * define route
     * @param {String} url 
     * @param {Function|OptionRoute} option 
     * @param {String|undefined} method optional parameter, name method of the function
     * @return {Route}
     */
    hash(url, option, method) {
        const path = this.pattern.resolverCondition(this._group.concat(url))
        
        this.actions.push({
            path,
            option,
            method
        });

        return this;
    }
}