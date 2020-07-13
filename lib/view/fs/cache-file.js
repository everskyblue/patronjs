const cache_files = {};

class CacheSystem {
    constructor(source) {
        this.source = source;
        this.elements = [];
    }
}

/**
 * @param {string} file
 * @param {string} source
 */
export function addCache(file, source) {
    if (!isCaching(file)) {
        cache_files[file] = new CacheSystem(source);
    }
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