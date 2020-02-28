/**
 * @version 0.1.0
 */
export default class HRequest {
    /**
     * @constructor
     */
    constructor() {
        this.url = location.href;
        this.port = Number(location.port || 80);
        this.host = location.hostname;
        this.params = {};
        this.search = this.getQuerySearch();
    }
    
    /**
     * @return {object}
     */
    getQuerySearch() {
        let search = decodeURI(location.search), params = {};
        if (search.startsWith('?', 0)) {
            search = search.substring(1);
        }
        search.split('&', q => {
            let split = q.split('=');
            params[split[0]] = split[1];
        });
        return params;
    }

    /**
     * @return {boolean}
     */
    isHTTP() {
        return location.protocol.replace(':') === 'http';
    }
    
    /**
     * @return {boolean}
     */
    isHTTPS() {
        return location.protocol.replace(':') === 'https';
    }
}