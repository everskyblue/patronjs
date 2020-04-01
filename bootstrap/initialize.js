import app from "./routes.js";
import URLStateCapture from "../lib/url-state.js";

try {
    const evt = new URLStateCapture();

    /**
     * hash change
     */
    evt.state(app.run(evt))
} catch (e) {
    app.handlerError(e);
}