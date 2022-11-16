let is_node = (typeof module !== 'undefined' && typeof module.exports !== 'undefined');

export const ignore = [
    'true',
    'false',
    'undefined',
    'null',
    'instanceof',
    'typeof'
]

export function enumIndent(str) {
    let countIndent = 0;
    for (let i = 0, tk; i < str.length; i++) {
        tk = str[i];
        if (!(/(\s|\t)/.test(tk))) {
            countIndent = (i - 1);
            break;
        }
    }
}

export function getTemplate(filename, callback) {
    var tpl, req;
    if (typeof window !== 'undefined') {
        req = new (window.XMLHttpRequest ? XMLHttpRequest : ActiveXObject)('Microsoft.XMLHTTP')
        req.open('GET', filename, false);
        req.onload = function () {
            if (this.status !== 200)
                throw new Error('error load file');
            tpl = this.response;
            if (typeof callback === 'function')
                callback(tpl);
        };
        req.send();
    } else if (is_node) {
        tpl = require('fs').readFileSync(filename, 'utf8');
    }
    return tpl;
}

export function loopDragonData(str, data, rp) {
    let i = 0, body = '', repeat = rp || 0, tk;

    while(i <= str.length) {
        tk = str[i];
        if (tk === '<' && str[i+1] === '?' && str[i + 2] === '=') {
            i += 3;

            while (true) {
                tk = str[i];
                if (tk === '?' && str[i+1] === '>') {
                    var pos_type = body.lastIndexOf('|'),
                        type = pos_type !== -1 ? body.substr(pos_type+1).replace(/\s+/g, '') : 'raw',
                        _vars = pos_type !== -1 ? body.substr(0, pos_type) : body,
                        token,
                        t_pos = 0,
                        name_var = '',
                        _concat = [];

                    while (true) {
                        token = _vars[t_pos];
                        if (typeof token === 'undefined') break;
                        if (token === '+') {
                            t_pos += 1;
                            token = _vars[t_pos];
                        }

                        if (token === "'" || token === '"') {
                            var text_concat = token;
                            t_pos += 1;
                            while (true) {
                                token = _vars[t_pos];
                                if (token === "'" || token === "'"){
                                    text_concat += token;
                                    t_pos++;
                                    break;
                                }
                                text_concat += token;
                                t_pos += 1;
                            }
                            _concat.push(text_concat);
                        } else {
                            name_var += token;
                        }

                        if ((/([a-zA-Z_$]+)\s+/.test(name_var))) {
                            name_var = name_var.replace(/\s+/g, '');
                            var punctuation = name_var.indexOf('.');
                            if (punctuation > 0) {
                                var resolve = 'data["'+name_var.substring(0, punctuation)+'"]';
                                _concat.push(resolve + name_var.substring(punctuation))
                            } else {
                                _concat.push((
                                    typeof data[name_var] !== 'undefined' ? 'data["'+name_var+'"]' : name_var
                                ));
                            }
                            name_var = '';
                        }
                        t_pos += 1;
                    }
                    var print_value = eval(_concat.join('+'));
                    if (!(type in EOF)) {
                        throw new Error('format type not valid');
                    }
                    str = str.replace('<?='+ body +'?>', EOF[type](print_value));
                    break;
                }
                body += tk;
                i += 1;
            }

            break;
        }
        i += 1;
    }
    if (repeat === 0) {
        return loopDragonData(str, data, 1);
    }
    return str;
}