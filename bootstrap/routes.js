import * as controller from "../app/controllers.js";
import route from "./app.js";

route.hash('/', {
    controller: controller.IndexController,
    load: {
        js: ['index'],
        css: []
    }
});


route.hash('/contact', controller.ContactController);
route.hash('/articulos', controller.ArticleController);


export default route;