import css from "./simple-css-parser.js";


let $locals = {};

/**
 * 
 * @param {boolean} is_error
 * @param {string} msg
 */
function vw_error(is_error, msg) {
    if (is_error) throw new Error(msg);
}

/**
 * 
 * @param {string} key property of the data
 * @param {object} data
 */
function bind_error(key, data) {
    return (!(key in data));
}

/**
 * 
 * @param {Array} args 
 * @param {number} num_args 
 */
function vw_args(args, num_args) {
    return (args.length !== num_args)
}

/**
 * 
 * @param {string} key reserver word
 * @param {number} pos position key
 * @param {array} data entry execution
 * @return {boolean}
 */
function kw_find(key, pos, data) {
    return data[pos].trim() === key;
}

/**
 * iterar un array cuando se añade el atributo [@for="list in|of arraylist"]
 * @param {HTMLElement} node 
 * @param {NamedNodeMap} code 
 */
function fn_for(node, code, data) {
    const c3 = code.value.split(' ');
    // numero de argumentos validos
    vw_error(vw_args(c3, 3), 'num args not match');
    // retorna el tipo de itaracion de valor deseado. en caso de error genera una excepcion
    const kwf = kw_find('of', 1, c3) ? 'of' : kw_find('in', 1, c3) ? 'in' : vw_error(true, 'syntax error');
    //comprueba que exista la variable
    const iterator = vw_error(bind_error(c3[2], data), `iterate variable ${c3[2]} where no exists`) || data[c3[2]];
    
    /**
     * esto hace que al copiar el nodo del dom se mantengan las propiedades
     * al momento de eliminarlas
     */
    const $copy = node.cloneNode(true);

    iterator.forEach((val, pos) => {
        let clone = (pos === 0 ? node : $copy.cloneNode(true));
        $locals[c3[0]] = (kwf === 'in' ? pos : val);
        if (pos > 0) this.out(node.parentElement.appendChild(clone));
        // itera nuevamente el nodo
        else this.out(node);
    });
}


export class Render {
    addProps(props) {
        this.data = props;
        $locals = {};
    }

    parse(content) {
        let node = document.createElement('div');
        /**
         * ocurre algo extraño 
         */
        node.innerHTML = content.trim();
        node.childNodes.forEach(node => this.out(node));
        return node.childNodes;
    }

    /**
     * 
     * @param {HTMLElement} node 
     */
    out(node) {
        const attrs = node.attributes;
        let attr;
        
        if (!attrs) return void 0;
        
        if (attrs['@for'] instanceof Attr) {
            attr = attrs['@for'];
            attrs.removeNamedItem('@for');
            fn_for.call(this, node, attr, this.data);
            $locals = {};
            return void 0;
        }

        if (attrs[':bind'] instanceof Attr) {
            attr = attrs[':bind'];
            
            let value = bind_error(attr.value, this.data) ? 
                (
                    bind_error(attr.value, $locals) || $locals[attr.value]
                ) : this.data[attr.value];
                
            vw_error(typeof value === 'boolean', `var ${attr.value} no find`);
            
            node.innerText = value;

            attrs.removeNamedItem(attr.name);
        }

        const pos = 0, len = attrs.length;
        for (let i = 0; i < len; i++) {
            attr = attrs[pos];
            if (/\@event\:(.*)$/.test(attr.name)) {
                attr.name.split(':')
                    .filter(e => !(e[0]==='@'))
                    .forEach(evt => {
                        node.addEventListener(evt, (attr.value in this.data) ? data[attr.value] : eval(attr.value));
                    })
                attrs.removeNamedItem(attr.name);
            }
        }

        if (node.childNodes) {
            node.childNodes.forEach(child => this.out(child));
        }
    }
}
/**
 * @type {Render}
 */
let render;
let toEval = Render.toString();

/**
 * 
 * @param {string} content source
 * @param {array} data
 */
export function parse(content, data) {
    let node = document.createElement('div');
        node.innerHTML = content;
        
    let scripts = [], styles = [];

    node.querySelectorAll('script').forEach(sc => {
        scripts.push(sc.innerText);
        sc.remove()
    });

    node.querySelectorAll('style[scope]').forEach(sty => {
        styles.push(css.parse(sty.innerText));
        sty.remove();
    });
    
    if (!render) eval(`(function() {\nrender = new ${toEval};\n ${scripts.join('\n\n')}})()`);

    render.addProps(data);
    
    return render.parse(node.innerHTML);
}