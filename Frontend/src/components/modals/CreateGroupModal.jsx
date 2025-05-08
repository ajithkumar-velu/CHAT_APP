import React, { useState } from 'react'
import { images } from '../../assets/assets'
import { Check, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import useChatMutation from '../../hooks/chatHook'
import { addGroupDescription, addGroupName, resetGroupData } from '../../redux/slices/chatSlice'
import { setIsGroup, setNewChatOpen } from '../../redux/slices/conditionSlice'
import socket from '../../config/socket'

const CreateGroupModal = () => {
  const dispatch = useDispatch()
  const { createGroupUsersData } = useSelector(state => state.condition)
  const { getChats } = useChatMutation()
  const { groupData } = useSelector(state => state.myChat)
  const { selectedChat } = useSelector(state => state.myChat)
  const authUserId = useSelector(state => state.auth.auth.userInfo)
  const { chat } = useSelector(state => state.myChat)
  
  
  const { createGroup } = useChatMutation()
  const handlesendDataCreateGroupData = async () => {
    createGroup.mutateAsync(groupData)
    socket.emit("create group", groupData, authUserId.fullname)
    dispatch(resetGroupData())
    dispatch(setNewChatOpen(false))
    await getChats.mutateAsync()
    dispatch(setIsGroup(false))
    return ()=>socket.off("create group")
  }

  return (


    <dialog id="my_modal_1" className="modal">
      <div className="modal-box bg-base-300">
        <div className='flex items-center justify-between' >

          <h3 className="font-bold text-xl">New Group</h3>

          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn bg-base-300 border-0 hover:text-red-600"><X /></button>
          </form>

        </div>

        <div className='flex flex-col items-center justify-center bg-base-300 py-5' >
          <div className='rounded-full overflow-hidden' >
            <img className='w-64' src={images.groupAvatar} alt="" />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <input onChange={(e) => dispatch(addGroupName(e.target.value))} value={groupData.chatName} type="text" placeholder="Group Name" className="input border-0 border-b-2 bg-base-300 outline-0 focus:outline-0" />
          <input onChange={(e) => dispatch(addGroupDescription(e.target.value))} value={groupData.description} type="text" placeholder="Group Description" className="input border-0 border-b-2 bg-base-300 outline-0 focus:outline-0" />
          <p className="py-4">Number of Users {createGroupUsersData?.users?.length+1}</p>
        </div>

        <form method='dialog' className='flex items-center justify-center' >
          <button onClick={handlesendDataCreateGroupData} className="rounded-full p-2 w-fit mt-2 bg-secondary cursor-pointer hover:bg-secondary/80" >
            <Check className=' size-8' />
          </button>
        </form>
      </div>
    </dialog>


  )
}

export default CreateGroupModal