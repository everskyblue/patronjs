import Status from "./status.js";

/**
 * @version 0.1.0
 */
// @ts-ignore
export default class HResponse extends Status {
    header = new Headers();

    #callbackResponse = [];

    /**
     * @constructor
     * @param {object} container 
     */
    constructor(container) {
        super();
        this.container = container;
    }

    /**
     * 
     * @param {string} key 
     * @param {any} value 
     * @param {Object} options 
     */
    signedCookie(key, value, options = {}) {
        this.#callbackResponse.push(() => {
            this.container.cookie.add(key, value, options);
        })
        return this;
    }

    /**
     * 
     * @param {string|array|object|Request} $any 
     * @returns {Request|array|object}
     */
    json($any) {
        if ($any instanceof Request) {
            return fetch($any).then(res => res.json())
        }
        return this.#createHTTP($any, 'application/json');
    }

    /**
     * 
     * @param {any} content 
     */
    send(content) {
        if (this.#callbackResponse.length > 0) {
            for (const callback of this.#callbackResponse) {
                callback();
            }
            
            this.#callbackResponse = [];
        }
        
        this.header = new Headers();

        if (!content) return;

        if (content instanceof Promise) {
            content.then(source => {
                this.#render(JSON.stringify(source, null, 4))
            })
        } else {
            this.#render(
                typeof content === 'string' 
                    || typeof content === 'number' 
                ? content.toString() 
                : JSON.stringify(content)
            )
        }
    }

    setHeader(key, value) {
        return (this.header.append(key, value), this);
    }

    #render(content) {
        document.querySelector(this.container.config.cview.join).innerHTML = content
    }

    /**
     * 
     * @param {string|object|Array<any>} content 
     * @param {string} contentType 
     * @param {number} codeStatus 
     * @returns {Response|Request}
     */
    #createHTTP(content, contentType, codeStatus = this.code) {
        this.setHeader('Content-Type', contentType)
        .setHeader('Status', codeStatus);

        if (typeof content === 'string') {
            if (!content.endsWith('.json') || !content.includes('/')) {
                content = [content];
            } else {
                return new Request(content, {
                    headers: this.header,
                    method: 'GET',
                })
            }
        }

        return content;
    }

    /**
     * 
     * @param {string} file 
     * @param {Object} data 
     */
    view(file, data = {}) {
        this.container.view.innerContent(file, data);
    }
}