import { Send, Smile } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import socket from '../../config/socket'
import { useDispatch, useSelector } from 'react-redux'
import { clearTypingUser, removeTypingUser, setIsTyping } from '../../redux/slices/conditionSlice'
import useMessageMutation from '../../hooks/messageHooks'

const SendMessage = () => {
    const [message, setMessage] = useState("")
    const { selectedChat } = useSelector(state => state.myChat)
    const authUserId = useSelector(state => state.auth.auth.userInfo)
    const { typingUser } = useSelector(state => state.condition)
    const { createMessage } = useMessageMutation()
    const dispatch = useDispatch()

    const handleTyping = (e) => {
        setMessage(e.target.value)
        if (e.target.value.length > 0) {
            socket.emit("typing", selectedChat, authUserId)
            return () => { dispatch(setIsTyping(false)) }
        } else {
            socket.emit("stop typing", selectedChat, authUserId)
            return () => { dispatch(setIsTyping(false)) }
        }
    }

    // send nessage
    const handleSendMessage = () => {
        createMessage.mutateAsync({ message: message, chatId: selectedChat })
        setMessage("")
        socket.emit("stop typing", selectedChat, authUserId);
        
        setIsTyping(false)
    }
    return (
        <div className='bg-base-300 py-6 flex items-center gap-2 px-5' >
            <div className="input bg-base-200 w-full h-10 rounded-full px-5">
                <Smile className='text-gray-400' />
                <input onChange={handleTyping} value={message} type="search" className="grow bg-base-200" placeholder="Search" />
            </div>
            <div onClick={handleSendMessage} className='bg-base-200 p-2.5 rounded-full flex items-center justify-center' >
                <Send className=' cursor-pointer size-5' />
            </div>
        </div>
    )
}

export default SendMessage