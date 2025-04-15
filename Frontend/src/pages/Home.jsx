import React from 'react'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import Chat from '../components/Chat'
import Login from './Login'
import Signup from './Signup'

const Home = () => {
    return (
        <div className='w-[70%] h-[90%] bg-base-100 flex gap-2' >
            <Navbar />
            <Contact />
            <Chat />
        </div>
    )
}

export default Home