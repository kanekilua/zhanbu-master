import Taro from '@tarojs/taro'
import { View, Image, Text} from '@tarojs/components'

import Header from '@/components/header/header'
import rightArrow from '@/assets/rightArrow.png'
import style from './settingItem.module.scss'
class SettingItem extends Taro.Component {
    config = {
        navigationStyle: 'custom'
    }
	constructor (props) {
		super(props)
		
    }
    static DefaultProps = {
        leftText: 'leftText',
        extraImage: '',
        extraText: 'extraText'
    }
    render() {
        let { leftText, extraImage, extraText} = this.props
        return (
            <View className={style.settingItemWrap}>
                <View className={style.leftText}>{leftText}</View>
                <View className={style.rightBox}>
                    <View className={style.extra}>
                        {extraImage && 
                            <Image
                                className={style.extraImage}
                                src={extraImage}
                            />
                        }
                        {extraText && 
                            <Text className={style.extraText}>{extraText}</Text>
                        }
                        <Image
                            className={style.rightArrow}
                            src={rightArrow}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default SettingItem