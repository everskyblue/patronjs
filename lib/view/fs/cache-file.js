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