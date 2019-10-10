import { CHAT_CONFIG as chat } from '@/constants/chat'

let app = {
    store : null,
    globalData: {
        nim : null,
        netcall: null,
        emitter: null,
        netcallController: null,
        CHAT_CONFIG : chat
    },
    /**
     * 判断字符串是否json
     * params: str: ""
     */
    isJson: (str) => {
        if (typeof str == 'string') {
            try {
                var obj=JSON.parse(str)
                if(typeof obj == 'object' && obj ){
                    return true
                }else{
                    return false
                }
            } catch(e) {
                return false
            }
        }
        return false
    },
    setMasterOnline: (flash_status) => {
        if(app.store) {
            let online
            if(flash_status === 10) {
                online = true
            }else if(flash_status === 20) {
                online = false
            }
            app.store.dispatch({
                type: 'Set_Online',
                payload: online
            })
        }
    },
    getUserInfo: () => {
        let userInfoStr = Taro.getStorageSync('userInfo')
        if( userInfoStr ) {
            return JSON.parse(userInfoStr)
        }else {
            return null
        }
    }
}

export default app