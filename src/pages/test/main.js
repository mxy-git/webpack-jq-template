import "../../assets/js/rem.js";
import "../../assets/js/sa.config.js"
import "../../assets/css/reset.module.css";
import './index.less';
console.log(process.env.NODE_ENV)
import testImg from '../../static/1.png'
import QRCode from 'qrcode'
import { ECONNABORTED } from "constants";
// With promises
// var testImg='http://res.woyaoq.com/201903011518_5c78dcbe6ad16.png'

// import vConsole from 'vconsole';
// new vConsole()
var MyCanvas = document.querySelector(".my-canvas");
console.log(111)
MyCanvas.width = MyCanvas.height = 500;
var ctx = MyCanvas.getContext("2d");
var CreateImg = document.createElement("img");
CreateImg.src = testImg;

CreateImg.onload = function () {
    console.log(CreateImg.width)
    MyCanvas.width = CreateImg.width;
    MyCanvas.height = CreateImg.height;
    ctx.drawImage(CreateImg, 0, 0, CreateImg.width, CreateImg.height);
    QRCode.toDataURL('https://www.npmjs.com/package/qrcode#options')
        .then(url => {
            console.log(url)
            var CreateCode = document.createElement("img");
            CreateCode.src = url;
            CreateCode.onload = function () {
                ctx.drawImage(CreateCode, MyCanvas.width/2-300, 1430, 600, 600);
                ctx.font = "100px Verdana";
                // 创建渐变
                var gradient = ctx.createLinearGradient(0, 0, MyCanvas.width, 0);
                gradient.addColorStop("0", "magenta");
                gradient.addColorStop("0.5", "blue");
                gradient.addColorStop("1.0", "red");
                // 用渐变填色
                ctx.fillStyle = gradient;
                ctx.textAlign = 'center';
                ctx.fillText("我是个测试", MyCanvas.width/2, 1100);
                document.querySelector("#show-img").src = MyCanvas.toDataURL()
            }

        })
        .catch(err => {
            console.error(err)
        })
}
var CreateButton = document.createElement("button");
CreateButton.innerText = "获取画布图案";
document.body.appendChild(CreateButton)
CreateButton.onclick = () => {
    let CreateImg = document.createElement("img");
    CreateImg.src = MyCanvas.toDataURL();
    document.body.appendChild(CreateImg)
}

function getBase64(url, callback) {
    //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
    var Img = new Image(),
        dataURL = '';
    Img.src = url;
    Img.onload = function () { //要先确保图片完整获取到，这是个异步事件
        var canvas = document.createElement("canvas"), //创建canvas元素
            width = Img.width, //确保canvas的尺寸和图片一样
            height = Img.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
        dataURL = canvas.toDataURL('image/jpeg'); //转换图片为dataURL
        callback ? callback(dataURL) : null; //调用回调函数
    };
}
// getBase64('http://res.woyaoq.com/201903011519_5c78dce4061ee.png',(url)=>{
//     console.log(url)
// })