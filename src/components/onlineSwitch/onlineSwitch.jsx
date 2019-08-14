import Taro from '@tarojs/taro'
import { View, Text, Switch } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import * as actions from '@/actions/master'
import style from './onlineSwitch.module.scss'
 
class OnlineSwitch extends Taro.Component {
    constructor (props) {
		super(props)
    }

    handleSwitch () {
        this.props.Set_Online(!this.props.onlineFlag)
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