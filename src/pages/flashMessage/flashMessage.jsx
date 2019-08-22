import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import { View, Image } from '@tarojs/components'
import MessageList from './messageList/messageList'
import backIcon from './assets/back.png'
import OnlineSwitch from '@/components/onlineSwitch/onlineSwitch'
import app from '@/utils/appData'
import _fetch from '@/utils/fetch'
import imsdkUtils from '@/utils/imsdk'

import style from './flashMessage.module.scss'
import { CurrentChatTo_Change } from '@/actions/imsdk'

class FlashMessage extends Component{

    constructor (props) {
        super(props)
        this.state = {
            messageList: []
        }
    }

    async componentDidShow () {
        let tempMessageList = await Promise.all(this.props.sessionList.map(async (item, index) => {
            const { id, accountInfo, updateTime, unread, lastMsg: {type, text} } = item
            const { account, nick } = accountInfo
            const tempLastMsg = this.handleLastMsg(type, text)
            let replyFlag
            let orderNo = ''
            await _fetch({url: '/masterin/order_status', payload: { accid: account }}).then((res) => {
                replyFlag = res.replied
                orderNo = res.order_no
            })
            return {
                sessionId: id,
                name : nick,
                time: imsdkUtils.calcTimeHeader(updateTime),
                unread: unread > 0 ? true : false,
                lastMsg: tempLastMsg,
                replyFlag,
                orderNo,
                accountInfo: accountInfo
            }
        }))

        this.setState({
            messageList: tempMessageList
        })
    }

    handleLastMsg (type, text) {
        let result = ""
        if(type === 'text') {
            // 判断是否是json
            if(app.isJson(text)) {
                result = JSON.parse(text).content || '[信息]'
            }else {
                result = text
            }
        }else if(type === 'audio') {
            result = '[录音]'
        }else if(type === 'file') {
            result = '[文件]'
        }else if(type === 'image') {
            result = '[图片]'
        }
        return result
    }

    handleCurrentChatToChange (chatTo) {
        this.props.CurrentChatTo_Change(chatTo)
    }

    render () {
        const { messageList } = this.state
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
                    messageList={messageList}
                    onChatToChange={this.handleCurrentChatToChange.bind(this)}></MessageList>
            </View>
        )
    }

}

let mapStateToProps = (state) => {
    return {
        sessionList : state.imsdk.sessionList,
        unreadInfo: state.imsdk.unreadInfo
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ CurrentChatTo_Change }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage)