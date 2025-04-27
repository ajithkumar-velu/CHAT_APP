import React from 'react'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import Chat from '../components/Chat'
import { useSelector } from 'react-redux'
import CreateGroupModal from '../components/modals/CreateGroupModal'
import ClearCharModal from '../components/modals/ClearCharModal'
import DeleteCharModal from '../components/modals/DeleteCharModal'

const Home = () => {
    const { selectedChat } = useSelector(state=>state.myChat)
    
    
    return (
        <div className='xl:w-[70%] w-full h-[90%] bg-base-100 flex gap-2' >
            <Navbar />
            <Contact />
            <Chat />
            <CreateGroupModal />
            <ClearCharModal />
            <DeleteCharModal />
        </div>
    )
}   

export default Home