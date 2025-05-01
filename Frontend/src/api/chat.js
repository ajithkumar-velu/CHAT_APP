import axiosInstance from "../config/axiosInstance"
import ApiRoutes from "./apiRoutes/apiRoutes"

export const performGetAllUsers = async () => {    
    const res = await axiosInstance.get(ApiRoutes.ALLUSERS)
    return res.data
}

export const performPostChat = async (data) => {    
    const res = await axiosInstance.post(ApiRoutes.POSTCHAT, data)
    return res.data
}

export const performGetChats = async () => {
    const res = await axiosInstance.get(ApiRoutes.GETCHAT)
    return res.data
}

export const performCreateGroup = async (data) => {    
    const res = await axiosInstance.post(ApiRoutes.CREATEGROUP, data)
    return res.data
}

export const performDeleteGroup = async (data) => {
    const res = await axiosInstance.delete(`${ApiRoutes.DELETEGROUP}/${data}`)
    return res.data
}

export const performRenameGroup = async (data) => {    
    const res = await axiosInstance.post(ApiRoutes.RENAMEGROUP, data)
    return res.data
}

export const performRemoveFromGroup = async (data) => {    
    const res = await axiosInstance.post(ApiRoutes.REMOVEFROMGROUP, data)
    return res.data
}


export const performAddUserToGroup = async (data) => {    
    const res = await axiosInstance.post(ApiRoutes.ADDTOGROUP, data)
    return res.data
}

export const performUpdateGroupProfile = async (data) => {    
    const res = await axiosInstance.post(ApiRoutes.UPDATEGROUPPROFILE, data)
    return res.data
}

