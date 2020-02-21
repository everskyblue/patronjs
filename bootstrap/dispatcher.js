import Dispatcher from "../lib/route/dispatcher.js";
import EvtUrlChange from "../lib/url-change.js";


export default function (router) {
    try {

        const evtUrlChange = new EvtUrlChange();
        const dispatcher = Dispatcher.createInstance(router, evtUrlChange);

        evtUrlChange.state(dispatcher);

        dispatcher.noFount(() => console.log('url no encontrada'));
        dispatcher.send();

    } catch(e){

        console.log(e.stack);

    }
}