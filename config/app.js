// url base for location view, database
export const base_url = location.origin;

// location assets
export const assets_location= {
    js: '/assets/js/',
    css: '/assets/css/'
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

    join: document.querySelector('#content')
}

// location db
const pdb = base_url +'/data/db';

/**
 * json format database configuration
 * @typedef cdb
 * @type {object}
 * @property {string} path - folder where save data
 * @property {string} connection - type connection [stream|url]
 * @property {string} root - main db - use administrator panel
 * @property {string} ability_save_local_data - administrator panel for data storage
 */
export const cdb = {
    path: pdb,

    connection: 'stream',

    root: (pdb + '/def.json'),

    ability_save_local_data: true
}