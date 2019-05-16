import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar  } from 'taro-ui'
import _fetch from '@/utils/fetch.js'
import checkLogin from '@/utils/checkLogin.js'

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
            overList: [],
            waitConnectList: []
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

    //等待订单号查询订单接口
    onActionClick () {
        // let params = {
        //     order_no:''
        // }
        // _fetch({url:'/',payload: params, method: 'POST',autoLogin:true, showToast: true})
        // .then(res=>{

        // })
        // .catch(err=>console.log(err))
        this.init(this.state.value)
        
    }

    

    init (order_no) {
		let overList = []
        let waitConnectList = []
        let params = {
            order_no
        }
        _fetch({url:'/masterin/search_order',payload: params,method: 'POST',autoLogin:false, showToast: false})
        .then(res=>{
			for(let item of res){
				item.order_flag == 30
				?
				waitConnectList.push(item)
				:
				item.order_flag == 40 && overList.push(item)
			}
			this.setState({
				overList,
				waitConnectList
			})
            .catch(err=>console.log(err))

        })
	}
	
    componentDidMount () {
        checkLogin();
        this.init('');
    }
    
	render () {
        let { waitConnectList, overList } = this.state
		const tabList = [{ title: '待咨询' }, { title: '已完成' }]
		return (
			<View className='myOrderWrap'>
                <Header
                    headerTitle='订单管理'
                />
                <View className={style.searchBox}>
                    <AtSearchBar
                        value={this.state.value}
                        placeholder="订单号"
                        onChange={this.onChange.bind(this)}
                        onActionClick={this.onActionClick.bind(this)}
                    />
                </View>
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
                            {overList.map((item)=>
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
export default MyOrder
