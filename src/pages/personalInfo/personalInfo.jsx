import Taro from '@tarojs/taro'
import { View, Image, Text} from '@tarojs/components'
import _fetch from '@/utils/fetch.js'
import LineTitle from '@/components/lineTitle/lineTitle'
import HeaderTitle from '@/components/headerTitle/headerTitle'

import phone from './assets/phone.png'
import wechat from './assets/wechat.png'

import OrderInfo from './orderInfo/orderInfo'
import ConsultInfo from './consultInfo/consultInfo'
import FooterBtn from './footerBtn/footerBtn'

import style from './personalInfo.module.scss'
class PersonalInfo extends Taro.Component {
    static defaultProps = {
        
    }
    constructor (props) {
        super(props)
        this.state = {
            order_id:'',
            order: {
                "id": 6,
                "order_no": "2019040457545610",
                "total_price": "100.00",
                "pay_price": "100.00",
                "pay_status": "10",
                "pay_time": 0,
                "order_status": "20",
                "createtime": 1554370649,
                "advisory_status": "10",
                "reserve": {
                    "id": 6,
                    "service_id": 1,
                    "service_name": "财运",
                    "service_price": "100.00",
                    "total_price": "100.00",
                    "order_id": 6,
                    "user_id": 2,
                    "createtime": 1554370649,
                    "updatetime": 1554374967,
                    "master_id": 1,
                    "schedule_id": 18,
                    "schedule_code": "20190403 16:30 周三",
                    "schedule_time": 1554280200,
                    "name": "测试人",
                    "sex_data": "0",
                    "birthday": "2019-03-20 11:26:26",
                    "birth_address": "广东",
                    "mobile": "13111111111",
                    "wx_number": "1211131",
                    "hand_images": "http://gameleyuan.oss-cn-hangzhou.aliyuncs.com/uploads/reserve/20190404/775239f7fc058545a15749dd6ac3d457.jpg",
                    "face_images": "http://gameleyuan.oss-cn-hangzhou.aliyuncs.com/uploads/reserve/20190404/88ccc4437a5fef24c60635c7cf5bef7c.jpg",
                    "problem_content": "事业问题",
                    "expire_time": 1554370709,
                    "master_name": "陈大师"
                },
                "order_flag": "10"
            }
        }
    } 

    componentWillMount () {
        this.setState({
            order_id:this.$router.params.order_id
        },()=>{
            this.init(this.state.order_id)
        })
    }

    init (order_id){
        // _fetch({url:'/reserve/detail',payload: {order_id},method: 'POST',autoLogin: true}) //判断登录有没有过期
        // .then(res => {
        //     console.log(res)
        //         this.setState({
        //             order:res
        //         })
        // })
        // .catch(err=>console.log(err))
    }
    
    getSex (flag) {
        return flag == 0 ? '女' : '男'
    }

    render() {
        let { order, order : { order_status, order_no, reserve : { service_name, schedule_code, name, sex_data, mobile, wx_number } } }= this.state

        //orderInfo的参数
        let orderInfo = [
            {title:"订单号",content:order_no},
            {title:"咨询项目",content:service_name},
            {title:"预约时间",content:schedule_code},
            {title:"姓名",content:name},
            {title:"性别",content:this.getSex(sex_data)},
            {title:"手机号",content:mobile},
            {title:"微信号",content:wx_number},
        ]

        return (
            <View className={style.wrapper}>
                <HeaderTitle
                    title='个人信息'
                />

                <OrderInfo orderInfo={orderInfo}/>

                {/* <LineTitle>沟通方式</LineTitle> */}
                <View className={style.communicationBox}>
                    <View className={style.communicationLeft}>
                        <Image
                            className={style.leftIco}
                            src={phone}
                        />
                        <View className={style.communicationTxt}>
                            <View className={style.top}>电话沟通</View>
                            <View className={style.bottom}>(90分钟)</View>
                        </View>
                    </View>
                    <View className={style.communicationRight}>
                        <Image
                            className={style.rightIco}
                            src={wechat}
                        />
                        <View className={style.communicationTxt}>
                            <View className={style.top}>微信对话</View>
                            <View className={style.bottom}>(90分钟)</View>
                        </View>
                    </View>
                </View>

                <ConsultInfo order={order}/>
                <FooterBtn order_status={order_status}/>
            </View>
        )
    }
}

export default PersonalInfo