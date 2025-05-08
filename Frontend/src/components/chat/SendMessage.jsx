import { Send, Smile } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import socket from '../../config/socket'
import { useDispatch, useSelector } from 'react-redux'
import { clearTypingUser, removeTypingUser, setIsTyping } from '../../redux/slices/conditionSlice'
import useMessageMutation from '../../hooks/messageHooks'
import EmojiPicker from 'emoji-picker-react';

const SendMessage = () => {
    const [message, setMessage] = useState("")
    const { selectedChat } = useSelector(state => state.myChat)
    const authUserId = useSelector(state => state.auth.auth.userInfo)
    const { typingUser } = useSelector(state => state.condition)
    const { createMessage } = useMessageMutation()
    const [showEmoji, setShowEmoji] = useState(false)
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
    const savedTheme = localStorage.getItem("theme")

    return (
        <div className='bg-base-300 py-6 flex items-center gap-2 px-5 relative'>

            {/* Emoji Picker Wrapper */}
            <div className="absolute bottom-20 left-5 z-10">
                <div
                    className={`transition-all duration-300 transform origin-bottom ${showEmoji ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                >
                    <EmojiPicker theme={savedTheme === "black"? "dark" : savedTheme === null && "dark"} onEmojiClick={(e) => setMessage((prev) => prev + e.emoji)} />
                </div>
            </div>

            {/* Input Box */}
            <div className="input bg-base-200 w-full h-10 rounded-full px-5 flex items-center gap-2">
                <Smile
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="text-gray-400 cursor-pointer"
                />
                <input
                    type="text"
                    value={message}
                    onChange={handleTyping}
                    className="grow bg-base-200 focus:outline-none"
                    placeholder="Type a message"
                />
            </div>

            {/* Send Button */}
            <div
                onClick={handleSendMessage}
                className="bg-base-200 p-2.5 rounded-full flex items-center justify-center"
            >
                <Send className="cursor-pointer size-5" />
            </div>
        </div>
    )
}

export default SendMessage