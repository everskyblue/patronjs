const path = require('path')

module.exports = {
    entry: {
        'app.bundle': path.resolve(__dirname, 'bootstrap/initialize.js')
        /**
         * bundle framework
         */
        //'patron.bundle': path.resolve(__dirname, 'node_modules/jspatron/globals.js')
    },
    output: {
        // options related to how webpack emits results
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "node_modules")]
    },
    externals: {
        jspatron: 'jspatron'
    }
}