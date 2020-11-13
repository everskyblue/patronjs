"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _container = require("./container.js");

var _cookie = _interopRequireDefault(require("./http/cookie.js"));

var _request = _interopRequireDefault(require("./http/request.js"));

var _response = _interopRequireDefault(require("./http/response.js"));

var _route = _interopRequireDefault(require("./route/route.js"));

var _view = require("./view/view.js");

var _dispatcher = _interopRequireDefault(require("./route/dispatcher.js"));

var _helpers = require("./helpers.js");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * 
 * @param {Object} config 
 */
function register(config) {
  (0, _container.setContainer)('view', function ()
  /*container*/
  {
    return new _view.View(new _view.ViewConfig(config.cview));
  });
  (0, _container.setContainer)('cookie', function () {
    return new _cookie["default"]();
  });
  (0, _container.setContainer)('request', function () {
    return new _request["default"]();
  });
  (0, _container.setContainer)('response', function (container) {
    return new _response["default"](container);
  });
}
/**
 * @class
 * @version 0.1.0
 */


var Patron = /*#__PURE__*/function (_Route) {
  (0, _inherits2["default"])(Patron, _Route);

  var _super = _createSuper(Patron);

  /**
   * 
   * @param {Object} config 
   */
  function Patron(config) {
    var _this;

    (0, _classCallCheck2["default"])(this, Patron);
    _this = _super.call(this);
    _this.debug = config.debug;
    (0, _helpers.setUtilLocation)(config.base_url, config.assets_location);
    register(config);
    return _this;
  }
  /**
   * 
   * @param {String} key 
   * @param {Function} func 
   */


  (0, _createClass2["default"])(Patron, [{
    key: "setContainer",
    value: function setContainer(key, func) {
      (0, _container.setContainer)(key, func);
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
      var dispatcher = _dispatcher["default"].createInstance(this, request);

      dispatcher.send();
      return dispatcher;
    }
    /**
     * @param {Error} e
     */

  }, {
    key: "handlerError",
    value: function handlerError(e) {
      if (this.debug) (0, _helpers.template_logger)(e);
    }
    /**
     * @return {Object}
     */

  }, {
    key: "container",
    get: function get() {
      return (0, _container.getContainer)();
    }
  }]);
  return Patron;
}(_route["default"]);

exports["default"] = Patron;