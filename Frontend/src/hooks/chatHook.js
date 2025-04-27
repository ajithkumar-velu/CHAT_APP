import { useDispatch } from "react-redux"
import { useMutation } from '@tanstack/react-query'
import { performCreateGroup, performDeleteGroup, performGetAllUsers, performGetChats, performPostChat, performRenameGroup } from "../api/chat"
import toast from "react-hot-toast"
import { addMyChat, addNewChat, addSelectedChat, setAllUsers } from "../redux/slices/chatSlice"
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
        mutationFn: performPostChat,
        onSuccess: (data) => {
            toast.success("New User Added")
            dispathch(addNewChat(data))
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    const getChats = useMutation({
        mutationFn: performGetChats,
        onMutate: ()=>{
            dispathch(setIsGetMyChatUsers(true))
        },
        onSuccess: (data) => {
            dispathch(addMyChat(data))
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        },
        onSettled: ()=>{
            dispathch(setIsGetMyChatUsers(false))
        },
    })

    const createGroup = useMutation({
        mutationFn: performCreateGroup,
        onSuccess: (data) => {
            toast.success("Group created successfully")
            dispathch(addNewChat(data))
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    const deleteGroup = useMutation({
        mutationFn: performDeleteGroup,
        onSuccess: (data) => {
            toast.success("Group deleted successfully")
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    const renameGroup = useMutation({
        mutationFn: performRenameGroup,
        onSuccess: (data) => {
            dispathch(addSelectedChat(data))
            toast.success("Group Renamed successfully")
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    return { getAllUsers, postChat, getChats, createGroup, deleteGroup, renameGroup }

}

export default useChatMutation;