export default class IndexController {
    constructor(container) {
        container.view.render('home', {
            title: 'mi titulo',
            lists: ['papa', 'tomate', 'cebolla']
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