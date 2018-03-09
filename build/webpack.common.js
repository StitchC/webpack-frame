const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HTMLDirs } = require('../config/pages.config.js');

// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {};


// 生成多页面的集合
HTMLDirs.forEach((page) => {
    // 将对应的页面创建一个 htmlPlugin
    var htmlPlugin = new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(__dirname, `../src/pages/${page}.html`),
        chunks: [page, 'commons'],
    });
    HTMLPlugins.push(htmlPlugin);
    // 然后根据对应页面的文件名生成对应的入口文件js
    Entries[page] = path.resolve(__dirname, `../src/script/${page}.js`);
});


module.exports = {
   entry: Entries,
   output: {
     filename: 'static/js/[name].js',
     path: path.resolve(__dirname, '../dist'), // 生成文件的根目录 必须使用绝对路径
     publicPath: './'    // 针对浏览器端访问资源的路径 对应cdn 或 服务器上的资源路径
   },
   plugins: [
     ...HTMLPlugins,
     new CleanWebpackPlugin(['dist']),
     new ExtractTextPlugin({
       filename: '[name][id].css'
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
 };
