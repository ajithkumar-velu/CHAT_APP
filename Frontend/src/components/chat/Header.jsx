import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSelectedChat, resetSelectedChat } from '../../redux/slices/chatSlice'
import { CircleMinus, CircleX, EllipsisVertical, Info, MoveLeft } from 'lucide-react'
import { getChatImage, getChatName } from '../../utils/getNameImage'
import { images } from '../../assets/assets'
import { addTypingUser, removeTypingUser, setIsChatThreeDotOpen, setIsProfileOpen, setIsTyping } from '../../redux/slices/conditionSlice'
import socket from '../../config/socket'

const Header = () => {
    const dispatch = useDispatch()
    const { selectedChat } = useSelector(state => state.myChat)
    const authUserId = useSelector(state => state.auth.auth.userInfo._id)
    const { isChatThreeDotOpen } = useSelector(state => state.condition)
    const { isProfileOpen } = useSelector(state => state.condition)
    const isTyping = useSelector(state => state.condition.isTyping)
    const { typingUser } = useSelector(state => state.condition)
    const { onlineUsers } = useSelector(state => state.condition)
    const toggleDrawer = () => dispatch(setIsProfileOpen(!isProfileOpen));
    
    // stop typing
    useEffect(() => {
        const handelLog = (chatId, user) => {
            if (selectedChat._id === chatId._id) {
                dispatch(setIsTyping(false))
                dispatch(removeTypingUser(user?.fullname))
            }
        }
        socket.on("stop typing", handelLog)
        return () => { socket.off("stop typing", handelLog) }
    })


    // get trping 
    useEffect(() => {
        const handelLog = (chatId, user) => {
            if (selectedChat._id === chatId._id) {
                dispatch(addTypingUser(user.fullname))
                dispatch(setIsTyping(true))
            } else {
                dispatch(setIsTyping(false))
            }
        }
        socket.on("typing", handelLog)
        return () => { socket.off("typing", handelLog) }
    })
    console.log(selectedChat.users.filter(i=>i._id !== authUserId)[0]._id);


    return (
        <div className='bg-base-300 w-full h-20 flex items-center gap-3 px-5' >
            <button onClick={() => dispatch(addSelectedChat(null))} className=" text-xl cursor-pointer btn btn-ghost btn-circle flex items-center justify-center md:hidden">
                <MoveLeft />
            </button>
            <div className='size-12 rounded-full overflow-hidden' >
                <img src={selectedChat.profile || getChatImage(selectedChat, authUserId) || images.groupAvatar} alt="" />
            </div>
            <div className=' flex-1' >
                <p className='text-[18px] font-semibold text-base-content' >{getChatName(selectedChat, authUserId)}</p>
                <div className='text-green-500 text-[14px]' >
                    <div className='flex items-center gap-2' >

                        {typingUser.length > 1 ?
                            typingUser.map((u, id) => (
                                <div key={id} >
                                    {isTyping ? typingUser.length - 1 === id ? `${u}` : `${u}, ` : !selectedChat.isGroupChat && "Online"}
                                </div>
                            ))
                            :
                            typingUser[0] ? `${typingUser[0]} is typing...` : !selectedChat.isGroupChat && (onlineUsers?.includes(selectedChat.users.filter(i=>i._id !== authUserId)[0]._id)?  <span className=' font-semibold' >Online</span> : <span className='text-secondary-content/70 font-semibold' >Offline</span>)
                        }{typingUser.length > 1 && "are typing..."}
                    </div>
                </div>
            </div>



            <div className=" relative">


                <div onClick={() => dispatch(setIsChatThreeDotOpen(!isChatThreeDotOpen))} className="m-1 cursor-pointer"><EllipsisVertical /></div>
                <ul className={` absolute right-0 menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm ${isChatThreeDotOpen ? "" : "hidden"}`}>
                    <li onClick={toggleDrawer} ><a onClick={() => dispatch(setIsChatThreeDotOpen(false))} className=' flex items-center gap-3' >
                        <p><Info /></p>
                        <p>{selectedChat.isGroupChat ? "Group Info" : "Contact Info"}</p>
                    </a></li>
                    <li onClick={() => document.getElementById('clearChat').showModal()} >
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
    )
}

export default Header