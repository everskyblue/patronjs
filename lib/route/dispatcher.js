import {match_url, load_assets} from "../helpers.js";

/**
 * 
 * @param {Function} controller instance controller class
 */
function dispatchController(controller, model) {
    const $class = new controller(model);
}

export default class Dispacther {

    /**
     * 
     * @param {*} route 
     * @param {*} req 
     */
    constructor(route, req) {
        this.route = route;
        this.request = req;
        this.func_error = null;
    }

    /**
     * 
     * @param {Function} func_error function to execute when no fount url
     */
    noFount(func_error) {
        this.func_error = func_error;
    }

    /**
     * initialize
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
        
        if (typeof option  == 'object') {
            if (option.load && option.load.css) load_assets('css', option.load.css);
            if (option.load && option.load.js) load_assets('js', option.load.js);
            if (typeof option.controller == 'function') dispatchController(option.controller, this.route.model);
        } else if (typeof option == 'function') {
            dispatchController(option, this.route.model);
        }
    }

    /**
     * @return {Dispacther}
     */
    getInstance() {
        return Dispacther._instance;
    }

    /**
     * 
     * @param {Route} route instance
     * @param {State} req state event url
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