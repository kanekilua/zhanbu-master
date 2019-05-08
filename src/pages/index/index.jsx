import Taro from '@tarojs/taro'
import { View, Image,} from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

import style from './index.module.scss'
import './index.scss'

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
						<View>
							<OrderCart/>
						</View>
					</AtTabsPane>
					<AtTabsPane current={this.state.current} index={1}>
						<View>标签页二的内容</View>
					</AtTabsPane>
				</AtTabs>
			</View>
		)
	}
}

export default Index