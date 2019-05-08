import Taro from '@tarojs/taro'


// tip message
const CHECK_TIP = '请同意用户协议'
const CHECK_ACCOUNT = '账号格式不正确'
const CHECK_PASSWORD = '密码过于简单，请重新设置密码，密码是由6-16位数字与字母的组合'
const CHECK_CAPTCHA = '验证码格式不正确'
const CHECK_PHONE = '手机号码格式不正确'
const CHECK_NAME = '请输入中文姓名'
const CHECK_CHINESE = '请输入中文'
const REPEAT_CAPTCHA = '请勿重复获取验证码'
const CHECK_QQ = '请输入正确的QQ号码'

export default {
    // input格式校验
    checkAccount :function(account) {
        let result = true;
        if(account.length < 4 || account.length > 12) {
            result = false;
        }
        if(!result) {
            Taro.showToast({
                title: CHECK_ACCOUNT,
                icon: 'none'
            });
        }
        return result;   
    },
    checkPassword : function (password) {
        let result = true;
        if(password.length <= 6 || password.length >= 16) {
            result = false;
        }
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        if(pattern.test(password)){
            result = false;
        }
        if(!result) {
            Taro.showToast({
                title:CHECK_PASSWORD,
                icon: 'none'
            });
        }
        return result;   
    },
    checkCaptcha : function (captcha) {
        let result = true;
        if(captcha.length > 4 || !/^[0-9]*$/.test(captcha) || !captcha) {
            result = false;
        }
        if(!result) {
            Taro.showToast({
                title: CHECK_CAPTCHA,
                icon: 'none'
            });
        }
        return result;   
    },
    checkPhone : function (phone) {
        let result = true;
        if(!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
            result = false;
        }
        if(!result) {
            Taro.showToast({
                title: CHECK_PHONE,
                icon: 'none'
            });
        }
        return result; 
    },
    checkName : function (name) {
        let result = true;
        if(!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name)) {
            result = false;
        }
        if(!result) {
            Taro.showToast({
                title: CHECK_NAME,
                icon: 'none'
            });
        }
        return result;
    },

    checkChinese : function (name) {
        let result = true;
        if(!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name)) {
            result = false;
        }
        if(!result) {
            Taro.showToast({
                title: CHECK_CHINESE,
                icon: 'none'
            });
        }
        return result;
    },
    checkQQ : function (num) {
        let result = true;
        if(!/^[1-9][0-9]{4,10}$/gim.test(num)) {
            result = false;
        }
        if(!result) {
            Taro.showToast({
                title: CHECK_QQ,
                icon: 'none'
            });
        }
        return result;
    },

    // 去除html标签
    delHtmlTag : function (str){
        return str.replace(/<[^>]+>/g," ");//去掉所有的html标记
    },
    // 去除字符串所有空格
    removeAllSpace: function (str) {
        return str.replace(/\s+/g, "");
    },
    //去除前后空格
    Trim: function (str){ 
        if(str){
            return str.replace(/(^\s*)|(\s*$)/g, ""); 
        }
        else {
            return str;
        }
    }
}