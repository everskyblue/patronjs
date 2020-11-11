"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setEvaluatorCode = setEvaluatorCode;
exports.evaluateAndGetCode = evaluateAndGetCode;
exports.output = output;
exports.call_directives = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _analyzer = require("./analyzer.js");

var _error = require("./error.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var $__eval_js,
    $___eval_params = {},
    $__eval_data = {};
/**
 * @returns {ReferenceError|any}
 */

function evaluate() {
  try {
    var _Function;

    return (_Function = (0, _construct2["default"])(Function, ['$data'].concat((0, _toConsumableArray2["default"])(Object.keys($___eval_params)), Array.prototype.slice.call(arguments)))).call.apply(_Function, [null, $___eval_params].concat((0, _toConsumableArray2["default"])(Object.values($___eval_params))));
  } catch (e) {
    return e;
  }
}
/**
 * 
 * @param {string} var_name 
 * @param {boolena} is_local 
 * @returns {any}
 */


function getValue(var_name, is_local) {
  return is_local ? getCodeOrThrowError(var_name) : $___eval_params[var_name];
}
/**
 * @since 0.3.0
 * @param {string} reference_code 
 * @throws {Error}
 * @returns {any}
 */


function getCodeOrThrowError(reference_code) {
  var $any = evaluateAndGetCode(reference_code);

  if ($any instanceof Error) {
    throw $any;
  }

  return $any;
}
/**
 * @param {array|object} data
 * @param {array} keys 
 */


function convertValue(data, keys) {
  var x = 0,
      key = keys[x];

  while (typeof key !== 'undefined' && (0, _typeof2["default"])(data) === 'object') {
    (0, _error.vw_error)((0, _error.bind_error)(key, data), "variable or property ".concat(keys.join('.'), " not find"));
    data = data[key];
    key = keys[++x];
  }

  return ['object', 'array'].indexOf((0, _typeof2["default"])(data)) >= 0 ? JSON.stringify(data) : data;
}
/**
 * @param {string} code 
 * @param {object} scope_params
 */


function setEvaluatorCode(code, scope_params) {
  $__eval_js = code;
  scope_params && ($___eval_params = scope_params);
}
/**
 * @param {string} to_eval 
 * @return {any}
 */


function evaluateAndGetCode(to_eval) {
  if (to_eval in $__eval_data && !!$__eval_data[to_eval]) return $__eval_data[to_eval];
  return $__eval_data[to_eval] = evaluate("\"use strict\";".concat($__eval_js, "\n return ").concat(to_eval.replace(/[\{\}]/g, '')));
}

var call_directives = {
  /**
   * @param {object} scope
   * @param {any} evaludate
   * @param {HTMLElement} node
   * @param {array} data
   */
  'bind': function bind(scope, evaluate, node, data) {
    var orginal_data = $___eval_params;
    $___eval_params = data;
    node[node.attributes.getNamedItem('escape') ? 'innerText' : 'innerHTML'] = convertValue(getValue(scope.called, scope.local), evaluate);
    $___eval_params = orginal_data;
  },

  /**
   * @param {object} scope
   * @param {any} evaluate
   * @param {HTMLElement} node
   * @param {array} data
   */
  'for': function _for(scope, evaluate, node, data, directives) {
    var iterate_data = getValue(scope.called, scope.local, data); // crear un ojecto para generar un nuevo scope de variable para los elementos html

    var new_data = JSON.parse("{\"".concat(evaluate.name_var, "\": \"\"}")),
        after_node = node; // crea una nueva copia para que no haya conflictos

    var directive = {
      c: [],
      d: {
        directives: new Set((0, _toConsumableArray2["default"])(directives.values()))
      }
    };

    for (var idx = 1, clone; idx < iterate_data.length; idx++) {
      clone = node.cloneNode(true);
      new_data[evaluate.name_var] = iterate_data[idx];
      new_data = Object.assign(new_data, data);
      directive.d.node = clone;
      directive.d.directives.forEach(function (set) {
        if (set.type === 'for') {
          directive.d.directives["delete"](set);
        }
      });
      output([directive], new_data);
      output((0, _analyzer.getStructList)(clone.childNodes), new_data);
      after_node.insertAdjacentElement('afterend', clone);
      after_node = clone;
    }

    new_data[evaluate.name_var] = iterate_data[0];
    return new_data;
  },

  /**
   * @param {object} scope
   * @param {array} events
   * @param {HTMLElement} node
   * @param {array} data
   */
  'event': function event(scope, events, node) {
    var fn = getValue(scope.called, scope.local);

    var _iterator = _createForOfIteratorHelper(events),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var event = _step.value;
        node.addEventListener(event, fn);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },

  /**
   * @param {object} scope
   * @param {any} evaludate
   * @param {HTMLElement} node
   */
  'if': function _if(scope, _evaluate, node) {
    var is_true = getValue(scope.called, scope.local);

    if (!is_true) {
      node.style.display = 'none';
    }

    return is_true;
  }
};
/**
 * 
 * @param {array} structs 
 * @param {object} data
 */

exports.call_directives = call_directives;

function output(structs, data) {
  structs.forEach(function (struct) {
    var c = struct.c;
    var d = struct.d;
    /**@type {boolean|object} */

    var passed,
        merge_data = {};

    var _iterator2 = _createForOfIteratorHelper(d.directives),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var directive = _step2.value;
        passed = call_directives[directive.type](directive.scope, directive.evaluate, d.node, data, d.directives);

        if (passed === false) {
          return false;
        } else if ((0, _typeof2["default"])(passed) === 'object') {
          merge_data = Object.assign(merge_data, passed);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    output(c, Object.keys(merge_data).length ? Object.assign(merge_data, data) : data);
  });
}