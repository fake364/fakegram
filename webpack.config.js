var path = require('path');
const webpack = require('webpack');
const publicPath = '/dist/build/';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", "./index.js"],
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        path: path.join(__dirname, publicPath),
        filename: '[name].bundle.js',
        publicPath: "/",
        sourceMapFilename: '[name].map',
    },
    watch: true,
    devtool: "source-map",
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
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        sassOptions: {
                            includePaths: ["absolute/path/a", "absolute/path/b"]
                        }
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader?name=/src/client/public/[name].[ext]",
                options: {
                    publicPath: "images",
                    outputPath: "images",
                    limit: "100000"
                },
            },
            {
                test: /\.js|.jsx?$/,
                exclude: /(node_modules)/,
                loaders: "babel-loader",

            }]
    }
};