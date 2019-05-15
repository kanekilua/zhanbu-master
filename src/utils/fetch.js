// 暂时只封装请求资源的fetch方法

import Taro from '@tarojs/taro'


// 更新storage
function updateStorage(data = {}) {
    return Promise.all([
        Taro.setStorage({ key: 'token', data: data['token'] || '' }),//更新token
        Taro.setStorage({ key: 'userInfo', data: data['userInfo'] || '' }), //更新用户信息
        Taro.setStorage({ key: 'master_data', data: data['master_data'] || '' }), //更新大师信息 
    ])
 }
/**
 * 简易封装网络请求 
 * 调用示例： 
 * autoLogin为登录权限，showToast为成功反馈模态框。showStatus为展示状态码和data。
 * _fetch({url:'/app/phoneLogin',payload: params,method: 'POST',autoLogin:false,showToast: false}).then(res=>console.log(res)).catch(err=>console.log(err))
 */
export default async function _fetch(options) {
    const baseUrl = 'https://mingli.szmonster.com/api';

    const {url, payload, method='GET', autoLogin=false, showToast=false, showStatus= false} = options
    const token = Taro.getStorageSync('token') //从缓存获取token
    const header = token ? { 'Authorization': token } : {} //将token放入header
    if (method === 'POST') {
      header['content-type'] = 'application/json'
    }
    
    return Taro.request({
        url: baseUrl + url,
        method,
        data: payload,
        header,
    })
    .then(async (res) => {
        // console.log('fetch成功返回信息',res)
        const { code, data, error_num } = res.data

        if (code !== 'success') {  //如果状态为失败。
            if (error_num === '10002') { //登录状态为过期
                await updateStorage({}) //清除toke和userInfo
            }
            return Promise.reject(res.data) //抛出错误
        }
        
        // 如果请求登录接口和退出登录接口，则更新token
        if (url === '/app/phoneLogin' || url === '/masterin/master_login' || url === '/app/logout') {
            await updateStorage(data);
        }
        // 如果需要展示成功提示信息
        if(code == 'success'){ 
            if(showToast===true){
                Taro.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })
            }
        }
        //如果需要展示状态码
        if(showStatus) {
            return Promise.resolve(res);
        }
        return data
    })
    // 接收抛出的错误
    .catch((err) => { 
        console.log('catch返回信息',err)
        Taro.showToast({
            title: err.msg,
            icon: 'none'
        })
        if(err.error_num === '10002' && autoLogin){
            console.log('跳转登录')
            Taro.navigateTo({
                url: '/pages/login/login'
            })
        }
        return Promise.reject({ msg: err.msg, ...err })
    })
}
