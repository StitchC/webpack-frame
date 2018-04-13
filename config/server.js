const express = require('express')
const webpack = require('webpack')
const webpackHotMiddleWare = require('webpack-hot-middleware')
const webpackDevMiddleWare = require('webpack-dev-middleware')
const proxyMiddleWare = require('http-proxy-middleware')
const historyApiFallback = require('connect-history-api-fallback')
const opn = require('opn');

// webpack.common.js 返回的是一个函数
// 这个函数需要一个环境的参数 这里配置的是开发环境 所以参数为 dev
const config = require('../build/webpack.common.js')('dev')
console.log(config);

// 让webpack 执行这项配置
// 获取它的compiler
// 这个 compiler 会在服务器中返回
var compiler = webpack(config)



var app = express()
var port = 8080


// 生成proxyTable
const proxyTable = require('./proxy.js')


// 遍历proxyTable 的key 组装到proxyMiddleWare 中
for(let context in proxyTable) {
    app.use(proxyMiddleWare(context, proxyTable[context]))
}




// 组装 historyApiFallback
app.use(historyApiFallback(require('./historyFallBack')))



app.use(webpackDevMiddleWare(compiler, {
    publicPath: config.output.publicPath
}))


app.use(webpackHotMiddleWare(compiler))



app.listen(port, () => {
    console.log("listen on " + port)
    opn('http://localhost:' + port)
})