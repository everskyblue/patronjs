var dragon, eof;
(function() {
    var is_node = (typeof module !== 'undefined' && typeof module.exports !== 'undefined');
    if (!Object.assign) {
        Object.assign = function (where, e_copy) {
            for (var p in e_copy) {
                where[p] = e_copy[p];
            }
            return where;
        }
    }

    var ignore = [
        'true', 'false', 'undefined', 'null', 'instanceof', 'typeof'
    ], self, enumIndent, Eof, content_extend = [];

    enumIndent = function(str) {
        var countIndent = 0;
        for(var i = 0, tk; i < str.length; i++) {
            tk = str[i];
            if(!(/(\s|\t)/.test(tk))) {
                countIndent = (i - 1);
                break;
            }
        }

        return countIndent;
    }

    Eof = eof = function() {};

    eof.compile = function(str, data) {
        return loopDragonData(str, data);
    }

    Eof.prototype = {
        raw: function(r) {
            return r.toString();
        },
        json: function(j) {
            return JSON.stringify(j);
        },
        entity: function(e) {
            return e.replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        },
        e: function(e) {
            return this.entity(e);
        }
    };

    function loopDragonData(str, data, rp) {
        var _eof_data = new Eof(), i = 0, body = '', repeat = rp || 0, tk;

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
                                    var resolve = 'data["'+name_var.substr(0, punctuation)+'"]';
                                    _concat.push(resolve + name_var.substr(punctuation))
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
                        if (!_eof_data[type]) {
                            throw new Error('format type not valid');
                        }
                        str = str.replace('<?='+ body +'?>', _eof_data[type](print_value));
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

    function getTemplate(filename, callback) {
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

    var Dragon = dragon = function(source, data) {
        this.source = source;
        this.data = data;
        this.len = this.source.length;
        this.lines = this.source.split(/\n/);
    };

    var drBody = function (type, data, pos, line, fn) {
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

    Dragon.prototype = {
        _if: function(b, x, line) {
            return drBody.call(this, 'if', b, x, line);;
        },
        _elseif: function(b, x, line) {
            return drBody.call(this, 'elseif', b, x, line);
        },
        _else: function(b, x, line) {
            return drBody.call(this, 'else', 'true', x, line);
        },
        _for: function(b, x, line) {
            if (b.indexOf('as') == -1) {
                throw 'error syntax: iterator for {'+b+'}';
            }

            var explode = b.split('as'),
                data_name = explode[0].replace(/\s+/,''),
                on = explode[1].replace(/\s+/g, '').split(','),
                obj = Object.assign({}, this.data);

            return drBody.call(this, 'for', data_name, x, line, function(data, cnt, body_for, cnt1) {
                var key, value, content = [];
                if(on.length === 2){
                    key = on[0];
                    value = on[1];
                } else {
                    value = on[0];
                }

                if (data instanceof Array) {
                    for (var i in data) {
                        if (key) {
                            obj[key] = i;
                            obj[value] = data[i];
                        } else {
                            obj[value] = data[i];
                        }
                        content.push(Eof.compile(body_for, obj));
                    }
                    return (cnt + content.join('\n') + cnt1);
                }

                throw new Error('iterator in not object');
            });
        },
        _block: function (c, x, line) {
            return drBody.call(this, 'block', 'true', x, line, function (data, cnt1, content, cnt2) {
                var rgx_yield = new RegExp('(<\\?=)\\s*yield'+c.replace(/\s+/g, '\\s*')+'(\\?>)'),
                    cnt_extend = content_extend[0];
                if (typeof cnt_extend !== 'undefined' && cnt_extend.match(rgx_yield)) {
                    content_extend[0] = (cnt_extend.replace(rgx_yield, content));
                }
                return (cnt1 + cnt2);
            });
        },
        _yield: function (b) {
            throw new Error('the yield ['+ b +'] is executed on the file dependency');
        },
        _set: function (json, x, line) {
            function getVar(name) {
                if (typeof data[name] === 'undefined') {
                    throw new Error( 'the variable ['+name+'] is not defined' );
                }
                return data[name];
            }
            var nObj = Function('return {'+ json +'};').call(null, getVar);
            for (var p in nObj) {
                this.data[p] = nObj[p];
            }
            return this.source.replace(this.lines[line], '\n');
        },
        _extends: function(b, x, line) {
            content_extend.push(getTemplate(b.replace(/\s+/g, '')))
            return this.source.replace(this.lines[line], '\n');
        },
        _include: function(b, x, line) {
            return this.source.replace(this.lines[line], getTemplate(b.replace(/\s+/g, '')));
        },
        dragon_comment: function(cm) {
            this.source = this.source.replace(new RegExp('<\\?'+cm+'\\?>(\\n|)'), '$1');
        },
        html_comment: function(cm) {
            this.source = this.source.replace(new RegExp('<\\?!('+cm.replace('!','')+'?)\\?>'), '<!-- $1 -->');
        }
    }

    dragon.compile = function(text, data) {
        try {
            var dgn = evaluatorPerformSource(text, data);
            return dgn.source.split(/\n/).join('\n');
        }catch(e) {
            if (!is_node) {
                document.body.innerHTML = ('<div class="stack" style="line-height:30px;font-family:monospace;padding: 10px;font-size:15px;">' + (e.stack || e).replace(/(.+[\n+|\s]?)/g, '<div>$1</div>\n') + '</div>');
            }
            throw e;
        }
    }

    function evaluatorPerformSource(text, data) {
        var engine = new Dragon(text, data);
        for(var x = 0, tag, body = "", type, line = 0; x < engine.len; x++) {
            tag = text[x];

            if (tag == '\n') {
                line += 1;
            }

            if (tag == '<' && text[x+1] == '?') {
                x += 2;
                tag = text[x];
                var tag_cm = (tag === '-' ? 'dragon_comment' : (tag === '!' ? 'html_comment' : '')),
                    is_tag_echo = text[x] === '=' ? (x++, true) : false;


                while(true) {
                    tag = text[x];
                    if(typeof body === 'undefined' || x >= engine.len) {
                        throw new SyntaxError('error of syntax');
                        break;
                    }

                    if (tag == '\n') {
                        line += 1;
                    }

                    if (tag == '?' && text[x+1] == '>') {
                        var body_dragon = body;
                        body = '';
                        type = type.replace(/\s+/g, '');
                        if (tag_cm.length > 0) {
                            engine[tag_cm](body_dragon);
                            return evaluatorPerformSource(engine.source, engine.data);
                        } else if (is_tag_echo && type != 'yield') {
                            var dd = engine.lines[line],
                                printed = eof.compile(dd, engine.data);
                            return evaluatorPerformSource(text.replace(dd, printed), engine.data);
                        }

                        if (body_dragon.indexOf(type)==-1 && tag_cm.length==0) {
                            throw new Error("error");
                        }

                        if (engine['_'+type]) {
                            var out = engine['_'+ type](body_dragon.substr(type.length+1), x, line);
                            return evaluatorPerformSource(out, engine.data);
                        }

                        break;
                    }

                    body += tag;

                    if (/([a-zA-Z]+)\s+/.test(body) && typeof type == 'undefined') {
                        type = body;
                    }

                    x += 1;
                }
                break;
            }
        }

        if (typeof content_extend[0] !== 'undefined') {
            var content = content_extend[0];
            content_extend = [];
            return evaluatorPerformSource(content + engine.source, engine.data);
        }

        return engine;
    }

    if (is_node) {
        module.exports = {
            dragon: dragon,
            eof: eof
        };
    }
}());