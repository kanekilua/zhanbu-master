import { useEffect, useState } from '@tarojs/taro'
import { View, Switch, Text } from '@tarojs/components'
import Header from '@/components/header/header'
import MessageList from './messageList/messageList'

import style from './flashMessage.module.scss'

export default function FlashMessage (props) {

    // 这里需要到网上获取他的值
    const [ onlineFlag, setOnlineFlag ] = useState(false)

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
            <Header
                headerTitle="闪测消息">
            </Header>
            <MessageList 
                messageList={messageList}></MessageList>
        </View>
    )
}