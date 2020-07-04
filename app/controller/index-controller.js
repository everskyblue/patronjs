export default class IndexController {
    constructor(container) {
        container.view.render('home', {
            h1: 'getting started with patronjs',
            lists: [1, 2, 3]
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