import Taro from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'

import style from './chatList.module.scss'

import ChatItem from '../chatItem/chatItem'

class ChatList extends Taro.Component {
    static defaultProps = {
        msgList : [],
        showEditorExtra: false
    }
    constructor (props) {
        super(props) 
        this.state = {
            scrollTop : 0,
            // isFullImgShow 查看聊天图片的大图
            // msgLoadedTimer 消息加载的时间调度
        }
    }

    componentDidMount () {
        Taro.eventCenter.on('scrollToBottom', this.handleScrollToBottom.bind(this))
    }
    
    componentDidUpdate (prevProps, prevState) {
        if(prevProps !== this.props) {
            if(this.props.msgList.length > 0) {
                this.handleScrollToBottom()
            }
        }
    }
    
    handleScrollToBottom () {
        if(this.scrollView) {
            if(Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
                this.scrollView.boundingClientRect(rect => {
                    this.setState({
                        scrollTop : rect.height + 130
                    })
                }).exec()
            }else {
                this.setState({
                    scrollTop : this.scrollView.container.scrollHeight
                })
            }
        }
    }

    refScrollView = (node) => {
        this.scrollView = node
    }

    render() {
        const { msgList, showEditorExtra } = this.props
        return (
            <ScrollView 
                className={showEditorExtra? style.chatListWrapperHigh : style.chatListWrapperLow}
                scrollY
                scrollTop={this.state.scrollTop}
                ref={this.refScrollView}>
                {/* TODO:上拉加载更多以及 没有更多了 */}
                {msgList.map((msg,index) => (
                    <ChatItem
                        key={index}
                        rawMsg={msg}></ChatItem>
                ))}
            </ScrollView>
        )
    }
}

export default ChatList