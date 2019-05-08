import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import style from './header.module.scss'

import backIcon from './assets/back.png';

class Header extends Component {
    static defaultProps = {
        renderLeft : "",
        headerTitle : "",
        renderRight : "",
        back : true
    }

    handleLeftClick () {
        if(this.props.onLeftClick) {
            this.props.onLeftClick()
        }else {
            Taro.navigateBack()
        }
    }

    render() {
        const { renderLeft, headerTitle, renderRight, back } = this.props

        return (
            <View className={process.env.TARO_ENV === 'h5' ? style.h5Header : style.header}>
                <View className={style.headerIcon} onClick={ this.handleLeftClick.bind(this)} >
                { back 
                    ? <Image src={backIcon} className={style.img} />
                    : renderLeft }
                </View>
                <Text>{ headerTitle }</Text>
                <View className={style.rightIcon}>{ renderRight }</View>
            </View>
        )
    }
}

export default Header