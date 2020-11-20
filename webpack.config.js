const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'lib'),
    output: {
        path: path.resolve(__dirname, "bundle"),
        filename: "patron.bundle.js",
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
    }
}