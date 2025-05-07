import React, { useEffect } from 'react'
import useMessageMutation from '../../hooks/messageHooks'
import { useDispatch, useSelector } from 'react-redux'
import { X } from 'lucide-react'
import socket from '../../config/socket'
import { addAllMessages } from '../../redux/slices/messageSlice'

const ClearChatModal = () => {
    const { clearMessage } = useMessageMutation()
    const { selectedChat } = useSelector(state => state.myChat)
    const authUserId = useSelector(state => state.auth.auth.userInfo)
    const dispatch = useDispatch()
    const handleClearChat = () => {
        clearMessage.mutateAsync(selectedChat._id)
        socket.emit("clear chat", selectedChat, authUserId.fullname)
        return ()=>socket.off("clear chat")
    }
    
    return (
        <dialog id="clearChat" className="modal">
            <div className="modal-box bg-base-300">
                <div className='flex items-center justify-between' >

                    <h3 className="font-bold text-xl">Clear Chat</h3>

                    <form method="dialog">
                        <button className="btn bg-base-300 border-0 hover:text-red-600"><X /></button>
                    </form>

                </div>

                <div className='flex  gap-2 justify-center bg-base-300 py-5' >
                    <p className='text-4xl' ><strong>⚠️</strong></p>
                    <p className="warning-message">
                        This action will <strong>permanently delete all messages</strong> in this chat for <strong>every participant</strong>.
                    </p>
                </div>


                <form method='dialog' className='flex font-semibold items-center justify-between' >
                    <div></div>
                    <div className='flex gap-1' >
                        <button className="rounded-full py-2 px-7 w-fit mt-2 cursor-pointer hover:text-white" >Cancel</button>
                        <button onClick={handleClearChat} className="rounded-full py-2 px-7 w-fit mt-2 bg-red-700 text-base-content cursor-pointer hover:bg-red-700/90" >Delete for everyone</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default ClearChatModal