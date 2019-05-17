import Taro from '@tarojs/taro'
import { View, Image, Text} from '@tarojs/components'
import _fetch from '@/utils/fetch.js'

import GET from '../assets/get.png'
import style from './scheduleConfirm.module.scss'
class ScheduleConfirm extends Taro.Component {
    static defaultProps = {
        scheduleInfo : [
            {id: 1, day_code: "20190506", time_code: "08:30", week_day: "星期一", schedule_code: "2019-05-06 星期一 08:30", },
            {id: 11, day_code: "20190506", time_code: "10:30", week_day: "星期一", schedule_code: "2019-05-06 星期一 10:30",  },
            {id: 21, day_code: "20190506", time_code: "14:30", week_day: "星期一", schedule_code: "2019-05-06 星期一 14:30",  },
            {id: 31, day_code: "20190506", time_code: "16:30", week_day: "星期一", schedule_code: "2019-05-06 星期一 16:30",  },
            {id: 41, day_code: "20190506", time_code: "20:00", week_day: "星期一", schedule_code: "2019-05-06 星期一 20:00",  },
            {id: 2, day_code: "20190507", time_code: "08:30", week_day: "星期二", schedule_code: "2019-05-07 星期二 08:30",  },
            {id: 12, day_code: "20190507", time_code: "10:30", week_day: "星期二", schedule_code: "2019-05-07 星期二 10:30",  },
            {id: 22, day_code: "20190507", time_code: "14:30", week_day: "星期二", schedule_code: "2019-05-07 星期二 14:30",  },
            {id: 32, day_code: "20190507", time_code: "16:30", week_day: "星期二", schedule_code: "2019-05-07 星期二 16:30",  },
            {id: 42, day_code: "20190507", time_code: "20:00", week_day: "星期二", schedule_code: "2019-05-07 星期二 20:00",  },
            {id: 3, day_code: "20190508", time_code: "08:30", week_day: "星期三", schedule_code: "2019-05-08 星期三 08:30",  },
            {id: 13, day_code: "20190508", time_code: "10:30", week_day: "星期三", schedule_code: "2019-05-08 星期三 10:30",  },
            {id: 23, day_code: "20190508", time_code: "14:30", week_day: "星期三", schedule_code: "2019-05-08 星期三 14:30",  },
            {id: 33, day_code: "20190508", time_code: "16:30", week_day: "星期三", schedule_code: "2019-05-08 星期三 16:30",  },
            {id: 43, day_code: "20190508", time_code: "20:00", week_day: "星期三", schedule_code: "2019-05-08 星期三 20:00",  },
            {id: 4, day_code: "20190509", time_code: "08:30", week_day: "星期四", schedule_code: "2019-05-09 星期四 08:30",  },
            {id: 14, day_code: "20190509", time_code: "10:30", week_day: "星期四", schedule_code: "2019-05-09 星期四 10:30",  },
            {id: 24, day_code: "20190509", time_code: "14:30", week_day: "星期四", schedule_code: "2019-05-09 星期四 14:30",  },
            {id: 34, day_code: "20190509", time_code: "16:30", week_day: "星期四", schedule_code: "2019-05-09 星期四 16:30",  },
            {id: 44, day_code: "20190509", time_code: "20:00", week_day: "星期四", schedule_code: "2019-05-09 星期四 20:00",  },
            {id: 5, day_code: "20190510", time_code: "08:30", week_day: "星期五", schedule_code: "2019-05-10 星期五 08:30",  },
            {id: 15, day_code: "20190510", time_code: "10:30", week_day: "星期五", schedule_code: "2019-05-10 星期五 10:30",  },
            {id: 25, day_code: "20190510", time_code: "14:30", week_day: "星期五", schedule_code: "2019-05-10 星期五 14:30",  },
            {id: 35, day_code: "20190510", time_code: "16:30", week_day: "星期五", schedule_code: "2019-05-10 星期五 16:30",  },
            {id: 45, day_code: "20190510", time_code: "20:00", week_day: "星期五", schedule_code: "2019-05-10 星期五 20:00",  },
        ]
    }
    constructor (props) {
        super(props)
    } 

    componentWillMount () {

    }

    _disposeProps (list) {
        let tempArr = []
        let scheduleList = []
        for(let item of list){
            if(tempArr.length == 0 || item.week_day == tempArr[0].week_day){
                tempArr.push(item)
            }else{
                scheduleList.push(tempArr)
                tempArr=[]
                tempArr.push(item)
            }
        }
        scheduleList.push(tempArr)

        let headList = []

        for(let item of scheduleList){
            let temp = {}
            temp.h1 = item[0].week_day
            let arr = item[0].day_code.substring(4).split('') 
            temp.h2 = `${arr[0]}${arr[1]}月${arr[2]}${arr[3]}`
            headList.push(temp)
        }
        return {scheduleList, headList}
    }

    onAllCheck () {
        let {allCheckedFlag} = this.props
        this.props.onAllCheck(!allCheckedFlag)

    }

    //订单id
    onHandelSchedule (order_id,schedule_id) {
        this.props.onHandelSchedule(order_id,schedule_id)
    }

    onConfirm () {
        this.props.onConfirm()
    }
    
    render() {
        let { scheduleInfo, allCheckedFlag} = this.props
        let { scheduleList, headList} = this._disposeProps(scheduleInfo)

        return (
            <View className={style.wrapper}>
                <View className={style.contentBox}>
                    <View className={style.headerBox}>
                        {
                            headList.map(item=>
                                <View className={style.dayHeaderItem}>
                                    <View>{item.h1}</View>
                                    <View className={style.h2}>{item.h2}</View>
                                </View>
                                )
                        }
                    </View>
                    <View className={style.dayBox}>
                        {
                            scheduleList.map(dayItem => 
                                <View className={style.dayTimeList}>
                                    {
                                        dayItem.map(item=>
                                            // 10=已休息,20=已确认,30=待确认,40=无预约
                                            item.schedule_flag == 10 ? <View className={`${style.timeItem} ${style.disableItem}`}>休息</View> : 
                                                item.schedule_flag == 30 ? <View className={`${style.timeItem} ${style.order}`} onClick={this.onHandelSchedule.bind(this,item.order_id,item.id)}>{item.time_code}</View> : 
                                                    item.schedule_flag == 40 ? <View className={`${style.timeItem} ${style.nullItem}`}>{item.time_code}</View> : 
                                                        item.schedule_flag == 20 ? <View className={`${style.timeItem} ${style.order}`} onClick={this.onHandelSchedule.bind(this,item.order_id,item.id)}>
                                                            {item.time_code}
                                                            {/* √ */}   
                                                            <Image className={style.get} src={GET}/>
                                                            </View> : ''
                                        )
                                    }
                                </View>
                                )
                        }
                    </View>
                </View>
                <View className={style.confirmBox}>
                    <View className={allCheckedFlag ? `${style.radioBox} ${style.redioChecked}` : style.radioBox } onClick={this.onAllCheck.bind(this)}>
                        {
                            allCheckedFlag && <Image 
                                className={style.radioGet} 
                                src={GET}/>
                        }
                    </View>
                    <View className={style.allCheckText} onClick={this.onAllCheck.bind(this)}>全选</View>
                    <View className={style.confirm_btn} onClick={this.onConfirm.bind(this)}>一键确认</View>
                </View>
                <View className={style.tipsBox}>
                    <View className={style.tipsItem}>
                        <View className={`${style.circular} ${style.lookOne}`}></View>
                        <View className={style.text}>无订单</View>
                    </View>
                    <View className={style.tipsItem}>
                        <View className={`${style.circular} ${style.lookTow}`}></View>
                        <View className={style.text}>有订单</View>
                    </View>
                    <View className={style.tipsItem}>
                        <View className={`${style.circular} ${style.lookThree}`}><Text className={style.get}>√</Text></View>
                        <View className={style.text}>已确认</View>
                    </View>
                    <View className={style.tipsItem}>
                        <View className={`${style.circular} ${style.lookFour}`}></View>
                        <View className={style.text}>休息</View>
                    </View>
                </View>
            </View>
        )
    }
}

export default ScheduleConfirm