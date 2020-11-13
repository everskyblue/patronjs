import * as controller from "../app/controllers.js";
import route from "./app.js";

route.hash('/', {
    controller: controller.IndexController,
    load: {
        js: ['index'],
        css: []
    }
}, 'render');


route.hash('/contact', controller.ContactController, 'render');
route.hash('/articulos', controller.ArticleController, 'render');


export default route;