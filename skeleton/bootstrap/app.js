import {App as Patron} from "jspatron/app";
import * as config  from "../config/app.js";

let app = new Patron(config);

/**
 * add container values global for app
 * 
 * 
 * app.setContainer('key', (container) => {});
 */

export default app;