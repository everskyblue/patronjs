let base_url, assets_location;

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
 */
export function match_url(url, compare) {
    const rgx = new RegExp(pregQuote(url, '/')+'/?$');
    const f = rgx.exec(compare);

    return f && f.shift() === f.input ? f : false;
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
 * @type {HTMLIFrameElement}
 */
export const page_not_fount = document.createElement('iframe');
page_not_fount.allow = 'fullscreen';
page_not_fount.width = '100%';
page_not_fount.height = '100%';
page_not_fount.src = '/public/404.html';
page_not_fount.style.position = 'absolute';
page_not_fount.style.border = '0';
page_not_fount.style.zIndex = '100';

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