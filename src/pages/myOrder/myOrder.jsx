import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar  } from 'taro-ui'
import _fetch from '@/utils/fetch.js'

import OrderCart from '@/components/orderCart/orderCart'
import Header from '@/components/header/header'


import './myOrder.scss'
import style from './myOrder.module.scss'
class MyOrder extends Taro.Component {
    config = {
        navigationStyle: 'custom'
    }
	constructor (props) {
		super(props)
		this.state = { 
            current: 0,
            value: '',
        }
	}
	// atTab
	handleClick (value) {
		this.setState({
			current: value
		})
    }
    // 搜索框
    onChange (value) {
        this.setState({
            value: value
        })
    }
    init () {
        // _fetch({url:'/masterin/reserve_list',payload: null,method: 'POST',autoLogin:false, showToast: false})
        // .then(res=>{
        //     console.log(res)
        // })
    }
    
    componentDidMount () {
        this.init();
    }

    
	render () {
		const tabList = [{ title: '待咨询' }, { title: '已完成' }]
		return (
			<View className='myOrderWrap'>
                <Header
                    headerTitle='订单管理'
                />
                <View className={style.searchBox}>
                    <AtSearchBar
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />
                </View>
				<AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
					<AtTabsPane current={this.state.current} index={0} >
						<View className={style.orderList}>
                            <View className={style.orderCattItem}>
                                <OrderCart/>
                            </View>
                        </View>
					</AtTabsPane>
					<AtTabsPane current={this.state.current} index={1}>
                        <View className={style.orderList}>
                            <View className={style.orderCattItem}>
                                <OrderCart/>
                            </View>
                        </View>
					</AtTabsPane>
				</AtTabs>
			</View>
		)
	}
}
export default MyOrder
