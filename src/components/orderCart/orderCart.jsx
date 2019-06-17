import Taro from '@tarojs/taro'
import { View, Image, Text, Button} from '@tarojs/components'

import style from './orderCart.module.scss'
import customerAvatar from '@/assets/reserve.png'

 
class OrderCart extends Taro.Component {
    static options = {
        addGlobalClass: true
    }
    
      constructor (props) {
		super(props)
		this.state = { 
			current: 0,
        }
    }

    copy (order_no) {
        Taro.setClipboardData({
            data: order_no,
            success(res) {
              wx.getClipboardData({
                success(res) {
                  console.log(res.data) // data
                }
              })
            }
        })
    }
    
    onGotoPersonal (id) {
        Taro.navigateTo({
            url:`/pages/personalInfo/personalInfo?order_id=${id}`
        })
    }
   
	render () {
        let { id, order_no, reserve, } = this.props.orderInfo
		return (
			<View className={style.orderCartWrap}>
                <View className={style.orderHead}>
                    <View>订单号:</View>
                    <View>{order_no}</View>
                    <Button className={style.copyBtn} onClick={this.copy.bind(this,order_no)}>复制</Button>
                </View>
                <View className={style.userInfo}>
                    <View className={style.userInfoLeft}>
                        <Image
                            className={style.customerAvatar}
                            src={reserve.avatar}
                        />
                        <View className={style.customerName}>{reserve.nickname}</View>
                    </View>
                    <Button className={style.detailBtn} onClick={this.onGotoPersonal.bind(this,id)}>详情</Button>
                </View>
                <View className={style.problemContent}>
                    咨询项目:
                    <Image
                        className={style.serverIco}
                        src={reserve.service_image}
                    />
                    {reserve.service_name}
                </View>
                <View className={style.dateTime}>
                    预约时间:
                    <Text className={style.time}>{reserve.schedule_code}</Text>
                </View>
			</View>
		)
	}
}

export default OrderCart