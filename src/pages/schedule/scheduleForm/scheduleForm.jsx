import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components' 

import style from './scheduleForm.module.scss'

class ScheduleForm extends Taro.Component {
    constructor (props) {
        super(props)
        this.state = {

            
        }
    } 
    handleClick() {

    }

    render() {
        let { scheduleInfo } = this.props
        console.log(scheduleInfo)
        return (
            <View className={style.scheduleFormWrap}>
                <Swiper
                    className={style.swiperBox}>
                    <SwiperItem>
                        <View className={style.swiperItem}>
                            <View 
                                className={style.tabItem}
                                onClick={this.handleClick.bind(this)}
                            >
                                <View className={style.h1}>星期一</View>
                                <View className={style.h2}>1月1日</View>
                            </View>
                        </View>
                    </SwiperItem>
                    <SwiperItem>
                    <View className='demo-text-2'>2</View>
                    </SwiperItem>
                </Swiper>
            </View>
        )
    }
}


export default ScheduleForm