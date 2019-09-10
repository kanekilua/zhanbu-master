import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import MasterMine from './masterMine/masterMine'
import _fetch from '@/utils/fetch.js'
import defaultAvatar from '@/assets/avatar.png'
import app from '@/utils/appData'

class Mine extends Taro.Component {
    constructor (props) {
        super(props)
        this.state = {
            master_data: {
                name: '未登录',
                avatar: defaultAvatar,
                service_num: 0,
                flash_num: 0
            }
        }
    }

    init () {
        const master_data = Taro.getStorageSync('master_data')
        if(master_data) {
            this.setState({master_data})
        }else {
            Taro.redirectTo({
                url: '/pages/login/login'
            })   
        }
        _fetch({url: '/masterin/get_master_info'}).then ((res) => {
            this.setState({
                master_data: res.master_data
            })
        }).catch((err) => {Taro.redirectTo({url: '/pages/login/login'})})
    }

    //退出登录后更新视图
    handleRefresh () {
    //    this.clearMasterInfo()
        app.store.dispatch({
            type: 'init_data'
        })
        app.globalData.nim.disconnect()
        Taro.redirectTo({
            url: '/pages/login/login'
        })
    }

    componentDidMount () {
        this.init();
    }

    componentDidShow () {
        this.init();
    }
    render() {
        let { master_data } = this.state
        return (
            <View>
                <MasterMine
                    master_data={master_data}
                    onRefresh = {this.handleRefresh.bind(this)}
                />
            </View>
        )
    }
}

export default Mine