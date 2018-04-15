const webpack = require('webpack')


const proxy = require('../config/proxy.js')
const historyFallBack = require('../config/historyFallBack.js')

 module.exports = {
   devtool: 'cheap-module-source-map',
   devServer: {
      port: 8080,   // 设置端口
      hot: true,    // 打开模块热更新
      contentBase: '../dist',
      historyApiFallback: historyFallBack,
      proxy: proxy,
      overlay: {
        warnings: true,
        errors: true
      }
   },
   plugins: [
     // 模块热更新
     new webpack.HotModuleReplacementPlugin(),
     // 控制台输出热更新文件的相对路径
     new webpack.NamedModulesPlugin()
   ]
 }
