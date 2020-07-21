let $__eval_js, $___eval_params = {}, $__eval_data = {};
 
/**
 * @returns {ReferenceError|any}
 */
function evaluate() {
    try {
        // @ts-ignore
        return (new Function(...['$data', ...Object.keys($___eval_params), ...arguments])).call(null, $___eval_params, ...Object.values($___eval_params));
    }catch(e) {
        return e;
    }
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
 * @param {string} code 
 * @param {object} scope_params
 */
export function setEvaluatorCode(code, scope_params) {
    $__eval_js = code;
    (scope_params&&($___eval_params = scope_params));
}

/**
 * @param {string} to_eval 
 * @return {any}
 */
export function evaluateAndGetCode(to_eval) {
    if ((to_eval in $__eval_data) && !!$__eval_data[to_eval]) return $__eval_data[to_eval];
    return ($__eval_data[to_eval] = evaluate(`"use strict";${$__eval_js}\n return ${to_eval.replace(/[\{\}]/g, '')}`));
}

export const call_directives = {

    /**
     * @param {object} scope
     * @param {any} evaludate
     * @param {HTMLElement} node
     * @param {array} data
     */
    'bind': (scope, evaluate, node, data) => {
        //if (scope.local) {
            //console.log(scope);
        //}
    },

    /**
     * @param {object} scope
     * @param {any} evaludate
     * @param {HTMLElement} node
     * @param {array} data
     */
    'for': (scope, evaluate, node, data) => {
        const iterate_data = (scope.local ? evaluateAndGetCode(scope.called) : data[scope.called]);
        
        for (let idx = 1; idx < iterate_data.length; idx++) {
            node.insertAdjacentElement('afterend', node.cloneNode(true))
        }
        
        return JSON.parse(`{"${evaluate.name_var}": "${iterate_data}"}`);
    },

    /**
     * @param {object} scope
     * @param {any} evaludate
     * @param {HTMLElement} node
     * @param {array} data
     */
    'event': (scope, evaluate, node, data) => {

    },

    /**
     * @param {object} scope
     * @param {any} evaludate
     * @param {HTMLElement} node
     * @param {array} data
     */
    'if': (scope, evaluate, node, data) => {

    }
}