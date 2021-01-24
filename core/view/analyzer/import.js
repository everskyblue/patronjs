/**
 * regex
 * @link https://gist.github.com/MohamedLamineAllal/31e9665dac3913cf8a3fd901ed9bbe43
 */
const i = /import\s+?(?:(?:([\w*\s{},]*)\s+from\s+?)|)(?:(?:"(.*?)")|(?:'(.*?)'))[\s]*?(?:;|$|)/g

const m = new RegExp('\\/\\/(.+)?|\\b'+i.source, 'g');

/**
 * @typedef {object} MapImport
 * @property {string} originalMatch
 * @property {string} modulePath
 * @property {string} nameImport
 */

/**
 * regex y function
 * @link https://github.com/molnarmark/import-parser
 */
const ES6_INDIVIDUAL_IMPORT_REGEX = /\bimport(\s+(?:).+\s+from\s+)?[\'"]([^"\']+)["\']/;
const CLEAR_REGEX = /{|}|from| /g;

/**
 * 
 * @param {string} match 
 * @returns {MapImport}
 */
export function mapImport(match) {
    const groups = ES6_INDIVIDUAL_IMPORT_REGEX.exec(match);
    const [, imports, modulePath] = groups;
    const clearedImport = imports.replace(CLEAR_REGEX, '');

    return {
        originalMatch: match,
        modulePath,
        nameImport: clearedImport,
    };
}

/**
 * 
 * @param {string} source
 * @returns {{source: string, imports: MapImport[]}}
 */
export function parserImport(source) {
    const match = source.match(m);
    const tree = {source, imports: []};

    if (Array.isArray(match)) {
        const imports = match.filter(m => m.indexOf('//') < 0).map(mapImport);

        match.forEach(needle => {
            source = source.replace(needle, '');
        });

        tree.source = source;
        tree.imports = imports;
    }

    return tree;
}