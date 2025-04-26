import React, { useEffect, useState } from 'react';
import { CircleMinus, Trash } from 'lucide-react';
import { images } from '../assets/assets';
import useChatMutation from '../hooks/chatHook';
import { setIsProfileOpen } from '../redux/slices/conditionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { simpleDate, SimpleDateMonthDay } from '../utils/formateDateTime';

const Profile = () => {
  const { deleteGroup } = useChatMutation()
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.condition.isProfileOpen)
  const closeDrawer = () => dispatch(setIsProfileOpen(false));
  const authUser = useSelector(state => state.auth.auth.userInfo)
  const { selectedChat } = useSelector(state => state.myChat)
  const profileUser = selectedChat.isGroupChat ? selectedChat :
    selectedChat.users[0]._id === authUser ? selectedChat.users[1] : selectedChat.users[0]

  const handleDeleteGroup = () => {
    deleteGroup.mutateAsync(selectedChat._id)
  }





  return (
    <div className=" bg-base-300 overflow-y-auto flex flex-col items-center">

      <div
        className={`absolute top-0 right-0 h-full max-w-md w-full bg-base-300 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 z-10 overflow-y-auto flex flex-col`}
      >
        <div className='mt-3 flex flex-col gap-2 bg-base-300 overflow-y-auto w-full' >
          <div className="p-4 border-b font-bold text-2xl flex justify-between items-center">
            Profile
            <button onClick={closeDrawer} className="text-red-500 text-xl btn btn-ghost btn-circle">
              &times;
            </button>
          </div>
          <div className=" bg-base-100 flex flex-col gap-1">
            <div className='flex flex-col items-center justify-center bg-base-300 py-5' >
              <div className='rounded-full overflow-hidden' >
                <img className='w-64' src={selectedChat.isGroupChat ? profileUser.profile || images.groupAvatar : profileUser.profile || images.avatar} alt="" />
              </div>
              <p className=' text-lg font-semibold mt-5' >{profileUser?.fullname || profileUser.chatName}</p>
              <p className=' text-zinc-400' >{profileUser.email ? profileUser.email : `Group • ${profileUser?.users?.length} members`}</p>
            </div>
            <div className='bg-base-300 py-5 px-5'>
              <p className='text-lg font-semibold' >{selectedChat.isGroupChat ? "Description" : "About"}</p>
              <p className='text-zinc-400' >{selectedChat.isGroupChat ? selectedChat?.description : profileUser?.about}</p>
            </div>
            {/* Group users */}
            {selectedChat.isGroupChat &&
              <div className='bg-base-300 py-5 px-5'>
                <p className='text-lg font-semibold mb-2' >Users</p>
                {
                  profileUser.users.slice().sort((a, b) => a.fullname.localeCompare(b.fullname)).map((user, idx) => (
                    <div key={idx} className='flex items-center justify-between text-zinc-400 gap-1' >
                      <p className={` `} >{authUser._id === user._id ? "You" : user.fullname}</p>
                      <p className={` `} >{selectedChat.groupAdmin._id === user._id ? "(Admin)" : ""}</p>
                    </div>
                  ))
                }
              </div>
            }
            <div className='w-full items-center justify-center bg-base-300 p-5 ' >
              <div className='flex items-center justify-between' >
                <p>Since</p>
                <p>{simpleDate(profileUser.createdAt)}</p>
              </div>
            </div>

            <div className='w-full flex flex-col gap-1 bg-base-300 p-2 text-red-700' >
              <div className='flex items-center gap-3 py-4 hover:bg-base-200 p-4 rounded-xl cursor-pointer' >
                <p><CircleMinus /> </p>
                <p>Clear chat</p>
              </div>
              {selectedChat.isGroupChat && authUser._id === selectedChat.groupAdmin._id &&
                <div onClick={()=>document.getElementById('my_modal_3').showModal()} className='flex items-center gap-3 py-4 hover:bg-base-200 p-4 rounded-xl cursor-pointer' >
                  <p><Trash /> </p>
                  <p>Delete Group</p>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Profile;
