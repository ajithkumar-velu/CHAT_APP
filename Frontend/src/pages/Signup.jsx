import React, { useState } from 'react'
import useAuthMutations from '../hooks/authHook'
import { Link } from 'react-router-dom'
import { images } from '../assets/assets'

const Signup = () => {
    const [fromData, setFormData] = useState({
        fullname: "",
        email: "",
        password: ""
    })
    const { signupUser } = useAuthMutations()

    const handleOnchange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({ ...fromData, [name]: value })
    }

    const handleSignup = () => {

        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPasswordRegex.test(fromData.password)) {

            return
        }

        signupUser.mutateAsync(fromData)
        setFormData({ fullname: "", email: "", password: "" })
    }
    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

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
                        <legend className="text-lg text-base-content font-bold">Signup</legend>

                        <label className="fieldset-label text-[16px] text-base-content font-semibold">Fullname</label>
                        <input onChange={handleOnchange} value={fromData.fullname} name='fullname' type="email" className="input w-full mb-3 border-base-content" placeholder="Fullname" />

                        <label className="fieldset-label text-[16px] text-base-content font-semibold">Email</label>
                        <input onChange={handleOnchange} value={fromData.email} name="email" type="email" className="input w-full mb-3 border-base-content" placeholder="Email" />

                        <label className="fieldset-label text-[16px] text-base-content font-semibold">Password</label>
                        <input onChange={handleOnchange} value={fromData.password} name="password" type="password" className="input w-full border-base-content" placeholder="Password" />
                        {fromData.password && !isStrongPassword(fromData.password) && (
                            <p className="text-red-500 text-sm mt-1">
                                Weak password. Include uppercase, lowercase, number, and special character.
                            </p>
                        )}
                        <p className='text-right text-sm text-base-content font-semibold mt-2' >Already have an account? <Link to={"/login"} className=' link link-info' >Login</Link></p>

                        <button onClick={handleSignup} className="btn btn-neutral mt-4 w-full hover:bg-green-600 border-none">Signup</button>
                    </fieldset>

                </div>
                <div className="items-center hidden lg:flex bg-white overflow-hidden" >
                    <img className="" src={images.signin} alt="" />
                </div>
            </div>


        </div>
    )
}

export default Signup