import React, { useEffect, useRef, useState } from 'react'
import { images } from '../assets/assets'
import { CircleMinus, CircleX, EllipsisVertical, Info, MoveLeft, Phone, Send, Smile } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import useMessageMutation from '../hooks/messageHooks'
import { getChatImage, getChatName } from '../utils/getNameImage'
import socket from '../config/socket'
import { addNewMessage } from '../redux/slices/messageSlice'
import { addSelectedChat, resetSelectedChat } from '../redux/slices/chatSlice'
import { setIsChatThreeDotOpen, setIsProfileOpen, setIsTyping } from '../redux/slices/conditionSlice'
import { chatMessageTime, groupMessagesByDate, SimpleDateAndTime, SimpleTime } from '../utils/formateDateTime'
import ChatSkeleton from './skeleton/ChatSkeleton'
import Profile from './Profile'

const Chat = () => {
  const bottomRef = useRef(null);
  const [message, setMessage] = useState("")
  const { selectedChat } = useSelector(state => state.myChat)
  const { createMessage } = useMessageMutation()
  const authUserId = useSelector(state => state.auth.auth.userInfo._id)
  let messages = useSelector(state => state.messages.messages)
  messages = groupMessagesByDate(messages)
  const isTyping = useSelector(state => state.condition.isTyping)
  const { isChatLow } = useSelector(state => state.condition)
  const { isProfileOpen } = useSelector(state => state.condition)
  const { isChatThreeDotOpen } = useSelector(state => state.condition)
  const toggleDrawer = () => dispatch(setIsProfileOpen(!isProfileOpen));

  const dispatch = useDispatch()

  const handleTyping = (e) => {
    setMessage(e.target.value)


    if (e.target.value.length > 0) {
      socket.emit("typing", selectedChat, authUserId)
      return () => { dispatch(setIsTyping(false)) }
    } else {
      socket.emit("stop_typing", selectedChat, authUserId)
      return () => { dispatch(setIsTyping(false)) }
    }
  }

  // get trping 
  useEffect(() => {
    const handelLog = (chatId) => {
      if (selectedChat._id === chatId) {
        dispatch(setIsTyping(true))
      }
    }
    socket.on("styping", handelLog)
    return () => { socket.off("styping", handelLog) }
  })

  // stop typing
  useEffect(() => {
    const handelLog = (chatId) => {


      if (selectedChat._id === chatId) {
        dispatch(setIsTyping(false))
      }
    }
    socket.on("sstyping", handelLog)
    return () => { socket.off("sstyping", handelLog) }
  })

  // send nessage
  const handleSendMessage = () => {
    createMessage.mutateAsync({ message: message, chatId: selectedChat })
    setMessage("")
  }
  useEffect(() => {
    if (!authUserId) return;
    socket.emit("setup", authUserId);
    // socket.on("connected", () => dispatch(setSocketConnected(true)));
  }, [authUserId]);


  useEffect(() => {
    const messageHandler = (newMessage) => {
      if (newMessage.chat._id === selectedChat._id) {
        dispatch(addNewMessage(newMessage));
      }
    };
    socket.on("message received", messageHandler); // Use the named function here
    return () => socket.off("message received", messageHandler); // This now matches
  });

  //  scroll to bottom chat
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // console.log(messages, groupMessagesByDate(messages));


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
      <div className='bg-base-200 w-full h-20 flex items-center gap-3 px-5' >
        <button onClick={() => dispatch(addSelectedChat(null))} className=" text-xl cursor-pointer btn btn-ghost btn-circle flex items-center justify-center md:hidden">
          <MoveLeft />
        </button>
        <div className='size-12 rounded-full overflow-hidden' >
          <img src={getChatImage(selectedChat, authUserId) || images.groupAvatar} alt="" />
        </div>
        <div className=' flex-1' >
          <p className='text-[18px] font-semibold text-zinc-300' >{getChatName(selectedChat, authUserId)}</p>
          <p className='text-green-400 text-[14px]' >{isTyping ? "typing..." : "Online"}</p>
        </div>



        <div className=" relative">


          <div onClick={() => dispatch(setIsChatThreeDotOpen(!isChatThreeDotOpen))} className="m-1 cursor-pointer"><EllipsisVertical /></div>
          <ul className={` absolute right-0 menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm ${isChatThreeDotOpen ? "" : "hidden"}`}>
            <li onClick={toggleDrawer} ><a onClick={() => dispatch(setIsChatThreeDotOpen(false))} className=' flex items-center gap-3' >
              <p><Info /></p>
              <p>{selectedChat.isGroupChat ? "Group Info" : "Contact Info"}</p>
            </a></li>
            <li>
              <a onClick={() => dispatch(setIsChatThreeDotOpen(false))} className='flex items-center gap-3' >
                <p><CircleMinus /> </p>
                <p>Clear chat</p>
              </a>
            </li>
            <li onClick={() => dispatch(resetSelectedChat())} >
              <a onClick={() => dispatch(setIsChatThreeDotOpen(false))} className='flex items-center gap-3' >
                <p><CircleX /> </p>
                <p>Close chat</p>
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* chats */}
      {
        isChatLow ?
          <ChatSkeleton /> :

          <div className='flex-1 px-5 overflow-y-auto' >
            {Object.keys(messages).map((message, index) => (
              <div key={index} >
                <div className="text-center text-gray-500 flex items-center justify-center font-semibold my-2">
                  <p className='bg-base-300 w-fit px-3 py-0.5 text-xs rounded-full' >

                    {message}
                  </p>
                </div>
                {messages[message].map((msg, idx) => (
                  <div key={idx} className={`chat ${authUserId !== msg.sender._id ? "chat-start" : "chat-end"}`}>
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img src={msg.sender.profile || images.avatar} />
                      </div>
                    </div>
                    <div className="chat-header">
                      {/* Obi-Wan Kenobi */}
                      <time className="text-xs opacity-50">{chatMessageTime(msg.createdAt)}</time>
                    </div>
                    <div className="chat-bubble">
                      {selectedChat.isGroupChat && authUserId !== msg.sender._id && <p className='text-[12px] -py-2 text-zinc-500' >{msg.sender.fullname}</p>}
                      <p>{msg.message}</p>

                    </div>
                    {authUserId === msg.sender._id && <div className="chat-footer opacity-50">Delivered</div>}
                  </div>
                ))}
                <div ref={bottomRef} ></div>
              </div>
            ))}
            {/* <div>{messages}</div> */}


            {Object.keys(messages).length === 0 &&
              <div className='flex items-center justify-center mt-5' >
                <div className='' >Say Hi to start conversation</div>
              </div>}
          </div>
      }

      {/* send   message */}
      <div className='bg-base-200 py-6 flex items-center gap-2 px-5' >
        <div className="input bg-base-200 w-full h-10 rounded-full px-5">
          <Smile className='text-gray-400' />
          <input onChange={handleTyping} value={message} type="search" className="grow bg-base-200" placeholder="Search" />
        </div>
        <div onClick={handleSendMessage} className='bg-base-300 p-2.5 rounded-full flex items-center justify-center' >
          <Send className=' cursor-pointer size-5' />
        </div>
      </div>

      {/* <Drawer /> */}

    </div>
  )
}

export default Chat