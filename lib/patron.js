import { getContainer, setContainer } from "./container.js";
import Cookie from "./http/cookie.js";
import Session from "./http/session.js";
import HRequest from "./http/request.js";
import HResponse from "./http/response.js";
import Route from "./route/route.js";
import { View } from "./view/view.js";
import Flat from "./model/flatConnection.js";
import Dispacther from "./route/dispatcher.js";
import { template_logger } from "./helpers.js";

/**
 * 
 * @param {Object} config 
 */
function register(config) {
    setContainer('view', function (/*container*/) {
        return new View(config.cview);
    });

    setContainer('db', function () {
        return new Flat(config.database);
    });

    setContainer('cookie', function () {
        return new Cookie();
    });
    
    setContainer('session', function () {
        return new Session();
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
     * 
     * @param {HRequest} request 
     * @return {Dispacther}
     */
    run(request) {
        /**
         * @type {Dispacther}
         */
        const dispatcher = Dispacther.createInstance(
            this,
            request
        );

        dispatcher.send();

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