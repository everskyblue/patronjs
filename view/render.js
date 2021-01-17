import { setEvaluatorCode, output } from "./evaluate.js";
import { get_text_script, get_style } from "./scope.js";
import { getStructList, todo } from "./analyzer.js";
import { reader } from "./fs/read";
import { parserImport } from "./analyzer/import";
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
                    // @ts-ignore
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
export function updateProps(data) {
    let newdata = {};
    Object.keys(data).forEach(key => { 
        (function (key) {
            Object.defineProperty(newdata, key, {
                configurable: true,
                enumerable: true,
                get: () => data[key],
                set: (newValue) => {
                    data[key] = newValue;
                    let din = todo.filter(r => {
                        let passed = false;
                        for(let o of r.d.directives.values()) {
                            if (o.scope.called === key) {
                                if (o.type === 'for') {
                                    while (r.d.node.nodeName === r.d.node.nextSibling.nodeName) {
                                        r.d.node.nextSibling.remove();
                                    }
                                }
                                passed = true;
                                break;
                            }
                        }
                        return passed;
                    });
                    output(din, newdata);
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
 * @return {HTMLElement}
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
    const struct = getStructList(node.childNodes);
    // salida de vista
    output(struct, data)
    // añadir estilos
    set_scope_styles(node, styles);
    
    return node;
}

/**
 * @param {string} sourcejs
 * @param {any} data
 */
function templates(sourcejs, data) {
    const map = parserImport(sourcejs);

    if (map.imports.length > 0) {
        map.imports.forEach(async (mapimport) => {
            reader(mapimport.modulePath)
        });
    }
}