const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const htmlWebpakInlinePlugin = require('html-webpack-inline-chunk-plugin')

const glob = require('glob-all')
const common = require('./webpack.common.js')


 module.exports = merge(common, {
   devtool: 'source-map',
   plugins: [
     // 提取css 到一个独立文件
     new ExtractTextPlugin({
      filename: 'static/css/[name].[hash].css'
    }),

     // webpack 内置的DefinePlugin
     new webpack.DefinePlugin({
       'process.env.NODE_ENV': JSON.stringify('production')
     }),

     // 提取项目中的公共模块
     // 采取异步加载的模式载入
     // 建议使用 import() 去导入按需加载的模块 采用魔法注释定义异步模块名
     new webpack.optimize.CommonsChunkPlugin({
       name: 'async-common',
       minChunks: 2
     }),

     // 提取第三方库文件 但是保持第三方库文件的纯净 不插入webpack 的代码
     new webpack.optimize.CommonsChunkPlugin({
       name: ['vendor', 'manifest'],
       minChunks: Infinity
     }),

     // 执行webpack treeshaking 删除那些无用代码
     new webpack.optimize.UglifyJsPlugin(),

     // 把webpack 加载代码提前注入到html script 标签里面
     // 减少请求数量
    new htmlWebpakInlinePlugin({
      inlineChunks: ['manifest']
    })
   ]
 });
