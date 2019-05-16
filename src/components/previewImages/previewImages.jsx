
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

    onCloseImage () {
        this.props.onCloseImage()
    }

    render() {
        let { images, index, isOpened } = this.props

        return (
            isOpened && 
                <View className={style.wrapper} >
                
                    <View className={style.mask} onClick={this.onCloseImage.bind(this)}>
                        <View className={style.imageBox} onClick={this.onCloseImage.bind(this)}>
                            <Image className={style.image} src={images[index]} />
                        </View>
                    </View>
                    
            
                
                </View>
        )
    }
}

export default PreviewImages