// import { useEffect, useLayoutEffect, useReducer, useState, useRef, useCallback, useMemo } from '@tarojs/taro'
import { View } from '@tarojs/components'
import copy from 'copy-to-clipboard';
import style from './questionItem.module.scss'
import ICONDELETE from '@/assets/delete.png';
import { func } from 'prop-types';
/**
 * 我的课程项 item
 * @param {*} props 
 */
function QuestionItem (props) {

    const instructions = [
        {status:'60',text:'待回复'},
        {status:'70',text:'已回复'}
    ]

    function _getIns (status, instructions) {
        for (let i in instructions){
            if(instructions[i].status == status){
                return instructions[i].text
            }
        }
        return ''
    }

    function handelCopy (order_no) {
        if(copy(order_no)){
            copy(order_no)
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

    function addZero(num) {
        return num > 9 ? num : `0${num}`
    }

    function _disposeTime (time) {
        let date = new Date(time)
        let year = date.getFullYear()
        let mouth = date.getMonth()+1
        let day = date.getDate()
        let hour=date.getHours(); 
        let minute=date.getMinutes(); 
        let second=date.getSeconds(); 
        return `${year}-${addZero(mouth)}-${addZero(day)} ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`
    }

    let { order_no, faq : { name, problem_content, createtime, total_price, avatar, nickname, user_accid },  order_flag, problem } = props.Info
    const userInfo = {
        avatar, nickname,
        accid: user_accid
    }

    return (
        <View className={style.wrapper} onClick={(e)=>{props.onHandleItem(order_flag,problem,order_no,userInfo)}}>
            <View className={style.top}>
                <View className={style.orderId}>订单号：{order_no}</View>
            <View className={style.copyBtn} onClick={(e)=>{e.stopPropagation();handelCopy(order_no)}}>复制</View>
            </View>
            <View className={style.bottom}>
                <View 
                    className={style.Icon}
                    style={`background:url('${avatar}') center / cover no-repeat;`}
                    ></View>
                <View className={style.content}>
                    <View className={style.master}>用户姓名：{name}</View>
                    <View>提问：{ problem_content ? problem_content : '您还没有提问' }</View>
                    <View>订单时间：{_disposeTime(createtime*1000)}</View>
                    <View className={style.price}>￥{total_price}</View>
                </View>
            </View>
            <BtnList status={order_flag} problem={problem} Info={props}/>
            <View className={style.status}>{_getIns(order_flag,instructions)}</View>
        </View>
    )
} 

/**
 * 按钮显示组件
 * @param {status} props 
 */
function BtnList (props) {
    let { status, problem } = props

    return(
        <View className={style.btnWrapper}>
            { status == 20 && problem === false && <View className={style.btn} onClick={(e)=>props.Info.onHandleBtn(e,'wanshan',props.Info.Info.order_no)}>完善资料</View>}
            { status == 10 && <View className={style.btn} onClick={(e)=>props.Info.onHandleBtn(e,'wenda',props.Info.Info.order_no)}>重新问答</View>}
            { (status == 10 || status == 30) && <View
                className={style.btnDelete}
                style={`background:url('${ICONDELETE}') center / cover no-repeat;`}
                onClick={(e)=>props.Info.onHandleBtn(e,'shanchu',props.Info.Info.order_no)}
                ></View>}
        </View>
    )
}

export default QuestionItem