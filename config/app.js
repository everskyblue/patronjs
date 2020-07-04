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
 * @property {string} join - when add view
 */
export const cview = {
    path: (base_url +'/views/'),

    ext: '.html',

    join: '#output'
}