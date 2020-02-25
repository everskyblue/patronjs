/**
 * @class
 * @version 0.1.1
 * @typedef {View} ViewDef
 * @property {String} path
 * @property {HTMLElement} elm_container
 * @property {String} extension
 * @property {Object} data
 */
export class View {

    /**
     * @constructor
     * @param {String} path 
     * @param {String} ext 
     * @param {String} join element where in view
     */
    constructor({path = '', ext = '.html', join = ''}) {
        this.path = path;
        this.elm_container = join;
        this.extension = ext;
        this.data = {};
    }

    /**
     * @async
     * @param {String} file 
     * @return {Promise}
     */
    async getContent(file) {
        const res = await fetch(this.getRootFile(file));
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
            window.Patron.appendView(this.elm_container, content, data||this.data);
        });
    }

    /**
     * @since 0.1.1
     * @param {Object} data 
     */
    setData(data) {
        this.data = data;
    }

    /**
     * 
     * @param {String} name 
     * @return {String}
     */
    getRootFile(name) {
        if (!this.path.endsWith('/')) {
            this.path = this.path + '/';
        }
        return this.path + name + this.extension;

    }
}