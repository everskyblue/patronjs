"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = exports.ViewConfig = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _render2 = require("./render.js");

var _readFile = _interopRequireDefault(require("./read-file.js"));

var _cacheFile = require("./fs/cache-file.js");

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
  (0, _classCallCheck2["default"])(this, ViewConfig);
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


exports.ViewConfig = ViewConfig;

var View = /*#__PURE__*/function () {
  /**
   * @constructor
   * @param {ViewConfig} viewConfig
   */
  function View(viewConfig) {
    (0, _classCallCheck2["default"])(this, View);
    this.config = viewConfig;
    this.abs_file = null;
  }
  /**
   * @async
   * @param {String} file
   * @return {Promise}
   */


  (0, _createClass2["default"])(View, [{
    key: "getContent",
    value: function () {
      var _getContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file, data) {
        var res, dom;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.abs_file = this.getRootFile(file);

                if (!(this.config.cache && (0, _cacheFile.isCaching)(this.abs_file))) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", (0, _cacheFile.getCache)(this.abs_file));

              case 3:
                _context.next = 5;
                return (0, _readFile["default"])(this.abs_file);

              case 5:
                res = _context.sent;

                if (!res.error) {
                  _context.next = 8;
                  break;
                }

                throw new Error('file not fount');

              case 8:
                dom = (0, _render2.parse)(res.content, data);
                (0, _cacheFile.addCache)(this.abs_file, res.content, dom);
                return _context.abrupt("return", (0, _cacheFile.getCache)(this.abs_file));

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
      var _render = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(file, data) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
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
        (0, _cacheFile.addCachedItems)(this.abs_file, this.elm_container);
        this.abs_file = null;
      } else if (this.abs_file === null && typeof file === 'string') {
        (0, _cacheFile.addCache)(file, this.domText, document.createElement('div'));
        (0, _cacheFile.addCachedItems)(file, this.elm_container);
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

exports.View = View;