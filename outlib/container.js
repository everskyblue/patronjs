"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setContainer = setContainer;
exports.getContainer = getContainer;

/**
 * @file save class inside container
 * @since 0.1.1 
 * @version 0.1.1
 **/

/**
 * @type {Object}
 */
var container = {};
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
  var cl = fn;
  Object.defineProperty(container, key, {
    enumerable: false,
    configurable: false,
    get: function get() {
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


function setContainer(key, fn) {
  if (keyExists(key)) {
    throw new Error("key ".concat(key, " is registered"));
  }

  defineProperty(key, fn);
}
/**
 * @return {Object}
 */


function getContainer() {
  return container;
}