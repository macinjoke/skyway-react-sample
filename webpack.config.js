const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [__dirname, 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({ CONFIG: JSON.stringify(require('config')) }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
  },
}
