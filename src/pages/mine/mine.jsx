import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import MasterMine from './masterMine/masterMine'
import _fetch from '@/utils/fetch.js'
import defaultAvatar from '@/assets/avatar.png'

class Mine extends Taro.Component {
    constructor (props) {
        super(props)
        this.state = {
            master_data: {
                name: '未登录',
                avatar: defaultAvatar,
                reserve_num: 0,
            }
        }
    } 
    init () {
        const token = Taro.getStorageSync('token');
        if(!token){ //如果token为空
            this.clearMasterInfo();
        }else {
            _fetch({url:'/app/checkToken',payload: {},method: 'POST',autoLogin: false}) //判断登录有没有过期
                .then(res => {
                    if(!res.status) {
                        this.clearMasterInfo(); 
                    }
                })
                .catch(err=>console.log('token过期',err))
        }
        // 如果用户已登录
        Taro.getStorage({ key: 'master_data' })
        .then(res => {
            if(res.data){
                this.setState({
                    master_data: res.data
                })
            }
        })
        .catch(err=>console.log(err))
    }

    clearMasterInfo () {
        this.setState({
            master_data: {
                name: '未登录',
                avatar: defaultAvatar,
                reserve_num: 0,
            }
        })
    }

    //退出登录后更新视图
    handleRefresh () {
       this.clearMasterInfo();
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