import React, {  useState } from 'react'
import useAuthMutations from '../hooks/authHook'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [fromData, setFormData] = useState({
        fullname: "",
        email: "",
        password: ""
    })
    const { signupUser } = useAuthMutations()

    const handleOnchange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setFormData({...fromData, [name]: value})
    }
    
    const handleSignup = ()=>{
        signupUser.mutateAsync(fromData)
        setFormData({fullname: "", email: "", password: ""})   
    }
    return (
        <div className='md:w-[70%] md:h-[90%] w-full h-full bg-base-100 flex gap-2' >
            <div className='flex items-center justify-center w-full' >
                <fieldset className="fieldset w-md bg-base-300 border border-base-300 p-4 rounded-box mx-5 md:mx-0">
                    <legend className="fieldset-legend text-lg">Signup</legend>

                    <label className="fieldset-label text-[16px]">Fullname</label>
                    <input onChange={handleOnchange} value={fromData.fullname} name='fullname' type="email" className="input w-full mb-3" placeholder="Fullname" />

                    <label className="fieldset-label text-[16px]">Email</label>
                    <input onChange={handleOnchange} value={fromData.email} name="email" type="email" className="input w-full mb-3" placeholder="Email" />

                    <label className="fieldset-label text-[16px]">Password</label>
                    <input onChange={handleOnchange} value={fromData.password} name="password" type="password" className="input w-full" placeholder="Password" />
                    <p className='text-right' >Already have an account? <Link to={"/login"} className=' link link-info' >Login</Link></p>

                    <button onClick={handleSignup} className="btn btn-neutral mt-4">Signup</button>
                </fieldset>
            </div>
        </div>
    )
}

export default Signup