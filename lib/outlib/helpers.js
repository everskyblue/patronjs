"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUtilLocation = setUtilLocation;
exports.pregQuote = pregQuote;
exports.match_url = match_url;
exports.parse_url = parse_url;
exports.load_assets = load_assets;
exports.comparator = comparator;
exports.template_logger = template_logger;
exports.page_not_fount = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var base_url, assets_location;

function setUtilLocation(ubase, lassets) {
  base_url = ubase;
  assets_location = lassets;
}
/**
 *
 * @param {string} str
 * @param {string} rpl
 * @returns {string}
 */


function pregQuote(str, rpl) {
  if (str.match(/\//g) !== null) {
    str = String(str).replace(new RegExp('[.\\\*$=!<>|\\' + (rpl || '') + ']', 'g'), '\\$&');
  }

  return str;
}
/**
 *
 * @param {string} url
 * @param {string} compare
 */


function match_url(url, compare) {
  var rgx = new RegExp(pregQuote(url, '/') + '/?$');
  var f = rgx.exec(compare);
  return f && f.shift() === f.input ? f : false;
}
/**
 *
 * @param {string} url
 * @return {URL}
 */


function parse_url(url) {
  return new URL(url, base_url);
}
/**
 *
 * @param {string} type
 * @param {Array} files
 */


function load_assets(type, files) {
  var root = assets_location[type];

  var _iterator = _createForOfIteratorHelper(files),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var file = _step.value;
      var e = void 0;

      if (type === 'css') {
        e = document.createElement('link');
        e.href = "".concat(base_url).concat(root).concat(file, ".css");
        e.rel = 'stylesheet';
        document.head.appendChild(e);
      } else if (type === 'js') {
        e = document.createElement('script');
        e.src = "".concat(base_url).concat(root).concat(file, ".js");
        document.body.appendChild(e);
      }

      if (!!e) e.setAttribute('data-remove', true);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function comparator(value, operator, to) {
  switch (operator) {
    case '==':
      return value === to;

    case '!=':
      return value !== to;

    case '>':
      return value > to;

    case '<':
      return value < to;

    case '>=':
      return value >= to;

    case '<=':
      return value <= to;
  }

  throw new ReferenceError("operator ".concat(operator, " no es valido"));
}
/**
 * @type {HTMLIFrameElement}
 */


var page_not_fount = document.createElement('iframe');
exports.page_not_fount = page_not_fount;
page_not_fount.allow = 'fullscreen';
page_not_fount.width = '100%';
page_not_fount.height = '100%';
page_not_fount.src = '/public/404.html';
page_not_fount.style.position = 'absolute';
page_not_fount.style.border = '0';
page_not_fount.style.zIndex = '100';
var style_log = "\n<style>\nh2.err-msg {\n    background: #3F51B5;\n    padding: 10px;\n    color: #d5e812;\n}\nh4{\n    font-size: xx-large;\n    margin-bottom: 10px;\n}\n.err-stacks {\n    padding: 10px;\n    line-height: 25px;\n}\n.stack {\n    border: 5px dashed #c72e2e;\n    padding: 10px;\n    color: #0e3ce4;\n    text-decoration: underline;\n    border-style: double;\n    counter-reset: errs;\n}\n.stack > div:before {\n    counter-increment: errs;\n    content: counters(errs,\".\") \" \";\n}\n</style>\n";
/**
 * 
 * @param {Error} e 
 */

function template_logger(e) {
  var errs = e.stack.split('\n');
  var msg = "<h2 class=\"err-msg\">".concat(errs.shift(), "</h2>");
  var stacks = "\n        <div class=\"err-stacks\">\n            <h4>Stacks:</h4>\n            <div class=\"stack\">";

  var _iterator2 = _createForOfIteratorHelper(errs),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _err = _step2.value;
      stacks += "<div>".concat(_err.trim(), "</div>");
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  stacks += '</div></div>';
  document.title = 'error application';
  document.body.innerHTML = "".concat(style_log, "\n<div class=\"debug\">").concat(msg).concat(stacks, "</div>");
}