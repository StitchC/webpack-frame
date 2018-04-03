const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

 module.exports = merge(common, {
   plugins: [
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
     })
   ]
 });
