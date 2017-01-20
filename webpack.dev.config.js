const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const base = path.join(__dirname, 'src');

module.exports = {

    devtool: 'source-map',
    entry: {
        demo: `${base}/demo.jsx`,
        vendor: [
            'react',
            'react-dom'
        ]
        //editor: `${base}/editor.jsx`
    },
    output: {
        path: `./static/`,
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                cacheDirectory: true,
                query: {
                    presets: ["react", "es2015", "stage-0"],
                    plugins: [
                        ["import", {
                            "libraryName": "antd",
                            "style": true
                        }],
                        "transform-runtime",
                        "transform-decorators-legacy",
                        "react-html-attrs"
                    ]
                },
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
    		    test: /\.(png|jpg|gif)$/,
    		    loader: 'url?limit=50000'
    	    },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'common.bundle.js'}),
        new ExtractTextPlugin('editor.css', {allChunks: true})
    ],
    postcss: () => []
};
