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
