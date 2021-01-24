"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStructList = getStructList;
exports.scopeCode = scopeCode;
exports.createSetToCompile = createSetToCompile;
exports.todo = void 0;

var _error = require("./error.js");

/**
 * @typedef {object} ScopeType
 * @property {string} called nombre de la propiedad que es llamada
 * @property {boolean} local dato definido por global o del template llamado
 */

/**
 * @typedef {object} EvaluatorType
 * @property {string} type
 * @property {ScopeType} scope
 * @property {string|object} evaluate
 */

/**
 * @typedef {object} CompilerDirective
 * @property {HTMLElement} node nombre de la propiedad que es llamada
 * @property {Set.<EvaluatorType>} directives dato definido por global o del template llamado
 */
var todo = [];
/** ayuda a prevenir a iterar el mismo nodo al usar la directiva @for */

exports.todo = todo;
getStructList.ignoreChild = false;
/**
 * 
 * @param {NodeListOf} childs
 * @return {Array.<CompilerDirective>}
 */

function getStructList(childs) {
  var arr = [];
  childs.forEach(function (child) {
    if (child.attributes) {
      arr.push({
        d: createSetToCompile(child),
        c: function () {
          if (getStructList.ignoreChild) {
            getStructList.ignoreChild = false;
            return [];
          }

          return getStructList(child.childNodes);
        }()
      });
    }
  });
  exports.todo = todo = todo.concat(arr);
  return arr;
}
/**
 * @since 0.3.0
 * @param {string} $var 
 * @return {ScopeType}
 */


function scopeCode($var) {
  var scope = {
    called: $var,
    local: false
  };

  if ($var.charAt(0) === '{') {
    scope = {
      called: $var.replace(/[\{|\}]/g, ''),
      local: true
    };
  }

  return scope;
}
/**
 * @version 0.3.0
 * @since 0.3.1
 * @param {HTMLElement} node de entrada
 * @return {CompilerDirective}
 */


function createSetToCompile(node) {
  var set = new Set();

  for (var index = 0, attrs = Object.values(node.attributes), attr; index < attrs.length; index++) {
    attr = attrs[index];

    if (attr.name === '@if') {
      set.add({
        type: 'if',
        scope: scopeCode(attr.value)
      });
    }

    if (attr.name === '@for') {
      var c3 = attr.value.split(' '); // numero de argumentos validos

      (0, _error.vw_error)((0, _error.vw_args)(c3, 3), 'num args not match'); // retorna el tipo de itaracion de valor deseado. en caso de error genera una excepcion

      var kwd = (0, _error.kw_find)('of', 1, c3) ? 'of' : (0, _error.kw_find)('in', 1, c3) ? 'in' : (0, _error.vw_error)(true, 'syntax error');
      set.add({
        type: 'for',
        scope: scopeCode(c3[2]),
        evaluate: {
          keyword: kwd,
          name_var: c3[0]
        }
      });
    }

    if (attr.name === ':bind') {
      var split_key = attr.value.split('.'),
          scope = scopeCode(split_key.shift());
      set.add({
        scope: scope,
        type: 'bind',
        evaluate: split_key
      });
    }

    if (/\@event\:(.*)$/.test(attr.name)) {
      set.add({
        type: 'event',
        scope: scopeCode(attr.value),
        evaluate: attr.name.split(':').filter(function (e) {
          return !(e[0] === '@');
        })
      });
    }
  }

  return {
    node: node,
    directives: set
  };
}