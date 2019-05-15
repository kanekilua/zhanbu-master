import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import _fetch from '@/utils/fetch.js'

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
        })
    }
    
    componentDidMount () {
        this.init();
    }

    
	render () {
		const tabList = [{ title: '准备服务' }, { title: '暂待联系' }]
		return (
			<View className={style.reserveWrap}>
                <HeaderTitle
                    title='消息'
                />
				<AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
					<AtTabsPane current={this.state.current} index={0} >
						<View className={style.orderList}>
                            <View className={style.orderCattItem}>
								<View className={style.itemBox}>
                                	<OrderCart/>
								</View>
                            </View>
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
