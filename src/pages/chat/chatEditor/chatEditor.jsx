import Taro from '@tarojs/taro'
import { View, Image, Input, Button } from '@tarojs/components'
import app from '@/utils/appData'
import _fetch from '@/utils/fetch'

import { _executeRecord, _stopRecord } from './func'
import voiceIcon from './assets/voice.png'
import textIcon from './assets/text.png'
import imageIcon from './assets/image.png'

import style from './chatEditor.module.scss'
import './chatEditor.scss'

class ChatEditor extends Taro.Component {
    constructor (props) {
        super(props)
        this.state = {
            msgType : 0, // 0-文字 1-语音
            msgToSent : '',
            isLongPress : false,
            pressStart: 0, // 按钮开始时间
            recordTimer: null, // 录音的时间调度
            sendFlag: false
        }
    }

    _sendTextMsg () {
        // TODO: 判断ID是否有效
        // TODO: 校验发送信息格式
        let msgToSent = this.state.msgToSent.trim()
        // TODO: 判断是机器人
        Taro.eventCenter.trigger('onSendTextMsg',msgToSent)
        // 清空输入框
        this.setState({
            msgToSent : ''
        })
    }

    _sendFileMsg (file) {
        Taro.eventCenter.trigger('onSendFile',file)
    }

    handleMsgTypeClick () {
        this.setState((preState) => ({
            msgType : preState.msgType ? 0 : 1
        }))
    }

    handleInput (e) {
        this.setState({
            msgToSent : e.target.value   
        })
    }

    // handleInputKeyPress (e) {
    //     if(e.keyCode === 13) {
    //         console.log('2')
    //         // TODO：发送消息
    //         this._sendTextMsg()
    //     }
    // }

    // handleInputConfirm () {
    //     console.log('3')
    //     this._sendTextMsg()
    // }

    // 长按开始
    handleInputTouchStart (e) {
        const pressStart = new Date().getTime()
        const recordTimer = setTimeout(() => {
            if(app.getEnv() === 0) {
                const wxRecordPermission = Taro.getStorageSync('wxRecordPermission')
                window.wx.startRecord({
                    success: () => {
                        if( !wxRecordPermission && wxRecordPermission !== 'true' ) {
                            window.wx.stopRecord()
                            Taro.setStorageSync('wxRecordPermission', 'true')
                        }
                    },
                    cancel: () => {
                        Taro.showToast({
                            title: '用户拒绝授权录音'
                        })
                    }
                })
            }
        }, 450)
        this.setState({ pressStart, recordTimer })
    }

    // 长按结束
    handleInputTouchEnd (e) {
        const { pressStart, recordTimer } = this.state
        const pressEnd = new Date().getTime()
        if( pressEnd - pressStart < 450 ) {
            clearTimeout(recordTimer)

            this.setState({
                pressStart: 0,
                recordTimer: null
            })
            return
        }
        if(app.getEnv() === 0) {
            window.wx.stopRecord({
                success: function (res) {
                    let localId = res.localId
                    wx.uploadVoice({
                        localId,
                        success: function (res) {
                            let serverId = res.serverId
                            _fetch({
                                url: '/app/voice', 
                                payload: { 
                                    media_id: serverId
                                }
                            }).then((res) => {
                                app.BlobUrlToBlob('https://alicdnoss.szmonster.com/uploads/voice/llll.mp3').then((res) => {
                                    this._sendFileMsg({
                                        type: 'audio',
                                        blob: res
                                    })
                                })
                            })
                        }
                    })
                }
            })
        }
        // this.setState({
        //     recordClicked : false
        // })
        // TODO:根据录音的状态设置isLongPress
        // if(this.state.isLongPress === true) {
        //     this.setState({
        //         isLongPress: false
        //     })
        //     _stopRecord()
        // }
    }

    // handleExtarMenuShow () {
    //     const tempShow = this.props.showEditorExtra
    //     this.props.onEditorExtarChange(!tempShow)
    // }

    handleChooseImage () {
        // TODO:从相册选取照片
        // this._getImg()
        Taro.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType : ['album'],
            success: (res) => {
                app.BlobUrlToBlob(res.tempFilePaths[0])
                .then((res) => {
                    this._sendFileMsg({
                        type: 'image',
                        blob: res
                    })
                })
            }
        })
    }

    // handleMenuClick (index) {
    //     switch(index) {
    //         case 0 : 
    //             // TODO:从相册选取照片
    //             // this._getImg()
    //             Taro.chooseImage({
    //                 count: 1,
    //                 sizeType: ['compressed'],
    //                 sourceType : ['album'],
    //                 success: (res) => {
    //                     app.BlobUrlToBlob(res.tempFilePaths[0])
    //                     .then((res) => {
    //                         this._sendFileMsg({
    //                             type: 'image',
    //                             blob: res
    //                         })
    //                     })
    //                 }
    //             })
    //             break
    //         case 1: 
    //             // TODO:拍照取片
    //             console.log(index)
    //             break
    //         case 2:
    //             // TODO:语音通话
    //             console.log(index)
    //             break
    //         case 3:
    //             // TODO:视频通话
    //             console.log(index)
    //             break
    //         default:
    //             break
    //     }
    // }

    handleInputOnBlur () {
        const env = app.getEnv()
        if(env === 0 || env === 2) {
            window.scrollTo(0, 0)
        }
    }

    handleSendClick () {
        // 发送消息
        this._sendTextMsg()
    }

    render() {
        const { msgType, msgToSent } = this.state
        const { showEditorExtra } = this.props
        const menus = [
            // {
            //     icon: photoIcon,
            //     text: '照片'
            // }, {
            //     icon: cameraIcon,
            //     text: '拍摄'
            // }
            // , {
            //     icon: phoneIcon,
            //     text: '语音通话'
            // }, {
            //     icon: vedioIcon,
            //     text: '视频通话'
            // }
        ]
        return (
            <View 
                className={style.chatEditorWrapper}>
                <View className={`${style.editorBarWrapper} editorBarWrapper`}>
                    {/* <Image 
                        src={msgType ? textIcon : voiceIcon}
                        className={style.icon}
                        onClick={this.handleMsgTypeClick.bind(this)}/> */}
                    {
                        msgType
                        ? <Input 
                            placeholder="按住说话"
                            className="editorInput1"
                            disabled={true}
                            catchtouchstart={this.handleInputTouchStart.bind(this)}
                            catchtouchend={this.handleInputTouchEnd.bind(this)}
                            onTouchStart={this.handleInputTouchStart.bind(this)}
                            onTouchEnd={this.handleInputTouchEnd.bind(this)}/>
                        :  <Input 
                            onInput={this.handleInput.bind(this)}
                            className="editorInput"
                            value={msgToSent}
                            ref="test"
                            // onKeyPress={this.handleInputKeyPress.bind(this)}
                            // onConfirm={this.handleInputConfirm.bind(this)}
                            onBlur={this.handleInputOnBlur.bind(this)}/>
                    }
                    {/* <Image 
                        src={CHAT_EMOJI}
                        className={style.icon}/> */}
                    {/* <Image 
                        src={CHAT_EXTENDS}
                        className={style.icon}
                        onClick={this.handleExtarMenuShow.bind(this)}/> */}
                    <Image 
                        src={imageIcon}
                        className={style.icon}
                        onClick={this.handleChooseImage.bind(this)}/>
                    <Button
                        className={style.btn}
                        onClick={this.handleSendClick.bind(this)}
                        >发送</Button>
                </View>
                {/* <View
                    className={style.extraMenu}
                    style={showEditorExtra ? '' : 'display:none'}>
                    {menus.map((menu, index) => (
                        <View
                            className={style.menu}
                            key={'menu' + index}
                            onClick={this.handleMenuClick.bind(this, index)}>
                            <Image 
                                src={menu.icon}
                                className={style.img}/>
                            <View 
                                className={style.text}>{menu.text}</View>
                        </View>
                    ))}
                </View> */}
            </View>
        )
    }
}

export default ChatEditor