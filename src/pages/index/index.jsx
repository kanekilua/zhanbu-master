import Taro from '@tarojs/taro'
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

	// 获取系统消息
    _getMessage () {
        // 通过accid获取历史纪录
        _fetch({ url: '/app/history_notification'})
        .then(async (res) => {
			console.log(res)
			let readMsgList = []
			let unreadMsgList = []
            for(let msgItem of res) {
				if(msgItem.type[0] === '3') {
					const orderId = JSON.parse(msgItem.content).orderId
					let orderInfo = null
					await _fetch({ url: '/masterin/detail', payload: { id: orderId }})
					.then(res=> {
						orderInfo = res.order
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
				readMsgList, unreadMsgList, selectList  //创建为与unreadMsgList等长的数组
			})
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

export default Indexx