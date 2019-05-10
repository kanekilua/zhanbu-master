import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import style from './lineTitle.module.scss'
class LineTitle extends Taro.Component {
    render() {
        return (
            <View className={style.titleBox}>
                <View className={style.line}></View>
                <View className={style.title}>{this.props.children}</View>
                <View className={style.line}></View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LineTitle)