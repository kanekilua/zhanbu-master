import Taro from '@tarojs/taro'
import { View, Image, Text} from '@tarojs/components'
import _fetch from '@/utils/fetch.js'

import style from './footerBtn.module.scss'

class FooterBtn extends Taro.Component {
    static defaultProps = {
        
    }
    constructor (props) {
        super(props)
        this.state = {

        }
    } 

    set (id,type) {
        _fetch({url:'/masterin/order_set',payload: {id,type},method: 'POST',autoLogin: true}) //判断登录有没有过期
        .then(res => {
            console.log(res)
            this.props.orderInfo.init(id)
        })
        .catch(err=>console.log(err))
    }

    //档期确认,然后初始化父组件
    scheduleConfirm (id) {
        let { schedule_id } = this.props.orderInfo
        console.log('props:', this.props)

        _fetch({url:'/masterin/schedule_set',payload: { ids: schedule_id, type: 10 },method: 'POST',autoLogin: true}) //判断登录有没有过期
        .then(res => {
            this.props.orderInfo.init(id)
        })
        .catch(err=>console.log(err))
    }

    //设置为等待联系
    pendingContact (id) {
        _fetch({url:'/masterin/pendingContact',payload: { id },method: 'POST',autoLogin: true}) //判断登录有没有过期
        .then(res => {
            this.props.orderInfo.init(id)
        })
        .catch(err=>console.log(err))
    }

    //设置为完成服务
    overServer () {
        this.props.onShowModal()
    }

    render() {
        let { orderInfo : { id, order_flag } } = this.props

        // .order_flag 	订单分类:10=待确认.20=待咨询,30=暂待联系,40=已完成
        return (
            <View className={style.wrapper}>

            {
                order_flag == 10 ?
                    <View className={style.waitConfirm}><View className={style.btnItem} onClick={this.scheduleConfirm.bind(this,id)}>确认预约</View></View>  : 
                        order_flag == 20 ?
                            <View className={style.waitConnectBox}>
                                <View className={`${style.btnItem} ${style.waitConnect}`} onClick={this.pendingContact.bind(this, id)}>暂待联系</View>
                                <View className={style.btnItem} onClick={this.overServer.bind(this,id)}>完成服务</View>
                            </View> :
                                order_flag == 30 ?
                                    <View className={style.waitConnectBox}>
                                        <View className={`${style.btnItem} ${style.NoneWaitConnect}`}>暂待联系</View>
                                        <View className={style.btnItem} onClick={this.overServer.bind(this)}>完成服务</View>
                                    </View> :
                                        order_flag == 40 ?
                                            <View className={style.over}><View className={style.btnItem}>已完成</View></View> : ''
                    
                    
                
            }

            </View>
        )
    }
}

export default FooterBtn