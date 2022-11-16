import { slice } from "./utils";

const attrSpecial = [
    '@if',
    '@each'
]

function getAttribute(name: string): string {
    return this[`@${name}`];
}

function existsAttribute(name: string): boolean {
    return this.getAttribute(name) !== undefined;
}

function parseAttribute(name: string) {
   const m = name.match(/\[.*\]/)
   console.log(m);
   
}

export function extract(elm: HTMLElement) {
    const attributes = {existsAttribute, getAttribute, parseAttribute};
    for (const attr of slice.call(elm.attributes) as Attr[]) {
        attributes[attr.name] = attr.value;
        elm.attributes.removeNamedItem(attr.name)
    }

    const tagName = elm.tagName.toLowerCase();
    let source = '';

    if (!attributes.existsAttribute('if') && !attributes.existsAttribute('each')) {
        source += `$$$e.createHTML('${tagName}');`;
    }

    if (attributes.existsAttribute('if')) {
        source += `
        if (${attributes.getAttribute('if')}) {
            let val = $$$e.createHTML('${tagName}', '${JSON.stringify(attributes)}');
            $$$e.html += val.open;
            ${slice.call(elm.children).map(extract).join('')}
            $$$e.html += val.close;
        }`;
        console.log(source);
        
    }

    if (attributes.existsAttribute('each')) {
        source += `for(${attributes.getAttribute('each')}) {
            \tlet val = $$$e.createHTML('${tagName}', '');
            \t$$$e.html += val.open;
            \t$$$e.html += ${attributes[':bind']};
            \t$$$e.html += val.close;
        \t}`
    }

    return source;
}

export class Compile {
    
    constructor(
        public source: string,
        private len: number = source.length,
        private position: number = null
    ) {}
    
    compiler() {
        let texts = [];
        while (this.next()) {
            let html = this.token;
            if (this.token === '<') {
                while (this.next()) {
                    html += this.token;
                    if (/[\s\t]/.test(this.token)) {
                        break;
                    }
                    if (this.token === '>' as string) {
                        break;
                    }
                }
                while (true) {
                    if (this.position > this.len) {
                        break;
                    }
                    if (this.token === '>' as string) {
                        break;
                    }
                    if (this.source[this.position + 1] === '>' as string) {
                        html += this.next();
                        break;
                    }
                    html += this.prop();
                }

                texts.push({
                    type: 'html',
                    content: html
                })
                
            } else if (this.isSpecialTag()) {
                let str = this.token;
                while (this.next()) {
                    str += this.token;
                    if (this.token === '}') break;
                    if (this.token === '\\') {
                        this.next();
                    }
                }
                texts.push({
                    type: 'text',
                    content: str.slice(2, -1)
                });
            } else {
                texts.push(this.token);
            }
        }
    }

    isSpecialTag() {
        return this.token === '%' && this.source[this.position + 1] === '{';
    }

    prop() {
        let html = '';
        while (this.next()) {
            html+=this.token;
            if (this.token === '=') break;
        }
        return html + this.propValue();
    }

    propValue() {
        let html = '', quote: string;
        while (this.next()) {
            html += this.token;
            if (this.token === quote) {
                break;
            }

            if (!quote && (this.token === '"' || this.token === "'")) {
                quote = this.token;
            }
            
            if (this.token === '\\') {
                this.next();
            }
        }
        return html;
    }

    next() {
        if (this.position === null) this.position = 0;
        else this.position++;
        return this.token;
    }

    get token() {
        return this.source[this.position];
    }
}