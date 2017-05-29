var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './src/js/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'js'),
    },
    module: {
        rules: [
            {
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                test: /\.js$/,
            },
            {
                include: path.resolve(__dirname, 'src'),
                loader: 'html-loader',
                test: /\.html$/,
            },
        ],
    },
}
