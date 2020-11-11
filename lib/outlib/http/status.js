"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInfo = isInfo;
exports.isSuccess = isSuccess;
exports.isRedirection = isRedirection;
exports.isServerError = isServerError;
exports.isClientError = isClientError;
exports.exists_status = exists_status;
exports.getMessageStatus = getMessageStatus;
exports.isOK = isOK;
exports["default"] = exports.STATUS = void 0;
var STATUS = {
  // 1xx Informational
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  // 2xx Success
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  // 3xx Redirection
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  306: 'Switch Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  // 4xx Client Error
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  421: 'There are too many connections from your internet address',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  425: 'Unordered Collection',
  426: 'Upgrade Required',
  429: 'Too Many Requests',
  449: 'Retry With',
  450: 'Blocked by Windows Parental Controls',
  498: 'Invalid or expired token',
  // 5xx Server Error
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended',
  511: 'Network Authentication Required',
  530: 'User access denied'
};
exports.STATUS = STATUS;

function isInfo() {
  return this.code >= 100 && this.code <= 102;
}

function isSuccess() {
  return this.code >= 200 && this.code <= 207;
}

function isRedirection() {
  return this.code >= 300 && this.code <= 308;
}

function isServerError() {
  return this.code >= 400 && this.code <= 498;
}

function isClientError() {
  return this.code >= 500 && this.code <= 530;
}

function exists_status(code) {
  return code in STATUS;
}

function getMessageStatus(code) {
  if (!exists_status(code)) {
    throw new Error("code ".concat(code, " status no exists"));
  }

  return status[code];
}

function isOK() {
  return this.code === 200;
}

function Status() {
  this.code = 200;
}

Status.prototype = {
  STATUS: STATUS,
  isOK: isOK,
  isInfo: isInfo,
  isSuccess: isSuccess,
  isClientError: isClientError,
  isRedirection: isRedirection,
  isServerError: isServerError,
  getMessageStatus: getMessageStatus
};
var _default = Status;
exports["default"] = _default;