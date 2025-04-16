import { useDispatch } from "react-redux"
import { useMutation } from '@tanstack/react-query'
import { performGetAllUsers, performGetChats, performPostChat } from "../api/chat"
import toast from "react-hot-toast"
import { addMyChat, addNewChat, setAllUsers } from "../redux/slices/chatSlice"
import { setIsGetMyChatUsers, setIsGetUsers } from "../redux/slices/conditionSlice"

const useChatMutation = () => {
    const dispathch = useDispatch()

    const getAllUsers = useMutation({

        mutationFn: async () => {
            dispathch(setIsGetUsers(true));
            return await performGetAllUsers()
        },
        onSuccess: (data) => {
            dispathch(setAllUsers(data))
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        },
        onSettled: () => {
            dispathch(setIsGetUsers(false))
        }
    })

    const postChat = useMutation({
        mutationFn: (data)=>{
            dispathch(setIsGetMyChatUsers(true))
            return performPostChat(data)
        },
        onSuccess: (data) => {
            toast.success("New User Added")
            dispathch(addNewChat(data))
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        },
        onSettled: ()=>{
            dispathch(setIsGetMyChatUsers(false))
        },

    })

    const getChats = useMutation({
        mutationFn: performGetChats,
        onSuccess: (data) => {
            dispathch(addMyChat(data))
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    return { getAllUsers, postChat, getChats }

}

export default useChatMutation;