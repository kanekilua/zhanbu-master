import Taro, { showToast } from '@tarojs/taro'
import { View, Image, Text, Button} from '@tarojs/components'
import copy from 'copy-to-clipboard';
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

    handelCopy (order_no) {
        if(copy(order_no)){
            Taro.showToast({
                title:'复制成功',
                icon:'success'
            })
        }else{
            Taro.showToast({
                title:'复制失败',
                icon:'none'
            })
        }
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
                    <Button className={style.copyBtn} onClick={this.handelCopy.bind(this,order_no)}>复制</Button>
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
                        src={reserve.service_img}
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