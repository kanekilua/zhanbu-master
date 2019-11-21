import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import style from  './projectItem.module.scss'
import RightIcon from '@/assets/rightArrow.png'

class ProjectItem extends Component{
    static defaultProps = {
        Info:{
            icon:RightIcon,
            title:'默认',
            url:RightIcon,
            tips:false
        }
    }

    constructor (props) {
        super(props)
    }

    onHandelClick (url) {
        if(url){
            Taro.navigateTo({
                url
            })
        }
    }

    render () {
        let { icon, title, url, tips, tag } = this.props.Info

        return (
            <View className={style.wrapper} onClick={this.onHandelClick.bind(this,url)}>
                <View className={style.iconBox}>
                    {
                        tips && <View className={style.tips}></View>
                    }
                    <Image className={style[`icon-${tag}`]}  src={icon}/>
                </View>
                <View className={style.title}>{title}</View>
                <Image className={style.rightIcon} src={RightIcon} />
            </View>
        )
    }

}

export default ProjectItem