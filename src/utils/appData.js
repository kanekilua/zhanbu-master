import { CHAT_CONFIG as chat } from '@/constants/chat'

let app = {
    store : null,
    globalData: {
        nim : null,
        netcall: null,
        emitter: null,
        netcallController: null,
        CHAT_CONFIG : chat
    }
}

export default app