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
        ? new ApiPattern(`${url}(\\/?)`, config.base_url)
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
    const {assets_location} = getContainer().config;
    const root = assets_location[type];
    for (const file of files) {
        let e;
        if (type === 'css') {
            e = document.createElement('link');
            e.href = `${root}${file}.css`;
            e.rel = 'stylesheet'
            document.head.appendChild(e);
        } else if (type === 'js') {
            e = document.createElement('script');
            e.src = `${root}${file}.js`;
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
    iframe.style.zIndex = '100';
    return iframe;
}

/**
 * 
 * @param {Error} e 
 */
export function template_logger(e) {
    if (!(e instanceof Error) || Object.prototype.toString.call(e) === '[object Object]') {
        e = new Error(typeof e === 'object' ? JSON.stringify(e) : e);
    }

    if (!window.hljs) {
        const script = document.createElement('script')
        const scriptNumber = document.createElement('script')
        const link = document.createElement('link')
        scriptNumber.src = '//cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js';
        script.src = 'https://unpkg.com/@highlightjs/cdn-assets@11.6.0/highlight.min.js';
        link.rel = 'stylesheet'; link.href = 'https://unpkg.com/@highlightjs/cdn-assets@11.6.0/styles/androidstudio.min.css';
        document.head.append(script,link);
        script.onload = ()=> document.head.append(scriptNumber);
        addAttributes(script, scriptNumber, link);
    }

    const style = document.createElement('link')
    const script = document.createElement('script')
    style.href = import.meta.url.substring(0, import.meta.url.lastIndexOf('/')) + '/styles.css';
    script.src = import.meta.url.substring(0, import.meta.url.lastIndexOf('/')) + '/error-fetch-template.js';
    style.rel = 'stylesheet'
    addAttributes(style, script)
    document.head.append(style, script);

    const stacks = e.stack.split('\n').slice(1);
    const tpl = `
    <h1 class="error-title">Error Application</h1>
    <div id="error-container">
        <section class="error-info">
            <div class="type-error-info">
                <p class="type-error"><b class="color-primary">Error Name:</b> ${e.name}</p>
            </div>
            <div class="message-error-info">
                <p class="message-error"><b class="color-primary">Message:</b> ${e.message}</p>
            </div>
        </section>
        <section class="view-code">
            <div><pre class="show-code"><p class="text-empty-preview">preview code</p></pre></div>
        </section>
        <section class="error-stacks error-stacks-content">
            <div class="error-stacks-info">${stringStacks(stacks)}</div>
        </section>
    </div>
    `;

    document.title = 'Error Application';
    style.onload = ()=> document.body.innerHTML = tpl;
}

/**
 * 
 * @param  {...HTMLElement} elements 
 */
 function addAttributes(...elements) {
    elements.forEach(element => {
        element.setAttribute('patron-handle', '');
    });
}

function stringStacks(stacks) {
    let html = '';
    for (const stack of stacks) {
        const eof = stack.trim()
        const match = eof.trim().match(/\((.*)?\)/);
        let fnStack = match === null ? 'at' : stack.replace(match[0], '').trim()
        ,file = (match === null ? eof.slice(3) : match[1]).replace(location.origin, '')
        ,lines = file.split(':').slice(1).join(':');
        file = file.replace(`:${lines}`, '');
        html += `<div class="error-stack">
            <p data-file-error="${file}" onclick="getCode('${file}','${lines}')">
                <span><b class="color-primary">file:</b> ${file}</span>
                <span><b class="color-primary">line:</b> ${lines}</span>
                <span><b class="color-primary">callback:</b> ${fnStack}</span>
            </p>
        </div>`;
    }
    return html;
}
