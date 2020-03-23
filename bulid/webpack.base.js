const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const WebPackBaseConfig = {
    entry: {},
    output: {},
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.(less|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require("autoprefixer")("last 100 versions")]
                        }
                    },
                    'less-loader'
                ]
            }, {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '../../',
                    name: 'static/images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '../',
                    name: 'static/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '../',
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons', //提取出来的文件命名
                    chunks: 'initial', //initial表示提取入口文件的公共部分
                    minChunks: 2, //表示提取公共部分最少的文件数
                    minSize: 0 //表示提取公共部分最小的大小
                },
                vendor: {
                    name: "vendor",
                    test: /node_modules\/(.*)\.js/,
                    chunks: "all",
                    priority: 10
                }
            }
        }
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: 'index.html',
        //     minify: {
        //         collapseWhitespace: true,
        //         removeAttributeQuotes: true,
        //         removeComments: true
        //     },
        //     hash: true,
        //     filename:'index.html'
        // }),
    ]
}

module.exports = WebPackBaseConfig