"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _helpers = require("../helpers.js");

/**
 * @version 0.1.0
 */
var HRequest = /*#__PURE__*/function () {
  /**
   * @constructor
   */
  function HRequest() {
    (0, _classCallCheck2["default"])(this, HRequest);
    this.port = Number(location.port || 80);
    this.host = location.hostname;
    this.params = {};
    this.search = this.getQuerySearch();
    this.agent = navigator.userAgent;
  }
  /**
   * @return {object}
   */


  (0, _createClass2["default"])(HRequest, [{
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
      var url = (0, _helpers.parse_url)(location.hash.substr(1) || '/');
      return url.pathname;
    }
  }]);
  return HRequest;
}();

exports["default"] = HRequest;