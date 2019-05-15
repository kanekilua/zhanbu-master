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
            reserve_num: 0,
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
        if(this.props.master_data.name === '未登录') {
            this.setState({
                showDelete : false
            })
            return;
        }
        // 若已登录
        this.setState({
            showDelete : false
        })
        // 退出登录，更新token和用户信息
        _fetch({url:'/app/logout',payload: null,method: 'POST',autoLogin:false, showToast: true})
        .then((res)=>
            console.log(res)
        )
        this.props.onRefresh(); //刷新父组件数据
    }
    componentDidMount () {
        checkLogin();
    }

    
    render() {
        let { name, avatar, reserve_num } = this.props.master_data
        return (
            <View className={style.masterMineWrap}>
                <View className={style.background}>
                </View>
                <View className={style.userCart}>
                    <Image
                        className={style.avatar}
                        src={avatar}
                        onClick={()=>{
                            Taro.navigateTo({
                                url: '/pages/login/login'
                            })
                        }}
                    />
                    <View className={style.nickName}>{name}</View>
                    <View className={style.hot}>
                        <Image
                            className={style.hotIco}
                            src={hotIco}
                        />
                        <Text className={style.hotNum}>{reserve_num}</Text>
                    </View>
                    <Button className={style.serverNum}>服务人数</Button>
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