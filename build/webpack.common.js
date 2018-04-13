const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pages = require('../config/pages.config.js')
const merge = require('webpack-merge')

const prodConfig = require('./webpack.prod')
const devConfig = require('./webpack.dev')



const commonConfig = env => {
  // 生成提取css 样式的插件对象
  const ExtractTextSass = new ExtractTextPlugin({
    filename: 'static/css/[name].[hash].css'
  })
  // 根据不同的环境 配置不同的loader
  // 根据不同的环境 配置js文件 的laoder
  const scriptLoader = [
    {
      loader: 'babel-loader'
    }
  ].concat(env === 'prod' 
    ? [] 
    : [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
      }]
  )

  const cssLoaders = [
    {
      loader: 'style-loader',
      options: {
        sourceMap: env === 'dev'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: env === 'dev',
        ident: 'postcss',
        plugins: [
            require('postcss-cssnext')()
        ]
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: env === 'dev'
      }
    }
  ]

  // 根据不同环境 配置 css 文件的loader
  const styleLoader = env === 'prod'
                              ? ExtractTextSass.extract({
                                fallback: 'style-loader',
                                use: cssLoaders.slice(1)  // 因为第一个loader 是style-loader 但是在use 里面不能用styleloader 所以要用slice 将数组第一项移除
                              })
                              : [].concat(cssLoaders)




  // 根据不同环境 配置file-loader
  const fileLoaders = env === 'dev'
                              ? [{
                                loader: 'file-loader',
                                options: {
                                  outputPath: 'static/images/',
                                  limit: 5000
                                }
                              }]
                              : [{
                                  loader: 'url-loader',
                                  options: {
                                    outputPath: 'static/images/',
                                    limit: 5000
                                  }
                                }]


  return {
    entry: pages.entries(),
    output: {
      filename: 'static/js/[name].[hash].js',
      path: path.resolve(__dirname, '../dist'), // 生成文件的根目录 必须使用绝对路径
      chunkFilename: '[name][hash:5].chunk.js',
      publicPath: '/'    // 针对浏览器端访问资源的路径对应cdn 或服务器上的资源路径
    },
    plugins: [
      ...pages.htmlPlugin(),

      ExtractTextSass,

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
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: fileLoaders.concat(env === 'prod'
                                            ? [{
                                                loader: 'img-loader',
                                                options: {
                                                  pngquant: {
                                                    quality: 80
                                                  }
                                                 }
                                            }]
                                            : []
                                  )
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg)$/,
          use: fileLoaders
        },
        {
          test: /\.scss$/,
          use: styleLoader
        },
        {
          test: /\.js$/,
          use: scriptLoader,
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                attr: ['img:src']
              }
            }
          ]
        }
      ]
    },
    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: {
          // 模块别名列表
          'style': path.resolve(__dirname, '../src/style'),

          'module': path.resolve(__dirname, '../src/module'),

          // 在别名后加上＄ 表示通过这个名字找到对应的目录文件而不是目录
          // 'jquery.min$': path.resolve(__dirname, '../src/module/libs')
        }
      }
    }
 }

 module.exports = env => {
    let config = env === 'prod'
    ? prodConfig
    : devConfig

    return merge(commonConfig(env), config)
 }