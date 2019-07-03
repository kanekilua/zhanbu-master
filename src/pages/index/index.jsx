import Taro from '@tarojs/taro'
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
	constructor (props) {
		super(props)
		this.state = { 
			current: 0,
			readMsgList: [],
			unreadMsgList: [],
			selectFlag: []
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
			this.setState({
				readMsgList, unreadMsgList
			})
        })
	}
	
	handleClick (value) {
		this.setState({
			current: value
		})
	}

    
	render () {
		const tabList = [{ title: '未读' }, { title: '已读' }]
		const { readMsgList, unreadMsgList } = this.state
		return (
			<View className={style.wrapper}>
                <HeaderTitle
                    title='消息'
                />
				<AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
					<AtTabsPane current={this.state.current} index={0} >
						<View className={style.orderList}>
							<View className={style.allCheckBox}>
								<View className={style.boxLeft}>
									<View className={`${style.radio} ${style.radioChecked}`}>
										<Image className={style.getImage} src={GET}/>
									</View>
									<View className={style.text}>全选</View>
								</View>
								<View className={style.boxRight}>知道了</View>
							</View>
							{ unreadMsgList.map((orderInfo, index) => (
								<View 
									className={style.orderCattItem}
									key={'orderCart' + index}>
									<View className={`${style.radio} ${style.radioChecked}`}>
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

export default Index