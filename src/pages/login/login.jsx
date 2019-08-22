import Taro from '@tarojs/taro'
import { View, Image, Input, Button, Text } from '@tarojs/components'
import app from '@/utils/appData'
import _fetch from '@/utils/fetch.js'
import checkForm from '@/utils/checkForm.js'
import IMController from '@/controller/im'

import Header from '@/components/header/header'

import logo from './assets/logo.png'
import phoneIco from './assets/phone.png'
import capchaIco from './assets/capcha.png'
import visible from './assets/visible.png'
import unvisible from './assets/unvisible.png'
import style from './login.module.scss'

class Login extends Taro.Component {
    config = {
        navigationStyle: 'custom'
    }
    constructor (props) {
        super(props)
        this.state = {
            visibleStatus: false, //密码显示
            account: '', //账号
            password: ''
        }
    }

    // 登录
    login () {
         //账号登录
        // if(!checkForm.checkPhone(this.state.account)){
        //     return;
        // }else {
            let params = {
                mobile: this.state.account,
                password: this.state.password,
            }
            //  获取token并保存
            _fetch({url:'/masterin/master_login',payload: params,method: 'POST',autoLogin:false, showToast: true})
            .then(res=>{
                setTimeout(() => {
                    const userInfo = Taro.getStorageSync('userInfo')
                    let {accid, yunxin_token, avatar} = userInfo
                    if( accid && yunxin_token ) {
                        new IMController({
                            account : accid,
                            token : yunxin_token,
                            avatar : avatar
                        })
                    }
                    const master_data = Taro.getStorageSync('master_data')
                    app.setMasterOnline(master_data.flash_status)
                },500)
                setTimeout(()=>{
                    Taro.redirectTo({
                        url:'/pages/index/index'
                    })
                },2000)
            })
            .catch(err=>console.log(err))
        // }
    }

    render() {
        let { visibleStatus, account, password } = this.state
        return (
            <View className={style.loginWrap}>
                <Header
                    headerTitle='登录'
                    back={false}/>
                <View className={style.content}>
                    <Image
                        className={style.logo}
                        src={logo}
                    />
                    <View>
                    <View className={style.phoneInputBox}>
                            <Image
                                className={style.phoneIco}
                                src={phoneIco}
                            />
                            <Input
                                type='number'
                                placeholder='请输入账号'
                                className={style.phoneInput}
                                onInput={(e)=>{
                                    this.setState({
                                        account: e.target.value
                                    })
                                }}
                            />
                            <View className={style.verificationCode}></View>
                        </View>
                        <View className={style.identifyInputBox}>
                            <Image
                                className={style.capchaIco}
                                src={capchaIco}
                            />
                            <Input
                                className={style.capchaInput}
                                placeholder='请输入密码'
                                type={visibleStatus ? `text` : 'password'}
                                onInput={(e)=>{
                                    this.setState({
                                        password: e.target.value
                                    })
                                }}
                            />
                            <View className={style.eyeBox}>
                                <Image
                                    className={visibleStatus ? style.eye : style.closeEye}
                                    src={visibleStatus ? visible : unvisible}
                                    onClick={()=>{this.setState({
                                        visibleStatus: !visibleStatus
                                    })}}
                                />
                            </View>
                        </View>
                        <View className={style.resetPassword}>
                            <Text
                                className={style.resetPasswordText}
                                onClick={()=>{
                                    Taro.showToast({
                                        title:'请联系客服',
                                        icon:'none'
                                    })
                                }}    
                            >忘记密码></Text>
                        </View>
                        <Button
                            className={style.loginBtn}
                            onClick={this.login.bind(this)}
                        >登录
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}


export default Login