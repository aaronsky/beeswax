const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const prod = process.env.NODE_ENV === 'production';
console.log(`Compiling client code with production set to '${prod}'`);

const publicPath = path.resolve(__dirname, 'app', 'client', 'public');
const publicImgPath = path.resolve(publicPath, 'img');
const publicScriptsPath = path.resolve(publicPath, 'scripts');

const publicDistPath = path.resolve(__dirname, 'dist', 'client', 'public');
const publicImgDistPath = path.resolve(publicDistPath, 'img');
const publicScriptsDistPath = path.resolve(publicDistPath, 'scripts');

let scssLoader = 'style!css!postcss!sass';
let devtool = null;
const plugins = [
    new CheckerPlugin(),
    new CopyWebpackPlugin([{
        from: publicImgPath,
        to: publicImgDistPath
    }])
];
if (prod) {
    scssLoader = ExtractTextPlugin.extract(scssLoader);
    devtool = 'source-map';
    plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }), new UglifyJSPlugin({
        sourceMap: true,
        beautify: false,
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            screw_ie8: true
        },
        comments: false
    }));
} else {
    devtool = 'cheap-eval-source-map';
}

module.exports = {
    target: 'web',
    entry: {
        client: path.resolve(publicScriptsPath, 'index.tsx')
    },
    output: {
        filename: '[name].bundle.js',
        path: publicScriptsDistPath
    },
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [],
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loaders: [
                'babel-loader',
                'awesome-typescript-loader'
            ]
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            enforce: 'pre',
            test: /\.[jt]sx?$/,
            loader: 'source-map-loader'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [{
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]',
                    outputPath: '../public/img/'
                }
            }, {
                loader: 'image-webpack-loader',
                query: {
                    optipng: {
                        optimizationLevel: 2
                    }
                }
            }],
            exclude: /node_modules/,
            include: publicPath,
        }, {
            test: /\.scss$/,
            use: scssLoader
        }]
    },
    plugins: plugins,
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss']
    },
    devtool: devtool
};
