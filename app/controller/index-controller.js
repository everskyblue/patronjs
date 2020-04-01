export default class IndexController {
    constructor(container) {
        container.view.render('home', {
            title: 'mi titulo',
            lists: [1,2, 3]
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