"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCache = addCache;
exports.isCaching = isCaching;
exports.getCache = getCache;
exports.getCacheAll = getCacheAll;
exports.addCachedItems = addCachedItems;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var cache_files = {};

var CacheSystem =
/**
 * 
 * @param {string} source
 */
function CacheSystem(source, dom) {
  (0, _classCallCheck2["default"])(this, CacheSystem);
  this.source = source;
  this.parsed_element = dom;
};
/**
 * @param {string} file
 * @param {string} source
 */


function addCache(file, source, parsed_element) {
  cache_files[file] = new CacheSystem(source, parsed_element);
}
/**
 * @param {string} file
 * @return {boolean}
 */


function isCaching(file) {
  return file in cache_files;
}
/**
 * @param {string} file
 * @throws {Error}
 * @return {CacheSystem}
 */


function getCache(file) {
  if (!isCaching(file)) throw new Error("cache file ".concat(file, " not fount"));
  return cache_files[file];
}
/**
 * @return {object}
 */


function getCacheAll() {
  return cache_files;
}
/**
 * remueve los elementos de la vista a actual
 * para almacenar los nodos fuera de la vista
 * @param {string} key clave de la cache
 * @param {HTMLElement} root nodo principal
 */


function addCachedItems(key, root) {
  var sys = getCache(key);

  for (var i = 0; 0 < root.childNodes.length; i++) {
    sys.parsed_element.appendChild(root.childNodes[0]);
  }
}