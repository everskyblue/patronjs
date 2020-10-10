
/**
 * 
 * @param {boolean} is_error
 * @param {string} msg
 * @throws {Error}
 */
export function vw_error(is_error, msg) {
    if (is_error) throw new Error(msg);
}

/**
 * 
 * @param {string} key property of the data
 * @param {object} data
 * @return {boolean}
 */
export function bind_error(key, data) {
    return (!(key in data));
}

/**
 * 
 * @param {Array} args 
 * @param {number} num_args 
 * @return {boolean}
 */
export function vw_args(args, num_args) {
    return (args.length !== num_args)
}

/**
 * 
 * @param {string} key reserver word
 * @param {number} pos position key
 * @param {array} data entry execution
 * @return {boolean}
 */
export function kw_find(key, pos, data) {
    return data[pos].trim() === key;
}