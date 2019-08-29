import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtSearchBar  } from 'taro-ui'
import _fetch from '@/utils/fetch.js'
import checkLogin from '@/utils/checkLogin.js'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import { CurrentChatTo_Change } from '@/actions/imsdk'
import app from '@/utils/appData'

import OrderCart from '@/components/orderCart/orderCart'
import Header from './header/header'
import QuestionItem from '@/components/questionItem/questionItem'
import noOrder from '@/assets/noOrder.png'

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
            contactList: [],
            waitConnectList: [],
            activeOrderIndex: 0, 
            faq: [], //闪测订单
        }
    }
    
	// atTab
	handleClick (value) {
		this.setState({
			current: value
		})
    }

    onClear () {
        this.setState({value:''})
        this.init()
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
        this.search(this.state.value)
        
    }

    onHandleItem (order_flag, problem, order_no, { avatar, nickname, accid}) {
        // 跳转到聊天页面
        this.props.CurrentChatTo_Change({
            avatar, nickname, accid
        })
        app.globalData.nim.resetSessionUnread(`p2p-${accid}`)
        Taro.navigateTo({
            url: '/pages/chat/chat'
        })
    }

    handleActiveOrder (index) {
        this.setState({
            activeOrderIndex: index
        })
    }
    

    search (order_no) {
        let params = {
            order_no
        }
        _fetch({url:'/masterin/search_order',payload: params,method: 'POST',autoLogin:false, showToast: false})
        .then(res=>{
            this._dealReserveList(res.res.reserve)
            this.setState({
                faq: res.faq
            })
        })
        .catch(err=>console.log(err))

	}
    
    componentDidMount () {
        this.init()
    }

    init () {
        _fetch({url:'/masterin/reserve_list',payload: null,method: 'POST',autoLogin:true, showToast: false})
        .then(res => {
            if(res) {
                this._dealReserveList(res.reserve)
                this.setState({
                    faq: res.faq
                })
            }
        })
    }
    
    _dealReserveList (list) {
        let overList = []
        let waitConnectList = []
        let contactList = []
        for(let item of list){
            if(item.order_flag == 30) {
                waitConnectList.push(item)
            }else if(item.order_flag == 40) {
                overList.push(item)
            }else if(item.order_flag == 50) {
                contactList.push(item)
            }
        }
        this.setState({
            overList,
            contactList,
            waitConnectList
        })
    }

	render () {
        let { waitConnectList,contactList, overList, activeOrderIndex, faq } = this.state
		const tabList = [{ title: '待咨询' }, {title: '待联系'}, { title: '已完成' }]
		return (
			<View className='myOrderWrap'>
                <Header
                    headerTitle='订单管理'
                    activeOrderIndex={activeOrderIndex}
                    handleActiveOrder={this.handleActiveOrder.bind(this)}
                />
                <View className={style.searchBox}>
                    <AtSearchBar 
                        value={this.state.value}
                        placeholder="订单号"
                        onChange={this.onChange.bind(this)}
                        onClear={this.onClear.bind(this)}
                        onActionClick={this.onActionClick.bind(this)}
                    />
                </View>
                {activeOrderIndex === 0 ?
                    <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
                        <AtTabsPane current={this.state.current} index={0} >
                            <View className={style.orderList}>
                                {
                                    waitConnectList.length > 0 ?
                                    waitConnectList.map((item)=>
                                        <View className={style.orderCattItem} key={item.id}>
                                            <View className={style.itemBox}>
                                                <OrderCart orderInfo={item}/>
                                            </View>
                                        </View>
                                    )
                                    : <View className={style.noOrderBox}>
                                        <Image className={style.noOrder} src={noOrder}/>
                                    </View>
                                }
                            </View>
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={1}>
                            <View className={style.orderList}>
                                {
                                    contactList.length > 0 ?
                                    contactList.map((item)=>
                                        <View className={style.orderCattItem} key={item.id}>
                                            <View className={style.itemBox}>
                                                <OrderCart orderInfo={item}/>
                                            </View>
                                        </View>
                                    )
                                    : <View className={style.noOrderBox}>
                                        <Image className={style.noOrder} src={noOrder}/>
                                    </View>
                                }
                                </View>
                        </AtTabsPane>
                        <AtTabsPane current={this.state.current} index={2}>
                            <View className={style.orderList}>
                                {
                                    overList.length > 0 ?
                                    overList.map((item)=>
                                        <View className={style.orderCattItem} key={item.id}>
                                            <View className={style.itemBox}>
                                                <OrderCart orderInfo={item}/>
                                            </View>
                                        </View>
                                    )
                                    : <View className={style.noOrderBox}>
                                        <Image className={style.noOrder} src={noOrder}/>
                                    </View>
                                }
                                </View>
                        </AtTabsPane>
                    </AtTabs>
                    :
                    <View className="faqPanel">
                        { faq &&
                            faq.map(item => {
                                if(item.faq.problem_content && item.faq.user_accid) {
                                    return (
                                        <QuestionItem 
                                            Info={item} 
                                            // onHandleBtn={onHandleBtn} 
                                            onHandleItem={this.onHandleItem.bind(this)}
                                            key={item.order_no}
                                        />
                                    )
                                }
                            })
                        }
                    </View>
                }
				
			</View>
		)
	}
}

let mapStateToProps = (state) => {
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ CurrentChatTo_Change }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder)
