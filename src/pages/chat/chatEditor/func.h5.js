import Taro from '@tarojs/taro'
import '@/plugins/recorder.mp3.min'

const recorder = Recorder()

export function _executeRecord () {
    console.log('--------------开始录音啦--------------')
    this.setState({
        isLongPress: true
    })
    // 使用recorder来做录音，可以兼容hybrid App
    recorder.open(() => {
        recorder.start()
        Taro.eventCenter.trigger('onShowToast', {
            show: true,
            text: '开始录音'
        })
    },(msg, isUserNotAllow) => {
        console.log('--------------暂不支持录音--------------')
        console.log('--------------'+ msg +'--------------')
        Taro.eventCenter.trigger('onShowToast', {
            show: true,
            text: '暂不支持录音'
        })
        Taro.eventCenter.trigger('onShowToast', {
            show: true,
            text: msg
        })
    })
}

export function _stopRecord () {
    console.log('--------------结束录音啦--------------')
    recorder.stop((blob, duration) => {
        recorder.close()
        if(duration < 2000) {
            Taro.eventCenter.trigger('onShowToast', {
                show: true,
                text: '录音时间太短'
            })
        }else {
            Taro.eventCenter.trigger('onSendFile', {
                blob: blob,
                type: 'audio'
            })
        }
    })
}