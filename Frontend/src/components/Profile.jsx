import React from 'react';
import { Camera, CircleMinus, Pencil, Trash, UserRoundPlus } from 'lucide-react';
import { images } from '../assets/assets';
import { setIsProfileOpen } from '../redux/slices/conditionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { simpleDate, SimpleDateMonthDay } from '../utils/formateDateTime';
import { addRemoveFromGroupUser, setAddNewUserToGroup, setRenameGroupName } from '../redux/slices/chatSlice';
import useChatMutation from '../hooks/chatHook';

const Profile = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.condition.isProfileOpen)
  const closeDrawer = () => dispatch(setIsProfileOpen(false));
  const authUser = useSelector(state => state.auth.auth.userInfo)
  const { selectedChat } = useSelector(state => state.myChat)
  const { addUpdateGroupProfile } = useChatMutation()
  const { isGroupProfileLow } = useSelector(state => state.condition)
  const profileUser = selectedChat.isGroupChat ? selectedChat :
    selectedChat.users[0]._id === authUser._id ? selectedChat.users[1] : selectedChat.users[0]



  const handleGroupRename = () => {
    document.getElementById('my_modal_4').showModal()
    dispatch(setRenameGroupName({ name: selectedChat.chatName, chatId: selectedChat._id }))
  }
  const handleRemoveFromGroup = (data) => {
    dispatch(addRemoveFromGroupUser(data))
    document.getElementById('removeFromGroup').showModal()
  }

  const handleProfileUpdate = async (e) => {
    const profile = e.target.files[0]
    if (!profile) return
    const reader = new FileReader()
    reader.readAsDataURL(profile)
    reader.onload = async () => {
      addUpdateGroupProfile.mutateAsync({ profile: reader.result, chatId: selectedChat._id })
    }
  }


  return (
    <div className=" bg-base-300 overflow-y-auto flex flex-col items-center ">

      <div
        className={`absolute top-0 right-0 h-full max-w-md w-full bg-base-300 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 z-10 overflow-y-auto flex flex-col `}
      >
        <div className="p-4 border-b font-bold text-2xl flex justify-between items-center">
          Profile
          <button onClick={closeDrawer} className="text-red-500 text-xl btn btn-ghost btn-circle">
            &times;
          </button>
        </div>
        <div className=' flex flex-col gap-2 bg-base-300 overflow-y-auto w-full' >
          <div className=" bg-base-100 flex flex-col gap-1">
            <div className='flex flex-col items-center  bg-base-300 py-5' >
              <div className=' relative' >

                <div className='rounded-full overflow-hidden w-64 h-64' >
                  {
                    isGroupProfileLow ?
                      <div className='w-full h-full flex items-center justify-center bg-secondary skeleton' >
                        <p className='loading-md loading' ></p>
                      </div> :
                      <img className='w-full h-full object-cover' src={selectedChat.isGroupChat ? profileUser.profile || images.groupAvatar : profileUser.profile || images.avatar} alt="" />
                  }
                </div>
                <label className=' absolute bg-base-200 hover:bg-secondary bg- cursor-pointer p-3 rounded-full right-4 bottom-5 z-[100px]' >
                  <input onChange={handleProfileUpdate} type="file" className=' hidden' accept='image/*' />
                  <span>
                    <Camera className='size-6 text-base-content' />
                  </span>
                </label>
              </div>
              {/* chat name */}
              <div className=' relative text-lg font-semibold mt-5 w-full ' >
                <p className='text-center' >{profileUser?.fullname || profileUser?.chatName}</p>

                {selectedChat.isGroupChat && authUser._id === selectedChat.groupAdmin._id && <div onClick={handleGroupRename} title='Rename Group' className=' cursor-pointer w-fit p-2 rounded-full absolute right-0 -top-1' >
                  <Pencil className='size-5' />
                </div>}
              </div>
              <p className=' text-base-content/90' >{profileUser.email ? profileUser.email : `Group • ${profileUser?.users?.length} members`}</p>
            </div>
            <div className='bg-base-300 py-5 px-5'>
              <p className='text-lg font-semibold' >{selectedChat.isGroupChat ? "Description" : "About"}</p>
              <p className='text-base-content' >{selectedChat.isGroupChat ? selectedChat?.description : profileUser?.about}</p>
            </div>
            {/* Group users */}
            {selectedChat.isGroupChat &&
              <div className='bg-base-300 py-5 px-5'>
                <p className='text-lg font-semibold mb-2' >Users</p>
                {/* add user */}

                {selectedChat?.isGroupChat && authUser._id === selectedChat.groupAdmin._id && <div onClick={() => { dispatch(setAddNewUserToGroup(selectedChat.users)); document.getElementById('addNewUserToGroup').showModal() }} className='flex items-center gap-2 px-4 py-1 hover:bg-base-100 mb-1 cursor-pointer' >
                  <div className='size-12 rounded-full overflow-hidden bg-secondary  flex items-center justify-center' >
                    <UserRoundPlus />
                  </div>
                  <p className={` `} >Add member</p>
                </div>}
                {
                  profileUser.users.slice().sort((a, b) => a.fullname.localeCompare(b.fullname)).map((user, idx) => (
                    <div key={idx} className='flex items-center justify-between text-base-content/80 gap-1 hover:bg-base-100 px-4 py-1 cursor-pointer group mb-1' >
                      <div className='flex items-center gap-2' >
                        <div className='size-11 rounded-full overflow-hidden' >
                          <img src={user.profile || images.avatar} alt="User Profile" />
                        </div>
                        <p className={` `} >{authUser._id === user._id ? "You" : user.fullname}</p>
                      </div>
                      <p className={` `} >{selectedChat.groupAdmin._id === user._id ? "(Admin)" : ""}</p>
                      {authUser._id === selectedChat.groupAdmin._id && selectedChat.groupAdmin._id !== user._id && <div onClick={() => handleRemoveFromGroup(user)} className=' sm:hidden flex items-center gap-2 text-red-800 group-hover:flex' ><CircleMinus className='size-5' /> Remove</div>}
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
              <div onClick={() => document.getElementById('clearChat').showModal()} className='flex items-center gap-3 py-4 hover:bg-base-200 p-4 rounded-xl cursor-pointer' >
                <p><CircleMinus /> </p>
                <p>Clear chat</p>
              </div>
              {selectedChat.isGroupChat && authUser._id === selectedChat.groupAdmin._id &&
                <div onClick={() => document.getElementById('my_modal_3').showModal()} className='flex items-center gap-3 py-4 hover:bg-base-200 p-4 rounded-xl cursor-pointer' >
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
