var os = require('os'); var ip = []; var ifaces = os.networkInterfaces(); // 获取本机ip
out:
for (var i in ifaces) {
    for (var j in ifaces[i]) {
        var val = ifaces[i][j];
        if (val.family === 'IPv4' && val.address !== '127.0.0.1') {
            ip.push(val.address);
            break out;
        }
    }
}
console.log(ip);
module.exports = ip;