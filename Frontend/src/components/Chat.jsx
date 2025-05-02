import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import socket from '../config/socket'
import ChatSkeleton from './skeleton/ChatSkeleton'
import Profile from './Profile'
import Header from './chat/Header'
import SendMessage from './chat/SendMessage'
import ChatContainer from './chat/ChatContainer'

const Chat = () => {

  const { selectedChat } = useSelector(state => state.myChat)
  const authUserId = useSelector(state => state.auth.auth.userInfo._id)
  const { isChatLow } = useSelector(state => state.condition)

  useEffect(() => {
    if (!authUserId) return;
    socket.emit("setup", authUserId);
    // socket.on("connected", () => dispatch(setSocketConnected(true)));
  }, [authUserId]);

  if (!selectedChat) {
    return (
      <div className='hidden md:flex bg-base-100 w-full flex-col items-center justify-center relative overflow-y-auto' >
        Select a user to Chat
      </div>)
  }
  return (
    <div className='bg-base-100 w-full flex flex-col overflow-hidden relative overflow-y-auto' >

      {/* Header */}
      <Profile />
      <Header />

      {/* chats */}
      {isChatLow ? <ChatSkeleton /> : <ChatContainer />}

      {/* send   message */}
      <SendMessage />

    </div>
  )
}

export default Chat