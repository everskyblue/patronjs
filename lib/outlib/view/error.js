"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vw_error = vw_error;
exports.bind_error = bind_error;
exports.vw_args = vw_args;
exports.kw_find = kw_find;

/**
 * 
 * @param {boolean} is_error
 * @param {string} msg
 * @throws {Error}
 */
function vw_error(is_error, msg) {
  if (is_error) throw new Error(msg);
}
/**
 * 
 * @param {string} key property of the data
 * @param {object} data
 * @return {boolean}
 */


function bind_error(key, data) {
  return !(key in data);
}
/**
 * 
 * @param {Array} args 
 * @param {number} num_args 
 * @return {boolean}
 */


function vw_args(args, num_args) {
  return args.length !== num_args;
}
/**
 * 
 * @param {string} key reserver word
 * @param {number} pos position key
 * @param {array} data entry execution
 * @return {boolean}
 */


function kw_find(key, pos, data) {
  return data[pos].trim() === key;
}