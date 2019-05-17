import Taro from '@tarojs/taro'
import { View, Image,} from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import style from './index.module.scss'
import './index.scss'
import GET from './assets/get.png'

import OrderCart from '@/components/orderCart/orderCart'
import HeaderTitle from '@/components/headerTitle/headerTitle'


 
class Index extends Taro.Component {
    config = {
        navigationStyle: 'custom'
    }
	constructor (props) {
		super(props)
		this.state = { 
			current: 0,
        }
	}
	
	handleClick (value) {
		this.setState({
			current: value
		})
	}

    
	render () {
		const tabList = [{ title: '未读' }, { title: '已读' }]
		return (
			<View className={style.wrapper}>
                <HeaderTitle
                    title='消息'
                />
				<AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
					<AtTabsPane current={this.state.current} index={0} >
						<View className={style.orderList}>
							<View className={style.allCheckBox}>
								<View className={style.boxLeft}>
									<View className={`${style.radio} ${style.radioChecked}`}>
										<Image className={style.getImage} src={GET}/>
									</View>
									<View className={style.text}>全选</View>
								</View>
								<View className={style.boxRight}>知道了</View>
							</View>
							<View className={style.orderCattItem}>
								<View className={`${style.radio} ${style.radioChecked}`}>
									<Image className={style.getImage} src={GET}/>
								</View>
								<View className={style.redioContentBox}>
									<OrderCart orderInfo={{}}/>
								</View>
								
							</View>
						</View>
					</AtTabsPane>
					<AtTabsPane current={this.state.current} index={1}>
						<View className={style.orderList}>
							<View className={style.itemBox}>
								<OrderCart orderInfo={{}}/>
							</View>
						</View>
					</AtTabsPane>
				</AtTabs>
			</View>
		)
	}
}

export default Index