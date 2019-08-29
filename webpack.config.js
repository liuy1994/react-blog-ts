const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractSCSS = new ExtractTextPlugin('stylesheets/[name]-two.css');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
let config = {
    entry: {
        main: './src/index.tsx',
        vendor: ['react', 'react-dom', 'redux', 'react-redux', 'antd'],
    },
    output: {
        filename: '[name].[hash].js',
        path: `${__dirname}/dist`
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 9090,
        proxy: {
            '/blog': 'http://47.52.234.164:9000'
            // '/blog': 'http://127.0.0.1:9000/'
        }
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {test: /\.tsx?$/, use: 'awesome-typescript-loader'},
            {enforce: 'pre', test: /\.js$/, use: 'source-map-loader'},
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'sass-loader']
            //     })
            // },
            {test: /\.scss$/, use: extractSCSS.extract({ fallback: 'style-loader', use: [ 'css-loader', 'sass-loader' ] })},
            {test: /\.css$/, use: extractCSS.extract({ fallback: 'style-loader', use: [ 'css-loader' ] }), exclude: /node_modules/}
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        extractCSS,
        extractSCSS,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: function(module) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, './node_modules')
                    ) === 0
                )
            },
            chunks: ['index'],
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor', 'common', 'index']
        }),
        new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
        new UglifyJsPlugin({
            uglifyOptions: {
                ie8: false,
                mangle: true,
                output: { comments: false },
                compress: {
                    warnings: false,
                    drop_console: true,
                    drop_debugger: true,
                    unused: false,
                },
            },
            sourceMap: false,
            cache: true,
        }),
        new CompressionPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
    ]
}

module.exports = (env, argv) => {
    return config
}
