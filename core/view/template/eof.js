import {loopDragonData} from './helpers'

class EOF {
    /**
     * 
     * @param {string} str 
     * @param {object} data 
     * @returns 
     */
    static compile(str, data) {
        return loopDragonData(str, data);
    }

    /**
     * 
     * @param {string} r 
     * @returns 
     */
    static raw(r) {
        return r.toString();
    }

    /**
     * 
     * @param {string} j 
     * @returns 
     */
    static json(j) {
        return JSON.stringify(j);
    }

    /**
     * 
     * @param {string} e 
     * @returns 
     */
    static entity(e) {
        return e.replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * 
     * @param {string} e 
     * @returns 
     */
    static e(e) {
        return this.entity(e);
    }
}