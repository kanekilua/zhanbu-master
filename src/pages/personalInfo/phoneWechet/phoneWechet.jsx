import Taro from '@tarojs/taro'
import { View, Image, Text} from '@tarojs/components'

import phone from './assets/phone.png'
import wechat from './assets/wechat.png'
import style from './phoneWechet.module.scss'
class PhoneWechet extends Taro.Component {
    static defaultProps = {
        
    }
    constructor (props) {
        super(props)
        this.state = {
            
        }
    } 

    call (mobile) {
        Taro.makePhoneCall({
            phoneNumber:String(mobile)
        })
    }

    openWeChet () {

    }



    render() {
        let { mobile, wx_number } = this.props

        return (
            <View className={style.wrapper}>
                
                <View className={style.communicationBox}>
                    <View className={style.communicationLeft} onClick={this.call.bind(this,mobile)}>
                        <Image
                            className={style.leftIco}
                            src={phone}
                        />
                        <View className={style.communicationTxt}>
                            <View className={style.top}>电话沟通</View>
                            <View className={style.bottom}>(90分钟)</View>
                        </View>
                    </View>
                    <View className={style.communicationRight} onClick={this.openWeChet.bind(this,wx_number)}>
                        <Image
                            className={style.rightIco}
                            src={wechat}
                        />
                        <View className={style.communicationTxt}>
                            <View className={style.top}>微信对话</View>
                            <View className={style.bottom}>(90分钟)</View>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

export default PhoneWechet