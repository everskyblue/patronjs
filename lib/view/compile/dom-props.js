import { vw_error, vw_args, kw_find } from "./error.js";
import { evaluateAndGetCode } from "./evaluate.js";
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
 * @version 0.3.0
 * @since 0.3.1
 * @param {HTMLElement} elemento de entrada
 * @param {Function} entry_fn entrada a llamar
 * @return {Set.<object>}
 */
export function get_struct(node) {
    let fns = new Set();

   Object.values(node.attributes).forEach(attr => {
        if (attr.name === '@if') {
            fns.add(({type: 'if', fn: on_if(attr.value)}));
        }

        if (attr.name === '@for') {
            const c3 = attr.value.split(' ');
            // numero de argumentos validos
            vw_error(vw_args(c3, 3), 'num args not match');
            // retorna el tipo de itaracion de valor deseado. en caso de error genera una excepcion
            const kwd = kw_find('of', 1, c3) ? 'of' : kw_find('in', 1, c3) ? 'in' : vw_error(true, 'syntax error');
            
            fns.add({
                type: 'for',
                scope: scope_code(attr.value),
                evaluate: {
                    type: 'iterator',
                    kwd,
                }
            });
        }
    
        if (attr.name === ':bind') {
            const split_key = key_data.split('.'),
                    scope = scope_code(split_key.shift());

            fns.add({
                scope,
                type: 'bind',
                reference_key: split_key
            });
        }
        if (/\@event\:(.*)$/.test(attr.name)) {
            fns.add({
                type: 'event',
                scope: scope_code(attr.value),
                events: attr.name.split(':').filter(e => !(e[0]==='@'))
            });
        }
    })
    
    return fns;
}