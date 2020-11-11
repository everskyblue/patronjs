"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _routePattern = _interopRequireDefault(require("./route-pattern.js"));

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
    (0, _classCallCheck2["default"])(this, Route);
    this._group = '';
    this.pattern = new _routePattern["default"]();
    this.actions = [];
  }
  /**
   * 
   * @param {String} url 
   * @param {Function} fn 
   */


  (0, _createClass2["default"])(Route, [{
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

exports["default"] = Route;