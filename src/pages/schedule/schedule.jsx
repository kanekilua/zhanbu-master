import Taro from '@tarojs/taro'
import { View, Image, } from '@tarojs/components'
import _fetch from '@/utils/fetch.js'
import HeaderTitle from '@/components/headerTitle/headerTitle'
import LineTitle from '@/components/lineTitle/lineTitle' 
import ScheduleConfirm from './scheduleConfirm/scheduleConfirm'
import NextWeekSchedule from './nextWeekSchedule/nextWeekSchedule'

import style from './schedule.module.scss'

class Schedule extends Taro.Component {
    constructor (props) {
        super(props)
        this.state = {
            scheduleInfo: [
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
            scheduleInfoHistory:[],
            allCheckedFlag:false,
            ids:'',

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
            ]
        }
    } 

    init () {
        _fetch({url:'/masterin/schedule_list',payload: {},method: 'POST',autoLogin: true}) //判断登录有没有过期
            .then(res => {
                this._disposeCcheduleList(res)
            })
            .catch(err=>console.log(err))
    }

    componentWillMount () {
        this.init();
    }
    
    //处理请求获得的数组，得到本周预约数组和下周预约数组
    _disposeCcheduleList (list) {
        let lineIndex = ''
        let firstDay = list[0].week_day
        let nextWeekInfo = []
        let scheduleInfo = []
        if(list.length>25){
            for(let i in list){
                if(i>10){
                    if(list[i].week_day == firstDay){
                        lineIndex = i
                        break
                    }
                }
            }
            nextWeekInfo = list.slice(lineIndex,(list.length))
            scheduleInfo = list.slice(0,lineIndex)
        }else{
            nextWeekInfo = []
            scheduleInfo = list
        }
        let scheduleInfoHistory = JSON.parse(JSON.stringify(scheduleInfo))

        this.setState({
            nextWeekInfo,
            scheduleInfo,
            scheduleInfoHistory,
        })
    }

    //全选
    onAllCheck (allCheckedFlag) {
        let { scheduleInfo, scheduleInfoHistory, ids} = this.state
        // allCheckedFlag  true 选中 false 取消
        if(allCheckedFlag){
            for(let i in scheduleInfo){
                scheduleInfo[i].schedule_flag == 30 ? ((scheduleInfo[i].schedule_flag = 20) && (ids=`${ids},${scheduleInfo[i].id}`)) : ''
            }
        }else{
            scheduleInfo= JSON.parse(JSON.stringify(scheduleInfoHistory))
            ids=' '
        }

        this.setState({
            scheduleInfo,
            allCheckedFlag,
            ids:ids.substr(1)
        })
    }
    //一键确认
    onConfirm () {
        let {ids} = this.state
        if(ids == ''){
            return
        }
        let params = {ids,type:10}
        _fetch({url:'/masterin/schedule_set',payload: params,method: 'POST',autoLogin: true}) //判断登录有没有过期
        .then(res => {
            this.init()
        })
        .catch(err=>console.log(err))
    }

    //点击待确认预约的item跳转到详情页
    onHandelSchedule (order_id,schedule_id) {
        Taro.navigateTo({
            url:`/pages/personalInfo/personalInfo?order_id=${order_id}&schedule_id=${schedule_id}`
        })
    }

    //一键休息
    // week_day为星期几
    onHandelDayRest (week_day,flag,ids) {
        let {nextWeekInfo} = this.state
        let params = {
            ids
        }
        if(flag){
            for(let i in nextWeekInfo){
                nextWeekInfo[i].week_day == week_day ? nextWeekInfo[i].schedule_flag = 40 : ''
            }
            params.type=40
        }else{
            for(let i in nextWeekInfo){
                nextWeekInfo[i].week_day == week_day ? nextWeekInfo[i].schedule_flag = 10 : ''
            }
            params.type=20
        }

        //接口设置 10设置为已确认    20设置为休息   40设置为工作
        this.setState({nextWeekInfo})
        _fetch({url:'/masterin/schedule_set',payload: params,method: 'POST',autoLogin: true}) //判断登录有没有过期
        .then(res => {
            this.init()
        })
        .catch(err=>console.log(err))
    }

    //单独修改某个时间的休息状态 
    onHandelTimeRest (id,flag) {
        let params = {
            ids:id
        }
        if(flag == 40){
            params.type = 20
        }else if(flag == 10){
            params.type = 40
        }

        _fetch({url:'/masterin/schedule_set',payload: params,method: 'POST',autoLogin: true}) //判断登录有没有过期
        .then(res => {
            this.init()
        })
        .catch(err=>console.log(err))

    }

    render() {
        // 10=已休息,20=已确认,30=待确认,40=无预约

        let { scheduleInfo, allCheckedFlag, nextWeekInfo} = this.state

        return (
            <View className={style.scheduleWrap}>
                <HeaderTitle
                    title='大师档期'
                />
                <LineTitle>档期确认</LineTitle>
                <ScheduleConfirm
                    scheduleInfo={scheduleInfo}
                    allCheckedFlag={allCheckedFlag}
                    onAllCheck={this.onAllCheck.bind(this)}
                    onConfirm={this.onConfirm.bind(this)}
                    onHandelSchedule={this.onHandelSchedule.bind(this)}
                />
                <LineTitle>下周档期</LineTitle>
                <NextWeekSchedule 
                    nextWeekInfo={nextWeekInfo}
                    onHandelDayRest={this.onHandelDayRest.bind(this)}
                    onHandelTimeRest={this.onHandelTimeRest.bind(this)}
                />
            </View>
        )
    }
}


export default Schedule