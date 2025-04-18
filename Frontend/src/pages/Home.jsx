import React from 'react'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import Chat from '../components/Chat'
import { useSelector } from 'react-redux'

const Home = () => {
    const { selectedChat } = useSelector(state=>state.myChat)
    console.log(selectedChat);
    
    
    return (
        <div className='xl:w-[70%] w-full h-[90%] bg-base-100 flex gap-2' >
            <Navbar />
            <Contact />
            <Chat />
        </div>
    )
}   

export default Home