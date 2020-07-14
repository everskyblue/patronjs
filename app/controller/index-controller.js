export default class IndexController {
    constructor(container) {
        container.view.render('home', {
            h1: 'getting started with patronjs',
            lists: []
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