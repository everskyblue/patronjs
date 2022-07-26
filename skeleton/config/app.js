// capture exception
export const debug = true;

// url base for location view, database
export const base_url = location.origin;

// public directory
export const public_dir = `${base_url}/skeleton/public`;

// location assets
export const assets_location= {
    js: `${public_dir}/assets/js/`,
    css: `${public_dir}/assets/css/`
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