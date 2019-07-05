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

	componentDidShow () {
		this._getMessage()
	}

	componentWillReceiveProps (newProps) {
		let msgList = newProps.messageList
		setTimeout(async () => {
			let readMsgList = []
			let unreadMsgList = []
			for(let msgItem of msgList) {
				if(msgItem.type[0] === '3') {
					const orderId = JSON.parse(msgItem.content).orderId
					let orderInfo = null
					await _fetch({ url: '/masterin/detail', payload: { id: orderId }})
					.then(msgList=> {
						orderInfo = msgList.order
					})
					if(orderInfo) {
						if(msgItem.is_read === '10') {
							unreadMsgList.push(orderInfo)
						} else {
							readMsgList.push(orderInfo)
						}
					}
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
		}, 300)
	}

	// 获取系统消息
    _getMessage () {
        // 通过accid获取历史纪录
        _fetch({ url: '/app/history_notification'})
        .then(async (res) => {
			this.props.SysMessageList_Update(res)
        })
	}
	
	handleClick (value) {
		this.setState({
			current: value
		})
	}

	//知道了事件
	onKown () {
		let { selectList } = this.state   //选择情况列表，与unreadMsgList索引对应  1选中  0未选中

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