import Taro from '@tarojs/taro'
import { View, Image, Input, Button } from '@tarojs/components'
import _fetch from '@/utils/fetch'

import { _executeRecord, _stopRecord, _getRecordFile, _deleteRecordFile } from './func'
import voiceIcon from './assets/voice.png'
import textIcon from './assets/text.png'
// import imageIcon from './assets/image.png'
import CHAT_EXTENDS from './assets/extends.png'
import photoIcon from './assets/photo.png'
import cameraIcon from './assets/camera.png'

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
            meida: null,
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
            console.log('startRecord')
            let src = new Date().getTime() + '.wav'
            let media = new Media(src)
            media.startRecord()
            this.setState({
                media
            })
        }, 450)
        this.setState({
            pressStart, recordTimer
        })
    }

    // 长按结束
    handleInputTouchEnd (e) {
        var self = this
        const { pressStart, recordTimer, media } = this.state
        const pressEnd = new Date().getTime()
        if( pressEnd - pressStart < 450 ) {
            console.log('cancelRecord',pressEnd - pressStart)
            clearTimeout(recordTimer)
            this.setState({
                pressStart: 0,
                recordTimer: null
            })
            return
        }
        console.log('stopRecord',pressEnd - pressStart)
        media.stopRecord()
        if( pressEnd - pressStart > 1500) {
            _getRecordFile(media.src).then((dataUrl) => {
                self._sendFileMsg({
                    blob: self.dataURLtoBlob(dataUrl),
                    type: 'audio'
                })
                media.release()
                this.setState({
                    media: null
                })
                _deleteRecordFile(media.src)
            })
        }else {
            Taro.showToast({
                title: '录音时间太短',
                icon: 'none'
            })
            _deleteRecordFile(media.src)
        }
    }

    handleExtarMenuShow () {
        const tempShow = this.props.showEditorExtra
        this.props.onEditorExtarChange(!tempShow)
    }

    // handleChooseImage () {
    //     // TODO:从相册选取照片
    // }

    handleMenuClick (index) {
        let _self = this
        switch(index) {
            case 0 : 
                // TODO:从相册选取照片
                var cameraOptions={
                    quality: 100,
                    sourceType:0,
                    targetWidth : 800,
                    targetHeight : 800,
                    // allowEdit: true,
                    destinationType:  Camera.DestinationType.DATA_URL, 
                }
                navigator.camera.getPicture(_self.cameraSuccess.bind(_self), () => {}, cameraOptions);
                break
            case 1: 
                // TODO:拍照取片
                var cameraOptions={
                    quality: 100,
                    sourceType:1,
                    // allowEdit: true,
                    targetWidth : 800,
                    targetHeight : 800,
                    saveToPhotoAlbum : true,
                    destinationType: Camera.DestinationType.DATA_URL, 
                }
                navigator.camera.getPicture(_self.cameraSuccess.bind(_self), () => {}, cameraOptions);
                break
            case 2:
                // TODO:语音通话
                console.log(index)
                break
            case 3:
                // TODO:视频通话
                console.log(index)
                break
            default:
                break
        }
    }

    cameraSuccess (imageData) {
        let imageFile = this.dataURLtoBlob('data:image/jpeg;base64,' + imageData)
        this._sendFileMsg({
            type: 'image',
            blob: imageFile
        })
    }

    // 将base64转换为Blob
    dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], { type: mime })
    }

    handleInputOnBlur () {
        window.scrollTo(0, 0)
    }

    handleSendClick () {
        // 发送消息
        this._sendTextMsg()
    }

    render() {
        const { msgType, msgToSent } = this.state
        const { showEditorExtra } = this.props
        const menus = [
            {
                icon: photoIcon,
                text: '照片'
            }, {
                icon: cameraIcon,
                text: '拍摄'
            }
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
                    <Image 
                        src={msgType ? textIcon : voiceIcon}
                        className={style.icon}
                        onClick={this.handleMsgTypeClick.bind(this)}/>
                    {
                        msgType
                        ? <Input 
                            placeholder="按住说话"
                            className="editorInput1"
                            disabled={true}
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
                    <Image 
                        src={CHAT_EXTENDS}
                        className={style.icon}
                        onClick={this.handleExtarMenuShow.bind(this)}/>
                    {/* <Image 
                        src={imageIcon}
                        className={style.icon}
                        onClick={this.handleChooseImage.bind(this)}/> */}
                    <Button
                        className={style.btn}
                        onClick={this.handleSendClick.bind(this)}
                        >发送</Button>
                </View>
                <View
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
                </View>
            </View>
        )
    }
}

export default ChatEditor