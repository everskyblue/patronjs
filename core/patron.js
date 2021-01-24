import { getContainer, setContainer } from "./container.js";
import Cookie from "./http/cookie.js";
import HRequest from "./http/request.js";
import HResponse from "./http/response.js";
import Route from "./route/route.js";
import { View, ViewConfig } from "./view/view.js";
import Dispatcher from "./route/dispatcher.js";
import { template_logger, setUtilLocation } from "./helpers.js";

/**
 * 
 * @param {Object} config 
 */
function register(config) {
    setContainer('view', function (/*container*/) {
        return new View(new ViewConfig(config.cview));
    });

    setContainer('cookie', function () {
        return new Cookie();
    });
    
    setContainer('request', function () {
        return new HRequest();
    });

    setContainer('response', function (container) {
        return new HResponse(container);
    });
}

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
        register(config);
    }

    /**
     * 
     * @param {String} key 
     * @param {Function} func 
     */
    setContainer(key, func) {
        setContainer(key, func);
    }

    /**
     * @param {HRequest} request
     * @return {Dispatcher}
     * @param {function} callback404
     */
    run(request, callback404) {
        const dispatcher = Dispatcher.createInstance(
            request,
            this.container.response,
            this.container
        );

        dispatcher.send(this.actions, callback404);

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