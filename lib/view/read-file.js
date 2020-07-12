class ResponseReader {
    constructor() {
        this.error = false;
        this.content = '';
    }
}

/**
 * 
 * @param {string} file
 * @return {ResponseReader}
 */
export default async function (file) {
    const res = await fetch(file);
    const response_reader = new ResponseReader();
    response_reader.status = res.status;

    if (res.status !== 200) {
        response_reader.error = true;
    } else {
        response_reader.content = await res.text();
    }

    return response_reader;
}