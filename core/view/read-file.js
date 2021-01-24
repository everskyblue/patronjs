/**
 * @file menejador archivos
 * @since 0.3.0
 */

 /**
  * @description interfaz de respuesta
  */
export class ResponseReader {
    constructor() {
        this.error = false;
        this.content = '';
        this.status = null;
    }
}

/**
 * lector de peticion
 * @param {string} file
 * @param {string} name_fn
 * @return {Promise.<ResponseReader>}
 */
export default async function (file, name_fn = 'text') {
    const res = await fetch(file);
    const response_reader = new ResponseReader();
    response_reader.status = res.status;

    if (res.status !== 200) {
        response_reader.error = true;
    } else {
        response_reader.content = await res[name_fn]();
    }

    return response_reader;
}