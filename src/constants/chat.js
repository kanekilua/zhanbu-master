import { OSS_BASEURL } from './global'

// chatEditor组件用到的图片
export const CHAT_MSGTYPE1 = OSS_BASEURL + '/chat-msgtype1.png'
export const CHAT_MSGTYPE2 = OSS_BASEURL + '/chat-msgtype2.png'
export const CHAT_EMOJI = OSS_BASEURL + '/chat-emoji.png'
export const CHAT_EXTENDS = OSS_BASEURL + '/chat-extends.png'

// 网易云信im的设置
// 默认头像
export const DEFAULT_AVATAR_MALE = OSS_BASEURL + '/sys-avatar-male.png'
export const DEFAULT_AVATAR_FEMALE = OSS_BASEURL + '/sys-avatar-female.png'
export const DEFAULT_AVATAR = OSS_BASEURL + '/sys-avatar.png'
// 默认消息显示条数限制
export const LOCAL_MSG_LIMIT = 36
export const LOCAL_MSG_LIMIT_WEAPP = 15
// App Key
export const APP_KEY = '33aef014c519ea06cc6a7f97fcc90055'
// chat config
export const CHAT_CONFIG = {
    CHAT_MSGTYPE1,CHAT_MSGTYPE2,CHAT_EMOJI,CHAT_EXTENDS,DEFAULT_AVATAR_MALE,DEFAULT_AVATAR_FEMALE
    ,DEFAULT_AVATAR,LOCAL_MSG_LIMIT,APP_KEY
}
// 聊天页面的toast显示时长
export const TOAST_DURATION = 1500