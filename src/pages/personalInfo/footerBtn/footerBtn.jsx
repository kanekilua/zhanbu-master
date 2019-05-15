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

        _fetch({url:'/masterin/schedule_set',payload: { id: schedule_id, type: 10 },method: 'POST',autoLogin: true}) //判断登录有没有过期
        .then(res => {
            this.props.orderInfo.init(id)
        })
        .catch(err=>console.log(err))
    }

    //设置为等待联系
    waitConnect (id) {
        this.set(id,10)
    }

    //设置为完成服务
    overServer (id) {
        this.props.showModal()
    }

    render() {
        let { orderInfo : { id, order_flag, schedule_flag } } = this.props
        schedule_flag = 20
        console.log(id)

        return (
            <View className={style.wrapper}>

            {
                schedule_flag == 30 
                ?
                <View className={style.waitConfirm}><View className={style.btnItem} onClick={this.scheduleConfirm.bind(this,id)}>待确认预约</View></View> 
                : 
                (   
                    (schedule_flag == 20) && (
                        (order_flag == 50 || order_flag == 30) 
                        ? 
                        (
                            (order_flag == 30 )
                            ? 
                            <View className={style.waitConnectBox}>
                                <View className={`${style.btnItem} ${style.waitConnect}`} onClick={this.waitConnect.bind(this,id)}>暂待联系</View>
                                <View className={style.btnItem} onClick={this.overServer.bind(this,id)}>完成服务</View>
                            </View> 
                            :
                            <View className={style.waitConnectBox}>
                                <View className={`${style.btnItem} ${style.NoneWaitConnect}`}>暂待联系</View>
                                <View className={style.btnItem} onClick={this.overServer.bind(this,id)}>完成服务</View>
                            </View>
                        ) 
                        :
                        order_flag == 40 &&  <View className={style.over}><View className={style.btnItem}>已完成</View></View> 
                    ) 
                    
                )
            }

            </View>
        )
    }
}

export default FooterBtn