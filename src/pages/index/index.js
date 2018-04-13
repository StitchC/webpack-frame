import 'babel-polyfill'
import 'style/main.scss'
import output from 'module/output'


if (process.env.NODE_ENV !== 'production') {
  require('./index.html')
}

output()
// 导入css


setTimeout(() => {
  console.log('hello')
}, 1000)


function hi() {
  console.log('test hot update')
}


hi()
// output();
