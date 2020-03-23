const BaseConfig = require("./webpack.base.js");
const path = require('path');
const glob = require('glob')
const CleanWebpackPlugin = require("clean-webpack-plugin");
const pages = require("./build.js");
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
BaseConfig.plugins.push(new webpack.LoaderOptionsPlugin({
    test: /\.css|less$/,
    minimize: true,
    debug: false,
}))
// BaseConfig.plugins.push(new DefinePlugin({
//     'process.env': {
//         NODE_ENV: JSON.stringify('production')
//     }
// }))
if (pages.buildName && pages.buildName !="") {
    BaseConfig.plugins.push(new CleanWebpackPlugin([pages.buildName], {
        root: path.resolve(__dirname, '..')
    }))
    BaseConfig.module.rules.forEach((item, i) => {
        if (item.loader == 'url-loader') {
            item.options.publicPath = './'
        }
    })
    BaseConfig.plugins.push(new MiniCssExtractPlugin({
        filename: "[name].css",
        // chunkFilename: "css/common.css"
    }))
    BaseConfig.entry[pages.buildName] = `./src/pages/${pages.buildName}/main.js`;
    BaseConfig.plugins.push(new HtmlWebpackPlugin({
        filename: `./index.html`,
        chunks: ['vendor', 'commons', `${pages.buildName}`],
        minify: {
            collapseWhitespace: false,
            removeAttributeQuotes: false,
            removeComments: false
        },
        hash: true,
        template: `src/pages/${pages.buildName}/index.html`
    }));
    BaseConfig.output = {
        filename: '[name].js',
        path: path.resolve(__dirname, `../${pages.buildName}`),
        publicPath: "./"
    }
} else {
    BaseConfig.plugins.push(new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname, '..')
    }))
    BaseConfig.module.rules.forEach((item, i) => {
        if (item.loader == 'url-loader') {
            item.options.publicPath = '../../'
        }
    })
    BaseConfig.plugins.push(new MiniCssExtractPlugin({
        filename: "css/[name].css",
        // chunkFilename: "css/common.css"
    }))
    glob.sync('./src/pages/**/main.js').forEach(path => {
        const chunk = path.split('./src/pages/')[1].split('/main.js')[0]
        // console.log(chunk, path)
        BaseConfig.entry[chunk] = `./src/pages/${chunk}/main.js`;
        BaseConfig.plugins.push(new HtmlWebpackPlugin({
            filename: `pages/${chunk}/index.html`,
            chunks: ['vendor', 'commons', `${chunk}`],
            minify: {
                collapseWhitespace: false,
                removeAttributeQuotes: false,
                removeComments: false
            },
            hash: true,
            template: `src/pages/${chunk}/index.html`
        }));
    })
    BaseConfig.output = {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, `../dist`),
        publicPath: "../../"
    }
}
console.log(process.env.NODE_ENV,'区分变量')
// BaseConfig.output.publicPath = "./"
module.exports = BaseConfig