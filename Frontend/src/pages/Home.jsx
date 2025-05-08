import React from 'react'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import Chat from '../components/Chat'
import CreateGroupModal from '../components/modals/CreateGroupModal'
// import ClearCharModal from '../components/modals/ClearCharModal'
import DeleteCharModal from '../components/modals/DeleteCharModal'
import RemoveFromGroup from '../components/modals/RemoveFromGroup'
import AddNewUserToGroup from '../components/modals/AddNewUserToGroup'
import ClearChatModal from '../components/modals/ClearChatModal'
import MyProfile from '../components/modals/MyProfile'
import UpdateName from '../components/modals/UpdateName'
import UpdateAbout from '../components/modals/UpdateAbout'

const Home = () => {
    
    return (
        <div className='xl:w-[70%] w-full md:h-[90%] h-full bg-base-100 flex gap-0.5' >
            <Navbar />
            <Contact />
            <Chat />
            <CreateGroupModal />
            {/* <ClearCharModal /> */}
            <DeleteCharModal />
            <RemoveFromGroup />
            <AddNewUserToGroup />
            <ClearChatModal />
            <MyProfile />
            <UpdateName />
            <UpdateAbout />
        </div>
    )
}   

export default Home