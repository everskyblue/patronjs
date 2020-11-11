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

var _status = _interopRequireDefault(require("./status.js"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @version 0.1.0
 */
var HResponse = /*#__PURE__*/function (_Status) {
  (0, _inherits2["default"])(HResponse, _Status);

  var _super = _createSuper(HResponse);

  /**
   * @constructor
   * @param {object} container 
   */
  function HResponse(container) {
    var _this;

    (0, _classCallCheck2["default"])(this, HResponse);
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


  (0, _createClass2["default"])(HResponse, [{
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
}(_status["default"]);

exports["default"] = HResponse;