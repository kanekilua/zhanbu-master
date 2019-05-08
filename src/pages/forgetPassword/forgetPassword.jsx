import Taro from '@tarojs/taro'
import { View,Image,Input, Radio, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import _fetch from '@/utils/fetch.js'
import checkForm from '@/utils/checkForm.js'

import Header from '@/components/header/header'
import phoneIco from './assets/phone.png'
import capchaIco from './assets/capcha.png'
import passwordIco from './assets/password.png'
import visible from './assets/visible.png'
import unvisible from './assets/unvisible.png'
import checkIcon from './assets/check-icon.png'
import style from './forgetPassword.module.scss'

class ForgetPassword extends Taro.Component {
    config = {
        navigationStyle: 'custom'
    }
    constructor (props) {
        super(props)
        this.state = {
            phone: '',
            verificationStatus: false,
            verificationText: '获取验证码',
            verificationCode: '', // 验证码
            visibleStatus: false, //密码显示
            password: '',
            password1: '',
            visibility: true,
            rewritePassword: '',
            visibility1: true
            
        }
    }

     // 获取验证码
     getVerificationCode () {
        if(!checkForm.checkPhone(this.state.phone)){ //如果手机号码不正确
            return;
        }else {
            this.setState({
                verificationStatus: true //禁止点击按钮
            })
            let params = {
                mobile: this.state.phone
            }
            _fetch({url:'/app/changepwd',payload: params,method: 'POST',autoLogin:false, showToast: true})
                .then(() => {
                    let counter = 60;
                    let countTimer = setInterval(()=>{ //倒计时
                        if(counter>0 && counter<=60) {
                            counter--;
                            this.setState({
                                verificationText: `${counter} s`
                            })
                        }else {
                            clearInterval(countTimer)
                            this.setState({
                                verificationText: '重新获取',
                                verificationStatus: false
                            })
                        }
                    },1000)
                })
                .catch(err=>console.log(err)) 
        }
    }
    handleSubmit () {
        if(!checkForm.checkPhone(this.state.phone)){ //验证手机号
            return;
        }if(!checkForm.checkCaptcha(this.state.verificationCode)){ //验证码
            return;
        }
        if(!checkForm.checkPassword(this.state.password)){ //验证密码
            return;
        }if(this.state.password !== this.state.password1){
            Taro.showToast({
                title: '请确保两次输入的密码结果一致',
                icon: 'none'
            })
        }
        else {
            let params = {
                mobile: this.state.phone,
                password: this.state.password,
                captcha: this.state.verificationCode,
                event: 'changepwd'
            }
            _fetch({url:'/app/submit',payload: params,method: 'POST',autoLogin: false, showToast: true})
            .then(res => {
                console.log('注册返回信息',res)
                setTimeout(()=>{
                    Taro.navigateBack({ delta: 2 })
                },2000)
                
                
            })
            .catch((err)=>{console.log('注册失败',err)})
        }
    }


    render() {
        let { verificationText, verificationStatus, visibleStatus, visibility,visibleStatus1,visibility1 } = this.state
        return (
            <View className={style.registerWrap}>
                <Header
                    headerTitle='修改密码'
                />
                <View className={style.content}>
                    <View className={style.phoneNumLogin}>
                        <View className={style.phoneInputBox}>
                            <View className={style.phoneInputBoxLeft}>
                                <View className={style.icoBox}>
                                    <Image
                                        className={style.phoneIco}
                                        src={phoneIco}
                                    />
                                </View>
                                <Input
                                    type='number'
                                    placeholder='请输入手机号码'
                                    className={style.phoneInput}
                                    onInput={(e)=>this.setState({phone: e.target.value})}
                                />
                            </View>
                            <View className={style.verificationCode}></View>
                        </View>
                        <View className={style.identifyInputBox}>
                            <View className={style.phoneInputBoxLeft}>
                                <View className={style.icoBox}>
                                    <Image
                                        className={style.capchaIco}
                                        src={capchaIco}
                                    />
                                </View>
                                <Input
                                    className={style.capchaInput}
                                    type='number'
                                    placeholder='请输入验证码'
                                    onInput={(e)=>this.setState({verificationCode: e.target.value})}
                                />
                            </View>
                            <Button
                                className={style.verificationCode}
                                onClick={this.getVerificationCode.bind(this)}
                                disabled={verificationStatus}
                            >{verificationText}
                            </Button>
                        </View>
                        <View className={style.identifyInputBox}>
                            <View className={style.phoneInputBoxLeft}>
                                <View className={style.icoBox}>
                                    <Image
                                        className={style.capchaIco}
                                        src={passwordIco}
                                    />
                                </View>
                                <Input
                                    className={style.capchaInput}
                                    placeholder='请设置您的密码'
                                    type={visibleStatus ? `text` : 'password'}
                                    onInput={(e)=>{
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }}
                                />
                            </View>
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
                        <View className={style.identifyInputBox}>
                            <View className={style.phoneInputBoxLeft}>
                                <View className={style.icoBox}>
                                    <Image
                                        className={style.capchaIco}
                                        src={passwordIco}
                                    />
                                </View>
                                <Input
                                    className={style.capchaInput}
                                    placeholder='请再次输入密码'
                                    type={visibleStatus1 ? `text` : 'password'}
                                    onInput={(e)=>{
                                        this.setState({
                                            password1: e.target.value
                                        })
                                    }}
                                />
                            </View>
                            <View className={style.eyeBox}>
                                <Image
                                    className={visibleStatus1 ? style.eye : style.closeEye}
                                    src={visibleStatus1 ? visible : unvisible}
                                    onClick={()=>{this.setState({
                                        visibleStatus1: !visibleStatus1
                                    })}}
                                />
                            </View>
                        </View>
                        <Button
                            className={style.subimitBtn}
                            onClick={this.handleSubmit.bind(this)}
                        >确定修改</Button>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)