const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js')

const app = express();
const compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));


// 监听3000 端口
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
