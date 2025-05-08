import React, { useEffect } from 'react'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import GroupRenameModal from './components/modals/GroupRenameModal'
import socket from './config/socket'
import { setOnlineUsers } from './redux/slices/conditionSlice'
import { addAllMessages } from './redux/slices/messageSlice'
import { addMyChat, addNewChat, resetSelectedChat } from './redux/slices/chatSlice'

const App = () => {
  const isLogin = useSelector(store => store.auth.isautenticated)
  const { isLoginLow } = useSelector(state => state.condition)
  const { selectedChat } = useSelector(state => state.myChat)
  const myChatsUsers = useSelector(state => state.myChat.chat)
  const authUserId = useSelector(state => state?.auth?.auth?.userInfo)
  const dispatch = useDispatch()

  socket.on("online users", (onlineUsers) => {
    dispatch(setOnlineUsers(onlineUsers))

  })
  useEffect(() => {

    socket.on("clear chat", (chat, username) => {
      if (selectedChat && chat._id === selectedChat?._id) {
        dispatch(addAllMessages([]))
        toast.error(`${username} has clear the chat`)
      }
    })
  }, [selectedChat, dispatch])

  useEffect(() => {
    const handleDeleteGroup = (chat, fullname) => {
      let exists = chat.users.filter(u=>u._id === authUserId._id)
      
      if (exists.length === 0) return 
      if (exists[0]._id === chat.groupAdmin._id) return
      
      dispatch(resetSelectedChat())
      dispatch(addMyChat(myChatsUsers.filter(c => c._id !== chat._id)))
      toast.success(`${fullname} deleted the ${chat.chatName}`)
    }

    socket.on("delete group", handleDeleteGroup)

    return () => {
      socket.off("delete group", handleDeleteGroup)
    }
  }, [dispatch, myChatsUsers])

  useEffect(() => {
    socket.on("create group", (chat, fullname) => {
      let exists = chat.users.filter(u=>u._id === authUserId._id)
      
      if (exists.length === 0) return 
      
      dispatch(addNewChat(chat))      
      toast.success(`${fullname} has created ${chat.chatName} group you are added`)
    })

    return () => socket.off("create group")

  }, [dispatch])

  if (isLoginLow) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <p className=' loading' ></p>
      </div>
    )
  }

  return (
    <div className='h-screen bg-zinc-800 flex  items-center justify-center'  >
      <div className='text-wrap text-[10px] z-6 py-1 text-gray-200 fixed bg-yellow-600 px-5 top-1' >
        <p><span className='text-black font-bold' >Note:</span> This chat app is currently in development.</p>
        <p>features may change and you might encounter bugs.</p>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{
          position: 'fixed', // Required for z-index to work
          zIndex: 999999,    // Extremely high value to dominate DaisyUI
        }}
        toastOptions={{
          style: {
            zIndex: 999999,  // Same as container
          },
        }}
      />
      <GroupRenameModal />
      <Routes>
        <Route path={'/'} element={isLogin ? <Home /> : <Navigate to='/login' />} />
        <Route path={'/login'} element={isLogin ? <Navigate to='/' /> : <Login />} />
        <Route path={'/signup'} element={isLogin ? <Navigate to='/' /> : <Signup />} />
      </Routes>
    </div>
  )
}

export default App