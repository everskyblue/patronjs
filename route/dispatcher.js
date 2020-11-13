import {match_url, load_assets, page_not_fount} from "../helpers.js";
import HRequest from "../http/request.js";

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
function dispatchController(controller, container, method) {
    if (typeof controller.__proto__ === 'function' && typeof controller.__proto__.prototype !== 'undefined') {
        if (controller.__proto__.name === 'Controller') {
            Object.setPrototypeOf(controller.__proto__.prototype, container);
        }
    }

    const $class = new controller(container);

    if (method_exists($class, method)) {
        const vw =  $class[method]();
        if (vw instanceof Promise) {
            vw.then(CacheSystem => {
                for (let i = 0, len = CacheSystem.parsed_element.childNodes.length, a = 0; i < len; i++) {
                    container.view.elm_container.appendChild(CacheSystem.parsed_element.childNodes[a]);
                }
            });
        } else if (Array.isArray(vw) || typeof vw === 'object') {
            container.view.innerContent(JSON.stringify(vw));
        } else if (typeof vw !== 'undefined') {
            container.view.innerContent(vw);
        }
    }
}

/**
 * create object with key = value
 * @param {array} keys 
 * @param {array} vals 
 */
function object_union(keys, vals) {
    let newObject = {};
    keys.forEach((key, indx) => (newObject[key] = vals[indx]));
    return newObject;
}

/**
 * @version 0.1.0
 */
export default class Dispacther {

    /**
     *
     * @param {Patron} app
     * @param {HRequest} req
     */
    constructor(app, req) {
        this.container = app.container;
        this.routers = app.actions;
        this.request = req;

        this.catch = ()=> {
            this.page = page_not_fount;
            this.html = document.body.innerHTML;
            document.body.innerHTML = '';
            document.body.appendChild(page_not_fount);
        };
    }

    /**
     * @param {Function} func_error function to execute when not fount url
     */
    notFound(func_error) {
        this.catch = func_error;
    }

    /**
     * initialize app
     */
    send() {
        let val_params = [];
        for (const router of this.routers) {
            if ((val_params = match_url(router.path.url, this.request.url))) {
                this.request.params = object_union(router.path.name_params, val_params);
                //- remove page not found
                if (typeof this.html === 'string') {
                    this.page.remove();
                    document.body.innerHTML = this.html;
                    delete this.html;
                }

                this.stateView(val_params.input);
                return this.execute(router);
            }
        }

        // show page not fount
        this.catch();
    }

    /**
     *
     * @param {object} data values of router
     */
    execute(data) {
        let option = data.option;
        let method = data.method;
        if (typeof option  == 'object') {
            if (option.load && option.load.css) load_assets('css', option.load.css);
            if (option.load && option.load.js) load_assets('js', option.load.js);
            option = option.controller;
        }
        if (typeof option == 'function') {
            dispatchController(option, this.container, method);
        } else {
            throw new Error('wait callback execution');
        }
    }

    /**
     * 
     * @param {string} current_url 
     */
    stateView(current_url) {
        document.querySelectorAll('[data-remove]').forEach(node => {
            if (['style', 'script'].includes(node.tagName.toLowerCase())) node.remove(); 
        });

        this.container.view.storeDOM(current_url);
    }

    /**
     * @return {Dispacther}
     */
    getInstance() {
        return Dispacther._instance;
    }

    /**
     * create instance class
     * @param {Patron} app
     * @param {HRequest} req
     */
    static createInstance(app, req){
        if (!Dispacther._instance)
            Dispacther._instance = new Dispacther(app, req);
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