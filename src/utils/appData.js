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
    }
}

export default app