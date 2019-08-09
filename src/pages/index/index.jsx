import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import { SysMessageList_Update } from '@/actions/imsdk'
import { View } from '@tarojs/components'
import _fetch from '@/utils/fetch'
import Header from '@/components/header/header'
import ProjectItem from './projectItem/projectItem'
import style from  './index.module.scss'
import FlashIcon from './assets/flash.png'
import OrderIcon from './assets/order.png'

class Index extends Component {
	config = {
		navigationBarTitleText: '首页'
	}

	constructor (props) {
		super(props)
		this.state = {
			readFlag: [false, false, false]
		}
	}

	componentWillMount () {
		// this.init()
	}

	componentWillReceiveProps (newProps) {
		// if(JSON.stringify(newProps.messageList) !== JSON.stringify(this.props.messageList)) {
		// 	this._handleMsgRead(newProps.messageList)
		// }
		// if(JSON.stringify(newProps.unreadInfo) !== JSON.stringify(this.props.unreadInfo) ) {
		// 	this._handleChatRead(newProps.unreadInfo)
		// }
	}

	// 初始化, 需要判断是否有未读消息
	init () {
		// let { messageList, unreadInfo } = this.props
		// if( messageList.length === 0 ) {
		// 	// 从store取系统消息记录和聊天消息记录
		// 	this._getMessage()
		// }else {
		// 	this._handleMsgRead(messageList)
		// }
		// setTimeout(() => {
		// 	this._handleChatRead(unreadInfo)
		// }, 1300)
	}

	// 从服务器请求获取历史通知
	// _getMessage () {
	// 	_fetch({ url: '/app/history_notification'})
    //     .then(async (res) => {
	// 		let ids = ''
	// 		let orderInfoList = []
	// 		let serviceMsgList = []
	// 		let masterMsgList = []
	// 		// 从返回的系统消息列表获取orderId并拼接，并提取出消息id和已读状态放在msgList中
	// 		for(let msgItem of res) {
	// 			if(msgItem.type[0] === '2') {
	// 				if(msgItem.type[3] === '1') {
	// 					serviceMsgList.push({
	// 						id: msgItem.id,
	// 						is_read: msgItem.is_read,
	// 						orderInfo: JSON.parse(msgItem.content)
	// 					})
	// 				}else if(msgItem.type[3] === '2') {
	// 					const orderId = JSON.parse(msgItem.content).orderId
	// 					if( ids.indexOf(orderId) === -1 ) {
	// 						ids += orderId + ','
	// 						masterMsgList.push({
	// 							id: msgItem.id,
	// 							is_read: msgItem.is_read
	// 						})
	// 					}
	// 				}
	// 			}
	// 		}
	// 		// 根据ids请求这部分订单的详情
	// 		await _fetch({ url: '/servicesin/detail', payload: { ids: ids.substring(0, ids.length - 1) }})
	// 		.then(orderList=> {
	// 			orderInfoList = orderList.order
	// 		})
	// 		// 将返回的详情数组和msgList整合
	// 		for(let i in masterMsgList ) {
	// 			masterMsgList[i]['orderInfo'] = orderInfoList[i]
	// 		}
	// 		console.log('serviceMsgList', serviceMsgList, 'masterMsgList', masterMsgList)
	// 		this.props.SysMessageList_Update([
	// 			serviceMsgList, masterMsgList
	// 		])
    //     })
	// }

	// 处理是否已读(系统通知)
	_handleMsgRead (msgList) {
		// if( msgList.length === 2 ) {
		// 	let readFlag = [].concat(this.state.readFlag)
		// 	for( let i in msgList ) {
		// 		readFlag[i] = msgList[i].some(( msgItem ) => {
		// 			if( msgItem.is_read === '10' ) {
		// 				return true
		// 			}
		// 		})
		// 	}
		// 	this.setState({ readFlag })
		// }
	}

	// 处理聊天记录是否已读
	_handleChatRead ( unreadInfo ) {
		// let arr = Object.keys(unreadInfo)
		// let readFlag = [].concat(this.state.readFlag)
		// readFlag[2] = arr.some((key) => {
		// 	if( unreadInfo[key] ) {
		// 		return true
		// 	}
		// })
		// this.setState({ readFlag })
	}

  	render() {
		  const { readFlag } = this.state
		  //header设置没有返回键
		  let back = false
		  //列表项数据
		  let projectList = [
			  {'icon':OrderIcon,'title':'预约消息','url':'/pages/orderMessage/orderMessage',tips:readFlag[0], tag:'yy'},
			  {'icon':FlashIcon,'title':'闪测消息','url':'/pages/flashMessage/flashMessage',tips:readFlag[1], tag:'sc'},
	  		]
		return (
			<View className={style.wrapper}>
				<Header 
					headerTitle="消息"
					back={back}
				/>
				<View className={style.contentBox}>
					{
						projectList.map((item)=>
							<ProjectItem 
								Info={item}/>	
						)
					}
				</View>
			</View>
		)
  	}
}

let mapStateToProps = (state) => {
    return {
		messageList : state.imsdk.sysMessageList,
		unreadInfo: state.imsdk.unreadInfo
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ SysMessageList_Update }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
