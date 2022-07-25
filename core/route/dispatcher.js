import {match_url, load_assets, page_not_fount} from "../helpers.js";

/**
 * @typedef {import("../route/route.js").default} Route
 * @typedef {import("../http/request.js").default} HRequest
 * @typedef {import("../http/response.js").default} HResponse
 */
const reflect = window.Reflect ? Reflect : {has: (cl, k) => k in cl};

/**
 *
 * @param {Object} obj controller
 * @param {String} key name method
 */
function method_exists(obj, key) {
    return reflect.has(obj, key) && typeof obj[key] === 'function';
}

function appendView(vw, container) {
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

/**
 * @memberof Dispatcher
 * @private 
 * @typedef {Object} ContainerDef
 * @property {object} view
 * @property {object} storage
 * @param {object} controller instance controller class
 * @param {ContainerDef} container container app {@link ContainerDef} object
 * @param {string} method
 */
function dispatchController(controller, container, method) {
    if (typeof controller.__proto__ === 'function' && typeof controller.__proto__.prototype !== 'undefined') {
        if (controller.__proto__.name === 'Controller') {
            Object.setPrototypeOf(controller.__proto__.prototype, container);
        }
    }

    const isClass = controller.toString().substring(0, 5) === 'class';
    const $class = isClass ? new controller(container) : controller(container);

    if (isClass) {
        if (!method_exists($class, method)) {
            throw new Error('method not exists');
        }
        appendView($class[method](), container);
    } else {
        appendView($class, container)
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
 * @type {Dispatcher}
 */
let instanceDispatcher;

/**
 * @class Dispatcher
 * @version 0.2.0
 */
export default class Dispatcher {

    static _instance = null;

    /**
     * @param {HRequest} req
     * @param {HResponse} res
     * @param {object} container
     */
    constructor(req, res, container = {}) {
        this.request = req;
        this.response = res;
        this.container = container;
        this.setNotFount(() => {
            this.page = page_not_fount;
            this.html = document.body.innerHTML;
            document.body.innerHTML = '';
            document.body.appendChild(page_not_fount);
        });
    }

    /**
     * 
     * @param {Array<object>} routers 
     * @return {Dispatcher}
     */
    setRouters(routers) {
        this.routers = routers;
        return this;
    }

    /**
     * 
     * @param {Function} _catch 
     * @return {Dispatcher}
     */
    setNotFount(_catch) {
        this.catch = _catch;
        return this;
    }

    /**
     * initialize app
     */
    send() {
        for (const router of this.routers) {
            let val_params= match_url(router.path.url, this.request.url);
            if (val_params !== false) {
                this.request.params = object_union(router.path.name_params, val_params);
                this.stateView(val_params.input);
                return this.execute(router);
            }
        }
        this.catch(); // show page not fount
    }

    /**
     * ejecuta el controlador actual
     * @param {{option: object | function, method: string}} data values of router
     * @throws {Error}
     */
    execute({option, method}) {
        if (typeof option === 'object') {
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
        //- remove page not found
        if (typeof this.html === 'string') {
            this.page.remove();
            document.body.innerHTML = this.html;
            delete this.html;
        }
        
        document.querySelectorAll('[data-remove]').forEach(node => {
            if (['style', 'script'].includes(node.tagName.toLowerCase())) node.remove(); 
        });

        this.container.view.storeDOM(current_url);
    }

    /**
     * @return {Dispatcher}
     */
    getInstance() {
        return instanceDispatcher;
    }

    /**
     * @param {HRequest} req
     * @param {HResponse} res
     * @param {object} container
     * @return {Dispatcher}
     */
    static createInstance(req, res, container){
        if (!Dispatcher.instance)
            Dispatcher.instance = new Dispatcher(req, res, container);
        return Dispatcher.instance;
    }

    /**
     * @description return instance class
     * @return {Dispatcher}
     */
    static get instance(){
        return instanceDispatcher;
    }

    /**
     * @description set instance class
     * @param {Dispatcher} obj
     */
    static set instance(obj) {
        instanceDispatcher = obj;
    }
}
