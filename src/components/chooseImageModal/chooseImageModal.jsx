    // 父组件调用
    // <ChooseImageModal ref={this.refChooseImageModal}/>
    // 方法：
    // <View onClick={this.handleChooseImage.bind(this)}></View> 点击弹出模态框

    // refChooseImageModal = (node) => this.chooseImageModal = node; 传递实例

    // handleChooseImage (){ 点击调用相册
    //     this.chooseImageModal.handlePopupShow();
    // }

import Taro from '@tarojs/taro'
import { View, Image} from '@tarojs/components'
import { AtActionSheet, AtModal } from "taro-ui"

import './chooseImageModal.scss'
import style from './chooseImageModal.module.scss'

class ChooseImageModal extends Taro.Component {
    constructor (props) {
        super(props)
        this.state = {
            formData : {
                images : [],
            },
            popupOpen : false,
        }
    }

    handlePopupClose () {
        this.setState({
            popupOpen : false
        })
    }

    handlePopupShow () {
        this.setState ({
            popupOpen : true
        })
    }

    handleImageSelect (sourceType) {
        Taro.chooseImage({
            count : 1,
            sourceType : !sourceType ? 'album' : 'camera',
            success : (res) => {
                this.setState((preState) => {
                    let imagesTmp = preState.formData.images
                    imagesTmp.push(res.tempFilePaths)
                    return {
                        formData : {
                            ...preState.formData,
                            images : imagesTmp
                        },
                        popupOpen : false
                    }
                })
            }
        })
    }

    render() {
        return (
            <View className='ChooseImageModalWrap'>
                <AtActionSheet 
                    isOpened = { this.state.popupOpen }
                    title = '上传图片'
                    cancelText= '取消'
                    onClose = {this.handlePopupClose.bind(this)}
                    >
                    <View 
                        className={style.popupItem}
                        onClick={this.handleImageSelect.bind(this,0)}>从图库选择照片</View>
                    <View 
                        className={style.popupItem}
                        onClick={this.handleImageSelect.bind(this,1)}>拍照</View>
                </AtActionSheet>
            </View>
        )
    }
}


export default ChooseImageModal