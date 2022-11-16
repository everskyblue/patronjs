import { DragonFunctions } from "./Functions";


export class Dragon extends DragonFunctions {
    /**
     * 
     * @param {string} source 
     * @param {object} data 
     */
    constructor(source, data) {
        this.source = source;
        this.data = data;
        this.len = this.source.length;
        this.lines = this.source.split(/\n/);
    }

    body(type, data, pos, line, fn) {
        self = this;
        var t = data.replace(/(\w+)/g, function(m) {
                if (ignore.indexOf(m)==-1){
                    return self.data[m] ? 'this.data["'+ m +'"]' : m;
                }
                return m;
            }),
            n = this.lines[line],
            countSpace = enumIndent(n),

            content_indent = this.lines.slice(line + 1),
            content_sep = this.lines.slice(0, line).join('\n') + '\n',
            breach = false,
            inner = [],
            code;

        for (var i = 0, ob, tk, pos = 0; i < content_indent.length; i++) {
            ob = content_indent[i];
            pos = 0;

            inner.push(ob);

            while(true) {
                tk = ob[pos];

                if(typeof tk === 'undefined') break;

                if ( !(/(\s|\t)/.test(tk)) ) {
                    var inset = (pos - 1);
                    if (countSpace === inset) {
                        var end_tag = inner.pop(),
                            is_not_close = ((
                                new RegExp('[<\\?]\\s*end'+type+'\\s*[\\?>]').test(end_tag)
                            ) == false),
                            is_true = eval(t);

                        var flow = ['if', 'elseif', 'else'],
                            other_html,
                            html;

                        if (!(/<?\s*/.test(end_tag))) {
                            throw new SyntaxError('element not indented');
                        }

                        code = inner.join('\n') + '\n';
                        other_html = content_indent.slice(i + 1);
                        if (is_not_close && !is_true) {
                            //- push the element if is not flow
                            other_html = [end_tag].concat(other_html);
                        }
                        html = other_html.join('\n');
                        if (flow.indexOf(type) >= 0) {
                            if (is_true&&is_not_close) {
                                for(var chk = 0; chk < other_html.length; chk++) {
                                    if(other_html[chk].match(/[<?]\s*endif\s*[?>]/)) {
                                        html = other_html.slice(chk+1).join('\n');
                                        break;
                                    }
                                }
                                code = content_sep + code + html;
                            } else {
                                code = content_sep + html;
                            }
                        } else {
                            if(typeof fn == 'function') {
                                code = fn.call(this, is_true, content_sep, code, html);
                            }
                        }
                        this.lines = code.split(/\n/);
                        breach = true;
                    }
                    break;
                }
                pos += 1;
            }
            if (breach) break;
        }
        return code;
    }
}