import 'babel-polyfill'
import output from 'module/output'



// 导入css
import 'style/main.scss'

setTimeout(() => {
  console.log('hello')
}, 1000)

function hi() {
  console.log('test hot update')
}


hi()
// output();
