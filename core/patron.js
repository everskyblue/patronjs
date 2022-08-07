import { getContainer, setContainer } from "./container.js";
import Cookie from "./http/cookie.js";
import HRequest from "./http/request.js";
import HResponse from "./http/response.js";
import Route from "./route/route.js";
import { View, ViewConfig } from "./view/view.js";
import Dispatcher from "./route/dispatcher.js";
import { template_logger, setUtilLocation } from "./helpers.js";


/**
 * @class
 * @version 0.1.0
 */
export default class Patron extends Route {
    /**
     * 
     * @param {Object} config 
     */
    constructor(config) {
        super();
        this.debug = config.debug;
        setUtilLocation(config.base_url, config.assets_location);
        setContainer('config', ()=> ({...config}));
    }

    /**
     * 
     * @returns {Patron}
     */
    registerContainer() {
        setContainer('view', container => new View(new ViewConfig(container.config.cview)));
        setContainer('cookie', () =>new Cookie());
        return this;
    }

    /**
     * 
     * @returns {Patron}
     */
    registerContainerRequest() {
        setContainer('request', () => new HRequest());
        return this;
    }

    /**
     * 
     * @returns {Patron}
     */
     registerContainerResponse() {
        setContainer('response', container =>  new HResponse(container));
        return this;
    }
    /**
     * 
     * @param {String} key 
     * @param {Function} func 
     * @returns {Patron}
     */
    setContainer(key, func) {
        setContainer(key, func);
        return this;
    }

    /**
     * @param {HRequest} request
     * @return {Dispatcher}
     * @param {Function} callback404
     */
    run(callback404) {
        const dispatcher = Dispatcher.createInstance(
            this.container.request,
            this.container.response,
            this.container
        );
        
        dispatcher
            .setNotFount(callback404??dispatcher.catch)
            .setRouters(this.actions)
            .send();

        return dispatcher;
    }

    /**
     * @param {Error} e
     */
    handlerError(e) {
        if (this.debug) template_logger(e);
    }

    /**
     * @return {Object}
     */
    get container() {
        return getContainer();
    }
}