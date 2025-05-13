import React, { useEffect, useState } from 'react'
import { images } from '../assets/assets'
import { EllipsisVertical, LogOut, LogOutIcon, MessageSquarePlus, Palette, User } from 'lucide-react'
import NewChat from './NewChat'
import useChatMutation from '../hooks/chatHook'
import { useDispatch, useSelector } from 'react-redux'
import { setIsChatThreeDotOpen, setIsProfileOpen, setNewChatOpen } from '../redux/slices/conditionSlice'
import { getChatImage, getChatName } from '../utils/getNameImage'
import useMessageMutation from '../hooks/messageHooks'
import { addMyChat, addSelectedChat, resetSelectedChat } from '../redux/slices/chatSlice'
import useAuthMutations from '../hooks/authHook'
import socket from '../config/socket'
import GetMyChatSkeleton from './skeleton/GetMyChatSkeleton'
import Drawer from './Profile'
import toast from 'react-hot-toast'

const Contact = () => {
  const [chatCategory, setChatCategory] = useState('allChats')
  const { getChats } = useChatMutation()
  const { getAllMessage } = useMessageMutation()
  const isgetMyChatUsers = useSelector(state => state.condition.isgetMyChatUsers)

  const isOpen = useSelector(state => state.condition.newChatOpen)
  const authUserId = useSelector(state => state?.auth?.auth?.userInfo?._id)
  const myChatsUsers = useSelector(state => state.myChat.chat)
  const { selectedChat } = useSelector(state => state.myChat)
  const { logoutUser } = useAuthMutations()
  const [theme, setTheme] = useState("black")

  const dispatch = useDispatch()
  const toggleDrawer = () => dispatch(setNewChatOpen(!isOpen));
  const [search, setSearch] = useState("")

  // chat category filter and search filter
  const filterSerach =
    myChatsUsers?.filter(item => {
      if (chatCategory === "groups") {
        return item.isGroupChat === true
      } else if (chatCategory === "contacts") {
        return item.isGroupChat == false
      } else {
        return true
      }
    }
    )
      .filter((item) => getChatName(item, authUserId)?.toLowerCase().includes(search.toLocaleLowerCase()))

  useEffect(() => {
    getChats.mutateAsync()
  }, [])


  const handleOnclickGetUserMessages = (id) => {
    dispatch(addSelectedChat(id))
    // socket.off("clear char")
    dispatch(setIsChatThreeDotOpen(false))
    dispatch(setIsProfileOpen(false))
    getAllMessage.mutateAsync(id._id)
  }

  const handleLogout = () => {
    logoutUser.mutateAsync()
  }

  useEffect(() => {
    if (selectedChat) {
      socket.emit("join chat", selectedChat);
    }
  }, [selectedChat]);

  // Theme change
  const handleThemeChange = () => {
    const newTheme = theme === "nord" ? "black" : "nord"
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, [])


  return (
    <div className={`bg-base-300 md:max-w-2xs w-full py-5  flex-col gap-3 px-2 overflow-y-auto relative ${selectedChat ? "md:flex hidden" : "flex"}`} >


      <NewChat />

      {/* Search bar */}
      <div className='flex justify-between items-center px-1' >
        <label className="input h-10 rounded-full bg-base-200">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" />
        </label>

        {/* Mobile screen dropdown */}
        <div className="dropdown dropdown-end md:hidden">

          <div tabIndex={0} role="button" className="m-1 cursor-pointer"><EllipsisVertical /></div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm">
            <li onClick={handleThemeChange} ><a><Palette /> Themes</a></li>
            <li onClick={() => document.getElementById('myProfile').showModal()} ><a><User />Profile</a></li>
            <li onClick={handleLogout} ><a><LogOutIcon /> Logout</a></li>
          </ul>
        </div>

      </div>

      {/* chat type */}
      <div className='px-1 flex flex-col gap-2' >
        <h1 className='text-xl font-semibold flex items-center justify-between py-2' >
          <p>Chats</p>
          <div className='btn btn-ghost btn-circle' onClick={toggleDrawer} >
            <MessageSquarePlus />
          </div>
        </h1>
        {/* chat category */}
        <div className='flex bg-base-100 py-1 px-2 rounded-full justify-between items-center text-xs transition-all duration-300 max-w-xs sm:max-w-full m-auto' >
          <p onClick={() => setChatCategory("allChats")} className={`text-center px-4.5 py-1.5 rounded-full cursor-pointer transition-all duration-300 ${chatCategory === "allChats" ? "bg-base-300" : ""}`} >All Chats</p>
          <p onClick={() => setChatCategory("groups")} className={`text-center px-4.5 py-1.5 rounded-full cursor-pointer transition-all duration-300 ${chatCategory === "groups" ? "bg-base-300" : ""}`} >Groups</p>
          <p onClick={() => setChatCategory("contacts")} className={`text-center px-4.5 py-1.5 rounded-full cursor-pointer transition-all duration-300 ${chatCategory === "contacts" ? "bg-base-300" : ""}`} >Contacts</p>
        </div>
      </div>

      {/* cantacts */}
      {
        isgetMyChatUsers ?
          <GetMyChatSkeleton />
          :
          <div className='mt-3 flex flex-col gap-2 overflow-y-auto' >
            {filterSerach.map((user, idxx) => (

              <div key={idxx} onClick={() => handleOnclickGetUserMessages(user)} className={`px-3 py-3 rounded-xl flex items-center gap-2 hover:bg-base-100 cursor-pointer ${selectedChat?._id === user._id ? "bg-base-100" : "bg-base-200"}`} >
                <div className='size-12 rounded-full overflow-hidden' >
                  <img src={user?.profile || getChatImage(user, authUserId) || images.avatar} alt="" />
                </div>
                <div >
                  <p className='text-[17px] text-base-content/90 font-semibold' >{getChatName(user, authUserId)}</p>
                  <p className='text-xs text-zinc-400' >{user?.latestMessage?.sender?._id === authUserId && "You: "}{user.latestMessage?.message}</p>
                </div>
              </div>
            ))}
            {filterSerach.length === 0 && <div className='text-center' >No data found</div>}
          </div>}
    </div>
  )
}

export default Contact