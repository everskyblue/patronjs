(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jspatron_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* import URLStateCapture from "jspatron/url-state";

import app from "./routes.js";

try {
    const evt = new URLStateCapture();

    /**
     * hash change
     */

/*   evt.state(app.run(evt))
} catch (e) {
   app.handlerError(e);
} */
;
console.log(jspatron_route__WEBPACK_IMPORTED_MODULE_0__.default);

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Route
/* harmony export */ });
/* harmony import */ var _route_pattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
;
/**
 * @class
 * @version 0.1.0
 * @property {RoutePattern} pattern
 * @property {String} _group
 * @property {Array} actions
 */

class Route {
  /**
   * @constructor
   */
  constructor() {
    this._group = '';
    this.pattern = new _route_pattern_js__WEBPACK_IMPORTED_MODULE_0__.default();
    this.actions = [];
  }
  /**
   * 
   * @param {String} url 
   * @param {Function} fn 
   */


  group(url, fn) {
    this._group = url;
    if (!url.endsWith('/')) this._group += '/';
    fn(this);
    this._group = '';
  }
  /**
   * define route
   * @param {String} url 
   * @param {Function} option 
   * @param {String} method
   */


  hash(url, option, method) {
    const path = this.pattern.resolverCondition(this._group + url);
    this.actions.push({
      path,
      option,
      method
    });
  }

}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ RoutePattern
/* harmony export */ });
/**
 * @version 0.1.0
 */
class RoutePattern {
  /**
   * @constructor
   */
  constructor() {
    this.lower = 'a-z';
    this.upper = 'A-Z';
    this.number = '0-9';
    this.string = 'a-zA-Z_';
    this.simple = 'a-zA-Z0-9_\-';
    this.search = '{(.*?)}';
  }
  /**
   * 
   * @param {String} ndl url
   * @return {Object}
   */


  resolverCondition(ndl) {
    let rgx = new RegExp(this.search, 'g'),
        f;
    let data = [];
    /**
     * capturar las coincidencias
     */

    while ((f = rgx.exec(ndl)) !== null) {
      let expression = f.shift();
      let params = f.shift().split(/([a-zA-Z\_]+?)\:/g).filter(e => e != ''),
          name_param = params.shift();
      let find_option = params.findIndex(value => {
        return ['lower', 'upper', 'number', 'string'].indexOf(value) >= 0 || value.indexOf('regx(') === 0;
      }) === 0;

      if (params.length && !find_option) {
        throw new Error(`url no valida ${ndl}`);
      }
      /**
       * reemplazar por los valores requerido
       */


      params.forEach((key, pos) => {
        switch (key) {
          case 'lower':
            params[pos] = this.lower;
            break;

          case 'upper':
            params[pos] = this.upper;
            break;

          case 'number':
            params[pos] = this.number;
            break;

          default:
            if (key.indexOf('regx(') === 0) {
              key = key.replace('regx(', '');
              params[pos] = key.substring(0, key.length - 1);
            } else {
              params[pos] = this.simple;
            }

            break;
        }
      }); // si no hay claves de parametros se añade la expresion por defecto

      if (params.length === 0) params[0] = this.simple;
      data.push({
        expression,
        name_param,
        params
      });
    }

    const data_route = {
      url: ndl,
      name_params: []
    };
    data.forEach(exp => {
      data_route.url = ndl = ndl.replace(exp.expression, '([' + exp.params.join('') + ']+)');
      data_route.name_params.push(exp.name_param);
    });
    return data_route;
  }

}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })()
;
});