import { vw_error, vw_args, kw_find, bind_error } from "./error.js";
import { evaluateAndGetCode } from "./evaluate.js";

export const elms_compiled = {};

/**
 * @param {array} data
 * @param {array} keys 
 */
function convertValue(data, keys) {
    let x = 0, key = keys[x];
    while (typeof key !== 'undefined') {
        vw_error(bind_error(key, data), `variable or property ${keys.join('.')} not find`);
        data = data[key];
        key = keys[++x];
    }
    return ['object', 'array'].indexOf(typeof data) >= 0 ? JSON.stringify(data) : data;
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
                set: (value) => {
                    data[key] = value;
                    console.log(elms_compiled,key);
                    elms_compiled[key](newdata);
                }
            });
        }(key));
    });
    return newdata;
}

/**
 * @since 0.3.0
 * @param {string} reference_code 
 * @throws {Error}
 * @returns {any}
 */
function getCodeOrThrowError(reference_code) {
    let $any = evaluateAndGetCode(reference_code);
    if ($any instanceof Error) {
        throw $any;
    }
    return $any;
}

/**
 * @typedef {object} PropertyCompiler
 * @property {string} type type property
 * @property {function} fn callback to compiler
 */

/**
 * @since 0.3.0
 * @param {Prop} data 
 * @param {function} each 
 * @return {function}
 */
export function entry(data, each) {
    /**
     * @param {PropertyCompiler} pc
     * @param {HTMLElement} node
     */
    function entry_fn(pc, element) {
        if (pc.type === 'if') {
            pc.fn(element, data);
        } if (pc.type === 'for') {
            pc.fn(element, data, each);
        } if (pc.type === 'bind') {
            pc.fn(element, data);
        } if (pc.type === 'event') {
            pc.fn(element, data);
        }
    }
    
    return entry_fn;
}

/**
 * @typedef {object} ScopeType
 * @property {string} called nombre de la propiedad que es llamada
 * @property {boolean} local dato definido por global o del template llamado
 */

/**
 * @since 0.3.0
 * @param {string} $var 
 * @return {ScopeType}
 */
export function scope_code($var) {
    let scope = {called: $var, local: false}; 
    if ($var.charAt(0) === '{') {
        scope = {called: $var.replace(/[\{|\}]/g, ''), local: true};
    }
    return scope;
}

/**
 * @since 0.3.0
 * @param {string} key_data 
 * @return {function}
 */
function on_bind(key_data) {
    const split_key = key_data.split('.'), ref_key = split_key.shift();
    let data_value, scope = scope_code(ref_key);
    /**
     * @param {HTMLElement} node 
     * @param {object} data 
     */
    function v_bind(node, data) {
        if (scope.local) {
            data_value = convertValue(getCodeOrThrowError(scope.called), split_key);
        } else {
            data_value = bind_error(scope.called, data) || convertValue(data[scope.called], split_key);
            vw_error(typeof data_value === 'boolean', `var ${scope.called} no find`);
        }
        node.innerHTML = data_value;
        node.attributes.removeNamedItem(':bind');
        /** @since 0.4.0 */
        elms_compiled[scope.called] = function (data) {
                node.setAttribute(':bind', scope.called);
                v_bind(node, data);
        }
    }
    
    return v_bind;
}

/**
 * @since 0.3.0
 * @param {string} source 
 * @return {function}
 */
function on_for(source) {
    const c3 = source.split(' ');
    // numero de argumentos validos
    vw_error(vw_args(c3, 3), 'num args not match');
    // retorna el tipo de itaracion de valor deseado. en caso de error genera una excepcion
    const kwf = kw_find('of', 1, c3) ? 'of' : kw_find('in', 1, c3) ? 'in' : vw_error(true, 'syntax error');
    
    /**
     * @param {HTMLElement} node 
     * @param {object} data 
     * @param {function} each 
     */
    function v_for(node, data, each) {
        let locals = {...data};
        //comprueba que exista la variable
        const iterator = vw_error(bind_error(c3[2], data), `iterate variable ${c3[2]} where no exists`) || data[c3[2]];
        // para prevenir un error al momento de actulizar datos
        (node.attributes.getNamedItem('@for')&&node.attributes.removeNamedItem('@for'));
        
        /**
         * esto hace que al copiar el nodo del dom se mantengan las propiedades
         * al momento de eliminarlas
         */
        const $copy = node.cloneNode(true), del_nodes = [];

        iterator.forEach((val, pos) => {
            let clone = (pos === 0 ? node : $copy.cloneNode(true));
            
            locals[c3[0]] = (kwf === 'in' ? pos : val);
            if (pos > 0) del_nodes.push(clone)&&each(node.parentElement.appendChild(clone), entry(locals, each));
            // itera nuevamente el nodo
            else each(node, entry(locals, each));
        });
        
        /** @since 0.4.0 */
        elms_compiled[c3[2]] = function(data) {
            del_nodes.forEach(del_node => del_node.remove());
            node.setAttribute(':bind', c3[0]);
            v_for(node, data, each);
        }
    }

    return v_for;
}

/**
 * @since 0.3.0
 * @param {string[]} arr_events arreglo de eventos
 * @param {string} callable nombre de la funcion
 * @return {function}
 */
function on_event(arr_events, callable) {
    let scope = scope_code(callable),invoke;

    if (scope.local) {
        scope.invoke = getCodeOrThrowError(scope.called)
    }

    /**
     * @param {HTMLElement} elm
     * @param {object} data
     */
    function v_event(elm, data) {
        invoke = scope.invoke || data[scope.called];
        vw_error(typeof invoke !== 'function', `reference to call ${scope.called} is not a function`);
        arr_events.forEach(event_name => elm.addEventListener(event_name, invoke));
        elm.attributes.removeNamedItem(`@event:${arr_events.join(':')}`)
    }

    return v_event;
}


function on_if(source) {
    const scope = scope_code(source);
    function v_if(node, d) {
        const is = (scope.local ? getCodeOrThrowError(scope.called) : d[scope.called]);
        const content = node.innerHTML;
        if (is) {
            node.innerHTML = '';
        }
        (node.attributes.removeNamedItem('@if'));
    }

    return v_if;
}

/**
 * @version 0.3.0
 * @since 0.3.1
 * @param {HTMLElement} elemento de entrada
 * @param {Function} entry_fn entrada a llamar
 */
export function call_prop(node, entry_fn) {
   Object.values(node.attributes).forEach(attr => {
        if (attr.name === '@if') {
            entry_fn({type: 'if', fn: on_if(attr.value)}, node);
        }
    
        if (attr.name === '@for') {
            entry_fn({type: 'for', fn: on_for(attr.value)}, node);
        }
    
        if (attr.name === ':bind') {
            entry_fn({type: 'bind', fn: on_bind(attr.value)}, node);
        }
    
        if (/\@event\:(.*)$/.test(attr.name)) {
            entry_fn({type: 'event', fn: on_event(attr.name.split(':').filter(e => !(e[0]==='@')), attr.value)}, node);
        }
        
        //entry({type: 'default', fn: function(){}}, each);
    })
}