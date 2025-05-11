import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatMessageTime, groupMessagesByDate } from '../../utils/formateDateTime'
import { images } from '../../assets/assets'
import { addNewMessage } from '../../redux/slices/messageSlice'
import socket from '../../config/socket'

const ChatContainer = () => {
    const bottomRef = useRef(null);
    const authUserId = useSelector(state => state.auth.auth.userInfo._id)
    const { selectedChat } = useSelector(state => state.myChat)
    const dispatch = useDispatch()
    let messages = useSelector(state => state.messages.messages)
    messages = groupMessagesByDate(messages)

    useEffect(() => {
        const messageHandler = (newMessage) => {
            if (newMessage.chat._id === selectedChat._id) {
                dispatch(addNewMessage(newMessage));
            }
        };
        socket.on("message received", messageHandler); // Use the named function here
        return () => socket.off("message received", messageHandler); // This now matches
    });


    
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
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
                            <div className="chat-bubble bg-base-300">
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
    )
}

export default ChatContainer