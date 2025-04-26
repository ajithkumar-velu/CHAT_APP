import { useDispatch, useSelector } from "react-redux"
import { useMutation } from '@tanstack/react-query'
import { performCreateMessage, performGetAllMessages } from "../api/message"
import { addAllMessages, addNewMessage, addNewMessageId } from "../redux/slices/messageSlice"
import toast from "react-hot-toast"
import socket from "../config/socket"
import { setIsChatLow } from "../redux/slices/conditionSlice"
const useMessageMutation = () => {
    const dispatch = useDispatch()
    const { selectedChat } = useSelector(state => state.myChat)
    const authUserId = useSelector(state => state.auth?.auth?.userInfo?._id)

    const getAllMessage = useMutation({
        mutationFn: async (data)=>{
            dispatch(setIsChatLow(true))
            return await performGetAllMessages(data)
        },
        onSuccess: (data) => {
            dispatch(addAllMessages(data))

        },
        onError: (err)=>{
            toast.error(err.response?.data?.message)
        },
        onSettled: ()=>{
            dispatch(setIsChatLow(false))
        }
        
    })

    const createMessage = useMutation({
        mutationFn: performCreateMessage,
        onSuccess: (data)=>{
            socket.emit("new message", data);
            socket.emit("stop_typing", selectedChat, authUserId);
            dispatch(addNewMessage(data))
            dispatch(addNewMessageId(data))
        },
        onError: (err)=>{
            toast.error(err.response?.data?.message)
        }
    })
    return { getAllMessage, createMessage}
}

export default useMessageMutation