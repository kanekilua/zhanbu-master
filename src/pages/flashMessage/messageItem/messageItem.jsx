import { useEffect, useState } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import app from '@/utils/appData'
import _fetch from '@/utils/fetch'

import style from './messageItem.module.scss'
import { OperationPopupWindow } from '@/components/components'

export default function MessageItem ( {messageItem, onChatToChange, onReplyFlagChange} ) {

    const [ modelShow, setModelShow ] = useState(false)

    const [ message, setMessage ] = useState(messageItem)

    useEffect(() => {
        if(JSON.stringify(messageItem) !== JSON.stringify(message)) {
            setMessage(messageItem)
        }
    })

    const modelInfo = {
        title: '是否完成该订单',
        leftBtnText: '取消',
        rightBtnText: '确定'
    }
    
    function handleReply (e) {
        e.stopPropagation()
        if(!message.replyFlag) {
            setModelShow(true)
        }
    }

    function comfirmReplied () {
        _fetch({url: '/masterin/replied', payload: {order_no: message.orderNo }}).then(res => {
            setModelShow(false)
            onReplyFlagChange(message.sessionId)
            // const tempMessage = {
            //     ...message,
            //     replyFlag: true
            // }
            // setMessage(tempMessage)
        })
    }

    return (
        <View 
            className={style.wrapper}
            onClick={() => {
                onChatToChange(message.accountInfo)
                app.globalData.nim.resetSessionUnread(message.sessionId)
                Taro.navigateTo({url: '/pages/chat/chat'})
            }}>
            <View className={style.head}>
                <View className={style.name}>姓名：{message.name}</View>
                <View className={style.time}>{message.time}</View>
            </View>
            <View className={style.content}>
                { message.unread
                ? <Text className={style.unread}>(未读)</Text>
                : <Text className={style.read}>(已读)</Text>}
                {message.lastMsg}
            </View>
            <View className={style.foot}>
                <Button 
                    className={message.replyFlag ? style.already : style.comfirm}
                    onClick={handleReply}>{message.replyFlag? '已回复' : '确定回复'}</Button>
            </View>
            <OperationPopupWindow 
                isOpened= {modelShow}
                Info = {modelInfo}
                leftBtnEvent = {() => {setModelShow(false)}}
                rightBtnEvent = {comfirmReplied}/>
        </View>
    )
}