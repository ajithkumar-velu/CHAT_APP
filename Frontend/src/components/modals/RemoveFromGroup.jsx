import { X } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useChatMutation from '../../hooks/chatHook'
import { resetSelectedChat } from '../../redux/slices/chatSlice'

const RemoveFromGroup = () => {
    const { removeFromGroupUser, selectedChat } = useSelector(state => state.myChat)
    const { removeFromGroup, getChats } = useChatMutation()
    const dispatch = useDispatch()
    const handleRemoveFromGroup = async ()=>{
        removeFromGroup.mutateAsync({userId: removeFromGroupUser._id, chatId: selectedChat._id})
        dispatch(resetSelectedChat())
            await getChats.mutateAsync()
    }
    return (
        <dialog id="removeFromGroup" className="modal">
            <div className="modal-box bg-base-300">
                <div className='flex items-center justify-between' >

                    <h3 className="font-bold text-xl">Remove User from Group</h3>

                    <form method="dialog">
                        <button className="btn bg-base-300 border-0 hover:text-red-600"><X /></button>
                    </form>

                </div>

                <div className='flex flex-col gap-2 justify-center bg-base-300 py-5' >
                    <p>Remove <strong>{removeFromGroupUser.fullname}</strong> from <strong>{selectedChat?.chatName}</strong>?</p>
                    <p className="warning-text">They won't be able to see group messages anymore.</p>
                </div>


                <form method='dialog' className='flex font-semibold items-center justify-between' >
                    <div></div>
                    <div className='flex gap-1' >
                        <button className="rounded-full py-2 px-7 w-fit mt-2 cursor-pointer hover:text-white" >Cancel</button>
                        <button onClick={handleRemoveFromGroup} className="rounded-full py-2 px-7 w-fit mt-2 bg-red-700 text-black cursor-pointer hover:bg-red-700/90" >Remove</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default RemoveFromGroup