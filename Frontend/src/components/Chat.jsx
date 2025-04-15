import React, { useEffect, useRef } from 'react'
import { images } from '../assets/assets'
import { EllipsisVertical, Phone, Send, Smile } from 'lucide-react'
import Drawer from './Drawer'

const Chat = () => {
  const bottomRef = useRef(null); 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div className='bg-base-100 w-full flex flex-col relative overflow-y-auto' >

      {/* Header */}
      <div className='bg-base-200 w-full h-20 flex items-center gap-3 px-5' >
        <div className='size-12 rounded-full' >
          <img src={images.avatar} alt="" />
        </div>
        <div className=' flex-1' >
          <p className='text-[18px] font-semibold text-zinc-300' >Arun Kumar</p>
          <p className='text-green-400 text-[14px]' >Online</p>
        </div>
        <div className='flex items-center gap-3' >
          <Phone />
          <EllipsisVertical />
        </div>
      </div>

      {/* chats */}
      <div className='flex-1 px-5 overflow-y-auto' >
        {Array(8).fill(null).map((val, idx) => (
          <div key={idx} >

            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="chat-header">
                Anakin
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble">I hate you!</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          </div>

        ))}
        <div ref={bottomRef} ></div>
      </div>

      {/* send message */}
      <div className='bg-base-200 py-6 flex items-center gap-2 px-5' >
        <div className="input bg-base-200 w-full h-10 rounded-full px-5">
          <Smile className='text-gray-400' />
          <input type="search" className="grow bg-base-200" placeholder="Search" />
        </div>
        <div className='bg-base-300 p-2.5 rounded-full flex items-center justify-center' >
          <Send className=' cursor-pointer size-5' />
        </div>
      </div>

      {/* <Drawer /> */}

    </div>
  )
}

export default Chat