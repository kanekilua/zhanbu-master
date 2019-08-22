import { useEffect, useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import MessageItem from '../messageItem/messageItem'

import style from './messageList.module.scss'
import noMessage from '../assets/noMessage.png'

export default function MessageList ({ messageList, onChatToChange }) {

    useEffect(() => {

    })

    return (
        <View className={style.wrapper}>
            {
                messageList.length > 0 ? 
                messageList.map((messageItem, index) => (
                    <View 
                        className={style.messageItemWrapper}
                        key={'messageItem' + index}>
                        <MessageItem 
                            messageItem={messageItem}
                            onChatToChange={onChatToChange}></MessageItem>
                    </View>
                ))
                : <View className={style.noOrderBox}>
                    <Image className={style.noOrder} src={noMessage}/>
                </View>
            }
        </View>
    )
}