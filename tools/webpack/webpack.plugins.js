const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { inDev } = require('./webpack.helpers')
const WebpackObfuscator = require('webpack-obfuscator')

module.exports = [
    inDev() && new webpack.HotModuleReplacementPlugin(),
    inDev() && new ReactRefreshWebpackPlugin(),

    !inDev() &&
        new WebpackObfuscator(
            {
                rotateStringArray: true,
            },
            ['excluded_bundle_name.js']
        ),
].filter(Boolean)
