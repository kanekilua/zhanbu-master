import Taro from '@tarojs/taro'
import { View, Image, Text} from '@tarojs/components'

import ORDER from './assets/order.png'
import style from './orderInfo.module.scss'
class OrderInfo extends Taro.Component {
    static defaultProps = {
        
    }
    constructor (props) {
        super(props)
        this.state = {

        }
    } 

    render() {
        let { orderInfo } = this.props

        return (
            <View className={style.wrapper}>
                <View className={style.title}>
                    <Image className={style.img} src={ORDER} />
                    <View className={style.text}>订单信息</View>
                </View>
                <View className={style.form}>
                    {
                        orderInfo.map(item=>
                            <View className={style.formItem} key={item.title}>
                                <View className={style.itemTitle}>{item.title}：</View>
                                <View className={style.itemContent}>{item.content}</View>
                            </View>
                            )
                    }
                    
                </View>
            </View>
        )
    }
}

export default OrderInfo