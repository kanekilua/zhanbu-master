import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import style from './loading.module.scss'
import loadingIco from './assets/loading.png'
class Loading extends Taro.Component {
    render() {
        return (
            <View className={style.loadingWrap}>
                {this.props.isOpened &&
                    <View className={style.loadingMask}>
                        <View className={style.content}>
                            <Image
                                className={style.loadingIco}
                                src={loadingIco}
                            />
                            <View className={style.loadingText}>{this.props.text}</View>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

export default Loading