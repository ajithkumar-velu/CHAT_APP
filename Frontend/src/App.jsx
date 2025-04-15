import React from 'react'
import Home from './pages/Home'
import { Navigate, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux'

const App = () => {
  const isLogin = useSelector(store=>store.auth.isautenticated)
  
  return (
    <div className='h-screen bg-zinc-800 flex items-center justify-center' >
      <Toaster />
      <Routes>
        <Route path={'/'} element={isLogin? <Home />: <Navigate to='/login'/>} />
        <Route path={'/login'} element={isLogin? <Navigate to='/'/>: <Login />} />
        <Route path={'/signup'} element={isLogin? <Navigate to='/'/> : <Signup />} />
        {/* <Route path={'*'} element={isLogin? <Navigate to='/'/> : <Signup />} /> */}
      </Routes>
    </div>
  )
}

export default App