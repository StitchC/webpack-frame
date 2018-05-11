const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const htmlWebpakInlinePlugin = require('html-webpack-inline-chunk-plugin')

// const glob = require('glob-all')
// const common = require('./webpack.common.js')


 module.exports =  {
   devtool: 'source-map',
   module: {
     rules: [
       {
         test: /\.scss$/,
         use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                ident: 'postcss',
                plugins: [
                    require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            }
           ]
        })
       },

       {
         test: /\.js$/,
         use: [
          {
            loader: 'babel-loader'
          }
         ],
         exclude: /node_modules/
       },

       {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              outputPath: 'static/images/'
            }
          },
          {
            loader: 'img-loader',
            options: {
              pngquant: {
                quality: 80
              }
             }
          }
        ]
      },

      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              outputPath: 'static/fonts/'
            }
          }
        ]
      }
     ]
   },
   plugins: [
     // 提取css 文件插件
     new ExtractTextPlugin({
       filename: 'static/css/[name][hash:5].css'
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
    }),

    // treeShaking 压缩丑化js 代码
    new UglifyJSPlugin()
   ]
 }
