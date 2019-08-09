import Taro from '@tarojs/taro'

export function _executeRecord () {
    const self = this
    self.setState({
        isLongPress : true
    })
    // 判断是否是小程序，是的话判断是否开启录音权限
    Taro.getSetting({
        success: (res) => {
            let recordAuth = res.authSetting['scope.record']
            if (recordAuth == false) { //已申请过授权，但是用户拒绝
                Taro.openSetting({
                    success: function (res) {
                        let recordAuth = res.authSetting['scope.record']
                        if (recordAuth == true) {
                            console.log('授权成功')
                            // showToast('success', '授权成功')
                        } else {
                            console.log('请授权录音')
                            // showToast('text', '请授权录音')
                        }
                        self.setState({
                            isLongPress: false
                        })
                    }
                })
            } else if (recordAuth == true) { // 用户已经同意授权
                self._startRecord()
            } else { // 第一次进来，未发起授权
                Taro.authorize({
                    scope: 'scope.record',
                    success: () => {//授权成功
                        console.log('授权成功')
                        // showToast('success', '授权成功')
                    }
                })
            }
        }
    })
}