import Taro from '@tarojs/taro'
import _fetch from '@/utils/fetch.js'
export default function checkLogin () {
    const token = Taro.getStorageSync('token');
    if(!token){ //如果token为空
        Taro.navigateTo({
            url: '/pages/login/login'
        })
    }else {
        _fetch({url:'/app/checkToken',payload: {},method: 'POST',autoLogin: true}) //判断登录有没有过期
            .then(res => console.log('验证token成功',res)).catch(err=>console.log('token过期',err))
    }
}