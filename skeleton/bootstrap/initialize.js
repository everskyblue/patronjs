import {URLStateCapture} from "jspatron/app"
import app from "./routes.js";

try {
    const evt = new URLStateCapture();

    /**
     * hash change
     */
    evt.state(app.run(evt))
} catch (e) {
    app.handlerError(e);
}

console.log();