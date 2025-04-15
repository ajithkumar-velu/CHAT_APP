import React, { useState } from 'react'
import { images } from '../assets/assets'

const Contact = () => {
  const [isType, setIsType] = useState('allChats')
  return (
    <div className='bg-base-300 max-w-2xs w-full py-5 flex flex-col gap-3 px-2 overflow-y-auto' >

      {/* Search bar */}
      <div className='flex justify-center px-1' >
        <label className="input h-10 rounded-full bg-base-200">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input type="search" required placeholder="Search" />
        </label>
      </div>

      {/* chat type */}
      <div className='px-1 flex flex-col gap-2' >
        <h1 className='text-xl font-semibold' >Message</h1>
        <div className='flex bg-base-100 py-1 px-2 rounded-full justify-between items-center text-xs transition-all duration-300' >
          <p onClick={() => setIsType("allChats")} className={`text-center px-4.5 py-1.5 rounded-full cursor-pointer transition-all duration-300 ${isType === "allChats" ? "bg-base-300" : ""}`} >All Chats</p>
          <p onClick={() => setIsType("groups")} className={`text-center px-4.5 py-1.5 rounded-full cursor-pointer transition-all duration-300 ${isType === "groups" ? "bg-base-300" : ""}`} >Groups</p>
          <p onClick={() => setIsType("contacts")} className={`text-center px-4.5 py-1.5 rounded-full cursor-pointer transition-all duration-300 ${isType === "contacts" ? "bg-base-300" : ""}`} >Contacts</p>
        </div>
      </div>

      {/* cantacts */}
      <div className='mt-3 flex flex-col gap-2' >
        {Array(6).fill(null).map((val, idxx) => (

          <div key={idxx} className='px-3 py-3 bg-base-200 rounded-xl flex items-center gap-2' >
            <div className='size-12 rounded-full' >
              <img src={images.avatar} alt="" />
            </div>
            <div >
              <p className='text-[17px] text-zinc-300 font-semibold' >Arun Kumar</p>
              <p className='text-xs text-zinc-400' >What about today</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contact