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
			orderList: []
        }
	}
	
	handleClick (value) {
		this.setState({
			current: value
		})
    }

    init () {
        _fetch({url:'/masterin/reserve_list',payload: null,method: 'POST',autoLogin:false, showToast: false})
        .then(res=>{
			console.log(res)
			this.setState({
				orderList: res
			})
        })
	}
	
    componentDidMount () {
        checkLogin();
        this.init();
    }

    
	render () {
		const tabList = [{ title: '准备服务' }, { title: '暂待联系' }]
		let { orderList } = this.state 
		return (
			<View className={style.reserveWrap}>
                <HeaderTitle
                    title='消息'
                />
				<AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
					<AtTabsPane current={this.state.current} index={0} >
						<View className={style.orderList}>
							{orderList.map((item)=>
								<View className={style.orderCattItem} key={item.id}>
									<OrderCart orderInfo={item}/>
								</View>
							)}
                            
                        </View>
					</AtTabsPane>
					<AtTabsPane current={this.state.current} index={1}>
						<View>标签页二的内容</View>
					</AtTabsPane>
				</AtTabs>
			</View>
		)
	}
}
export default Reserve
