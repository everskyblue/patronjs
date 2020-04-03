export default class IndexController {
    constructor(container) {
        container.view.render('home', {
            h1: 'getting started with patronjs'
        });
    }

    /*
    
    addView() {
        return 'filename';
    }

    addDataView() {
        return {};
    }*/
}