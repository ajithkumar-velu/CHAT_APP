import { useDispatch } from "react-redux"
import { useMutation } from '@tanstack/react-query'
import { performCreateMessage, performGetAllMessages } from "../api/message"
import { addAllMessages, addNewMessage, addNewMessageId } from "../redux/slices/messageSlice"
import toast from "react-hot-toast"
import socket from "../config/socket"
const useMessageMutation = () => {
    const dispatch = useDispatch()

    const getAllMessage = useMutation({
        mutationFn: performGetAllMessages,
        onSuccess: (data) => {
            dispatch(addAllMessages(data))
            console.log(data);

        },
        onError: (err)=>{
            toast.error(err.response?.data?.message)
        }
        
    })

    const createMessage = useMutation({
        mutationFn: performCreateMessage,
        onSuccess: (data)=>{
            socket.emit("new message", data);
            dispatch(addNewMessage(data))
            dispatch(addNewMessageId(data))
            console.log(data);
        },
        onError: (err)=>{
            toast.error(err.response?.data?.message)
        }
    })
    return { getAllMessage, createMessage}
}

export default useMessageMutation