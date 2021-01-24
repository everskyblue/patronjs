"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set_scope_styles = set_scope_styles;
exports.updateProps = updateProps;
exports.parse = parse;

var _evaluate = require("./evaluate.js");

var _scope = require("./scope.js");

var _analyzer = require("./analyzer.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * @since 0.3.0
 * @param {HTMLElement} node 
 * @param {object} styles
 */
function set_scope_styles(node, styles) {
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
/**
 * @since 0.4.0
 * @param {object} data 
 * @return {object}
 */


function updateProps(data) {
  var newdata = {};
  Object.keys(data).forEach(function (key) {
    (function (key) {
      Object.defineProperty(newdata, key, {
        configurable: true,
        enumerable: true,
        get: function get() {
          return data[key];
        },
        set: function set(newValue) {
          data[key] = newValue;

          var din = _analyzer.todo.filter(function (r) {
            var passed = false;

            var _iterator = _createForOfIteratorHelper(r.d.directives.values()),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var o = _step.value;

                if (o.scope.called === key) {
                  if (o.type === 'for') {
                    while (r.d.node.nodeName === r.d.node.nextSibling.nodeName) {
                      r.d.node.nextSibling.remove();
                    }
                  }

                  passed = true;
                  break;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return passed;
          });

          (0, _evaluate.output)(din, newdata);
        }
      });
    })(key);
  });
  return newdata;
}
/**
 * @since 0.3.0
 * @param {string} content source
 * @param {object} data
 * @return {NodeList}
 */


function parse(content, data) {
  var node = document.createElement('div');
  node.innerHTML = content;
  var script = (0, _scope.get_text_script)(node),
      // obtener un objecto de estilos
  styles = (0, _scope.get_style)(node); // añadir codigo a evaluar

  (0, _evaluate.setEvaluatorCode)(script, data = updateProps(data)); // compilar

  var struct = (0, _analyzer.getStructList)(node.childNodes); // salida de vista

  (0, _evaluate.output)(struct, data); // añadir estilos

  set_scope_styles(node, styles);
  return node;
}