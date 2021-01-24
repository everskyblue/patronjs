import { parse } from "./render.js";
import readFile from "./read-file.js";
import { addCache, addCachedItems, getCache, isCaching } from "./fs/cache-file.js";


/**
 * @class
 * @since 0.2.6
 */
export class ViewConfig {
    /**
     * @constructor
     * @param {{path: string,ext: string,join: string,isCaching:boolean}} config
     */
    constructor({ path = '', ext = '.html', join = '', isCaching = true }) {
        this.path = path;
        this.id_element = join;
        this.extension = ext;
        this.cache = isCaching;
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
        this.abs_file = null;
    }

    /**
     * @async
     * @param {String} file
     * @return {Promise}
     */
    async getContent(file, data) {
        this.abs_file = this.getRootFile(file);
        if (this.config.cache && isCaching(this.abs_file)) return getCache(this.abs_file);
        const res = await readFile(this.abs_file);
        if (res.error) throw new Error('file not fount')
        const dom = parse(res.content, data);
        addCache(this.abs_file, res.content, dom);
        return getCache(this.abs_file);
    }

    /**
     * @param {String} file
     * @param {Object} data
     * @return {Promise<HTMLElement>}
     */
    async render(file, data) {
        return this.getContent(file, data);
    }

    /**
     * @since 0.1.1
     * @param {string} content
     */
    innerContent(content) {
        this.elm_container.textContent = content;
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

    /**
     * @return {HTMLElement}
     */
    get elm_container() {
        return document.querySelector(this.config.id_element);
    }

    /**
     * @return {string}
     */
    get domText() {
        return this.elm_container.innerHTML;
    }

    /**
     * @return {void}
     */
    storeDOM(file = false) {
        if (typeof this.abs_file === 'string') {
            addCachedItems(this.abs_file, this.elm_container);
            this.abs_file = null;
        } else if (this.abs_file === null && typeof file === 'string') {
            addCache(file, this.domText, document.createElement('div'));
            addCachedItems(file, this.elm_container);
        }
    }
}