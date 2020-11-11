(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _patron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Patron", function() { return _patron__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _url_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "URLStateCapture", function() { return _url_state__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Patron; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _container_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _http_cookie_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _http_request_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _http_response_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* harmony import */ var _route_route_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(16);
/* harmony import */ var _view_view_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(18);
/* harmony import */ var _route_dispatcher_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(38);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(13);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }









/**
 * 
 * @param {Object} config 
 */

function register(config) {
  Object(_container_js__WEBPACK_IMPORTED_MODULE_5__["setContainer"])('view', function ()
  /*container*/
  {
    return new _view_view_js__WEBPACK_IMPORTED_MODULE_10__["View"](new _view_view_js__WEBPACK_IMPORTED_MODULE_10__["ViewConfig"](config.cview));
  });

  Object(_container_js__WEBPACK_IMPORTED_MODULE_5__["setContainer"])('cookie', function () {
    return new _http_cookie_js__WEBPACK_IMPORTED_MODULE_6__["default"]();
  });

  Object(_container_js__WEBPACK_IMPORTED_MODULE_5__["setContainer"])('request', function () {
    return new _http_request_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
  });

  Object(_container_js__WEBPACK_IMPORTED_MODULE_5__["setContainer"])('response', function (container) {
    return new _http_response_js__WEBPACK_IMPORTED_MODULE_8__["default"](container);
  });
}
/**
 * @class
 * @version 0.1.0
 */


var Patron = /*#__PURE__*/function (_Route) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(Patron, _Route);

  var _super = _createSuper(Patron);

  /**
   * 
   * @param {Object} config 
   */
  function Patron(config) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Patron);

    _this = _super.call(this);
    _this.debug = config.debug;
    Object(_helpers_js__WEBPACK_IMPORTED_MODULE_12__["setUtilLocation"])(config.base_url, config.assets_location);
    register(config);
    return _this;
  }
  /**
   * 
   * @param {String} key 
   * @param {Function} func 
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Patron, [{
    key: "setContainer",
    value: function setContainer(key, func) {
      Object(_container_js__WEBPACK_IMPORTED_MODULE_5__["setContainer"])(key, func);
    }
    /**
     * 
     * @param {HRequest} request 
     * @return {Dispacther}
     */

  }, {
    key: "run",
    value: function run(request) {
      /**
       * @type {Dispacther}
       */
      var dispatcher = _route_dispatcher_js__WEBPACK_IMPORTED_MODULE_11__["default"].createInstance(this, request);
      dispatcher.send();
      return dispatcher;
    }
    /**
     * @param {Error} e
     */

  }, {
    key: "handlerError",
    value: function handlerError(e) {
      if (this.debug) Object(_helpers_js__WEBPACK_IMPORTED_MODULE_12__["template_logger"])(e);
    }
    /**
     * @return {Object}
     */

  }, {
    key: "container",
    get: function get() {
      return Object(_container_js__WEBPACK_IMPORTED_MODULE_5__["getContainer"])();
    }
  }]);

  return Patron;
}(_route_route_js__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),
/* 2 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(5);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(7);

var assertThisInitialized = __webpack_require__(8);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContainer", function() { return setContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContainer", function() { return getContainer; });
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

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cookie; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



/**
 * @version 0.1.0
 */
var Cookie = /*#__PURE__*/function () {
  /**
   * @constructor
   */
  function Cookie() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Cookie);

    this.expires = null;
    this.path = location.path;
    this.domain = location.hostname;
    this.secure = null;
    this.max_age = null;
    this.samesite = null;
    this.values = this.getValues();
  }
  /**
   * 
   * @param {string} key 
   * @param {string} value 
   * @param {object} options 
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Cookie, [{
    key: "add",
    value: function add(key, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var sc = "".concat(key, "=").concat(value);

      for (var kopt in options) {
        sc += ";".concat(kopt, "=").concat(options[kopt]);
      }

      document.cookie = sc;
    }
    /**
     * 
     * @param {string} key 
     */

  }, {
    key: "remove",
    value: function remove(key) {
      document.cookie = key + '=;expires=' + new Date('-1').toUTCString();
    }
    /**
     * @returns {object}
     */

  }, {
    key: "getValues",
    value: function getValues() {
      var vals = {},
          rv,
          rgx = /([\w]+)\s*\=\s*([^;]*)/g;

      while ((rv = rgx.exec(document.cookie)) !== null) {
        vals[rv[1]] = rv[2];
      }

      return vals;
    }
    /**
     * 
     * @param {string} key
     * @return {any}
     */

  }, {
    key: "getValue",
    value: function getValue(key) {
      return this.getValues()[key];
    }
  }]);

  return Cookie;
}();



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HRequest; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);



/**
 * @version 0.1.0
 */

var HRequest = /*#__PURE__*/function () {
  /**
   * @constructor
   */
  function HRequest() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HRequest);

    this.port = Number(location.port || 80);
    this.host = location.hostname;
    this.params = {};
    this.search = this.getQuerySearch();
    this.agent = navigator.userAgent;
  }
  /**
   * @return {object}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HRequest, [{
    key: "getQuerySearch",
    value: function getQuerySearch() {
      var search = decodeURI(location.search),
          params = {};

      if (search.startsWith('?', 0)) {
        search = search.substring(1);
      }

      search.split('&', function (q) {
        var split = q.split('=');
        params[split[0]] = split[1];
      });
      return params;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "isHTTP",
    value: function isHTTP() {
      return location.protocol.replace(':') === 'http';
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "isHTTPS",
    value: function isHTTPS() {
      return location.protocol.replace(':') === 'https';
    }
    /**
     * @return {string}
     */

  }, {
    key: "url",
    get: function get() {
      return location.href;
    }
  }, {
    key: "hash",
    get: function get() {
      var url = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_2__["parse_url"])(location.hash.substr(1) || '/');
      return url.pathname;
    }
  }]);

  return HRequest;
}();



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUtilLocation", function() { return setUtilLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pregQuote", function() { return pregQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "match_url", function() { return match_url; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse_url", function() { return parse_url; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load_assets", function() { return load_assets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comparator", function() { return comparator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "page_not_fount", function() { return page_not_fount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "template_logger", function() { return template_logger; });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var base_url, assets_location;
function setUtilLocation(ubase, lassets) {
  base_url = ubase;
  assets_location = lassets;
}
/**
 *
 * @param {string} str
 * @param {string} rpl
 * @returns {string}
 */

function pregQuote(str, rpl) {
  if (str.match(/\//g) !== null) {
    str = String(str).replace(new RegExp('[.\\\*$=!<>|\\' + (rpl || '') + ']', 'g'), '\\$&');
  }

  return str;
}
/**
 *
 * @param {string} url
 * @param {string} compare
 */

function match_url(url, compare) {
  var rgx = new RegExp(pregQuote(url, '/') + '/?$');
  var f = rgx.exec(compare);
  return f && f.shift() === f.input ? f : false;
}
/**
 *
 * @param {string} url
 * @return {URL}
 */

function parse_url(url) {
  return new URL(url, base_url);
}
/**
 *
 * @param {string} type
 * @param {Array} files
 */

function load_assets(type, files) {
  var root = assets_location[type];

  var _iterator = _createForOfIteratorHelper(files),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var file = _step.value;
      var e = void 0;

      if (type === 'css') {
        e = document.createElement('link');
        e.href = "".concat(base_url).concat(root).concat(file, ".css");
        e.rel = 'stylesheet';
        document.head.appendChild(e);
      } else if (type === 'js') {
        e = document.createElement('script');
        e.src = "".concat(base_url).concat(root).concat(file, ".js");
        document.body.appendChild(e);
      }

      if (!!e) e.setAttribute('data-remove', true);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function comparator(value, operator, to) {
  switch (operator) {
    case '==':
      return value === to;

    case '!=':
      return value !== to;

    case '>':
      return value > to;

    case '<':
      return value < to;

    case '>=':
      return value >= to;

    case '<=':
      return value <= to;
  }

  throw new ReferenceError("operator ".concat(operator, " no es valido"));
}
/**
 * @type {HTMLIFrameElement}
 */

var page_not_fount = document.createElement('iframe');
page_not_fount.allow = 'fullscreen';
page_not_fount.width = '100%';
page_not_fount.height = '100%';
page_not_fount.src = '/public/404.html';
page_not_fount.style.position = 'absolute';
page_not_fount.style.border = '0';
page_not_fount.style.zIndex = '100';
var style_log = "\n<style>\nh2.err-msg {\n    background: #3F51B5;\n    padding: 10px;\n    color: #d5e812;\n}\nh4{\n    font-size: xx-large;\n    margin-bottom: 10px;\n}\n.err-stacks {\n    padding: 10px;\n    line-height: 25px;\n}\n.stack {\n    border: 5px dashed #c72e2e;\n    padding: 10px;\n    color: #0e3ce4;\n    text-decoration: underline;\n    border-style: double;\n    counter-reset: errs;\n}\n.stack > div:before {\n    counter-increment: errs;\n    content: counters(errs,\".\") \" \";\n}\n</style>\n";
/**
 * 
 * @param {Error} e 
 */

function template_logger(e) {
  var errs = e.stack.split('\n');
  var msg = "<h2 class=\"err-msg\">".concat(errs.shift(), "</h2>");
  var stacks = "\n        <div class=\"err-stacks\">\n            <h4>Stacks:</h4>\n            <div class=\"stack\">";

  var _iterator2 = _createForOfIteratorHelper(errs),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _err = _step2.value;
      stacks += "<div>".concat(_err.trim(), "</div>");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  stacks += '</div></div>';
  document.title = 'error application';
  document.body.innerHTML = "".concat(style_log, "\n<div class=\"debug\">").concat(msg).concat(stacks, "</div>");
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HResponse; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _status_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


/**
 * @version 0.1.0
 */

var HResponse = /*#__PURE__*/function (_Status) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(HResponse, _Status);

  var _super = _createSuper(HResponse);

  /**
   * @constructor
   * @param {object} container 
   */
  function HResponse(container) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HResponse);

    _this = _super.call(this);
    _this.container = container;
    return _this;
  }
  /**
   * 
   * @param {string} key 
   * @param {any} value 
   * @param {Object} options 
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(HResponse, [{
    key: "signedCookie",
    value: function signedCookie(key, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.container.cookie.add(key, value, options);
    }
    /**
     * 
     * @param {string} file 
     * @param {Object} data 
     */

  }, {
    key: "view",
    value: function view(file) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.container.view.render(file, data);
    }
  }]);

  return HResponse;
}(_status_js__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS", function() { return STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInfo", function() { return isInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSuccess", function() { return isSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRedirection", function() { return isRedirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isServerError", function() { return isServerError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isClientError", function() { return isClientError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exists_status", function() { return exists_status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMessageStatus", function() { return getMessageStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOK", function() { return isOK; });
var STATUS = {
  // 1xx Informational
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  // 2xx Success
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  // 3xx Redirection
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  306: 'Switch Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  // 4xx Client Error
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  421: 'There are too many connections from your internet address',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Unordered Collection',
  426: 'Upgrade Required',
  429: 'Too Many Requests',
  449: 'Retry With',
  450: 'Blocked by Windows Parental Controls',
  498: 'Invalid or expired token',
  // 5xx Server Error
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended',
  511: 'Network Authentication Required',
  530: 'User access denied'
};
function isInfo() {
  return this.code >= 100 && this.code <= 102;
}
function isSuccess() {
  return this.code >= 200 && this.code <= 207;
}
function isRedirection() {
  return this.code >= 300 && this.code <= 308;
}
function isServerError() {
  return this.code >= 400 && this.code <= 498;
}
function isClientError() {
  return this.code >= 500 && this.code <= 530;
}
function exists_status(code) {
  return code in STATUS;
}
function getMessageStatus(code) {
  if (!exists_status(code)) {
    throw new Error("code ".concat(code, " status no exists"));
  }

  return status[code];
}
function isOK() {
  return this.code === 200;
}

function Status() {
  this.code = 200;
}

Status.prototype = {
  STATUS: STATUS,
  isOK: isOK,
  isInfo: isInfo,
  isSuccess: isSuccess,
  isClientError: isClientError,
  isRedirection: isRedirection,
  isServerError: isServerError,
  getMessageStatus: getMessageStatus
};
/* harmony default export */ __webpack_exports__["default"] = (Status);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Route; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _route_pattern_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);



/**
 * @class
 * @version 0.1.0
 * @property {RoutePattern} pattern
 * @property {String} _group
 * @property {Array} actions
 */

var Route = /*#__PURE__*/function () {
  /**
   * @constructor
   */
  function Route() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Route);

    this._group = '';
    this.pattern = new _route_pattern_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.actions = [];
  }
  /**
   * 
   * @param {String} url 
   * @param {Function} fn 
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Route, [{
    key: "group",
    value: function group(url, fn) {
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

  }, {
    key: "hash",
    value: function hash(url, option, method) {
      var path = this.pattern.resolverCondition(this._group + url);
      this.actions.push({
        path: path,
        option: option,
        method: method
      });
    }
  }]);

  return Route;
}();



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RoutePattern; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



/**
 * @version 0.1.0
 */
var RoutePattern = /*#__PURE__*/function () {
  /**
   * @constructor
   */
  function RoutePattern() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RoutePattern);

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


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RoutePattern, [{
    key: "resolverCondition",
    value: function resolverCondition(ndl) {
      var _this = this;

      var rgx = new RegExp(this.search, 'g'),
          f;
      var data = [];
      /**
       * capturar las coincidencias
       */

      var _loop = function _loop() {
        var expression = f.shift();
        var params = f.shift().split(/([a-zA-Z\_]+?)\:/g).filter(function (e) {
          return e != '';
        }),
            name_param = params.shift();
        var find_option = params.findIndex(function (value) {
          return ['lower', 'upper', 'number', 'string'].indexOf(value) >= 0 || value.indexOf('regx(') === 0;
        }) === 0;

        if (params.length && !find_option) {
          throw new Error("url no valida ".concat(ndl));
        }
        /**
         * reemplazar por los valores requerido
         */


        params.forEach(function (key, pos) {
          switch (key) {
            case 'lower':
              params[pos] = _this.lower;
              break;

            case 'upper':
              params[pos] = _this.upper;
              break;

            case 'number':
              params[pos] = _this.number;
              break;

            default:
              if (key.indexOf('regx(') === 0) {
                key = key.replace('regx(', '');
                params[pos] = key.substring(0, key.length - 1);
              } else {
                params[pos] = _this.simple;
              }

              break;
          }
        }); // si no hay claves de parametros se añade la expresion por defecto

        if (params.length === 0) params[0] = _this.simple;
        data.push({
          expression: expression,
          name_param: name_param,
          params: params
        });
      };

      while ((f = rgx.exec(ndl)) !== null) {
        _loop();
      }

      var data_route = {
        url: ndl,
        name_params: []
      };
      data.forEach(function (exp) {
        data_route.url = ndl = ndl.replace(exp.expression, '([' + exp.params.join('') + ']+)');
        data_route.name_params.push(exp.name_param);
      });
      return data_route;
    }
  }]);

  return RoutePattern;
}();



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewConfig", function() { return ViewConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View", function() { return View; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _read_file_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(36);
/* harmony import */ var _fs_cache_file_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(37);







/**
 * @class
 * @since 0.2.6
 */

var ViewConfig =
/**
 * @constructor
 * @param {String} path
 * @param {String} ext
 * @param {String} join element where in view
 */
function ViewConfig(_ref) {
  var _ref$path = _ref.path,
      path = _ref$path === void 0 ? '' : _ref$path,
      _ref$ext = _ref.ext,
      ext = _ref$ext === void 0 ? '.html' : _ref$ext,
      _ref$join = _ref.join,
      join = _ref$join === void 0 ? '' : _ref$join,
      _ref$isCaching = _ref.isCaching,
      isCaching = _ref$isCaching === void 0 ? true : _ref$isCaching;

  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ViewConfig);

  this.path = path;
  this.id_element = join;
  this.extension = ext;
  this.cache = isCaching;
};
/**
 * @class
 * @version 0.1.1
 * @typedef {View} ViewDef
 * @property {String} path
 * @property {HTMLElement} elm_container
 * @property {String} extension
 * @property {Object} data
 */

var View = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {ViewConfig} viewConfig
   */
  function View(viewConfig) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, View);

    this.config = viewConfig;
    this.abs_file = null;
  }
  /**
   * @async
   * @param {String} file
   * @return {Promise}
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(View, [{
    key: "getContent",
    value: function () {
      var _getContent = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(file, data) {
        var res, dom;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.abs_file = this.getRootFile(file);

                if (!(this.config.cache && Object(_fs_cache_file_js__WEBPACK_IMPORTED_MODULE_6__["isCaching"])(this.abs_file))) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", Object(_fs_cache_file_js__WEBPACK_IMPORTED_MODULE_6__["getCache"])(this.abs_file));

              case 3:
                _context.next = 5;
                return Object(_read_file_js__WEBPACK_IMPORTED_MODULE_5__["default"])(this.abs_file);

              case 5:
                res = _context.sent;

                if (!res.error) {
                  _context.next = 8;
                  break;
                }

                throw new Error('file not fount');

              case 8:
                dom = Object(_render_js__WEBPACK_IMPORTED_MODULE_4__["parse"])(res.content, data);
                Object(_fs_cache_file_js__WEBPACK_IMPORTED_MODULE_6__["addCache"])(this.abs_file, res.content, dom);
                return _context.abrupt("return", Object(_fs_cache_file_js__WEBPACK_IMPORTED_MODULE_6__["getCache"])(this.abs_file));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getContent(_x, _x2) {
        return _getContent.apply(this, arguments);
      }

      return getContent;
    }()
    /**
     * @param {String} file
     * @param {Object} data
     * @return {Promise<HTMLElement>}
     */

  }, {
    key: "render",
    value: function () {
      var _render = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(file, data) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.getContent(file, data));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function render(_x3, _x4) {
        return _render.apply(this, arguments);
      }

      return render;
    }()
    /**
     * @since 0.1.1
     * @param {string} content
     */

  }, {
    key: "innerContent",
    value: function innerContent(content) {
      this.elm_container.textContent = content;
    }
    /**
     *
     * @param {String} name
     * @return {String}
     */

  }, {
    key: "getRootFile",
    value: function getRootFile(name) {
      var path = this.config.path;

      if (!path.endsWith('/')) {
        path = path + '/';
      }

      return path + name + this.config.extension;
    }
    /**
     * @return {HTMLElement}
     */

  }, {
    key: "storeDOM",

    /**
     * @return {boolean}
     */
    value: function storeDOM() {
      var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (typeof this.abs_file === 'string') {
        Object(_fs_cache_file_js__WEBPACK_IMPORTED_MODULE_6__["addCachedItems"])(this.abs_file, this.elm_container);
        this.abs_file = null;
      } else if (this.abs_file === null && typeof file === 'string') {
        Object(_fs_cache_file_js__WEBPACK_IMPORTED_MODULE_6__["addCache"])(file, this.domText, document.createElement('div'));
        Object(_fs_cache_file_js__WEBPACK_IMPORTED_MODULE_6__["addCachedItems"])(file, this.elm_container);
      }
    }
  }, {
    key: "elm_container",
    get: function get() {
      return document.querySelector(this.config.id_element);
    }
    /**
     * @return {string}
     */

  }, {
    key: "domText",
    get: function get() {
      return this.elm_container.innerHTML;
    }
  }]);

  return View;
}();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 21 */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_scope_styles", function() { return set_scope_styles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateProps", function() { return updateProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony import */ var _evaluate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _scope_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _analyzer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
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
          var din = _analyzer_js__WEBPACK_IMPORTED_MODULE_2__["todo"].filter(function (r) {
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
          Object(_evaluate_js__WEBPACK_IMPORTED_MODULE_0__["output"])(din, newdata);
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
  var script = Object(_scope_js__WEBPACK_IMPORTED_MODULE_1__["get_text_script"])(node),
      // obtener un objecto de estilos
  styles = Object(_scope_js__WEBPACK_IMPORTED_MODULE_1__["get_style"])(node); // añadir codigo a evaluar

  Object(_evaluate_js__WEBPACK_IMPORTED_MODULE_0__["setEvaluatorCode"])(script, data = updateProps(data)); // compilar

  var struct = Object(_analyzer_js__WEBPACK_IMPORTED_MODULE_2__["getStructList"])(node.childNodes); // salida de vista

  Object(_evaluate_js__WEBPACK_IMPORTED_MODULE_0__["output"])(struct, data); // añadir estilos

  set_scope_styles(node, styles);
  return node;
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEvaluatorCode", function() { return setEvaluatorCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evaluateAndGetCode", function() { return evaluateAndGetCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "call_directives", function() { return call_directives; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "output", function() { return output; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _analyzer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32);
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33);




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

    return (_Function = _babel_runtime_helpers_construct__WEBPACK_IMPORTED_MODULE_1___default()(Function, ['$data'].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(Object.keys($___eval_params)), Array.prototype.slice.call(arguments)))).call.apply(_Function, [null, $___eval_params].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(Object.values($___eval_params))));
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

  while (typeof key !== 'undefined' && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(data) === 'object') {
    Object(_error_js__WEBPACK_IMPORTED_MODULE_4__["vw_error"])(Object(_error_js__WEBPACK_IMPORTED_MODULE_4__["bind_error"])(key, data), "variable or property ".concat(keys.join('.'), " not find"));
    data = data[key];
    key = keys[++x];
  }

  return ['object', 'array'].indexOf(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(data)) >= 0 ? JSON.stringify(data) : data;
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
        directives: new Set(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(directives.values()))
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
      output(Object(_analyzer_js__WEBPACK_IMPORTED_MODULE_3__["getStructList"])(clone.childNodes), new_data);
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
        } else if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(passed) === 'object') {
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

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(5);

var isNativeReflectConstruct = __webpack_require__(25);

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(27);

var iterableToArray = __webpack_require__(29);

var unsupportedIterableToArray = __webpack_require__(30);

var nonIterableSpread = __webpack_require__(31);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(28);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(28);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "todo", function() { return todo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStructList", function() { return getStructList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scopeCode", function() { return scopeCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSetToCompile", function() { return createSetToCompile; });
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);

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
  todo = todo.concat(arr);
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

      Object(_error_js__WEBPACK_IMPORTED_MODULE_0__["vw_error"])(Object(_error_js__WEBPACK_IMPORTED_MODULE_0__["vw_args"])(c3, 3), 'num args not match'); // retorna el tipo de itaracion de valor deseado. en caso de error genera una excepcion

      var kwd = Object(_error_js__WEBPACK_IMPORTED_MODULE_0__["kw_find"])('of', 1, c3) ? 'of' : Object(_error_js__WEBPACK_IMPORTED_MODULE_0__["kw_find"])('in', 1, c3) ? 'in' : Object(_error_js__WEBPACK_IMPORTED_MODULE_0__["vw_error"])(true, 'syntax error');
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

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vw_error", function() { return vw_error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bind_error", function() { return bind_error; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vw_args", function() { return vw_args; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kw_find", function() { return kw_find; });
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

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_text_script", function() { return get_text_script; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_style", function() { return get_style; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add_styles", function() { return add_styles; });
/* harmony import */ var _simple_css_parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);

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
  return _simple_css_parser_js__WEBPACK_IMPORTED_MODULE_0__["default"].parse(st.innerText || '');
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

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * debido a tantas simples librerias que hay, he decidido incluir 
 * esta simple mini libreria de css en vez de crear una entera para parsear
 * y verificar errores. tal vez lo haga en un futuro.
 * 
 * @url https://github.com/Tombert/CsParse/blob/master/csparse.js
 * 
 * @license BSD 3-Clause
 * Copyright (c)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice, this
 *   list of conditions and the following disclaimer in the documentation and/or
 *   other materials provided with the distribution.
 * 
 * * Neither the name of the {organization} nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/
var cs = {};

cs.parse = function (cssString) {
  var separateEachSelector = cssString.replace(/\n/g, '').split('}');
  separateEachSelector.pop(); //Last element will be //'' or \n

  var cssObj = {};

  for (var i = 0; i < separateEachSelector.length; i += 1) {
    var sepSelectorAndData = separateEachSelector[i].split('{');
    var selector = sepSelectorAndData[0].trim();
    var fields = sepSelectorAndData[1].trim();
    var individualFields = fields.split(';');
    /**
     * linea de codigo añadida por mi
     * resulve el error o la obligacion de terminar con ";" al ultimo de cada regla
     * y previene el valores vacios
     */

    if (!individualFields[individualFields.length - 1].trim()) {
      individualFields.pop();
    } //


    cssObj[selector] = {};

    for (var j = 0; j < individualFields.length; j += 1) {
      var sepPropAndValue = individualFields[j].split(':'); // el uso de trim() para remover los espacios

      cssObj[selector.trim()][sepPropAndValue[0].trim()] = sepPropAndValue[1].trim();
    }
  }

  return cssObj;
};

cs.stringify = function (cssObject) {
  var cssString = '';

  for (var selector in cssObject) {
    var mainObject = cssObject[selector];
    cssString += selector + ' {\n';

    for (var field in mainObject) {
      field + ':' + mainObject[field] + '\n;';
    }

    cssString += '}\n';
  }

  return cssString;
};

/* harmony default export */ __webpack_exports__["default"] = (cs);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);




/**
 * @file menejador archivos
 * @since 0.3.0
 */

/**
 * @description interfaz de respuesta
 */
var ResponseReader = function ResponseReader() {
  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ResponseReader);

  this.error = false;
  this.content = '';
};
/**
 * lector de peticion
 * @param {string} file
 * @param {string} name_fn
 * @return {Promise.<ResponseReader>}
 */


/* harmony default export */ __webpack_exports__["default"] = (function (_x) {
  return _ref.apply(this, arguments);
});

function _ref() {
  _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(file) {
    var name_fn,
        res,
        response_reader,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name_fn = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'text';
            _context.next = 3;
            return fetch(file);

          case 3:
            res = _context.sent;
            response_reader = new ResponseReader();
            response_reader.status = res.status;

            if (!(res.status !== 200)) {
              _context.next = 10;
              break;
            }

            response_reader.error = true;
            _context.next = 13;
            break;

          case 10:
            _context.next = 12;
            return res[name_fn]();

          case 12:
            response_reader.content = _context.sent;

          case 13:
            return _context.abrupt("return", response_reader);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref.apply(this, arguments);
}

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCache", function() { return addCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCaching", function() { return isCaching; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCache", function() { return getCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCacheAll", function() { return getCacheAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCachedItems", function() { return addCachedItems; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);

var cache_files = {};

var CacheSystem =
/**
 * 
 * @param {string} source
 */
function CacheSystem(source, dom) {
  _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CacheSystem);

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

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dispacther; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _http_request_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _patron_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);




function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var reflect = window.Reflect ? Reflect : {
  has: function has(cl, k) {
    return k in cl;
  }
};
/**
 *
 * @param {Object} obj controller
 * @param {String} key name method
 */

function method_exists(obj, key) {
  return reflect.has(obj, key) && typeof obj[key] === 'function';
}
/**
 *
 * @typedef {Object} ContainerDef
 * @property {View} view
 * @property {DBModel} storage
 */

/**
 *
 * @param {Function} controller instance controller class
 * @param {...ContainerDef} container container app {@link ContainerDef} object
 */


function dispatchController(controller, container, method) {
  if (typeof controller.__proto__ === 'function' && typeof controller.__proto__.prototype !== 'undefined') {
    if (controller.__proto__.name === 'Controller') {
      Object.setPrototypeOf(controller.__proto__.prototype, container);
    }
  }

  var $class = new controller(container);

  if (method_exists($class, method)) {
    var vw = $class[method]();

    if (vw instanceof Promise) {
      vw.then(function (CacheSystem) {
        for (var i = 0, len = CacheSystem.parsed_element.childNodes.length, a = 0; i < len; i++) {
          container.view.elm_container.appendChild(CacheSystem.parsed_element.childNodes[a]);
        }
      });
    } else if (Array.isArray(vw) || _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default()(vw) === 'object') {
      container.view.innerContent(JSON.stringify(vw));
    } else if (typeof vw !== 'undefined') {
      container.view.innerContent(vw);
    }
  }
}
/**
 * create object with key = value
 * @param {array} keys 
 * @param {array} vals 
 */


function object_union(keys, vals) {
  var newObject = {};
  keys.forEach(function (key, indx) {
    return newObject[key] = vals[indx];
  });
  return newObject;
}
/**
 * @version 0.1.0
 */


var Dispacther = /*#__PURE__*/function () {
  /**
   *
   * @param {Patron} app
   * @param {HRequest} req
   */
  function Dispacther(app, req) {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Dispacther);

    this.container = app.container;
    this.routers = app.actions;
    this.request = req;

    this["catch"] = function () {
      _this.page = _helpers_js__WEBPACK_IMPORTED_MODULE_3__["page_not_fount"];
      _this.html = document.body.innerHTML;
      document.body.innerHTML = '';
      document.body.appendChild(_helpers_js__WEBPACK_IMPORTED_MODULE_3__["page_not_fount"]);
    };
  }
  /**
   * @param {Function} func_error function to execute when not fount url
   */


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Dispacther, [{
    key: "notFound",
    value: function notFound(func_error) {
      this["catch"] = func_error;
    }
    /**
     * initialize app
     */

  }, {
    key: "send",
    value: function send() {
      var val_params = [];

      var _iterator = _createForOfIteratorHelper(this.routers),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var router = _step.value;

          if (val_params = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_3__["match_url"])(router.path.url, this.request.url)) {
            this.request.params = object_union(router.path.name_params, val_params); //- remove page not found

            if (typeof this.html === 'string') {
              this.page.remove();
              document.body.innerHTML = this.html;
              delete this.html;
            }

            this.stateView(val_params.input);
            return this.execute(router);
          }
        } // show page not fount

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this["catch"]();
    }
    /**
     *
     * @param {object} data values of router
     */

  }, {
    key: "execute",
    value: function execute(data) {
      var option = data.option;
      var method = data.method;

      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default()(option) == 'object') {
        if (option.load && option.load.css) Object(_helpers_js__WEBPACK_IMPORTED_MODULE_3__["load_assets"])('css', option.load.css);
        if (option.load && option.load.js) Object(_helpers_js__WEBPACK_IMPORTED_MODULE_3__["load_assets"])('js', option.load.js);
        option = option.controller;
      }

      if (typeof option == 'function') {
        dispatchController(option, this.container, method);
      } else {
        throw new Error('wait callback execution');
      }
    }
    /**
     * 
     * @param {string} current_url 
     */

  }, {
    key: "stateView",
    value: function stateView(current_url) {
      document.querySelectorAll('[data-remove]').forEach(function (node) {
        if (['style', 'script'].includes(node.tagName.toLowerCase())) node.remove();
      });
      this.container.view.storeDOM(current_url);
    }
    /**
     * @return {Dispacther}
     */

  }, {
    key: "getInstance",
    value: function getInstance() {
      return Dispacther._instance;
    }
    /**
     * create instance class
     * @param {Patron} app
     * @param {HRequest} req
     */

  }], [{
    key: "createInstance",
    value: function createInstance(app, req) {
      if (!Dispacther._instance) Dispacther._instance = new Dispacther(app, req);
      return Dispacther._instance;
    }
    /**
     * @description return instance class
     * @return {Dispacther}
     */

  }, {
    key: "instance",
    get: function get() {
      return Dispacther._instance;
    }
    /**
     * @description set instance class
     * @param {Dispacther}
     */
    ,
    set: function set(obj) {
      Dispacther._instance = obj;
    }
  }]);

  return Dispacther;
}();



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return URLStateCapture; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);



/**
 * @class
 * @version 0.1.0
 */

var URLStateCapture = /*#__PURE__*/function () {
  function URLStateCapture() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, URLStateCapture);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(URLStateCapture, [{
    key: "state",

    /**
     * @param {Dispacther} dispatcher 
     */
    value: function state(dispatcher) {
      window.addEventListener('hashchange', function () {
        dispatcher.send();
      });
    }
    /**
     * @return {String}
     */

  }, {
    key: "url",
    get: function get() {
      var url = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_2__["parse_url"])(location.hash.substr(1) || '/');
      return url.pathname;
    }
  }]);

  return URLStateCapture;
}();



/***/ })
/******/ ]);
});