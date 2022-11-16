import "./bootstrap/apply.routes";
import app from "./bootstrap/app";

try {
    //catch url changes and run app
    app.container.request.state(app.run());
} catch (e) {
    // show an error page
    app.handlerError(e);
}