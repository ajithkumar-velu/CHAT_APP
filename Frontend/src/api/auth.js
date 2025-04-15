import axiosInstance from "../config/axiosInstance"
import ApiRoutes from "./apiRoutes/apiRoutes"

export const performSignup = async(data)=>{
    const res = await axiosInstance.post(ApiRoutes.SIGNUP, data)
    return res.data
}

export const performLogin = async(data)=>{
    const res = await axiosInstance.post(ApiRoutes.LOGIN, data)
    return res.data
}
export const performLogout = async()=>{
    const res = await axiosInstance.get(ApiRoutes.LOGOUT)
    return res.data
}