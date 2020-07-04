import { Render } from "./render.js";

let cache = {}, _document;

class HandlerView {
    isCaching(file) {
        return file in cache;
    }

    addCache(file, content) {
        cache[file] = content;
    }

    getView(file) {
        return cache[file];
    }
}

function util(type_property, val) {
    var def_properties = {
        'patron-iterator-to': PatronIterator
    };

    function PatronIterator(val) {

        this.removeKey = function (elm) {
            setTimeout(() => {
                if (elm) {
                    elm.removeAttribute('patron-iterator-key');
                    elm.removeAttribute('patron-iterator-value');
                }
            }, 0);
        }

        this.setValue = function (rn, index, data, key) {
            let attrs = rn.getAttributeNames(), elm_push;
            let itv = '[patron-iterator-value' + (key ? `="${index}"` : '') + ']';
            let itk = '[patron-iterator-key' + (key ? `="${index}"` : '') + ']';

            if (attrs.indexOf('patron-iterator-value') >= 0)
                elm_push = rn.innerHTML = data;
            this.removeKey(elm_push);
            if (attrs.indexOf('patron-iterator-key') >= 0)
                elm_push = rn.innerHTML = index;
            this.removeKey(elm_push);
            if (typeof elm_push === 'undefined') {
                elm_push = rn.querySelector(itv);
                if (elm_push) elm_push.innerHTML = data;
                this.removeKey(elm_push);
                elm_push = rn.querySelector(itk);
                if (elm_push) elm_push.textContent = index;
                this.removeKey(elm_push);
            }

            this.removeKey(elm_push);

            return elm_push;
        }

        this.view = function (ref, node) {
            let config = Function('return ' + node.getAttribute('patron-iterator-to')).call();
            let rn = _document.querySelector(`[patron-name="${config.elm}"]`);
            let keys = rn.getAttribute('patron-iterator-keys');
            let show_keys = _document.querySelector(`[patron-name="${rn.getAttribute('patron-show-keys')}"]`);
            let parent = rn.parentNode;
            
            if (keys) {
                keys = eval(keys);
            }

            rn.removeAttribute('patron-iterator-keys');
            rn.removeAttribute('patron-name');

            ref.resolveData(val, (datas) => {

                if (show_keys) {
                    show_keys.removeAttribute('patron-show-keys');
                    for (const i in keys) {
                        const e = this.setValue(show_keys, keys[i], keys[i], false);
                        const clone = show_keys.cloneNode(true);
                        if (i != (keys.length - 1)) {
                            show_keys.appendChild(clone);
                            show_keys = clone;
                        }
                    }
                }

                for (const index in datas) {
                    const data = datas[index];

                    if (keys) {
                        for (const key of keys) {
                            this.setValue(rn, key, data[key], true);
                        }
                    } else {
                        this.setValue(rn, index, data, false)
                    }

                    if (Number(index) !== (datas.length - 1)) {
                        rn = rn.cloneNode(true);
                        parent.appendChild(rn);
                    }
                }
            });
        }
    }

    if (type_property in def_properties) {
        return new def_properties[type_property](val);
    }
}

class ProcessViewData {
    render(/*dom, */data) {
        for (const key in data) {
            const elm = this.selectKey(key),
                exec = this.property(elm, data[key]);
                
            if (exec) {
                exec.view(this, elm);
            } else if (elm) {
                elm.innerHTML = data[key];
            }
        }
    }
    /**
     * select the item with the passkey
     * @param {String} key property key
     */
    selectKey(key) {
        let nd = _document.querySelector('[patron-key="' + key + '"]');
        if (!nd) {
            return;//throw new Error('key '+ key +' no exists')
        }
        nd.removeAttribute('patron-key');
        return nd;
    }

    property(node, value) {
        return node ? this.getUtil(node, value) : false;

    }

    /**
     * @param {HTMLElement} node
     */
    getUtil(node, value) {
        for (const iterator of node.getAttributeNames()) {
            const cl = util(iterator, value);

            if (cl) {

                return cl;
            }
        }
    }

    resolveData(data, fn) {
        if (data instanceof Promise) {
            return data.then(function (value) {
                return fn(value);
            })
        } else if (data instanceof Array || data instanceof Object) {
            return fn(data);
        } else {
            throw "error type data " + data.toString();
        }
    }
}

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
export class View extends Render {

    /**
     * @constructor
     * @param {ViewConfig} viewConfig
     */
    constructor(viewConfig) {
        super();
        this.config = viewConfig;
        this.hv = new HandlerView();
        this.processData = new ProcessViewData();
    }

    /**
     * @async
     * @param {String} file
     * @return {Promise<string>}
     */
    async getContent(file) {
        file = this.getRootFile(file);
        if (this.is_caching && this.hv.isCaching(file))
            return this.hv.getView(file);

        const res = await fetch(file);

        if (res.status === 404) {
            throw new Error('file not fount')
        }

        const content = await res.text();

        _document = (new DOMParser).parseFromString(content, 'text/html');
        
        const dom = this.parse(content);

        //this.processData.render(this.data);
        if (this.is_caching)
            this.hv.addCache(file, dom);
        return dom.childNodes;
    }

    /**
     * @param {String} file
     * @param {Object} data
     */
    render(file, data) {
        this.setData(data).getContent(file).then(domChilds => {
            domChilds.forEach(dom => {
                document.querySelector(this.config.id_element).appendChild(dom);
            })
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
     * @since 0.1.1
     * @param {Object} data
     * @return {View}
     */
    setData(data) {
        this.addProps(data);
        return this;
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