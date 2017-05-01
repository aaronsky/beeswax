const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const prod = process.env.NODE_ENV === 'production';
console.log(`Compiling client code with production set to '${prod}'`);

const appPath = path.resolve(__dirname, 'app');
const publicPath = path.resolve(appPath, 'public');
const publicScriptsPath = path.resolve(publicPath, 'scripts');
const distPath = path.resolve(__dirname, 'dist');
const publicScriptsDistPath = path.resolve(distPath, 'public', 'scripts');

let scssLoader = null;
let devtool = null;
if (prod) {
    scssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader');
    devtool = 'source-map';
} else {
    scssLoader = 'style!css!postcss!sass';
    devtool = 'source-map';
}

module.exports = {
    target: 'web',
    entry: path.resolve(publicScriptsPath, 'index.tsx'),
    output: {
        path: publicScriptsDistPath,
        filename: 'client.bundle.js',
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                { loader: 'awesome-typescript-loader' }
            ]
        }, {
            enforce: 'pre',
            test: /\.(t|j)sx?$/,
            loader: 'source-map-loader'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: ['file?context=public/images&name=images/[path][name].[ext]', 'image-webpack?optimizationLevel=2'],
            exclude: /node_modules/,
            include: publicPath,
        }, {
            test: /\.scss$/,
            use: scssLoader
        }]
    },
    plugins: [
        new CheckerPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']
    },
    devtool: devtool
};