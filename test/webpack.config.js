/* eslint-env node */
var HtmlWebpackPlugin = require("html-webpack-plugin")
var path = require("path")

var config = {
  entry: [path.join(__dirname,"./tests.js")],
  plugins: [
    new HtmlWebpackPlugin({
      title: "chippy-sprites test harness",
      filename: "test.html"
    })
  ],
  node: {
    fs: "empty"
  },
  output: {
    publicPath: "/"
  },
  devtool: "eval"
}

module.exports = config
