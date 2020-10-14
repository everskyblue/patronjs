import Controller from "../MainController.js";

export default class IndexController extends Controller {
    constructor(container) {
        super()
        
    }

    render() {
        container.view.render('home', {
            h1: 'getting started with patronjs',
            lists: [' text 1', 'text 2']
        });
    }
}