// 服务器代理配置对象
module.exports = {
    '/': {
        target: 'https://www.163.com',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
            '^/': ''
        }
    }
}