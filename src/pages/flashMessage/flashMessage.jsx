import { useEffect, useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import MessageList from './messageList/messageList'
import backIcon from './assets/back.png'
import OnlineSwitch from '@/components/onlineSwitch/onlineSwitch'

import style from './flashMessage.module.scss'

export default function FlashMessage (props) {

    // 这里需要到网上获取他的值
    const [ messageList, setMessageList ] = useState([])

    useEffect(() => {
        setMessageList([
            {
                name : '杨紫',
                time : '昨天 09:56',
                unread: true,
                lastMsg : '最后一次对话的前面的内容后一次对话的内···',
                replyFlag: false
            },
            {
                name : '杨紫',
                time : '昨天 09:56',
                unread: false,
                lastMsg : '最后一次对话的前面的内容后一次对话的内···',
                replyFlag: true
            }
        ])
    })

    return (
        <View className={style.wrapper}>
            <View className={style.header}>
                <View className={style.left} onClick={_ => { Taro.navigateBack()}}>
                    <Image 
                        className={style.img}
                        src={backIcon}/>
                </View>
                <View className={style.middle}>闪测消息</View>
                <View className={style.right}>
                    <OnlineSwitch></OnlineSwitch>
                </View>
            </View>
            <MessageList 
                messageList={messageList}></MessageList>
        </View>
    )

}