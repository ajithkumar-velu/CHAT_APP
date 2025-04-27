import { Check, X } from 'lucide-react'
import React from 'react'
import useChatMutation from '../../hooks/chatHook'
import { useSelector } from 'react-redux'


const ClearCharModal = () => {

  const { deleteGroup } = useChatMutation()
  const { selectedChat } = useSelector(state => state.myChat)
  const handleDeleteGroup = ()=>{
    deleteGroup.mutateAsync(selectedChat._id)
  }

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box bg-base-300">
        <div className='flex items-center justify-between' >

          <h3 className="font-bold text-xl">Clear This chat?</h3>

          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn bg-base-300 border-0 hover:text-red-600"><X /></button>
          </form>

        </div>

        <div className='flex gap-2 justify-center bg-base-300 py-5' >
          <p>⚠️</p>
          <p>This action will permanently delete the entire chat history for all participants. This cannot be undone.</p>
        </div>


        <form method='dialog' className='flex font-semibold items-center justify-between' >
          <div></div>
          <div className='flex gap-1' >
            <button className="rounded-full py-2 px-7 w-fit mt-2 cursor-pointer hover:text-white" >Cancel</button>
            <button onClick={handleDeleteGroup} className="rounded-full py-2 px-7 w-fit mt-2 bg-red-700 text-black cursor-pointer hover:bg-red-700/90" >Clear chat</button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default ClearCharModal