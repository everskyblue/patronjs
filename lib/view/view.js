/**
 * @version 0.1.0
 */

export class View {

    /**
     * @constructor
     * @param {String} root 
     * @param {String} ext 
     * @param {String} elm element where in view
     */
    constructor({root = '', ext = '.html', elm = ''}) {
        this.root = root;
        this.elm_container = elm;
        this.extension = ext;
    }

    /**
     * @async
     * @param {String} file 
     * @return {Promise}
     */
    async getContent(file) {
        const res = await fetch(this.getRoorFile(file));
        return await res.text();
    }

    /**
     * @param {String} file 
     * @param {Object} data 
     */
    render(file, data) {
        this.getContent(file).then(content => {
            if (typeof window.Patron === 'undefined') {
                throw new Error('object Patron no defined in window');
            }
            /**
             * @function external:Patron#appendView
             */
            window.Patron.appendView(this.elm_container, content, data);
        });
    }

    /**
     * 
     * @param {String} name 
     * @return {String}
     */
    getRoorFile(name) {
        if (!this.root.endsWith('/')) {
            this.root = this.root + '/';
        }
        return this.root + name + this.extension;

    }
}