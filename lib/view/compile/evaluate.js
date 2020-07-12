let $__eval_js;

/**
 * @returns {ReferenceError|any}
 */
function evaluate() {
    try {
        return (new Function(...arguments)).call();
    }catch(e) {
        return e;
    }
}

/**
 * @param {string} to_eval 
 */
export function setEvaluatorCode(code) {
    $__eval_js = code;
}

/**
 * @param {string} to_eval 
 */
export function evaluateAndGetCode(to_eval) {
    return evaluate(`"use strict";${$__eval_js}\n return ${to_eval.replace(/[\{\}]/g, '')}`);
}