import Taro from '@tarojs/taro'
import { View, Image, Text} from '@tarojs/components'

import PreviewImages from '@/components/previewImages/previewImages'
import calendar from '@/utils/calendar'
import style from './consultinfo.module.scss'
import CONSULT from './assets/consult.png'
class Consultinfo extends Taro.Component {
    static defaultProps = {
        
    }
    constructor (props) {
        super(props)
        this.state = {
            index:0,
            isOpened:false
        }
    } 

    //切割图片字符串为图片数组
    splitImages (str) {
        return str.split(',')
    }

    //获得公历和农历日期
    get_Gre_lunner_Calender (birthday) {
        //birthday = 2019-03-20 11:26:26
        let dateArr = birthday.split(' ')[0].split('-')

        let Gregorian = `${dateArr[0]}年 ${dateArr[1]}月 ${dateArr[2]}日`

        // calendar.solar2lunar(1987,11,01)
        let lunnerData = calendar.solar2lunar(dateArr[0],dateArr[1],dateArr[2])
        let lunar = `${lunnerData.lYear}年 ${lunnerData.lMonth}月 ${lunnerData.lDay}日`
        return {Gregorian,lunar}
    }

    onOpenImage (index) {
        this.setState({index:index, isOpened: true})
    }

    onCloseImage () {
        this.setState({isOpened: false})
    }



    render() {
        let { index, isOpened } = this.state
        let { order : { reserve : { birthday, birth_address, problem_content, hand_images, hand_face_images } } } = this.props
        let { Gregorian, lunar } = this.get_Gre_lunner_Calender(birthday)
        // let images = this.splitImages(hand_face_images)
        let images = this.splitImages(hand_images)

        // let images = ["http://gameleyuan.oss-cn-hangzhou.aliyuncs.com/uploads/reserve/20190404/775239f7fc058545a15749dd6ac3d457.jpg","http://gameleyuan.oss-cn-hangzhou.aliyuncs.com/uploads/reserve/20190404/88ccc4437a5fef24c60635c7cf5bef7c.jpg"]

        return (
            <View className={style.wrapper}>
                 <View className={style.title}>
                    <Image className={style.img} src={CONSULT} />
                    <View className={style.text}>咨询详情</View>
                </View>
                <View className={style.form}>

                    <View className={style.formItem}>
                        <View className={style.itemTitle}>出生日期：</View>
                        <View className={style.itemContent}>公历-{Gregorian}</View>
                    </View>

                    <View className={style.formItem}>
                        <View className={style.itemTitle}></View>
                        <View className={style.itemContent}>农历-{lunar}</View>
                    </View>

                    <View className={style.formItem}>
                        <View className={style.itemTitle}>出生地点：</View>
                        <View className={style.itemContent}>{birth_address}</View>
                    </View>

                    <View className={style.formItem}>
                        <View className={style.itemTitle} style="margin: 10px 0 10px;">手相面相照片：</View>
                        <View className={style.photoContent}>
                        {
                            images.map((item,index)=>
                                <View className={style.imageBox} onClick={this.onOpenImage.bind(this,index)}>
                                    <Image className={style.image} src={item}/>
                                </View>
                            )
                        }
                        </View>
                    </View>
                    
                    <View className={style.formItem}>
                        <View className={style.itemTitle} style="margin: 10px 0 10px;">咨询问题：</View>
                        <View className={style.itemContent} style="margin-left:5px;">{problem_content}</View>
                    </View>
                </View>

                <PreviewImages 
                    isOpened={isOpened}
                    images={images}
                    index={index}
                    onCloseImage={this.onCloseImage.bind(this)}
                />
            </View>
        )
    }
}

export default Consultinfo