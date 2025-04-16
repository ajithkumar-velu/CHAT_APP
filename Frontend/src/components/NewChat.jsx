import { MoveLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { images } from '../assets/assets';
import useChatMutation from '../hooks/chatHook';
import { useDispatch, useSelector } from 'react-redux';
import NewChatSkeleton from './skeleton/NewChatSkeleton';
import { setNewChatOpen } from '../redux/slices/conditionSlice';

const NewChat = () => {
  const [search, setSearch] = useState("")

  const { getAllUsers } = useChatMutation()
  const { postChat } = useChatMutation()

  const allUsers = useSelector(state => state.myChat.allUsers)
  const isGetAllUsers = useSelector(state => state.condition.isgetAllUsers)
  const isOpen = useSelector(state => state.condition.newChatOpen)

  const dispatch = useDispatch()
  
  
  
  const filterSerach = allUsers.filter((item) => item.fullname.toLowerCase().includes(search.toLocaleLowerCase()))

  useEffect(() => {
    getAllUsers.mutateAsync()
  }, [])

  const handleUserSelect = (id) => {
    postChat.mutateAsync({ userId: id })
    dispatch(setNewChatOpen(false));

  }
  const closeDrawer = () => dispatch(setNewChatOpen(false));


  return (
    <div className="bg-base-300 overflow-y-auto flex flex-col items-center">
      <div
        className={`absolute top-0 left-0 h-full w-full bg-base-300 shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 z-10 overflow-y-auto flex flex-col`}
      >
        <div className="px-4 py-2 border-b-2 border-base-100 font-bold text-lg flex items-center gap-4">
          <button onClick={closeDrawer} className=" text-xl cursor-pointer btn btn-ghost btn-circle flex items-center justify-center">
            <MoveLeft />
          </button>
          New Chat
        </div>

        {/* search bar */}
        <div className='flex justify-center px-1 mt-4' >
          <label className="input h-10 rounded-full bg-base-200">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" required placeholder="Search" />
          </label>
        </div>

        {/* cantacts */}
        {isGetAllUsers ?
          <NewChatSkeleton /> :
          <div className='mt-3 flex flex-col gap-2 bg-base-300 overflow-y-auto w-full' >
            {filterSerach.map((user, idxx) => (

              <div key={idxx} onClick={() => handleUserSelect(user._id)} className='px-3 py-3 bg-base-200 rounded-xl flex items-center gap-2 hover:bg-base-100 cursor-pointer' >
                <div className='size-12 rounded-full overflow-hidden' >
                  <img src={user.profile || images.avatar} alt="" />
                </div>
                <div >
                  <p className='text-[17px] text-zinc-300 font-semibold' >{user.fullname}</p>
                  <p className='text-xs text-zinc-400' >{user.about}</p>
                </div>
              </div>
            ))}
          </div>}

      </div>
    </div>
  );
};

export default NewChat;
