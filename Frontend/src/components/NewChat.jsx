import { MoveLeft, MoveRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { images } from '../assets/assets';
import useChatMutation from '../hooks/chatHook';
import { useDispatch, useSelector } from 'react-redux';
import NewChatSkeleton from './skeleton/NewChatSkeleton';
import { setCreateGroupUsersData, setIsGroup, setNewChatOpen } from '../redux/slices/conditionSlice';
import { addUsersToGroup, removeUserFromGroup, resetGroupData } from '../redux/slices/chatSlice';

const NewChat = () => {
  const [search, setSearch] = useState("")

  const { getAllUsers } = useChatMutation()
  const { postChat } = useChatMutation()

  const allUsers = useSelector(state => state.myChat.allUsers)
  const isGetAllUsers = useSelector(state => state.condition.isgetAllUsers)
  const isOpen = useSelector(state => state.condition.newChatOpen)
  const { isgetAllUsers } = useSelector(state => state.condition)
  const { isGroup } = useSelector(state => state.condition)
  const { groupData } = useSelector(state => state.myChat)
  const dispatch = useDispatch()
  const closeDrawer = () =>{ 
    dispatch(setNewChatOpen(false))
    dispatch(resetGroupData())
    dispatch(setIsGroup(false))
  };
  const filterSerach = allUsers.filter((item) => item.fullname.toLowerCase().includes(search.toLocaleLowerCase()))



  // remove selected user group user from state variable (groupData)
  const removeSelectedGroupUser = (id) => {
    dispatch(removeUserFromGroup(id))
  }

  const handleGroupSelectedUserToSetRedux = () => {
    document.getElementById('my_modal_1').showModal()
    const groupPayload = {
      chatName: groupData.chatName,
      users: groupData.users.map(user => user._id),
    };
    dispatch(setCreateGroupUsersData(groupPayload));
  };


  useEffect(() => {
    getAllUsers.mutateAsync()
  }, [])


  const handleUserSelect = (user) => {
    if (!isGroup) {
      postChat.mutateAsync({ userId: user._id })
      dispatch(setNewChatOpen(false));
      return
    }
    dispatch(addUsersToGroup(user))
  }



  return (
    <div className="bg-base-300 overflow-y-auto flex flex-col items-center">
      <div
        className={`absolute top-0 left-0 h-full w-full bg-base-300 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 z-10 overflow-y-auto flex flex-col`}>
        <div className="px-4 py-2 border-b-2 border-base-100 font-bold text-lg flex items-center gap-4">
          <button onClick={closeDrawer} className=" text-xl cursor-pointer btn btn-ghost btn-circle flex items-center justify-center">
            <MoveLeft />
          </button>
          New Chat
        </div>

        {/* Group button */}
        <div onClick={() => dispatch(setIsGroup(!isGroup))} className={` flex items-center gap-2 px-3 cursor-pointer hover:bg-base-100 rounded-xl m-2 mt-3 py-2 ${isGroup ? "bg-secondary" : "bg-base-200"}`} >
          <div className='size-11' >
            <img src={images.groupAvatar} alt="" />
          </div>
          <p>New Group</p>
        </div>

        {/* search bar */}
        <div className='flex justify-center px-1 mt-2' >
          <label className="input h-10 rounded-full bg-base-200">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" required placeholder="Search" />
          </label>
        </div>

        {/* group selected users */}
        <div>

          <div className='flex items-center gap-2 flex-wrap  py-3 mx-2' >
            {groupData.users.map((user, idx) => (
              <div key={idx} className='flex items-center gap-1 bg-base-100 px-3 py-1 rounded-full'>
                <p className=' whitespace-nowrap' >{user.fullname} </p>
                <X onClick={() => removeSelectedGroupUser(user._id)} className=' size-4 cursor-pointer hover:text-red-700' />
              </div>
            ))}
          </div>
          {groupData.users.length > 1 &&
            <div className='flex items-center justify-center' >
              <button className="btn rounded-full size-12 mt-2 bg-secondary hover:bg-secondary/90" onClick={handleGroupSelectedUserToSetRedux}><MoveRight className=' size-8' /></button>
            </div>
          }
        </div>


        {/* cantacts */}
        {isGetAllUsers ?
          <NewChatSkeleton /> :
          <div className='mt-3 flex flex-col gap-2 bg-base-300 overflow-y-auto w-full px-2' >
            {filterSerach.map((user, idxx) => (

              <div key={idxx} onClick={() => handleUserSelect(user)} className='px-3 py-3 bg-base-200 rounded-xl flex items-center gap-2 hover:bg-base-100 cursor-pointer' >
                <div className='size-12 rounded-full overflow-hidden' >
                  <img src={user.profile || images.avatar} alt="" />
                </div>
                <div >
                  <p className='text-[17px] text-base-content/90 font-semibold' >{user.fullname}</p>
                  <p className='text-xs text-base-content/80' >{user.about}</p>
                </div>
              </div>
            ))}
          </div>}

      </div>
    </div>
  );
};

export default NewChat;
