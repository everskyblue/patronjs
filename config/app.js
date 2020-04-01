// capture exception
export const debug = true;

// url base for location view, database
export const base_url = location.origin;

// location assets
export const assets_location= {
    js: '/public/assets/js/',
    css: '/public/assets/css/'
};

/**
 * configuration view
 * @typedef cview
 * @type {object}
 * @property {string} path - url view
 * @property {string} ext - use extension
 * @property {HTMLElement} join - when add view
 */
export const cview = {
    path: (base_url +'/views/'),

    ext: '.html',

    join: '#content'
}

// location db
const pdb = base_url +'/data/db';

export const database = {
    path: pdb,

    type: 'fetch', // node | fetch | external

    schema: (pdb + '/dbschema.json'),

    use: 'testing'
}