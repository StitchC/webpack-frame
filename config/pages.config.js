'use strict'
const path = require('path');
// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob');
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
const PAGE_PATH = path.resolve(__dirname, '../src/pages');
// 页面模板
const HtmlWebpackPlugin = require('html-webpack-plugin');


//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function() {
  // 调用 glob 对象获取 ../src/pages 下的子文件夹下的所有js 文件
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js');
  // 建立对象保存获取出来的js 文件名和文件路径
  let map = {};
  // 遍历filePath 这个数组将结果保存在map 这个对象中
  entryFiles.forEach((filePath) => {
    console.log(filePath);
    console.log(__dirname);
    
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    map[filename] = filePath
  });
  // 返回map 对象
  return map
};

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function() {
  // 和上面多个入口函数一样 通过blob 对象查找../src/pages 下的子文件夹下的所有html 文件
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html');
  let arr = [];
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['manifest', 'vendor', filename],
      inject: true
    };
    arr.push(new HtmlWebpackPlugin(conf))
  });
  return arr
};
