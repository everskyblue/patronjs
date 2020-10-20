const cache_files = {};

class CacheSystem {
    /**
     * 
     * @param {string} source
     */
    constructor(source, dom) {
        this.source = source;
        this.parsed_element = dom;
    }
}

/**
 * @param {string} file
 * @param {string} source
 */
export function addCache(file, source, parsed_element) {
    cache_files[file] = new CacheSystem(source, parsed_element);
}

/**
 * @param {string} file
 * @return {boolean}
 */
export function isCaching(file) {
    return (file in cache_files);
}

/**
 * @param {string} file
 * @throws {Error}
 * @return {CacheSystem}
 */
export function getCache(file) {
    if (!isCaching(file)) throw new Error(`cache file ${file} not fount`);
    return cache_files[file];
}

/**
 * @return {object}
 */
export function getCacheAll() {
    return cache_files;
}

/**
 * remueve los elementos de la vista a actual
 * para almacenar los nodos fuera de la vista
 * @param {string} key clave de la cache
 * @param {HTMLElement} root nodo principal
 */
export function addCachedItems(key, root) {
    const sys = getCache(key);
    for (let i = 0; 0 < root.childNodes.length; i++) {
        sys.parsed_element.appendChild(root.childNodes[0])
    }
}