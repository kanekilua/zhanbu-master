import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import _fetch from '@/utils/fetch.js'
import checkLogin from '@/utils/checkLogin.js'


import OrderCart from '@/components/orderCart/orderCart'
import HeaderTitle from '@/components/headerTitle/headerTitle'

import './reserve.scss'
import style from './reserve.module.scss'
class Reserve extends Taro.Component {
    config = {
        navigationStyle: 'custom'
    }
	constructor (props) {
		super(props)
		this.state = { 
			current: 0,
			prepareList: [],
			waitConnectList: []
        }
	}
	
	handleClick (value) {
		this.setState({
			current: value
		})
    }

    init () {
		let prepareList = []
		let waitConnectList = []
        _fetch({url:'/masterin/reserve_list',payload: null,method: 'POST',autoLogin:true, showToast: false})
        .then(res=>{
			console.log(res)
			for(let item of res){
				item.order_flag == 30
				?
				waitConnectList.push(item)
				:
				item.order_flag == 50 && prepareList.push(item)
			}
			this.setState({
				prepareList,
				waitConnectList
			})
		})
        .catch(err=>console.log(err))
		
	}
	
    componentDidMount () {
        this.init();
    }

    
	render () {
		const tabList = [{ title: '准备服务' }, { title: '暂待联系' }]
		let { waitConnectList, prepareList } = this.state 
		return (
			<View className={style.reserveWrap}>
                <HeaderTitle
                    title='消息'
                />
				<AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
					<AtTabsPane current={this.state.current} index={0} >
						<View className={style.orderList}>
							{waitConnectList.map((item)=>
								<View className={style.orderCattItem} key={item.id}>
									<View className={style.itemBox}>
										<OrderCart orderInfo={item}/>
									</View>
								</View>
							)}
                        </View>
					</AtTabsPane>
					<AtTabsPane current={this.state.current} index={1}>
					<View className={style.orderList}>
							<View className={style.tips}>温馨提示：以下订单暂未处理,请尽快处理。</View>	
							{prepareList.map((item)=>
								<View className={style.orderCattItem} key={item.id}>
									<View className={style.itemBox}>
										<OrderCart orderInfo={item}/>
									</View>
								</View>
							)}
                        </View>
					</AtTabsPane>
				</AtTabs>
			</View>
		)
	}
}
export default Reserve
