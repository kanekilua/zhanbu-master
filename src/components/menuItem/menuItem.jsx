// mine 里面的menuItem
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import style from './menuItem.module.scss'

import rightArrow from '@/assets/rightArrow.png'

class MenuItem extends Taro.Component {
    static externalClasses = ['icon-style']
    static options = {
        addGlobalClass: true
    }
    static defaultProps = {
        rightText: '',
        title: '',
        icon: '',
        iconStyle: ''
    }
    render() {
        let { rightText, title, icon, iconStyle } = this.props
        return (
            <View className={style.wrapper}>
                <View className={style.menuItem}>
                    <View className={style.menuItemLeft}>
                        <Image 
                            src={icon}
                            className={process.env.TARO_ENV === "weapp" ? "icon-style" : iconStyle}
                        />
                        <Text className={style.title}>{title}</Text>
                    </View>
                    { rightText
                        ?<Text className={style.rightText}>{rightText}</Text>
                        :<Image 
                            src={rightArrow}
                            className={style.rightArrow}
                        />
                    }
                    
                </View>
            </View>
        )
    }
}

export default MenuItem