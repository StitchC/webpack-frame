const webpack = require('webpack')


const proxy = require('../config/proxy.js')
const historyFallBack = require('../config/historyFallBack.js')

 module.exports = {
   devtool: 'cheap-module-source-map',
   devServer: {
      port: 8080,       // 设置端口
      host: '0.0.0.0',  // 设置可供访问的ip
      hot: true,        // 打开模块热更新
      contentBase: '../dist',
      historyApiFallback: historyFallBack,
      proxy: proxy,
      overlay: {
        errors: true
      }
   },
   module: {
     rules: [
      {
        test: /\.scss$/,
        use: [
         {
           loader: 'style-loader',
           options: {
             sourceMap: false
           }
         },
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
      },

      {
        test: /\.js$/,
        use: [
         {
           loader: 'babel-loader'
         },
         {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
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
     // 模块热更新
     new webpack.HotModuleReplacementPlugin(),
     // 控制台输出热更新文件的相对路径
     new webpack.NamedModulesPlugin()
   ]
 }
