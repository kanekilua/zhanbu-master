import Taro from '@tarojs/taro'
import { View, Text, Switch } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import * as actions from '@/actions/master'
import style from './onlineSwitch.module.scss'
import _fetch from '@/utils/fetch'
 
class OnlineSwitch extends Taro.Component {
    constructor (props) {
		super(props)
    }

    handleSwitch () {
        _fetch ({url:'/masterin/flash_set', payload:{ status: this.props.onlineFlag ? 20 : 10 }}).then((res) => {
            this.props.Set_Online(!this.props.onlineFlag)
            let master_data = Taro.getStorageSync('master_data')
            master_data.flash_status = this.props.onlineFlag ? 20 : 10
            Taro.setStorageSync('master_data', master_data)
        })
    }

	render () {
        const { onlineFlag } = this.props
		return (
            <View className={style.wrapper}>
                <Text className={style.tip}>{onlineFlag ? '上线' : '忙碌'}</Text>
                <Switch 
                    checked={onlineFlag}
                    className={style.switch}
                    color="#5085D5"
                    onClick={this.handleSwitch.bind(this)}
                    ></Switch>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        onlineFlag : state.master.onlineFlag,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlineSwitch)