import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import MenuItem from '@/components/menuItem/menuItem'
import style from './menuList.module.scss'

import orderIco from '../../assets/orderIco.png'
import userFile from '../../assets/userFile.png'
import accountSecurity from '../../assets/accountSecurity.png'
import clean from '../../assets/clean.png'
import update from '../../assets/update.png'

class MenuList extends Taro.Component {
    render() {
        return (
            <View className={style.wrapper}>
                <View className={style.menuItem}
                    onClick={()=>{
                        Taro.navigateTo({
                            url: '/pages/myOrder/myOrder'
                        })
                    }}
                >
                    <MenuItem 
                        icon={orderIco}
                        title='订单管理'
                        icon-style={style[`icon${1}`]}
                        iconStyle={style[`icon${1}`]}
                    />
                </View>
                <View className={style.menuItem}
                    onClick={()=>{
                        Taro.navigateTo({
                            url: '/pages/fileSetting/fileSetting'
                        })
                    }}
                >
                    <MenuItem 
                        icon={userFile}
                        title='个人资料'
                        icon-style={style[`icon${2}`]}
                        iconStyle={style[`icon${2}`]}
                    />
                </View>
                <View className={style.menuItem}
                    onClick={()=>{
                        Taro.navigateTo({
                            url: '/pages/accountSecurity/accountSecurity'
                        })
                    }}
                >
                    <MenuItem 
                        icon={accountSecurity}
                        title='账户安全'
                        icon-style={style[`icon${3}`]}
                        iconStyle={style[`icon${3}`]}
                    />
                </View>
                <View className={style.menuItem}>
                    <MenuItem 
                        icon={clean}
                        title='清理缓存'
                        icon-style={style[`icon${4}`]}
                        iconStyle={style[`icon${4}`]}
                        rightText='51MB'
                    />
                </View>
                <View className={style.menuItem}>
                    <MenuItem 
                        icon={update}
                        title='检测更新'
                        icon-style={style[`icon${5}`]}
                        iconStyle={style[`icon${5}`]}
                    />
                </View>
            </View>
        )
    }
}

export default MenuList