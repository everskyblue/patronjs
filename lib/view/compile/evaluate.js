let $__eval_js, $___eval_params = {}, $__eval_data = {};
 
/**
 * @returns {ReferenceError|any}
 */
function evaluate() {
    try {
        return (new Function(...['$data', ...Object.keys($___eval_params), ...arguments])).call(null, $___eval_params, ...Object.values($___eval_params));
    }catch(e) {
        return e;
    }
}

/**
 * @param {string} to_eval 
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