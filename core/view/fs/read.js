import readFile, {ResponseReader} from "../read-file";

let isNode = typeof module == 'object' && typeof module.exports == 'object';

let fs = isNode ? require('fs') : null;

/**
 * read file via NodeJs
 * @requires Promise
 * @param {string} file 
 * @returns {Promise<ResponseReader>}
 */
export async function nodeReadFile(file) {
    return new Promise((resolve) => {
        let rf = new ResponseReader();
        try {
            rf.content = fs.readFileSync(file, {encoding:'utf8'})
            rf.status = 200;
        } catch (errfile) {
            rf.error = true;
            rf.status = 400;
        }
        resolve(rf);
    });
}

/**
 * read file via browser
 * @param {string} file 
 */
export function browserReadFile(file) {
    return readFile(file);
}

/**
 * get content
 * @param {string} file 
 * @returns {Promise<ResponseReader>}
 */
export function reader(file) {
    return (
        isNode ? nodeReadFile(file) : browserReadFile(file)
    );
}