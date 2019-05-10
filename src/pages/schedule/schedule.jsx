import Taro from '@tarojs/taro'
import { View, Image, } from '@tarojs/components'
import _fetch from '@/utils/fetch.js'
import HeaderTitle from '@/components/headerTitle/headerTitle'
import LineTitle from '@/components/lineTitle/lineTitle' 
import ScheduleForm from './scheduleForm/scheduleForm'

import style from './schedule.module.scss'

class Schedule extends Taro.Component {
    constructor (props) {
        super(props)
        this.state = {
            scheduleInfo: {}
        }
    } 

    init () {
        _fetch({url:'/masterin/schedule_list',payload: {},method: 'POST',autoLogin: true}) //判断登录有没有过期
            .then(res => {
                // console.log(res)
                this.setState({
                    scheduleInfo: res
                })
            })
            .catch(err=>console.log(err))
    }

    componentWillMount () {
        this.init();
    }
    render() {
        let { scheduleInfo } = this.state
        return (
            <View className={style.scheduleWrap}>
                <HeaderTitle
                    title='大师档期'
                />
                <LineTitle>档期预约</LineTitle>
                <ScheduleForm
                    scheduleInfo={scheduleInfo}
                />
            </View>
        )
    }
}


export default Schedule