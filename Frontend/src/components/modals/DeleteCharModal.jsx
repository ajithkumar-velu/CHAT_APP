import { Check, X } from 'lucide-react'
import React from 'react'
import useChatMutation from '../../hooks/chatHook'
import { useDispatch, useSelector } from 'react-redux'
import { resetSelectedChat } from '../../redux/slices/chatSlice'

const DeleteCharModal = () => {

  const { deleteGroup, getChats } = useChatMutation()
  const { selectedChat } = useSelector(state => state.myChat)
  const dispatch = useDispatch()
  const handleDeleteGroup = async ()=>{
    await deleteGroup.mutateAsync(selectedChat._id)
    dispatch(resetSelectedChat())
    await getChats.mutateAsync()
  }

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box bg-base-300">
        <div className='flex items-center justify-between' >

          <h3 className="font-bold text-xl">Delete This Group?</h3>

          <form method="dialog">
            <button className="btn bg-base-300 border-0 hover:text-red-600"><X /></button>
          </form>

        </div>

        <div className='flex gap-2 justify-center bg-base-300 py-5' >
          <p>⚠️</p>
          <p> <strong>This cannot be undone.</strong> All messages and members will be removed.</p>
        </div>


        <form method='dialog' className='flex font-semibold items-center justify-between' >
          <div></div>
          <div className='flex gap-1' >
            <button className="rounded-full py-2 px-7 w-fit mt-2 cursor-pointer hover:text-white" >Cancel</button>
            <button onClick={handleDeleteGroup} className="rounded-full py-2 px-7 w-fit mt-2 bg-red-700 text-black cursor-pointer hover:bg-red-700/90" >Delete Group</button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default DeleteCharModal