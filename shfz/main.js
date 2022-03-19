//main.js
// +----------------------------------------------------------------------
// | 自定义函数
// +----------------------------------------------------------------------
// | $Author: Gary
// +----------------------------------------------------------------------
// | $Date: 2019年12月04日 21:00:00
// +----------------------------------------------------------------------
// | $Copyright:
// +----------------------------------------------------------------------
const app = getApp();
const config = app.globalData;
//正则匹配
function searchByIndexOf(keyWord, list) {
  if (!(list instanceof Array)) {
    return;
  }
  var len = list.length;
  var arr = [];
  //去除空格
  keyWord = keyWord.replace(/\s+/g, "");
  for (var i = 0; i < len; i++) {
    //如果字符串中不包含目标字符会返回-1
    if (list[i].ITEMCODE.indexOf(keyWord) >= 0) {
      arr.push(list[i]);
    }
  }
  return arr;
}
module.exports.searchByIndexOf = searchByIndexOf;

//正则匹配
function searchByRegExp(keyWord, list) {
  if (!(list instanceof Array)) {
    return;
  }
  var len = list.length;
  var arr = [];
  var s = 0;
  var lenth = keyWord.length;
  for (var i = 0; i < len; i++) {
    //如果字符串中不包含目标字符会返回-1
    var st = list[i].substring(0, lenth);
    if (st == keyWord) {
      s++;
      arr.push(list[i]);
    }
    if (s == 10) {
      break;
    }
  }
  return arr;
}
module.exports.searchByRegExp = searchByRegExp;

//清除缓存-共通
function remove_storage(storage_name) {
  wx.removeStorageSync(storage_name);
}
module.exports.remove_storage = remove_storage;

//创建缓存-共通
function set_storage(storage_name, data) {
  wx.setStorageSync(storage_name, data);
}
module.exports.set_storage = set_storage;

//取得缓存-共通
function get_storage(storage_name) {
  var storageData = wx.getStorageSync(storage_name) || [];
  return storageData;
}
module.exports.get_storage = get_storage;

//弹框提示   Wording: 提示语    str:(1:成功，0:失败)
function Prompt(Wording, str) {
  if (str == 1) {
    wx.showToast({
      title: Wording,
      icon: 'success',
      duration: 3000
    });
  } else {
    wx.showToast({
      title: Wording,
      image: '../../images/error.png',
      duration: 2000
    })
  }
}
module.exports.Prompt = Prompt;

//验证手机号格式
function isMobile(mob_phone) {
  var mobile = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
  if (!mobile.exec(mob_phone)) {
    return false;
  }
  return true;
}
module.exports.isMobile = isMobile;

//验证座机格式
function isTelphone(tel_phone) {
  var telphone = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/; //判断是否是座机电话
  if (!telphone.exec(tel_phone)) {
    return false;
  }
  return true;
}
module.exports.isTelphone = isTelphone;

//验证邮箱格式
function isEmail(email) {
  var check_email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  if (!check_email.exec(email)) {
    return false;
  }
  return true;
}
module.exports.isEmail = isEmail;

//验证身份证格式
function isIdCard(id_card) {
  var idcard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!idcard.exec(id_card)) {
    return false;
  }
  return true;
}
module.exports.isIdCard = isIdCard;

//验证银行卡号格式
function isBankCard(bank_card) {
  var bankcard = /^([1-9]{1})(\d{14}|\d{18})$/;
  if (!bankcard.exec(bank_card)) {
    return false;
  }
  return true;
}
module.exports.isBankCard = isBankCard;

//验证非零正整数
function isInteger(number) {
  var integer = /^\+?[1-9][0-9]*$/; //判断是否是座机电话
  if (!integer.exec(number)) {
    return false;
  }
  return true;
}
module.exports.isInteger = isInteger;

//验证密码
function isPsw(psw) {
  //var patrn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/g;
  if (psw.length < 6) {
    return false;
  }
  return true;
}
module.exports.isPsw = isPsw;


//弹框提示 errors
function Errors(Wording, str) {
  if (str == 1) {
    wx.showModal({
      content: Wording,
      showCancel: false,
      // success: function (res) {
      //   if (res.confirm) {
      //     // console.log('用户点击确定')
      //   }
      // }
    })
  }
}
module.exports.Errors = Errors;

/**
 * 格式化数字金额用逗号隔开保留n小数
 * @param s 要处理的数字
 * @param n   保留小数点个数
 */
function fmoney(s, n) {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
  var t = "";
  for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}
module.exports.fmoney = fmoney;

/**
 * @param num 要处理的浮点数
 * @param position 小数点后数字个数
 * @return float 返回处理后的字符串
 */
function round(num, position) {
  var f_x = parseFloat(num);
  if (isNaN(f_x)) {
    return false;
  }
  var f_x = Math.round(num * 100) / 100;
  var s_x = f_x.toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
    pos_decimal = s_x.length;
    s_x += '.';
  }
  while (s_x.length <= pos_decimal + position) {
    s_x += '0';
  }
  return s_x;
}
module.exports.round = round;

//去除空格
function Trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
module.exports.Trim = Trim;

function checklogin(data, path) {
  if (data.data.errcode == 205) {
    wx.switchTab({
        url: '/pages/my/my',
    })
    return false;
  }
  return true;
}
module.exports.checklogin = checklogin;

function dologin(res) {
  if (res.data.errcode == '200') {
    this.set_storage('UserLogin', res.data.data);
    this.set_storage('token', res.data.data.token);
    config.memberInfo = res.data.data;
    config.token = res.data.data.token;
  } else {
    config.memberInfo = [];
    config.token = '';
  }
  return true;
}
module.exports.dologin = dologin;