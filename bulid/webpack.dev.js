const BaseConfig = require("./webpack.base.js");
const path = require('path');
const glob = require('glob')
const webpack = require('webpack')
const config = require("./build.js");
const ip = require('./getIp.js')
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
BaseConfig.plugins.push(new DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('development')
    }
}))
BaseConfig.plugins.push(new MiniCssExtractPlugin({
    filename: "css/[name].css",
    // chunkFilename: "css/common.css"
}))
BaseConfig.devServer = {
    contentBase: path.resolve(__dirname, '../dist'),
    host: config.host,
    proxy: config.proxy

}
BaseConfig.module.rules.forEach((item, i) => {
    if (item.loader == 'url-loader') {
        item.options.publicPath = '../../'
    }
})
glob.sync('./src/pages/**/main.js').forEach(path => {
    const chunk = path.split('./src/pages/')[1].split('/main.js')[0]
    console.log(chunk, path)
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
    path: path.resolve(__dirname, '../dist')
}
BaseConfig.devtool = 'eval-source-map'
module.exports = BaseConfig