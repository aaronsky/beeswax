const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const prod = process.env.NODE_ENV === 'production';
console.log(`Compiling client code with production set to '${prod}'`);

const appPath = path.resolve(__dirname, 'app');
const publicPath = path.resolve(appPath, 'public');
const publicImgPath = path.resolve(publicPath, 'img');
const publicScriptsPath = path.resolve(publicPath, 'scripts');
const viewsPath = path.resolve(appPath, 'views');
const distPath = path.resolve(__dirname, 'dist');
const publicDistPath = path.resolve(distPath, 'public');
const publicImgDistPath = path.resolve(publicDistPath, 'img');
const publicScriptsDistPath = path.resolve(publicDistPath, 'scripts');
const viewsDistPath = path.resolve(distPath, 'views');

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

const base = {
    output: {
        filename: '[name].bundle.js'
    },
    node: {
        __dirname: false,
        __filename: false
    },
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
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']
    },
    devtool: devtool
};

const targets = {
    app: {
        target: 'node',
        entry: {
            app: path.resolve(appPath, 'index.ts')
        },
        output: {
            path: distPath
        },
        externals: [nodeExternals()]
    },
    client: {
        target: 'web',
        entry: {
            client: path.resolve(publicScriptsPath, 'index.tsx')
        },
        output: {
            path: publicScriptsDistPath
        },
        externals: []
    }
};

const fileNames = fs.readdirSync(viewsPath);
fileNames.forEach(filename => {
    const filePath = path.resolve(viewsPath, filename);
    const fileBasename = path.basename(filePath, path.extname(filePath))
    console.log('Preparing target configuration for', filePath);
    targets[fileBasename] = {
        target: 'node',
        entry: {
            [fileBasename]: filePath
        },
        output: {
            path: viewsDistPath,
            filename: '[name]-view.js',
            library: fileBasename,
            libraryTarget: 'commonjs-module'
        },
        externals: [nodeExternals()]
    };
});

const configs = Object.keys(targets).map(name => {
    const target = targets[name];
    return webpackMerge(base, target);
});

module.exports = configs;