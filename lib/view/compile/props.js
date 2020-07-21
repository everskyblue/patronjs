import { vw_error, vw_args, kw_find, bind_error } from "./error.js";
import { evaluateAndGetCode } from "./evaluate.js";

export const elms_compiled = [];

/**
 * @type {Set[]}
 */
let store_elements = [];

/**
 * añade una pila de recompilamiento para actualizar nuevos datos
 * @param {string} key 
 * @param {function} fun 
 */
function storeElement(key, fun) {
    if (!store_elements.has(key)) {
        store_elements.set(key, fun);
    }
}

/**
 * @param {array} data
 * @param {array} keys 
 */
function convertValue(data, keys) {
    let x = 0, key = keys[x];
    while (typeof key !== 'undefined' && typeof data === 'object') {
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
                    //store_elements = store_elements.filter(s => !!s);
                    //console.log(store_elements);
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
        //if (pc.type === 'if') {
           // pc.fn(element, data);
        //} if (pc.type === 'for') {
            return pc.fn(element, data, each);
        //} if (pc.type === 'bind') {
            //pc.fn(element, data);
        //} if (pc.type === 'event') {
            //pc.fn(element, data);
        //}
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

function CompileSource(scope, value) {
    this.scope = scope;
    this.value = value;
}

/**
 * @since 0.3.0
 * @param {string} key_data 
 * @return {function}
 */
function on_bind(key_data) {
    const split_key = key_data.split('.'), ref_key = split_key.shift();
    let data_value, scope = scope_code(ref_key), attr;
    /**
     * @param {HTMLElement} node 
     * @param {object} data 
     */
    function v_bind(node, data) {
        attr = node.attributes.getNamedItem(':bind');
        if (scope.local) {
            data_value = convertValue(getCodeOrThrowError(scope.called), split_key);
        } else {
            data_value = bind_error(scope.called, data) || convertValue(data[scope.called], split_key);
            vw_error(typeof data_value === 'boolean', `var ${scope.called} no find`);
        }
        node.innerHTML = data_value;
        node.attributes.removeNamedItem(':bind');
        /** @since 0.4.0 */
        return new CompileSource(scope, data_value);
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
        const attr = node.attributes.getNamedItem('@for');
        (attr&&node.attributes.getNamedItem('@for')&&node.attributes.removeNamedItem('@for'));
        
        /**
         * esto hace que al copiar el nodo del dom se mantengan las propiedades
         * al momento de eliminarlas
         */
        const $copy = node.cloneNode(true), del_nodes = [];
        //const copy_store = [...store_elements];
        iterator.forEach((val, pos) => {
            if (!node.parentElement) { return }
            let clone = (pos === 0 ? node : $copy.cloneNode(true));
            locals[c3[0]] = (kwf === 'in' ? pos : val);
            if (pos > 0) del_nodes.push(clone)&&each(node.parentElement.appendChild(clone), entry(locals, each));
            // itera nuevamente el nodo
            else each(node, entry(locals, each));
        });
        /** @since 0.4.0 */
        
        return new CompileSource(c3, locals);
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
    let scope = scope_code(callable),invoke,
        name_attr = `@event:${arr_events.join(':')}`,
        attr;

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
        attr = elm.attributes.getNamedItem(name_attr);
        (attr&&elm.attributes.removeNamedItem(name_attr));
        return new CompileSource(scope, data);
    }

    return v_event;
}

/**
 * 
 * @param {string} source 
 */
function on_if(source) {
    const scope = scope_code(source);
    let attr, is;
    /**
     * @param {HTMLElement} node 
     * @param {object} d 
     */
    function v_if(node, d) {
        is = (scope.local ? getCodeOrThrowError(scope.called) : d[scope.called]);
        attr = node.attributes.getNamedItem('@if');
        if (is) {
            node.remove();
        } else {
            (attr&&node.attributes.removeNamedItem('@if'));
        }
        return new CompileSource(scope, d);
    }

    return v_if;
}

/**
 * @version 0.3.0
 * @since 0.3.1
 * @param {HTMLElement} elemento de entrada
 * @param {Function} entry_fn entrada a llamar
 * @return {Set.<object>}
 */
export function call_prop(node, entry_fn) {
    let fns = new Set();

   Object.values(node.attributes).forEach(attr => {
        if (!node.attributes.getNamedItem(attr.name)) {
            return;
        }

        if (attr.name === '@if') {
            fns.add(({type: 'if', fn: on_if(attr.value)}));
        }
    
        if (attr.name === '@for') {
            fns.add({type: 'for', fn: on_for(attr.value)});
        }
    
        if (attr.name === ':bind') {
            fns.add({type: 'bind', fn: on_bind(attr.value)});
        }
        if (/\@event\:(.*)$/.test(attr.name)) {
            fns.add({type: 'event', fn: on_event(attr.name.split(':').filter(e => !(e[0]==='@')), attr.value)});
        }
        
        //entry({type: 'default', fn: function(){}}, each);
    })
    
    return fns;
}