import { getContainer } from "./container.js";

let base_url, assets_location;

const ApiPattern = (this||globalThis).URLPattern;
const existsApiPattern = ApiPattern !== undefined || ApiPattern !== null;

export function setUtilLocation(ubase, lassets) {
    base_url = ubase;
    assets_location = lassets;
}

/**
 *
 * @param {string} str
 * @param {string} rpl
 * @returns {string}
 */
export function pregQuote(str, rpl) {
    if(str.match(/\//g) !== null) {
        str = String(str).replace(new RegExp('[.\\\*$=!<>|\\' + (rpl || '') + ']', 'g'),'\\$&');
    }
    return str;
}

/**
 *
 * @param {string} url
 * @param {string} compare
 * @returns {boolean|{input: string, params: string[]}}
 */
export function match_url(url, compare) {
    const config = getContainer().config;
    const pattern = existsApiPattern
        ? new ApiPattern(url, config.base_url)
        : new RegExp(pregQuote(url, '/')+'/?$');
    const args = [compare];

    if (existsApiPattern) {
        args.push(config.base_url);
    }

    const match = pattern.exec(...args);

    if (match === null) return false;

    let result = {input: '', params: []};
    if (existsApiPattern) {
        const {input, groups} = match.pathname;
        result.input = input;
        result.params.push(...Object.values(groups));
    } else {
        if (match.input !== match.shift()) return false;
        result.input = match.input;
        result.params.push(...match);
    }
    return result;
}

/**
 *
 * @param {string} url
 * @return {URL}
 */
export function parse_url(url) {
    return new URL(url, base_url);
}

/**
 *
 * @param {string} type
 * @param {Array} files
 */
export function load_assets(type, files) {
    const {base_url, assets_location} = getContainer().config;
    const root = assets_location[type];
    for (const file of files) {
        let e;
        if (type === 'css') {
            e = document.createElement('link');
            e.href = `${base_url}${root}${file}.css`;
            e.rel = 'stylesheet'
            document.head.appendChild(e);
        } else if (type === 'js') {
            e = document.createElement('script');
            e.src = `${base_url}${root}${file}.js`;
            document.body.appendChild(e);
        }

        if (!!e) e.setAttribute('data-remove', true);
    }
}

export function comparator(value, operator, to) {
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

    throw new ReferenceError(`operator ${operator} no es valido`);
}

/**
 * @return {HTMLIFrameElement}
 */
export const page_not_fount = ()=> {
    const public_dir = getContainer().config.public_dir
    const iframe = document.createElement('iframe');
    iframe.allow = 'fullscreen';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = `${public_dir}/404.html`;
    iframe.style.position = 'absolute';
    iframe.style.border = '0';
    iframe.style.zIndex = '100';return iframe;
}

let style_log = `
<style>
h2.err-msg {
    background: #3F51B5;
    padding: 10px;
    color: #d5e812;
}
h4{
    font-size: xx-large;
    margin-bottom: 10px;
}
.err-stacks {
    padding: 10px;
    line-height: 25px;
}
.stack {
    border: 5px dashed #c72e2e;
    padding: 10px;
    color: #0e3ce4;
    text-decoration: underline;
    border-style: double;
    counter-reset: errs;
}
.stack > div:before {
    counter-increment: errs;
    content: counters(errs,".") " ";
}
</style>
`;
/**
 * 
 * @param {Error} e 
 */
export function template_logger(e) {
    const errs = e.stack.split('\n');
    const msg = `<h2 class="err-msg">${errs.shift()}</h2>`;
    let stacks = `
        <div class="err-stacks">
            <h4>Stacks:</h4>
            <div class="stack">`;
    for (const err of errs) stacks += `<div>${err.trim()}</div>`;
    stacks += '</div></div>';
    document.title = 'error application';
    document.body.innerHTML = `${style_log}\n<div class="debug">${msg}${stacks}</div>`;
}