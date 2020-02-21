import {base_url, assets_location} from '/config/app.js';

/**
 * 
 * @param {String} str 
 * @param {String} rpl 
 */
export function pregQuote(str, rpl) {
    if(str.match(/\//g) !== null) {
        str = String(str).replace(new RegExp('[.\\\*$=!<>|\\' + (rpl || '') + ']', 'g'),'\\$&');
    }
    return str;
}

/**
 * 
 * @param {String} url 
 * @param {String} compare 
 */
export function match_url(url, compare) {
    const rgx = new RegExp(pregQuote(url, '/')+'/?$');
    const f = rgx.exec(compare);

    return f && f[0] === f.input;
}

/**
 * 
 * @param {String} url 
 * @return {*}
 */
export function parse_url(url) {
    return new URL(url, base_url);
}

/**
 * 
 * @param {String} type 
 * @param {Array<Object>} files 
 */
export function load_assets(type, files) {
    const root = assets_location[type];
    for (const file of files) {
        if (type === 'css') {
            let e = document.createElement('link');
            e.href = `${base_url}${root}${file}.css`;
            e.rel = 'stylesheet'
            document.head.appendChild(e);
        } else if (type === 'js') {
            let e = document.createElement('script');
            e.src = `${base_url}${root}${file}.js`;
            document.body.appendChild(e);
        }
    }
}