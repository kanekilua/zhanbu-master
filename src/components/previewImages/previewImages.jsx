
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import style from './previewImages.module.scss'
/**
 * 图片预览组件
 * 传入图片数组images，索引index，是否显示的判断值isOpened和设置isOpened为false的关闭方法
 */
class PreviewImages extends Taro.Component {
    static defaultProps = {
        images: ['',''],
        index: 0
    }

    constructor (props) {
        super(props)
    } 

    onCloseImage (e) {
        this.props.onCloseImage()
        e.stopPropagation()
    }

    hide = {
        visibility:'hidden'
    }

    show = {
        visibility:'visible'
    }

    render() {
        let { images, index, isOpened } = this.props

        return (
            <View className={style.wrapper} style={isOpened ? this.show : this.hide}>
                <View className={style.mask} onClick={this.onCloseImage.bind(this)}>
                    <View className={style.imageBox} onClick={this.onCloseImage.bind(this)}>
                        <View className={style.imageWrapper}>
                            <Image className={style.image} src={images[index]} mode="widthFix"/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default PreviewImages