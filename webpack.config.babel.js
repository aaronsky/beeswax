import * as path from 'path';

import { CheckerPlugin } from 'awesome-typescript-loader';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

const prod = process.env.NODE_ENV === 'production';

const appPath = path.resolve(__dirname, 'app');
const publicPath = path.resolve(appPath, 'public');
const distPath = path.resolve(__dirname, 'dist');

let scssLoader = null;
let devtool = null;
if (prod) {
    scssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader');
    devtool = 'source-map';
} else {
    scssLoader = 'style!css!postcss!sass';
    devtool = 'source-map';
}

const base = {
    output: {
        path: distPath,
        filename: '[name].bundle.js',
        chunkFilename: '[chunkhash].bundle.js'
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
            loaders: ['file?context=src/images&name=images/[path][name].[ext]', 'image-webpack?optimizationLevel=2'],
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

const targets = [{
    name: 'app',
    target: 'node',
    path: path.resolve(appPath, 'index.ts'),
    externals: [nodeExternals()]
}, {
    name: 'client',
    target: 'web',
    path: path.resolve(publicPath, 'scripts', 'index.ts'),
    externals: []
}]

const configs = targets.map(target => webpackMerge(base, {
    target: target.target,
    entry: {
        [target.name]: target.path
    },
    externals: target.externals
}));

export default configs;