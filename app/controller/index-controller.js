export default class IndexController {
    constructor(container) {
        container.view.render('home', {
            h1: 'getting started with patronjs',
            lists: [' text 1', 'text 2']
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