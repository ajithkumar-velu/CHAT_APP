import { CalendarDays, Camera, Info, Loader, Mail, Pencil, User, X } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { images } from '../../assets/assets'
import { simpleDate } from '../../utils/formateDateTime'
import useAuthMutations from '../../hooks/authHook'

const MyProfile = () => {
    const { userInfo } = useSelector(state => state.auth.auth)
    const { profileUpdate } = useAuthMutations()
    const { isProfileLow } = useSelector(state=>state.condition)
    // console.log(userInfo);
    const handleProfileUpdate = async (e) => {
        const profile = e.target.files[0]
        if(!profile) return
        const reader = new FileReader()
        reader.readAsDataURL(profile)
        reader.onload  = async ()=>{
            profileUpdate.mutateAsync({profile: reader.result})
        }
    }

    return (
        <dialog id="myProfile" className="modal">
            <div className="modal-box bg-base-300">
                <div className='flex items-center justify-between' >
                    <h3 className="font-bold text-xl">Profile</h3>
                    <form method="dialog">
                        <button className="btn bg-base-300 border-0 hover:text-red-600"><X /></button>
                    </form>
                </div>
                <div className=' flex flex-col gap-2 bg-base-300 overflow-y-auto w-full mt-5' >
                    <div className=" bg-base-100 flex flex-col gap-1">
                        <div className='flex flex-col items-center  bg-base-300 py-5 ' >
                            <div className=' relative' >

                                <div className='rounded-full overflow-hidden w-64 h-64' >
                                    {isProfileLow?
                                    <div className='w-full h-full flex items-center justify-center bg-secondary skeleton' >
                                        <p className='loading-md loading' ></p>
                                    </div>:
                                    <img className='w-full h-full object-cover' src={userInfo.profile || images.avatar} alt="" />
                                }
                                </div>
                                
                                <label className=' absolute bg-base-200 hover:bg-secondary bg- cursor-pointer p-3 rounded-full right-4 bottom-5 z-[100px]' >
                                    <input onChange={handleProfileUpdate} type="file" className=' hidden' accept='image/*' />
                                    <span>
                                        <Camera className='size-6 text-base-content' />
                                    </span>
                                </label>
                            </div>

                        </div>
                    </div>
                </div>
                {/* chat name */}
                <div className=' relative flex gap-4 justify-center flex-col mt-5 w-ful mx-10 ' >
                    <div className='flex items-center gap-4 relative' >
                        <User className='' />
                        <div className='' >
                            <p className='font-semibold' >Name</p>
                            <p className='' >{userInfo?.fullname}</p>
                        </div>
                        <div onClick={() => document.getElementById('editName').showModal()} title='Rename Group' className=' cursor-pointer w-fit p-2 rounded-full absolute right-0 -top-1' >
                            <Pencil className='size-5' />
                        </div>
                    </div>
                    <div className='flex items-center gap-4 relative' >
                        <Mail />
                        <div>
                            <p className='font-semibold' >Mail</p>
                            <p className='' >{userInfo?.email}</p>
                        </div>
                        {/* <div title='Rename Group' className=' cursor-pointer w-fit p-2 rounded-full absolute right-0 -top-1' >
                            <Pencil className='size-5' />
                        </div> */}
                    </div>
                    <div className='flex items-center gap-4 relative' >
                        <Info />
                        <div>
                            <p className='font-semibold' >About</p>
                            <p className='' >{userInfo?.about}</p>
                        </div>
                        <div onClick={() => document.getElementById('editAbout').showModal()} title='Rename Group' className=' cursor-pointer w-fit p-2 rounded-full absolute right-0 -top-1' >
                            <Pencil className='size-5' />
                        </div>
                    </div>
                    <div className='flex items-center gap-4 relative pb-10' >
                        <CalendarDays />
                        <div>
                            <p className='font-semibold' >Since</p>
                            <p className='' >{simpleDate(userInfo.createdAt)}</p>
                        </div>
                    </div>



                </div>



                {/* <div className='flex flex-col items-center justify-center my-5'>
                    <input placeholder={groupRenameData.name} type="text" onChange={e => dispatch(addGroupRename(e.target.value))} className="input border-0 border-b-2 bg-base-300 outline-0 focus:outline-0" />
                </div> */}


            </div>
        </dialog>
    )
}

export default MyProfile