import { useEffect, useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MessageItem from '../messageItem/messageItem'

import style from './messageList.module.scss'

export default function MessageList ({ messageList }) {

    useEffect(() => {

    })

    return (
        <View className={style.wrapper}>
            {messageList.map((messageItem, index) => (
                <View 
                    className={style.messageItemWrapper}
                    key={'messageItem' + index}>
                    <MessageItem 
                        messageItem={messageItem}></MessageItem>
                </View>
            ))}
        </View>
    )
}