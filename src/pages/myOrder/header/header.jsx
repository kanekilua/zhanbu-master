import { useEffect, useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import style from './header.module.scss'

import goldLeft from '@/assets/goldLeft.png'
function Header (props) {
    return (
        <View className={style.headerWrap}>
            <Image
                className={style.goldLeft}
                src={goldLeft}
                onClick={()=>{
                    Taro.navigateBack()
                }}
            />
            <View className={style.center}>
                <View className={props.activeOrderIndex === 0 ? `${style.left} ${style.active}` : `${style.left}`} onClick={()=>props.handleActiveOrder(0)}>预约订单</View>
                <View className={props.activeOrderIndex === 1 ? `${style.left} ${style.active}` : `${style.right}`} onClick={()=>props.handleActiveOrder(1)}>闪测订单</View>
            </View>
        </View>
    )
}

export default Header