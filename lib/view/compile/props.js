import { vw_error, vw_args, kw_find, bind_error } from "./error.js";
import { evaluateAndGetCode } from "./evaluate.js";

const elms_compiled = [];

export function updateProps(data) {
    let newdata = {};
    Object.keys(data).forEach(key => { 
        (function (key) {
            Object.defineProperty(newdata, key, {
                configurable: true,
                enumerable: true,
                get: () => data[key],
                set: (value) => { data[key] = value; }
            });
        }(key));
    });
    return newdata;
}

/**
 * 
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
 * 
 * @param {object} data 
 * @param {function} each 
 */
export function entry(data, each) {
    return function (map, element) {
        if (map.type === 'for') {
            map.fn(element, data, each);
        } else if (map.type === 'bind') {
            map.fn(element, data);
        }else if (map.type === 'event') {
            map.fn(element, data);
        }
    }
}

/**
 * @typedef {object} ScopeType
 * @property {string} called nombre de la propiedad que es llamada
 * @property {boolean} local dato definido por global o del template llamado
 */

/**
 * 
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
 * 
 * @param {string} key_data 
 * @return {function}
 */
function on_bind(key_data) {
    let data_value, scope = scope_code(key_data);
    /**
     * 
     * @param {HTMLElement} node 
     * @param {object} data 
     */
    function v_bind(node, data) {
        if (scope.local) {
            data_value = getCodeOrThrowError(key_data);
        } else {
            data_value = bind_error(scope.called, data) || data[scope.called];
            vw_error(typeof data_value === 'boolean', `var ${scope.called} no find`);
        }
        node.innerHTML = data_value;
        node.attributes.removeNamedItem(':bind');
    }
    
    return v_bind;
}

/**
 * 
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
     * 
     * @param {HTMLElement} node 
     * @param {object} data 
     * @param {function} each 
     */
    function v_for(node, data, each) {
        let locals = {...data};
        //comprueba que exista la variable
        const iterator = vw_error(bind_error(c3[2], data), `iterate variable ${c3[2]} where no exists`) || data[c3[2]];
        
        node.attributes.removeNamedItem('@for');

        /**
         * esto hace que al copiar el nodo del dom se mantengan las propiedades
         * al momento de eliminarlas
         */
        const $copy = node.cloneNode(true);

        iterator.forEach((val, pos) => {
            let clone = (pos === 0 ? node : $copy.cloneNode(true));
            locals[c3[0]] = (kwf === 'in' ? pos : val);
            if (pos > 0) each(node.parentElement.appendChild(clone), entry(locals, each));
            // itera nuevamente el nodo
            else each(node, entry(locals, each));
        });
    }

    return v_for;
}

/**
 * 
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
    }

    return v_event;
}

/**
 * @typedef {object} PropertyCompiler
 * @property {string} type type property
 * @property {function} fn callback to compiler
 */

/**
 * 
 * @param {string} type_property nombre de la propiedad
 * @param {string} value valor de la propiedad
 * @return {PropertyCompiler} 
 */
export function call_prop(type_property, value) {
    if (type_property === '@for') {
        return {type: 'for', fn: on_for(value)};
    }

    if (type_property === ':bind') {
        return {type: 'bind', fn: on_bind(value)};
    }

    if (/\@event\:(.*)$/.test(type_property)) {
        return {type: 'event', fn: on_event(type_property.split(':').filter(e => !(e[0]==='@')), value)};
    }
    
    return {type: 'default', fn: function(){}};
}