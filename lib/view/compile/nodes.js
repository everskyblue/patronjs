import { call_prop, elms_compiled } from "./props.js";
import cssCompile from "../simple-css-parser.js";

let data_vw_id = 0;

export function resetID() {
    data_vw_id = 0;
}

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
    if (!node.attributes || node.nodeName.indexOf('text')>0) return void 0;
    
    const noid = !node.hasAttribute('data-vw-id');

    if (noid) node.setAttribute('data-vw-id', String(data_vw_id++));
    const set = call_prop(node, entry_fn);

    if (set.size) {
        let a = [];
        set.forEach(o => {
            a.push(entry_fn(o, node));
        });
        if (noid) elms_compiled.push({a, node});
    }
    
    

    if (node.childNodes.length) {
        node.childNodes.forEach(child => each(child, entry_fn));
    }
}