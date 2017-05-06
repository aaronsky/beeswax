const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const prod = process.env.NODE_ENV === 'production';
console.log(`Compiling client code with production set to '${prod}'`);

const appPath = path.resolve(__dirname, 'app');
const publicPath = path.resolve(appPath, 'public');
const publicScriptsPath = path.resolve(publicPath, 'scripts');
const viewsPath = path.resolve(appPath, 'views');
const distPath = path.resolve(__dirname, 'dist');
const publicDistPath = path.resolve(distPath, 'public');
const publicScriptsDistPath = path.resolve(publicDistPath, 'scripts');
const viewsDistPath = path.resolve(distPath, 'views');

let scssLoader = null;
let devtool = null;
if (prod) {
    scssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader');
    devtool = 'source-map';
} else {
    scssLoader = 'style!css!postcss!sass';
    devtool = 'inline-source-map';
}

const base = {
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
    devtool: devtool,
    watch: true
};

const targets = [{
    name: 'app',
    target: 'node',
    entry: path.resolve(appPath, 'index.ts'),
    output: {
        path: distPath,
        pattern: '[name].bundle.js'
    },
    externals: [nodeExternals()]
}, {
    name: 'client',
    target: 'web',
    entry: path.resolve(publicScriptsPath, 'index.tsx'),
    output: {
        path: publicScriptsDistPath,
        pattern: '[name].bundle.js'
    },
    externals: []
}];

const fileNames = fs.readdirSync(viewsPath);
fileNames.forEach(filename => {
    const filePath = path.resolve(viewsPath, filename);
    const fileBasename = path.basename(filePath, path.extname(filePath))
    console.log('Preparing target configuration for', filePath);
    targets.push({
        name: fileBasename,
        target: 'node',
        entry: filePath,
        output: {
            path: viewsDistPath,
            pattern: '[name]-view.js',
            library: fileBasename, 
        },
        externals: [nodeExternals()]
    });
});

const configs = targets.map(target => webpackMerge(base, {
    target: target.target,
    entry: {
        [target.name]: target.entry
    },
    output: {
        path: target.output.path,
        filename: target.output.pattern,
        library: target.output.library || '',
            libraryTarget: 'commonjs-module'
    },
    externals: target.externals
}));

module.exports = configs;