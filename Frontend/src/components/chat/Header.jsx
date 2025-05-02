import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSelectedChat, resetSelectedChat } from '../../redux/slices/chatSlice'
import { CircleMinus, CircleX, EllipsisVertical, Info, MoveLeft } from 'lucide-react'
import { getChatImage, getChatName } from '../../utils/getNameImage'
import { images } from '../../assets/assets'
import { setIsChatThreeDotOpen, setIsProfileOpen, setIsTyping } from '../../redux/slices/conditionSlice'
import socket from '../../config/socket'

const Header = () => {
    const dispatch = useDispatch()
    const { selectedChat } = useSelector(state => state.myChat)
    const authUserId = useSelector(state => state.auth.auth.userInfo._id)
    const { isChatThreeDotOpen } = useSelector(state => state.condition)
    const { isProfileOpen } = useSelector(state => state.condition)
    const isTyping = useSelector(state => state.condition.isTyping)
    const toggleDrawer = () => dispatch(setIsProfileOpen(!isProfileOpen));

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
                <p className='text-green-400 text-[14px]' >{isTyping ? "typing..." : "Online"}</p>
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