const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pages = require('../config/pages.config.js')
const merge = require('webpack-merge')

const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')


const commonConfig = {
  entry: pages.entries(),
  output: {
    filename: 'static/js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist'), // 生成文件的根目录 必须使用绝对路径
    chunkFilename: '[name][hash:5].chunk.js',
    publicPath: '/'    // 针对浏览器端访问资源的路径对应cdn 或服务器上的资源路径
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    ...pages.htmlPlugin(),

    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),

    new webpack.ProvidePlugin({
      // 这里写入一些第三方库的名字
      // 例如：
      // $ : 'jquery'
      // webpack 会根据 'jquery' 这个值找到jquery 的模块
      // 然后在项目中调用 $(...) 就能够执行jquery 的方法了
      $: 'jquery'
    })
  ],
  resolve: {
      extensions: ['.js', '.json', '.css'],
      alias: {
        // 模块别名列表
        'style': path.resolve(__dirname, '../src/style'),

        'module': path.resolve(__dirname, '../src/module')

        // 在别名后加上＄ 表示通过这个名字找到对应的目录文件而不是目录
        // 'jquery.min$': path.resolve(__dirname, '../src/module/libs')
      }
    }
}



 module.exports = env => {
    let config = env === 'prod'
    ? prodConfig
    : devConfig


    return merge(commonConfig, config)
 }