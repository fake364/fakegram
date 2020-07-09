var path = require('path');
const webpack = require('webpack');
const publicPath = '/dist/build/';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: ["babel-polyfill", "./index.js"],
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCSSAssetsPlugin({})
    ],
    output: {
        path: path.join(__dirname, publicPath),
        filename: '[name].bundle.js',
        publicPath: "/",
        sourceMapFilename: '[name].map'
    },
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            include: /\.js$/
        })],
    },
    watch: true,
    devtool: "source-map",
    mode: "production",
    devServer: {
        port: 3000,
        host: 'localhost',
        //Be possible go back pressing the "back" button at chrome
        noInfo: false,
        historyApiFallback: true,
        publicPath: publicPath,
        contentBase: path.join(__dirname, publicPath),
        hot: true,
        overlay: true,
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(ico|png|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    limit: "100000",
                    name: 'images/[contenthash].[ext]'
                },
            },
            {
                test: /\.js|.jsx?$/,
                exclude: /(node_modules)/,
                loaders: "babel-loader",

            }]
    }
};