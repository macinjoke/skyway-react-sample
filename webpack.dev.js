/* eslint import/no-extraneous-dependencies: 0 */
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new ForkTsCheckerWebpackPlugin()],
  devServer: {
    contentBase: 'dist',
  },
})
