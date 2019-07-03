export function Sync_Done (payload) {
    return {
        type : 'Sync_Done',
        payload
    }
}

export function IM_OnMyInfo (payload) {
    return {
        type : 'IM_OnMyInfo',
        payload
    }
}

export function Login_StartLogin (payload) {
    return {
        type : 'Login_StartLogin',
        payload
    }
}

export function Login_LoginSuccess (payload) {
    return {
        type : 'Login_LoginSuccess',
        payload
    }
}

export function Register_StartRegister (payload) {
    return {
        type : 'Register_StartRegister',
        payload
    }
}

export function Register_RegisterSuccess (payload) {
    return {
        type : 'Register_RegisterSuccess',
        payload
    }
}

export function UserInfo_Update_Avatar (payload) {
    return {
        type : 'UserInfo_Update_Avatar',
        payload
    }
}

export function UserInfo_Update_Nick (payload) {
    return {
        type : 'UserInfo_Update_Nick',
        payload
    }
}

export function UserInfo_Update_Gender (payload) {
    return {
        type : 'UserInfo_Update_Gender',
        payload
    }
}

export function UserInfo_Update_Birthday (payload) {
    return {
        type : 'UserInfo_Update_Birthday',
        payload
    }
}

export function UserInfo_Update_Tel (payload) {
    return {
        type : 'UserInfo_Update_Tel',
        payload
    }
}

export function UserInfo_Update_Email (payload) {
    return {
        type : 'UserInfo_Update_Email',
        payload
    }
}

export function UserInfo_Update_Sign (payload) {
    return {
        type : 'UserInfo_Update_Sign',
        payload
    }
}

export function CurrentChatTo_Change (payload) {
    return {
        type : 'CurrentChatTo_Change',
        payload
    }
}

export function FriendCard_Update_Initial (payload) {
    return {
        type : 'FriendCard_Update_Initial',
        payload
    }
}

export function FriendCard_Update_InfoCard (payload) {
    return {
        type : 'FriendCard_Update_InfoCard',
        payload
    }
}

export function FriendCard_Update_NonFriendInfoCard (payload) {
    return {
        type : 'FriendCard_Update_NonFriendInfoCard',
        payload
    }
}

export function FriendCard_Update_Online_Status (payload) {
    return {
        type : 'FriendCard_Update_Online_Status',
        payload
    }
}

export function FriendCard_Delete_By_Account (payload) {
    return {
        type : 'FriendCard_Delete_By_Account',
        payload
    }
}

export function FriendCard_Add_Friend (payload) {
    return {
        type : 'FriendCard_Add_Friend',
        payload
    }
}

export function Blacklist_Update_Initial (payload) {
    return {
        type : 'Blacklist_Update_Initial',
        payload
    }
}

export function Blacklist_Update_MarkInBlacklist (payload) {
    return {
        type : 'Blacklist_Update_MarkInBlacklist',
        payload
    }
}

export function RawMessageList_Add_Msg (payload) {
    return {
        type : 'RawMessageList_Add_Msg',
        payload
    }
}

export function RawMessageList_Add_RoamingMsgList (payload) {
    return {
        type : 'RawMessageList_Add_RoamingMsgList',
        payload
    }
}

export function RawMessageList_Add_OfflineMessage (payload) {
    return {
        type : 'RawMessageList_Add_OfflineMessage',
        payload
    }
}

export function RawMessageList_Replace_Message (payload) {
    return {
        type : 'RawMessageList_Replace_Message',
        payload
    }
}

export function RawMessageList_Replace_History (payload) {
    return {
        type : 'RawMessageList_Replace_History',
        payload
    }
}

export function RawMessageList_Recall_Msg (payload) {
    return {
        type : 'RawMessageList_Recall_Msg',
        payload
    }
}

export function RawMessageList_OppositeRecall_Msg (payload) {
    return {
        type : 'RawMessageList_OppositeRecall_Msg',
        payload
    }
}

export function Notification_Opposite_AddFriend (payload) {
    return {
        type : 'Notification_Opposite_AddFriend',
        payload
    }
}

export function Notification_Opposite_DeleteFriend (payload) {
    return {
        type : 'Notification_Opposite_DeleteFriend',
        payload
    }
}

export function Notification_Team_Invite (payload) {
    return {
        type : 'Notification_Team_Invite',
        payload
    }
}

export function Notification_Team_Apply (payload) {
    return {
        type : 'Notification_Team_Apply',
        payload
    }
}

export function Update_Sys_Msg (payload) {
    return {
        type : 'Update_Sys_Msg',
        payload
    }
}

export function Notification_Team_Del (payload) {
    return {
        type : 'Notification_Team_Del',
        payload
    }
}

export function Notification_Delete_Specified_System_By_Index (payload) {
    return {
        type : 'Notification_Delete_Specified_System_By_Index',
        payload
    }
}

export function Notification_Delete_Specified_Custom_By_Index (payload) {
    return {
        type : 'Notification_Delete_Specified_Custom_By_Index',
        payload
    }
}

export function Notification_Clear_System (payload) {
    return {
        type : 'Notification_Clear_System',
        payload
    }
}

export function Notification_Clear_Custom (payload) {
    return {
        type : 'Notification_Clear_Custom',
        payload
    }
}

export function Notification_Clear_All (payload) {
    return {
        type : 'Notification_Clear_All',
        payload
    }
}

export function UnreadInfo_update (payload) {
    return {
        type : 'UnreadInfo_update',
        payload
    }
}

export function SessionUnreadInfo_update (payload) {
    return {
        type : 'SessionUnreadInfo_update',
        payload
    }
}

export function Delete_All_MessageByAccount (payload) {
    return {
        type : 'Delete_All_MessageByAccount',
        payload
    }
}

export function Delete_Single_MessageByAccount (payload) {
    return {
        type : 'Delete_Single_MessageByAccount',
        payload
    }
}

export function Reset_All_State (payload) {
    return {
        type : 'Reset_All_State',
        payload
    }
}

export function Set_Current_Group (payload) {
    return {
        type : 'Set_Current_Group',
        payload
    }
}

export function Set_Current_Group_And_Members (payload) {
    return {
        type : 'Set_Current_Group_And_Members',
        payload
    }
}

export function Init_Groups (payload) {
    return {
        type : 'Init_Groups',
        payload
    }
}

export function Add_Group (payload) {
    return {
        type : 'Add_Group',
        payload
    }
}

export function Update_Group (payload) {
    return {
        type : 'Update_Group',
        payload
    }
}

export function Update_Group_And_Set_Current (payload) {
    return {
        type : 'Update_Group_And_Set_Current',
        payload
    }
}

export function Del_Group (payload) {
    return {
        type : 'Del_Group',
        payload
    }
}

export function Get_Group_Members_And_Set_Current (payload) {
    return {
        type : 'Get_Group_Members_And_Set_Current',
        payload
    }
}

export function Add_Group_Members (payload) {
    return {
        type : 'Add_Group_Members',
        payload
    }
}

export function Update_Group_Member (payload) {
    return {
        type : 'Update_Group_Member',
        payload
    }
}

export function Del_Group_Member (payload) {
    return {
        type : 'Del_Group_Member',
        payload
    }
}

export function Update_Group_Member_Manager (payload) {
    return {
        type : 'Update_Group_Member_Manager',
        payload
    }
}

export function Update_Group_Owner (payload) {
    return {
        type : 'Update_Group_Owner',
        payload
    }
}

export function Add_Person (payload) {
    return {
        type : 'Add_Person',
        payload
    }
}

export function Netcall_Call_UserList (payload) {
    return {
        type : 'Netcall_Call_UserList',
        payload
    }
}

export function Netcall_Call_Clear_UserList_Url (payload) {
    return {
        type : 'Netcall_Call_Clear_UserList_Url',
        payload
    }
}

export function Netcall_Set_GroupCall (payload) {
    return {
        type : 'Netcall_Set_GroupCall',
        payload
    }
}

export function SysMessageList_Update (payload) {
    return {
        type: 'SysMessageList_Update',
        payload
    }
}

export function SysMessage_Read (payload) {
    return {
        type: 'SysMessage_Read',
        payload
    }
}