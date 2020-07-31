import { setEvaluatorCode, call_directives } from "./compile/evaluate.js";
import { get_text_script, get_style, each, resetID } from "./compile/nodes.js";
import { getStructList } from "./compile/directives.js";

/**
 * @since 0.3.0
 * @param {HTMLElement} node 
 * @param {object} styles
 */
export function set_scope_styles(node, styles) {
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


/**
 * @since 0.4.0
 * @param {object} data 
 * @return {object}
 */
export function updateProps(data, each) {
    let newdata = {};
    Object.keys(data).forEach(key => { 
        (function (key) {
            Object.defineProperty(newdata, key, {
                configurable: true,
                enumerable: true,
                get: () => data[key],
                set: (newValue) => {
                    data[key] = newValue;
                }
            });
        }(key));
    });
    return newdata;
}

/**
 * @since 0.3.0
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
    resetID();
    // añadir codigo a evaluar
    setEvaluatorCode(script, (data = updateProps(data, each)));
    // compilar
    const struct = getStructList(node.childNodes);
    
    output(struct, data);
    //debugger;
    // añadir estilos
    set_scope_styles(node, styles);
    
    return node.childNodes;
}

/**
 * 
 * @param {array} structs 
 * @param {object} data
 */
export function output(structs, data) {
    structs.forEach(struct => {
        const c = struct.c;
        const d = struct.d;
        /**@type {boolean|object} */
        let passed, merge_data = {};
        for (const directive of d.directives) {
            passed = call_directives[directive.type](directive.scope, directive.evaluate, d.node, data, d.directives);
            if (passed === false) {
                return false;
            } else if (typeof passed === 'object') {
                merge_data = Object.assign(merge_data, passed);
            }
        }
        output(c, Object.keys(merge_data).length ? Object.assign(merge_data, data) : data);
    })
}