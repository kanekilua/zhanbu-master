import { useEffect, useState } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import app from '@/utils/appData'
import _fetch from '@/utils/fetch'

import style from './messageItem.module.scss'

export default function MessageItem ({ messageItem, onChatToChange }) {

    useEffect(() => {

    })

    function handleReply (e) {
        e.stopPropagation()
        if(!messageItem.replyFlag) {
            _fetch({url: '/masterin/replied', payload: {order_no: messageItem.orderNo }})
        }
    }

    return (

        <View 
            className={style.wrapper}
            onClick={() => {
                onChatToChange(messageItem.accountInfo)
                console.log(messageItem.sessionId)
                app.globalData.nim.resetSessionUnread(messageItem.sessionId)
                Taro.navigateTo({url: '/pages/chat/chat'})
            }}>
            <View className={style.head}>
                <View className={style.name}>姓名：{messageItem.name}</View>
                <View className={style.time}>{messageItem.time}</View>
            </View>
            <View className={style.content}>
                { messageItem.unread
                ? <Text className={style.unread}>(未读)</Text>
                : <Text className={style.read}>(已读)</Text>}
                {messageItem.lastMsg}
            </View>
            <View className={style.foot}>
                <Button 
                    className={messageItem.replyFlag ? style.already : style.comfirm}
                    onClick={handleReply}>{messageItem.replyFlag? '已回复' : '确定回复'}</Button>
            </View>
        </View>
    )
}