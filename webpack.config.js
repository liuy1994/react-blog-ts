const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let config = {
    entry: {
        main: './src/index.tsx'
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
            // '/': 'http://47.52.234.164:9000'
            '/': 'http://127.0.0.1:9000'
        }
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {test: /\.tsx?$/, use: 'awesome-typescript-loader'},
            {enforce: 'pre', test: /\.js$/, use: 'source-map-loader'},
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: ['css-loader', 'sass-loader']
            //     })
            // },
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: 'css-loader'
            //     })
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
        // new ExtractTextPlugin('styles.css'),
        new UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = (env, argv) => {
    return config
}
