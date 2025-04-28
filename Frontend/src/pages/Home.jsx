import React from 'react'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import Chat from '../components/Chat'
import { useSelector } from 'react-redux'
import CreateGroupModal from '../components/modals/CreateGroupModal'
import ClearCharModal from '../components/modals/ClearCharModal'
import DeleteCharModal from '../components/modals/DeleteCharModal'
import RemoveFromGroup from '../components/modals/RemoveFromGroup'
import AddNewUserToGroup from '../components/modals/AddNewUserToGroup'

const Home = () => {
    const { selectedChat } = useSelector(state=>state.myChat)
    
    
    return (
        <div className='xl:w-[70%] w-full md:h-[90%] h-full bg-base-100 flex gap-1' >
            <Navbar />
            <Contact />
            <Chat />
            <CreateGroupModal />
            <ClearCharModal />
            <DeleteCharModal />
            <RemoveFromGroup />
            <AddNewUserToGroup />
        </div>
    )
}   

export default Home