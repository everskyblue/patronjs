"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _helpers = require("../helpers.js");

var _request = _interopRequireDefault(require("../http/request.js"));

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
    } else if (Array.isArray(vw) || (0, _typeof2["default"])(vw) === 'object') {
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

    (0, _classCallCheck2["default"])(this, Dispacther);
    this.container = app.container;
    this.routers = app.actions;
    this.request = req;

    this["catch"] = function () {
      _this.page = _helpers.page_not_fount;
      _this.html = document.body.innerHTML;
      document.body.innerHTML = '';
      document.body.appendChild(_helpers.page_not_fount);
    };
  }
  /**
   * @param {Function} func_error function to execute when not fount url
   */


  (0, _createClass2["default"])(Dispacther, [{
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

          if (val_params = (0, _helpers.match_url)(router.path.url, this.request.url)) {
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

      if ((0, _typeof2["default"])(option) == 'object') {
        if (option.load && option.load.css) (0, _helpers.load_assets)('css', option.load.css);
        if (option.load && option.load.js) (0, _helpers.load_assets)('js', option.load.js);
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

exports["default"] = Dispacther;