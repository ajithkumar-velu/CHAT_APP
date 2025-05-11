import React, { useState } from 'react'
import useAuthMutations from '../hooks/authHook'
import { Link } from 'react-router-dom'
import { images } from '../assets/assets'

const Login = () => {
    const [fromData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { loginUser } = useAuthMutations()

    const handleOnchange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({ ...fromData, [name]: value })
    }

    const handleLogin = async () => {
        // console.log(fromData);
        await loginUser.mutateAsync(fromData)

        setFormData({ fullname: "", email: "", password: "" })
    }
    return (
        <div className='md:w-[70%] md:h-[90%] w-full h-full bg-base-100 flex gap-2' >

            <div className="h-full lg:grid grid-cols-2 w-full" >
                <div className='flex flex-col items-center justify-center w-full h-full sm:px-8' >
                    <div className='flex items-center gap-2 mb-3 cursor-pointer' >
                        <div className='size-10' >
                            <img src={images.logo} />
                        </div>
                        <h1 className='text-base-content text-2xl font-bold' >CHAT APP</h1>
                    </div>
                    <fieldset className="w-full max-w-sm mx-5 bg-radial-[at_50%_75%] from-base-300 via-base-200 to-green-900/30 to-90% md:mx-0 border border-base-content/80 bg-base-200/0 p-6 rounded-xl shadow-gray-700 backdrop-blur-2xl shadow-lg ">
                        <legend className="text-lg text-base-content font-bold">Login</legend>

                        <label className="text-[16px] text-base-content font-semibold">Email</label>
                        <input onChange={handleOnchange} value={fromData.email} name='email' type="email" className="input input-bordered w-full mb-3 border-base-content" placeholder="Email" />

                        <label className="text-[16px] text-base-content font-semibold">Password</label>
                        <input onChange={handleOnchange} value={fromData.password} name='password' type="password" className="input input-bordered w-full border-base-content" placeholder="Password" />

                        <p className='text-right text-sm text-base-content font-semibold mt-2'>Don't have an account? <Link to={"/signup"} className='link link-info'>Sign Up</Link></p>

                        <button onClick={handleLogin} className="btn btn-neutral mt-4 w-full hover:bg-green-600 border-none">Login</button>
                    </fieldset>

                </div>
                <div className="items-center hidden lg:flex bg-white overflow-hidden" >
                    <img className="" src={images.login} alt="" />
                </div>
            </div>


        </div>
    )
}

export default Login