import { useEffect, useLayoutEffect, useReducer, useState, useRef, useCallback, useMemo } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import style from './components.module.scss'

/**
 * 闪测订单进度条
 * @param {pro} props 
 */
function  OrderProgressBar (props) {
    const titleList = [ {status:'0',text:'选择问题'}, {status:'1',text:'确认订单'}, {status:'2',text:'完成支付'}, {status:'3',text:'填写信息'}, {status:'4',text:'等待回复'} ]

    function _getProgress(pro) {
        switch(pro){
            case '0' :
                return 8
            case '1' :
                return 29
            case '2' :
                return 50
            case '3' :
                return 70
            case '4' :
                return 97
        }
    }

    let progressCSS = {
        width:`${_getProgress(props.pro)}%`
    }

    let roundCSS = {
        'margin-left':`${_getProgress(props.pro)-2.5}%`
    }

    return(
        <View className={style.proWrapper}>
            <View className={style.top}>
                {
                    titleList.map((item)=>
                        <View className={item.status == props.pro && style.checkText }>{item.text}</View>
                    )
                }
            </View>
            <View className={style.bottom}>
                <View className={style.progress} style={progressCSS}></View>
                <View className={style.round} style={roundCSS}></View>
            </View>
        </View>
    )
}

/**
 * 展示闪测信息的卡片
 * @param { Info : {  } } props 
 */
function MessageCard (props) {

    function _getSex (sex) {
        return sex == 1 ? '男' : '女'
    }

    // type: faq -- 问答, reserve -- 服务
    let { name, sex, birthday, address, num, type, problem_content } = props.Info

    return (
        <View className={style.MessageCardWrapper}>
            <View className={style.item}>
                <View className={style.label}>真实姓名<Text style="color:#FE0000;">*</Text></View>
                <View className={style.show}>{name}</View>
            </View>
            <View className={style.item}>
                <View className={style.label}>性别<Text style="color:#FE0000;">*</Text></View>
                <View className={style.show} style="border:none;">{_getSex(sex)}</View>
            </View>
            <View className={style.item}>
                <View className={style.label}>出生日期<Text style="color:#FE0000;">*</Text></View>
                <View className={style.show}>{birthday}</View>
            </View>
            <View className={style.item}>
                <View className={style.label}>出生地址<Text style="color:#FE0000;">*</Text></View>
                <View className={style.show}>{address}</View>
            </View>
            {
                type && type === 'faq' &&
                <View className={style.item}>
                    <View className={style.label}>选三个数<Text style="color:#FE0000;">*</Text></View>
                    <View className={style.numShow}>
                        <View className={style.numBox}>{num.split(',')[0]}</View>
                        <View className={style.numBox}>{num.split(',')[1]}</View>
                        <View className={style.numBox}>{num.split(',')[2]}</View>
                    </View>
                </View>
            }
            {
                type && type === 'reserve' &&
                <View className={style.item}>
                    <View className={style.label}>咨询问题<Text style="color:#FE0000;">*</Text></View>
                    <View className={style.show}>{problem_content}</View>
                </View>
            }
        </View>
    )
}


/**
 * 蒙版展示弹窗box
 * @param {isOpened, children, onHandleClose()} props 
 */
function PopupWindow (props) {
    return (
        <View className={style.mask} style={props.isOpened ? '' : 'visibility:hidden;'}>
            <View className={style.popupWindow}>
                <View 
                    className={style.closeBtn}
                    onClick={()=>{
                        props.onHandleClose
                    }}
                    ></View>
                {props.children}
            </View>
        </View>
    )
}

/**
 * 弹框操作组件
 * @param { isOpened,  Info : { title ,leftBtnText, rightBtnText } } props 
 */
function OperationPopupWindow (props) {

    const { title ,leftBtnText, rightBtnText } = props.Info

    function leftEvent (e) {
        e.stopPropagation()
        props.leftBtnEvent()
    }

    function rightEvent (e) {
        e.stopPropagation()
        props.rightBtnEvent()
    }

    
    return (
        <View className={style.opwWrapper} style={props.isOpened ? '' : 'visibility:hidden;'}>
            <View className={style.content}>
                <View className={style.title}>{title}</View>
                {props.children}
                <View className={style.btnBox}>
                    <View className={style.btn} onClick={leftEvent}>{leftBtnText}</View>
                    <View className={style.btn} onClick={rightEvent}>{rightBtnText}</View>
                </View>
            </View>
        </View>
    )
}

/**
 * 大师简介页小标题组件
 * @param {title} props 
 */
function IntroductionTitle(props) {
    return(
        <View className={style.IntroductionTitle}>{props.title}</View>
    )
}

/**
 * 大师简介任职头衔组件
 * @param {title} props 
 */
function RankTitle(props){
    return (
        <View className={style.RankTitle}>{props.title}</View>
    )
}

export { OrderProgressBar, MessageCard, PopupWindow, OperationPopupWindow, IntroductionTitle, RankTitle }