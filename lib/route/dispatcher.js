import {match_url, load_assets} from "../helpers.js";

const reflect = window.Reflect ? Reflect : {has: (cl, k) => k in cl};

/**
 * 
 * @param {Object} obj controller
 * @param {String} key name method
 */
function method_exists(obj, key) {
    return reflect.has(obj, key) && typeof obj[key] === 'function';
}

/**
 * 
 * @typedef {Object} ContainerDef
 * @property {View} view
 * @property {DBModel} storage
 */

/**
 * 
 * @param {Function} controller instance controller class
 * @param {...ContainerDef} container container app {@link ContainerDef} object
 */
function dispatchController(controller, container) {
    const $class = new controller(container);
    if (method_exists($class, 'addDataView')) {
        container.view.setData($class.addDataView());
    }

    if (method_exists($class, 'addView')) {
        container.view.render($class.addView());
    }
}

/**
 * @version 0.1.0
 */
export default class Dispacther {

    /**
     * 
     * @param {Patron} app 
     * @param {*} req 
     */
    constructor(app, req) {
        this.route = app;
        this.request = req;
        this.func_error = ()=>{};
    }

    /**
     * 
     * @param {Function} func_error function to execute when no fount url
     */
    noFount(func_error) {
        this.func_error = func_error;
    }

    /**
     * initialize app
     */
    send() {
        const url = this.request.url;
        const urls_defined = this.route.urls_defined;
        
        for (const obj of urls_defined) {
            if (match_url(obj.data_url.url, url)) {
                return this.execute(obj);
            } 
        }

        if (this.func_error) this.func_error();

        return this;
    }

    /**
     * 
     * @param {object} data values of route
     */
    execute(data) {
        const option = data.option;
        const container = this.route.container;
        if (typeof option  == 'object') {
            if (option.load && option.load.css) load_assets('css', option.load.css);
            if (option.load && option.load.js) load_assets('js', option.load.js);
            if (typeof option.controller == 'function') dispatchController(option.controller, container);
        } else if (typeof option == 'function') {
            dispatchController(option, container);
        }
    }

    /**
     * @return {Dispacther}
     */
    getInstance() {
        return Dispacther._instance;
    }

    /**
     * create instance class
     * @param {Patron} app instance class patron
     * @param {EvtUrlChange} req state event url
     */
    static createInstance(route, req){
        if (!Dispacther._instance)
            Dispacther._instance = new Dispacther(route, req);
        return Dispacther._instance;
    }

    /**
     * @description return instance class
     * @return {Dispacther}
     */
    static get instance(){
        return Dispacther._instance;
    }

    /**
     * @description set instance class
     * @param {Dispacther}
     */
    static set instance(obj) {
        Dispacther._instance = obj;
    }
}