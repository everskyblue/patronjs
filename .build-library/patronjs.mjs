var ie = Object.defineProperty;
var oe = (t, e, r) => e in t ? ie(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var m = (t, e, r) => (oe(t, typeof e != "symbol" ? e + "" : e, r), r), O = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
};
var w = (t, e, r) => (O(t, e, "read from private field"), r ? r.call(t) : e.get(t)), v = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, U = (t, e, r, n) => (O(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r);
var x = (t, e, r) => (O(t, e, "access private method"), r);
const C = {};
function ae(t) {
  return t in C;
}
function ce(t, e) {
  let r = e;
  Object.defineProperty(C, t, {
    enumerable: !1,
    configurable: !1,
    get: function() {
      return typeof r == "function" && (r = r(C)), r;
    }
  });
}
function g(t, e) {
  if (ae(t))
    throw new Error(`key ${t} is registered`);
  ce(t, e);
}
function T() {
  return C;
}
class B {
  constructor() {
    this.expires = null, this.path = location.path, this.domain = location.hostname, this.secure = null, this.max_age = null, this.samesite = null, this.values = this.getValues();
  }
  add(e, r, n = {}) {
    let s = `${e}=${r}`;
    for (const i in n)
      s += `;${i}=${n[i]}`;
    document.cookie = s;
  }
  remove(e) {
    document.cookie = e + "=;expires=" + new Date("-1").toUTCString();
  }
  getValues() {
    let e = {}, r, n = /([\w]+)\s*\=\s*([^;]*)/g;
    for (; (r = n.exec(document.cookie)) !== null; )
      e[r[1]] = r[2];
    return e;
  }
  getValue(e) {
    return this.getValues()[e];
  }
}
let Z;
const k = (globalThis || globalThis).URLPattern, N = k !== void 0 || k !== null;
function le(t, e) {
  Z = t;
}
function ue(t, e) {
  return t.match(/\//g) !== null && (t = String(t).replace(new RegExp("[.\\*$=!<>|\\" + (e || "") + "]", "g"), "\\$&")), t;
}
function he(t, e) {
  const r = T().config, n = N ? new k(`${t}(\\/?)`, r.base_url) : new RegExp(ue(t, "/") + "/?$"), s = [e];
  N && s.push(r.base_url);
  const i = n.exec(...s);
  if (i === null)
    return !1;
  let o = { input: "", params: [] };
  if (N) {
    const { input: a, groups: l } = i.pathname;
    o.input = a, o.params.push(...Object.values(l));
  } else {
    if (i.input !== i.shift())
      return !1;
    o.input = i.input, o.params.push(...i);
  }
  return o;
}
function Q(t) {
  return new URL(t, Z);
}
function V(t, e) {
  const { assets_location: r } = T().config, n = r[t];
  for (const s of e) {
    let i;
    t === "css" ? (i = document.createElement("link"), i.href = `${n}${s}.css`, i.rel = "stylesheet", document.head.appendChild(i)) : t === "js" && (i = document.createElement("script"), i.src = `${n}${s}.js`, document.body.appendChild(i)), i && i.setAttribute("data-remove", !0);
  }
}
const de = () => {
  const t = T().config.public_dir, e = document.createElement("iframe");
  return e.allow = "fullscreen", e.width = "100%", e.height = "100%", e.src = `${t}/404.html`, e.style.position = "absolute", e.style.border = "0", e.style.zIndex = "100", e;
};
function D(t) {
  if ((!(t instanceof Error) || Object.prototype.toString.call(t) === "[object Object]") && (t = new Error(typeof t == "object" ? JSON.stringify(t) : t)), !window.hljs) {
    const i = document.createElement("script"), o = document.createElement("script"), a = document.createElement("link");
    o.src = "//cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js", i.src = "https://unpkg.com/@highlightjs/cdn-assets@11.6.0/highlight.min.js", a.rel = "stylesheet", a.href = "https://unpkg.com/@highlightjs/cdn-assets@11.6.0/styles/androidstudio.min.css", document.head.append(i, a), i.onload = () => document.head.append(o), F(i, o, a);
  }
  const e = document.createElement("link"), r = document.createElement("script");
  e.href = import.meta.url.substring(0, import.meta.url.lastIndexOf("/")) + "/styles.css", r.src = import.meta.url.substring(0, import.meta.url.lastIndexOf("/")) + "/error-fetch-template.js", e.rel = "stylesheet", F(e, r), document.head.append(e, r);
  const n = t.stack.split(`
`).slice(1), s = `
    <h1 class="error-title">Error Application</h1>
    <div id="error-container">
        <section class="error-info">
            <div class="type-error-info">
                <p class="type-error"><b class="color-primary">Error Name:</b> ${t.name}</p>
            </div>
            <div class="message-error-info">
                <p class="message-error"><b class="color-primary">Message:</b> ${t.message}</p>
            </div>
        </section>
        <section class="view-code">
            <div><pre class="show-code"><p class="text-empty-preview">preview code</p></pre></div>
        </section>
        <section class="error-stacks error-stacks-content">
            <div class="error-stacks-info">${fe(n)}</div>
        </section>
    </div>
    `;
  document.title = "Error Application", e.onload = () => document.body.innerHTML = s;
}
function F(...t) {
  t.forEach((e) => {
    e.setAttribute("patron-handle", "");
  });
}
function fe(t) {
  let e = "";
  for (const r of t) {
    const n = r.trim(), s = n.trim().match(/\((.*)?\)/);
    let i = s === null ? "at" : r.replace(s[0], "").trim(), o = (s === null ? n.slice(3) : s[1]).replace(location.origin, ""), a = o.split(":").slice(1).join(":");
    o = o.replace(`:${a}`, ""), e += `<div class="error-stack">
            <p data-file-error="${o}" onclick="getCode('${o}','${a}')">
                <span><b class="color-primary">file:</b> ${o}</span>
                <span><b class="color-primary">line:</b> ${a}</span>
                <span><b class="color-primary">callback:</b> ${i}</span>
            </p>
        </div>`;
  }
  return e;
}
class H {
  constructor() {
    this.port = Number(location.port) || this.isHTTPS() ? 443 : this.isHTTP() ? 80 : void 0, this.host = location.hostname, this.params = {}, this.agent = navigator.userAgent;
  }
  getQuerySearch() {
    let e = decodeURI(location.search), r = {};
    return e.startsWith("?", 0) && (e = e.substring(1)), e.split("&").forEach((n) => {
      let s = n.split("=");
      r[s[0]] = s[1];
    }), r;
  }
  isHTTP() {
    return location.protocol.substring(0, location.protocol.length - 1) === "http";
  }
  isHTTPS() {
    return location.protocol.substring(0, location.protocol.length - 1) === "https";
  }
  get search() {
    return this.getQuerySearch();
  }
  get url() {
    return location.href;
  }
  get hash() {
    return Q(location.hash.substring(1) || "/").pathname;
  }
}
const z = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  306: "Switch Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  415: "Unsupported Media Type",
  416: "Requested Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  421: "There are too many connections from your internet address",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Unordered Collection",
  426: "Upgrade Required",
  429: "Too Many Requests",
  449: "Retry With",
  450: "Blocked by Windows Parental Controls",
  498: "Invalid or expired token",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended",
  511: "Network Authentication Required",
  530: "User access denied"
};
class pe {
  constructor() {
    m(this, "code", 200);
  }
  isRedirection() {
    return this.code >= 300 && this.code <= 308;
  }
  isOK() {
    return this.code === 200;
  }
  getMessageStatus(e) {
    if (!this.exists_status(e))
      throw new Error(`code ${e} status no exists`);
    return z[e];
  }
  isInfo() {
    return this.code >= 100 && this.code <= 102;
  }
  isSuccess() {
    return this.code >= 200 && this.code <= 207;
  }
  isServerError() {
    return this.code >= 400 && this.code <= 498;
  }
  isClientError() {
    return this.code >= 500 && this.code <= 530;
  }
  exists_status(e) {
    return e in z;
  }
}
var p, _, P, R, X;
class K extends pe {
  constructor(r) {
    super();
    v(this, _);
    v(this, R);
    m(this, "header", new Headers());
    v(this, p, []);
    this.container = r;
  }
  signedCookie(r, n, s = {}) {
    return w(this, p).push(() => {
      this.container.cookie.add(r, n, s);
    }), this;
  }
  json(r) {
    return r instanceof Request ? fetch(r).then((n) => n.json()) : x(this, R, X).call(this, r, "application/json");
  }
  send(r) {
    if (w(this, p).length > 0) {
      for (const n of w(this, p))
        n();
      U(this, p, []);
    }
    this.header = new Headers(), r && (r instanceof Promise ? r.then((n) => {
      x(this, _, P).call(this, JSON.stringify(n, null, 4));
    }) : x(this, _, P).call(this, typeof r == "string" || typeof r == "number" ? r.toString() : JSON.stringify(r)));
  }
  setHeader(r, n) {
    return this.header.append(r, n), this;
  }
  view(r, n = {}) {
    this.container.view.innerContent(r, n);
  }
}
p = new WeakMap(), _ = new WeakSet(), P = function(r) {
  document.querySelector(this.container.config.cview.join).innerHTML = r;
}, R = new WeakSet(), X = function(r, n, s = this.code) {
  if (this.setHeader("Content-Type", n).setHeader("Status", s), typeof r == "string")
    if (!r.endsWith(".json") || !r.includes("/"))
      r = [r];
    else
      return new Request(r, {
        headers: this.header,
        method: "GET"
      });
  return r;
};
class Y {
  constructor() {
    this.lower = "a-z", this.upper = "A-Z", this.number = "0-9", this.string = "a-zA-Z_", this.simple = "a-zA-Z0-9_-", this.search = "{(.*?)}";
  }
  resolverCondition(e) {
    let r = new RegExp(this.search, "g"), n, s = [];
    for (; (n = r.exec(e)) !== null; ) {
      let o = n.shift(), a = n.shift().split(/([a-zA-Z\_]+?)\:/g).filter((c) => c != ""), l = a.shift(), u = a.findIndex((c) => ["lower", "upper", "number", "string"].indexOf(c) >= 0 || c.indexOf("regx(") === 0) === 0;
      if (a.length && !u)
        throw new Error(`url no valida ${e}`);
      a.forEach((c, h) => {
        switch (c) {
          case "lower":
            a[h] = this.lower;
            break;
          case "upper":
            a[h] = this.upper;
            break;
          case "number":
            a[h] = this.number;
            break;
          default:
            c.indexOf("regx(") === 0 ? (c = c.replace("regx(", ""), a[h] = c.substring(0, c.length - 1)) : a[h] = this.simple;
            break;
        }
      }), a.length === 0 && (a[0] = this.simple), s.push({
        expression: o,
        name_param: l,
        params: a
      });
    }
    const i = { url: e, name_params: [] };
    return s.forEach((o) => {
      i.url = e = e.replace(o.expression, "([" + o.params.join("") + "]+)"), i.name_params.push(o.name_param);
    }), i;
  }
}
class ee {
  constructor() {
    m(this, "_group", "");
    m(this, "actions", []);
    m(this, "pattern", new Y());
  }
  group(e, r) {
    return this._group = e, r(this), this._group = "", this;
  }
  hash(e, r, n) {
    const s = this.pattern.resolverCondition(this._group.concat(e));
    return this.actions.push({
      path: s,
      option: r,
      method: n
    }), this;
  }
}
function q(t, e) {
  if (t)
    throw new Error(e);
}
function me(t, e) {
  return !(t in e);
}
function ge(t, e) {
  return t.length !== e;
}
function G(t, e, r) {
  return r[e].trim() === t;
}
let A = [];
b.ignoreChild = !1;
function b(t) {
  const e = [];
  return t.forEach((r) => {
    r.attributes && e.push({
      d: be(r),
      c: (() => b.ignoreChild ? (b.ignoreChild = !1, []) : b(r.childNodes))()
    });
  }), A = A.concat(e), e;
}
function E(t) {
  let e = { called: t, local: !1 };
  return t.charAt(0) === "{" && (e = { called: t.replace(/[\{|\}]/g, ""), local: !0 }), e;
}
function be(t) {
  let e = /* @__PURE__ */ new Set();
  for (let r = 0, n = Object.values(t.attributes), s; r < n.length; r++) {
    if (s = n[r], s.name === "@if" && e.add({
      type: "if",
      scope: E(s.value)
    }), s.name === "@for") {
      const i = s.value.split(" ");
      q(ge(i, 3), "num args not match");
      const o = G("of", 1, i) ? "of" : G("in", 1, i) ? "in" : q(!0, "syntax error");
      e.add({
        type: "for",
        scope: E(i[2]),
        evaluate: {
          keyword: o,
          name_var: i[0]
        }
      });
    }
    if (s.name === ":bind") {
      const i = s.value.split("."), o = E(i.shift());
      e.add({
        scope: o,
        type: "bind",
        evaluate: i
      });
    }
    /\@event\:(.*)$/.test(s.name) && e.add({
      type: "event",
      scope: E(s.value),
      evaluate: s.name.split(":").filter((i) => i[0] !== "@")
    });
  }
  return {
    node: t,
    directives: e
  };
}
let te, d = {}, S = {};
function ye() {
  try {
    return new Function("$data", ...Object.keys(d), ...arguments).call(null, d, ...Object.values(d));
  } catch (t) {
    return t;
  }
}
function j(t, e) {
  return e ? _e(t) : d[t];
}
function _e(t) {
  let e = xe(t);
  if (e instanceof Error)
    throw e;
  return e;
}
function we(t, e) {
  let r = 0, n = e[r];
  for (; typeof n < "u" && typeof t == "object"; )
    q(me(n, t), `variable or property ${e.join(".")} not find`), t = t[n], n = e[++r];
  return ["object", "array"].indexOf(typeof t) >= 0 ? JSON.stringify(t) : t;
}
function ve(t, e) {
  te = t, e && (d = e);
}
function xe(t) {
  return t in S && !!S[t] ? S[t] : S[t] = ye(`"use strict";${te}
 return ${t.replace(/[\{\}]/g, "")}`);
}
const Ee = {
  bind: (t, e, r, n) => {
    const s = d;
    d = n, r[r.attributes.getNamedItem("escape") ? "innerText" : "innerHTML"] = we(j(t.called, t.local), e), d = s;
  },
  for: function(t, e, r, n, s) {
    const i = j(t.called, t.local);
    let o = JSON.parse(`{"${e.name_var}": ""}`), a = r;
    const l = { c: [], d: { directives: /* @__PURE__ */ new Set([...s.values()]) } };
    for (let u = 1, c; u < i.length; u++)
      c = r.cloneNode(!0), o[e.name_var] = i[u], o = Object.assign(o, n), l.d.node = c, l.d.directives.forEach((h) => {
        h.type === "for" && l.d.directives.delete(h);
      }), y([l], o), y(b(c.childNodes), o), a.insertAdjacentElement("afterend", c), a = c;
    return o[e.name_var] = i[0], o;
  },
  event: (t, e, r) => {
    const n = j(t.called, t.local);
    for (const s of e)
      r.addEventListener(s, n);
  },
  if: (t, e, r) => {
    const n = j(t.called, t.local);
    return n || (r.style.display = "none"), n;
  }
};
function y(t, e) {
  t.forEach((r) => {
    const n = r.c, s = r.d;
    let i, o = {};
    for (const a of s.directives) {
      if (i = Ee[a.type](a.scope, a.evaluate, s.node, e, s.directives), i === !1)
        return !1;
      typeof i == "object" && (o = Object.assign(o, i));
    }
    y(n, Object.keys(o).length ? Object.assign(o, e) : e);
  });
}
/**
 * debido a tantas simples librerias que hay, he decidido incluir 
 * esta simple mini libreria de css en vez de crear una entera para parsear
 * y verificar errores. tal vez lo haga en un futuro.
 * 
 * @url https://github.com/Tombert/CsParse/blob/master/csparse.js
 * 
 * @license BSD 3-Clause
 * Copyright (c)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 * 
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice, this
 *   list of conditions and the following disclaimer in the documentation and/or
 *   other materials provided with the distribution.
 * 
 * * Neither the name of the {organization} nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/
let L = {};
L.parse = function(t) {
  var e = t.replace(/\n/g, "").split("}");
  e.pop();
  for (var r = {}, n = 0; n < e.length; n += 1) {
    var s = e[n].split("{"), i = s[0].trim(), o = s[1].trim(), a = o.split(";");
    a[a.length - 1].trim() || a.pop(), r[i] = {};
    for (var l = 0; l < a.length; l += 1) {
      var u = a[l].split(":");
      r[i.trim()][u[0].trim()] = u[1].trim();
    }
  }
  return r;
};
L.stringify = function(t) {
  var e = "";
  for (var r in t) {
    var n = t[r];
    e += r + ` {
`;
    for (var s in n)
      s + "" + n[s];
    e += `}
`;
  }
  return e;
};
function Se(t) {
  let e = t.querySelector("script") || {};
  return typeof e.remove == "function" && e.remove(), e.innerText || "";
}
function je(t) {
  let e = t.querySelector("style[scope]") || {};
  return typeof e.remove == "function" && e.remove(), L.parse(e.innerText || "");
}
class Ce {
  constructor() {
    this.error = !1, this.content = "", this.status = null;
  }
}
async function Re(t, e = "text") {
  const r = await fetch(t), n = new Ce();
  return n.status = r.status, r.status !== 200 ? n.error = !0 : n.content = await r[e](), n;
}
let Te = typeof module == "object" && typeof module.exports == "object";
Te && require("fs");
function Oe(t, e) {
  for (const r in e) {
    const n = t.querySelectorAll(r);
    n.length > 0 && n.forEach((s) => {
      for (const i in e[r])
        s.style[i] = e[r][i];
    });
  }
}
function Ne(t) {
  let e = {};
  return Object.keys(t).forEach((r) => {
    (function(n) {
      Object.defineProperty(e, n, {
        configurable: !0,
        enumerable: !0,
        get: () => t[n],
        set: (s) => {
          t[n] = s;
          let i = A.filter((o) => {
            let a = !1;
            for (let l of o.d.directives.values())
              if (l.scope.called === n) {
                if (l.type === "for")
                  for (; o.d.node.nodeName === o.d.node.nextSibling.nodeName; )
                    o.d.node.nextSibling.remove();
                a = !0;
                break;
              }
            return a;
          });
          y(i, e);
        }
      });
    })(r);
  }), e;
}
function $e(t, e) {
  let r = document.createElement("div");
  r.innerHTML = t;
  const n = Se(r), s = je(r);
  ve(n, e = Ne(e));
  const i = b(r.childNodes);
  return y(i, e), Oe(r, s), r;
}
const I = {};
class ke {
  constructor(e, r) {
    this.source = e, this.parsed_element = r;
  }
}
function J(t, e, r) {
  I[t] = new ke(e, r);
}
function re(t) {
  return t in I;
}
function M(t) {
  if (!re(t))
    throw new Error(`cache file ${t} not fount`);
  return I[t];
}
function W(t, e) {
  const r = M(t);
  for (let n = 0; 0 < e.childNodes.length; n++)
    r.parsed_element.appendChild(e.childNodes[0]);
}
class ne {
  constructor({ path: e = "", ext: r = ".html", join: n = "", isCaching: s = !0 }) {
    this.path = e, this.id_element = n, this.extension = r, this.cache = s;
  }
}
class se {
  constructor(e) {
    this.config = e, this.abs_file = null;
  }
  async getContent(e, r) {
    if (this.abs_file = this.getRootFile(e), this.config.cache && re(this.abs_file))
      return M(this.abs_file);
    const n = await Re(this.abs_file);
    if (n.error)
      throw new Error("file not fount");
    const s = $e(n.content, r);
    return J(this.abs_file, n.content, s), M(this.abs_file);
  }
  async render(e, r) {
    return this.getContent(e, r);
  }
  innerContent(e) {
    this.elm_container.textContent = e;
  }
  getRootFile(e) {
    let r = this.config.path;
    return r.endsWith("/") || (r = r + "/"), r + e + this.config.extension;
  }
  get elm_container() {
    return document.querySelector(this.config.id_element);
  }
  get domText() {
    return this.elm_container.innerHTML;
  }
  storeDOM(e = !1) {
    typeof this.abs_file == "string" ? (W(this.abs_file, this.elm_container), this.abs_file = null) : this.abs_file === null && typeof e == "string" && (J(e, this.domText, document.createElement("div")), W(e, this.elm_container));
  }
}
const Pe = window.Reflect ? Reflect : { has: (t, e) => e in t };
function qe(t, e) {
  return Pe.has(t, e) && typeof t[e] == "function";
}
function Ae(t, e, r) {
  typeof t.__proto__ == "function" && typeof t.__proto__.prototype < "u" && t.__proto__.name === "Controller" && Object.setPrototypeOf(t.__proto__.prototype, e);
  try {
    const n = t.toString().substring(0, 5) === "class", s = n ? new t(e) : t(e);
    let i = n ? "" : s;
    if (n) {
      if (!qe(s, r))
        throw new Error("method not exists");
      i = s[r]();
    }
    e.response.send(i);
  } catch (n) {
    e.config.debug && D(n);
  }
}
function Me(t, e) {
  let r = {};
  return t.forEach((n, s) => r[n] = e[s]), r;
}
let $;
class f {
  constructor(e, r, n = {}) {
    this.request = e, this.response = r, this.container = n, this.setNotFount(() => {
      const s = de();
      this.page = s, this.html = document.body.innerHTML, document.body.innerHTML = "", document.body.appendChild(s);
    });
  }
  setRouters(e) {
    return this.routers = e, this;
  }
  setNotFount(e) {
    return this.catch = e, this;
  }
  send() {
    for (const e of this.routers) {
      let r = he(e.path.url, this.request.url);
      if (r !== !1)
        return this.request.params = Me(e.path.name_params, r.params), this.stateView(r.input), this.execute(e);
    }
    this.catch();
  }
  execute({ option: e, method: r }) {
    if (typeof e == "object" && (e.load && e.load.css && V("css", e.load.css), e.load && e.load.js && V("js", e.load.js), e = e.controller), typeof e == "function")
      Ae(e, this.container, r);
    else
      throw new Error("wait callback execution");
  }
  stateView(e) {
    typeof this.html == "string" && (this.page.remove(), document.body.innerHTML = this.html, delete this.html);
    const r = document.querySelectorAll("[data-remove]");
    document.querySelectorAll("[patron-handle]").length > 0 && location.reload(), r.forEach((s) => {
      ["style", "script", "link"].includes(s.tagName.toLowerCase()) && s.remove();
    }), this.container.view.storeDOM(e);
  }
  getInstance() {
    return $;
  }
  static createInstance(e, r, n) {
    return f.instance || (f.instance = new f(e, r, n)), f.instance;
  }
  static get instance() {
    return $;
  }
  static set instance(e) {
    $ = e;
  }
}
class He extends ee {
  constructor(e) {
    super(), this.debug = e.debug, le(e.base_url, e.assets_location), g("config", () => ({ ...e }));
  }
  registerContainer() {
    return g("view", (e) => new se(new ne(e.config.cview))), g("cookie", () => new B()), this;
  }
  registerContainerRequest() {
    return g("request", () => new H()), this;
  }
  registerContainerResponse() {
    return g("response", (e) => new K(e)), this;
  }
  setContainer(e, r) {
    return g(e, r), this;
  }
  run(e) {
    const r = f.createInstance(this.container.request, this.container.response, this.container);
    return r.setNotFount(e != null ? e : r.catch).setRouters(this.actions).send(), r;
  }
  handlerError(e) {
    this.debug && D(e);
  }
  get container() {
    return T();
  }
}
class Le extends H {
  constructor() {
    super();
  }
  state(e) {
    window.addEventListener("hashchange", () => {
      e.send();
    });
  }
  get url() {
    return Q(location.hash.substring(1) || "/").pathname;
  }
}
const Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Cookie: B,
  HRequest: H,
  HResponse: K
}, Symbol.toStringTag, { value: "Module" })), Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Dispacther: f,
  RoutePattern: Y,
  Route: ee
}, Symbol.toStringTag, { value: "Module" })), Ve = { View: se, ViewConfig: ne }, ze = { App: He, URLStateCapture: Le, http: Ie, route: Ue, view: Ve };
export {
  ze as default
};
