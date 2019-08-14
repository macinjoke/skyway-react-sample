const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [__dirname, 'node_modules'],
  },
  plugins: [new webpack.DefinePlugin({ CONFIG: JSON.stringify(require('config')) })],
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
  },
}
