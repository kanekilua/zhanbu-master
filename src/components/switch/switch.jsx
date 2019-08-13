import { useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'

import style from './switch.module.scss'

export default function Switch ({ onlineFlag }) {


    useEffect(() => {

    })

    return (
        <View className={style.wrapper}>
            <Text className={style.tip}>{onlineFlag ? '上线' : '忙碌'}</Text>
            <Switch 
                checked={onlineFlag}
                className={style.switch}
                color="#5085D5"
                onClick={() => setOnlineFlag(!onlineFlag)}
                ></Switch>
        </View>
    )
}