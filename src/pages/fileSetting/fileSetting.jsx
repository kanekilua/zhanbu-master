import Taro from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import _fetch from '@/utils/fetch.js'

import Header from '@/components/header/header'
import SettingItem from '@/components/settingItem/settingItem'
import ChooseImageModal from'@/components/chooseImageModal/chooseImageModal'

import defaultAvatar from '@/assets/avatar.png'
import './fileSetting.scss'

class FileSetting extends Taro.Component {
    config = {
        navigationStyle: 'custom'
    }
	constructor (props) {
		super(props)
		this.state = { 
            isOpened: false,
            name: '',
            inputName: '',
            avatar: ''
        }
    }

     // `this.chooseImageModal` 会变成 `chooseImageModal` 组件实例的引用

    refChooseImageModal = (node) => this.chooseImageModal = node;
    
    handleChooseImage (){
        this.chooseImageModal.handlePopupShow();
    }

    handleCancel () {
        this.setState({
            isOpened: false
        })
    }
    // 确认修改名字
    handleConfirm() {
        let params = {

        }
        _fetch({url:'/app/userInfo',payload: {},method: 'POST',autoLogin: true})
        .then((res)=>{

        })
        this.setState({
            isOpened: false
        })
    }

    handleResetName () {
        this.setState({
            isOpened: true
        })
    }

    init () {
        Taro.getStorage({key: 'master_data'})
        .then((res) => {
            console.log(res.data)
            this.setState({
                name: res.data.name,
                avatar: res.data.avatar
            })
        })
    }

    componentDidMount () {
        this.init();
    }
    render() {
        let { name, avatar } = this.state
        return (
            <View className='fileSettingWrap'>
                <Header
                    headerTitle='个人资料'
                />
                <View className='settingItem'
                    onClick={this.handleChooseImage.bind(this)}
                >
                    <SettingItem
                        leftText='头像'
                        extraImage={ avatar ? avatar : defaultAvatar}
                    />
                </View>
                <View className='settingItem'
                    onClick={this.handleResetName.bind(this)}
                >
                    <SettingItem
                        leftText='姓名'
                        extraText={name}
                    />
                </View>
                <ChooseImageModal ref={this.refChooseImageModal}/>
                <AtModal
                    isOpened={ this.state.isOpened }
                >
                    <AtModalContent>
                        <Input placeholder='请输入您的姓名' className='inputName'
                            onInput={(e)=>{
                                this.setState({
                                    inputName: e.detail.value
                                },()=>console.log(this.state.inputName))
                            }}
                        />
                    </AtModalContent>
                    <AtModalAction> <Button onClick={ this.handleCancel.bind(this) }>取消</Button> <Button onClick={ this.handleConfirm.bind(this)}>确定</Button> </AtModalAction>
                </AtModal>
            </View>
        )
    }
}

export default FileSetting