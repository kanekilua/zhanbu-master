const INITIAL_STATE = {
    onlineFlag: false // 大师在线状态
}

export default function (state = INITIAL_STATE, action ) {
    switch (action.type) {
        case 'Set_Online' : {
            let temp = Object.assign({}, state)
            temp.onlineFlag = action.payload
            return Object.assign({}, state, temp)
        }
        default:
            return state
    }
}