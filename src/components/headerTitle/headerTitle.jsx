import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import style from './headerTitle.module.scss'

class HeaderTitle extends Component {
    static defaultProps = {
        title: ''
    }
    render() {
        const { title } = this.props

        return (
            <View className={style.headerTitleWrap}>
                <View className={style.headerTitle}>
                    {title}
                </View>
            </View>
        )
    }
}

export default HeaderTitle