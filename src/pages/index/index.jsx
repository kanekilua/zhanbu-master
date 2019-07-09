import Taro from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import { SysMessageList_Update } from '@/actions/imsdk'
import { View, Image,} from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import style from './index.module.scss'
import './index.scss'
import GET from './assets/get.png'
import _fetch from '@/utils/fetch'

import OrderCart from '@/components/orderCart/orderCart'
import HeaderTitle from '@/components/headerTitle/headerTitle'
import { underline } from '_ansi-colors@3.2.4@ansi-colors';
 
class Index extends Taro.Component {
    config = {
        navigationStyle: 'custom'
	}
	static defaultProps = {
		messageList: []
	}

	constructor (props) {
		super(props)
		this.state = { 
			current: 0,
			readMsgList: [],
			unreadMsgList: [],
			selectList: [],
			allCheckFlag:false
        }
	}

	componentDidMount () {
		// 先从store拿，再从后台获取
		this.init()
	}

	componentWillReceiveProps (newProps) {
		this._handleMsgRead(newProps.messageList)
	}

	/**
	 * 先从store中读取，再从服务器获取并刷新 
	*/
	init () {
		let { messageList } = this.props
		if(messageList) {
			this._handleMsgRead(messageList)
		}
		if( messageList.length === 0 ) {
			this._getMessage()
		}
	}

	// 分辨是否已读，并且把数组顺序翻转
	_handleMsgRead (msgList) {
		let readMsgList = []
		let unreadMsgList = []
		for(let msgItem of msgList) {
			if(msgItem.is_read === '10') {
				unreadMsgList.push(msgItem.orderInfo)
			} else {
				readMsgList.push(msgItem.orderInfo)
			}
		}
		let selectList = []
		for(let i in unreadMsgList){
			selectList.push(0)
		}
		this.setState({
			readMsgList: readMsgList.reverse(), 
			unreadMsgList: unreadMsgList.reverse(), 
			selectList
		})
	}

	// 获取历史记录并更改store里面的
	_getMessage () {
		_fetch({ url: '/app/history_notification'})
        .then(async (res) => {
			console.log(res)
			let msgList = []
			for(let msgItem of res) {
				if(msgItem.type[0] === '3') {
					const orderId = JSON.parse(msgItem.content).orderId
					let orderInfo = null
					await _fetch({ url: '/masterin/detail', payload: { id: orderId }})
					.then(msgList=> {
						orderInfo = msgList.order
					})
					msgList.push({
						is_read: msgItem.is_read,
						orderInfo
					})
				}
			}
			this.props.SysMessageList_Update(msgList)
        })
	}
	
	handleClick (value) {
		this.setState({
			current: value
		})
	}

	//知道了事件
	// 等待接口
	onKown () {
		let { selectList, unreadMsgList, readMsgList } = this.state   //选择情况列表，与unreadMsgList索引对应  1选中  0未选中
		for(let i in selectList) {
			if(selectList[i] === 1) {
				unreadMsgList.splice(i,1);
				readMsgList.push(unreadMsgList[i])
			}
		}
		this.setState({
			unreadMsgList,
			readMsgList
		})
	}

	//全选事件
	onAllCheck (allCheckFlag) {
		let { selectList } = this.state

		if(allCheckFlag){
			for(let i in selectList){
				selectList[i] = 0
			}
		}else{
			for(let i in selectList){
				selectList[i] = 1
			}
		}
		this.setState({
			selectList,
			allCheckFlag:!allCheckFlag
		})
	}

	//单选事件
	onCheck (index) {
		let { selectList } = this.state
		let allChecked = true
		if(selectList[index]){
			selectList[index] = 0
			allChecked=false
		}else{
			selectList[index] = 1
			for(let i in selectList){
				if(selectList[i] == 0){
					allChecked=false
				}
			}
		}
		if(allChecked){
			this.setState({allCheckFlag:true})
		}else{
			this.setState({allCheckFlag:false})
		}
		this.setState({selectList})
	}

	render () {
		const tabList = [{ title: '未读' }, { title: '已读' }]
		const { readMsgList, unreadMsgList } = this.state
		let { selectList, allCheckFlag } = this.state
		return (
			<View className={style.wrapper}>
                <HeaderTitle
                    title='消息'
                />
				<AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
					<AtTabsPane current={this.state.current} index={0} >
						<View className={style.orderList}>
							<View className={style.allCheckBox}>
								<View className={style.boxLeft} onClick={this.onAllCheck.bind(this,allCheckFlag)}>
									<View className={allCheckFlag ? `${style.radio} ${style.radioChecked}` : `${style.radio} ${style.radioNone}`}>
										<Image className={style.getImage} src={GET}/>
									</View>
									<View className={style.text}>全选</View>
								</View>
								<View className={style.boxRight} onClick={this.onKown.bind(this)}>知道了</View>
							</View>
							{ unreadMsgList.map((orderInfo, index) => (
								<View 
									className={style.orderCattItem}
									key={'orderCart' + index}>
									<View className={selectList[index] == 1 ? `${style.radio} ${style.radioChecked}` : `${style.radio} ${style.radioNone}`}  onClick={this.onCheck.bind(this,index)}>
										<Image className={style.getImage} src={GET}/>
									</View>
									<View className={style.redioContentBox}>
										<OrderCart orderInfo={orderInfo}/>
									</View>
								</View>
							))}
							
						</View>
					</AtTabsPane>
					<AtTabsPane current={this.state.current} index={1}>
						<View className={style.orderList}>
							{ readMsgList.map((orderInfo, index) => (
								<View 
									key = {'orderCart' + index}
									className={style.itemBox}>
									<OrderCart 
										orderInfo={orderInfo}/>
								</View>
							))}
						</View>
					</AtTabsPane>
				</AtTabs>
			</View>
		)
	}
}

let mapStateToProps = (state) => {
    return {
        messageList : state.imsdk.sysMessageList
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({SysMessageList_Update}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
