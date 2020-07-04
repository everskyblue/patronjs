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
        if (pos > 0) node.parentElement.appendChild(clone);
    });
}


export class Render {
    addProps(props) {
        this.data = props;
    }

    parse(content) {
        let node = document.createElement('div');
        node.innerHTML = content;
        
        node.childNodes.forEach(node => {
            const type = node.nodeName.toLowerCase();
            if (['style', 'script'].indexOf(type)>=0) {
                if (type === 'script') {
                    return;
                } else if (type === 'style') {
                    return;
                }
            }

            
            this.out(node)
        })

        return node;
    }

    /**
     * 
     * @param {HTMLElement} node 
     */
    out(node) {
        const attrs = node.attributes;

        if (!attrs) return void 0;

        for (const attr of attrs) {
            switch (attr.name) {
                // enalaza valor definidos
                case ':bind':
                    vw_error(noBindError(attr.value, this.data), `var ${attr.value} no find`)
                    node.innerText = this.data[attr.value];
                    break;
                case 'model:bind':
                    break;
                case '@for':
                    attrs.removeNamedItem('@for');
                    fn_for(node, attr, this.data);
                    break;
                case '@each':
            }
            
        }

        if (node.childNodes) {
            node.childNodes.forEach(child => this.out(child));
        }
    }

    bindValue(node, key) {
        
    }
}