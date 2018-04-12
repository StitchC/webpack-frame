const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

 module.exports = merge(common, {
   devtool: 'cheap-module-source-map',
   devServer: {
      port: 8080,   // 设置端口
      hot: true    // 打开模块热更新
   },
   plugins: [
     // 模块热更新
     new webpack.HotModuleReplacementPlugin(),
     // 控制台输出热更新文件的相对路径
     new webpack.NamedModulesPlugin()
   ]
 })
