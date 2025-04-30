import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useAuthMutations from '../../hooks/authHook'

const UpdateName = () => {
    const { userInfo } = useSelector(state => state.auth.auth)
    const [fullname, setFullname] = useState(userInfo.fullname)
    const { profileUpdate } = useAuthMutations()
    console.log(userInfo);
    
    const handleEditName = ()=>{
        profileUpdate.mutateAsync({fullname: fullname})
    }
    return (
        <dialog id="editName" className="modal">
            <div className="modal-box bg-base-300">
                <div className='flex items-center justify-between' >

                    <h3 className="font-bold text-xl">Edit Name</h3>

                    <form method="dialog">
                        <button className="btn bg-base-300 border-0 hover:text-red-600"><X /></button>
                    </form>

                </div>
                <div className='flex flex-col items-center justify-center my-5'>
                    <input placeholder={userInfo.fullname} type="text" value={fullname} onChange={e => setFullname(e.target.value)} className="input border-0 border-b-2 bg-base-300 outline-0 focus:outline-0" />
                </div>


                <form method='dialog' className='flex font-semibold items-center justify-between' >
                    <div></div>
                    <div className='flex gap-1' >
                        <button className="rounded-full py-2 px-7 w-fit mt-2 cursor-pointer hover:text-white" >Cancel</button>
                        <button onClick={handleEditName} className="rounded-full py-2 px-7 w-fit mt-2 bg-success text-base-content cursor-pointer hover:bg-success/90" >Save</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

export default UpdateName