import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
// import { AtToast } from 'taro-ui'

import style from './chat.module.scss'
import Header from '@/components/header/header'
import Loading from '@/components/loading/loading'
import ChatMain from './chatMain/chatMain'
import IMController from '../../controller/im'
// import { utils } from '@/utils/utils'
import imsdkUtils from '@/utils/imsdk'
// import * as iconBase64Map from '@/utils/imageBase64.js'

import * as actions from '@/actions/imsdk'
import { LOCAL_MSG_LIMIT_WEAPP, TOAST_DURATION } from '@/constants/chat'

import app from '@/utils/appData'

class Chat extends Taro.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultUserLogo: app.globalData.CHAT_CONFIG.DEFAULT_AVATAR,
            videoContext: null, // 视频操纵对象
            isVideoFullScreen: false, // 视频全屏控制标准
            videoSrc: '', // 视频源
            recorderManager: null, // 微信录音管理对象
            recordClicked: false, // 判断手指是否触摸录音按钮
            // iconBase64Map: {}, //发送栏base64图标集合
            isLongPress: false, // 录音按钮是否正在长按
            chatWrapperMaxHeight: 0,// 聊天界面最大高度
            chatTo: '', //聊天对象account
            chatType: 'p2p', //聊天类型 advanced 高级群聊 normal 讨论组群聊 p2p 点对点聊天
            // loginAccountLogo: '',  // 登录账户对象头像
            emojiFlag: false,//emoji键盘标志位
            moreFlag: false, // 更多功能标志
            tipFlag: false, // tip消息标志
            tipInputValue: '', // tip消息文本框内容
            sendType: 0, //发送消息类型，0 文本 1 语音
            messageArr: [], //[{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
            // toastOption: {
            //     show: false,
            //     text: '',
            //     icon: ''
            // }
            
            loadingOpen: false
        }
    }

    componentDidMount () {
        Taro.eventCenter.on('onSendTextMsg', this.handleMsgSend.bind(this))
        Taro.eventCenter.on('onSendFile', this.handleFileSend.bind(this))
        // Taro.eventCenter.on('onShowToast', this.handleToastShow.bind(this))
        // 在挂载chat页面时，要先
        if(app.globalData.nim === null) {
            let userInfo = app.getUserInfo()
            if(userInfo) {
                // 连接网易云信
                const {accid, yunxin_token, avatar} = userInfo
                if(accid !== undefined && yunxin_token !== undefined) {
                    new IMController({
                        account : accid,
                        token : yunxin_token,
                        avatar: avatar
                    })
                }
            }
        }
        this.init()
    }

    componentDidUpdate (prevProps, prevState) {
        if(prevProps !== this.props) {
            this.setState({
                messageArr: this.props.rawMessageList
            })
            // const rawMessageList = this.props.rawMessageList
            // if(rawMessageList.length > 0) {
            //     this.reCalcAllMessageTime(rawMessageList)
            // }
        }
    }

    componentWillUnmount () {
        Taro.eventCenter.off('onSendTextMsg')
        Taro.eventCenter.off('onSendFile')
        // Taro.eventCenter.off('onShowToast')
        this.props.CurrentChatTo_Change({})
    }

    // 初始化
    init () {
        this.setState({loadingOpen: true})
        let chatTo
        if(this.$router.params.chatTo) {
            chatTo = JSON.parse(decodeURI(this.$router.params.chatTo))
            this.props.CurrentChatTo_Change(chatTo)
        }else {
            chatTo = this.props.currentChatTo
        }
        if(!chatTo) {
            Taro.navigateBack()
        }

        // 获取历史记录
        setTimeout(() => {
            app.globalData.nim.getHistoryMsgs({
                scene: 'p2p',
                to: chatTo.accid,
                done: (error, obj) => {
                    this.setState({loadingOpen: false})
                    if(obj.msgs.length > 0) {
                        this.props.RawMessageList_Replace_History({
                            msgs: obj.msgs.reverse(),
                            sessionId: 'p2p-' + chatTo.accid
                        })
                    }
                }
            })
        }, 1000)
        
        // 从state中获取需要的数据
        // const { defaultUserLogo } = this.state
        // 从props中获取需要的数据
        // const { userInfo } = this.props
        // 初始化聊天对象
        // let loginAccountLogo = userInfo.avatar || defaultUserLogo
        let chatWrapperMaxHeight = Taro.getSystemInfoSync().windowHeight - 52 - 35

        this.setState({
            chatTo,
            // loginAccountLogo,
            // iconBase64Map: iconBase64Map,
            chatWrapperMaxHeight,
        })
    }

    // 重新计算时间头
    // reCalcAllMessageTime(messageArr) {
    //     let tempArr = messageArr
    //     if (tempArr.length == 0) return
    //     // 计算时差
    //     tempArr.map((msg, index) => {
    //         if (index === 0) {
    //             msg['displayTimeHeader'] = imsdkUtils.calcTimeHeader(msg.time)
    //         } else {
    //             let delta = (msg.time - tempArr[index - 1].time) / (120 * 1000)
    //             if (delta > 1) { // 距离上一条，超过两分钟重新计算头部
    //                 msg['displayTimeHeader'] = imsdkUtils.calcTimeHeader(msg.time)
    //             }
    //         }
    //     })
    //     this.setState({
    //         messageArr : tempArr
    //     })
    // }

    // 原始消息转化为适用于渲染的消息列表
    static convertRawMessageListToRenderMessageArr(rawMsgList) {
        let messageArr = []
        for(let time in rawMsgList) {
            let rawMsg = rawMsgList[time]
            let msgType = ''
            if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 1) {
                // 猜拳
                continue
            } else if (rawMsg.type === 'custom' && JSON.parse(rawMsg['content'])['type'] === 3) {
                // 贴图
                continue
            } else {
                msgType = rawMsg.type
            }
            let displayTimeHeader = Chat.judgeOverTwoMinute(rawMsg.time, messageArr)
            let sendOrReceive = rawMsg.flow === 'in' ? 'receive' : 'send'
            let specifiedObject = {}
            switch(msgType) {
                case 'text': {
                    specifiedObject = {
                        nodes: imsdkUtils.generateRichTextNode(rawMsg.text)
                    }
                    break
                }
                case 'image': {
                    specifiedObject = {
                        nodes: imsdkUtils.generateImageNode(rawMsg.file)
                    }
                    break 
                }
                case 'audio': {
                    specifiedObject = {
                    audio: rawMsg.file
                    }
                    break
                }
                case 'video': {
                    specifiedObject = {
                    video: rawMsg.file
                    }
                    break
                }
                // 定位
                case 'geo':
                case '猜拳': 
                case '贴图表情': 
                case 'tip': 
                case '白板消息':
                case '阅后即焚':
                case 'file':
                case 'robot': 
                case 'custom':
                case 'notification':
            }
            messageArr.push(Object.assign({}, {
                from: rawMsg.from,
                type: msgType,
                text: rawMsg.text || '',
                time: rawMsg.time,
                sendOrReceive,
                displayTimeHeader
            }, specifiedObject))
        }
        return messageArr
    }

    //距离上一条消息是否超过两分钟
    static judgeOverTwoMinute(time, messageArr) {
        let displayTimeHeader = ''
        let lastMessage = messageArr[messageArr.length - 1]
        if (lastMessage) {//拥有上一条消息
            // console.log('lastMessage', lastMessage)
            // console.log('time', time)
            // console.log('lastMessageTime', lastMessage.time)
            let delta = time - lastMessage.time
            if (delta > 2 * 60 * 1000) {//两分钟以上
                displayTimeHeader = imsdkUtils.calcTimeHeader(time)
            }
        } else {//没有上一条消息
            displayTimeHeader = imsdkUtils.calcTimeHeader(time)
        }
        return displayTimeHeader
    }

    // 发送信息
    handleMsgSend (msg) {
        const { chatType, chatTo } = this.state
        app.globalData.nim.sendText({
            scene: chatType,
            to: chatTo.accid,
            text: msg,
            done: (err, msg) => {
                // 存储数据到store
                // self.saveChatMessageListToStore(msg)
                this.props.RawMessageList_Add_Msg({
                    msg : msg
                })
            }
        })
    }

    // 发送文件（图片，语音）
    handleFileSend ({ type, blob }) {
        const { chatType, chatTo } = this.state
        const { nim } = app.globalData
        if(Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {

        }else {
            nim.sendFile({
                scene: chatType,
                to: chatTo.accid,
                type, blob,
                // uploadprogress: (data) => {
                //     console.log('文件上传进度')
                // },
                // uploaderror: () => {
                //     console.log('上传失败')
                // },
                // uploaddone: () => {
                //     console.log('文件上传成功')
                // },
                beforesend: (msg) => {
                    // 存到store中
                    this.props.RawMessageList_Add_Msg({
                        msg : msg
                    })
                }
            })
        }
    }

    // handleToastShow (option) {
    //     this.setState({
    //         toastOption : option
    //     })
    // }

    // handleToastClose () {
    //     this.setState({
    //         toastOption : {
    //             show: false,
    //             text: '',
    //             icon: ''
    //         }
    //     })
    // }

    handleBackClick (e) {
        if( this.$router.params.from === 'question' ) {
            e.stopPropagation()
            app.navigateTo({
                url: '/pages/mine/mine'
            })
            return
        }else {
            if(Taro.getCurrentPages().length == 1){
                Taro.redirectTo({
                    url:'/pages/index/index'
                })
                return
            }else {
                Taro.navigateBack()
            }
        }
    }

    refScrollView = (node) => {
        this.scrollView = node
    }

    render() {
        const { messageArr, chatTo } = this.state
        return (
            <View 
                className={style.chatWrapper}>
                <Header headerTitle={chatTo.nickname}></Header>
                <View className={style.backView} onClick={this.handleBackClick.bind(this)}></View>
                <ChatMain 
                    msgList={messageArr}></ChatMain>
                <Loading isOpened={this.state.loadingOpen} text='loading...'/>
                {/* <AtToast 
                    isOpened={toastOption.show}
                    text={toastOption.text}
                    icon={toastOption.icon}
                    duration={TOAST_DURATION}
                    onClose={this.handleToastClose.bind(this)}
                    ></AtToast> */}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { currentChatTo, userInfo, rawMessageList, syncDone } = state.imsdk
    let messageArr = currentChatTo ? Chat.convertRawMessageListToRenderMessageArr(rawMessageList[`p2p-${currentChatTo.accid}`]) : []
    if( Taro.getEnv() === Taro.ENV_TYPE.WEAPP && messageArr.length > LOCAL_MSG_LIMIT_WEAPP ) {
        messageArr.splice(0,messageArr.length - LOCAL_MSG_LIMIT_WEAPP)
    }
    return {
        userInfo : userInfo,
        rawMessageList : messageArr,
        syncDone: syncDone,
        currentChatTo: currentChatTo
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)