/**
 * @version 0.1.0
 */
export default class RoutePattern {

    /**
     * @constructor
     */
    constructor() {
        this.lower = 'a-z';
        this.upper = 'A-Z';
        this.number = '0-9';
        this.string = 'a-zA-Z_';
        this.simple = 'a-zA-Z0-9_\-';
        this.search = '{(.*?)}';
    }
    /**
     * 
     * @param {String} ndl url
     * @return {Object}
     */
    resolverCondition(ndl) {
        let rgx = new RegExp(this.search, 'g'), f;

        let data = [];

        /**
         * capturar las coincidencias
         */
        while((f = rgx.exec(ndl)) !== null) {
            let expression = f.shift();

            let params = f.shift().split(/([a-zA-Z\_]+?)\:/g).filter(e => e != ''),
            
                name_param = params.shift();
                
            let find_option = params.findIndex((value) => {
                return ['lower', 'upper', 'number', 'string'].indexOf(value) >= 0 ||
                    value.indexOf('regx(') === 0;
            }) === 0;
            
            if (params.length && !find_option) { throw new Error(`url no valida ${ndl}`); }

            /**
             * reemplazar por los valores requerido
             */
            params.forEach((key, pos) => {
                switch (key) {
                    case 'lower':
                        params[pos] = this.lower;
                        break;
                    case 'upper':
                        params[pos] = this.upper;
                        break;
                    case 'number':
                        params[pos] = this.number;
                        break;
                    default:
                        if (key.indexOf('regx(') === 0){
                            key = key.replace('regx(', '');
                            params[pos] = key.substring(0, key.length - 1);
                        } else {
                            params[pos] = this.simple;
                        }
                        break;
                }
            });

            // si no hay claves de parametros se añade la expresion por defecto
            if (params.length === 0) params[0] = this.simple;
            
            data.push({
                expression,
                name_param,
                params
            });
        }
        
        const data_route = {url: ndl, name_params: []};
        
        data.forEach(exp => {
            data_route.url = ndl = ndl.replace(exp.expression, '(['+ exp.params.join('') +']+)');
            data_route.name_params.push(exp.name_param);
        });
        
        return data_route;
    }
}