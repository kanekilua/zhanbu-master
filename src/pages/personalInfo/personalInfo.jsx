import Taro from '@tarojs/taro'
import { View, Image, Text} from '@tarojs/components'
import _fetch from '@/utils/fetch.js'
import { AtModal } from 'taro-ui'

// import LineTitle from '@/components/lineTitle/lineTitle'
import Header from '@/components/header/header'



import OrderInfo from './orderInfo/orderInfo'
import PhoneWechet from './phoneWechet/phoneWechet';
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
            showConfirm : false,
            schedule_id:'',

            order: {
                "id": 19,
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
                "order_flag": "30",
                "schedule_flag": "20"
            }
        }
    } 

    componentWillMount () {
        this.setState({
            order_id:this.$router.params.order_id,
            schedule_id:this.$router.params.schedule_id
        },()=>{
            this.init(this.state.order_id)
        })
    }

    init (id){
        _fetch({url:'/reserve/detail',payload: {id},method: 'POST',autoLogin: true}) //判断登录有没有过期
        .then(res => {
            console.log(res.order)
            this.setState({
                order:res.order
            })
        })
        .catch(err=>console.log(err))
    }
    
    getSex (flag) {
        return flag == 0 ? '女' : '男'
    }

    //模态框关闭
    handleCancel () {
        this.setState({showConfirm:false})
    }

    //模态框确认,并设置状态为已完成，再初始化
    handleConfirm () {
        this.setState({showConfirm:false})
        let { order_id } = this.state
        _fetch({url:'/masterin/order_set',payload: { id: order_id, type: '20' },method: 'POST',autoLogin: true}) //判断登录有没有过期
        .then(res => {
            this.init()
        })
        .catch(err=>console.log(err))
        
    }

    // 展示模态框
    showModal (id,type) {
        this.setState({ showConfirm:true })
    }

    render() {
        let { showConfirm, schedule_id, order, order : { id, order_flag, schedule_flag, order_no, reserve : { service_name, schedule_code, name, sex_data, mobile, wx_number } } }= this.state

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
                <Header
                    headerTitle='个人信息'    
                />

                <OrderInfo orderInfo={orderInfo}/>

                {/* <LineTitle>沟通方式</LineTitle> */}
                <PhoneWechet contectInfo={ { mobile, wx_number } }/>

                <ConsultInfo order={order}/>
                <FooterBtn 
                    orderInfo={ {init:this.init.bind(this), id, order_flag, schedule_flag, schedule_id } }
                    showModal={this.showModal.bind(this)}
                />


                <AtModal
                    isOpened = {showConfirm}
                    cancelText='取消'
                    confirmText='确认'
                    onCancel={ this.handleCancel.bind(this) }
                    onConfirm={ this.handleConfirm.bind(this) }
                    content='确定完成服务？'
                />
            </View>
        )
    }
}

export default PersonalInfo