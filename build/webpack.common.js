const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pages = require('../config/pages.config.js');


module.exports = {
   entry: pages.entries(),
   output: {
     filename: 'static/js/[name].js',
     path: path.resolve(__dirname, '../dist'), // 生成文件的根目录 必须使用绝对路径
     publicPath: './'    // 针对浏览器端访问资源的路径 对应cdn 或 服务器上的资源路径
   },
   plugins: [
     ...pages.htmlPlugin(),
     new CleanWebpackPlugin(['dist']),
     new ExtractTextPlugin({
       filename: 'static/css/[name][id].css'
     })
   ],
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
         test: /\.(png|jpg|jpeg|gif|svg)$/,
         use: {
           loader: 'file-loader',
           options: {
             name: 'static/images/[name].[ext]',
             publicPath: './'
           }
         }
       },
       {
         test: /\.scss/,
         use: ExtractTextPlugin.extract({
           fallback: 'style-loader',
           use: ['css-loader', 'sass-loader']
         })
       }
     ]
   },
   resolve: {
      extensions: [".js", ".json", ".css"],
      alias: {
       // 模块别名列表
       "style": path.resolve(__dirname, '../src/style'),

       "module": path.resolve(__dirname, '../src/module')

     }
   }
 };
