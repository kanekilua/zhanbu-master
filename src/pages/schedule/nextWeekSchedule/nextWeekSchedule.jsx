import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import _fetch from '@/utils/fetch.js'

import style from './nextWeekSchedule.module.scss'

class NextWeekSchedule extends Taro.Component {
    static defaultProps = {
        nextWeekInfo: [
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
        ],
    }

    constructor (props) {
        super(props)
        this.state = {
           
        }
    } 


    componentDidMount () {

    }
    
    _disposeProps (list) {
        if(list.length == 0){
            let nextWeekInfoList = []
            let headList = [{h1:'周一'},{h1:'周二'},{h1:'周三'},{h1:'周四'},{h1:'周五'}]
            return {nextWeekInfoList, headList}
        }
        let tempArr = []
        let nextWeekInfoList = []
        for(let item of list){
            if(tempArr.length == 0 || item.week_day == tempArr[0].week_day){
                tempArr.push(item)
            }else{
                nextWeekInfoList.push(tempArr)
                tempArr=[]
                tempArr.push(item)
            }
        }
        nextWeekInfoList.push(tempArr)

        let headList = []

        for(let item of nextWeekInfoList){
            //flag==1表示这天全时段休息
            let flag = 1
            let temp = {}
            temp.h1 = item[0].week_day
            let arr = item[0].day_code.substring(4).split('') 
            temp.h2 = `${arr[0]}${arr[1]}月${arr[2]}${arr[3]}`

            for(let T of item){
                T.schedule_flag != 10 ? (flag = 0) : ''
            }
            temp.flag = flag
            headList.push(temp)
        }
        return {nextWeekInfoList, headList}
    }

    onHandelDayRest (week_day,flag,index,nextWeekInfoList) {
        let ids = ''
        for(let item of nextWeekInfoList[index]){
            ids = `${ids},${item.id}`
        }
        Taro.navigateTo
        this.props.onHandelDayRest(week_day,flag,ids.substr(1))
    }

    onHandelTimeRest (id,flag) {
        this.props.onHandelTimeRest(id,flag)
    }

    render() {
        let {nextWeekInfo } = this.props
        console.log('nextWeekInfo')
        console.log(nextWeekInfo)
        let { nextWeekInfoList, headList} = this._disposeProps(nextWeekInfo)
        return (
            <View className={style.wrapper}>
                <View className={style.contentBox}>
                    <View className={style.headerBox}>
                        {
                            headList.map((item,index)=>
                                <View className={style.dayHeaderItem} onClick={this.onHandelDayRest.bind(this,item.h1,item.flag,index,nextWeekInfoList)}>
                                    <View>{item.h1}</View>
                                    <View className={style.h2}>{item.h2}</View>
                                </View>
                                )
                        }
                    </View>
                    <View className={style.dayBox}>
                        {
                            nextWeekInfoList.map(dayItem => 
                                <View className={style.dayTimeList}>
                                    {
                                        dayItem.map(item=>
                                            // 10=已休息,20=已确认,30=待确认,40=无预约
                                            item.schedule_flag == 10 ? <View className={`${style.timeItem} ${style.disableItem}`} onClick={this.onHandelTimeRest.bind(this,item.id,item.schedule_flag)}>休息</View> : 
                                                item.schedule_flag == 30 ? <View className={`${style.timeItem} ${style.order}`}>{item.time_code}</View> : 
                                                    item.schedule_flag == 40 ? <View className={`${style.timeItem} ${style.nullItem}`} onClick={this.onHandelTimeRest.bind(this,item.id,item.schedule_flag)}>{item.time_code}</View> : 
                                                        item.schedule_flag == 20 ? <View className={`${style.timeItem} ${style.order}`}>
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

                <View className={style.tipsBox}>
                    <View className={style.tipsItem}>
                        <View className={`${style.circular} ${style.lookFour}`}></View>
                        <View className={style.text}>点击选择下周休息时间（点击日期选择当天休息）</View>
                    </View>
                </View>
            </View>
        )
    }
}

export default NextWeekSchedule