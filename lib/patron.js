import { getContainer, setContainer } from "./container.js";
import Cookie from "./http/cookie.js";
import Session from "./http/session.js";
import HRequest from "./http/request.js";
import HResponse from "./http/response.js";
import { DBModel } from "./model/database.js";
import Route from "./route/route.js";
import { View } from "./view/view.js";

/**
 * 
 * @param {Object} config 
 */
function register(config) {
    setContainer('view', function (/*container*/) {
        return new View(config.cview);
    });

    setContainer('storage', function () {
        return new DBModel(config.cdb);
    });

    setContainer('cookie', function () {
        return new Cookie();
    });
    
    setContainer('session', function () {
        return new Session();
    });

    setContainer('req', function () {
        return new HRequest();
    });

    setContainer('res', function (container) {
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
     * @return {Object}
     */
    get container() {
        return getContainer();
    }
}