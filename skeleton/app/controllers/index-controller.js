import Controller from "./MainController.js";

export default class IndexController extends Controller {
    constructor(container) {
        super()
        console.log(container);
    }

    render() {
        return this.view.render('home', {
            h1: 'getting started with patronjs',
            lists: [' text 1', 'text 2']
        });
    }
}