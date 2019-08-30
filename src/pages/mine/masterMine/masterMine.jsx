import Taro from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { AtModal } from 'taro-ui'
import MenuList from './menuList/menuList'
import _fetch from '@/utils/fetch.js'
import checkLogin from '@/utils/checkLogin.js'

import defaultAvatar from '@/assets/avatar.png'
import hotIco from '../assets/hot.png'
import style from './masterMine.module.scss'
import './masterMine.scss'

class MasterMine extends Taro.Component {
    constructor (props) {
        super(props)
        this.state= {
            showDelete: false
        }
    }
    

    static defaultProps = {
        master_data: {
            name: '未登录',
            avatar: defaultAvatar,
            service_num: 0,
            flash_num: 0
        }
    }
    // 退出登录
    logout() {
        this.setState({
            showDelete : true
        })
    }
    // 取消
    handleCancel () {
        this.setState({
            showDelete : false
        })
    }
    // 确认退出登录
    handleConfirm () {
        // 若已登录
        this.setState({
            showDelete : false
        })
        // 退出登录，更新token和用户信息
        _fetch({url:'/app/logout',payload: null,method: 'POST',autoLogin:false, showToast: true})
        this.props.onRefresh() //刷新父组件数据
    }
    componentDidMount () {
        checkLogin();
    }

    
    render() {
        let { name, avatar, service_num, flash_num } = this.props.master_data
        return (
            <View className={style.masterMineWrap}>
                <View className={style.background}>
                    <Image 
                        className={style.avatar}
                        src={avatar}/>
                    <View className={style.nickName}>{name}</View>
                </View>
                <View className={style.reserveCount}>
                    <View className={style.reserveWrap}>
                        <View className={style.content}>
                            <View className={style.num}>{service_num}</View>
                            <View className={style.text}>咨询完成数</View>
                        </View>
                    </View>
                    <View className={style.separate}></View>
                    <View className={style.flashCount}>
                        <View className={style.content}>
                            <View className={style.num}>{flash_num}</View>
                            <View className={style.text}>闪测完成数</View>
                        </View>
                    </View>
                </View>
                <MenuList/>
                <View className={style.logout}>
                    <Button
                        className={style.logoutBtn}
                        onClick={this.logout.bind(this)}
                    >退出登录</Button>
                </View>
                <AtModal
                    isOpened = {this.state.showDelete}
                    cancelText='取消'
                    confirmText='确认'
                    onCancel={ this.handleCancel.bind(this) }
                    onConfirm={ this.handleConfirm.bind(this) }
                    content='确定退出登录？'
                />
            </View>
        )
    }
}

export default MasterMine