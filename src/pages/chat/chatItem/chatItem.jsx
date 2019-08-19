import Taro from '@tarojs/taro'
import { View, Image, Audio } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import PreviewImages from '@/components/previewImages/previewImages'
// import * as iconBase64Map from '@/utils/imageBase64.js'
import { MessageCard } from '@/components/components'
import app from '@/utils/appData'

import style from './chatItem.module.scss'

import { DEFAULT_AVATAR } from '@/constants/chat'
import * as actions from '@/actions/imsdk'

class ChatItem extends Taro.Component {
    constructor (props) {
        super(props)
        this.state = {
            // TODO: msg, isFullImgShow
            msg : {},
            imgs: [],
            imgPrevIndex: 0,
            imgPrevShow: false,
            voicePlayFlag : false,
            audioContext: null
        }
    }

    // TODO : 监听rawMsg

    componentWillMount () {
        // TODO: computedItem
        this._computedItem()
    }

    componentDidMount () {
        // TODO: 处理图片
        // TODO: 处理表情
        // TODO: 处理视屏
        // TODO: 如果消息属于媒体类型所要做的操作
    }

    componentDidUpdate(prevProps, prevState) {
        const rawMsg = this.props.rawMsg
        const rawMsgOld = prevProps.rawMsg
        if(rawMsg !== rawMsgOld) {
            this._computedItem()
            // let newCustom = rawMsg && rawMsg.localCustom
            // if (!newCustom || !rawMsg || rawMsg.type !== 'audio') {
            //     return
            // }
            // let oldCustom = rawMsgOld && rawMsgOld.localCustom
            // if (newCustom !== oldCustom) {
            //     this.computedItem()
            // }
        }
    }

    handleImgClick (imgSrc) {
        const imgs = [ imgSrc ]
        const imgPrevShow = true
        this.setState({
            imgs, imgPrevShow
        })
    }

    handleImgPrevClose () {
        this.setState({
            imgs: [],
            imgPrevShow: false
        })
    }

    _computedItem () {
        const { rawMsg, imsdk } = this.props
        const { userInfo } = imsdk
        let item = Object.assign({}, rawMsg)
        // 标记用户，区分聊天室、普通消息
        if (item.sendOrReceive === 'send') {
            item.avatar = userInfo.avatar !== '' ? userInfo.avatar : DEFAULT_AVATAR
        } else {
            const { avatar } = imsdk.currentChatTo
            item.avatar = avatar === '' ? DEFAULT_AVATAR : avatar
        }
        if (item.type === 'timeTag') {
          // 标记发送的时间
          item.showText = item.text
        } else if (item.type === 'text') {
          // 文本消息
        //   item.showText = imsdkUtils.escape(item.text)
          // emoji表情消息
          if (/\[[^\]]+\]/.test(item.showText)) {
            // let emojiItems = item.showText.match(/\[[^\]]+\]/g)
            // emojiItems.forEach(text => {
            //   let emojiCnt = emojiObj.emojiList.emoji
            //   if (emojiCnt[text]) {
            //     item.showText = item.showText.replace(text, `<img class="emoji-small" src="${emojiCnt[text].img}">`)
            //   }
            // })
          }
        } else if (item.type === 'custom') {
            // 自定义消息...
        } else if (item.type === 'image') {
            // 原始图片全屏显示
            item.originLink = item.nodes[0].attrs.src
        } else if (item.type === 'video') {
            // 视频...
        } else if (item.type === 'audio') {
            // 语音...
            //   item.width = (5.3 + Math.round(item.file.dur / 1000) * 0.03).toFixed(2) + 'rem'
            //   item.audioSrc = item.file.mp3Url
            //   item.showText = '<i>' + Math.round(item.file.dur / 1000) + '"</i> 点击播放'
            //   if (!this.isHistory && nim.useDb) {
            //     item.unreadAudio = !item.localCustom
            //   }
        } else if (item.type === 'file') {
            item.fileLink = item.file.url
            item.showText = item.file.name
        } else if (item.type === 'notification') {
            // 系统通知
        //   if (item.scene === 'team') {
        //     item.showText = util.generateTeamSysmMsg(item)
        //   } else {
        //     //对于系统通知，更新下用户信息的状态
        //     item.showText = util.generateChatroomSysMsg(item)
        //   }
        } else if (item.type === 'tip') {
            item.showText = item.tip
        } else if (item.type === 'robot') {
            // 机器人
        } else {
          item.showText = '未知消息类型,请到手机或电脑客户端查看'
        }
        this.setState({
            msg : item
        })
    }

    // TODO: computedItem 处理一下消息的数据（当前的聊天类型，消息类型做判断，设置showText）

    // TODO: showFullImg 展示大图

    // TODO: autoPlayNextUnreadAudio 自动播放下条语音

    // TODO: playAudio 播放语音
    playAudio (url) {
        const { voicePlayFlag } = this.state
        if(voicePlayFlag) {

        }
        const audioContext = Taro.createInnerAudioContext()
        audioContext.src = url
        audioContext.play()
        // audioContext.onPlay(() => {
        // })
        // audioContext.onEnded(() => {
        //     wx.hideToast()
        // })
        // audioContext.onError((res) => {
        //     showToast('text', res.errCode)
        // })
    }

    // TODO: canclePlayAudio 取消播放语音

    // TODO: canclePlayAudio 停止播放语音
    render() {
        // TODO: 音频对象audio
        // TODO: props的参数
        // TODO: type, rawMsg, userInfos, myInfo, isHistory
        const { msg, imgs, imgPrevIndex, imgPrevShow } = this.state
        let text 
        if(app.isJson(msg.text)) {
            const { name, sex_data, birthday, birth_address, random_num } = JSON.parse(msg.text)
            text = {
                name, sex: sex_data, birthday, address: birth_address, num: random_num
            }
        }else {
            text = msg.text
        }
        return (
            <View className={style.chatItemWrapper}>
                {msg.displayTimeHeader !== '' && <View className={style.timeHeader}>{msg.displayTimeHeader}</View>}
                <View className={" " 
                    + (msg.sendOrReceive === 'send' ? style.itemMe : '') + " " 
                    + (msg.sendOrReceive === 'receive' ? style.itemYou : '') + " " 
                    + (msg.type === 'timeTag' ? style.itemTime : '') + " " 
                    + (msg.type === 'tip' ? style.itemTip : '')}>
                {msg.type === 'timeTag'
                    ?  text
                    : msg.type === 'tip'    
                    ?  <View>{text}</View>
                    : msg.type === 'notification' && msg.scene==='team'
                    ?  <View>{text}</View>
                    : msg.sendOrReceive === 'send' || msg.sendOrReceive === 'receive'
                    ? <View>
                            <View className={style.msgItem}>
                                <Image 
                                    className={style.avatar}
                                    src={msg.avatar}/>
                                <View className={style.triangleBorder}></View>
                                {msg.type === 'text' 
                                    ? typeof(text) != 'string'
                                    ? <View className={style.content}><MessageCard Info={text}/></View>
                                    : <View className={style.content}>{text}</View>
                                    : msg.type === 'image'
                                    ? <Image 
                                        onClick={this.handleImgClick.bind(this, msg.originLink)}
                                        src={msg.originLink}
                                        className={style.img}
                                        mode="widthFix"/>
                                    : msg.type === 'audio'
                                    ? 
                                    <View
                                        onClick={this.playAudio.bind(this, msg.audio.mp3Url)}
                                        className={style.audio}>
                                        {/* <image src={iconBase64Map.iconVoiceWhite} class='image'></image> */}
                                        <text class='text'>{msg.audio.dur / 1000 << 1 >> 1}''</text>
                                    </View>
                                    : <View></View>}
                            </View>
                        </View>
                    :  <View></View>}
                </View>
                <PreviewImages 
                    images={imgs}
                    index={imgPrevIndex}
                    isOpened={imgPrevShow}
                    onCloseImage={this.handleImgPrevClose.bind(this)}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    imsdk : state.imsdk
})

export default connect( mapStateToProps, actions )(ChatItem)