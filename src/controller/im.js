import Taro from '@tarojs/taro'
// import NetcallController from './netcall.js'
import MD5 from '@/util/md5'
import imsdkUtils from '@/utils/imsdk'
import app from '@/utils/appData'
import _fetch from '@/utils/fetch'

let NIM = window.NIM

let orderCounter = 1
// 第一次进去onConnect onBlacklist onMutelist onFriends onMyInfo onUsers onTeams SyncDone onPushEvents
// 重连 onWillConnect
export default class IMController {
  constructor(loginInfo) {
    app.globalData.nim = NIM.getInstance({
      // 初始化SDk
      // debug: true,
      appKey: app.globalData.CHAT_CONFIG.APP_KEY,
      token: loginInfo.token,
      account: loginInfo.account,
      promise: true,
      transports: ['websocket'],
      syncSessionUnread: true, // 同步未读数
      onconnect: this.onConnect,
      onwillreconnect: this.onWillReconnect,
      ondisconnect: this.onDisconnect,
      onerror: this.onError,
      // 同步完成
      onsyncdone: this.onSyncDone,
      // 用户关系
      onblacklist: this.onBlacklist,
      onsyncmarkinblacklist: this.onMarkInBlacklist,
      onmutelist: this.onMutelist,
      onsyncmarkinmutelist: this.onMarkInMutelist,
      // 好友关系
      onfriends: this.onFriends,
      onsyncfriendaction: this.onSyncFriendAction,
      // // 用户名片
      onmyinfo: this.onMyInfo.bind(loginInfo),
      onupdatemyinfo: this.onUpdateMyInfo,
      onusers: this.onUsers,
      onupdateuser: this.onUpdateUser,
      // 机器人列表的回调
      onrobots: this.onRobots,
      // 会话
      onsessions: this.onSessions,
      onupdatesession: this.onUpdateSession,
      // 消息
      onroamingmsgs: this.onRoamingMsgs,
      onofflinemsgs: this.onOfflineMsgs,
      onmsg: this.onMsg,
      // 系统通知
      onofflinesysmsgs: this.onOfflineSysMsgs,
      onsysmsg: this.onSysMsg,
      onupdatesysmsg: this.onUpdateSysMsg,
      onsysmsgunread: this.onSysMsgUnread,
      onupdatesysmsgunread: this.onUpdateSysMsgUnread,
      onofflinecustomsysmsgs: this.onOfflineCustomSysMsgs,
      oncustomsysmsg: this.onCustomSysMsg,
      // 收到广播消息
      onbroadcastmsg: this.onBroadcastMsg,
      onbroadcastmsgs: this.onBroadcastMsgs,
      // 事件订阅
      onpushevents: this.onPushEvents,
    })
    // 发送消息开始登陆
    app.store.dispatch({
      type: 'Login_StartLogin'
    })
  }
  /** 1
   * 连接成功
   */
  onConnect() {
    console.log(orderCounter++, ' onConnect: ')
  }
  /** 2或sync done之后触发
   * 设置订阅后，服务器消息事件回调
   */
  onPushEvents(param) {
    console.log(orderCounter++, ' onPushEvents: ', param)
    let msgEvents = param.msgEvents
    if (msgEvents) {
      let statusArr = []
      msgEvents.map((data) => {
        statusArr.push({
          status: updateMultiPortStatus(data),
          account: data.account
        })
      })
      // 更新好友全局状态
      app.store.dispatch({
        type: 'FriendCard_Update_Online_Status',
        payload: statusArr
      })
    }
  }
  /** 3
 * 收到黑名单列表
 */
  onBlacklist(blacklist) {
    console.log(orderCounter++, ' onBlacklist: ', blacklist)
    app.store.dispatch({
      type: 'Blacklist_Update_Initial',
      payload: blacklist
    })
  }
  /** 4
   * onMutelist
   */
  onMutelist(mutelist) {
    console.log(orderCounter++, ' onMutelist: ', mutelist)
    console.log('----onMutelist---------')
  }
  /** 5
   * 同步好友信息，不含名片 [{account, createTime, updateTime}]
   */
  onFriends(friends) {
    console.log(orderCounter++, ' onFriends: ', friends)
    console.log('----onFriends---------')
    app.store.dispatch({
      type: 'FriendCard_Update_Initial',
      payload: friends
    })
  }
  /** 6
   * 个人名片：存储个人信息到全局数据
   */
  onMyInfo(user) {
    console.log(orderCounter++, ' onMyInfo: ')
    console.log('----onMyInfo---------')
    user.avatar = this.avatar
    app.store.dispatch({
      type: 'IM_OnMyInfo',
      payload: user
    })
  }
  /** 7
   * 包含名片的好友信息（可能某些字段不全），[{account,avatar,birth,createTime,email,gender,nick,sign,updateTime}]
   */
  onUsers(friends) {
    console.log(orderCounter++, ' onUsers: ', friends)
    console.log('----onUsers---------')
    app.store.dispatch({
      type: 'FriendCard_Update_Initial',
      payload: friends
    })
  }
  /** 9
   * onSyncDone,同步完成
   */
  onSyncDone() {
    console.log(orderCounter++, ' Sync Done')
    console.log('----Sync Done---------')
    app.store.dispatch({
      type: 'Login_LoginSuccess'
    })
    app.store.dispatch({
      type: 'Sync_Done',
      payload: true
    })
  } 
  /**
 * 会话更新：收到消息、发送消息、设置当前会话、重置会话未读数 触发
 * {id:'p2p-zys2',lastMsg:{},scene,to,unread,updateTime}
 * {id:'team-1389946935',lastMsg:{attach:{accounts,team},type,users},scene,to,from,type,unread,updateTime}
 */
  onUpdateSession(session) {
    console.log('onUpdateSession: ', session)
    console.log('----onUpdateSession---------')
    try {
      app.store.dispatch({
        type: 'UnreadInfo_update',
        payload: session
      })
    } catch(error) {
    }
  }
  /**
   * 收到消息
   * {cc,flow:"in",from,fromClientType:"Web",fromDeviceId,fromNick,idClient,idServer:"9680840912",isHistoryable:true,isLocal,isMuted, isOfflinable,isPushable,isRoamingable,isSyncable,isUnreadable,needPushNick,resend,scene:"p2p",sessionId:"p2p-zys2",status:"success",target:"zys2",text:"[呕吐]",time,to:"wujie",type:"text",userUpdateTime}
   */
  onMsg(msg) {
    console.log('onMsg: 收到消息', msg)
    console.log('----onMsg---------')
    try {
      app.store.dispatch({
        type: 'RawMessageList_Add_Msg',
        payload: { msg, nim: app.globalData.nim }
      })
    } catch (error) {
      
    }
  }
  /** 操作主体为对方
   * 收到系统通知，例如 被对方删除好友、被对方添加好友、被对方撤回消息
   * {type,to,time,deletedMsgTime,deletedMsgFromNick,deletedIdServer,deletedIdClient,status,scene,opeAccount,msg:{flow,from,fromNick,idClient,scene,sessionId,target,time,to,opeAccount},idServer,from}
   * time:为删除消息时间，deletedMsgTime为删除的消息发送时间
   */
  onSysMsg(msg) {
    console.log('onSysMsg: ', msg)
    console.log('----onSysMsg---------')
    imsdkUtils.dealMsg(msg, app.store, app)
  }
  /**
   * 丢失连接
   */
  onDisconnect(error) {
    console.log(orderCounter++, ' onDisconnect: ')
    console.log('----onDisconnect---------')
    if (error) {
      switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
          console.log('onError: 账号或者密码错误')
          Taro.showToast({
            title: '账号或密码错误',
            image: '/images/emoji.png'
          })
          app.store.dispatch({ type: 'Login_LoginSuccess' })
          break;
        // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
        case 417:
          console.log('onError: 重复登录')
          break;
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
          Taro.showModal({
            title: '用户下线',
            showCancel: false,
            content: '在其他客户端登录，导致被踢',
            confirmText: '重新登录',
            success: (res) => {
              if (res.confirm) { //点击确定
                let pages = getCurrentPages()
                let currentPage = pages[pages.length - 1]
                if (currentPage.route.includes('videoCallMeeting')) { // 多人视频
                  try {
                    // 兼容登录网关502错误离开房间
                    if (app.globalData.netcall) {
                      app.globalData.netcall.leaveChannel()
                        .then(() => {
                          app.globalData.netcall.destroy()
                          app.globalData.nim.destroy({
                            done: function () {
                              console.log('destroy nim done !!!')
                              Taro.clearStorage()
                              Taro.hideLoading()
                            }
                          })
                          Taro.reLaunch({
                            url: '/pages/login/login',
                          })
                        })
                    }
                  } catch (error) {
                  }
                } else if (currentPage.route.includes('videoCall')) { // p2p
                  try {
                     // 兼容登录网关502错误离开房间
                     if (app.globalData.netcall) {
                       app.globalData.netcall.hangup()
                         .then(() => {
                           app.globalData.netcall.destroy()
                           app.globalData.nim.destroy({
                             done: function () {
                               console.log('destroy nim done !!!')
                               Taro.clearStorage()
                               Taro.hideLoading()
                             }
                           })
                           Taro.reLaunch({
                             url: '/pages/login/login',
                           })
                        })
                     }
                  } catch (error) {
                    console.warn(error)
                  }
                } else {
                  app.globalData.netcall.destroy()
                  app.globalData.nim.destroy({
                    done: function () {
                      console.log('destroy nim done !!!')
                      Taro.clearStorage()
                      Taro.hideLoading()
                    }
                  })
                  Taro.reLaunch({
                    url: '/pages/login/login',
                  })
                }

              }
            }
          })
          break;
        default:
          break;
      }
    }
  }
  /**
   * 漫游消息：会多次收到，每次只会收到指定人的漫游消息
    // {scene:"p2p",sessionId:"p2p-cs4",timetag:1513153729257,to:"cs4",msg:[{from:'wujie',text:'222',to:'cs4'}]}
    // {scene:"team",sessionId:"team-3944051",timetag:1513153729257,to:"3944051",msg:[{from:'wujie',text:'222',to:'cs4'}]}
   */
  onRoamingMsgs(list) {
    console.log(orderCounter++, ' 漫游消息')
    console.log('----roamingMsg-----')
    app.store.dispatch({
      type: 'RawMessageList_Add_RoamingMsgList',
      payload: list
    })
  }
  /**
   * 连接出错
   */
  onError(error) {
    console.log(' onError', error)
    console.log('----onError---------')
    app.globalData.nim.disconnect()
    app.globalData.nim.connect()
  }

  onMarkInBlacklist(obj) {
    console.log(orderCounter++, ' onMarkInBlacklist: ')
    console.log('----onMarkInBlacklist---------')
  }

  onMarkInMutelist(obj) {
    console.log(orderCounter++, ' onMarkInMutelist: ')
    console.log('----onMarkInMutelist---------')
  }

  onSyncFriendAction(obj) {
    console.log(orderCounter++, ' onSyncFriendAction')
    console.log('----onSyncFriendAction---------')
  }

  onUpdateMyInfo(user) {
    console.log(orderCounter++, ' onUpdateMyInfo')
    console.log('----onUpdateMyInfo---------')
  }

  onUpdateUser(user) {
    console.log(orderCounter++, ' onUpdateUser')
    console.log('----onUpdateUser---------')
  }
  /**会话
   * [ {id:"p2p-liuxuanlin",lastMsg:{from:'wujie',text:'222',to:"liuxuanlin"}} ]
   */
  onSessions(sessions) {
    console.log('onSessions: ', sessions)
    console.log('----onSessions---------')
    app.store.dispatch({
      type: 'SessionUnreadInfo_update',
      payload: sessions
    })
  }
  onOfflineMsgs(msg) {
    console.log(orderCounter++, ' onOfflineMsgs')
    console.log('----onOfflineMsgs---------')
    app.store.dispatch({
      type: 'RawMessageList_Add_OfflineMessage',
      payload: msg
    })
  }
  // 系统通知
  onOfflineSysMsgs(msg) {
    console.log(orderCounter++, ' onOfflineSysMsgs')
    console.log('----onOfflineSysMsgs---------')
    msg.map(item => imsdkUtils.dealMsg(item, app.store, app))
  }
  onUpdateSysMsg(sysMsg) {
    console.log(orderCounter++, ' onUpdateSysMsg')
    console.log('----onUpdateSysMsg---------')
    app.store.dispatch({
      type: 'Update_Sys_Msg',
      payload: [sysMsg]
    })
  }
  // 系统消息
  async onCustomSysMsg(sysMsg) {
    console.log(orderCounter++, ' onCustomSysMsg')
    console.log('----onCustomSysMsg---------')
    console.log(sysMsg)
    let msgItem = {}
    let content = JSON.parse(sysMsg.content)
    let orderInfo = null
    if(content.type[0] === '3') {
      const orderId = content.content.orderId
      await _fetch({ url: '/masterin/detail', payload: { id: orderId }})
      .then((res) => {
        orderInfo = res.order
      })
      msgItem = {
        is_read: '10',
        orderInfo
      }
      app.store.dispatch({
        type: 'SysMessageList_Update',
        payload: [msgItem]
      })
    }
  }
  onSysMsgUnread(obj) {
    console.log(orderCounter++, ' onSysMsgUnread')
    console.log('----onSysMsgUnread---------')
  }
  onUpdateSysMsgUnread(obj) {
    console.log(orderCounter++, ' onUpdateSysMsgUnread')
    console.log('----onUpdateSysMsgUnread---------')
  }
  onOfflineCustomSysMsgs(sysMsg) {
    console.log(orderCounter++, ' onOfflineCustomSysMsgs')
    console.log('----onOfflineCustomSysMsgs---------')
  }
  // 收到广播消息
  onBroadcastMsg(msg) {
    console.log('onBroadcastMsg: ', msg)
    console.log('----onBroadcastMsg---------')
  }
  onBroadcastMsgs(msg) {
    console.log('onBroadcastMsgs: ', msg)
    console.log('----onBroadcastMsgs---------')
  }
  /**
   * 断开重连
   */
  onWillReconnect() {
    console.log(' onWillReconnect')
    console.log('----onWillReconnect---------')
    imsdkUtils.showToast('text', '重连中，请稍后！', { duration: 3000 })
  }
}

// 初始化的时候回返回一条数据，里面还有所有的未读数，未读数初始化状态不对，后面收到新的后就正确了
// 好友被删除后，再次推送过来的消息如有此人消息会报错，原因recentChat页是获取数据时是从好友列表中拿的
