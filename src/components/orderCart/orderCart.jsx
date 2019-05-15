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
   
	render () {
		return (
			<View className={style.orderCartWrap}>
                <View className={style.orderHead}>
                    <View>订单号:</View>
                    <View>190218111112</View>
                    <Button className={style.copyBtn}>复制</Button>
                </View>
                <View className={style.userInfo}>
                    <View className={style.userInfoLeft}>
                        <Image
                            className={style.customerAvatar}
                            src={customerAvatar}
                        />
                        <View className={style.customerName}>程程</View>
                    </View>
                    <Button className={style.detailBtn}>详情</Button>
                </View>
                <View className={style.problemContent}>
                    咨询项目:
                    <Image
                        className={style.serverIco}
                        // src={}
                    />
                    事业
                </View>
                <View className={style.dateTime}>
                    预约时间:
                    <Text className={style.time}>2019-02-18  星期一  08:00</Text>
                    
                </View>
                <View className={style.process}>
                    进行中
                </View>
			</View>
		)
	}
}

export default OrderCart