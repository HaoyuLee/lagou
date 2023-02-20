const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'none',
  stats: 'none',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './api')
    }
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}