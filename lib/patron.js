import { getContainer, setContainer } from "./container.js";
import { DBModel } from "./model/database.js";
import Route from "./route/route.js";
import { View } from "./view/view.js";
//import { db_set_config, create_db_local, get_db_hierarchy } from "./model/db.js";

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