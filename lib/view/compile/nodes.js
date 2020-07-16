import { call_prop } from "./props.js";
import cssCompile from "../simple-css-parser.js";

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
 * 
 * @param {HTMLElement} node 
 */
export function each(node, entry_fn) {
    const attrs = node.attributes;
    
    if (!attrs) return void 0;
    //try {
        
        call_prop(node, entry_fn);
    
        if (node.childNodes) {
            node.childNodes.forEach(child => each(child, entry_fn));
        }
    //} catch (e) {alert(e.stack)}
}