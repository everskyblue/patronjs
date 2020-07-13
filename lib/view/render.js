import { setEvaluatorCode } from "./compile/evaluate.js";
import { get_text_script, get_style, each } from "./compile/nodes.js";
import { entry, updateProps } from "./compile/props.js";

/**
 * 
 * @param {HTMLElement} node 
 * @param {object} styles
 */
export function set_scope_styles(node, style) {
    for (const selector in style) {
        const select_nodes = node.querySelectorAll(selector);
        if (select_nodes.length>0) {
            select_nodes.forEach(elm => {
                for (const property in style[selector]) {
                    elm.style[property] = style[selector][property];
                }
            })
        }
    }
}

/**
 * 
 * @param {string} content source
 * @param {object} data
 * @return {NodeList}
 */
export function parse(content, data) {
    let node = document.createElement('div');
        node.innerHTML = content;
    
    const script = get_text_script(node),
    // obtener un objecto de estilos
        styles = get_style(node);

    // añadir codigo a evaluar
    setEvaluatorCode(script, (data = updateProps(data)));
    // compilar
    each(node, entry(data, each));
    // añadir estilos
    set_scope_styles(node, styles);
    
    return node.childNodes;
}