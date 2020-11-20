const path = require('path')

module.exports = {
    entry: {
        'app.bundle': path.resolve(__dirname, 'bootstrap/initialize.js')
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-transform-async-to-generator", "@babel/plugin-transform-runtime"]
                    }
                }
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "node_modules")]
    },
    externals: {
        jspatron: 'jspatron'
    }
}