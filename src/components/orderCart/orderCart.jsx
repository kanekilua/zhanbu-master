import Taro from '@tarojs/taro'
import { View, Image, Text, Button} from '@tarojs/components'

import style from './orderCart.module.scss'
import customerAvatar from '@/assets/reserve.png'

 
class OrderCart extends Taro.Component {
	constructor (props) {
		super(props)
		this.state = { 
			current: 0,
        }
	}
   
	render () {
        let { order_no, reserve, } = this.props.orderInfo
		return (
			<View className={style.orderCartWrap}>
                <View className={style.orderHead}>
                    <View>订单号:</View>
                    <View>{order_no}</View>
                    <Button className={style.copyBtn}>复制</Button>
                </View>
                <View className={style.userInfo}>
                    <View className={style.userInfoLeft}>
                        <Image
                            className={style.customerAvatar}
                            src={customerAvatar}
                        />
                        <View className={style.customerName}>{reserve.name}</View>
                    </View>
                    <Button className={style.detailBtn}>详情</Button>
                </View>
                <View className={style.problemContent}>
                    咨询项目:
                    <Image
                        className={style.serverIco}
                        // src={}
                    />
                    {reserve.service_name}
                </View>
                <View className={style.dateTime}>
                    预约时间:
                    <Text className={style.time}>{reserve.schedule_code}</Text>
                    
                </View>
                <View className={style.process}>
                    进行中
                </View>
			</View>
		)
	}
}

export default OrderCart