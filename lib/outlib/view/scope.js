"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_text_script = get_text_script;
exports.get_style = get_style;
exports.add_styles = add_styles;

var _simpleCssParser = _interopRequireDefault(require("./simple-css-parser.js"));

/**
 * 
 * @param {HTMLElement} node 
 * @return {string}
 */
function get_text_script(node) {
  var sc = node.querySelector('script') || {};
  if (typeof sc.remove === 'function') sc.remove();
  return sc.innerText || '';
}
/**
 * 
 * @param {HTMLElement} node
 * @return {object}
 */


function get_style(node) {
  var st = node.querySelector('style[scope]') || {};
  if (typeof st.remove === 'function') st.remove();
  return _simpleCssParser["default"].parse(st.innerText || '');
}
/**
 * @since 0.3.0
 * @param {HTMLElement} node 
 * @param {object} styles
 */


function add_styles(node, styles) {
  var _loop = function _loop(selector) {
    var select_nodes = node.querySelectorAll(selector);

    if (select_nodes.length > 0) {
      select_nodes.forEach(function (elm) {
        for (var property in styles[selector]) {
          elm.style[property] = styles[selector][property];
        }
      });
    }
  };

  for (var selector in styles) {
    _loop(selector);
  }
}