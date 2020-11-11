"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

/**
 * @file menejador archivos
 * @since 0.3.0
 */

/**
 * @description interfaz de respuesta
 */
var ResponseReader = function ResponseReader() {
  (0, _classCallCheck2["default"])(this, ResponseReader);
  this.error = false;
  this.content = '';
};
/**
 * lector de peticion
 * @param {string} file
 * @param {string} name_fn
 * @return {Promise.<ResponseReader>}
 */


function _default(_x) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file) {
    var name_fn,
        res,
        response_reader,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
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