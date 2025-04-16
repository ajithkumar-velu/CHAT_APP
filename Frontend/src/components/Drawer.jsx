import React, { useEffect, useState } from 'react';
import { images } from '../assets/assets';
import useChatMutation from '../hooks/chatHook';

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);
  return (
    <div className=" absolute top-0 right-0 h-full w-full rounded shadow mx-auto overflow-hidden">
      {/* Toggle Button */}
      <button onClick={toggleDrawer} className="m-4 px-4 py-2 bg-blue-600 text-white rounded" >
        Open Drawer
      </button>

      {/* Drawer inside parent, right side */}
      <div
        className={`absolute top-0 right-0 h-full w-full bg-base-200 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 z-10`}
      >
        <div className="p-4 border-b font-bold text-2xl flex justify-between items-center">
          Profile
          <button onClick={closeDrawer} className="text-red-500 text-xl">
            &times;
          </button>
        </div>
        <div className="p-4">
          <div className='flex flex-col items-center justify-center' >
            <div className='rounded-full' >
              <img src={images.avatar} alt="" />
            </div>
            <p className='text-green-400 font-semibold' >Online</p>
          </div>
          <div className='flex items-center justify-center mt-20' >
            <div className='grid grid-cols-2 w-[70%]  bg-base-300' >
              <p>Your name</p>
              <h1>Arun Kumar</h1>
              <p>About</p>
              <p>Software Enginer</p>
              <p>Since</p>
              <p>12/05/2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
