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
var RoutePattern = /*#__PURE__*/function () {
  /**
   * @constructor
   */
  function RoutePattern() {
    (0, _classCallCheck2["default"])(this, RoutePattern);
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


  (0, _createClass2["default"])(RoutePattern, [{
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

exports["default"] = RoutePattern;