import { parse } from "./render.js";
import readFile from "./read-file.js";
import { addCache, getCache, isCaching } from "./fs/cache-file.js";


/**
 * @class
 * @since 0.2.6
 */
export class ViewConfig {
    /**
     * @constructor
     * @param {String} path
     * @param {String} ext
     * @param {String} join element where in view
     */
    constructor({ path = '', ext = '.html', join = '', isCaching = true }) {
        this.path = path;
        this.id_element = join;
        this.extension = ext;
        this.is_caching = isCaching;
    }
}

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
     * @param {ViewConfig} viewConfig
     */
    constructor(viewConfig) {
        this.config = viewConfig;
    }

    /**
     * @async
     * @param {String} file
     * @return {Promise<string>}
     */
    async getContent(file, data) {
        file = this.getRootFile(file);
        if (isCaching(file)) return getCache(file).parsed_element;
        const res = await readFile(file);
        if (res.error) throw new Error('file not fount')
        const dom = parse(res.content, data);
        if (this.config.is_caching) addCache(file, res.content, dom.clone);
        return dom;
    }

    /**
     * @param {String} file
     * @param {Object} data
     */
    render(file, data) {
        this.getContent(file, data).then(domChilds => {
            for (let i = 0, len = domChilds.length, a = 0; i < len; i++) {
                document.querySelector(this.config.id_element).appendChild(domChilds[a]);
            }
        });
    }

    /**
     * @since 0.1.1
     * @param {string} content
     */
    innerContent(content) {
        (this.config.elm_container || document.body).textContent = content;
    }

    /**
     *
     * @param {String} name
     * @return {String}
     */
    getRootFile(name) {
        let path = this.config.path;
        if (!path.endsWith('/')) {
            path = path + '/';
        }
        return path + name + this.config.extension;
    }
}