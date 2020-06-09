'use strict';

const path = require('path');

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    node: {
        __dirname: false,
        __filename: false
    },
    // https://webpack.github.io/docs/configuration.html#resolve
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        modules: [
            path.join(__dirname, 'app'),
            'node_modules',
        ]
    },
    devtool: 'source-map',
    plugins: [
    ]
};
