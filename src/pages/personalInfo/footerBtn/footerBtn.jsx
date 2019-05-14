import Taro from '@tarojs/taro'
import { View, Image, Text} from '@tarojs/components'

import style from './footerBtn.module.scss'

class FooterBtn extends Taro.Component {
    static defaultProps = {
        
    }
    constructor (props) {
        super(props)
        this.state = {

        }
    } 


    render() {
        let { order_status } = this.props


        return (
            <View className={style.wrapper}>
                <View className={style.waitConfirm}>
                    <View className={style.btnItem}>暂待联系</View>
                    <View className={style.btnItem}>待确认预约</View>
                </View>
                 
            </View>
        )
    }
}

export default FooterBtn