/**
 * @file save class inside container
 * @since 0.1.1 
 * @version 0.1.1
 **/


/**
 * @type {Object}
 */
const container = {}

/**
 * 
 * @param {String} key 
 * @return {boolean}
 */
function keyExists(key) {
    return key in container ? true : false;
}

/**
 * 
 * @param {String} key 
 * @param {Function} fn 
 */
function defineProperty(key, fn) {
    let cl = fn;

    Object.defineProperty(container, key, {
        enumerable: false,
        configurable: false,
        get: function () {
            if (typeof cl == 'function') {
                cl = cl(container);
            }
            return cl;
        }
    });
}

/**
 * 
 * @param {string} key 
 * @param {Function} fn 
 */
export function setContainer(key, fn) {
    if (keyExists(key)) {
        throw new Error(`key ${key} is registered`);
    }

    defineProperty(key, fn);
}

/**
 * @return {Object}
 */
export function getContainer() {
    return container;
}