const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const prod = process.env.NODE_ENV === 'production';

const appPath = path.resolve(__dirname, 'app');
const publicPath = path.resolve(appPath, 'public');
const distPath = path.resolve(__dirname, 'dist');

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
                { loader: 'ts-loader' }
            ]
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: ['file?context=src/images&name=images/[path][name].[ext]', 'image-webpack?optimizationLevel=2'],
            exclude: /node_modules/,
            include: publicPath,
        }, {
            test: /\.scss$/,
            use: prod ? (
                ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
            ) : (
                    'style!css!postcss!sass'
                )
        }]
    },
    plugins: [

    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']
    },
    devtool: prod ? '' : 'source-map'
};

const targets = [{
    name: 'app',
    target: 'node',
    path: path.resolve(appPath, 'index.ts')
}, {
    name: 'client',
    target: 'web',
    path: path.resolve(publicPath, 'scripts', 'index.ts')
}]

const configs = targets.map(target => webpackMerge(base, {
    target: target.target,
    entry: {
        [target.name]: target.path
    }
}));

module.exports = configs;