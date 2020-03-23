var ip= require('./getIp.js')
module.exports = {
    // buildName: "", 单独构建某个page下的文件夹目录
    host:ip[0],
    open:true,
    proxy: {
        '/api': {
            //target: 'http://192.168.20.34/ktt/index.php',//设置你调用的接口域名和端口号 别忘了加http
            target: 'https://ktt.woyaoq.com', //正式服务器
            // target: 'http://ktt.com', //闫威
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/'
                //这里理解成用‘/api’代替target里面的地址，
            }
        }
    }
}