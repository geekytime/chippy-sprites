/* eslint-env node */
var HtmlWebpackPlugin = require("html-webpack-plugin")
var path = require("path")

module.exports = {
  entry: path.join(__dirname, "./demo.js"),
  plugins: [
    new HtmlWebpackPlugin({
      title: "chippy-sprites demo",
      filename: "index.html"
    })
  ],
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        "style-loader",
        "css-loader",
        "less-loader"
      ]
    }]
  },
  output: {
    path: path.join(__dirname, "../docs"),
    filename: "demo.js",
    publicPath: "/"
  },
  devtool: "eval",
  devServer: {
    contentBase: __dirname,
    inline: true,
    port: 4242,
    host: "0.0.0.0"
  }
}
