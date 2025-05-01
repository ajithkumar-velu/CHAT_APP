import { useDispatch } from "react-redux"
import { useMutation } from '@tanstack/react-query'
import { performAddUserToGroup, performCreateGroup, performDeleteGroup, performGetAllUsers, performGetChats, performPostChat, performRemoveFromGroup, performRenameGroup, performUpdateGroupProfile } from "../api/chat"
import toast from "react-hot-toast"
import { addMyChat, addNewChat, addSelectedChat, setAllUsers } from "../redux/slices/chatSlice"
import { setGroupIsProfileLow, setIsGetMyChatUsers, setIsGetUsers } from "../redux/slices/conditionSlice"

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
            toast.success("Group Created Successfully")
            dispathch(addNewChat(data))
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    const deleteGroup = useMutation({
        mutationFn: performDeleteGroup,
        onSuccess: (data) => {
            toast.success("Group deleted Successfully")
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    const renameGroup = useMutation({
        mutationFn: performRenameGroup,
        onSuccess: (data) => {
            dispathch(addSelectedChat(data))
            toast.success("Group Renamed Successfully")
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    const removeFromGroup = useMutation({
        mutationFn: performRemoveFromGroup,
        onSuccess: (data) => {
            dispathch(addSelectedChat(data))
            toast.success("User Removed Successfully")
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    const addUserToGroup = useMutation({
        mutationFn: performAddUserToGroup,
        onSuccess: (data) => {
            dispathch(addSelectedChat(data))
            toast.success("User added Successfully")
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    const addUpdateGroupProfile = useMutation({
        mutationFn: performUpdateGroupProfile,
        onMutate: ()=>{
            dispathch(setGroupIsProfileLow(true))
        },
        onSuccess: (data) => {
            dispathch(addSelectedChat(data))
            toast.success("Profile updated Successfully")
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        },
        onSettled: ()=>{
            dispathch(setGroupIsProfileLow(false))

        }
    })

    return { getAllUsers, postChat, getChats, createGroup, deleteGroup, renameGroup, removeFromGroup, addUserToGroup, addUpdateGroupProfile }

}

export default useChatMutation;