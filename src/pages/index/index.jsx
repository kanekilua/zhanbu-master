import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import { View, Image } from '@tarojs/components'
import Header from '@/components/header/header'
import MessageList from './messageList/messageList'
import app from '@/utils/appData'
import _fetch from '@/utils/fetch'
import imsdkUtils from '@/utils/imsdk'

import style from './index.module.scss'
import { CurrentChatTo_Change } from '@/actions/imsdk'

class FlashMessage extends Component{

    constructor (props) {
        super(props)
        this.state = {
            messageList: []
        }
    }

    componentDidShow () {
        this.handleSessionList()
    }

    componentDidUpdate (prevProps, prevState) {
        if(JSON.stringify(prevProps.sessionList) !== JSON.stringify(this.props.sessionList)) {
            this.handleSessionList()
        }
    }

    handleSessionList () {
        let tempMessageList = []
        const { sessionList } = this.props
        for(let i = 0; i < sessionList.length; ++i) {
            const item = sessionList[i]
            const { id, accountInfo, updateTime, unread, lastMsg: {type, text} } = item
            if(accountInfo) {
                const tempLastMsg = this.handleLastMsg(type, text)
                // let replyFlag
                // let orderNo = ''
                // await _fetch({url: '/masterin/order_status', payload: { accid: accountInfo.account }}).then((res) => {
                //     if(res) {
                //         replyFlag = res.replied
                //         orderNo = res.order_no
                //     }
                // })
                // if( replyFlag !== undefined && orderNo ) {
                    tempMessageList.push({
                        sessionId: id,
                        name : accountInfo.nick,
                        time: imsdkUtils.calcTimeHeader(updateTime),
                        unread: unread > 0 ? true : false,
                        lastMsg: tempLastMsg,
                        // replyFlag,
                        // orderNo,
                        accountInfo: accountInfo
                    })
                // }
            }
        }
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

    handleReplyFlagChange (id) {
        let { messageList } = this.state
        for(let messageItem of messageList )  {
            if(messageItem.sessionId === id) {
                messageItem.replyFlag = true
            }
        }
        this.setState({messageList})
    }

    render () {
        const { messageList } = this.state
        const back = false
        console.log(messageList)
        return (
            <View className={style.wrapper}>
                <Header 
					headerTitle="消息"
					back={back}
				/>
                <MessageList 
                    messageList={messageList}
                    onChatToChange={this.handleCurrentChatToChange.bind(this)}
                    onReplyFlagChange={this.handleReplyFlagChange.bind(this)}></MessageList>
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