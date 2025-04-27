import React from 'react'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux'
import GroupRenameModal from './components/modals/GroupRenameModal'

const App = () => {
  const isLogin = useSelector(store => store.auth.isautenticated)
  const  {isLoginLow} = useSelector(state=>state.condition)
  
  if(isLoginLow){
    return(
      <div className='flex items-center justify-center w-full h-screen'>
        <p className=' loading' ></p>
      </div>
    )
  }
  
  return (
      <div className='h-screen bg-zinc-800 flex  items-center justify-center' >
      <div className='text-wrap text-[10px] z-6 py-1 text-gray-200 fixed bg-yellow-600 px-5 top-1' >
        <p><span className='text-black font-bold' >Note:</span> This chat app is currently in development.</p>
        <p>features may change and you might encounter bugs.</p>
      </div>
      <Toaster />
      <GroupRenameModal />
      <Routes>
        <Route path={'/'} element={isLogin ? <Home /> : <Navigate to='/login' />} />
        <Route path={'/login'} element={isLogin ? <Navigate to='/' /> : <Login />} />
        <Route path={'/signup'} element={isLogin ? <Navigate to='/' /> : <Signup />} />
      </Routes>
    </div>
  )
}

export default App