import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import Header from '@/components/header/header'
import SettingItem from '@/components/settingItem/settingItem'
import avatar from '@/assets/avatar.png'
import style from './accountSecurity.module.scss'

class AccountSecurity extends Taro.Component {
    config = {
        navigationStyle: 'custom'
    }
	constructor (props) {
		super(props)
		this.state = { 
            userInfo:{}
        }
    }

    componentDidMount () {
        const userInfo = Taro.getStorageSync('userInfo')
        this.setState({
            userInfo
        })
    }
    
    render() {
        const { mobile } = this.state.userInfo
        return (
            <View className={style.accountSecurityWrap}>
                <Header
                    headerTitle='账户安全'
                />
                <View className={style.settingItem}>
                    <SettingItem
                        leftText='手机号'
                        extraText={mobile}
                    />
                </View>
                <View className={style.settingItem}
                    onClick={(e)=>{
                        Taro.showToast({
                            title:'请联系客服',
                            icon:'none'
                        })
                        // e.preventDefault()
                        // Taro.navigateTo({
                        //     url: '/pages/forgetPassword/forgetPassword'
                        // })
                    }}
                >
                    <SettingItem
                        leftText='修改密码'
                        extraText=''   
                    />
                </View>
            </View>
        )
    }
}

export default AccountSecurity