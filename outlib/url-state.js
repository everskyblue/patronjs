"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _helpers = require("./helpers.js");

/**
 * @class
 * @version 0.1.0
 */
var URLStateCapture = /*#__PURE__*/function () {
  function URLStateCapture() {
    (0, _classCallCheck2["default"])(this, URLStateCapture);
  }

  (0, _createClass2["default"])(URLStateCapture, [{
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
      var url = (0, _helpers.parse_url)(location.hash.substr(1) || '/');
      return url.pathname;
    }
  }]);
  return URLStateCapture;
}();

exports["default"] = URLStateCapture;