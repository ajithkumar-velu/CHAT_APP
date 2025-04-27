import { Check, X } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addGroupRename } from '../../redux/slices/chatSlice'
import useChatMutation from '../../hooks/chatHook'

const GroupRenameModal = () => {
    const dispatch = useDispatch()
    const { groupRenameData } = useSelector(state=>state.myChat)
    const { renameGroup} = useChatMutation()
    const handleGroupRename = ()=>{
        renameGroup.mutateAsync(groupRenameData)
    }
    console.log(groupRenameData);
    
    return (
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box bg-base-300">
                <div className='flex items-center justify-between' >

                    <h3 className="font-bold text-xl">Rename Group</h3>

                    <form method="dialog">
                        <button className="btn bg-base-300 border-0 hover:text-red-600"><X /></button>
                    </form>

                </div>

                <div className='flex flex-col items-center justify-center my-5'>
                    <input placeholder={groupRenameData.name} type="text" onChange={e=>dispatch(addGroupRename(e.target.value))} className="input border-0 border-b-2 bg-base-300 outline-0 focus:outline-0" />
                </div>


                <form method='dialog' className='flex items-center justify-center' >
                    <button onClick={handleGroupRename} className="rounded-full p-2 w-fit mt-2 bg-gray-700 cursor-pointer hover:bg-base-200" >
                        <Check className=' size-8' />
                    </button>
                </form>
            </div>
        </dialog>
    )
}

export default GroupRenameModal