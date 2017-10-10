#!/usr/bin/env node
/* eslint-env node */
var bodyParser = require("body-parser")
var config = require("./test/webpack.config.js")
var express = require("express")
var open = require("open")
var webpack = require("webpack")
var webpackDevMiddleware = require("webpack-dev-middleware")
var webpackHotMiddleware = require("webpack-hot-middleware")

config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
config.entry.unshift("webpack-hot-middleware/client?reload=true")
var compiler = webpack(config)

var app = express()

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/"
}))
app.use(webpackHotMiddleware(compiler))
app.use(express.static("./test"))
app.use(bodyParser.text())

app.post("/tap", function(req, res){
  res.send("ok")
  //eslint-disable-next-line no-console
  console.log(req.body.trim())
})

app.post("/done", function(req,res){
  res.send("ok")
  var exitCode = parseInt(req.body, 10)
  process.exit(exitCode)
})

app.listen(4444, "0.0.0.0", function(){
  open(`http://localhost:4444/test.html?exitOnComplete=${getExitArg()}`)
})

var getExitArg = function(){
  if (process.argv.length >= 3){
    return (process.argv[2] == "true")
  } else {
    return false
  }
}
