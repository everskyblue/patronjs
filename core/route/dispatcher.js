import { match_url, load_assets, page_not_fount, template_logger } from "../helpers.js";

/**
 * @typedef {import("../route/route.js").default} Route
 * @typedef {import("../http/request.js").default} HRequest
 * @typedef {import("../http/response.js").default} HResponse
 */
const reflect = window.Reflect ? Reflect : { has: (cl, k) => k in cl };

/**
 *
 * @param {Object} obj controller
 * @param {String} key name method
 */
function method_exists(obj, key) {
    return reflect.has(obj, key) && typeof obj[key] === 'function';
}

/**
 * @memberof Dispatcher
 * @private 
 * @typedef {Object} ContainerDef
 * @property {object} view
 * @property {object} storage
 * @param {object} Controller instance controller class
 * @param {ContainerDef} container container app {@link ContainerDef} object
 * @param {string} method
 */
function dispatchController(Controller, container, method) {
    if (typeof Controller.__proto__ === 'function' && typeof Controller.__proto__.prototype !== 'undefined') {
        if (Controller.__proto__.name === 'Controller') {
            Object.setPrototypeOf(Controller.__proto__.prototype, container);
        }
    }

    try {
        const isClass = Controller.toString().substring(0, 5) === 'class';
        const $class = isClass ? new Controller(container) : Controller(container);
        let data = isClass ? '' : $class;
        if (isClass) {
            if (!method_exists($class, method)) {
                throw new Error('method not exists');
            }
            data = $class[method]();
        }

        container.response.send(data);
    } catch (error) {
        if (container.config.debug) {
            template_logger(error)
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
 * @type {Dispatcher}
 */
let instanceDispatcher;

/**
 * @class Dispatcher
 * @version 0.2.0
 */
export default class Dispatcher {

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
            const iframe = page_not_fount();
            this.page = iframe;
            this.html = document.body.innerHTML;
            document.body.innerHTML = '';
            document.body.appendChild(iframe);
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
            let result = match_url(router.path.url, this.request.url);
            if (result !== false) {
                this.request.params = object_union(router.path.name_params, result.params);
                this.stateView(result.input);
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
    execute({ option, method }) {
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

        const data_rm = document.querySelectorAll('[data-remove]');
        const handle = document.querySelectorAll('[patron-handle]');

        if (handle.length > 0) {
            location.reload();
        }
        
        data_rm.forEach(node => {
            if (['style', 'script', 'link'].includes(node.tagName.toLowerCase())) node.remove();
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
    static createInstance(req, res, container) {
        if (!Dispatcher.instance)
            Dispatcher.instance = new Dispatcher(req, res, container);
        return Dispatcher.instance;
    }

    /**
     * @description return instance class
     * @return {Dispatcher}
     */
    static get instance() {
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
