import { useDispatch, useSelector } from "react-redux"
import { useMutation } from '@tanstack/react-query'
import { performAddUserToGroup, performCreateGroup, performDeleteGroup, performGetAllUsers, performGetChats, performPostChat, performRemoveFromGroup, performRenameGroup, performUpdateGroupProfile } from "../api/chat"
import toast from "react-hot-toast"
import { addMyChat, addNewChat, addSelectedChat, setAllUsers } from "../redux/slices/chatSlice"
import { setGroupIsProfileLow, setIsGetMyChatUsers, setIsGetUsers } from "../redux/slices/conditionSlice"
import socket from "../config/socket"

const useChatMutation = () => {
    const dispathch = useDispatch()
    const myChatsUsers = useSelector(state => state.myChat.chat)
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
            let exists = myChatsUsers.filter(c => c._id === data._id)
            console.log(exists);

            dispathch(addNewChat(data))
            if (exists.length !== 0) return
            toast.success("New User Added")

        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    const getChats = useMutation({
        mutationFn: performGetChats,
        onMutate: () => {
            dispathch(setIsGetMyChatUsers(true))
        },
        onSuccess: (data) => {
            dispathch(addMyChat(data))
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        },
        onSettled: () => {
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
            let val = myChatsUsers.filter(c => c._id !== data._id)
            val.unshift(data)
            dispathch(addMyChat(val))
            socket.emit("update profile", data)
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
            let val = myChatsUsers.filter(c => c._id !== data._id)
            val.unshift(data)
            dispathch(addMyChat(val))
            socket.emit("update profile", data)
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
            let val = myChatsUsers.filter(c => c._id !== data._id)
            val.unshift(data)
            dispathch(addMyChat(val))
            socket.emit("update profile", data)
            toast.success("User added Successfully")
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        }
    })

    const addUpdateGroupProfile = useMutation({
        mutationFn: performUpdateGroupProfile,
        onMutate: () => {
            dispathch(setGroupIsProfileLow(true))
        },
        onSuccess: (data) => {
            dispathch(addSelectedChat(data))
            let val = myChatsUsers.filter(c => c._id !== data._id)
            val.unshift(data)
            dispathch(addMyChat(val))
            socket.emit("update profile", data)
            toast.success("Profile updated Successfully")
        },
        onError: (err) => {
            toast.error(err.response?.data?.message)
        },
        onSettled: () => {
            dispathch(setGroupIsProfileLow(false))

        }
    })

    return { getAllUsers, postChat, getChats, createGroup, deleteGroup, renameGroup, removeFromGroup, addUserToGroup, addUpdateGroupProfile }

}

export default useChatMutation;