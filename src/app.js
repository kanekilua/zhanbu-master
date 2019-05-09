import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import '@tarojs/async-await'
import Index from './pages/index'

import configStore from './store'

import './app.scss'
import './styles/theme.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
    config = {
        pages: [
            "pages/index/index",
            "pages/schedule/schedule",
            "pages/reserve/reserve",
            "pages/mine/mine",
            "pages/forgetPassword/forgetPassword",
            "pages/login/login",
            "pages/myOrder/myOrder",
            "pages/fileSetting/fileSetting",
            "pages/accountSecurity/accountSecurity",
        ],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black',
        },
        tabBar: {
            color: "#666",
            selectedColor: "#BD8144",
            backgroundColor: "#fafafa",
            borderStyle: 'black',
            list: [{
              pagePath: "pages/index/index",
              iconPath: "assets/message.png",
              selectedIconPath: "assets/message.png",
              text: "消息"
            },{
              pagePath: "pages/schedule/schedule",
              iconPath: "assets/schedule.png",
              selectedIconPath: "assets/schedule-active.png",
              text: "档期"
            }, {
              pagePath: "pages/reserve/reserve",
              iconPath: "assets/reserve.png",
              selectedIconPath: "assets/reserve-active.png",
              text: "预约"
            }, {
              pagePath: "pages/mine/mine",
              iconPath: "assets/mine.png",
              selectedIconPath: "assets/mine-active.png",
              text: "我的"
            }]
          }
        }

    componentDidMount () {}

    componentDidShow () {}

    componentDidHide () {}

    componentCatchError () {}

    componentDidCatchError () {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render () {
        return (
            <Provider store={store}>
            <Index />
            </Provider>
        )
    }
}


const startApp = () => {
    Taro.render(<App />, document.getElementById('app'))
}

if(Taro.getEnv() === Taro.ENV_TYPE.WEB) {
    if(!window.cordova) {
        startApp()
    } else {
        document.addEventListener('deviceready', startApp, false)
    }
}else {
    startApp()
}