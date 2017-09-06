const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//html模板插件
const CleanWebpackPlugin = require('clean-webpack-plugin');//清除重复文件
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
        /*,
                print:'./src/print.js'*/
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            title:'模板',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        new webpack.HotModuleReplacementPlugin(),

    ],
    module: {
        rules: [
            {test:/\.ejs$/,use:['ejs-loader']},
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(gif|png|svg|jpg)/, use: ['file-loader'] }
        ]
    }
};