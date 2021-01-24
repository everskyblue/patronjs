import cssCompile from "./simple-css-parser.js";


/**
 * 
 * @param {HTMLElement} node 
 * @return {string}
 */
export function get_text_script(node) {
    let sc = node.querySelector('script') || {};
    if (typeof sc.remove === 'function') sc.remove();
    return sc.innerText||'';
}

/**
 * 
 * @param {HTMLElement} node
 * @return {object}
 */
export function get_style(node) {
    let st = node.querySelector('style[scope]') || {};
    if (typeof st.remove === 'function') st.remove();
    return cssCompile.parse(st.innerText||'');
}

/**
 * @since 0.3.0
 * @param {HTMLElement} node 
 * @param {object} styles
 */
export function add_styles(node, styles) {
    for (const selector in styles) {
        const select_nodes = node.querySelectorAll(selector);
        if (select_nodes.length>0) {
            select_nodes.forEach(elm => {
                for (const property in styles[selector]) {
                    elm.style[property] = styles[selector][property];
                }
            })
        }
    }
}
