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
            isOpened : false,
            schedule_id:'',
            order: { reserve : {}}
        }
    } 

    componentDidMount () {
        const order_id = this.$router.params.order_id
        const schedule_id = this.$router.params.schedule_id
        this.init(order_id)
        this.setState({
            order_id,schedule_id
        })
    }

    init (id){
        _fetch({url:'/masterin/detail',payload: {ids: id},method: 'POST',autoLogin: true}) //判断登录有没有过期
        .then(res => {
            this.setState({
                order:res.order[0]
            })
        })
        .catch(err=>console.log(err))
    }
    
    getSex (flag) {
        return flag == 0 ? '女' : '男'
    }

    //模态框关闭
    onHandleCancel () {
        this.setState({isOpened: false})
    }

    //模态框确认,并设置状态为已完成，再初始化
    onHandleConfirm () {
        let { id } = this.state.order
        _fetch({url:'/masterin/finish',payload: { id },method: 'POST',autoLogin: true}) //判断登录有没有过期
        .then(res => {
        this.setState({isOpened: false})
            this.setState({isOpened: false})
            this.init(id)
        })
        .catch(err=>console.log(err))
        
    }

    // 展示模态框
    onShowModal () {
        this.setState({ isOpened: true })
    }

    render() {
        let { isOpened, order, order : { id, order_flag, order_no, reserve : { service_name, schedule_code, name, sex_data, mobile, wx_number, schedule_id } } }= this.state

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

                <PhoneWechet contectInfo={ { mobile, wx_number } }/>

                <ConsultInfo order={order}/>

                <FooterBtn 
                    orderInfo={ {init:this.init.bind(this), id, order_flag, schedule_id } }
                    onHandleConfirm={this.onHandleConfirm.bind(this)}
                    onShowModal={this.onShowModal.bind(this)}
                />

                <AtModal
                    isOpened = {isOpened}
                    cancelText='取消'
                    confirmText='确认'
                    onCancel={ this.onHandleCancel.bind(this) }
                    onConfirm={ this.onHandleConfirm.bind(this) }
                    content='确定完成服务？'
                />
            </View>
        )
    }
}

export default PersonalInfo