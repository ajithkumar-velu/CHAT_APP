import axiosInstance from "../config/axiosInstance"
import ApiRoutes from "./apiRoutes/apiRoutes"

export const performGetAllMessages = async(data)=>{
    const res = await axiosInstance.get(`${ApiRoutes.GETALLMESSAGES}/${data}`)
    return res.data
}

export const performCreateMessage = async(data)=>{
    const res = await axiosInstance.post(ApiRoutes.GETALLMESSAGES, data)
    return res.data
}