import Taro from '@tarojs/taro'
import { View, Button, Input } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import _fetch from '@/utils/fetch.js'
import checkLogin from '@/utils/checkLogin.js'


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
            resetName: '',
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
            name: this.state.resetName
        }
        _fetch({url:'/masterin/edit_name',payload: params,method: 'POST',autoLogin: true, showToast: true, showStatus: true })
        .then((res)=>{
            console.log(res)
            if(res.data.code == 'success') { //修改成功
                this.setState({
                    name: this.state.resetName
                })
                // 更新storage的name,
                let master_data = Taro.getStorageSync('master_data');
                master_data.name = this.state.resetName;
                Taro.setStorageSync('master_data', master_data);
            }
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
            this.setState({
                name: res.data.name,
                avatar: res.data.avatar
            })
        })
    }

    componentDidMount () {
        checkLogin();
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
                        <Input placeholder='请输入您的姓名' className='resetName'
                            onInput={(e)=>{
                                this.setState({
                                    resetName: e.detail.value
                                },()=>console.log(this.state.resetName))
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