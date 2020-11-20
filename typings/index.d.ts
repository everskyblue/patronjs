import { Patron, URLStateCapture } from "./app";
import { Cookie, HRequest, HResponse, status } from "./http";
import { Dispatcher, Route, RoutePattern } from "./route";

declare namespace jspatron {
    export {Patron, URLStateCapture}
}

declare namespace jspatron.route {
    export {Route, RoutePattern, Dispatcher}
}

declare namespace jspatron.http {
    export {Cookie, HRequest, HResponse, status}
}

export = jspatron;
export as namespace jspatron;