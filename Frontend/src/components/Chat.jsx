import React, { useEffect, useRef, useState } from 'react'
import { images } from '../assets/assets'
import { EllipsisVertical, Phone, Send, Smile } from 'lucide-react'
import Drawer from './Drawer'
import { useSelector } from 'react-redux'
import useMessageMutation from '../hooks/messageHooks'
import { getChatImage, getChatName } from '../utils/getNameImage'

const Chat = () => {
  const bottomRef = useRef(null);
  const [message, setMessage] = useState("")
  const { selectedChat } = useSelector(state => state.myChat)
  const { createMessage } = useMessageMutation()
  const authUserId = useSelector(state => state.auth.auth.userInfo._id)
  const messages = useSelector(state => state.messages.messages)
  console.log(messages);
  useEffect(() => {

  }, [])
  const handleSendMessage = () => {
    createMessage.mutateAsync({ message: message, chatId: selectedChat })
  }
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  if (!selectedChat) {
    return (
      <div className='bg-base-100 w-full flex flex-col items-center justify-center relative overflow-y-auto' >
        Select a user to Chat
      </div>)
  }
  return (
    <div className='bg-base-100 w-full flex flex-col relative overflow-y-auto' >

      {/* Header */}

      <div className='bg-base-200 w-full h-20 flex items-center gap-3 px-5' >
        <div className='size-12 rounded-full overflow-hidden' >
          <img src={getChatImage(selectedChat, authUserId) || images.groupAvatar} alt="" />
        </div>
        <div className=' flex-1' >
          <p className='text-[18px] font-semibold text-zinc-300' >{getChatName(selectedChat, authUserId)}</p>
          <p className='text-green-400 text-[14px]' >Online</p>
        </div>
        <div className='flex items-center gap-3' >
          <Phone />
          <EllipsisVertical />
        </div>
      </div>

      {/* chats */}
      <div className='flex-1 px-5 overflow-y-auto' >
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat ${authUserId === msg.sender._id? "chat-end": "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">{msg.createdAt}</time>
            </div>
            <div className="chat-bubble">{msg.message}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
        <div ref={bottomRef} ></div>
      </div>

      {/* send message */}
      <div className='bg-base-200 py-6 flex items-center gap-2 px-5' >
        <div className="input bg-base-200 w-full h-10 rounded-full px-5">
          <Smile className='text-gray-400' />
          <input onChange={(e) => setMessage(e.target.value)} value={message} type="search" className="grow bg-base-200" placeholder="Search" />
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