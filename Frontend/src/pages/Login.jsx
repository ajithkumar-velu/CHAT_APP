import React, { useState } from 'react'
import useAuthMutations from '../hooks/authHook'

const Login = () => {
    const [fromData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { loginUser } = useAuthMutations()

    const handleOnchange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setFormData({...fromData, [name]: value})
    }

    const handleLogin = async()=>{
        await loginUser.mutateAsync(fromData)
        setFormData({fullname: "", email: "", password: ""})   
    }
    return (
        <div className='w-[70%] h-[90%] bg-base-100 flex gap-2' >
            <div className='flex items-center justify-center w-full' >
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                    <legend className="fieldset-legend">Login</legend>

                    <label className="fieldset-label">Email</label>
                    <input onChange={handleOnchange} value={fromData.email} name='email' type="email" className="input" placeholder="Email" />

                    <label className="fieldset-label">Password</label>
                    <input onChange={handleOnchange} value={fromData.password} name='password' type="password" className="input" placeholder="Password" />

                    <button onClick={handleLogin} className="btn btn-neutral mt-4">Login</button>
                </fieldset>
            </div>
        </div>
    )
}

export default Login