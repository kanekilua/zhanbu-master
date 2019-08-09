import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import style from './chatMain.module.scss'
import ChatList from '../chatList/chatList'
import ChatEditor from '../chatEditor/chatEditor'

class ChatMain extends Taro.Component {
    static defaultProps = {
        msgList : []
    }
    constructor (props) {
        super(props)
        this.state = {
            showEditorExtra: false
        }
    }
    
    // 展开或收起选择图片等按钮时
    handleEditorExtraChange (value) {
        this.setState({
            showEditorExtra: value
        })
    }

    render() {
        const { msgList } = this.props
        const { showEditorExtra } = this.state
        return (
            <View className={style.chatMainWrapper}>
                <ChatList
                    msgList={msgList}
                    showEditorExtra={showEditorExtra}></ChatList>
                <ChatEditor
                    showEditorExtra={showEditorExtra}
                    onEditorExtarChange={this.handleEditorExtraChange.bind(this)}></ChatEditor>
            </View>
        )
    }
}

export default ChatMain