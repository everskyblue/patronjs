import { getTemplate } from "./helpers";

export class DragonFunctions {
    _if(b, x, line) {
        return this.body('if', b, x, line)
    }

    /**
     * 
     * @param {string} b 
     * @param {number} x 
     * @param {number} line 
     * @returns {string}
     */
    _elseif(b, x, line) {
        return this.body('elseif', b, x, line);
    }

    /**
     * 
     * @param {string} b 
     * @param {*} x 
     * @param {*} line 
     * @returns 
     */
    _else(b, x, line) {
        return this.body('else', 'true', x, line);
    }

    _for(b, x, line) {
        if (b.indexOf('as') == -1) {
            throw 'error syntax: iterator for {'+b+'}';
        }

        var explode = b.split('as'),
            data_name = explode[0].replace(/\s+/,''),
            on = explode[1].replace(/\s+/g, '').split(','),
            obj = Object.assign({}, this.data);

        return this.body('for', data_name, x, line, function(data, cnt, body_for, cnt1) {
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
    }

    _yield(b) {
        throw new Error('the yield ['+ b +'] is executed on the file dependency');
    }

    _block(c, x, line) {
        return drBody.call(this, 'block', 'true', x, line, function (data, cnt1, content, cnt2) {
            var rgx_yield = new RegExp('(<\\?=)\\s*yield'+c.replace(/\s+/g, '\\s*')+'(\\?>)'),
                cnt_extend = content_extend[0];
            if (typeof cnt_extend !== 'undefined' && cnt_extend.match(rgx_yield)) {
                content_extend[0] = (cnt_extend.replace(rgx_yield, content));
            }
            return (cnt1 + cnt2);
        });
    }

    _set(json, x, line) {
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
    }

    _extends(b, x, line) {
        content_extend.push(getTemplate(b.replace(/\s+/g, '')))
        return this.source.replace(this.lines[line], '\n');
    }

    _include(b, x, line) {
        return this.source.replace(this.lines[line], getTemplate(b.replace(/\s+/g, '')));
    }

    dragon_comment(cm) {
        this.source = this.source.replace(new RegExp('<\\?'+cm+'\\?>(\\n|)'), '$1');
    }

    html_comment(cm) {
        this.source = this.source.replace(new RegExp('<\\?!('+cm.replace('!','')+'?)\\?>'), '<!-- $1 -->');
    }
}

var i=  {
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