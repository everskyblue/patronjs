let $__assign_eval_var_render, $__eval_js;

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

export function setEvaluatorCode(code) {
    $__eval_js = code;
}

export function evaluateAndGetCode(to_eval) {
    return evaluate(`"use strict";${$__eval_js}\n return ${to_eval.replace(/[\{\}]/g, '')}`);
}

/**
 * 
 * @param {string} $__eval_js
 */
/* export default function (/*$__eval_js/) {
    return {
        $__assign_eval_var_render,
        verify: function (params) {
            let rq = params.replace(/[\{\}]/g, ''),
                val = evaluate(`${$__eval_js}\n return ${rq}`);
                console.log(val);
        },
        each(node) {

        }
    }
} */