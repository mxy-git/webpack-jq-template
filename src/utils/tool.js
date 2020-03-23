// import { Toast } from "vant";

/*
 *
 * 获取url后参数
 * @ strname 指定参数
 * */
export const getRequestParams = strname => {
  var url = location.search; // 获取url中"?"符后的字串
  var theRequest = {};
  if (url.indexOf("?") !== -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  if (strname) {
    return theRequest[strname];
  } else {
    return theRequest;
  }
};
/*
 *  获取是 手机端还是pc端
 * */
export const getDeviceType = () => {
  if (navigator.userAgent.indexOf("Mobile") !== -1) {
    return "mobile";
  } else {
    return "desktop";
  }
};

/*
 * 将秒转化为 天:时:分:秒
 *@second_time 秒
 * */
export const formatSecondsToTime = value => {
  var time;
  var d = Math.floor(value / 86400);
  var h = Math.floor((value - d * 86400) / 3600);
  var m = Math.floor((value - d * 86400 - h * 3600) / 60);
  var s = value - d * 86400 - h * 3600 - m * 60;
  if (d <= 9) {
    d = "0" + d;
  }
  if (h <= 9) {
    h = "0" + h;
  }
  if (m <= 9) {
    m = "0" + m;
  }
  if (s <= 9) {
    s = "0" + s;
  }
  time = h + ":" + m + ":" + s;
  return time;
};

/*
 *  校验手机号
 *  @ str  传入输入手机号
 * */
export const isPhoneAvailable = str => {
  const myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
};

/*
 * 展示公用loading
 * @bol true 开启 false 关闭
 * */
// export const showLoad = bol => {
//   if (bol) {
//     Toast.loading({
//       mask: false,
//       message: "加载中...",
//       duration: 0,
//       loadingType: "spinner"
//     });
//   } else {
//     Toast.clear();
//   }
// };

/*
 * 获取当前域名
 * */
export const getCurrentDomain = () => {
  var protocol = location.protocol;
  var host = window.location.host;
  return protocol + "//" + host;
};

/*
 *  接口传公共参数
 * */
export const getSendData = () => {
  return {
    access: getRequestParams("access"),
    "app-version": getRequestParams("app-version"),
    carrier: getRequestParams("carrier"),
    channel: getRequestParams("channel"),
    cookie: getRequestParams("cookie"),
    cookie_id: getRequestParams("cookie_id"),
    device_brand: getRequestParams("device_brand"),
    device_id: getRequestParams("device_id"),
    device_model: getRequestParams("device_model"),
    device_type: getRequestParams("device_type"),
    mc: getRequestParams("mc"),
    openudid: getRequestParams("openudid"),
    os_api: getRequestParams("os_api"),
    os_version: getRequestParams("os_version"),
    request_time: getRequestParams("request_time"),
    resolution: getRequestParams("resolution"),
    sim: getRequestParams("sim"),
    sm_device_id: getRequestParams("sm_device_id"),
    subv: getRequestParams("subv"),
    uid: getRequestParams("uid"),
    version_code: getRequestParams("version_code"),
    zqkey: getRequestParams("zqkey"),
    zqkey_id: getRequestParams("zqkey_id")
  };
};

/*
 * 判断是否为ios android
 * */
export const isAndroid = () => {
  if (navigator.userAgent.toLowerCase().indexOf('android') != -1) {  //eslint-disable-line
    return true;
  }
  return false;
};
//设置url参数
//setUrlPrmt({'a':1,'b':2})
//result：a=1&b=2
export const setUrlPrmt = () => {
  let _rs = [];
  for (let p in obj) {
    if (obj[p] != null && obj[p] != '') {
      _rs.push(p + '=' + obj[p])
    }
  }
  return _rs.join('&');
}
//现金额大写转换函数
//upDigit(168752632)
//result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
//upDigit(1682)
//result："人民币壹仟陆佰捌拾贰元整"
//upDigit(-1693)
//result："欠人民币壹仟陆佰玖拾叁元整"
export const upDigit = (n) => {
  let fraction = ['角', '分', '厘'];
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  let head = n < 0 ? '欠人民币' : '人民币';
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    //s = p + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}
//filterParams({a:"",b:null,c:"010",d:123})
//Object {c: "010", d: 123}

export const filterParams = obj => {
  let _newPar = {};
  for (let key in obj) {
    if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
      _newPar[key] = obj[key];
    }
  }
  return _newPar;
}
//数据类型判断
//ecDo.istype([],'array')
//true
//ecDo.istype([])
//'[object Array]'
export const istype = (o, type) => {
  switch (type.toLowerCase()) {
    case 'string':
      return Object.prototype.toString.call(o) === '[object String]';
    case 'number':
      return Object.prototype.toString.call(o) === '[object Number]';
    case 'boolean':
      return Object.prototype.toString.call(o) === '[object Boolean]';
    case 'undefined':
      return Object.prototype.toString.call(o) === '[object Undefined]';
    case 'null':
      return Object.prototype.toString.call(o) === '[object Null]';
    case 'function':
      return Object.prototype.toString.call(o) === '[object Function]';
    case 'array':
      return Object.prototype.toString.call(o) === '[object Array]';
    case 'object':
      return Object.prototype.toString.call(o) === '[object Object]';
    case 'nan':
      return isNaN(o);
    case 'elements':
      return Object.prototype.toString.call(o).indexOf('HTML') !== -1
    default:
      return Object.prototype.toString.call(o)
  }
}

// 手机类型判断
export const browserInfo = () => {
  switch (type) {
    case 'android':
      return navigator.userAgent.toLowerCase().indexOf('android') !== -1
    case 'iphone':
      return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
    case 'ipad':
      return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
    case 'weixin':
      return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    default:
      return navigator.userAgent.toLowerCase()
  }
}

//***************cookie模块*******************************/
//设置cookie
export const setCookie = (name, value, iDay) => {
  let oDate = new Date();
  oDate.setDate(oDate.getDate() + iDay);
  document.cookie = name + '=' + value + ';expires=' + oDate;
}
//获取cookie
export const getCookie = (name) => {
  let arr = document.cookie.split('; ');
  for (let i = 0; i < arr.length; i++) {
    let arr2 = arr[i].split('=');
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
  return '';
}
//删除cookie
export const removeCookie = (name) => {
  this.setCookie(name, 1, -1);
}

//检测对象是否有哪个类名
export const hasClass = (obj, classStr) => {
  if (obj.className && this.trim(obj.className, 1) !== "") {
    let arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
    return (arr.indexOf(classStr) === -1) ? false : true;
  }
  else {
    return false;
  }

}
//添加类名
export const addClass = (obj, classStr) => {
  if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
    for (let i = 0, len = obj.length; i < len; i++) {
      if (!this.hasClass(obj[i], classStr)) {
        obj[i].className += " " + classStr;
      }
    }
  }
  else {
    if (!this.hasClass(obj, classStr)) {
      obj.className += " " + classStr;
    }
  }
}
//删除类名
export const removeClass = (obj, classStr) => {
  if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
    for (let i = 0, len = obj.length; i < len; i++) {
      if (this.hasClass(obj[i], classStr)) {
        let reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
        obj[i].className = obj[i].className.replace(reg, '');
      }
    }
  }
  else {
    if (this.hasClass(obj, classStr)) {
      let reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
      obj.className = obj.className.replace(reg, '');
    }
  }
}
//替换类名("被替换的类名","替换的类名")
export const replaceClass = (obj, newName, oldName) => {
  this.removeClass(obj, oldName);
  this.addClass(obj, newName);
}

//字符串替换(字符串,要替换的字符或者正则表达式（不要写g）,替换成什么)
//ecDo.replaceAll('这里是上海，中国第三大城市，广东省省会，简称穗，','上海','广州')
//result："这里是广州，中国第三大城市，广东省省会，简称穗，"
export const replaceAll = (str, AFindText, ARepText) => {
  let raRegExp = new RegExp(AFindText, "g");
  return str.replace(raRegExp, ARepText);
},

//检测字符串
//checkType('165226226326','phone')
//result：false
//大家可以根据需要扩展
export const checkType = (str, type) => {
  switch (type) {
    case 'email':
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'phone':
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
    case 'tel':
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'number':
      return /^[0-9]$/.test(str);
    case 'english':
      return /^[a-zA-Z]+$/.test(str);
    case 'text':
      return /^\w+$/.test(str);
    case 'chinese':
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case 'lower':
      return /^[a-z]+$/.test(str);
    case 'upper':
      return /^[A-Z]+$/.test(str);
    default:
      return true;
  }
}
//检测密码强度
//checkPwd('12asdASAD')
//result：3(强度等级为3)
export const checkPwd = (str) => {
  let nowLv = 0;
  if (str.length < 6) {
    return nowLv
  }
  if (/[0-9]/.test(str)) {
    nowLv++
  }
  if (/[a-z]/.test(str)) {
    nowLv++
  }
  if (/[A-Z]/.test(str)) {
    nowLv++
  }
  if (/[\.|-|_]/.test(str)) {
    nowLv++
  }
  return nowLv;
}

//随机码
//count取值范围2-36

//randomWord(10)
//result："2584316588472575"

//randomWord(14)
//result："9b405070dd00122640c192caab84537"

//randomWord(36)
//result："83vhdx10rmjkyb9"

export const randomWord = (count) => {
  return Math.random().toString(count).substring(2);
}

//查找字符串
//let strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
//countStr(strTest,'blog')
//result：6
export const countStr = (str, strSplit) => {
  return str.split(strSplit).length - 1
}

//过滤字符串(html标签，表情，特殊字符)
//字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符
//如果需要过滤多种字符，type参数使用,分割，如下栗子
//过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除
//let str='asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&*^%^&*$\\"\'#@!()*/-())_\'":"{}?<div></div><img src=""/>啊实打实大蠢猪自行车这些课程';
// ecDo.filterStr(str,'html,WORD,chinese,special','*','%?')
//result："asd    654a**sasdasd*********6d5#%^*^&*^%^&*$\"'#@!()*/-())_'":"{}?*****************"
export const filterStr = (str, type, restr = '', spstr) => {
  let typeArr = type.split(','), _str = str;
  for (let i = 0, len = typeArr.length; i < len; i++) {
    //是否是过滤特殊符号
    let pattern;
    if (typeArr[i] === 'special') {
      let regText = '$()[]{}?\|^*+./\"\'+';
      //是否有哪些特殊符号需要保留
      if (spstr) {
        let _spstr = spstr.split(""), _regText = "[^0-9A-Za-z\\s";
        for (let j = 0, len1 = _spstr.length; j < len1; j++) {
          if (regText.indexOf(_spstr[j]) === -1) {
            _regText += _spstr[j];
          }
          else {
            _regText += '\\' + _spstr[j];
          }
        }
        _regText += ']'
        pattern = new RegExp(_regText, 'g');
      }
      else {
        pattern = new RegExp("[^0-9A-Za-z\\s]", 'g')
      }

    }
    switch (typeArr[i]) {
      case 'special':
        _str = _str.replace(pattern, restr);
        break;
      case 'html':
        _str = _str.replace(/<\/?[^>]*>/g, restr);
        break;
      case 'emjoy':
        _str = _str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, restr);
        break;
      case 'word':
        _str = _str.replace(/[a-z]/g, restr);
        break;
      case 'WORD':
        _str = _str.replace(/[A-Z]/g, restr);
        break;
      case 'number':
        _str = _str.replace(/[0-9]/g, restr);
        break;
      case 'chinese':
        _str = _str.replace(/[\u4E00-\u9FA5]/g, restr);
        break;
    }
  }
  return _str;
}

//格式化处理字符串
//ecDo.formatText('1234asda567asd890')
//result："12,34a,sda,567,asd,890"
//ecDo.formatText('1234asda567asd890',4,' ')
//result："1 234a sda5 67as d890"
//ecDo.formatText('1234asda567asd890',4,'-')
//result："1-234a-sda5-67as-d890"
export const formatText = (str, size = 3, delimiter = ',') => {
  let regText = '\\B(?=(\\w{' + size + '})+(?!\\w))';
  let reg = new RegExp(regText, 'g');
  return str.replace(reg, delimiter);
}

//数组去重
export const removeRepeatArray = (arr) => {
  // return arr.filter(function (item, index, self) {
  //     return self.indexOf(item) === index;
  // });
  //es6
  return [...new Set(arr)]
}
//数组顺序打乱
export const upsetArr(arr) => {
  return arr.sort(() => {
    return Math.random() - 0.5
  });
}

//数组最大值
//这一块的封装，主要是针对数字类型的数组
export const maxArr = (arr) => {
  return Math.max.apply(null, arr);
}
//数组最小值
export const minArr = (arr) => {
  return Math.min.apply(null, arr);
}
//从数组中随机获取元素
export const randomOne = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
},

//回数组（字符串）一个元素出现的次数
//getEleCount('asd56+asdasdwqe','a')
//result：3
//getEleCount([1,2,3,4,5,66,77,22,55,22],22)
//result：2
export const getEleCount = (obj, ele) => {
  let num = 0;
  for (let i = 0, len = obj.length; i < len; i++) {
    if (ele === obj[i]) {
      num++;
    }
  }
  return num;
}