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
 * 
 * @param {string} var_name 
 * @param {boolena} is_local 
 * @returns {any}
 */
function getValue(var_name, is_local) {
    return (is_local ? getCodeOrThrowError(var_name) : $___eval_params[var_name]);
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
 * @param {array|object} data
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
        const orginal_data = $___eval_params;
        $___eval_params = data;
        node[node.attributes.getNamedItem('escape') ? 'innerText' : 'innerHTML'] = convertValue( getValue(scope.called, scope.local), evaluate);
        $___eval_params = orginal_data;
    },

    /**
     * @param {object} scope
     * @param {any} evaludate
     * @param {HTMLElement} node
     * @param {array} data
     */
    'for': function (scope, evaluate, node, data) {
        const iterate_data = getValue(scope.called, scope.local, data),
        
            new_data = JSON.parse(`{"${evaluate.name_var}": ""}`);
        
        for (let idx = 1, clone; idx < iterate_data.length; idx++) {
            clone = node.cloneNode(true);
            /* new_data[evaluate.name_var] = iterate_data[idx];
            this.bind(scope, [], node, Object.assign(data, new_data)); */
            node.insertAdjacentElement('afterend', clone)
        }
        
        new_data[evaluate.name_var] = iterate_data[0];

        return new_data;
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
        const is_true = getValue(scope.called, scope.local);
        if (!is_true) {
            node.style.display = 'none';
        }
        return is_true;
    }
}