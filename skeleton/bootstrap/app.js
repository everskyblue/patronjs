import Patron from "patron/patron";
import URLStateCapture from "patron/url-state";
import * as config from "../app/config/app.js";

let app = new Patron(config);

/**
 * add container values global for app
 *
 *
 * app.setContainer('key', (container) => {});
 */

app.registerContainer()

    //.registerContainerRequest()

    .registerContainerResponse()

    .setContainer("request", () => new URLStateCapture());

export default app;
