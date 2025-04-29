import { Check, X } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NewChatSkeleton from '../skeleton/NewChatSkeleton'
import { images } from '../../assets/assets'
import { addAddNewUserToGroup, removeAddNewUserToGroup, resetAddNewUserToGroup } from '../../redux/slices/chatSlice'
import useChatMutation from '../../hooks/chatHook'

const AddNewUserToGroup = () => {
    const [search, setSearch] = useState("")
    const { isgetAllUsers } = useSelector(state => state.condition)
    const allUsers = useSelector(state => state.myChat.allUsers)
    const { selectedChat, addNewUserToGroup, copyAddNewUserToGroup } = useSelector(state => state.myChat)
    const ids = addNewUserToGroup.map(user => user._id)
    const { addUserToGroup } = useChatMutation()
    const [N_G_users, setN_G_users] = useState([])
    const dispatch = useDispatch()
    const val = copyAddNewUserToGroup.map(user => user._id)

    const filterSerach = allUsers.filter(item => !ids.includes(item._id)).filter((item) => item.fullname.toLowerCase().includes(search.toLocaleLowerCase()))
    const removeSelectedGroupUser = (id) => {
        dispatch(removeAddNewUserToGroup(id))
    }
    const handleNewUserToGroup = ()=>{
        addUserToGroup.mutateAsync({
            userIds: addNewUserToGroup.map(user=>user._id),
            chatId: selectedChat._id
        })
        dispatch(resetAddNewUserToGroup())
    }
    return (
        <dialog id="addNewUserToGroup" className="modal">
            <div className="modal-box bg-base-300">
                <div className='flex items-center justify-between' >

                    <h3 className="font-bold text-xl">Add Member</h3>

                    <form method="dialog">
                        <button className="btn bg-base-300 border-0 hover:text-red-600"><X /></button>
                    </form>

                </div>
                {/* search bar */}
                <div className='flex justify-center px-1 my-5' >
                    <label className="input h-10 rounded-full bg-base-200">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" required placeholder="Search" />
                    </label>
                </div>
                {/* Selected Users */}
                <div className='flex items-center gap-2 flex-wrap  py-3 mx-2' >
                    {addNewUserToGroup.filter(item => !val.includes(item._id)).map((user, idx) => (
                        <div key={idx} className='flex items-center gap-1 bg-base-100 px-3 py-1 rounded-full'>
                            <p className=' whitespace-nowrap' >{user.fullname} </p>
                            <X onClick={() => removeSelectedGroupUser(user._id)} className=' size-4 cursor-pointer hover:text-red-700' />
                        </div>
                    ))}
                </div>
                {/* cantacts */}
                {isgetAllUsers ?
                    <NewChatSkeleton /> :
                    <div className='mt-3 flex flex-col gap-2 bg-base-300 overflow-y-auto w-full h-96 px-2' >
                        {filterSerach.map((user, idxx) => (
                            <div key={idxx} onClick={() => dispatch(addAddNewUserToGroup(user))} className='px-3 py-3 bg-base-200 rounded-xl flex items-center gap-2 hover:bg-base-100 cursor-pointer' >
                                <div className='size-12 rounded-full overflow-hidden' >
                                    <img src={user.profile || images.avatar} alt="" />
                                </div>
                                <div >
                                    <p className='text-[17px] text-base-content font-semibold' >{user.fullname}</p>
                                    <p className='text-xs text-base-content/80' >{user.about}</p>
                                </div>
                            </div>
                        ))}
                        {filterSerach.length === 0 && <div className='m-auto' >No user found</div>}
                    </div>
                }

                <form method='dialog' className='flex font-semibold items-center justify-between mt-2' >
                    <div></div>
                    <div className='flex gap-1' >
                        <button className="rounded-full py-2 px-7 w-fit mt-2 cursor-pointer hover:text-white" >Cancel</button>
                        <button onClick={handleNewUserToGroup} className="rounded-full py-2 px-7 w-fit mt-2 bg-red-700 text-base-content cursor-pointer hover:bg-red-700/90" >Add Users</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default AddNewUserToGroup