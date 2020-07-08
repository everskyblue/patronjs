const $data = {
    globals: {},
    locals: {}
};

/**
 * 
 * @param {boolean} error
 * @param {string} msg
 */
function vw_error(error, msg) {
    if (error) throw new Error(msg);
}

/**
 * 
 * @param {string} key property of the data
 * @param {object} data
 */
function noBindError(key, data) {
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
    vw_error(vw_args(c3, 3), 'num args not match')
    const kwf = kw_find('of', 1, c3) ? 'of' : kw_find('in', 1, c3) ? 'in' : vw_error(true, 'syntax error');
    const iterator = vw_error(noBindError(c3[2], data), `iterate variable ${c3[2]} where no exists`) || data[c3[2]];
    iterator.forEach((val, pos) => {
        const clone = (pos === 0 ? node : node.cloneNode(true));
        clone.innerText = (kwf === 'in' ? String(pos) : String(val));
        if (pos > 0) this.out(node.parentElement.appendChild(clone));
        //else this.out(clone);
    });
}


export class Render {
    addProps(props) {
        this.data = props;
        $data.globals = props;
        $data.locals = {};
    }

    parse(content) {
        let node = document.createElement('div');
        node.innerHTML = content;
        node.childNodes.forEach(node => this.out(node));
        return node;
    }

    /**
     * 
     * @param {HTMLElement} node 
     */
    out(node) {
        const attrs = node.attributes;

        if (!attrs) return void 0;
        
        const pos = 0, len = attrs.length;

        for (let i = 0, attr; i < len; i++) {
            attr = attrs[pos];
            switch (attr.name) {
                // enalaza valor definidos
                case ':bind':
                    vw_error(noBindError(attr.value, this.data), `var ${attr.value} no find`)
                    node.innerText = this.data[attr.value];
                    attrs.removeNamedItem(attr.name);
                    break;
                case 'model:bind':
                    break;
                case '@for':
                    //node.removeAttributeNode(node.getAttributeNode(attr.name));
                    attrs.removeNamedItem(attr.name);
                    fn_for.call(this, node, attr, this.data);
                    break;
                case '@each':
                    break;
                default:
                    if (/\@event\:(.*)$/.test(attr.name)) {
                        attr.name.split(':')
                            .filter(e => !(e[0]==='@'))
                            .forEach(evt => {
                                node.addEventListener(evt, (attr.value in this.data) ? data[attr.value] : eval(attr.value));
                            })
                        attrs.removeNamedItem(attr.name);
                    }
                    
                    break;
            }
            
        }

        if (node.childNodes) {
            node.childNodes.forEach(child => this.out(child));
        }
    }

    bindValue(node, key) {
        
    }
    test() {
        console.log(typeof clickList);
        
    }
}
/**
 * @type {Render}
 */
let renders;
let isEval = false;
let toEval = Render.toString();

/**
 * 
 * @param {string} content source
 * @param {array} data
 */
export function parse(content, data) {
    let node = document.createElement('div');
        node.innerHTML = content;
        
    let scripts = [];

    node.querySelectorAll('script').forEach(sc => {
        scripts.push(sc.innerText);
        sc.remove()
    });

    if (!isEval && !renders) scripts.push(`renders = new ${toEval}`) && (isEval = true);

    eval(scripts.join('\n\n'));

    renders.addProps(data);
    
    return renders.parse(node.innerHTML);
}