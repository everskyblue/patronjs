"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * @version 0.1.0
 */
var Cookie = /*#__PURE__*/function () {
  /**
   * @constructor
   */
  function Cookie() {
    (0, _classCallCheck2["default"])(this, Cookie);
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


  (0, _createClass2["default"])(Cookie, [{
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

exports["default"] = Cookie;